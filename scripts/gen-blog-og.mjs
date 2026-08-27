// One-off generator for blog hero / Open Graph images (1200×630).
//
// Renders a dark, brand-blue HTML card per article with headless Chromium and
// screenshots it to client/public/og/<slug>.png (zh-TW and ja cards go into
// og/zh/ and og/ja/ because several slugs are shared across locales).
//
//   node scripts/gen-blog-og.mjs            # only the cards that don't exist yet
//   node scripts/gen-blog-og.mjs --force    # re-render everything
//
// Kept out of the build pipeline on purpose — the PNGs are committed, so we only
// regenerate when the set of cards changes.

import puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "client/public/og");
const FORCE = process.argv.includes("--force");

// Brand primary: hsl(207, 90%, 54%) → a bright sky blue.
const BRAND = "#1e9bf0";

const LATIN = `-apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

// The card text is baked into a PNG, so the machine that runs this script needs
// the CJK faces installed. Windows/macOS ship them; a bare Linux box may not.
const LOCALES = {
  en: {
    font: LATIN,
    foot: "100% in your browser · nothing uploaded · imagemarker.app",
  },
  zh: {
    dir: "zh",
    font: `"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", ${LATIN}`,
    foot: "全程在瀏覽器完成 · 不上傳任何檔案 · imagemarker.app",
  },
  ja: {
    dir: "ja",
    font: `"Noto Sans JP", "Hiragino Sans", "Yu Gothic", ${LATIN}`,
    foot: "ブラウザ内で完結 · アップロードなし · imagemarker.app",
  },
};

const CARDS = [
  // ── English ──────────────────────────────────────────────────────────────
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
  {
    slug: "real-estate-photo-watermarking",
    kicker: "Business · Real Estate",
    title: "Batch Watermark\nProperty Photos",
    sub: "Protect a whole shoot from scrapers and rental scams in two minutes.",
  },
  {
    slug: "watermark-etsy-product-photos",
    kicker: "Business · Etsy",
    title: "Stop Etsy\nPhoto Theft",
    sub: "Which product photos to mark, which to leave clean, and how to do 480 at once.",
  },
  {
    slug: "gdpr-compliant-watermarking",
    kicker: "Privacy · GDPR",
    title: "Zero Data Transfer\nWatermarking",
    sub: "Why a file that never leaves your browser removes the compliance problem.",
  },
  {
    slug: "batch-watermark-images",
    kicker: "Tutorial · Batch",
    title: "Watermark Multiple\nImages at Once",
    sub: "Mark a whole folder in one pass — free, and nothing gets uploaded.",
  },
  {
    slug: "best-watermark-generators",
    kicker: "Guide · Comparison",
    title: "5 Best Free\nWatermark Generators",
    sub: "What we tested in 2026 — and which ones never touch your files.",
  },
  {
    slug: "digital-identity-protection",
    kicker: "Privacy · Identity",
    title: "Digital Identity\nProtection in 7 Steps",
    sub: "Practical habits that keep your documents out of the wrong hands.",
  },
  {
    slug: "pdf-watermark-online-free",
    kicker: "Tutorial · PDF",
    title: "Watermark PDFs\nWithout Uploading",
    sub: "Contracts and proposals marked entirely inside your browser.",
  },
  {
    slug: "protect-photos-online",
    kicker: "Guide · Photographers",
    title: "How to Protect\nYour Photos Online",
    sub: "Watermarks, metadata and licensing — a working photographer's checklist.",
  },
  {
    slug: "remove-exif-data",
    kicker: "Privacy · Metadata",
    title: "What EXIF Data\nReveals About You",
    sub: "GPS coordinates, timestamps and serial numbers, hidden in every photo.",
  },
  {
    slug: "remove-exif-data-guide",
    kicker: "Tutorial · EXIF",
    title: "Remove EXIF Data\nOnline in Seconds",
    sub: "Strip GPS and camera metadata from any photo, right in your browser.",
  },
  {
    slug: "rental-scam-prevention",
    kicker: "Privacy · Renting",
    title: "Rental Application\nSafety Checklist",
    sub: "Watermark your documents before a landlord or agent ever sees them.",
  },
  {
    slug: "tinypng-iloveimg-squoosh-alternatives",
    kicker: "Guide · Comparison",
    title: "TinyPNG, iLoveIMG &\nSquoosh Alternatives",
    sub: "Free image tools that process everything locally — nothing leaves your device.",
  },
  {
    slug: "watermark-best-practices",
    kicker: "Guide · Design",
    title: "Watermark\nBest Practices",
    sub: "Placement, opacity and design choices that survive a screenshot.",
  },
  {
    slug: "watermark-id-before-sending-kyc",
    kicker: "Privacy · KYC",
    title: "Watermark Your ID\nBefore Sending It",
    sub: "Free KYC document protection that happens before the upload button.",
  },
  {
    slug: "watermark-id-before-sharing",
    kicker: "Privacy · ID",
    title: "Watermark Your ID\nBefore Sharing Online",
    sub: "Two minutes of work that makes a leaked copy far harder to reuse.",
  },
  {
    slug: "watermark-id-documents",
    kicker: "Tutorial · ID",
    title: "How to Watermark\nID Documents",
    sub: "Add a purpose note to any ID copy and protect your identity.",
  },
  {
    slug: "watermark-photos-free",
    kicker: "Guide · Free Tools",
    title: "Best Free Online\nWatermark Tool 2026",
    sub: "No account, no upload, and no watermark on your watermark.",
  },
  {
    slug: "watermark-photos-online",
    kicker: "Tutorial · Watermark",
    title: "Add a Watermark\nto Photos Online",
    sub: "The fastest free way to mark a photo in 2026 — nothing to install.",
  },

  {
    slug: "watermark-mykad-malaysia",
    kicker: "Privacy · Malaysia",
    title: "Watermark Your\nMyKad Copy",
    sub: "What to write, which fields to mask, and why the NRIC leaks more than you think.",
  },
  {
    slug: "watermark-aadhaar-card-india",
    kicker: "Privacy · India",
    title: "Protect Your\nAadhaar Card Copy",
    sub: "Masked Aadhaar, Virtual ID and a purpose-bound watermark, before you share.",
  },

  // ── 繁體中文 ──────────────────────────────────────────────────────────────
  {
    locale: "zh",
    slug: "anti-theft-photo-watermark",
    kicker: "教學 · 防盜圖",
    title: "防盜圖浮水印\n怎麼加最有效",
    sub: "攝影師與賣家都該會的 5 個實用技巧。",
  },
  {
    locale: "zh",
    slug: "batch-watermark-guide",
    kicker: "教學 · 批次",
    title: "一次幫幾十張照片\n加上浮水印",
    sub: "3 種批次浮水印方法比較，選出最省時的一種。",
  },
  {
    locale: "zh",
    slug: "batch-watermark-methods",
    kicker: "教學 · 批次",
    title: "批次幫證件影本\n加上浮水印",
    sub: "一次處理多張影本的 3 種做法比較。",
  },
  {
    locale: "zh",
    slug: "business-confidential-watermark",
    kicker: "商用 · 機密文件",
    title: "中小企業\n機密文件浮水印",
    sub: "不用買 DRM，也能幫公司文件加上一層保護。",
  },
  {
    locale: "zh",
    slug: "hk-rent-id-copy-watermark",
    kicker: "隱私 · 香港租屋",
    title: "香港租屋交身份證\n副本前先加浮水印",
    sub: "交出副本之前，先把用途寫清楚。",
  },
  {
    locale: "zh",
    slug: "hr-onboarding-watermark-sop",
    kicker: "商用 · 人資",
    title: "到職文件\n浮水印 SOP",
    sub: "新人證件影本這樣收，才符合個資保護要求。",
  },
  {
    locale: "zh",
    slug: "id-copy-leaked-consequences",
    kicker: "隱私 · 詐騙",
    title: "身分證影本外洩後\n會發生什麼事",
    sub: "2026 台灣詐騙手法大公開。",
  },
  {
    locale: "zh",
    slug: "id-photo-guide",
    kicker: "教學 · 證件照",
    title: "2026 證件照\n完全攻略",
    sub: "手機自拍、線上裁切、超商列印一次搞定。",
  },
  {
    locale: "zh",
    slug: "id-watermark-complete-guide",
    kicker: "教學 · 證件",
    title: "證件影本\n加浮水印教學",
    sub: "3 步驟完成，手機和電腦都適用。",
  },
  {
    locale: "zh",
    slug: "image-compression-guide",
    kicker: "教學 · 壓縮",
    title: "圖片太大\n該怎麼壓縮",
    sub: "5 種免費線上圖片壓縮工具實測比較。",
  },
  {
    locale: "zh",
    slug: "is-id-watermark-useful",
    kicker: "解析 · 證件",
    title: "身分證浮水印\n真的有用嗎",
    sub: "真相解析＋3 個真實案例。",
  },
  {
    locale: "zh",
    slug: "job-interview-id-copy-safety",
    kicker: "隱私 · 求職",
    title: "求職要交\n身分證影本？",
    sub: "先看懂這些陷阱，再學會安全提交。",
  },
  {
    locale: "zh",
    slug: "landlord-asks-for-id",
    kicker: "隱私 · 租屋",
    title: "房東要證件影本\n我該給嗎",
    sub: "完整分析交與不交的風險，以及折衷做法。",
  },
  {
    locale: "zh",
    slug: "malaysia-bank-account-ic-watermark",
    kicker: "隱私 · 馬來西亞",
    title: "馬來西亞開戶\nIC 影本怎麼保護",
    sub: "交出 IC 副本前，先加上用途浮水印。",
  },
  {
    locale: "zh",
    slug: "mobile-watermark-tutorial",
    kicker: "教學 · 手機",
    title: "手機怎麼幫身分證\n加浮水印",
    sub: "免安裝 App，用瀏覽器就能完成。",
  },
  {
    locale: "zh",
    slug: "mosaic-photo-online",
    kicker: "教學 · 馬賽克",
    title: "線上馬賽克\n完整教學",
    sub: "臉部、車牌、身分證字號、門牌一次遮好。",
  },
  {
    locale: "zh",
    slug: "other-documents-watermark",
    kicker: "隱私 · 證件",
    title: "不只身分證\n這些影本也要加",
    sub: "存摺、健保卡、駕照影本同樣需要保護。",
  },
  {
    locale: "zh",
    slug: "overseas-chinese-passport-watermark",
    kicker: "隱私 · 海外",
    title: "海外華人\n護照影本保護指南",
    sub: "寄出護照副本前，一定要先做的一件事。",
  },
  {
    locale: "zh",
    slug: "passport-copy-guide",
    kicker: "教學 · 護照",
    title: "護照影本\n怎麼印、能幹嘛",
    sub: "出國前的護照影本完整實務指南。",
  },
  {
    locale: "zh",
    slug: "passport-travel-agency-watermark",
    kicker: "隱私 · 旅行社",
    title: "護照影本交給\n旅行社安全嗎",
    sub: "報名旅行團前必做的自保 3 件事。",
  },
  {
    locale: "zh",
    slug: "passport-watermark-guide",
    kicker: "教學 · 護照",
    title: "護照影本\n也要加浮水印",
    sub: "出國前必看的護照安全指南。",
  },
  {
    locale: "zh",
    slug: "pdf-watermark-online",
    kicker: "教學 · PDF",
    title: "PDF 浮水印\n線上免費加",
    sub: "合約、報價單全程不用上傳就能加浮水印。",
  },
  {
    locale: "zh",
    slug: "privacy-protection-toolkit",
    kicker: "總覽 · 工具箱",
    title: "2026\n個資安全工具箱",
    sub: "浮水印＋馬賽克＋EXIF 清除，三步保護證件照片。",
  },
  {
    locale: "zh",
    slug: "realtor-id-watermark",
    kicker: "商用 · 房仲",
    title: "房仲證件\n浮水印教學",
    sub: "帶看前先幫客戶證件加保護，3 步驟做完。",
  },
  {
    locale: "zh",
    slug: "remove-exif-online",
    kicker: "教學 · EXIF",
    title: "照片 GPS\n一鍵移除教學",
    sub: "iPhone、Android、電腦都適用的 EXIF 刪除方法。",
  },
  {
    locale: "zh",
    slug: "rent-before-giving-id-3-things",
    kicker: "隱私 · 租屋",
    title: "給房東證件影本前\n這 3 件事要做",
    sub: "租屋族最容易忽略的自保步驟。",
  },
  {
    locale: "zh",
    slug: "rent-id-watermark",
    kicker: "範例 · 租屋",
    title: "租屋身分證影本\n加註怎麼寫",
    sub: "「僅供租屋使用」浮水印範例與寫法。",
  },
  {
    locale: "zh",
    slug: "rent-required-documents",
    kicker: "教學 · 租屋",
    title: "租屋簽約\n要交哪些文件",
    sub: "身分證影本安全交付指南。",
  },
  {
    locale: "zh",
    slug: "rent-scam-id-fraud",
    kicker: "隱私 · 詐騙",
    title: "租屋詐騙手法\n大公開",
    sub: "如何避免自己的證件被冒用。",
  },
  {
    locale: "zh",
    slug: "tinypng-iloveimg-squoosh-alternatives",
    kicker: "比較 · 圖片工具",
    title: "TinyPNG、iLoveIMG\nSquoosh 替代方案",
    sub: "不上傳伺服器的免費圖片工具比較。",
  },
  {
    locale: "zh",
    slug: "watermark-generators-recommendation",
    kicker: "比較 · 工具",
    title: "浮水印產生器\n推薦與比較",
    sub: "5 款免費線上工具實測（2026 最新）。",
  },
  {
    locale: "zh",
    slug: "id-copy-annotation-templates",
    kicker: "範本 · 簽註",
    title: "身分證影本\n簽註範本 20 組",
    sub: "常見場景寫好的簽註文字，一鍵複製直接用。",
  },
  {
    locale: "zh",
    slug: "watermark-templates-guide",
    kicker: "範例 · 簽註",
    title: "身分證影本\n簽註寫法與位置",
    sub: "10 種情境範本與證件浮水印範例。",
  },
  {
    locale: "zh",
    slug: "what-is-exif-data",
    kicker: "隱私 · EXIF",
    title: "你的照片\n藏了什麼秘密",
    sub: "EXIF 資訊一鍵清除教學。",
  },

  {
    locale: "zh",
    slug: "watermark-hkid",
    kicker: "隱私 · 香港",
    title: "香港身份證副本\n加水印完全指南",
    sub: "開戶口、租樓、搵工、電訊合約，四個場景各交到咩程度。",
  },

  // ── 日本語 ────────────────────────────────────────────────────────────────
  {
    locale: "ja",
    slug: "document-watermark-tool",
    kicker: "ガイド · ツール",
    title: "書類の透かし入れ\nツールの選び方",
    sub: "個人情報を守るための使い方まで解説。",
  },
  {
    locale: "ja",
    slug: "id-copy-watermark",
    kicker: "チュートリアル · 身分証",
    title: "身分証のコピーに\n透かしを入れる方法",
    sub: "ブラウザだけで完結、アップロードは一切なし。",
  },
  {
    locale: "ja",
    slug: "my-number-card-copy-safe",
    kicker: "プライバシー · マイナンバー",
    title: "マイナンバーカードの\nコピーを安全に送る",
    sub: "送る前にやっておきたい対策をまとめました。",
  },
  {
    locale: "ja",
    slug: "my-number-card-watermark",
    kicker: "チュートリアル · マイナンバー",
    title: "マイナンバーカードの\nコピーに透かしを入れる",
    sub: "口座開設・携帯契約・不動産、提出シーン別の3ステップ。",
  },
  {
    locale: "ja",
    slug: "passport-copy-privacy-guide",
    kicker: "プライバシー · パスポート",
    title: "パスポートコピーの\n個人情報保護ガイド",
    sub: "旅券番号・自署・MRZ を守る、渡す前の4つの対策。",
  },
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function html({ kicker, title, sub }, loc) {
  const titleHtml = title
    .split("\n")
    .map((l) => `<span>${esc(l)}</span>`)
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body { width:1200px; height:630px; }
    body {
      font-family: ${loc.font};
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
    h1 span { display:block; white-space:nowrap; }
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
      <div class="kicker">${esc(kicker)}</div>
      <h1>${titleHtml}</h1>
      <div class="sub">${esc(sub)}</div>
      <div class="foot"><span class="dot"></span> ${esc(loc.foot)}</div>
    </div>
  </body></html>`;
}

/** Shrink the headline until its longest line fits the 1040px content column. */
async function fitHeadline(page) {
  await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const max = document.querySelector(".wrap").clientWidth - 160;
    for (let size = 66; size >= 34; size -= 2) {
      h1.style.fontSize = `${size}px`;
      const widest = Math.max(
        ...[...h1.querySelectorAll("span")].map((s) => s.scrollWidth),
      );
      if (widest <= max) break;
    }
  });
}

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

let made = 0;
let skipped = 0;
for (const card of CARDS) {
  const loc = LOCALES[card.locale ?? "en"];
  const out = resolve(OUT_DIR, loc.dir ? `${loc.dir}/${card.slug}.png` : `${card.slug}.png`);
  if (!FORCE && existsSync(out)) {
    skipped++;
    continue;
  }
  mkdirSync(dirname(out), { recursive: true });
  await page.setContent(html(card, loc), { waitUntil: "networkidle0" });
  await fitHeadline(page);
  await page.screenshot({ path: out, type: "png" });
  console.log(`✓ ${out}`);
  made++;
}

await browser.close();
console.log(`done. ${made} generated, ${skipped} already present.`);
