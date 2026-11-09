import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { AlertTriangle, Loader2, Lock, Send } from "lucide-react";
import { trackWaitlistSubmit } from "@/lib/analytics";
import { isValidEmail, submitFeatureRequest } from "@/lib/waitlist";
import { TOOLS, toolHref, type Lang } from "@/lib/tools";

/**
 * 「已有 X 人等待中」的 X。手動維護：D1 submissions 的筆數（不含補填 Email 那些列），
 * 2026-11-10 查詢為 2。要改成動態得在 Worker 開公開的 GET 端點。
 */
const WAITING_COUNT = 2;

/**
 * 補填 Email 時再送一筆，source 加這個後綴。Worker 只有 INSERT、沒有更新既有列的端點，
 * 所以同一則建議會有兩列——統計筆數時要排除 source LIKE '%_email_followup'。
 */
const FOLLOWUP_SOURCE_SUFFIX = "_email_followup";

export interface WaitlistFormCopy {
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
  waiting: (count: number) => string;
  /** 免費批量工具導引。ja 沒有批次頁（toolHref 會退回英文版），留空就不顯示。 */
  batchHint?: { text: string; link: string };
  followupPrompt: string;
  followupSubmit: string;
  followupSkip: string;
}

/**
 * 表單本身的文案全站共用——差異化只在各 CTA 上方的鉤子問句。
 * 完成畫面的文案由呼叫端各自排版（卡片式與一行灰字長得完全不同），因此一併匯出。
 */
export const WAITLIST_FORM_COPY: Record<Lang, WaitlistFormCopy> = {
  zh: {
    cta: "我想說",
    requestLabel: "你最想要什麼功能？",
    requestPlaceholder: "例如：一次處理 100 張、保存常用範本、PDF 批次輸出…",
    emailLabel: "你的 Email（選填，功能做好通知你）",
    emailPlaceholder: "留 Email 搶先體驗（前 50 名免費）",
    submit: "送出建議",
    submitting: "送出中…",
    privacy: "建議內容與 Email 會存放在 Cloudflare，並轉寄到我們的信箱。Email 只用來通知功能完成，不會轉售、不寄廣告。",
    doneTitle: "收到了！",
    doneBody: "謝謝你花時間告訴我們。有留 Email 的話，功能做好時會通知你。",
    errorTitle: "送出失敗",
    errorNetwork: "看起來是網路問題，請稍後再試一次。",
    errorRejected: "表單暫時無法送出。請稍後再試，或直接寄信到 feedback@imagemarker.app 告訴我們。",
    emailInvalid: "請輸入有效的 Email 位址。",
    requestRequired: "寫一句就好，讓我們知道你想要什麼。",
    waiting: (count) => `已有 ${count} 人等待中`,
    batchHint: { text: "💡 現在就能免費批量處理最多 10 張！", link: "立即試用 →" },
    followupPrompt: "想第一時間收到通知嗎？補填 Email 👇",
    followupSubmit: "補上 Email",
    followupSkip: "不用了",
  },
  en: {
    cta: "Tell us",
    requestLabel: "What feature do you want most?",
    requestPlaceholder: "e.g. process 100 images at once, save my usual presets, batch PDF export…",
    emailLabel: "Your email (optional, so we can tell you when it ships)",
    emailPlaceholder: "Email for early access (first 50 free)",
    submit: "Send suggestion",
    submitting: "Sending…",
    privacy:
      "Your suggestion and email are stored on Cloudflare and forwarded to our inbox. Your email is only used to tell you when the feature ships. No reselling, no spam.",
    doneTitle: "Got it!",
    doneBody: "Thanks for taking the time. If you left your email, we'll let you know when it's ready.",
    errorTitle: "Couldn't submit",
    errorNetwork: "Looks like a network problem — please try again in a moment.",
    errorRejected:
      "The form didn't go through. Please try again shortly, or just email feedback@imagemarker.app.",
    emailInvalid: "Please enter a valid email address.",
    requestRequired: "One line is enough — just tell us what you want.",
    waiting: (count) => `${count} people already waiting`,
    batchHint: { text: "💡 You can batch process up to 10 images for free right now!", link: "Try it →" },
    followupPrompt: "Want to hear about it first? Add your email 👇",
    followupSubmit: "Add email",
    followupSkip: "No thanks",
  },
  ja: {
    cta: "ひとこと伝える",
    requestLabel: "いちばん欲しい機能は何ですか？",
    requestPlaceholder: "例：一度に 100 枚処理、よく使う設定の保存、PDF の一括出力…",
    emailLabel: "メールアドレス（任意・機能公開時にお知らせします）",
    emailPlaceholder: "メール登録で先行体験（先着 50 名無料）",
    submit: "送信する",
    submitting: "送信中…",
    privacy:
      "ご要望とメールアドレスは Cloudflare に保存され、運営者のメールに転送されます。メールは機能公開のお知らせにのみ使用します。転売なし、広告なし。",
    doneTitle: "受け取りました！",
    doneBody: "ご協力ありがとうございます。メールアドレスをご登録いただいた場合は、機能が準備でき次第お知らせします。",
    errorTitle: "送信できませんでした",
    errorNetwork: "ネットワークの問題のようです。少し時間をおいて再度お試しください。",
    errorRejected:
      "送信できませんでした。時間をおいて再度お試しいただくか、feedback@imagemarker.app までご連絡ください。",
    emailInvalid: "有効なメールアドレスを入力してください。",
    requestRequired: "一言で構いません。ご要望をお聞かせください。",
    waiting: (count) => `現在 ${count} 人が待っています`,
    followupPrompt: "いち早くお知らせを受け取りますか？メールアドレスを追加 👇",
    followupSubmit: "メールを追加",
    followupSkip: "結構です",
  },
};

