import { Coffee } from "lucide-react";

const KOFI_URL = "https://ko-fi.com/justinlee2061";

interface KofiSupportProps {
  lang?: "zh" | "en";
  /**
   * inline: 低調文字連結，放在操作卡片/footer（預設）
   * success: 完成下載後的高意圖 CTA 卡片
   */
  variant?: "inline" | "success";
  className?: string;
}

/**
 * 全站統一的 Ko-fi 支持連結。
 * 收斂先前散落各頁、對比度不足（text-gray-400）且寫法不一的 Ko-fi 連結。
 */
export function KofiSupport({ lang = "zh", variant = "inline", className = "" }: KofiSupportProps) {
  const t =
    lang === "en"
      ? {
          inline: "Buy me a coffee",
          successTitle: "Done! Was this tool helpful?",
          successCta: "Buy me a coffee",
        }
      : {
          inline: "覺得好用？請我喝杯咖啡",
          successTitle: "完成！這個工具對你有幫助嗎？",
          successCta: "請我喝杯咖啡",
        };

  if (variant === "success") {
    return (
      <div
        className={`rounded-lg border border-amber-200 bg-amber-50 p-4 text-center ${className}`}
      >
        <p className="mb-3 text-sm font-medium text-amber-900">{t.successTitle}</p>
        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
        >
          <Coffee className="h-4 w-4" aria-hidden="true" />
          {t.successCta}
        </a>
      </div>
    );
  }

  // inline
  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary ${className}`}
    >
      <Coffee className="h-4 w-4" aria-hidden="true" />
      {t.inline}
    </a>
  );
}
