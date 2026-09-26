# ImageMarker — 隱私圖片工具箱

線上網址：<https://imagemarker.app>（中文）／[/en/](https://imagemarker.app/en/)（English）／[/ja/](https://imagemarker.app/ja/)（日本語）

ImageMarker 是一套完全免費、**100% 在瀏覽器本地處理**的圖片工具箱。
起點是「證件影本加浮水印」——在交出身分證、護照、駕照影本前加上「僅供 XX 用途」字樣，防止被挪用——
後來擴充成涵蓋隱私保護、圖片處理、社群創作的多工具網站。所有處理都在使用者的瀏覽器完成，
圖片**不會**上傳到任何伺服器。

## ✨ 工具一覽

| 分類 | 工具 | 路徑（中文／英文） |
| --- | --- | --- |
| 🛡️ 隱私保護 | 浮水印（九宮格定位、重複模式、斜放排列） | `/` ・ `/en/` |
| | 批次浮水印 | `/batch` ・ `/en/batch` |
| | PDF 浮水印 | `/pdf-watermark` ・ `/en/pdf-watermark` |
| | EXIF 清除 | `/exif-clean` ・ `/en/exif-clean` |
| | 馬賽克／臉部模糊 | `/mosaic` ・ `/en/mosaic`、`/en/blur-face` |
| 🖼️ 圖片處理 | 去背（`@imgly/background-removal`，WASM） | `/remove-bg` ・ `/en/remove-bg` |
| | 壓縮 | `/compress` ・ `/en/compress`（另有 100KB／200KB 落地頁） |
| | 格式轉換（HEIC／WebP／PNG／SVG／BMP／GIF） | `/convert`、`/convert/<from>-to-<to>` |
| | 調整尺寸 | `/resize` ・ `/en/resize` |
| ✂️ 社群創作 | 社群尺寸裁切 | `/social-crop` ・ `/en/social-crop` |

工具清單的單一來源是 `client/src/lib/tools.ts`。日文目前只有浮水印首頁，
其他工具的 `/ja/` 連結會退回英文版。

另有：

- **部落格**：中文 35 篇、英文 30 篇、日文 5 篇（`client/src/pages/**/blog/`）。
- **PWA**：可安裝到桌面或手機主畫面，行動版有安裝提示列。
- **功能許願／Pro 候補名單**：使用 Netlify Forms（零後端），送出邏輯在 `client/src/lib/waitlist.ts`。
- **分析**：GA4，事件定義在 `client/src/lib/analytics.ts`；趨勢判讀規則見 `docs/analytics/ga4-trend-reading.md`。

## 🛠️ 技術棧

- React 18 + TypeScript，路由使用 [wouter](https://github.com/molefrog/wouter)
- Vite、Tailwind CSS、shadcn/ui（Radix UI）
- 圖片處理：HTML5 Canvas；PDF 使用 `pdf-lib`；HEIC 使用 `heic2any`
- **預渲染（SSG）**：`scripts/prerender.mjs` 會在 build 後用 Puppeteer 逐一渲染 sitemap 上的所有路由，
  輸出靜態 HTML，並檢查 canonical 與 hreflang
- **路由層級 code splitting**：每個頁面各自一個 chunk；`pdf-lib` 不進首次載入，而是 PDF 浮水印頁載入完成、瀏覽器空閒時才預先下載。
  新增頁面時在 `client/src/routes.tsx` 加一行即可
- 部署：Netlify（設定見 `netlify.toml`，包含轉址與標頭）
- CI：GitHub Actions（`.github/workflows/ci.yml`）在 PR 與 main 上跑型別檢查、build 與預渲染 SEO 檢查

## 🚀 本機開發

需求：Node.js 20+、pnpm。

```bash
git clone https://github.com/justin2061/PrivacyWatermark.git
cd PrivacyWatermark
pnpm install
pnpm dev          # http://localhost:5000
```

常用指令：

| 指令 | 作用 |
| --- | --- |
| `pnpm check` | TypeScript 型別檢查 |
| `pnpm build:spa` | 只跑 Vite build（不預渲染，最快） |
| `pnpm build` | 完整正式 build：Vite build + 下載 Chrome + 預渲染所有路由 |
| `pnpm prerender` | 只對既有的 `dist/` 跑預渲染 |
| `pnpm preview` | 預覽 `dist/` |

若環境已有 Chromium（例如 CI 或容器），可以跳過 Puppeteer 下載，直接指定執行檔：

```bash
pnpm build:spa
PUPPETEER_EXECUTABLE_PATH=/path/to/chrome pnpm prerender
```

## 📁 目錄結構

```
client/
  index.html            # 殼層 HTML（GA4、Netlify Forms 偵測表單）
  public/               # 靜態資源、sitemap、manifest
  src/
    main.tsx            # 進入點：先 preload 目前網址的頁面 chunk 再掛載 React
    routes.tsx          # 路由表（每頁各自一個 chunk，見 lib/lazyPage.tsx）
    App.tsx             # 依路由表 render，含 Suspense 與載入失敗畫面
    pages/              # 中文頁；en/、ja/ 為各語系；blog/ 為文章
    components/         # 共用元件（Header/Footer、上傳區、CTA 等）
    hooks/              # 各工具的處理 hook
    lib/                # 處理引擎、SEO、分析、工具清單
scripts/
  prerender.mjs         # build 後 SSG
  gen-blog-og.mjs       # 產生文章 og:image
docs/                   # 分析判讀規則、市場研究
```

## 📄 授權

MIT（見 `package.json`）。
