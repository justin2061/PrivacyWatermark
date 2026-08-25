import { useEffect, useId, useRef, useState } from "react";
import { AlertTriangle, Loader2, Lock, Send } from "lucide-react";
import { trackWaitlistSubmit } from "@/lib/analytics";
import { isValidEmail, submitFeatureRequest } from "@/lib/waitlist";
import type { Lang } from "@/lib/tools";

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

interface WaitlistFormProps {
  lang: Lang;
  /**
   * 送出位置，同時寫進 Netlify 表單的 source 欄位與 waitlist_submit 埋點。
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
 * 外觀完全不同，但表單行為必須一模一樣——欄位鍵名一旦分歧，Netlify 會靜默丟掉對不上的鍵。
 * 掛載即聚焦第一個欄位（呼叫端只在使用者展開時才掛載），少一次點擊。
 */
export function WaitlistForm({ lang, location, id, onSuccess, className = "" }: WaitlistFormProps) {
  const t = WAITLIST_FORM_COPY[lang];

  // 同一頁可能同時存在多個實例（如首頁的完成畫面與頁尾），寫死的 id 會重複。
  const uid = useId();
  const requestId = `${uid}-request`;
  const emailId = `${uid}-email`;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [email, setEmail] = useState("");
  const [featureRequest, setFeatureRequest] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorBody, setErrorBody] = useState("");
  const [validation, setValidation] = useState("");

  // 展開後直接把游標放進問題欄。用 effect 而非在 click handler 裡 rAF：
  // rAF 有可能早於 React 把 textarea 掛上 DOM，那時 ref 還是 null，focus 就靜默失效。
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

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
    onSuccess();
  };

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className={`space-y-3 ${className}`}>
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
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" aria-hidden="true" />
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
  );
}
