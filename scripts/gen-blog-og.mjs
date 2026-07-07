// One-off generator for blog hero / Open Graph images (1200×630).
//
// Renders a dark, brand-blue HTML card per article with headless Chromium and
// screenshots it to client/public/og/<slug>.png. Run manually when adding
// articles:  node scripts/gen-blog-og.mjs
//
// Kept out of the build pipeline on purpose — the PNGs are committed, so we only
// regenerate when the set of cards changes.

import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "client/public/og");
mkdirSync(OUT_DIR, { recursive: true });

// Brand primary: hsl(207, 90%, 54%) → a bright sky blue.
const BRAND = "#1e9bf0";

const CARDS = [
  {
    slug: "renting-protect-id-documents",
    kicker: "Privacy · Renting",
    title: "Protect Your ID Documents\nWhen Renting a Home",
    sub: "A global renter's guide to sharing paperwork without inviting fraud.",
  },
  {
    slug: "batch-watermark-photos",
    kicker: "Tutorial · Batch",
    title: "Batch Watermark\n100+ Photos in Seconds",
    sub: "Manual editing vs. a browser tool — and why one wins on scale.",
  },
  {
    slug: "image-compression-guide",
    kicker: "Tutorial · Compression",
    title: "Compress Images Without\nLosing Quality",
    sub: "How lossy and lossless compression actually work in 2026.",
  },
  {
    slug: "what-is-digital-watermark",
    kicker: "Guide · Watermarks",
    title: "What Is a Digital\nWatermark in 2026?",
    sub: "Visible vs. invisible marks — and why they still matter.",
  },
  {
    slug: "social-media-image-sizes",
    kicker: "Guide · Social",
    title: "Social Media Image Sizes:\nThe Complete 2026 Guide",
    sub: "Every dimension for Instagram, Facebook, LinkedIn and X.",
  },
];

function html({ kicker, title, sub }) {
  const titleHtml = title
    .split("\n")
    .map((l) => `<span>${l}</span>`)
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body { width:1200px; height:630px; }
    body {
      font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background:
        radial-gradient(1200px 700px at 85% -10%, rgba(30,155,240,0.28), transparent 60%),
        radial-gradient(900px 600px at -5% 110%, rgba(30,155,240,0.15), transparent 55%),
        #0a0f1a;
      color:#f8fafc; position:relative; overflow:hidden;
    }
    .grid {
      position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size:48px 48px;
      mask-image: radial-gradient(900px 500px at 70% 30%, #000, transparent 75%);
    }
    .wrap { position:relative; padding:72px 80px; height:100%; display:flex; flex-direction:column; }
    .brandrow { display:flex; align-items:center; gap:16px; }
    .logo {
      width:52px; height:52px; border-radius:14px;
      background: linear-gradient(135deg, ${BRAND}, #0a6dc2);
      display:flex; align-items:center; justify-content:center;
      box-shadow: 0 8px 30px rgba(30,155,240,0.45);
    }
    .logo svg { width:28px; height:28px; }
    .brandname { font-size:26px; font-weight:700; letter-spacing:-0.02em; }
    .brandname b { color:${BRAND}; }
    .kicker {
      margin-top:auto; text-transform:uppercase; letter-spacing:0.22em;
      font-size:18px; font-weight:600; color:${BRAND};
    }
    h1 {
      margin-top:18px; font-size:66px; line-height:1.08;
      font-weight:800; letter-spacing:-0.03em;
    }
    h1 span { display:block; }
    .sub { margin-top:26px; font-size:27px; line-height:1.4; color:#94a3b8; max-width:820px; }
    .foot {
      margin-top:auto; display:flex; align-items:center; gap:14px;
      font-size:21px; color:#cbd5e1;
    }
    .dot { width:9px; height:9px; border-radius:50%; background:#22c55e; box-shadow:0 0 12px #22c55e; }
  </style></head>
  <body>
    <div class="grid"></div>
    <div class="wrap">
      <div class="brandrow">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5h16v14H4z" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M4 15l4.5-4.5L13 15l3-3 4 4" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9" cy="9" r="1.6" fill="#fff"/>
          </svg>
        </div>
        <div class="brandname">Image<b>Marker</b></div>
      </div>
      <div class="kicker">${kicker}</div>
      <h1>${titleHtml}</h1>
      <div class="sub">${sub}</div>
      <div class="foot"><span class="dot"></span> 100% in your browser · nothing uploaded · imagemarker.app</div>
    </div>
  </body></html>`;
}

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

for (const card of CARDS) {
  await page.setContent(html(card), { waitUntil: "networkidle0" });
  const out = resolve(OUT_DIR, `${card.slug}.png`);
  await page.screenshot({ path: out, type: "png" });
  console.log(`✓ ${out}`);
}

await browser.close();
console.log("done.");
