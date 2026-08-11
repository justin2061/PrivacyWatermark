// Lightweight client-side SEO helper for the blog pages.
//
// The site is a client-rendered SPA, so per-page <title>, meta description,
// canonical, Open Graph tags and JSON-LD structured data are applied at runtime.
// Googlebot renders JS for pages it crawls, so these still contribute to how
// each URL is understood once crawled. Call from a page's useEffect and use the
// returned cleanup to remove injected JSON-LD on unmount.

type JsonLd = Record<string, unknown>;

/** One <link rel="alternate" hreflang="…"> entry. */
export interface Alternate {
  /** e.g. "zh-TW", "en", "ja", "x-default" */
  hreflang: string;
  href: string;
}

interface PageSeoOptions {
  title: string;
  description: string;
  canonical: string;
  /**
   * BCP-47 / Open Graph locale, e.g. "en_US" or "zh_TW". When set, updates
   * og:locale and the <html lang> attribute so English pages don't inherit the
   * shell's Chinese defaults. Accepts either "en" or "en_US" style values.
   */
  locale?: string;
  /**
   * Absolute URL of the social preview image (1200×630). When set, overrides the
   * shell's default og:image/twitter:image so each article gets its own card.
   */
  ogImage?: string;
  /**
   * Per-page hreflang set. The shell (index.html) ships the homepage's
   * alternates, which are wrong for every other URL — pass this on any page
   * that has real translations and the whole set is replaced. Pages that omit
   * it keep the shell's tags unchanged.
   */
  alternates?: Alternate[];
  /**
   * Page-specific meta keywords. Omit and the page gets the default set for its
   * `locale` (see KEYWORDS below) — which is what every page wants unless it
   * targets terms the language-wide list doesn't cover.
   */
  keywords?: string | string[];
  /** One or more JSON-LD objects (Article, FAQPage, BreadcrumbList, ItemList…). */
  jsonLd?: JsonLd | JsonLd[];
  /**
   * Keep the URL out of the index while still letting Google follow its links.
   * For thin tool pages that only ship a UI with no explanatory copy: they earn
   * impressions but rank in the 40–80 range, so they dilute the site's crawl
   * budget instead of adding to it. The shell ships "index, follow"; set this
   * and the page emits "noindex, follow" instead.
   */
  noindex?: boolean;
}

function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * meta keywords, one set per language.
 *
 * index.html hard-codes the Chinese list, and nothing ever overwrote it — so
 * every /en/ and /ja/ URL shipped a page of English (or Japanese) copy carrying
 * "身分證浮水印,護照影本浮水印,…". That's a mixed-language signal on a site whose
 * whole international setup rests on hreflang, and it's the one tag that
 * contradicted the locale the page otherwise declares everywhere else.
 *
 * Keyed by the primary subtag of `locale`, which every non-Chinese page already
 * passes ("en_US" / "ja_JP") — so a single default here fixes all of them at
 * once instead of 40+ per-page edits, and pages added later inherit the fix.
 */
const KEYWORDS = {
  zh: "浮水印工具,圖片浮水印,證件浮水印,身分證浮水印,護照浮水印,駕照浮水印,護照影本浮水印,健保卡浮水印,证件水印,护照水印,驾照水印,线上水印,線上浮水印,免費浮水印,隱私保護,個資保護,本地處理,PWA,離線工具,圖片編輯,文件保護,租屋證件,求職證件",
  en: "watermark generator,online watermark tool,free watermark maker,watermark ID card,passport watermark,document watermark,PDF watermark,batch watermark,EXIF remover,remove GPS from photo,image metadata removal,mosaic tool,blur sensitive info,image compressor,image converter,image resizer,privacy tools,no upload,browser-based,client-side image editor",
  ja: "透かし,ウォーターマーク,画像 透かし,無料 透かし,本人確認書類 透かし,マイナンバーカード コピー,運転免許証 コピー 透かし,パスポート コピー 透かし,PDF 透かし,EXIF 削除,GPS 情報 削除,画像 圧縮,オンライン 無料,アップロード不要,ブラウザ処理,プライバシー保護",
} as const;

