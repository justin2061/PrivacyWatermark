import { useState } from "react";
import { Lock, ChevronDown } from "lucide-react";
import type { Lang } from "@/lib/tools";

interface PrivacyBannerProps {
  lang?: Lang;
  className?: string;
}

// 精簡版隱私信任標誌，一行呈現，可點「了解更多」展開完整說明
export function PrivacyBanner({ lang = "zh", className = "" }: PrivacyBannerProps) {
  const [expanded, setExpanded] = useState(false);

  const t = {
    zh: {
      headline: "100% 本地處理 — 您的圖片不會離開瀏覽器，完全安全",
      more: "了解更多",
      less: "收合",
      detail:
        "您的圖片完全在瀏覽器中處理，不會上傳到任何伺服器。適合處理身分證、護照、駕照、健保卡等各類證件影本及機密文件。無論是租屋、求職、辦理業務時需要提供證件影本，都建議先加上浮水印保護個資安全。",
    },
    en: {
      headline: "100% local processing — your images never leave your browser.",
      more: "Learn more",
      less: "Show less",
      detail:
        "Everything runs in your browser — no image is ever uploaded to a server. Ideal for ID cards, passports, driver's licenses and any confidential document. Whenever you need to share a copy for renting, job applications or paperwork, add a watermark first to protect your personal data.",
    },
    ja: {
      headline: "すべて端末内で処理 — 画像がブラウザの外に出ることはありません",
      more: "詳しく見る",
      less: "閉じる",
      detail:
        "画像の処理はすべてブラウザ内で完結し、サーバーにアップロードされることは一切ありません。運転免許証・パスポート・マイナンバーカード・健康保険証などの本人確認書類や、機密性の高い書類にも安心して使えます。賃貸契約、口座開設、入社手続きなどでコピーを提出するときは、送る前に透かしを入れて個人情報を守りましょう。",
    },
  }[lang];

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
