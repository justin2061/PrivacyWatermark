/**
 * Pro 候補名單的單一送出入口（Netlify Forms，零後端）。
 *
 * 為什麼要有這支：先前 ProUpsell 直接 `await fetch("/")` 後就把畫面切成成功，
 * 既沒檢查 response.ok，catch 也是空的——Netlify 若沒偵測到表單會回 404，
 * 使用者仍看到「已加入候補名單！」，Email 其實整筆掉了。表單壞掉時我們會
 * 完全沒有察覺，而候補名單正是 Freemium 定價決策的唯一輸入。
 *
 * 因此這裡一律回傳明確的成敗，呼叫端必須顯示錯誤，不得假裝成功。
 */

/** Netlify Forms 的表單名稱，需與 client/index.html 的隱藏偵測表單一致。 */
const NETLIFY_FORM = "pro-waitlist";

/** 功能許願表單（/waitlist 頁與各處 inline CTA 共用）。同樣需與 index.html 一致。 */
const FEATURE_REQUEST_FORM = "waitlist";

/** 使用者偏好的定價方案。空字串代表沒選（此欄非必填）。 */
export type PricingChoice = "" | "one-off-99" | "annual-590";

export interface WaitlistPayload {
  /** 必填。呼叫端應先以 isValidEmail 擋掉空值／格式錯誤。 */
  email: string;
  /** 來源工具（如 "watermark"）或 "pro-page"。 */
  tool: string;
  /** 開放欄位：「你剛才處理了幾張圖？」使用者可自由填寫，不強制數字。 */
  imageCount?: string;
  pricing?: PricingChoice;
  /** 更細的出現位置（如 "download_success" / "homepage"），用於分辨哪個 CTA 有效。 */
  source?: string;
}

export type WaitlistResult =
  | { ok: true }
  | { ok: false; reason: "network" | "rejected" };

/** 寬鬆的 Email 格式檢查：擋掉明顯錯誤即可，真正驗證交給收信端。 */
export function isValidEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value.trim());
}

function encodeForm(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

/**
 * 送出候補名單。成功回 { ok: true }；失敗回明確原因，呼叫端須據此顯示錯誤。
 *
 * reason:
 *   "network"  —— fetch 直接拋錯（離線、被擋），使用者重試可能會成功
 *   "rejected" —— 伺服器回非 2xx，通常是 Netlify 尚未偵測到 pro-waitlist 表單
 *                 （偵測表單只在 deploy 時掃描，本機 dev 一定會是這個）
 */
export async function submitWaitlist(
  payload: WaitlistPayload,
): Promise<WaitlistResult> {
  const body = encodeForm({
    "form-name": NETLIFY_FORM,
    email: payload.email.trim(),
    tool: payload.tool,
    image_count: payload.imageCount?.trim() ?? "",
    pricing: payload.pricing ?? "",
    source: payload.source ?? "",
    // 蜜罐欄位：真人不會填，留空即可。Netlify 靠 netlify-honeypot 判定。
    "bot-field": "",
  });

  let response: Response;
  try {
    response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch {
    return { ok: false, reason: "network" };
  }

  if (!response.ok) return { ok: false, reason: "rejected" };
  return { ok: true };
}

export interface FeatureRequestPayload {
  /** 必填。呼叫端應先以 isValidEmail 擋掉空值／格式錯誤。 */
  email: string;
  /** 必填。使用者想要的功能，自由書寫。 */
  featureRequest: string;
  /** 路由語系，直接取自頁面而非再問使用者。 */
  lang: string;
  /**
   * 送出位置：download_success / homepage / blog_article / waitlist_page。
   * 三個 inline CTA 共用同一張表單，沒有這欄就分不出哪個位置真的有效。
   */
  source: string;
}

/**
 * 送出功能許願。/waitlist 頁與 WaitlistCTA 的 inline 表單共用這支，
 * 確保兩邊的 form-name 與欄位鍵名永遠一致（Netlify 只保存 index.html
 * 隱藏表單宣告過的欄位，對不上的鍵會被靜默丟棄）。
 *
 * 失敗原因同 submitWaitlist：呼叫端必須顯示錯誤，不得假裝成功。
 */
export async function submitFeatureRequest(
  payload: FeatureRequestPayload,
): Promise<WaitlistResult> {
  const body = encodeForm({
    "form-name": FEATURE_REQUEST_FORM,
    email: payload.email.trim(),
    feature_request: payload.featureRequest.trim(),
    lang: payload.lang,
    source: payload.source,
    // 蜜罐欄位：真人不會填，留空即可。Netlify 靠 netlify-honeypot 判定。
    "bot-field": "",
  });

  let response: Response;
  try {
    response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch {
    return { ok: false, reason: "network" };
  }

  if (!response.ok) return { ok: false, reason: "rejected" };
  return { ok: true };
}
