import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Check, Loader2 } from "lucide-react";
import {
  trackProPromptShown,
  trackProPromptClick,
  trackProWaitlistSignup,
} from "@/lib/analytics";

interface ProUpsellProps {
  /** 觸發提示的工具（埋點 tool_name），目前僅批次會超過免費張數上限 */
  tool: string;
  lang?: "zh" | "en";
  /** 目前已上傳張數，用於文案與埋點 */
  imageCount: number;
  /** 使用者關閉提示（不阻擋免費功能，關掉後照常操作） */
  onClose: () => void;
  className?: string;
}

const NETLIFY_FORM = "pro-waitlist";

function encodeForm(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

/**
 * 第 11 張以上圖片時顯示的「非阻斷式」Pro 提示。
 * — 預覽 Pro 功能、預計價格、加入候補名單（Email 或匿名）。
 * — 不阻擋任何免費功能：使用者可直接關閉繼續操作。
 * — Email 透過 Netlify Forms（零後端）收集；無論成敗都記錄 GA 事件。
 */
export function ProUpsell({
  tool,
  lang = "zh",
  imageCount,
  onClose,
  className = "",
}: ProUpsellProps) {
  const isEn = lang === "en";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const shownRef = useRef(false);

  // 曝光埋點：每次掛載送一次
  useEffect(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    trackProPromptShown(tool, imageCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = isEn
    ? {
        badge: "Pro preview",
        title: `Working with ${imageCount} images? Pro is being built for you.`,
        subtitle:
          "You're past the free 10-image limit. Pro will handle large batches in one go:",
        features: [
          "Batch 100–500 images at once",
          "Multiple saved brand presets",
          "One-click ZIP download",
        ],
        price: "Planned pricing: US$19 / year",
        emailPlaceholder: "you@email.com (optional)",
        cta: "Notify me when Pro launches",
        submitting: "Submitting…",
        doneTitle: "You're on the list!",
        doneBody: "We'll email you the moment Pro is ready. Thanks for the vote of confidence.",
        dismiss: "Maybe later",
        close: "Close",
        keepUsing: "The free tool keeps working — process your first 10 images below.",
      }
    : {
        badge: "Pro 搶先看",
        title: `一次要處理 ${imageCount} 張？Pro 正是為你打造。`,
        subtitle: "你已超過免費的 10 張上限。Pro 版將能一次搞定大量圖片：",
        features: [
          "一次批次處理 100–500 張",
          "多組品牌浮水印預設，一鍵切換",
          "全部打包成 ZIP 一鍵下載",
        ],
        price: "預計價格：US$19 / 年",
        emailPlaceholder: "you@email.com（可留可不留）",
        cta: "通知我 Pro 上線",
        submitting: "送出中…",
        doneTitle: "已加入候補名單！",
        doneBody: "Pro 一上線就會通知你。謝謝你的支持，這對我們很重要。",
        dismiss: "下次再說",
        close: "關閉",
        keepUsing: "免費工具照常可用——下方可先處理前 10 張。",
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const hasEmail = /\S+@\S+\.\S+/.test(email.trim());

    trackProPromptClick(tool);
    setStatus("submitting");

    // 有 Email 才嘗試寫入 Netlify Forms；失敗不影響使用者流程
    if (hasEmail) {
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodeForm({
            "form-name": NETLIFY_FORM,
            email: email.trim(),
            tool,
          }),
        });
      } catch {
        // 忽略：GA 事件仍會記錄這次候補意願
      }
    }

    trackProWaitlistSignup(tool, hasEmail ? "email" : "anonymous");
    setStatus("done");
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm ${className}`}
      role="region"
      aria-label={isEn ? "Pro version preview" : "Pro 版本預覽"}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.close}
        className="absolute right-3 top-3 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>

      {status === "done" ? (
        <div className="py-2 pr-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="text-base font-semibold text-gray-900">{t.doneTitle}</h3>
          </div>
          <p className="text-sm text-gray-600">{t.doneBody}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 text-sm font-medium text-primary hover:underline"
          >
            {isEn ? "Back to the tool" : "回到工具"}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t.badge}
          </div>

          <h3 className="pr-6 text-base font-semibold text-gray-900">{t.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{t.subtitle}</p>

          <ul className="mt-3 space-y-1.5">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-sm font-medium text-gray-900">{t.price}</p>

          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              aria-label={isEn ? "Email for Pro waitlist" : "Pro 候補名單 Email"}
              className="min-h-[44px] flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
            >
              {status === "submitting" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              )}
              {status === "submitting" ? t.submitting : t.cta}
            </button>
          </form>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-gray-500">{t.keepUsing}</p>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              {t.dismiss}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
