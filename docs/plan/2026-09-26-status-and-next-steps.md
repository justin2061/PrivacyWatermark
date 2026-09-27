# 專案現況與下一步（2026-09-26）

## 一、現況快照

| 項目 | 狀態 |
| --- | --- |
| 最後一次上線 | 2026-09-16（週報 6 項 SEO 行動） |
| 型別檢查 `pnpm check` | ✅ 通過 |
| 完整 build（Vite + 預渲染） | ✅ 133/133 路由，canonical／hreflang 檢查通過 |
| 開著的 PR／issue | 無 |
| CI | ✅ 已加入（見下方 P1） |
| 測試 | ❌ 沒有 |

內容規模：工具 10 種（中英雙語完整、日文僅浮水印首頁），部落格中文 35 篇、英文 30 篇、日文 5 篇。

## 二、發現的問題

### 1. 主程式 bundle 過大（影響 Core Web Vitals）

`pnpm build:spa` 輸出：

```
dist/assets/index-*.js   2,794.68 kB │ gzip: 806.77 kB
```

原因：`client/src/App.tsx` 用靜態 `import` 載入全部約 110 個頁面元件，
另外 `pdf-lib`（`lib/pdfWatermarkProcessor.ts`）與 `jszip`（`hooks/useBatchWatermark.ts`）
也都是靜態載入。結果是讀者打開任何一篇文章，都要先下載所有工具與所有文章的程式碼。
預渲染雖然讓 HTML 先出現，但 hydration 前頁面不可互動，行動網路上 INP／TBT 會很差。

目前只有 `heic2any` 與 `@imgly/background-removal` 做了動態載入。

### 2. 文件過時

- `replit.md` 仍描述 Express、Drizzle、PostgreSQL 後端，這些都不存在，會誤導人與 AI 助手。
- repo 沒有 `LICENSE` 檔（`package.json` 寫 MIT）。

### 3. 研究建議尚未落地

`docs/research/2026-07-11-taiwan-life-tools-opportunities.md` 建議的三項中，
第 1 項（EXIF 清除）已完成；第 2 項「租屋電費紀錄＋超收檢查」與第 3 項
「連假／行事曆內容」尚未開始。

## 三、建議的下一步（依優先順序）

### ✅ P1 — 效能：路由層級 code splitting（2026-09-26 完成）

結果：入口 JS gzip 807 kB → 110 kB；模擬慢速網路（150ms 延遲、200 KB/s）下，
React 可互動時間從約 4.5 秒降到約 1.3 秒，首頁傳輸量 809 kB → 191 kB。
133 頁預渲染的 title／H1／description／canonical／hreflang／JSON-LD／內文與改動前逐頁比對零差異。

實作重點（與原規劃的差異）：

- 首頁沒有保留靜態載入，而是由 `main.tsx` 在掛載前 preload 目前網址的 chunk，
  預渲染時 Vite 插入的 `modulepreload` 會一起寫進靜態 HTML，瀏覽器與入口檔並行下載，不會串行等待。
- 部署換版後舊分頁抓不到舊 chunk：監聽 `vite:preloadError` 自動重整一次（10 秒內限一次）；
  仍失敗時站內換頁顯示「載入失敗」畫面，首次載入則保留預渲染的靜態內容，不會變空白。
- `pdf-lib` 不在按下「套用」時才載入（那時若遇到換版，自動重整會讓已上傳的 PDF 消失），
  而是頁面 load 後於瀏覽器空閒時預先下載。`jszip` 只有 30 kB，維持跟批次頁一起載入。
- 驗證：10 個工具（中／英／日共 23 頁）實測上傳 → 處理 → 下載全部通過；輸出與改動前的版本
  位元組完全相同（PDF 僅 `/CreationDate` 不同，內容物件完全一致）。

原規劃：

1. `App.tsx` 的頁面改成 `React.lazy(() => import(...))`，外層包 `<Suspense>`。
   首頁（`/`、`/en/`、`/ja/`）可以保留靜態載入，避免首屏多一次請求。
2. `pdf-lib`、`jszip` 改成在使用者真的觸發處理時才 `await import()`。
3. **必須同步調整 `scripts/prerender.mjs`**：現在的等待條件是「`#root` 有子元素」，
   改成 lazy 之後 Suspense fallback 就會讓條件成立，會把 loading 畫面烤進靜態 HTML。
   建議在頁面元件掛載後設一個旗標（例如 `document.documentElement.dataset.ready`），
   預渲染改等這個旗標。
4. 驗收：主 bundle gzip 目標 < 200 kB；預渲染 133 路由的 title／H1 與改動前逐頁比對一致。

### ✅ P1 — 基礎：加上 CI（2026-09-26 完成）

`.github/workflows/ci.yml`；預渲染以 `PRERENDER_REQUIRED=1` 執行，Chrome 起不來也會讓 CI 變紅。

原規劃：

GitHub Actions：`pnpm install --frozen-lockfile` → `pnpm check` → `pnpm build:spa`。
預渲染可選擇性加入（runner 內建 Chrome，設定 `PUPPETEER_EXECUTABLE_PATH` 即可），
好處是 canonical／hreflang／sitemap coverage 檢查會在 PR 階段就擋下來。

### P2 — 候補名單：先看數據再決定

漏斗事件已在 9/3 修正定義。建議累積到 10/3（滿 4 週）後，依
`docs/analytics/ga4-trend-reading.md` 的規則讀：

- post-download 入口 vs 頁面內 CTA 的曝光→展開→送出比率（注意兩者上線日不同，不可直接比）
- 開放問答裡被提到最多次的需求，決定 Pro 第一個付費功能
- 若 4 週內送出數仍是個位數，代表 Pro 需求不成立，資源轉回內容與新工具

### P2 — 新工具：租屋電費紀錄＋超收檢查

依研究報告第 3 條結論（台電查詢僅限租約結束後 60 日內），這是有一手來源佐證的缺口，
且使用者與「租屋交身分證影本」族群重疊，可與現有 7 篇中文租屋相關文章互相導流。
純前端即可（資料存 localStorage，可匯出 CSV）。

### P3 — 日文擴充（視數據）

目前 `/ja/` 只有浮水印首頁與 5 篇文章，其他工具 301 到英文。
若 GSC 的日文查詢（マイナンバー、パスポート コピー）持續成長，
優先翻譯 EXIF 清除與馬賽克兩個工具頁——跟證件隱私的搜尋意圖最接近。

### ✅ P3 — 清理（2026-09-27 完成）

- `replit.md` 改寫成現況（已無後端），完整說明以 README 為準；保留 Changelog 與 User Preferences。
- 補上 `LICENSE`（MIT）。
- 修正預渲染的 sitemap coverage 檢查：#11 把路由搬到 `routes.tsx` 後，它仍讀 `App.tsx`、
  永遠回報 ✓；改讀 `routes.tsx`，找不到任何路由時直接失敗。

### ✅ 其他修正（2026-09-27）

- 固定在頂端的預覽區在 640–1023px 寬、或矮視窗會蓋住整個畫面（手機橫放 166–188%）：
  精簡樣式延伸到 lg 以下，視窗高度 ≤ 640px 時不固定。手機直放與桌面截圖逐像素不變。
- 社群裁切頁內文的 Canva 外連改為推薦站內浮水印與壓縮工具。
