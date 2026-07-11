import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { TOOLS, toolHref, type Lang, type NavKey } from "@/lib/tools";
import { trackInlineCta } from "@/lib/analytics";

type ToolKey = Exclude<NavKey, "blog">;

// 部落格文章底部的「熱門工具」快速入口預設清單
const DEFAULT_TOOLS: ToolKey[] = ["watermark", "mosaic", "exif-clean", "compress"];

interface PopularToolsProps {
  lang?: Lang;
  /** 覆寫顯示的工具清單（例如壓縮文章想改推壓縮相關工具） */
  tools?: ToolKey[];
  /** 追蹤用：文章 slug */
  location?: string;
  className?: string;
}

/**
 * 部落格文章結尾的「熱門工具」快速入口。
 * 補強 Clarity 觀察到的內部導航弱（平均只看 1.39 頁）與捲動深度不足問題，
 * 讓讀到文章後段的人有明確的下一步。點擊送出 GA4 inline_cta_click（end_article）。
 */
export function PopularTools({
  lang = "zh",
  tools = DEFAULT_TOOLS,
  location,
  className = "",
}: PopularToolsProps) {
  const isEn = lang === "en";
  const items = tools
    .map((key) => TOOLS.find((t) => t.key === key))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (items.length === 0) return null;

  const heading = isEn ? "Popular free tools" : "熱門工具";
  const subtitle = isEn
    ? "All run 100% in your browser — nothing is uploaded."
    : "全部 100% 在你的瀏覽器執行，圖片不會上傳。";

  return (
    <section
      className={`rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 ${className}`}
      aria-labelledby="popular-tools-heading"
    >
      <div className="mb-4">
        <h2
          id="popular-tools-heading"
          className="text-lg font-semibold text-gray-900"
        >
          {heading}
        </h2>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.key}
              href={toolHref(tool, lang)}
              onClick={() => trackInlineCta(tool.key, "end_article", location)}
              className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-primary hover:shadow-sm"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {tool.label[lang]}
                  </h3>
                  <ArrowRight
                    className="h-3.5 w-3.5 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-0.5 text-xs text-gray-600 leading-snug">
                  {tool.desc[lang]}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
