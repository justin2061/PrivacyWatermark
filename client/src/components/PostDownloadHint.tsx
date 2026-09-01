import { useEffect, useId, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WaitlistForm, WAITLIST_FORM_COPY } from "@/components/WaitlistForm";
import {
  DOWNLOAD_COMPLETE_EVENT,
  trackWaitlistCtaView,
  trackWaitlistCtaClick,
} from "@/lib/analytics";
import type { Lang } from "@/lib/tools";

/** 這個觸發點的埋點 location，用來與其他位置的 CTA 分開比較轉換率。 */
const LOCATION = "post-download";

/** 下載完成到淡入之間的間隔：讓「檔案存好了」先落地，再出現這行字。 */
const APPEAR_DELAY_MS = 1000;

interface HintCopy {
  question: string;
  link: string;
}

/**
 * 掛這個 CTA 的工具。刻意只開放浮水印與批次浮水印兩種：
 * EXIF 清除、格式轉換那類使用者不是 Pro 的目標受眾，問了也只是多一行雜訊。
 * 用 union 而非 string，是為了讓「加到別的工具頁」在編譯期就擋下來。
 */
type HintTool = "watermark" | "batch";

/**
 * 文案分工具：批次頁的使用者剛做完批次處理，再問他「需要批次處理嗎」很怪，
 * 要往上問下一個天花板（API 串接、張數上限）。
 * ja 只有單張浮水印頁，沒有批次頁，因此 batch.ja 留空——查不到就不顯示。
 */
const COPY: Record<HintTool, Partial<Record<Lang, HintCopy>>> = {
  watermark: {
    zh: { question: "需要批次處理或 API？", link: "告訴我們" },
    en: { question: "Need batch processing or API?", link: "Let us know" },
    ja: { question: "一括処理やAPIが必要ですか？", link: "お知らせください" },
  },
  batch: {
    zh: { question: "需要 API 串接或更高的張數上限？", link: "告訴我們" },
    en: { question: "Need API access or higher batch limits?", link: "Let us know" },
  },
};

interface PostDownloadHintProps {
  /** 目前工具，決定文案角度，同時作為埋點的 tool_name。 */
  tool: HintTool;
  lang?: Lang;
  className?: string;
}

/**
 * 下載按鈕正下方的低干擾候補入口：下載成功後才淡入的一行灰字。
 *
 * 為什麼要另做一個而不是再放一張 WaitlistCTA 卡：現有卡片式 CTA 的轉換率只有 0.26%，
 * 問題不在文案而在時機與體積——使用者還在「把事情做完」的動線上，一張帶邊框與強調色的卡
 * 等於半路攔車。這裡改成：等下載真的完成、隔 1 秒再淡入一行純灰小字，不搶視覺權重，
 * 願意開口的人自己點；點了才就地展開表單（與 WaitlistCTA 同一個 WaitlistForm）。
 *
 * 只在桌面版掛載：手機螢幕小，任何多出來的一行都更接近干擾，先不動（沿用全站 768px 斷點）。
 * 也只掛在浮水印與批次浮水印兩種頁面（見 HintTool），文案分工具問下一個天花板。
 *
 * 埋點：waitlist_cta_view / waitlist_cta_click，location 皆為 post-download。
 * 曝光同樣走 IntersectionObserver，與其他位置的曝光定義一致，數字才能直接比。
 */
export function PostDownloadHint({ tool, lang = "zh", className = "" }: PostDownloadHintProps) {
  // 查不到（目前只有 ja 的批次頁）就整個不顯示，不是 fallback 到別的語系文案。
  const c = COPY[tool][lang];
  const t = WAITLIST_FORM_COPY[lang];
  const isMobile = useIsMobile();

  const uid = useId();
  const formId = `${uid}-form`;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewFiredRef = useRef(false);

  // 下載完成 + 延遲後才進 DOM，掛載時由 animate-fade-in 淡入（見 tailwind.config.ts）。
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState(false);

  // 各工具頁的下載按鈕會呼叫 trackDownloadComplete，它同時廣播這個 window 事件。
  // 走事件而非 props，是為了不用把下載狀態穿過每一個工具頁的元件樹。
  useEffect(() => {
    if (isMobile || !c) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const onDownloaded = () => {
      // 重複下載不重來一次淡入：已經出現的字不該閃一下再淡入。
      if (timer !== undefined) return;
      timer = setTimeout(() => setMounted(true), APPEAR_DELAY_MS);
    };

    window.addEventListener(DOWNLOAD_COMPLETE_EVENT, onDownloaded);
    return () => {
      window.removeEventListener(DOWNLOAD_COMPLETE_EVENT, onDownloaded);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [isMobile, c]);

  // 曝光以「真的進到視野」為準，與 WaitlistCTA 同一套定義。
  // 下載按鈕多半就在視野內，但左欄在桌面是可捲動的，仍可能落在折線下。
  useEffect(() => {
    if (!mounted) return;
    const node = rootRef.current;
    if (!node) return;

    const fire = () => {
      if (viewFiredRef.current) return;
      viewFiredRef.current = true;
      trackWaitlistCtaView(tool, LOCATION, lang);
    };

    if (typeof IntersectionObserver === "undefined") {
      fire();
      return;
    }

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
  }, [mounted, tool, lang]);

  // 手機版暫時不加這個觸發點——連事件監聽都不掛，不會產生 post-download 的曝光數。
  if (isMobile || !c || !mounted) return null;

  return (
    <div
      ref={rootRef}
      className={`animate-fade-in motion-reduce:animate-none ${className}`}
    >
      {done ? (
        <p className="text-xs leading-relaxed text-gray-500">
          {t.doneTitle} {t.doneBody}
        </p>
      ) : !expanded ? (
        <p className="text-xs leading-relaxed text-gray-500">
          {c.question}{" "}
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              trackWaitlistCtaClick(tool, LOCATION, lang);
            }}
            aria-expanded={false}
            aria-controls={formId}
            className="underline underline-offset-2 transition-colors hover:text-gray-700"
          >
            {c.link}
          </button>
        </p>
      ) : (
        <WaitlistForm
          id={formId}
          lang={lang}
          location={LOCATION}
          onSuccess={() => setDone(true)}
          className="text-left"
        />
      )}
    </div>
  );
}
