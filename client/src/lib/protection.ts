// 集中式輕度防護偵測模組。
//
// 一律「唯讀」偵測、無副作用：GA 事件與 UI 由呼叫端負責（避免多個元件重複觸發）。
// 三種情況：
//   1. Electron  —— 疑似被第三方包成桌面 App
//   2. 非官方來源 —— 非官方域名或 file:// 開啟（疑似他人拷貝站台自行架設）
//   3. 機器人    —— 無頭瀏覽器／自動化工具（HeadlessChrome、navigator.webdriver）
//
// 重要（SEO 保護）：
//   - prerender（Netlify 上以無頭 Chrome 產生靜態 HTML）會透過 window.__PRERENDER__
//     旗標被視為「乾淨基準」，一律回傳未偵測到任何情況，確保爬蟲拿到完整內容。
//   - 已知搜尋引擎／社群爬蟲（Googlebot、bingbot、Lighthouse…）永不判為機器人。
//   - 一般瀏覽器完全不受影響（三個旗標皆 false）。

const OFFICIAL_HOSTS = [
  "imagemarker.app",
  "www.imagemarker.app",
  "localhost",
  "127.0.0.1",
];

// 已知搜尋引擎／社群爬蟲與 Lighthouse／PageSpeed：即使看起來像自動化也一律放行，
// 避免誤封導致索引或效能評分受損。
const ALLOWED_BOTS =
  /(Googlebot|Google-InspectionTool|APIs-Google|AdsBot-Google|Mediapartners-Google|Storebot-Google|Chrome-Lighthouse|Google Page Speed|Google-PageRenderer|bingbot|BingPreview|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|Exabot|Applebot|facebookexternalhit|facebot|Twitterbot|LinkedInBot|Discordbot|WhatsApp|TelegramBot|Slackbot|Pinterest|redditbot|ia_archiver|SkypeUriPreview)/i;

export interface ProtectionState {
  /** 疑似被包成 Electron 桌面 App（UA 或 nodeIntegration 全域特徵） */
  isElectron: boolean;
  /** 非官方域名或以 file:// 開啟（疑似他人拷貝站台自行架設） */
  isUnauthorizedOrigin: boolean;
  /** 無頭瀏覽器／自動化工具（HeadlessChrome 或 navigator.webdriver） */
  isBot: boolean;
  hostname: string;
  userAgent: string;
}

const SAFE: ProtectionState = {
  isElectron: false,
  isUnauthorizedOrigin: false,
  isBot: false,
  hostname: "",
  userAgent: "",
};

// prerender 於 app 腳本執行前先設好 window.__PRERENDER__ = true（見 scripts/prerender.mjs），
// 讓靜態 HTML 產出乾淨基準，爬蟲拿到完整內容。
function isPrerender(): boolean {
  return (
    typeof window !== "undefined" &&
    (window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__ === true
  );
}

export function detectProtection(): ProtectionState {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return SAFE;
  }
  if (isPrerender()) return SAFE;

  const w = window as unknown as {
    process?: { versions?: { electron?: string } };
    require?: unknown;
  };
  const ua = navigator.userAgent || "";
  const hostname = window.location.hostname || "";
  const protocol = window.location.protocol || "";

  // 1) 強化 Electron 偵測：UA + nodeIntegration 洩漏的全域物件。
  //    注意：現代 contextIsolation 的 Electron 不會外洩 require/process，靠 UA 補足；
  //    這裡用 process.versions.electron（Electron 專屬簽章）而非單純「process 是否存在」，
  //    以避免任何 process polyfill 造成一般瀏覽器誤判。
  const isElectron =
    ua.includes("Electron") ||
    !!w.process?.versions?.electron ||
    typeof w.require === "function";

  // 2) 來源驗證：file:// 或非官方域名（*.netlify.app 視為預覽/測試，放行避免誤報）。
  const isOfficialHost =
    OFFICIAL_HOSTS.includes(hostname) || hostname.endsWith(".netlify.app");
  const isUnauthorizedOrigin =
    protocol === "file:" || (hostname !== "" && !isOfficialHost);

  // 3) 無頭瀏覽器／自動化工具；已知搜尋引擎爬蟲一律放行（SEO 保護）。
  const isBot =
    !ALLOWED_BOTS.test(ua) &&
    (ua.includes("HeadlessChrome") || navigator.webdriver === true);

  return {
    isElectron,
    isUnauthorizedOrigin,
    isBot,
    hostname,
    userAgent: ua,
  };
}
