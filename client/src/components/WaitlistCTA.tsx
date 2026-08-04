import { useEffect, useId, useRef } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
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

interface CopyBlock {
  title: string;
  body: string;
  cta: string;
}

/**
 * 文案角度已從「賣 Pro」改成「問你需要什麼」：剛把圖處理完的人不想被推銷，
 * 但很願意抱怨少了什麼功能。先前 pain／early 兩版 A/B 都是在賣 Pro，
 * 兩版都沒有人送出表單，因此連同變體邏輯一起移除。
 */
const COPY: Record<Lang, CopyBlock> = {
  zh: {
    title: "覺得還缺什麼功能？花 10 秒告訴我們",
    body: "你剛用完，最知道哪裡不順手。你寫的一句話會直接決定我們下一個做什麼。",
    cta: "我想說",
  },
  en: {
    title: "Something still missing? Tell us in 10 seconds",
    body: "You just used it, so you know where it got awkward. What you write decides what we build next.",
    cta: "Tell us",
  },
  ja: {
    title: "足りない機能はありますか？ 10 秒で教えてください",
    body: "使ったばかりの今だからこそ、不便な点が分かるはず。次に作るものは、この一言で決まります。",
    cta: "ひとこと伝える",
  },
};

/** 許願頁路徑（zh 無語系前綴，與站上其他頁一致）。 */
function waitlistHref(lang: Lang): string {
  return lang === "zh" ? "/waitlist" : `/${lang}/waitlist`;
}

/**
 * 功能許願 CTA。在下載完成畫面裡，這張卡只在使用者「真的按下下載」之後才出現
 * （見 DownloadSuccess）——先讓人把事情做完，再問他還缺什麼。
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
        className="flex items-start gap-2 text-base font-semibold text-gray-900"
      >
        <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
        {t.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.body}</p>
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
