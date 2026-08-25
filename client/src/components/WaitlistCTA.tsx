import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle, MessageSquare } from "lucide-react";
import { trackWaitlistCtaView, trackWaitlistCtaClick } from "@/lib/analytics";
import { WaitlistForm, WAITLIST_FORM_COPY } from "@/components/WaitlistForm";
import type { Lang } from "@/lib/tools";

/** CTA 出現的位置，決定文案角度與埋點的 location 參數。 */
type CtaLocation = "download_success" | "homepage" | "blog_article";

interface WaitlistCTAProps {
  /** 目前工具，作為埋點的 tool_name（分辨哪個工具的完成頁最會轉換） */
  tool: string;
  lang?: Lang;
  /**
   * 出現位置，用於埋點區分轉換率：
   * download_success（剛做完事、高意圖）／ homepage ／ blog_article。
   */
  location?: CtaLocation;
  className?: string;
}

interface Prompt {
  title: string;
  body: string;
}

/**
 * 三個位置的鉤子文案刻意不同：剛下載完的人問「下次 100 張呢」最有畫面，
 * 首頁的人還沒做過事只能泛問，文章讀者則是從教學情境延伸。
 */
const PROMPTS: Record<Lang, Record<CtaLocation, Prompt>> = {
  zh: {
    download_success: {
      title: "你剛處理了圖片，如果下次是 100 張呢？",
      body: "告訴我們你需要什麼。你寫的一句話會直接決定我們下一個做什麼。",
    },
    homepage: {
      title: "覺得還缺什麼功能？花 10 秒告訴我們",
      body: "少了什麼、哪裡不順手都可以說。我們是照著這些回饋決定下一步的。",
    },
    blog_article: {
      title: "看完教學，覺得工具還缺什麼？",
      body: "教學裡沒解決的問題，正是我們想知道的。花 10 秒寫一句就好。",
    },
  },
  en: {
    download_success: {
      title: "You just did one image — what about 100 next time?",
      body: "Tell us what you need. What you write decides what we build next.",
    },
    homepage: {
      title: "Something still missing? Tell us in 10 seconds",
      body: "Anything that's missing or awkward. This is what we build from next.",
    },
    blog_article: {
      title: "Finished the guide — what's still missing from the tool?",
      body: "Whatever the guide didn't solve is exactly what we want to hear. One line is enough.",
    },
  },
  ja: {
    download_success: {
      title: "今回は 1 枚でしたが、次に 100 枚だったら？",
      body: "必要な機能を教えてください。次に作るものは、この一言で決まります。",
    },
    homepage: {
      title: "足りない機能はありますか？ 10 秒で教えてください",
      body: "不便な点でも構いません。次に何を作るかは、いただいた声で決めています。",
    },
    blog_article: {
      title: "記事を読んで、ツールに足りないと感じたことは？",
      body: "記事で解決できなかったことこそ知りたいです。一言で構いません。",
    },
  },
};

/**
 * 功能許願 CTA。展開後就地填、就地送，不再跳去 /waitlist。
 *
 * 為什麼改成 inline：舊版是一條連往 /waitlist 的按鈕，2,374 次曝光只有 11 次點擊
 * （0.46%）、2 次送出——瓶頸整個卡在「願不願意離開這一頁」。表單本身只有兩個欄位，
 * 跳頁的代價遠大於填表的代價，所以把表單搬到原地展開。
 * /waitlist 頁保留作為獨立入口（可分享、可從搜尋進來），兩邊送同一張 Netlify 表單。
 *
 * 表單本體在 WaitlistForm，與 PostDownloadHint 共用（欄位鍵名必須永遠一致）。
 *
 * 埋點：曝光 waitlist_cta_view（IntersectionObserver，真的進到視野才算）、
 * 展開 waitlist_cta_click、送出成功 waitlist_submit，三個事件都帶 location 與 lang。
 */
export function WaitlistCTA({
  tool,
  lang = "zh",
  location = "download_success",
  className = "",
}: WaitlistCTAProps) {
  const prompt = PROMPTS[lang][location] ?? PROMPTS[lang].homepage;
  const t = WAITLIST_FORM_COPY[lang];

  // 首頁同時有「完成畫面」與「頁尾」兩個實例，寫死的 id 會重複——useId 保證唯一。
  const uid = useId();
  const headingId = `${uid}-heading`;
  const formId = `${uid}-form`;

  const sectionRef = useRef<HTMLElement | null>(null);
  const viewFiredRef = useRef(false);

  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState(false);

  // 曝光以「真的進到視野」為準：首頁與文章底部的 CTA 掛載時多半還在螢幕外，
  // 用掛載即送會把分母灌大，CTR 看起來永遠很慘。
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const fire = () => {
      if (viewFiredRef.current) return;
      viewFiredRef.current = true;
      trackWaitlistCtaView(tool, location, lang);
    };

    // 舊瀏覽器沒有 IntersectionObserver 時退回舊行為，寧可高估也不要漏掉分母。
    if (typeof IntersectionObserver === "undefined") {
      fire();
      return;
    }

    // threshold 用 0 而不是 0.5：表單展開後這張卡會比手機視窗還高，
    // 比例式門檻在高卡片上可能永遠達不到。改用「露出且不只是折線上的一條縫」
    // ——底部 rootMargin 收 48px，卡片真的進來才算一次曝光。
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          fire();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -48px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [tool, location, lang]);

  const handleExpand = () => {
    setExpanded(true);
    trackWaitlistCtaClick(tool, location, lang);
  };

  return (
    <section
      ref={sectionRef}
      className={`overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-blue-50 to-white p-4 ${className}`}
      aria-labelledby={headingId}
    >
      {done ? (
        <div className="flex items-start gap-2.5">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" />
          <div>
            <h3 id={headingId} className="text-base font-semibold text-gray-900">
              {t.doneTitle}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{t.doneBody}</p>
          </div>
        </div>
      ) : (
        <>
          <h3
            id={headingId}
            className="flex items-start gap-2 text-base font-semibold text-gray-900"
          >
            <MessageSquare
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            {prompt.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{prompt.body}</p>

          {!expanded ? (
            <button
              type="button"
              onClick={handleExpand}
              aria-expanded={false}
              aria-controls={formId}
              className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              {t.cta}
            </button>
          ) : (
            <WaitlistForm
              id={formId}
              lang={lang}
              location={location}
              onSuccess={() => setDone(true)}
              className="mt-4"
            />
          )}
        </>
      )}
    </section>
  );
}
