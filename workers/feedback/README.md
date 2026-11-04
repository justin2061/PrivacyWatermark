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

應回 `200 {"ok":true}`，並收到通知信。查資料：

```bash
npx wrangler d1 execute imagemarker-feedback --remote \
  --command "SELECT * FROM submissions ORDER BY id DESC LIMIT 20"
```

## 切換前端

在 Netlify 的 Build environment variables 設 `VITE_FEEDBACK_ENDPOINT=<Worker 網址>` 後重新部署。
沒設這個變數時，前端會退回 Netlify Forms（要切回去，刪掉變數再部署一次即可）。

上線後觀察約 7 天，確定 D1 有穩定進資料，再移除 `client/index.html` 的隱藏 Netlify 偵測表單
與 `waitlist.ts` 的 Netlify 後援路徑。
