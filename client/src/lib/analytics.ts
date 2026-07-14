import type { CategoryId } from "@/lib/tools";

// 新導航（Mega Menu / 手機選單 / 首頁工具中心）點擊工具的來源
export type NavSource = "mega_menu" | "mobile_menu" | "homepage_grid";

/**
 * 追蹤導航點擊事件（GA4）。沿用站上既有的 gtag 全域函式，
 * gtag 未載入時（例如未同意追蹤）安靜略過。
 */
export function trackToolNav(
  toolName: string,
  source: NavSource,
  category: CategoryId,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "tool_navigation_click", {
      tool_name: toolName,
      source,
      category,
    });
  }
}

// InlineCTA 出現的位置：文章中段 / 文章結尾 / 工具完成後
export type InlineCtaPosition = "mid_article" | "end_article" | "tool_complete";

/**
 * 追蹤文章／工具內 InlineCTA 的點擊（GA4）。
 * position 用來分辨是文章中段、結尾，或工具完成後的推薦。
 */
export function trackInlineCta(
  toTool: string,
  position: InlineCtaPosition,
  location?: string,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "inline_cta_click", {
      to_tool: toTool,
      position,
      location,
    });
  }
}

/**
 * 追蹤「你可能也需要」工具推薦的點擊（GA4）。
 * from_tool：目前所在工具；to_tool：被推薦點擊的工具。
 */
export function trackToolRecommendation(
  fromTool: string,
  toTool: string,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "tool_recommendation_click", {
      from_tool: fromTool,
      to_tool: toTool,
    });
  }
}

/* -------------------------------------------------------------------------- */
/*  Freemium Phase 1 — 使用漏斗與商業化埋點                                     */
/*  目的：驗證「有多少人開始用 → 完成下載 → 每次處理幾張 → 對 Pro 有興趣」，       */
/*  作為 Freemium 定價與批次上限決策的依據。所有事件在 gtag 未載入時安靜略過。     */
/* -------------------------------------------------------------------------- */

/**
 * 使用者開始使用某個圖片工具（上傳／選擇第一張圖片）時觸發。
 * 作為漏斗的分母：多少工作階段真的開始使用。
 */
export function trackToolUseStart(toolName: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "tool_use_start", {
      tool_name: toolName,
    });
  }
}

/**
 * 使用者完成下載時觸發（單張下載或批次 ZIP）。
 * 一併送出 `image_count` 事件，方便單獨分析每次處理張數的分布——
 * 這是驗證「批次上限該設多少、Pro 批次功能有無需求」的關鍵訊號。
 */
export function trackDownloadComplete(
  toolName: string,
  imageCount: number,
): void {
  if (typeof gtag === "undefined") return;
  gtag("event", "tool_download_complete", {
    tool_name: toolName,
    image_count: imageCount,
  });
  gtag("event", "image_count", {
    tool_name: toolName,
    image_count: imageCount,
  });
}

/**
 * Pro 提示（第 11 張以上批次上限提示）被顯示時觸發。
 */
export function trackProPromptShown(
  toolName: string,
  imageCount: number,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "pro_prompt_shown", {
      tool_name: toolName,
      image_count: imageCount,
    });
  }
}

/**
 * 使用者點擊 Pro 提示的主要 CTA（展開了解／送出候補）時觸發。
 */
export function trackProPromptClick(toolName: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "pro_prompt_click", {
      tool_name: toolName,
    });
  }
}

/**
 * 使用者實際加入 Pro 候補名單時觸發。
 * method：留了 Email（"email"）或只是匿名表達興趣（"anonymous"）。
 * 注意：不把 Email 內容送進 GA（避免 PII），只記錄轉換與方式。
 */
export function trackProWaitlistSignup(
  toolName: string,
  method: "email" | "anonymous",
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "pro_waitlist_signup", {
      tool_name: toolName,
      method,
    });
  }
}

/**
 * Ko-fi 贊助 CTA 曝光時觸發。location 分辨出現位置（如 download_success）。
 */
export function trackKofiImpression(location: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "kofi_impression", {
      location,
    });
  }
}

/**
 * Ko-fi 贊助 CTA 被點擊時觸發。
 */
export function trackKofiClick(location: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "kofi_click", {
      location,
    });
  }
}

/**
 * 偵測到頁面被包在 Electron 環境（疑似第三方把 imagemarker.app 包成桌面 App）時觸發。
 * 附上 user agent 以利辨識來源包裝；不含任何 PII。
 */
export function trackElectronDetected(userAgent: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "electron_detected", {
      user_agent: userAgent,
    });
  }
}

/**
 * 偵測到頁面被載入在非官方域名／file:// 來源（疑似他人拷貝站台自行架設）時觸發。
 * 記錄非官方 hostname 以利辨識來源；不含任何 PII。
 */
export function trackUnauthorizedEmbed(hostname: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "unauthorized_embed", {
      hostname,
    });
  }
}

/**
 * 偵測到無頭瀏覽器／自動化工具（HeadlessChrome、navigator.webdriver）存取時觸發。
 * 附上 user agent 以利辨識爬蟲來源；已知搜尋引擎爬蟲不會觸發（見 lib/protection）。
 */
export function trackBotDetected(userAgent: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "bot_detected", {
      user_agent: userAgent,
    });
  }
}

/**
 * 情境式聯盟行銷（Canva／Adobe／Shutterstock）推薦被點擊時觸發。
 * affiliate_name：外站名稱；tool_name：從哪個工具的完成頁點出去。
 */
export function trackAffiliateClick(
  affiliateName: string,
  toolName: string,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "affiliate_click", {
      affiliate_name: affiliateName,
      tool_name: toolName,
    });
  }
}
