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
  /** One or more JSON-LD objects (Article, FAQPage, BreadcrumbList, ItemList…). */
  jsonLd?: JsonLd | JsonLd[];
}

function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function setPageSeo({
  title,
  description,
  canonical,
  locale,
  ogImage,
  alternates,
  jsonLd,
}: PageSeoOptions): () => void {
  document.title = title;

  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="title"]', "content", title);
  setMeta('link[rel="canonical"]', "href", canonical);

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
  if (locale) {
    setMeta('meta[property="og:locale"]', "content", locale);
    document.documentElement.lang = locale.split(/[_-]/)[0];
  }

  // hreflang: replace the shell's homepage set wholesale, so a page never
  // advertises the homepage's translations as its own. Google needs every URL in
  // the set to point back at the others, so callers pass the full cluster.
  const altNodes: HTMLLinkElement[] = [];
  if (alternates) {
    document
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
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