export function setPageSeo({
  title,
  description,
  canonical,
  locale,
  ogImage,
  alternates,
  keywords,
  jsonLd,
  noindex,
}: PageSeoOptions): () => void {
  document.title = title;

  // The shell hard-codes "index, follow", so only touch it when a page opts out.
  // Left alone otherwise, so navigating away from a noindex page in the SPA
  // can't leak the directive onto the next route.
  setMeta(
    'meta[name="robots"]',
    "content",
    noindex ? "noindex, follow" : "index, follow",
  );

  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="title"]', "content", title);
  setMeta('link[rel="canonical"]', "href", canonical);

  // Always written, never left to the shell's value: in the SPA the tag is
  // shared state, so a page that skipped it would keep whatever the previously
  // visited route left behind (e.g. English keywords after /en/ → /blog).
  const lang = (locale ?? "zh").split(/[_-]/)[0] as keyof typeof KEYWORDS;
  setMeta(
    'meta[name="keywords"]',
    "content",
    (Array.isArray(keywords) ? keywords.join(",") : keywords) ??
      KEYWORDS[lang] ??
      KEYWORDS.zh,
  );

  // Open Graph / Twitter — keep social previews in sync with the page.
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", canonical);
  setMeta('meta[property="twitter:title"]', "content", title);
  setMeta('meta[property="twitter:description"]', "content", description);
  setMeta('meta[property="twitter:url"]', "content", canonical);

  // Per-page social image, when provided (falls back to the shell default).
  if (ogImage) {
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="twitter:image"]', "content", ogImage);
  }

  // Language signals: og:locale for social crawlers, <html lang> for a11y/SEO.
  // Both are shared SPA state like the keywords tag above, so the no-locale case
  // has to restore the shell's Chinese defaults rather than leave them alone —
  // otherwise /en/ → /mosaic left Chinese copy sitting under <html lang="en">.
  setMeta('meta[property="og:locale"]', "content", locale ?? "zh_TW");
  document.documentElement.lang = locale ? locale.split(/[_-]/)[0] : "zh-TW";

  // hreflang: clear the shell's homepage set on EVERY page, not just pages that
  // supply their own. index.html hard-codes the homepage cluster (zh → "/",
  // en → "/en/", ja → "/ja/"), so any page that skipped this told Google
  // "my English version is the English homepage" — e.g. /en/compress claimed
  // /en/ as its own en alternate while /en/ claimed the same, an inconsistent
  // cluster that contradicts sitemap.xml and gets discarded.
  //
  // A page with no translation should therefore emit NO hreflang at all (a
  // one-entry cluster says nothing), and a page with translations passes the
  // whole cluster — Google needs every URL in it to point back at the others.
  const altNodes: HTMLLinkElement[] = [];
  document
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
  if (alternates) {
    for (const { hreflang, href } of alternates) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      link.setAttribute("data-page-seo", "true");
      document.head.appendChild(link);
      altNodes.push(link);
    }
  }

  const nodes: HTMLScriptElement[] = [];
  if (jsonLd) {
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    for (const block of blocks) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-seo", "true");
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      nodes.push(script);
    }
  }

  return () => {
    for (const node of nodes) node.remove();
    for (const node of altNodes) node.remove();
  };
}

/**
 * The hreflang cluster for a page that exists in every locale. `paths` are
 * absolute site paths, e.g. localeAlternates({ zh: "/blog", en: "/en/blog",
 * ja: "/ja/blog" }). x-default points at English, matching the shell.
 */
export function localeAlternates(paths: {
  zh: string;
  en: string;
  ja?: string;
}): Alternate[] {
  const abs = (p: string) => `https://imagemarker.app${p}`;
  const list: Alternate[] = [
    { hreflang: "zh-TW", href: abs(paths.zh) },
    { hreflang: "zh", href: abs(paths.zh) },
    { hreflang: "en", href: abs(paths.en) },
  ];
  if (paths.ja) list.push({ hreflang: "ja", href: abs(paths.ja) });
  list.push({ hreflang: "x-default", href: abs(paths.en) });
  return list;
}

