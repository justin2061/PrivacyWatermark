// Post-build prerender (SSG) for the ImageMarker SPA.
//
// The app is client-rendered (Vite + wouter), so every route's raw HTML is
// identical until JS runs — which hurts crawling/indexing. This script boots a
// `vite preview` server, visits every route in dist/sitemap.xml with a headless
// browser, waits for React + the useEffect-injected <title>/meta/JSON-LD, and
// writes a fully-rendered static index.html per route into dist/.
//
// Netlify then serves these static files (static files take precedence over the
// SPA fallback redirect), so Googlebot gets complete HTML without executing JS.
//
// IMPORTANT design choices (learned the hard way):
//   1. Wait with `domcontentloaded` + an explicit "React mounted" check — NOT
//      `networkidle0`. The app lazily loads a ~23MB onnxruntime WASM bundle, so
//      the network may never go idle and every route would time out.
//   2. Buffer every route's HTML in memory and only write files AFTER the crawl
//      finishes. If we wrote into dist/ mid-crawl, the vite preview SPA fallback
//      would start serving the freshly-written homepage index.html for routes
//      that hadn't been rendered yet, poisoning their captured content.
//
// Safety: if Puppeteer can't be imported or Chromium can't launch, the script
// logs a warning and exits 0 so the site still deploys as a normal SPA.

import { preview } from "vite";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";

const projectRoot = process.cwd();
const distDir = resolve(projectRoot, "dist");

