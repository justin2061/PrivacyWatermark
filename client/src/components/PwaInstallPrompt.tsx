import { useCallback, useEffect, useRef, useState } from "react";
import { X, Share, Plus } from "lucide-react";
import {
  trackPwaInstallPromptShown,
  trackPwaInstallAccepted,
  type PwaPromptMethod,
} from "@/lib/analytics";

// beforeinstallprompt 尚未進入 lib.dom 的標準型別，這裡補上實際用到的部分。
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "imagemarker:pwa-install-dismissed";
const INSTALLED_KEY = "imagemarker:pwa-installed";

// banner 不在載入當下就跳出來，等使用者實際看過內容再提示，避免一進站就被打斷。
const SHOW_DELAY_MS = 4000;

/** localStorage 在無痕模式／停用 cookie 時可能直接 throw，一律吞掉當作「沒記錄」。 */
function readFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeFlag(key: string): void {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    /* 無痕模式寫不進去就算了，最多這次工作階段重複顯示一次 */
  }
}

/** prerender（Netlify 上以無頭 Chrome 產生靜態 HTML）不得渲染任何 banner，確保爬蟲拿到乾淨內容。 */
function isPrerender(): boolean {
  return (
    typeof window !== "undefined" &&
    (window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__ === true
  );
}

/** 已安裝並從主畫面開啟時，display-mode 為 standalone；iOS Safari 則是 navigator.standalone。 */
function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

/** 只在手機寬度顯示（對齊 Tailwind md 斷點，桌面版一律不顯示）。 */
function isMobileWidth(): boolean {
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * iOS Safari 不支援 beforeinstallprompt，只能引導使用者手動「分享 → 加入主畫面」。
 * 但 A2HS 僅 Safari 本身可用，Chrome for iOS／Firefox for iOS／LINE、FB 內建瀏覽器
 * 都沒有這個選項，對這些環境顯示指引只會造成困惑，因此一併排除。
 */
function isIosSafari(): boolean {
  const ua = navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua);
  if (!isIos) return false;
  const isOtherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|FBAN|FBAV|Line|Instagram/i.test(ua);
  return !isOtherBrowser;
}

type Lang = "zh" | "en" | "ja";

/** 依網址前綴決定 banner 語言，與站上 /en、/ja 的既有分區一致。 */
function detectLang(): Lang {
  const path = window.location.pathname;
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/ja" || path.startsWith("/ja/")) return "ja";
  return "zh";
}

const COPY: Record<
  Lang,
  {
    title: string;
    install: string;
    how: string;
    close: string;
    iosHint: (share: JSX.Element, plus: JSX.Element) => JSX.Element;
  }
> = {
  zh: {
    title: "📱 加入主畫面，離線也能用！",
    install: "安裝",
    how: "如何安裝",
    close: "關閉安裝提示",
    iosHint: (share, plus) => (
      <>
        點下方工具列的分享 {share}，再選「加入主畫面」{plus}。
      </>
    ),
  },
  en: {
    title: "📱 Add to Home Screen — works offline!",
    install: "Install",
    how: "How to install",
    close: "Dismiss install prompt",
    iosHint: (share, plus) => (
      <>
        Tap Share {share} in the toolbar, then choose "Add to Home Screen" {plus}.
      </>
    ),
  },
  ja: {
    title: "📱 ホーム画面に追加、オフラインでも使えます！",
    install: "インストール",
    how: "追加方法",
    close: "インストール案内を閉じる",
    iosHint: (share, plus) => (
      <>
        下部の共有ボタン {share} をタップし、「ホーム画面に追加」{plus} を選択してください。
      </>
    ),
  },
};

/**
 * 手機版 PWA 安裝提示 banner。掛在 App 層（Router 之上），每個路由都涵蓋。
 *
 * 顯示條件全部成立才會出現：手機寬度、非 standalone（尚未從主畫面開啟）、
 * 未曾關閉過、未曾安裝過，且瀏覽器確實可安裝（Chrome 系觸發 beforeinstallprompt，
 * 或 iOS Safari 可手動加入主畫面）。桌面版與 prerender 一律 render 為 null。
 *
 * 關閉狀態記在 localStorage，關掉後不再打擾；安裝完成（appinstalled）同樣永久隱藏。
 */
export function PwaInstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [method, setMethod] = useState<PwaPromptMethod | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [lang] = useState<Lang>(() =>
    typeof window === "undefined" ? "zh" : detectLang(),
  );

  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);
  // React StrictMode 下 effect 會跑兩次，用 ref 確保 GA 曝光事件每次顯示只送一次。
  const shownTrackedRef = useRef(false);

  const eligible = useCallback((): boolean => {
    if (isPrerender()) return false;
    if (!isMobileWidth()) return false;
    if (isStandalone()) return false;
    if (readFlag(DISMISSED_KEY) || readFlag(INSTALLED_KEY)) return false;
    return true;
  }, []);

  // 延遲顯示期間使用者可能轉向或改變視窗大小，導致條件不再成立
  // （例如橫向後超過手機斷點）。顯示的當下必須重新確認一次，否則
  // banner 會被 md:hidden 藏起來、GA 卻仍記到一次不存在的曝光。
  const revealAfterDelay = useCallback(
    (next: PwaPromptMethod): (() => void) => {
      const timer = window.setTimeout(() => {
        if (!eligible()) return;
        setMethod(next);
        setVisible(true);
      }, SHOW_DELAY_MS);
      return () => window.clearTimeout(timer);
    },
    [eligible],
  );

  // Chrome／Edge 系：攔下瀏覽器預設的迷你安裝列，改由自家 banner 控制時機。
  useEffect(() => {
    let cancelTimer: (() => void) | null = null;
    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      deferredRef.current = e as BeforeInstallPromptEvent;
      if (!eligible()) return;
      cancelTimer = revealAfterDelay("native");
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => {
      cancelTimer?.();
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, [eligible, revealAfterDelay]);

  // iOS Safari：等不到 beforeinstallprompt，改走手動指引。
  useEffect(() => {
    if (!eligible() || !isIosSafari()) return;
    return revealAfterDelay("ios");
  }, [eligible, revealAfterDelay]);

  // 安裝完成後永久隱藏（使用者可能從瀏覽器自己的選單安裝，不一定經過本 banner）。
  useEffect(() => {
    function onInstalled() {
      writeFlag(INSTALLED_KEY);
      setVisible(false);
    }
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  // 曝光事件：每次 banner 真正顯示時送一次。
  useEffect(() => {
    if (visible && method && !shownTrackedRef.current) {
      shownTrackedRef.current = true;
      trackPwaInstallPromptShown(method);
    }
  }, [visible, method]);

  const dismiss = useCallback(() => {
    writeFlag(DISMISSED_KEY);
    setVisible(false);
  }, []);

  const install = useCallback(async () => {
    if (method === "ios") {
      // iOS 無法程式化叫出安裝流程，只能展開手動步驟說明。
      setShowIosHint(true);
      return;
    }
    const deferred = deferredRef.current;
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    deferredRef.current = null;
    if (outcome === "accepted") {
      trackPwaInstallAccepted("native");
      writeFlag(INSTALLED_KEY);
    } else {
      // 使用者在原生對話框按了取消：視同婉拒，不再重複打擾。
      writeFlag(DISMISSED_KEY);
    }
    setVisible(false);
  }, [method]);

  if (!visible || !method) return null;

  const t = COPY[lang];
  const shareIcon = (
    <Share className="inline w-3.5 h-3.5 align-text-bottom" aria-hidden="true" />
  );
  const plusIcon = (
    <Plus className="inline w-3.5 h-3.5 align-text-bottom" aria-hidden="true" />
  );

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="md:hidden fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <div className="flex items-center gap-3">
          <p className="flex-1 text-sm font-medium text-gray-900 leading-snug">
            {t.title}
          </p>
          {!showIosHint && (
            <button
              type="button"
              onClick={install}
              className="flex-shrink-0 bg-primary text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {method === "ios" ? t.how : t.install}
            </button>
          )}
          <button
            type="button"
            onClick={dismiss}
            aria-label={t.close}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        {showIosHint && (
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
            {t.iosHint(shareIcon, plusIcon)}
          </p>
        )}
      </div>
    </div>
  );
}
