/**
 * 功能許願表單的單一送出入口。
 *
 * 2026-11 起只送到 Cloudflare Worker（workers/feedback/，網址由 build 時的
 * VITE_FEEDBACK_ENDPOINT 提供），資料存在 D1 並轉寄到站長信箱。刻意不保留
 * Netlify Forms 後援：資料只放一個地方。沒設這個環境變數時一律回 "rejected"，
 * 畫面會顯示錯誤與聯絡信箱，不會靜默丟資料。
 *
 * 一律回傳明確的成敗，呼叫端必須顯示錯誤，不得假裝成功：早期 ProUpsell 直接
 * `await fetch("/")` 就切成功畫面，Netlify 回 404 時 Email 整筆掉了也沒人發現。
 */

/** Worker 端以 form 欄位分辨表單（見 workers/feedback/src/index.ts 的 FORMS）。 */
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

/**
 * 送出功能許願。/waitlist 頁與 WaitlistForm（各處 inline CTA）共用這支，
 * 確保欄位鍵名永遠一致。
 *
 * reason:
 *   "network"  —— fetch 直接拋錯（離線、被擋、CORS），重試可能會成功
 *   "rejected" —— Worker 回非 2xx（驗證失敗／D1 寫入失敗），
 *                 或 build 時沒設 VITE_FEEDBACK_ENDPOINT
 */
export async function submitFeatureRequest(
  payload: FeatureRequestPayload,
): Promise<WaitlistResult> {
  if (!FEEDBACK_ENDPOINT) {
    console.error("VITE_FEEDBACK_ENDPOINT is not set; feedback form cannot submit.");
    return { ok: false, reason: "rejected" };
  }

  let response: Response;
  try {
    response = await fetch(FEEDBACK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: FEATURE_REQUEST_FORM,
        email: payload.email.trim(),
        feature_request: payload.featureRequest.trim(),
        lang: payload.lang,
        source: payload.source,
        // 蜜罐欄位：真人不會填，留空即可。
        "bot-field": "",
      }),
    });
  } catch {
    return { ok: false, reason: "network" };
  }
  return response.ok ? { ok: true } : { ok: false, reason: "rejected" };
}
