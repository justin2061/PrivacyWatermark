import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import {
  TOOLS,
  toolHref,
  type Lang,
  type NavKey,
} from "@/lib/tools";
import { trackToolRecommendation } from "@/lib/analytics";

type ToolKey = Exclude<NavKey, "blog">;

// 每個工具完成後，推薦「你可能也需要」的相關工具（依情境挑選）
const RECOMMENDATIONS: Record<ToolKey, ToolKey[]> = {
  watermark: ["mosaic", "exif-clean", "compress"],
  batch: ["watermark", "compress", "exif-clean"],
  "pdf-watermark": ["watermark", "compress", "mosaic"],
  mosaic: ["watermark", "exif-clean", "compress"],
  "exif-clean": ["watermark", "compress", "mosaic"],
  compress: ["convert", "resize", "watermark"],
  convert: ["compress", "resize", "watermark"],
  resize: ["compress", "convert", "social-crop"],
  "remove-bg": ["social-crop", "resize", "compress"],
  "social-crop": ["resize", "remove-bg", "compress"],
};

interface ToolRecommendationsProps {
  /** 目前所在工具 */
  current: ToolKey;
  lang?: Lang;
  className?: string;
}

/**
 * 工具完成操作（下載成功）後顯示的「你可能也需要」推薦區塊。
 * 目的是提高內部導航與平均瀏覽頁數（Clarity：平均只看 1.39 頁）。
 * 點擊會送出 GA4 tool_recommendation_click（from_tool / to_tool）。
 */
export function ToolRecommendations({
  current,
  lang = "zh",
  className = "",
}: ToolRecommendationsProps) {
  const keys = RECOMMENDATIONS[current] ?? [];
  const tools = keys
    .map((key) => TOOLS.find((t) => t.key === key))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (tools.length === 0) return null;

  const heading = {
    zh: "你可能也需要",
    en: "You might also need",
    ja: "こちらもおすすめ",
  }[lang];

  return (
    <section
      className={`rounded-xl border border-gray-200 bg-white p-5 sm:p-6 ${className}`}
      aria-labelledby="tool-reco-heading"
    >
      <h2
        id="tool-reco-heading"
        className="mb-4 text-base font-semibold text-gray-900"
      >
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.key}
              href={toolHref(tool, lang)}
              onClick={() => trackToolRecommendation(current, tool.key)}
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
