import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { setPageSeo } from "@/lib/seo";
import { trackWaitlistView, trackWaitlistSubmit } from "@/lib/analytics";
import type { Lang } from "@/lib/tools";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  Loader2,
  Lock,
  Sparkles,
} from "lucide-react";

/** Netlify Forms 表單名稱，需與 client/index.html 的隱藏偵測表單一致。 */
const NETLIFY_FORM = "waitlist";

/** 處理張數級距（value 為穩定英文代號，直接進 GA 與 Netlify）。 */
const IMAGE_COUNT_OPTIONS = ["1-3", "4-10", "11-50", "51-200", "200+"] as const;

/** 定價偏好選項（value 為穩定英文代號）。 */
type PricingValue = "one_time_99" | "yearly_590" | "free_only";

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
    badge: string;
    title: string;
    intro: string;
    features: string[];
    emailLabel: string;
    emailPlaceholder: string;
    countLabel: string;
    countPlaceholder: string;
    pricingLabel: string;
    pricing: { value: PricingValue; label: string; hint: string }[];
    submit: string;
    submitting: string;
    privacy: string;
    doneTitle: string;
    doneBody: string;
    errorTitle: string;
    errorBody: string;
    emailInvalid: string;
    pricingRequired: string;
  }
> = {
  zh: {
    seoTitle: "ImageMarker Pro 候補名單 — 大量處理、預設儲存與商用授權",
    seoDescription:
      "留下 Email 加入 ImageMarker Pro 候補名單，搶先取得大量批次處理、浮水印預設儲存與商用授權功能。順便告訴我們你希望的定價方式。",
    canonical: "https://imagemarker.app/waitlist",
    badge: "Pro 候補名單",
    title: "需要大量處理、儲存預設或商用功能？",
    intro:
      "免費工具會一直免費。Pro 是為了「每次都要處理一堆圖、而且要重複使用同一組設定」的人做的。留個 Email，上線第一時間通知你——順便告訴我怎麼定價才合理。",
    features: [
      "一次批次處理 100–500 張，打包 ZIP 下載",
      "儲存多組浮水印／馬賽克預設，一鍵套用",
      "商用授權與去除所有推廣區塊",
      "一樣 100% 瀏覽器本機處理，圖片不上傳",
    ],
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    countLabel: "你剛才處理了幾張圖？",
    countPlaceholder: "請選擇",
    pricingLabel: "你比較能接受哪種定價？",
    pricing: [
      { value: "one_time_99", label: "單次 NT$99", hint: "偶爾才需要，用一次付一次" },
      { value: "yearly_590", label: "年費 NT$590", hint: "常常在用，一次付清最省事" },
      { value: "free_only", label: "都不想付", hint: "免費版就夠用了（也是很有用的答案）" },
    ],
    submit: "加入候補名單",
    submitting: "送出中…",
    privacy: "只用來通知 Pro 上線與詢問意見，不會轉售、不會發垃圾信，隨時可退訂。",
    doneTitle: "已加入候補名單！",
    doneBody:
      "謝謝你，這對決定要不要做 Pro 幫助很大。Pro 一上線就會寄信通知你。現在可以直接回去把圖處理完。",
    errorTitle: "送出失敗",
    errorBody:
      "表單暫時無法送出，可能是網路問題。請稍後再試一次，或直接寄信到 madoka2000@gmail.com 告訴我們。",
    emailInvalid: "請輸入有效的 Email 位址。",
    pricingRequired: "請選一個定價偏好。",
  },
  en: {
    seoTitle: "ImageMarker Pro Waitlist — Bulk Processing, Saved Presets, Commercial Use",
    seoDescription:
      "Join the ImageMarker Pro waitlist for large batch processing, saved watermark presets and commercial licensing. Tell us which pricing model works for you.",
    canonical: "https://imagemarker.app/en/waitlist",
    badge: "Pro waitlist",
    title: "Need bulk processing, saved presets or commercial use?",
    intro:
      "The free tools stay free. Pro is for people who process a pile of images every time and reuse the same settings. Leave your email and we'll tell you the moment it ships — and tell us what pricing would actually be fair.",
    features: [
      "Batch 100–500 images at once, download as one ZIP",
      "Save multiple watermark / mosaic presets and reapply in a click",
      "Commercial licence, with every promo block removed",
      "Still 100% in-browser — your images never leave your device",
    ],
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    countLabel: "How many images did you just process?",
    countPlaceholder: "Select one",
    pricingLabel: "Which pricing would you go for?",
    pricing: [
      { value: "one_time_99", label: "One-time US$3", hint: "I need it now and then — pay per use" },
      { value: "yearly_590", label: "US$19 / year", hint: "I use it constantly — one payment, done" },
      { value: "free_only", label: "Neither, I won't pay", hint: "The free version is enough (also a useful answer)" },
    ],
    submit: "Join the waitlist",
    submitting: "Submitting…",
    privacy: "Only used to announce Pro and ask for feedback. No reselling, no spam, unsubscribe anytime.",
    doneTitle: "You're on the list!",
    doneBody:
      "Thank you — this genuinely decides whether Pro gets built. We'll email you the moment it's ready. Head back and finish your images.",
    errorTitle: "Couldn't submit",
    errorBody:
      "The form didn't go through, possibly a network issue. Please try again in a moment, or just email madoka2000@gmail.com.",
    emailInvalid: "Please enter a valid email address.",
    pricingRequired: "Please pick a pricing option.",
  },
  ja: {
    seoTitle: "ImageMarker Pro ウェイトリスト — 大量処理・プリセット保存・商用利用",
    seoDescription:
      "大量バッチ処理、ウォーターマークのプリセット保存、商用ライセンスを備えた ImageMarker Pro のウェイトリストに登録。希望する価格もお聞かせください。",
    canonical: "https://imagemarker.app/ja/waitlist",
    badge: "Pro ウェイトリスト",
    title: "大量処理・プリセット保存・商用利用が必要ですか？",
    intro:
      "無料ツールはこれからも無料です。Pro は「毎回たくさんの画像を、同じ設定で処理する」方のためのものです。メールを登録いただければ、公開時に真っ先にお知らせします。価格のご希望もぜひ。",
    features: [
      "一度に 100〜500 枚を処理し、ZIP でまとめてダウンロード",
      "ウォーターマーク／モザイクのプリセットを保存してワンクリック適用",
      "商用ライセンス、プロモーション表示はすべて非表示",
      "変わらず 100% ブラウザ内処理 — 画像は送信されません",
    ],
    emailLabel: "メールアドレス",
    emailPlaceholder: "you@email.com",
    countLabel: "今回は何枚処理しましたか？",
    countPlaceholder: "選択してください",
    pricingLabel: "どちらの価格が受け入れやすいですか？",
    pricing: [
      { value: "one_time_99", label: "都度 US$3", hint: "たまに使うので、使うたびに支払いたい" },
      { value: "yearly_590", label: "年額 US$19", hint: "よく使うので、まとめて払いたい" },
      { value: "free_only", label: "払いたくない", hint: "無料版で十分（これも貴重な回答です）" },
    ],
    submit: "ウェイトリストに登録",
    submitting: "送信中…",
    privacy: "Pro の公開通知とご意見の依頼にのみ使用します。転売なし、迷惑メールなし、いつでも解除できます。",
    doneTitle: "登録が完了しました！",
    doneBody:
      "ありがとうございます。Pro を作るかどうかの判断に大きく役立ちます。公開時にメールでお知らせします。",
    errorTitle: "送信できませんでした",
    errorBody:
      "ネットワークの問題などで送信に失敗しました。少し時間をおいて再度お試しいただくか、madoka2000@gmail.com までご連絡ください。",
    emailInvalid: "有効なメールアドレスを入力してください。",
    pricingRequired: "価格の選択肢を 1 つお選びください。",
  },
};

