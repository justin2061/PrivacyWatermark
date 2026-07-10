# 台灣生活痛點 × 免費線上工具機會研究報告

> 深度研究：台灣人日常「食衣住行育樂」中有哪些痛點可以用免費線上工具解決，
> 複製 imagemarker.app 解決「證件影本保護」的成功模式。
>
> - **研究日期**：2026-07-11
> - **研究方法**：多代理深度研究工作流（5 個搜尋角度 → 22 個來源抓取 → 99 條主張萃取 → 25 條進入 3 票對抗式查證 → 22 條存活、3 條否決 → 綜合為 6 大結論）
> - **規模**：104 個查證代理、484 次工具呼叫、約 250 萬 tokens、歷時 16 分鐘

---

## 執行摘要（TL;DR）

研究確認 imagemarker 模式（免費、免註冊、純瀏覽器端、焦慮驅動的隱私工具）在繁中市場**仍有可複製的空間**，但方向必須避開已飽和的泛用計算器賽道。最有潛力的缺口集中在兩處：

1. **「住」**——台電官方租屋電費查詢有明確缺口（僅限租約結束後 60 日內查詢、要求用戶自行留存），「租屋電費紀錄留存／超收檢查／分租拆帳」是經一手來源驗證的殘餘痛點，且與 imagemarker 的租屋用戶高度重疊。
2. **隱私影像工具**——繁中泛工具站的隱私分類極稀疏（zhtoolbox 全站約 460 個工具中僅 3 款隱私類，且無證件/浮水印類）；照片 EXIF 中繼資料清除雖已有一個繁中競品（ImageToolkit），但賽道遠未飽和，且與 imagemarker 的定位、技術棧、流量完全協同。

另外，台灣人對週期性生活行政查詢（行事曆/連假/報稅/停班停課/普發登記）有 Google 官方榜單證實的全國級搜尋量，適合作為 SEO 流量入口。

### 明確建議：先做這 3 個

| 順位 | 工具 | 放哪 | 理由 |
|---|---|---|---|
| 1 | **照片 EXIF／中繼資料清除** | 直接加進 imagemarker | 純前端、共用 Canvas 管線、隱私定位一致、賽道稀疏 |
| 2 | **租屋電費紀錄＋超收檢查** | imagemarker「租屋工具」分類 | 官方缺口實證、用戶與租屋證件族重疊 |
| 3 | **連假／請假攻略／行事曆**（輕量） | 部落格內容＋輕工具 | 純 SEO 流量入口，每年自動再生，不投入重開發 |

**應該避開**：房貸試算、薪資試算、BMI、熱量、尺寸換算、農曆轉換——「通用計算器」賽道已徹底飽和。

---

## 一、經查證的六大結論

### 結論 1：泛用計算/換算賽道已高度飽和（信度：高，12-0 通過）

泛用型計算/換算工具在繁中市場已高度飽和，不宜作為新進切入點：

- **房貸試算**：591 提供免登入、支援青安/組合貸款的完整計算器，外加至少 9 家銀行官方工具
- **薪資/勞健保試算**：藍途算算等至少 6 個免費競品（支援 2024–2026 年度）
- **BMI／熱量／嬰兒奶量／鞋碼換算／農曆轉換／台股計算**：ToolsKK 等 50+ 工具站全數涵蓋
- **zhtoolbox**：sitemap 實測 464 個繁中工具，另有 calcbe.com、calculator.tw 等 7+ 個競爭站

原始研究範圍中「衣（尺寸換算）」「食（營養計算）」「住（房貸）」的多數候選項目均已有現成免費競品佔位。四個一手來源即時抓取驗證（2026-07-11），驗證者另獨立找到多個額外競爭站——「飽和」結論偏保守。

