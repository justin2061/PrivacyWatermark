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
  // De-dupe, keep "/" first.
  return Array.from(new Set(routes));
}

function outPathFor(route) {
  if (route === "/" || route === "") return join(distDir, "index.html");
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return join(distDir, clean, "index.html");
}

async function main() {
  if (!existsSync(distDir)) {
    console.warn("[prerender] dist/ not found; run `vite build` first. Skipping.");
    process.exit(0);
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.warn(
      "[prerender] puppeteer not installed; skipping prerender (site deploys as SPA)."
    );
    process.exit(0);
  }

  const routes = getRoutes();
  if (routes.length === 0) {
    console.warn("[prerender] no routes found; skipping.");
    process.exit(0);
  }
  console.log(`[prerender] prerendering ${routes.length} routes…`);

  const server = await preview({ preview: { port: 4183, strictPort: false } });
  const base = (server.resolvedUrls?.local?.[0] || "http://localhost:4183").replace(
    /\/$/,
    ""
  );

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch (e) {
    console.warn(
      `[prerender] could not launch Chromium; skipping prerender (site deploys as SPA). ${e.message}`
    );
    await server.close();
    process.exit(0);
  }

  let ok = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(base + route, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      // Wait for the app to mount and effects (meta/JSON-LD) to run.
      await page.waitForSelector("#root *", { timeout: 10000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 300));
      const html = await page.content();
      const outPath = outPathFor(route);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html, "utf-8");
      ok += 1;
      console.log(`[prerender] ✓ ${route}`);
    } catch (e) {
      console.warn(`[prerender] ✗ ${route}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await server.close();
  console.log(`[prerender] done — ${ok}/${routes.length} routes written.`);
}

main().catch((e) => {
  // Never fail the build because of prerendering.
  console.error("[prerender] non-fatal error:", e);
  process.exit(0);
});
