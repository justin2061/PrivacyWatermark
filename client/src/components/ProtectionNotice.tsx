import { useEffect, useState, type ReactNode } from "react";
import { X, ExternalLink, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { detectProtection } from "@/lib/protection";
import {
  trackElectronDetected,
  trackUnauthorizedEmbed,
  trackBotDetected,
} from "@/lib/analytics";

const SITE_URL = "https://imagemarker.app";

function SiteLink() {
  return (
    <a
      href={SITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline inline-flex items-center gap-0.5 hover:opacity-80"
    >
      imagemarker.app
      <ExternalLink className="w-3 h-3" aria-hidden="true" />
    </a>
  );
}

function WarnBanner({
  tone,
  onClose,
  children,
}: {
  tone: "red" | "amber";
  onClose: () => void;
  children: ReactNode;
}) {
  const cls =
    tone === "red"
      ? "bg-red-50 border-red-200 text-red-900"
      : "bg-amber-50 border-amber-200 text-amber-900";
  return (
    <div className={`border-b ${cls}`} role="status">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
        {tone === "red" && (
          <AlertTriangle
            className="w-4 h-4 flex-shrink-0"
            aria-hidden="true"
          />
        )}
        <p className="text-sm flex-1 leading-snug">{children}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉提醒"
          className="p-1 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * 全站頂部防護提醒（Electron／非官方來源／機器人）。掛在 App 層（Router 之上），
 * 每個路由都涵蓋。一般瀏覽器 render 為 null；GA 事件於掛載時各觸發一次。
 * 關閉用元件 state（非 localStorage），每次開啟 App／重新載入都會再顯示。
 */
export function ProtectionNotice() {
  // 惰性初始化：掛載時偵測一次
  const [state] = useState(() => detectProtection());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (state.isElectron) trackElectronDetected(state.userAgent);
    if (state.isUnauthorizedOrigin) trackUnauthorizedEmbed(state.hostname);
    if (state.isBot) trackBotDetected(state.userAgent);
  }, [state]);

  if (dismissed) return null;

  // 只顯示最嚴重者：機器人 > 非官方來源 > Electron
  if (state.isBot) {
    return (
      <WarnBanner tone="red" onClose={() => setDismissed(true)}>
        偵測到自動化／無頭瀏覽器存取，核心工具已停用。本工具僅於官方網站{" "}
        <SiteLink /> 免費提供，請以一般瀏覽器前往使用。
      </WarnBanner>
    );
  }
  if (state.isUnauthorizedOrigin) {
    return (
      <WarnBanner tone="red" onClose={() => setDismissed(true)}>
        您正在使用非官方版本，請到 <SiteLink />{" "}
        使用正版工具，以確保功能正確與個資安全。
      </WarnBanner>
    );
  }
  if (state.isElectron) {
    return (
      <WarnBanner tone="amber" onClose={() => setDismissed(true)}>
        此工具由 <SiteLink />{" "}
        免費提供，建議到官網 imagemarker.app 使用以獲得最佳體驗與最新功能。
      </WarnBanner>
    );
  }
  return null;
}

/**
 * 機器人偵測時，在工具頁面用來取代互動工具元件的封鎖提示。
 * 由工具頁面依 detectProtection().isBot 決定是否改渲染此元件（不載入工具元件）。
 */
export function BotBlockNotice({ lang = "zh" }: { lang?: "zh" | "en" }) {
  const t =
    lang === "en"
      ? {
          title: "Tool temporarily unavailable",
          desc: "Automated or headless browser access was detected, so the core tool has been disabled. Please use a regular browser on the official site.",
          cta: "Go to imagemarker.app",
        }
      : {
          title: "工具暫時無法使用",
          desc: "偵測到自動化或無頭瀏覽器存取，核心工具已停用。請改用一般瀏覽器到官方網站使用完整功能。",
          cta: "前往 imagemarker.app",
        };
  return (
    <Card className="p-8 text-center">
      <AlertTriangle
        className="w-10 h-10 mx-auto mb-4 text-red-500"
        aria-hidden="true"
      />
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{t.title}</h2>
      <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">{t.desc}</p>
      <a
        href={SITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1 bg-primary text-white py-2.5 px-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        {t.cta}
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </Card>
  );
}
