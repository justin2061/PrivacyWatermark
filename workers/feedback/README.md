# imagemarker-feedback Worker

取代 Netlify Forms 收功能許願表單。前端 `client/src/lib/waitlist.ts` 以 JSON POST 到這裡；
資料寫進 D1，再寄一封通知信到站長信箱（Reply-To 是使用者的 Email，直接回信即可）。

## 第一次部署

```bash
cd workers/feedback
npm install
npx wrangler d1 create imagemarker-feedback      # 把印出的 database_id 填進 wrangler.toml
npm run migrate:remote
npx wrangler secret put NOTIFY_TO                # 輸入站長收件信箱（須是 Email Routing 已驗證的目的地址）
npm run deploy
```

前提：imagemarker.app 在 Cloudflare 上已啟用 Email Routing，`feedback@imagemarker.app` 存在。

## 測試

```bash
curl -i -X POST https://imagemarker-feedback.<subdomain>.workers.dev \
  -H "Origin: https://imagemarker.app" -H "Content-Type: application/json" \
  -d '{"form":"waitlist","feature_request":"test","lang":"zh","source":"curl_test"}'
```

應回 `200 {"ok":true}`，並收到通知信。

Windows（Git Bash／PowerShell）在命令列直接打中文時，curl 會送出 CP950 而不是 UTF-8，
D1 與通知信裡就會變成亂碼——這是測試方法的問題，瀏覽器一律送 UTF-8。要測中文請把 JSON
存成 UTF-8 檔案，改用 `--data-binary @body.json`。查資料：

```bash
npx wrangler d1 execute imagemarker-feedback --remote \
  --command "SELECT * FROM submissions ORDER BY id DESC LIMIT 20"
```

## 切換前端

前端只送這個 Worker，不再有 Netlify Forms 後援（`client/index.html` 的隱藏偵測表單已移除）。
`VITE_FEEDBACK_ENDPOINT` 是 build 時寫進去的，**必須先部署 Worker、在 Netlify 的
Build environment variables 設好 `VITE_FEEDBACK_ENDPOINT=<Worker 網址>`，再合併前端改動**；
否則表單會一律顯示送出失敗。

本機 dev 要測表單時，在 `client/.env.local` 放同一個變數（`wrangler dev` 的話是
`http://127.0.0.1:8787`）。

Netlify 上舊的表單資料不會被刪，需要時到 Netlify 後台匯出；確認不再需要後可在
Site settings → Forms 停用表單偵測。