interface WaitlistPageProps {
  lang?: Lang;
}

/**
 * Pro 候補名單頁。全站工具的下載完成 CTA（DownloadSuccess → WaitlistCTA）都導向這裡。
 *
 * 表單以 Netlify Forms 收集（零後端）：AJAX POST 到 "/"，form-name 需與
 * client/index.html 內的隱藏偵測表單一致。與 ProUpsell 不同的是——這裡的送出
 * 失敗會明確顯示錯誤，因為這是專程來留 Email 的人，靜默失敗等於白白流失名單。
 */
export default function WaitlistPage({ lang = "zh" }: WaitlistPageProps) {
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [imageCount, setImageCount] = useState("");
  const [pricing, setPricing] = useState<PricingValue | "">("");
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
    if (!pricing) {
      setValidation(t.pricingRequired);
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
          image_count: imageCount,
          pricing,
          lang,
        }),
      });
      // Netlify Forms 成功時回 200/302；非 2xx 一律視為失敗並讓使用者知道
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackWaitlistSubmit(imageCount || "unknown", pricing);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang={lang} />

      <main className="max-w-2xl mx-auto px-4 py-10">
        {status === "done" ? (
          <Card className="p-8 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="text-xl font-semibold text-gray-900">{t.doneTitle}</h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.doneBody}</p>
            <a
              href={lang === "zh" ? "/" : `/${lang}/`}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {lang === "en" ? "Back to the tools" : lang === "ja" ? "ツールに戻る" : "回到工具"}
            </a>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t.badge}
              </span>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.intro}</p>
            </div>

            <Card className="mb-6 p-6">
              <ul className="space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label htmlFor="waitlist-email" className="mb-1.5 block text-sm font-medium text-gray-900">
                    {t.emailLabel} <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="min-h-[44px] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="waitlist-count" className="mb-1.5 block text-sm font-medium text-gray-900">
                    {t.countLabel}
                  </label>
                  <select
                    id="waitlist-count"
                    value={imageCount}
                    onChange={(e) => setImageCount(e.target.value)}
                    className="min-h-[44px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">{t.countPlaceholder}</option>
                    {IMAGE_COUNT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-gray-900">
                    {t.pricingLabel} <span className="text-red-600">*</span>
                  </legend>
                  <div className="space-y-2">
                    {t.pricing.map((opt) => {
                      const active = pricing === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                            active
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="pricing"
                            value={opt.value}
                            checked={active}
                            onChange={() => setPricing(opt.value)}
                            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-blue-600"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-gray-900">{opt.label}</span>
                            <span className="mt-0.5 block text-xs text-gray-500">{opt.hint}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

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
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
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
