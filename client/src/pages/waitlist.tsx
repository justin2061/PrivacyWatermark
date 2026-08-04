import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { setPageSeo } from "@/lib/seo";
import { trackWaitlistView, trackWaitlistSubmit } from "@/lib/analytics";
import type { Lang } from "@/lib/tools";
import { AlertTriangle, CheckCircle, Loader2, Lock, Send } from "lucide-react";

/** Netlify Forms 表單名稱，需與 client/index.html 的隱藏偵測表單一致。 */
const NETLIFY_FORM = "waitlist";

function encodeForm(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

const COPY: Record<
  Lang,
  {
    seoTitle: string;
    seoDescription: string;
    canonical: string;
    title: string;
    intro: string;
    emailLabel: string;
    emailPlaceholder: string;
    requestLabel: string;
    requestPlaceholder: string;
    submit: string;
    submitting: string;
    privacy: string;
    doneTitle: string;
    doneBody: string;
    errorTitle: string;
    errorBody: string;
    emailInvalid: string;
    requestRequired: string;
  }
> = {
  zh: {
    seoTitle: "ImageMarker 還缺什麼功能？告訴我們你需要的",
    seoDescription:
      "花 10 秒告訴我們你希望 ImageMarker 有什麼功能。留個 Email，功能做好時第一時間通知你。",
    canonical: "https://imagemarker.app/waitlist",
    title: "ImageMarker 還缺什麼功能？",
    intro:
      "你剛用完，所以你最清楚哪裡卡卡的。花 10 秒告訴我們你想要什麼——我們是照著這些回饋決定下一個做什麼功能的。",
    emailLabel: "Email",
    emailPlaceholder: "你的 Email",
    requestLabel: "你希望 ImageMarker 有什麼功能？",
    requestPlaceholder: "例如：一次處理 100 張、保存常用浮水印範本、PDF 批次輸出…",
    submit: "送出建議",
    submitting: "送出中…",
    privacy: "Email 只用來在功能做好時通知你，不會轉售、不寄廣告。",
    doneTitle: "收到了！",
    doneBody: "我們會在功能準備好時通知你。謝謝你花時間告訴我們。",
    errorTitle: "送出失敗",
    errorBody:
      "表單暫時無法送出，可能是網路問題。請稍後再試一次，或直接寄信到 madoka2000@gmail.com 告訴我們。",
    emailInvalid: "請輸入有效的 Email 位址。",
    requestRequired: "寫一句就好，讓我們知道你想要什麼。",
  },
  en: {
    seoTitle: "What's missing from ImageMarker? Tell us what you need",
    seoDescription:
      "Take 10 seconds to tell us which feature you wish ImageMarker had. Leave your email and we'll let you know the moment it's ready.",
    canonical: "https://imagemarker.app/en/waitlist",
    title: "What's missing from ImageMarker?",
    intro:
      "You just used it, so you know exactly where it got awkward. Take 10 seconds to tell us what you want — this is what we build from next.",
    emailLabel: "Email",
    emailPlaceholder: "Your email",
    requestLabel: "What feature do you wish ImageMarker had?",
    requestPlaceholder:
      "e.g. process 100 images at once, save my usual watermark presets, batch PDF export…",
    submit: "Send suggestion",
    submitting: "Sending…",
    privacy: "Your email is only used to tell you when the feature ships. No reselling, no spam.",
    doneTitle: "Got it!",
    doneBody: "We'll let you know as soon as the feature is ready. Thanks for taking the time.",
    errorTitle: "Couldn't submit",
    errorBody:
      "The form didn't go through, possibly a network issue. Please try again in a moment, or just email madoka2000@gmail.com.",
    emailInvalid: "Please enter a valid email address.",
    requestRequired: "One line is enough — just tell us what you want.",
  },
  ja: {
    seoTitle: "ImageMarker に足りない機能は？ ご要望をお聞かせください",
    seoDescription:
      "ImageMarker にどんな機能があればいいか、10 秒で教えてください。メールを登録いただければ、機能ができ次第お知らせします。",
    canonical: "https://imagemarker.app/ja/waitlist",
    title: "ImageMarker に足りない機能は何ですか？",
    intro:
      "使ったばかりの今だからこそ、不便な点がよく分かるはずです。10 秒だけ、ご要望を教えてください。次に何を作るかは、この回答で決めています。",
    emailLabel: "メールアドレス",
    emailPlaceholder: "あなたのメールアドレス",
    requestLabel: "ImageMarker にどんな機能があればいいですか？",
    requestPlaceholder: "例：一度に 100 枚処理、よく使う透かしの保存、PDF の一括出力…",
    submit: "送信する",
    submitting: "送信中…",
    privacy: "メールは機能公開のお知らせにのみ使用します。転売なし、広告なし。",
    doneTitle: "受け取りました！",
    doneBody: "機能が準備でき次第、お知らせします。ご協力ありがとうございます。",
    errorTitle: "送信できませんでした",
    errorBody:
      "ネットワークの問題などで送信に失敗しました。少し時間をおいて再度お試しいただくか、madoka2000@gmail.com までご連絡ください。",
    emailInvalid: "有効なメールアドレスを入力してください。",
    requestRequired: "一言で構いません。ご要望をお聞かせください。",
  },
};

interface WaitlistPageProps {
  lang?: Lang;
}

/**
 * 功能許願頁。全站工具的下載完成 CTA（DownloadSuccess → WaitlistCTA）都導向這裡。
 *
 * 刻意只留兩個欄位：Email ＋ 一個開放式問題。前一版問了張數、定價偏好與語言，
 * 7 位高意圖訪客只有 1 人開始填、0 人送出——剛解決完問題的人不想填商業表單。
 * 定價偏好尤其反效果（「都不想付」這種選項等於在逼人表態），張數改由 GA4 的
 * image_count 推斷，語言直接取路由語系，都不必再問。
 *
 * 表單以 Netlify Forms 收集（零後端）：AJAX POST 到 "/"，form-name 需與
 * client/index.html 內的隱藏偵測表單一致。送出失敗會明確顯示錯誤，
 * 因為這是專程來留 Email 的人，靜默失敗等於白白流失名單。
 */
export default function WaitlistPage({ lang = "zh" }: WaitlistPageProps) {
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [featureRequest, setFeatureRequest] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [validation, setValidation] = useState("");
  const viewedRef = useRef(false);

  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    trackWaitlistView(lang);
  }, [lang]);

  useEffect(() => {
    return setPageSeo({
      title: t.seoTitle,
      description: t.seoDescription,
      canonical: t.canonical,
      locale: lang === "zh" ? "zh_TW" : lang === "ja" ? "ja_JP" : "en_US",
      alternates: [
        { hreflang: "zh-TW", href: "https://imagemarker.app/waitlist" },
        { hreflang: "en", href: "https://imagemarker.app/en/waitlist" },
        { hreflang: "ja", href: "https://imagemarker.app/ja/waitlist" },
        { hreflang: "x-default", href: "https://imagemarker.app/en/waitlist" },
      ],
    });
  }, [lang, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setValidation(t.emailInvalid);
      return;
    }
    const request = featureRequest.trim();
    if (!request) {
      setValidation(t.requestRequired);
      return;
    }
    setValidation("");
    setStatus("submitting");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": NETLIFY_FORM,
          email: email.trim(),
          feature_request: request,
          lang,
          // 蜜罐欄位：真人不會填，留空即可。Netlify 靠 netlify-honeypot 判定。
          "bot-field": "",
        }),
      });
      // Netlify Forms 成功時回 200/302；非 2xx 一律視為失敗並讓使用者知道
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // 不送出建議內容本身（可能夾帶個資），只記錄語系與長度
      trackWaitlistSubmit(lang, request.length);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang={lang} />

      <main className="mx-auto max-w-xl px-4 py-10">
        {status === "done" ? (
          <Card className="p-8 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="text-xl font-semibold text-gray-900">{t.doneTitle}</h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.doneBody}</p>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.intro}</p>
            </div>

            <Card className="p-6">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="waitlist-request"
                    className="mb-1.5 block text-sm font-medium text-gray-900"
                  >
                    {t.requestLabel}
                  </label>
                  <textarea
                    id="waitlist-request"
                    rows={4}
                    required
                    value={featureRequest}
                    onChange={(e) => setFeatureRequest(e.target.value)}
                    placeholder={t.requestPlaceholder}
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="mb-1.5 block text-sm font-medium text-gray-900"
                  >
                    {t.emailLabel}
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="min-h-[44px] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                    <div>
                      <p className="text-sm font-medium text-red-900">{t.errorTitle}</p>
                      <p className="mt-0.5 text-sm text-red-800">{t.errorBody}</p>
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
            </Card>
          </>
        )}
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
