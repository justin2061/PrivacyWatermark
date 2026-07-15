import { useEffect } from "react";
import { Coffee } from "lucide-react";
import { trackKofiImpression, trackKofiClick } from "@/lib/analytics";
import type { Lang } from "@/lib/tools";

const KOFI_URL = "https://ko-fi.com/justinlee2061";

interface KofiSupportProps {
  lang?: Lang;
  /**
   * inline: 低調文字連結，放在操作卡片/footer（預設）
   * success: 完成下載後的高意圖 CTA 卡片
   */
  variant?: "inline" | "success";
  /** 埋點用的出現位置（如 download_success）；success variant 會在曝光時送出 kofi_impression。 */
  location?: string;
  className?: string;
}

/**
 * 全站統一的 Ko-fi 支持連結。
 * 收斂先前散落各頁、對比度不足（text-gray-400）且寫法不一的 Ko-fi 連結。
 * success variant 會追蹤曝光（kofi_impression）與點擊（kofi_click）。
 */
export function KofiSupport({
  lang = "zh",
  variant = "inline",
  location = variant === "success" ? "download_success" : "inline",
  className = "",
}: KofiSupportProps) {
  const t = {
    zh: {
      inline: "覺得好用？請我喝杯咖啡",
      successTitle: "ImageMarker 幫你節省了一些時間嗎？",
      successBody: "贊助 US$3，幫助我們持續提供免費、隱私優先的圖片工具。",
      successCta: "贊助 US$3",
    },
    en: {
      inline: "Buy me a coffee",
      successTitle: "Did ImageMarker save you some time?",
      successBody:
        "Chip in US$3 to help us keep these image tools free and privacy-first.",
      successCta: "Support with US$3",
    },
    ja: {
      inline: "役に立ったら、コーヒーを一杯",
      successTitle: "ImageMarker は時間の節約になりましたか？",
      successBody:
        "US$3 のご支援で、無料でプライバシー重視の画像ツールを続けられます。",
      successCta: "US$3 で支援する",
    },
  }[lang];

  // success variant 一出現就算一次曝光
  useEffect(() => {
    if (variant === "success") {
      trackKofiImpression(location);
    }
  }, [variant, location]);

  if (variant === "success") {
    return (
      <div
        className={`rounded-lg border border-amber-200 bg-amber-50 p-4 text-center ${className}`}
      >
        <p className="mb-1 text-sm font-medium text-amber-900">{t.successTitle}</p>
        <p className="mb-3 text-sm text-amber-800">{t.successBody}</p>
        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackKofiClick(location)}
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
      onClick={() => trackKofiClick(location)}
      className={`inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary ${className}`}
    >
      <Coffee className="h-4 w-4" aria-hidden="true" />
      {t.inline}
    </a>
  );
}
