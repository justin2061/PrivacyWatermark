import { createRoot } from "react-dom/client";
import App from "./App";
import { pageFor } from "./routes";
import "./index.css";

// 部署換版後，開著的舊分頁站內換頁會去抓已不存在的舊 hash chunk。
// 此時重新整理一次，就能拿到新版 HTML 與 chunk，而不是停在空白頁。
// 10 秒內只重整一次，避免離線或真的壞掉時無限重整。
window.addEventListener("vite:preloadError", () => {
  const KEY = "chunk-reload-at";
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0);
    if (Date.now() - last < 10_000) return;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // sessionStorage 不可用就無法防止重整迴圈，寧可不重整。
    return;
  }
  window.location.reload();
});

// 先載好目前網址的頁面 chunk 再掛載：createRoot 會整個換掉預渲染的 HTML，
// 若第一次 render 就 suspend，使用者會看到內容閃成空白再出現（見 lib/lazyPage.tsx）。
// 載入失敗時不掛載：瀏覽器會快取失敗的動態 import，掛載後重試也一樣失敗，
// React 只會把預渲染的內容清成空白。留著靜態 HTML，至少還能閱讀與點連結。
pageFor(window.location.pathname)
  .preload()
  .then(
    () => createRoot(document.getElementById("root")!).render(<App />),
    (err) => console.error("[app] page chunk failed to load; keeping static HTML", err),
  );
