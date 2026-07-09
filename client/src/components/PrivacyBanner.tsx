import { useState } from "react";
import { Lock, ChevronDown } from "lucide-react";

interface PrivacyBannerProps {
  lang?: "zh" | "en";
  className?: string;
}

// 精簡版隱私信任標誌，一行呈現，可點「了解更多」展開完整說明
export function PrivacyBanner({ lang = "zh", className = "" }: PrivacyBannerProps) {
  const [expanded, setExpanded] = useState(false);
  const isEn = lang === "en";

  const t = isEn
    ? {
        headline: "100% local processing — your images never leave your browser.",
        more: "Learn more",
        less: "Show less",
        detail:
          "Everything runs in your browser — no image is ever uploaded to a server. Ideal for ID cards, passports, driver's licenses and any confidential document. Whenever you need to share a copy for renting, job applications or paperwork, add a watermark first to protect your personal data.",
      }
    : {
        headline: "100% 本地處理 — 您的圖片不會離開瀏覽器，完全安全",
        more: "了解更多",
        less: "收合",
        detail:
          "您的圖片完全在瀏覽器中處理，不會上傳到任何伺服器。適合處理身分證、護照、駕照、健保卡等各類證件影本及機密文件。無論是租屋、求職、辦理業務時需要提供證件影本，都建議先加上浮水印保護個資安全。",
      };

  return (
    <div
      className={`rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 ${className}`}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <Lock className="text-primary w-4 h-4 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm font-medium text-blue-900">{t.headline}</p>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="ml-auto inline-flex items-center gap-0.5 text-xs text-blue-700 hover:text-blue-900 transition-colors"
        >
          <span>{expanded ? t.less : t.more}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
      {expanded && (
        <p className="mt-2 text-sm text-blue-800 leading-relaxed">{t.detail}</p>
      )}
    </div>
  );
}
