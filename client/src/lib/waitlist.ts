/**
 * 功能許願表單的單一送出入口。
 *
 * 2026-11 起送到 Cloudflare Worker（workers/feedback/，網址由 VITE_FEEDBACK_ENDPOINT
 * 提供），資料存在 D1 並轉寄到站長信箱。沒設這個環境變數時退回 Netlify Forms——
 * 這是切換期的後援：要切回去，刪掉 Netlify 上的變數重新部署即可。觀察穩定後
 * 再移除 Netlify 路徑與 client/index.html 的隱藏偵測表單。
 *
 * 一律回傳明確的成敗，呼叫端必須顯示錯誤，不得假裝成功：早期 ProUpsell 直接
 * `await fetch("/")` 就切成功畫面，Netlify 回 404 時 Email 整筆掉了也沒人發現。
 */

/** Worker 與 Netlify 共用的表單名稱。Netlify 那邊需與 client/index.html 一致。 */
const FEATURE_REQUEST_FORM = "waitlist";

const FEEDBACK_ENDPOINT: string = (import.meta.env.VITE_FEEDBACK_ENDPOINT ?? "").trim();

export type WaitlistResult =
  | { ok: true }
  | { ok: false; reason: "network" | "rejected" };

/** 寬鬆的 Email 格式檢查：擋掉明顯錯誤即可，真正驗證交給收信端。 */
export function isValidEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value.trim());
}

export interface FeatureRequestPayload {
  /** 選填。空字串代表沒留；有填時呼叫端應先以 isValidEmail 擋掉格式錯誤。 */
  email: string;
  /** 必填。使用者想要的功能，自由書寫。 */
  featureRequest: string;
  /** 路由語系，直接取自頁面而非再問使用者。 */
  lang: string;
  /**
   * 送出位置：download_success / homepage / blog_article / waitlist_page。
   * 各 inline CTA 共用同一張表單，沒有這欄就分不出哪個位置真的有效。
   */
  source: string;
}

async function post(url: string, init: RequestInit): Promise<WaitlistResult> {
  let response: Response;
  try {
    response = await fetch(url, { method: "POST", ...init });
  } catch {
    return { ok: false, reason: "network" };
  }
  return response.ok ? { ok: true } : { ok: false, reason: "rejected" };
}

/**
 * 送出功能許願。/waitlist 頁與 WaitlistForm（各處 inline CTA）共用這支，
 * 確保欄位鍵名永遠一致。
 *
 * reason:
 *   "network"  —— fetch 直接拋錯（離線、被擋、CORS），重試可能會成功
 *   "rejected" —— 伺服器回非 2xx（Worker 驗證失敗／D1 寫入失敗；
 *                 Netlify 後援路徑下則通常是表單尚未被偵測，本機 dev 一定是這個）
 */
export async function submitFeatureRequest(
  payload: FeatureRequestPayload,
): Promise<WaitlistResult> {
  const fields = {
    email: payload.email.trim(),
    feature_request: payload.featureRequest.trim(),
    lang: payload.lang,
    source: payload.source,
    // 蜜罐欄位：真人不會填，留空即可。
    "bot-field": "",
  };

  if (FEEDBACK_ENDPOINT) {
    return post(FEEDBACK_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: FEATURE_REQUEST_FORM, ...fields }),
    });
  }

  // 後援：Netlify Forms（只保存 index.html 隱藏表單宣告過的欄位）。
  const body = Object.entries({ "form-name": FEATURE_REQUEST_FORM, ...fields })
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return post("/", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}