interface WaitlistFormProps {
  lang: Lang;
  /**
   * 送出位置，同時寫進表單的 source 欄位與 waitlist_submit 埋點。
   * 各 CTA 共用同一張表單，沒有這欄就分不出哪個位置真的有效。
   */
  location: string;
  /** 由呼叫端給定，讓觸發按鈕的 aria-controls 對得上這張表單。 */
  id: string;
  /** 送出成功。呼叫端負責切換成自己的完成畫面（各處版面不同）。 */
  onSuccess: () => void;
  className?: string;
}

/**
 * 功能許願表單的唯一實作：欄位、驗證、送出、錯誤顯示都在這裡。
 *
 * 為什麼獨立成一個組件：WaitlistCTA（卡片式）與 PostDownloadHint（下載鍵下方的一行灰字）
 * 外觀完全不同，但表單行為必須一模一樣——欄位鍵名一旦分歧，後端就會收到不一致的資料。
 * 掛載即聚焦第一個欄位（呼叫端只在使用者展開時才掛載），少一次點擊。
 */
export function WaitlistForm({ lang, location, id, onSuccess, className = "" }: WaitlistFormProps) {
  const t = WAITLIST_FORM_COPY[lang];

  // 同一頁可能同時存在多個實例（如首頁的完成畫面與頁尾），寫死的 id 會重複。
  const uid = useId();
  const requestId = `${uid}-request`;
  const emailId = `${uid}-email`;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const followupEmailRef = useRef<HTMLInputElement | null>(null);

  const [currentPath] = useLocation();
  const batchTool = TOOLS.find((tool) => tool.key === "batch");
  const batchHref = batchTool ? toolHref(batchTool, lang) : undefined;
  // 人已經在批次頁（PostDownloadHint tool="batch"）就不必再叫他去批次頁。
  const showBatchHint =
    t.batchHint && batchHref && currentPath.replace(/\/$/, "") !== batchHref;

  const [email, setEmail] = useState("");
  const [featureRequest, setFeatureRequest] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorBody, setErrorBody] = useState("");
  const [validation, setValidation] = useState("");
  // 沒留 Email 的人送出後先停在這裡問一次，補填或略過才交給呼叫端切完成畫面。
  const [askingEmail, setAskingEmail] = useState(false);

  // 展開後直接把游標放進問題欄。用 effect 而非在 click handler 裡 rAF：
  // rAF 有可能早於 React 把 textarea 掛上 DOM，那時 ref 還是 null，focus 就靜默失效。
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (askingEmail) followupEmailRef.current?.focus();
  }, [askingEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const request = featureRequest.trim();
    if (!request) {
      setValidation(t.requestRequired);
      return;
    }
    // Email 選填：空白放行，有填才檢查格式
    if (email.trim() && !isValidEmail(email)) {
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

    if (!email.trim()) {
      setStatus("idle");
      setAskingEmail(true);
      return;
    }
    onSuccess();
  };

  // 建議本身已經存好，這裡失敗也不影響；不再送 waitlist_submit，避免同一人算兩次。
  const handleFollowup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!isValidEmail(email)) {
      setValidation(t.emailInvalid);
      return;
    }
    setValidation("");
    setStatus("submitting");

    const result = await submitFeatureRequest({
      email,
      featureRequest: featureRequest.trim(),
      lang,
      source: `${location}${FOLLOWUP_SOURCE_SUFFIX}`,
    });

    if (!result.ok) {
      setErrorBody(result.reason === "network" ? t.errorNetwork : t.errorRejected);
      setStatus("error");
      return;
    }
    onSuccess();
  };

  const notices = (
    <>
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
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-red-900">{t.errorTitle}</p>
              <p className="mt-0.5 break-words text-sm text-red-800">{errorBody}</p>
            </div>
          </div>
        )}
    </>
  );

  if (askingEmail) {
    return (
      <form id={id} onSubmit={handleFollowup} noValidate className={`space-y-3 ${className}`}>
        <p className="text-sm font-medium text-gray-900">{t.doneTitle}</p>
        <div>
          <label htmlFor={emailId} className="mb-1.5 block text-sm text-gray-700">
            {t.followupPrompt}
          </label>
          <input
            id={emailId}
            ref={followupEmailRef}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="block min-h-[44px] w-full max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {notices}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            {status === "submitting" && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {status === "submitting" ? t.submitting : t.followupSubmit}
          </button>
          <button
            type="button"
            onClick={onSuccess}
            disabled={status === "submitting"}
            className="min-h-[44px] rounded-lg px-4 py-2.5 text-sm text-gray-600 transition-colors hover:text-gray-900 disabled:text-gray-400"
          >
            {t.followupSkip}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className={`space-y-3 ${className}`}>
      {showBatchHint && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-primary/20 bg-blue-50 px-3 py-1.5">
          <p className="min-w-0 text-sm text-gray-800">{t.batchHint?.text}</p>
          <Link
            href={batchHref}
            className="inline-flex min-h-[44px] items-center text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            {t.batchHint?.link}
          </Link>
        </div>
      )}

      <div>
        <label htmlFor={requestId} className="mb-1.5 block text-sm font-medium text-gray-900">
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
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          className="block min-h-[44px] w-full max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {notices}

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

      <p className="text-center text-xs text-gray-500">{t.waiting(WAITING_COUNT)}</p>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-gray-500">
        <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        {t.privacy}
      </p>
    </form>
  );
}
