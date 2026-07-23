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

/* -------------------------------------------------------------------------- */
/*  留存與交叉使用（tool_return_use / cross_tool_use）                           */
/*  GA4 本身看不出「同一人隔天回來用同一個工具」或「從 A 工具走到 B 工具」，       */
/*  所以在瀏覽器端記一份極簡使用紀錄來判斷。只存工具名、日期與計數，             */
/*  不存 Email、檔名或任何個資；換裝置／無痕／清除瀏覽器資料就重新計算。          */
/* -------------------------------------------------------------------------- */

const USAGE_STORAGE_KEY = "pw_tool_usage_v1";

// 超過這個天數就不算是「交叉使用」，只是各自獨立的造訪。
const CROSS_TOOL_WINDOW_DAYS = 30;

interface ToolUsageRecord {
  /** 最後一次使用日期（本地時區 YYYY-MM-DD） */
  last_use_date: string;
  /** 使用過的「不同天數」，不是次數——同一天重複操作不重複累加 */
  usage_day_count: number;
}

interface ToolUsageState {
  tools: Record<string, ToolUsageRecord>;
  last_tool?: string;
  last_tool_used_at?: number;
}

/** 本地時區的 YYYY-MM-DD。用本地日期而非 UTC，才符合使用者感受的「今天」。 */
function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** 兩個 YYYY-MM-DD 之間相差幾天（只比日期，不受時分秒影響）。 */
function daysBetweenDateKeys(from: string, to: string): number {
  const a = Date.parse(`${from}T00:00:00`);
  const b = Date.parse(`${to}T00:00:00`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}

/** localStorage 可能不存在（SSR）或被停用（Safari 無痕、隱私設定），一律安靜失敗。 */
function readUsageState(): ToolUsageState {
  try {
    const raw = window.localStorage.getItem(USAGE_STORAGE_KEY);
    if (!raw) return { tools: {} };
    const parsed = JSON.parse(raw) as ToolUsageState;
    return parsed && typeof parsed === "object" && parsed.tools
      ? parsed
      : { tools: {} };
  } catch {
    return { tools: {} };
  }
}

function writeUsageState(state: ToolUsageState): void {
  try {
    window.localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // 配額滿或被停用：留存統計不重要到值得中斷使用者操作。
  }
}

/**
 * 使用者開始使用某個圖片工具（上傳／選擇第一張圖片）時觸發。
 * 作為漏斗的分母：多少工作階段真的開始使用。
 *
 * 同時依本機使用紀錄補送兩個事件：
 *   - tool_return_use：同一工具、不同日期再次使用（同工具每天最多一次，
 *     否則批次上傳會把留存率灌高）
 *   - cross_tool_use：距上次使用的另一個工具在 30 天內
 */
export function trackToolUseStart(toolName: string): void {
  if (typeof gtag === "undefined") return;

  gtag("event", "tool_use_start", {
    tool_name: toolName,
  });

  if (typeof window === "undefined") return;

  const now = Date.now();
  const today = localDateKey(new Date(now));
  const state = readUsageState();
  const record = state.tools[toolName];

  // 回訪：同一工具、不同日期。同一天再操作不重複送。
  if (record && record.last_use_date !== today) {
    gtag("event", "tool_return_use", {
      tool_name: toolName,
      days_since_last_use: daysBetweenDateKeys(record.last_use_date, today),
      usage_day_count: record.usage_day_count + 1,
    });
  }

  // 交叉使用：上一個用的是別的工具，且在 30 天窗內。
  const previousTool = state.last_tool;
  if (previousTool && previousTool !== toolName && state.last_tool_used_at) {
    const daysSincePreviousTool = Math.max(
      0,
      Math.floor((now - state.last_tool_used_at) / 86_400_000),
    );
    if (daysSincePreviousTool <= CROSS_TOOL_WINDOW_DAYS) {
      gtag("event", "cross_tool_use", {
        tool_name: toolName,
        from_tool: previousTool,
        to_tool: toolName,
        days_since_previous_tool: daysSincePreviousTool,
      });
    }
  }

  writeUsageState({
    ...state,
    tools: {
      ...state.tools,
      [toolName]: {
        last_use_date: today,
        usage_day_count:
          record && record.last_use_date === today
            ? record.usage_day_count
            : (record?.usage_day_count ?? 0) + 1,
      },
    },
    last_tool: toolName,
    last_tool_used_at: now,
  });
}

/**
 * 各工具頁的基本行為事件（GA4）。用於 start / complete 這類每個工具自己的
 * 命名事件（如 exif_clean_start、exif_clean_complete），事件名一律 snake_case，
 * 並帶上 tool_name 參數。gtag 未載入時安靜略過。
 */
export function trackToolEvent(eventName: string, toolName: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, {
      tool_name: toolName,
    });
  }
}

