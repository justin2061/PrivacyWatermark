import { lazy, useState, type ComponentType } from "react";

type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

export type LazyPage<P extends object = object> = ComponentType<P> & {
  /** 先把頁面 chunk 載好；之後第一次 render 不會 suspend。 */
  preload: () => Promise<void>;
};

/**
 * 路由層級 code splitting 用的 React.lazy 包裝。
 *
 * 為什麼不直接用 React.lazy：預渲染的 HTML 在 main.tsx 呼叫 createRoot 時會被
 * 整個換掉。純 React.lazy 的第一次 render 一定會 suspend，使用者會先看到已渲染
 * 好的內容被 Suspense fallback 取代、再換回頁面——LCP 與 CLS 都會變差。
 *
 * 這裡讓 main.tsx 先 preload 目前網址的頁面，載好後 render 直接用真正的元件，
 * 不經過 lazy。站內換頁時（chunk 尚未載入）才走 React.lazy + Suspense。
 */
export function lazyPage<P extends object>(loader: Loader<P>): LazyPage<P> {
  let loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;

  const load = () =>
    (pending ??= loader().then(
      (m) => {
        loaded = m.default;
      },
      (err) => {
        // 失敗（多半是網路或部署換版）時不要快取 rejected promise，下次重試。
        pending = null;
        throw err;
      },
    ));

  // LazyExoticComponent 對泛型 P 的 ref 型別推不過去；頁面都不收 ref，直接視為一般元件。
  const Lazy = lazy(() =>
    load().then(() => ({ default: loaded! })),
  ) as unknown as ComponentType<P>;

  const Page = (props: P) => {
    // 每次掛載只決定一次元件型別：若 render 之間從 Lazy 切到 loaded，
    // React 會視為不同元件而重新掛載，頁面狀態（已上傳的圖片等）會整個消失。
    // 包成物件存：元件本身是函式，直接放進 useState 會被當成 updater。
    const [{ Component }] = useState(() => ({
      Component: loaded ?? Lazy,
    }));
    return <Component {...props} />;
  };

  return Object.assign(Page, { preload: load });
}
