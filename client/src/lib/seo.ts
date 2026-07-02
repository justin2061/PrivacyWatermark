// Lightweight client-side SEO helper for the blog pages.
//
// The site is a client-rendered SPA, so per-page <title>, meta description,
// canonical, Open Graph tags and JSON-LD structured data are applied at runtime.
// Googlebot renders JS for pages it crawls, so these still contribute to how
// each URL is understood once crawled. Call from a page's useEffect and use the
// returned cleanup to remove injected JSON-LD on unmount.

type JsonLd = Record<string, unknown>;

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

  // Language signals: og:locale for social crawlers, <html lang> for a11y/SEO.
  if (locale) {
    setMeta('meta[property="og:locale"]', "content", locale);
    document.documentElement.lang = locale.split(/[_-]/)[0];
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
  };
}

/** Standard breadcrumb: 首頁 › 部落格 › <title> (or Home › Blog › <title>) */
export function blogBreadcrumb(
  title: string,
  url: string,
  lang: "zh" | "en" = "zh"
): JsonLd {
  const en = lang === "en";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: en ? "Home" : "首頁",
        item: en ? "https://imagemarker.app/en/" : "https://imagemarker.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: en ? "Blog" : "部落格",
        item: en
          ? "https://imagemarker.app/en/blog"
          : "https://imagemarker.app/blog",
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
    image: "https://imagemarker.app/og-image.png",
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
