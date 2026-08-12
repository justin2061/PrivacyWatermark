import { useEffect, useId, useRef, useState } from "react";
import { AlertTriangle, CheckCircle, Loader2, Lock, MessageSquare, Send } from "lucide-react";
import { trackWaitlistCtaView, trackWaitlistCtaClick, trackWaitlistSubmit } from "@/lib/analytics";
import { isValidEmail, submitFeatureRequest } from "@/lib/waitlist";
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

interface FormCopy {
  cta: string;
  requestLabel: string;
  requestPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  submitting: string;
  privacy: string;
  doneTitle: string;
  doneBody: string;
  errorTitle: string;
  errorNetwork: string;
  errorRejected: string;
  emailInvalid: string;
  requestRequired: string;
}

/** 表單本身的文案三處共用——差異化只在上方的鉤子問句。 */
const FORM_COPY: Record<Lang, FormCopy> = {
  zh: {
    cta: "我想說",
    requestLabel: "你最想要什麼功能？",
    requestPlaceholder: "例如：一次處理 100 張、保存常用範本、PDF 批次輸出…",
    emailLabel: "你的 Email（功能做好通知你）",
    emailPlaceholder: "you@example.com",
    submit: "送出建議",
    submitting: "送出中…",
    privacy: "Email 只用來在功能做好時通知你，不會轉售、不寄廣告。",
    doneTitle: "收到了！",
    doneBody: "我們會在功能準備好時通知你。謝謝你花時間告訴我們。",
    errorTitle: "送出失敗",
    errorNetwork: "看起來是網路問題，請稍後再試一次。",
    errorRejected: "表單暫時無法送出。請稍後再試，或直接寄信到 madoka2000@gmail.com 告訴我們。",
    emailInvalid: "請輸入有效的 Email 位址。",
    requestRequired: "寫一句就好，讓我們知道你想要什麼。",
  },
  en: {
    cta: "Tell us",
    requestLabel: "What feature do you want most?",
    requestPlaceholder: "e.g. process 100 images at once, save my usual presets, batch PDF export…",
    emailLabel: "Your email (so we can tell you when it ships)",
    emailPlaceholder: "you@example.com",
    submit: "Send suggestion",
    submitting: "Sending…",
    privacy: "Your email is only used to tell you when the feature ships. No reselling, no spam.",
    doneTitle: "Got it!",
    doneBody: "We'll let you know as soon as the feature is ready. Thanks for taking the time.",
    errorTitle: "Couldn't submit",
    errorNetwork: "Looks like a network problem — please try again in a moment.",
    errorRejected:
      "The form didn't go through. Please try again shortly, or just email madoka2000@gmail.com.",
    emailInvalid: "Please enter a valid email address.",
    requestRequired: "One line is enough — just tell us what you want.",
  },
  ja: {
    cta: "ひとこと伝える",
    requestLabel: "いちばん欲しい機能は何ですか？",
    requestPlaceholder: "例：一度に 100 枚処理、よく使う設定の保存、PDF の一括出力…",
    emailLabel: "メールアドレス（機能公開時にお知らせします）",
    emailPlaceholder: "you@example.com",
    submit: "送信する",
    submitting: "送信中…",
    privacy: "メールは機能公開のお知らせにのみ使用します。転売なし、広告なし。",
    doneTitle: "受け取りました！",
    doneBody: "機能が準備でき次第、お知らせします。ご協力ありがとうございます。",
    errorTitle: "送信できませんでした",
    errorNetwork: "ネットワークの問題のようです。少し時間をおいて再度お試しください。",
    errorRejected:
      "送信できませんでした。時間をおいて再度お試しいただくか、madoka2000@gmail.com までご連絡ください。",
    emailInvalid: "有効なメールアドレスを入力してください。",
    requestRequired: "一言で構いません。ご要望をお聞かせください。",
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
  const t = FORM_COPY[lang];

  // 首頁同時有「完成畫面」與「頁尾」兩個實例，寫死的 id 會重複——useId 保證唯一。
  const uid = useId();
  const headingId = `${uid}-heading`;
  const formId = `${uid}-form`;
  const requestId = `${uid}-request`;
  const emailId = `${uid}-email`;

  const sectionRef = useRef<HTMLElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const viewFiredRef = useRef(false);

  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [featureRequest, setFeatureRequest] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorBody, setErrorBody] = useState("");
  const [validation, setValidation] = useState("");

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

  // 展開後直接把游標放進問題欄，少一次點擊。
  // 用 effect 而非在 click handler 裡 rAF：rAF 有可能早於 React 把 textarea
  // 掛上 DOM（scheduler 走的是 macrotask），那時 ref 還是 null，focus 就靜默失效。
  useEffect(() => {
    if (expanded) textareaRef.current?.focus();
  }, [expanded]);

  const handleExpand = () => {
    setExpanded(true);
    trackWaitlistCtaClick(tool, location, lang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const request = featureRequest.trim();
    if (!request) {
      setValidation(t.requestRequired);
      return;
    }
    if (!isValidEmail(email)) {
      setValidation(t.emailInvalid);
      return;
    }
    setValidation("");
    setStatus("submitting");

    const result = await submitFeatureRequest({
      email,
      featureRequest: request,
      lang,
      source: location,
    });

    if (!result.ok) {
      // 明確顯示錯誤：靜默失敗等於白白丟掉一個願意開口的人
      setErrorBody(result.reason === "network" ? t.errorNetwork : t.errorRejected);
      setStatus("error");
      return;
    }

    // 不送 Email 也不送建議內容（都可能夾帶 PII），只記錄語系、字數與位置
    trackWaitlistSubmit(lang, request.length, location);
    setStatus("done");
  };

  return (
    <section
      ref={sectionRef}
      className={`overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-blue-50 to-white p-4 ${className}`}
      aria-labelledby={headingId}
    >
      {status === "done" ? (
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
            <form id={formId} onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor={requestId}
                  className="mb-1.5 block text-sm font-medium text-gray-900"
                >
                  {t.requestLabel}
                </label>
                <textarea
                  id={requestId}
                  ref={textareaRef}
                  rows={3}
                  required
                  value={featureRequest}
                  onChange={(e) => setFeatureRequest(e.target.value)}
                  placeholder={t.requestPlaceholder}
                  className="block w-full max-w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor={emailId} className="mb-1.5 block text-sm font-medium text-gray-900">
                  {t.emailLabel}
                </label>
                <input
                  id={emailId}
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="block min-h-[44px] w-full max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {validation && (
                <p role="alert" className="flex items-start gap-2 text-sm text-red-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {validation}
                </p>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3"
                >
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-red-900">{t.errorTitle}</p>
                    <p className="mt-0.5 break-words text-sm text-red-800">{errorBody}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
              >
                {status === "submitting" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {status === "submitting" ? t.submitting : t.submit}
              </button>

              <p className="flex items-start gap-2 text-xs leading-relaxed text-gray-500">
                <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                {t.privacy}
              </p>
            </form>
          )}
        </>
      )}
    </section>
  );
}
