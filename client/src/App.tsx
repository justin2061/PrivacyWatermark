import { Component, Suspense, type ReactNode } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectionNotice } from "@/components/ProtectionNotice";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import { ROUTES, NotFound } from "@/routes";

/** 站內換頁、chunk 還沒載入時的佔位：保留高度避免 footer 跳上來。 */
function RouteFallback() {
  return <div className="min-h-screen" data-route-loading="" aria-busy="true" />;
}

/**
 * 站內換頁時頁面 chunk 載入失敗（離線、部署換版後重整也救不回來）的最後防線；
 * 沒有它 React 會把整個畫面清成空白。換頁時以 key 重設，回上一頁即可恢復。
 */
class RouteErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-lg font-medium">頁面載入失敗，請檢查網路後重新整理。</p>
        <p className="text-sm text-muted-foreground">
          This page failed to load. Please check your connection and reload.
        </p>
        <button
          type="button"
          className="rounded-md border px-4 py-2 text-sm"
          onClick={() => window.location.reload()}
        >
          重新整理 / Reload
        </button>
      </div>
    );
  }
}

function Router() {
  const [location] = useLocation();
  return (
    <RouteErrorBoundary key={location}>
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          {ROUTES.map(({ path, page: Page, props }) => (
            <Route key={path} path={path}>
              <Page {...props} />
            </Route>
          ))}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </RouteErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* 全站輕度防護提醒：Electron／非官方來源／機器人（一般瀏覽器 render 為 null） */}
        <ProtectionNotice />
        {/* 手機版 PWA 安裝提示（桌面版／已安裝／關閉過皆 render 為 null） */}
        <PwaInstallPrompt />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