const BREADCRUMB_LABELS = {
  zh: { home: "首頁", blog: "部落格", homeUrl: "/", blogUrl: "/blog" },
  en: { home: "Home", blog: "Blog", homeUrl: "/en/", blogUrl: "/en/blog" },
  ja: { home: "ホーム", blog: "ブログ", homeUrl: "/ja/", blogUrl: "/ja/blog" },
} as const;

/** Standard breadcrumb: 首頁 › 部落格 › <title> (localised per lang). */
export function blogBreadcrumb(
  title: string,
  url: string,
  lang: "zh" | "en" | "ja" = "zh"
): JsonLd {
  const l = BREADCRUMB_LABELS[lang];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: l.home,
        item: `https://imagemarker.app${l.homeUrl}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: l.blog,
        item: `https://imagemarker.app${l.blogUrl}`,
      },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };
}

/** WebApplication schema for a browser-based tool page. */
export function webAppSchema(opts: {
  name: string;
  description: string;
  url: string;
  /** e.g. "zh-TW" (default) or "en" */
  inLanguage?: string;
  featureList?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: opts.inLanguage ?? "zh-TW",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(opts.featureList ? { featureList: opts.featureList } : {}),
    publisher: {
      "@type": "Organization",
      name: "ImageMarker",
      logo: {
        "@type": "ImageObject",
        url: "https://imagemarker.app/icon.svg",
      },
    },
  };
}

/** Article schema for a blog post. */
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  /** Absolute URL of the article's hero/social image. Defaults to the site card. */
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Organization", name: "ImageMarker" },
    publisher: {
      "@type": "Organization",
      name: "ImageMarker",
      logo: {
        "@type": "ImageObject",
        url: "https://imagemarker.app/icon.svg",
      },
    },
    image: opts.image ?? "https://imagemarker.app/og-image.png",
  };
}

/**
 * Schema for a blog index page: a Blog node whose posts are spelled out as
 * BlogPosting entries, plus the 首頁 › 部落格 breadcrumb.
 *
 * The three index pages (/blog, /en/blog, /ja/blog) shipped with no structured
 * data at all while every article under them had Article + BreadcrumbList — so
 * the hubs were the only pages in the cluster Google had to infer from markup
 * alone. `posts` are listed newest-first, matching the on-page order.
 */
export function blogIndexSchema(opts: {
  name: string;
  description: string;
  url: string;
  lang?: "zh" | "en" | "ja";
  posts: { slug: string; title: string; date: string; summary?: string }[];
  /** Path prefix for a post URL, e.g. "/blog" or "/en/blog". */
  postBase: string;
}): JsonLd[] {
  const lang = opts.lang ?? "zh";
  const inLanguage = { zh: "zh-TW", en: "en", ja: "ja" }[lang];
  const abs = (p: string) => `https://imagemarker.app${p}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: opts.name,
      description: opts.description,
      url: opts.url,
      inLanguage,
      publisher: {
        "@type": "Organization",
        name: "ImageMarker",
        logo: {
          "@type": "ImageObject",
          url: "https://imagemarker.app/icon.svg",
        },
      },
      blogPost: opts.posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        ...(p.summary ? { description: p.summary } : {}),
        datePublished: p.date,
        url: abs(`${opts.postBase}/${p.slug}`),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": abs(`${opts.postBase}/${p.slug}`),
        },
        author: { "@type": "Organization", name: "ImageMarker" },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: BREADCRUMB_LABELS[lang].home,
          item: abs(BREADCRUMB_LABELS[lang].homeUrl),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: BREADCRUMB_LABELS[lang].blog,
          item: opts.url,
        },
      ],
    },
  ];
}

/** HowTo schema from an ordered list of steps. */
export function howToSchema(opts: {
  name: string;
  description?: string;
  steps: { name: string; text: string }[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** FAQPage schema from question/answer pairs. */
export function faqSchema(qa: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