/**
 * 成果產生完畢、下載成功畫面出現時觸發（尚未按下載）。
 * 這是漏斗中間層：多少人真的做出了可下載的成果。
 * 與 tool_download_complete 分開——後者只在真的按下下載鍵時才送。
 */
export function trackToolResultReady(
  toolName: string,
  imageCount: number,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "tool_result_ready", {
      tool_name: toolName,
      image_count: imageCount,
    });
  }
}

/**
 * 使用者真的按下下載按鈕時觸發（單張下載或批次 ZIP）。
 * `image_count` 是事件參數（GA4 自訂指標），不另外送同名事件——
 * 分析每次處理張數時，報表篩 event_name = tool_download_complete 即可。
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

/* -------------------------------------------------------------------------- */
/*  /waitlist 候補頁漏斗                                                        */
/*  下載完成 CTA 曝光 → 點擊 → 到達候補頁 → 送出表單。四個事件串起來才能算出       */
/*  「處理完的人裡有多少對付費有興趣」，也是決定定價（單次 vs 年費）的唯一訊號。   */
/* -------------------------------------------------------------------------- */

/** 候補頁被瀏覽時觸發（每次掛載一次）。lang 用來分辨語系版本的轉換差異。 */
export function trackWaitlistView(lang: string): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "waitlist_view", {
      lang,
    });
  }
}

/**
 * 候補表單送出成功時觸發。
 * 不送 Email 內容（避免 PII），只記錄「處理張數級距」與「定價偏好」——
 * 這兩個參數就是定價決策要的東西。
 */
export function trackWaitlistSubmit(
  imageCount: string,
  pricing: string,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "waitlist_submit", {
      image_count_bucket: imageCount,
      pricing_preference: pricing,
    });
  }
}

/** 下載完成頁的候補 CTA 曝光時觸發（漏斗分母）。 */
export function trackWaitlistCtaView(
  toolName: string,
  location = "download_success",
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "waitlist_cta_view", {
      tool_name: toolName,
      location,
    });
  }
}

/**
 * 候補 CTA 被點擊時觸發（漏斗分子）。
 * location 分辨出現位置（download_success / homepage / blog_article），
 * 用來判斷「剛做完事的高意圖時刻」與「純瀏覽」哪個真的會轉換。
 */
export function trackWaitlistCtaClick(
  toolName: string,
  location = "download_success",
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "waitlist_cta_click", {
      tool_name: toolName,
      location,
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

// PWA 安裝提示的觸發方式：
//   native —— Chrome／Edge 等支援 beforeinstallprompt，可叫出原生安裝對話框
//   ios    —— iOS Safari 不支援該事件，只能顯示「分享 → 加入主畫面」手動指引
export type PwaPromptMethod = "native" | "ios";

/**
 * 手機版 PWA 安裝提示 banner 顯示時觸發（每次顯示一次）。
 * method 用來分辨是原生安裝對話框或 iOS 手動指引，兩者轉換率差異很大。
 */
export function trackPwaInstallPromptShown(method: PwaPromptMethod): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "pwa_install_prompt_shown", {
      method,
    });
  }
}

/**
 * 使用者在原生安裝對話框選擇「安裝」時觸發（outcome === "accepted"）。
 * iOS 手動指引無法得知結果，因此不會觸發此事件。
 */
export function trackPwaInstallAccepted(method: PwaPromptMethod): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "pwa_install_accepted", {
      method,
    });
  }
}
