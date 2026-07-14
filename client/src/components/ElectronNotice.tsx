import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { trackElectronDetected } from "@/lib/analytics";

const SITE_URL = "https://imagemarker.app";

// 疑似第三方把 imagemarker.app 包成 Electron 桌面 App。
// 這裡只做輕度防護：偵測 Electron 環境並顯示非阻斷式提醒，不阻擋任何功能。
function isElectron(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.userAgent.includes("Electron");
}

/**
 * Electron 環境提醒 banner。
 * - 只在 Electron 下顯示；一般瀏覽器 render 為 null，完全不受影響。
 * - 可關閉，但用元件 state（非 localStorage），每次開啟 App 都會重新顯示。
 * - 偵測到時送出 GA4 `electron_detected` 事件，附帶 user agent。
 */
export function ElectronNotice() {
  // 惰性初始化：只在掛載時判斷一次
  const [detected] = useState(() => isElectron());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (detected) {
      trackElectronDetected(navigator.userAgent);
    }
  }, [detected]);

  if (!detected || dismissed) return null;

  return (
    <div
      className="bg-amber-50 border-b border-amber-200 text-amber-900"
      role="status"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
        <p className="text-sm flex-1 leading-snug">
          此工具由{" "}
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:text-amber-950 inline-flex items-center gap-0.5"
          >
            imagemarker.app
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>{" "}
          免費提供，建議到官網 imagemarker.app 使用以獲得最佳體驗與最新功能。
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="關閉提醒"
          className="p-1 text-amber-700 hover:text-amber-950 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