function getRoutes() {
  const sitemapPath = join(distDir, "sitemap.xml");
  if (!existsSync(sitemapPath)) {
    console.warn("[prerender] dist/sitemap.xml not found; nothing to prerender.");
    return [];
  }
  const xml = readFileSync(sitemapPath, "utf-8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const routes = locs
    .map((u) => {
      try {
        return new URL(u).pathname;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  return Array.from(new Set(routes));
}

function outPathFor(route) {
  if (route === "/" || route === "") return join(distDir, "index.html");
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return join(distDir, clean, "index.html");
}

// Homepage default title from the shell — used to detect routes that failed to
// swap in their own <title> (i.e. React/route didn't render properly).
const DEFAULT_TITLE_HINT = "證件浮水印製作工具";

// On a Netlify production build the prerender is NOT optional: without it every
// route serves the identical SPA shell, so Google sees ~73 URLs that are all
// byte-for-byte duplicates of the homepage (same <title>, canonical → "/") and
// the whole site drops out of the index. That is far worse than a failed deploy,
// which merely keeps the previous good one live. So bail LOUDLY here and let the
// build go red, instead of silently shipping an unindexable site.
// Locally / in dev the old safe no-op still applies.
const PRERENDER_REQUIRED =
  process.env.NETLIFY === "true" && process.env.CONTEXT === "production";

function bail(message) {
  if (PRERENDER_REQUIRED) {
    console.error(`[prerender] FATAL: ${message}`);
    console.error(
      "[prerender] Refusing to deploy an unprerendered SPA from production — " +
        "every route would serve the homepage shell and de-index the site."
    );
    process.exit(1);
  }
  console.warn(`[prerender] ${message} — skipping (site deploys as SPA).`);
  process.exit(0);
}

async function main() {
  if (!existsSync(distDir)) {
    bail("dist/ not found; run `vite build` first");
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    bail("puppeteer not installed");
  }

  const routes = getRoutes();
  if (routes.length === 0) {
    bail("no routes found in dist/sitemap.xml");
  }
  console.log(`[prerender] prerendering ${routes.length} routes…`);

  const server = await preview({ preview: { port: 4183, strictPort: false } });
  const base = (server.resolvedUrls?.local?.[0] || "http://localhost:4183").replace(
    /\/$/,
    ""
  );

  // --disable-dev-shm-usage is load-bearing on CI, not boilerplate: Netlify's
  // build container gives /dev/shm only ~64MB, and Chrome puts renderer shared
  // memory there. Partway through the crawl a renderer outgrows it, the whole
  // browser process dies, and the next newPage() fails with
  //   ProtocolError (Target.createTarget): Session with given id not found
  // — which is exactly how deploy 4d70072 died, at route 15 of 82. The flag
  // moves that shared memory to /tmp (disk-backed), which has real space.
  const launch = () =>
    puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

  let browser;
  try {
    browser = await launch();
  } catch (e) {
    await server.close();
    bail(`could not launch Chromium: ${e.message}`);
  }

  /**
   * Render one route on the current browser. Throws on any failure so the
   * caller can decide whether to retry; returns null when the route rendered
   * the wrong content (a real problem, not a transient one — don't retry it).
   */
  async function renderRoute(route) {
    let page;
    try {
      page = await browser.newPage();
      // Mark this as a prerender run BEFORE any app script executes, so the
      // client-side protection module (client/src/lib/protection.ts) treats it
      // as a clean baseline and renders full content. Without this, the headless
      // Chrome used here (UA contains "HeadlessChrome" + navigator.webdriver=true)
      // would trip bot-detection and bake a "blocked" screen into every static
      // page — an SEO catastrophe.
      await page.evaluateOnNewDocument(() => {
        window.__PRERENDER__ = true;
      });
      await page.goto(base + route, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      // Wait until React has actually mounted content into #root.
      await page.waitForFunction(
        () => {
          const root = document.querySelector("#root");
          return !!root && root.children.length > 0;
        },
        { timeout: 15000 }
      );
      // Settle so useEffect-set <title>/canonical/JSON-LD are in the DOM before
      // we capture (effects run just after mount).
      await new Promise((r) => setTimeout(r, 600));

      const html = await page.content();
      const title = await page.title();

      if (route !== "/" && title.includes(DEFAULT_TITLE_HINT)) {
        // Route rendered the homepage shell instead of its own page — skip it so
        // we don't bake wrong content. (Should not happen with buffered writes.)
        console.warn(
          `[prerender] ✗ ${route}: captured homepage title, skipping to avoid wrong content`
        );
        return null;
      }
      return { html, title };
    } finally {
      // page.close() on a crashed browser throws and would mask the real error.
      try {
        if (page && !page.isClosed()) await page.close();
      } catch {
        /* browser already gone; the caller relaunches before retrying */
      }
    }
  }

  const rendered = []; // { route, html }
  for (const route of routes) {
    // Two attempts per route. A crashed Chrome takes out whichever route was
    // unlucky enough to be in flight; that route is not itself broken, so give
    // it a fresh browser and one more go. Without this, a single transient
    // crash still leaves the crawl short — and production hard-fails on short.
    for (let attempt = 1; attempt <= 2; attempt++) {
      if (!browser.connected) {
        console.warn("[prerender] browser died; relaunching…");
        try {
          browser = await launch();
        } catch (e) {
          await server.close();
          bail(`could not relaunch Chromium mid-crawl: ${e.message}`);
        }
      }
      try {
        const result = await renderRoute(route);
        if (result) {
          rendered.push({ route, html: result.html });
          console.log(`[prerender] ✓ ${route} — ${result.title.slice(0, 40)}`);
        }
        break; // rendered, or wrong-content (retrying won't help)
      } catch (e) {
        const last = attempt === 2;
        console.warn(
          `[prerender] ${last ? "✗" : "…retry"} ${route}: ${e.message}`
        );
      }
    }
  }

  if (browser.connected) await browser.close();
  await server.close();

  // Phase 2 — write all captured pages now that the server is down.
  let written = 0;
  for (const { route, html } of rendered) {
    try {
      const outPath = outPathFor(route);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html, "utf-8");
      written += 1;
    } catch (e) {
      console.warn(`[prerender] write failed for ${route}: ${e.message}`);
    }
  }

  console.log(
    `[prerender] done — ${written}/${routes.length} routes written.`
  );

  // A partial crawl still de-indexes whatever it missed, so hold production to
  // a full render. The threshold is every route: a route that silently stops
  // rendering is exactly the regression this guard exists to catch.
  if (PRERENDER_REQUIRED && written < routes.length) {
    console.error(
      `[prerender] FATAL: only ${written}/${routes.length} routes rendered; ` +
        "the rest would serve the homepage shell."
    );
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("[prerender] error:", e);
  // In production an unprerendered deploy is worse than no deploy — see
  // PRERENDER_REQUIRED above.
  process.exit(PRERENDER_REQUIRED ? 1 : 0);
});