**來源**：[591 房貸計算器](https://mortgage.591.com.tw/calculator)、[藍途算算](https://www.laneto.co/salary-lite)、[ToolsKK](https://www.toolskk.com/)、[zhtoolbox](https://www.zhtoolbox.com/)

### 結論 2：隱私影像工具賽道稀疏且與 imagemarker 高度協同（信度：高，11-1 通過）

- zhtoolbox 全站約 460 個工具中，**隱私分類僅 3 款**（密碼產生、雜湊、追蹤參數移除），完全沒有證件保護或加浮水印類工具（唯一 watermark 相關是「移除 Gemini 浮水印」，功能相反）
- 照片 EXIF/GPS 中繼資料清除已有一個直接繁中競品 **ImageToolkit**（繁中介面、主打「100% 瀏覽器端本地處理，照片從未離開您的裝置」，逐字含「清除：所有 Exif, XMP, GPS, 廠商註釋, 縮圖」）——證明 client-side 隱私賣點已被市場採用，但遠未擁擠
- EXIF 洩漏拍攝地點/時間的隱私風險屬可驗證事實
- 台灣詐欺案 2022 年受理約 2.97 萬件創 10 年新高，2023–2024 持續上升（警政署統計），防詐/個資保護的焦慮需求基礎確實存在

**重要保留**：三個「恐懼行銷有效」的相關主張被否決——焦慮需求*存在*是事實，但「恐懼訴求作為行銷角度必然有效」未獲驗證（見第四節）。

**來源**：[zhtoolbox](https://www.zhtoolbox.com/)、[ImageToolkit EXIF 工具](https://imagetoolkit.org/zh-tw/extiftool)、[T客邦：照片隱私外洩](https://www.techbang.com/posts/17399-watch-leaked-delete-photo-privacy-information)、[聯合報：個資外洩專題](https://topic.udn.com/event/newmedia_hacker_personal-data)

### 結論 3：台電租屋電費查詢有官方明文缺口（信度：高，6-0 通過）

台電「住宅租屋電費查詢專區」雖讓租客免費查詢租屋電費，但有硬性限制（台電官方頁面 2026-07-11 即時抓取，逐字確認）：

> 「限於租賃有效期間結束 60 日內提供查詢，倘將屆滿查詢期限，**請自行留存電費資料**」

- 需臨櫃申請（3–5 個工作天）
- 詳細版需房東書面同意
- 經濟部新聞稿、中央社、公視獨立佐證
- 驗證者確認無任何資料顯示台電已延長期限或提供租客長期留存管道

**殘餘痛點**：「租屋電費紀錄長期留存、超收檢查（對照台電夏月/非夏月級距）、分租拆帳」是官方服務未涵蓋的，可用純前端＋localStorage 解決，且目標用戶（租屋族）與 imagemarker 既有的租屋證件用戶直接重疊。

**來源**：[台電住宅租屋電費查詢專區](https://service.taipower.com.tw/ebpps2/simplebill/tenant/simple-query-bill)、[經濟部新聞稿](https://www.moea.gov.tw/Mns/populace/news/News.aspx?kind=1&menu_id=40&news_id=113777)

### 結論 4：週期性生活行政查詢有全國級搜尋量（信度：高，12-0 通過）

Google 官方 2025 台灣年度搜尋榜（一手抓取，五個關鍵字排名逐字吻合）：

- 「普發一萬登記」：全國快速竄升關鍵字第 3 名／公共政策類第 1 名
- 「停班停課」「2026 行事曆」「報稅」「2025 行事曆」「光復節連假」全數進入公共政策類前十
- 「用法」榜（洗臉巾、鯊魚夾、Excel ROUND、AirTag）證明教學型/工具型長尾查詢有實際需求
- 行事曆/連假/請假攻略類需求逐年再生（2025 年內已大量搜尋 2026 行事曆），屬可預期的季節性常青關鍵字
- Google 官方部落格自述「充分說明台灣人對規劃行程的執著」

**保留**：榜單衡量的是「年增幅（快速竄升）」而非絕對搜尋量；「光復節連假」是 2025 年恢復放假的一次性新聞事件；停班停課已有政府官方查詢等強勢現有解。

**來源**：[Google 2025 台灣年度搜尋榜](https://trends.withgoogle.com/zh-tw/year-in-search/2025/tw/)、[Google 官方部落格](https://blog.google/intl/zh-tw/products/explore-get-answers/2025-year-in-search/)、[T客邦報導](https://www.techbang.com/posts/126799-google-taiwan-search-2025-gemini-notebooklm-hot-topics)、[科技新報](https://technews.tw/2025/12/04/year-in-search-2025/)

### 結論 5：免費瀏覽器端工具的變現天花板已被三個案例驗證（信度：中，11-1 通過）

| 案例 | 模式 | 數字 |
|---|---|---|
| **Photopea** | 純瀏覽器端＋廣告 | 單一開發者 Ivan Kutskir；2021 年靠廣告月入約 10 萬美元（月開啟 1,000 萬次、月使用 150 萬小時）；2024 年營收達 300 萬美元（90% 廣告、10% Premium 與授權） |
| **TinyWow** | 免費層放廣告/CAPTCHA → 付費 Premium 去廣告 | 250+ 免費工具聚合站；月繳 $20／年繳約 $15/月；第三方數據月自然流量約 59 萬–256 萬 |
| **藍途算算** | 免費工具導流付費 SaaS | 免費薪資計算器頁尾導流自家付費雲端記帳 SaaS（2500+ 中小企業客戶） |

三種路徑（規模化廣告、去廣告 Freemium、SaaS 導流）都與 imagemarker 的 Freemium 方向相容。

**列為中信度的原因**：Photopea 數字為創辦人自報（但被 Failory、Indie Hackers、GetLatka 多方交叉引用且軌跡一致，GetLatka 估 $2.8M ARR 差距僅 7%）；TinyWow 流量已從 2022–23 高峰（千萬級月訪）下滑約 75%，顯示聚合站流量可規模化但不保證持久；Photopea 是開發 10+ 年的完整 Photoshop 替代品，其天花板不代表 micro-tool 常態。

**來源**：[Failory 專訪 Photopea](https://www.failory.com/interview/photopea)、[Indie Hackers](https://www.indiehackers.com/post/tech/making-3m-per-year-with-a-free-product-axW4u1vB6C8f91Z3Lxu5)、[TinyWow About](https://tinywow.com/about)、[藍途算算](https://www.laneto.co/salary-lite)

### 結論 6：策略綜合——優先序（信度：中，判斷性結論）

依「痛點經一手來源驗證 × 競爭稀疏 × 純前端可行 × 與 imagemarker 協同」加權：

1. **第一優先：照片 EXIF/中繼資料清除工具**，直接加進 imagemarker。技術純前端、與現有 Canvas 管線共用、隱私定位一致、既有一個繁中競品證明需求存在但賽道稀疏、可與馬賽克/浮水印工具形成「照片外流前防護組合」。
2. **第二優先：租屋電費紀錄/超收檢查工具**。官方缺口經一手來源驗證、用戶與 imagemarker 租屋族重疊、純前端可行、可放同站「租屋工具」分類或子頁。
3. **第三優先（流量型）：台灣連假/請假攻略/行事曆工具**。搜尋量有 Google 官方榜單背書、每年自動再生，但屬泛生活工具、與隱私定位協同低——建議以內容頁＋輕工具形式承接 SEO，而非投入重開發。

事實基礎均為高信度，但排序本身是判斷而非事實，且各候選關鍵字的絕對搜尋量未取得（見「待解問題」），故列中信度。

---

## 二、Top 10 工具機會排序

前 5 個有直接查證證據；6–10 為研究覆蓋較弱的合理候選（標註 ⚠️，證據等級較低）：

| # | 工具 | 痛點強度 | 搜尋量 | 競爭（繁中） | 技術方案 | 變現路徑 | 放哪 | 優先度 |
|---|---|---|---|---|---|---|---|---|
| 1 | **EXIF/照片中繼資料清除**——上傳前一鍵清除照片的 GPS/時間/裝置資訊 | 4（焦慮驅動） | 待確認絕對量 | 僅 1 個繁中競品（ImageToolkit） | 純前端，共用現有 Canvas 管線 | Freemium（批次處理/進階選項付費） | imagemarker | ★★★★★ |
| 2 | **租屋電費紀錄＋超收檢查＋分租拆帳**——長期留存電費、對照台電級距抓超收 | 4（官方缺口實證） | 租屋相關字穩定 | 幾乎無 | 純前端＋localStorage＋靜態費率表 | 廣告/租屋 affiliate | imagemarker 租屋分類 | ★★★★☆ |
| 3 | **連假/請假攻略/行事曆**——年度行事曆＋請假最佳化 | 2（但搜尋量大） | Google 榜單實證（年增幅） | 內容競爭多、工具化少 | 靜態內容＋輕互動 | 廣告、導流主站 | imagemarker 部落格 | ★★★☆（流量型） |
| 4 | **照片馬賽克/打碼**（已上線 ✓） | 4 | — | 稀疏 | 已完成 | Freemium | imagemarker | 持續優化 |
| 5 | **合約/文件浮水印**——租約、勞動契約 PDF 加浮水印 | 3 | 待確認 | 稀疏 | 純前端（pdf.js） | Freemium | imagemarker | ★★★☆ |
| 6 | ⚠️ **截圖個資自動偵測遮蔽**——自動偵測身分證字號/電話並遮蔽（參考：台灣開發者已自建開源 pii-guard-tw 證明缺口存在） | 4 | 未掃描 | 未掃描 | 純前端 OCR（tesseract.js），較重 | Freemium | imagemarker | ★★★ |
| 7 | ⚠️ **詐騙訊息/LINE 對話檢查器** | 4 | 未掃描 | 有 165、趨勢防詐達人等官方/大廠解 | 需資料庫 | 難 | 觀望 | ★★ |
| 8 | ⚠️ **搬家/退租點交檢查清單＋照片存證** | 3 | 未掃描 | 未掃描 | 純前端 | 廣告/搬家 affiliate | imagemarker 租屋分類 | ★★★ |
| 9 | ⚠️ **食品有效期限/食安查詢** | 3 | 未掃描 | 政府有官方 API/網站 | 需接 API | 難 | 不建議 | ★ |
| 10 | ⚠️ **演唱會/購票工具** | 3 | 未掃描 | 未掃描；實名制政策變動快 | 需持續維護 | 難 | 不建議 | ★ |

---

## 三、行動建議（回答「先做哪 2-3 個」）

### 第一步：EXIF 清除工具

理由最硬：

- 純前端，跟現有 Canvas/圖片管線直接共用
- 隱私定位 100% 一致
- 有競品證明需求存在，但只有一家
- 可以和浮水印/馬賽克組成「**照片外流前三件套**」：加浮水印 → 打馬賽克 → 清中繼資料，內部互相導流
- 開發成本估計是三個候選中最低的

### 第二步：租屋電費工具

- 官方缺口白紙黑字（台電明文要求用戶「自行留存電費資料」）
- 用戶跟 imagemarker 的租屋證件族重疊
- 唯一成本是要維護台電級距費率靜態表（費率變動頻率低，可接受）
- 這一步同時把 imagemarker 從「證件工具」擴展成「**租屋族工具箱**」

### 第三步（低成本並行）：連假/行事曆內容

做成部落格內容＋輕工具承接季節性 SEO，不投入重開發。

### 動手前的必做功課

用 Google Keyword Planner 花 30 分鐘確認「EXIF 移除」「照片 隱私」「租屋 電費」「電費 分租」等字組的**絕對月搜尋量**——這是本輪研究最大的未驗證假設。

---

## 四、被否決的主張（誠實面對反面證據）

查證階段以 3 票對抗式驗證否決了 3 條主張（全數 0-3），都是同一類——「恐懼/焦慮行銷必然有效」：

| 被否決的主張 | 投票 | 來源 |
|---|---|---|
| ToolsKK 全站未見隱私/不上傳主張，顯示「隱私差異化定位」在繁中泛工具站仍屬空缺 | 0-3 | toolskk.com |
| ImageToolkit 頁面以恐懼/焦慮訴求行銷，驗證「隱私洩漏焦慮」是有效切入角度 | 0-3 | imagetoolkit.org |
| 含 EXIF 照片分享到社群很可能洩漏住家位置，是恐懼驅動的具體隱私痛點 | 0-3 | techbang.com |

**含義**：焦慮需求的*存在*是事實（詐欺創新高、EXIF 風險真實），但「用恐懼訴求行銷就會成功」並未獲證實，且「隱私定位空缺」是從 zhtoolbox 單站外推、非全市場掃描。imagemarker 的文案可以陳述風險事實，但不應把成長策略押在放大恐懼上。

---

## 五、研究限制與注意事項（Caveats）

1. **搜尋量證據的性質**：多來自 Google 年度「快速竄升」榜（年增幅）而非絕對搜尋量，且本輪未取得「EXIF 移除」「租屋電費」「馬賽克」等具體候選關鍵字的繁中月搜尋量數據——這是排序建議最大的未驗證假設。
2. **恐懼行銷主張全數被否決**（0-3）：焦慮需求存在是事實，但「以恐懼訴求行銷必然有效」及「ToolsKK 未做隱私定位＝定位空缺」均未獲證實。
3. **變現案例為自報數字**：Photopea/TinyWow 營收為創辦人自報未經審計；Photopea 規模（月活百萬級）遠超典型 micro-tool，其廣告變現天花板不應解讀為可輕易複製；TinyWow 流量已較高峰下滑約 75%。
4. **台電規則為時點快照**（2026-07）：60 日限制、臨櫃申請等政策可能變動；租屋電費工具若要做「超收檢查」需維護台電級距費率資料，有輕量的資料維護成本。
5. **食、育、樂三類為研究盲區**：這三類（食安查詢、外送比價、學費比較、旅遊預算等）在存活的 22 條主張中幾乎沒有直接證據——不代表無機會，而是本輪驗證未覆蓋，結論對「住＋隱私」有倖存者偏差。

## 六、待解問題（下一輪研究方向）

1. 「EXIF 移除／照片隱私／租屋電費／分租拆帳」等具體候選關鍵字在台灣的**絕對月搜尋量與關鍵字難度**為何？（需 Google Keyword Planner 或 Ahrefs 數據才能最終確定優先序）
2. ImageToolkit 等既有 EXIF 競品在繁中 SERP 的**實際排名與流量**如何？imagemarker 的既有網域權重能否在「照片隱私」相關字組快速卡位？
3. 租屋電費工具的差異化功能（超收檢查需台電夏月/非夏月級距費率、分租拆帳邏輯）是否能長期維持**純前端＋靜態費率表**？費率更新頻率與正確性責任如何處理？
4. 食、育、樂三大類別是否存在類似「台電租屋缺口」的**官方服務殘餘痛點**？例如食品履歷查詢、學費分期試算、演唱會購票實名制相關工具——值得下一輪定向驗證。

---

## 附錄 A：來源清單（22 個，依角度分組）

### 角度 1：市場版圖——台灣熱門免費線上工具盤點
| 來源 | 品質 |
|---|---|
| [591 房貸計算器](https://mortgage.591.com.tw/calculator) | 一手 |
| [藍途算算](https://www.laneto.co/salary-lite) | 一手 |
| [free.com.tw 免費線上工具分類](https://free.com.tw/category/free-online-tools/) | 部落格 |

### 角度 2：需求端驗證——生活類關鍵字搜尋量與趨勢
| 來源 | 品質 |
|---|---|
| [Google 2025 台灣年度搜尋榜](https://trends.withgoogle.com/zh-tw/year-in-search/2025/tw/) | 一手 |
| [zhtoolbox](https://www.zhtoolbox.com/) | 一手 |
| [ToolsKK](https://www.toolskk.com/) | 一手 |
| [Frank Chiu：SEO 關鍵字搜尋量](https://frankchiu.io/seo-query-keyword-search-volume/) | 部落格 |
| [T客邦：Google 台灣 2025 搜尋榜報導](https://www.techbang.com/posts/126799-google-taiwan-search-2025-gemini-notebooklm-hot-topics) | 二手 |
| Google Trends 台灣（explore 頁） | 不可靠（無法直接抓取） |

### 角度 3：焦慮驅動——隱私、防詐、個資保護相關痛點
| 來源 | 品質 |
|---|---|
| [Threads：pii-guard-tw（台灣繁中 PII 去識別化開源工具）](https://www.threads.com/@dustin_gmat/post/DWg8JgmE4N9/) | 論壇 |
| [T客邦：照片隱私外洩](https://www.techbang.com/posts/17399-watch-leaked-delete-photo-privacy-information) | 二手 |
| [ImageToolkit EXIF 清除工具](https://imagetoolkit.org/zh-tw/extiftool) | 一手 |
| [聯合報：個資外洩專題](https://topic.udn.com/event/newmedia_hacker_personal-data) | 二手 |
| [Whoscall：個資外洩的後果](https://whoscall.com/zh-hant/blog/articles/1279-Consequences-of-Personal-Data-Leaks) | 部落格 |
| [Easy Law：台灣身分盜用](https://easy-law.net/blog/criminal/fraud/identity-theft-taiwan-3/) | 部落格 |

### 角度 4：鄰接族群——租屋、搬家、生活行政流程痛點
| 來源 | 品質 |
|---|---|
| [Dcard 租屋板討論](https://www.dcard.tw/f/rent/p/259478117) | 論壇 |
| [HouseFeel：租賃契約新制](https://www.housefeel.com.tw/article/%E7%A7%9F%E8%B3%83%E5%A5%91%E7%B4%84-%E6%96%B0%E5%88%B6/) | 部落格 |
| [台電住宅租屋電費查詢專區](https://service.taipower.com.tw/ebpps2/simplebill/tenant/simple-query-bill) | 一手 |
| [DD-Room 租屋文章](https://www.dd-room.com/article/gxbgmtqf6xjcplsc) | 部落格 |

### 角度 5：商業模式——獨立開發 micro-tool 的 SEO 與變現實務
| 來源 | 品質 |
|---|---|
| [Failory 專訪 Photopea](https://www.failory.com/interview/photopea) | 二手 |
| [Indie Hackers：免費產品年入 $3M](https://www.indiehackers.com/post/tech/making-3m-per-year-with-a-free-product-axW4u1vB6C8f91Z3Lxu5) | 二手 |
| [TinyWow About](https://tinywow.com/about) | 一手 |

## 附錄 B：研究流程統計

| 項目 | 數值 |
|---|---|
| 搜尋角度 | 5 |
| 抓取來源 | 22（URL 去重 1） |
| 萃取主張 | 99 |
| 進入查證 | 25（7 條因預算裁量未查證即捨棄） |
| 查證通過 | 22 |
| 查證否決 | 3 |
| 綜合後結論 | 6 |
| 代理呼叫 | 104 |
| 工具呼叫 | 484 |
| 總 tokens | ~2,498,752 |
| 耗時 | ~16 分鐘 |

每條主張採 3 票對抗式驗證（驗證者被要求主動反駁），需 2/3 票反駁才否決。
