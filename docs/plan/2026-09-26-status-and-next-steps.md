# 專案現況與下一步（2026-09-26）

## 一、現況快照

| 項目 | 狀態 |
| --- | --- |
| 最後一次上線 | 2026-09-16（週報 6 項 SEO 行動） |
| 型別檢查 `pnpm check` | ✅ 通過 |
| 完整 build（Vite + 預渲染） | ✅ 133/133 路由，canonical／hreflang 檢查通過 |
| 開著的 PR／issue | 無 |
| CI | ❌ 沒有，只能靠 Netlify 部署失敗才會發現壞掉 |
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

### P1 — 效能：路由層級 code splitting

1. `App.tsx` 的頁面改成 `React.lazy(() => import(...))`，外層包 `<Suspense>`。
   首頁（`/`、`/en/`、`/ja/`）可以保留靜態載入，避免首屏多一次請求。
2. `pdf-lib`、`jszip` 改成在使用者真的觸發處理時才 `await import()`。
3. **必須同步調整 `scripts/prerender.mjs`**：現在的等待條件是「`#root` 有子元素」，
   改成 lazy 之後 Suspense fallback 就會讓條件成立，會把 loading 畫面烤進靜態 HTML。
   建議在頁面元件掛載後設一個旗標（例如 `document.documentElement.dataset.ready`），
   預渲染改等這個旗標。
4. 驗收：主 bundle gzip 目標 < 200 kB；預渲染 133 路由的 title／H1 與改動前逐頁比對一致。

### P1 — 基礎：加上 CI

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

### P3 — 清理

- 改寫或刪除 `replit.md`
- 補 `LICENSE`
