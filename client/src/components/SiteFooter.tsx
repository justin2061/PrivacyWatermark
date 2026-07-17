import { Link } from "wouter";
import {
  CATEGORIES,
  toolHref,
  toolsByCategory,
  type Lang,
} from "@/lib/tools";

interface SiteFooterProps {
  lang?: Lang;
  className?: string;
}

// 部落格連結（各語系都有 /blog 首頁）與版權標語，集中在這裡以免各頁再度漂移。
const BLOG_LINK: Record<Lang, { href: string; label: string }> = {
  zh: { href: "/blog", label: "教學文章" },
  en: { href: "/en/blog", label: "Blog" },
  ja: { href: "/ja/blog", label: "ブログ" },
};

const TAGLINE: Record<Lang, string> = {
  zh: "保護您的隱私安全",
  en: "Protect your privacy",
  ja: "プライバシーを守る",
};

const MORE_HEADING: Record<Lang, string> = {
  zh: "更多",
  en: "More",
  ja: "その他",
};

/**
 * 全站共用頁尾。取代先前散落在 20+ 個頁面、內容已漂移的 inline footer：
 * 連結一律由 lib/tools.ts 動態生成（依 lang 產出正確語系路徑），版權統一為
 * 「© 2026 ImageMarker」，並帶 role="contentinfo" 供無障礙與 SEO 使用。
 */
export function SiteFooter({ lang = "zh", className = "" }: SiteFooterProps) {
  const blog = BLOG_LINK[lang];

  return (
    <footer
      className={`bg-white border-t border-gray-200 mt-16 ${className}`}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {CATEGORIES.map((category) => (
            <nav key={category.id} aria-label={category.label[lang]}>
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                {category.label[lang]}
              </h2>
              <ul className="space-y-2">
                {toolsByCategory(category.id).map((tool) => (
                  <li key={tool.key}>
                    <Link
                      href={toolHref(tool, lang)}
                      className="text-sm text-gray-600 hover:text-primary hover:underline"
                    >
                      {tool.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label={MORE_HEADING[lang]}>
            <h2 className="mb-3 text-sm font-semibold text-gray-900">
              {MORE_HEADING[lang]}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href={blog.href}
                  className="text-sm text-gray-600 hover:text-primary hover:underline"
                >
                  {blog.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            © 2026 ImageMarker — {TAGLINE[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
