import { useEffect, useId, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { trackWaitlistCtaView, trackWaitlistCtaClick } from "@/lib/analytics";
import type { Lang } from "@/lib/tools";

interface WaitlistCTAProps {
  /** 目前工具，作為埋點的 tool_name（分辨哪個工具的完成頁最會轉換） */
  tool: string;
  lang?: Lang;
  /**
   * 出現位置，用於埋點區分轉換率：
   * download_success（剛做完事、高意圖）／ homepage ／ blog_article。
   */
  location?: string;
  className?: string;
}

const COPY: Record<Lang, { title: string; body: string; cta: string }> = {
  zh: {
    title: "需要大量處理、儲存預設或商用功能？",
    body: "Pro 版正在規劃中：一次處理上百張、儲存常用設定、商用授權。留個 Email 搶先知道，順便告訴我們合理的價格。",
    cta: "加入 Pro 候補名單",
  },
  en: {
    title: "Need bulk processing, saved presets or commercial use?",
    body: "Pro is in the works: hundreds of images at once, saved settings, commercial licence. Leave your email to hear first — and tell us what pricing is fair.",
    cta: "Join the Pro waitlist",
  },
  ja: {
    title: "大量処理・プリセット保存・商用利用が必要ですか？",
    body: "Pro を準備中です：一度に数百枚、設定の保存、商用ライセンス。メールを登録して、いち早くお知らせを受け取ってください。",
    cta: "Pro ウェイトリストに登録",
  },
};

/** 候補頁路徑（zh 無語系前綴，與站上其他頁一致）。 */
function waitlistHref(lang: Lang): string {
  return lang === "zh" ? "/waitlist" : `/${lang}/waitlist`;
}

/**
 * 下載完成後的 Pro 候補 CTA。放在 Ko-fi 贊助卡之前——贊助是「謝謝你」，
 * 候補是「你願意付錢嗎」，後者才是變現訊號，所以拿到更靠前的位置。
 * 出現送 waitlist_cta_view、點擊送 waitlist_cta_click。
 */
export function WaitlistCTA({
  tool,
  lang = "zh",
  location = "download_success",
  className = "",
}: WaitlistCTAProps) {
  const t = COPY[lang];
  const firedRef = useRef(false);
  // 首頁同時有「完成畫面」與「頁尾」兩個實例，寫死的 id 會重複——useId 保證唯一。
  const headingId = useId();

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackWaitlistCtaView(tool, location);
  }, [tool, location]);

  return (
    <section
      className={`rounded-lg border border-primary/30 bg-gradient-to-br from-blue-50 to-white p-4 ${className}`}
      aria-labelledby={headingId}
    >
      <h3
        id={headingId}
        className="flex items-start gap-2 text-sm font-semibold text-gray-900"
      >
        <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
        {t.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{t.body}</p>
      <a
        href={waitlistHref(lang)}
        onClick={() => trackWaitlistCtaClick(tool, location)}
        className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        {t.cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
