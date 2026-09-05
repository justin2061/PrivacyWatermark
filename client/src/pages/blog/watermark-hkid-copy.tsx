import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { InlineCTA } from "@/components/InlineCTA";
import { PopularTools } from "@/components/PopularTools";
import { SiteFooter } from "@/components/SiteFooter";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  howToSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const SLUG = "watermark-hkid-copy";

const URL = "https://imagemarker.app/blog/watermark-hkid-copy";

const HEADLINE = "香港身份證副本水印教學：網上上載前的實用做法";

const DESCRIPTION =
  "虛擬銀行開戶、加密貨幣交易所 KYC、網上求職、BNO 移民文件提交，全部要交香港身份證副本。教你水印應該寫什麼、透明度調到幾多、KYC 系統會唔會 reject，以及副本流出之後可以點處理。全程喺瀏覽器完成，不會上載。";
const OG = "https://imagemarker.app/og/zh/watermark-hkid-copy.png";

export default function WatermarkHkidCopy() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "香港身份證副本水印教學｜網上上載前這樣做才安全 | ImageMarker",
      description: DESCRIPTION,
      canonical: URL,
      locale: "zh_HK",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-09-06",
          dateModified: "2026-09-06",
          image: OG,
        }),
        blogBreadcrumb(HEADLINE, URL, "zh"),
        howToSchema({
          name: "網上上載香港身份證副本前加水印的方法",
          description:
            "喺網上上載香港身份證副本之前，喺瀏覽器內加上寫明對象、用途、日期的水印，全程不會上載到任何伺服器。",
          steps: [
            {
              name: "打開工具",
              text: "喺手機或者電腦嘅瀏覽器打開 imagemarker.app，唔使裝 App，唔使開戶。",
            },
            {
              name: "揀身份證副本並輸入水印文字",
              text: "揀你嘅身份證副本，然後輸入「對象 + 用途 + 日期」。例如：僅供 ZA Bank 開戶 KYC 之用 2026年9月6日。",
            },
            {
              name: "開啟平鋪並調校透明度",
              text: "開啟重複（平鋪）模式令水印鋪滿整張相，透明度調到 30 至 45%。KYC 系統會用 OCR 讀你嘅姓名、身份證號碼同符號代碼，透明度太高會被 reject。",
            },
            {
              name: "確認每個欄位仍然清晰，然後上載",
              text: "放大到 200% 逐個欄位睇一次——姓名、身份證號碼、代碼、相片——確認清晰之後先上載加咗水印嘅版本。",
            },
            {
              name: "刪除本機嘅乾淨副本",
              text: "上載完成之後，刪除電話同下載夾入面未加水印嘅副本，避免下次錯手上載到第二個 app 或者被人翻查手機時流出。",
            },
          ],
        }),
        faqSchema([
          {
            q: "加咗水印會唔會被 KYC 系統 reject？",
            a: "有可能，如果水印太深或者遮住重要欄位。虛擬銀行、加密貨幣交易所嘅 KYC 系統會自動用 OCR 讀身份證號碼、姓名同 A/U/R/C 等符號代碼，透明度超過 50% 或者用深色都容易觸發重交。實務上，先用 30 至 45% 透明度、淺色文字試一次；被 reject 先再交一次乾淨版本。切勿倒轉次序——一份未加水印嘅乾淨副本上載到 KYC 供應商嘅伺服器之後，你就冇辦法追返。",
          },
          {
            q: "香港身份證副本被人拎到手，實際會用嚟做啲乜？",
            a: "最常見有四類：一係申請虛假貸款——網貸公司同財務公司嘅網上申請流程通常只要身份證副本加地址證明；二係開戶口做「傀儡帳戶」，等詐騙分子將黑錢過數；三係註冊虛擬電話號碼或者 SIM 卡做詐騙；四係做假求職，用你嘅身份去接收工作、糧單，甚至代簽合約。四類都唔需要正本，只需要一份可以清楚 OCR 讀到嘅副本。加水印就係要令副本流出時，冇辦法輕易套用喺其他場景。",
          },
          {
            q: "上載到虛擬銀行同上載到普通網站，處理有唔同嗎？",
            a: "有。虛擬銀行、加密貨幣交易所、匯款公司呢類受金管局、證監會或者境外監管機構規管嘅平台，佢哋通常會透過第三方 KYC 供應商（例如 Sumsub、Onfido、Persona、Jumio）處理你嘅副本。呢個意思係你嘅身份證副本至少會存喺兩個地方——平台本身，同 KYC 供應商。至於一般網站或者網上求職平台，可能連加密上載都冇。所以水印文字入面，最好連 KYC 供應商嘅名都寫埋，令副本流出時更加難以套用。",
          },
          {
            q: "移民 KYC（例如英國 BNO、加拿大、澳洲）可唔可以加水印？",
            a: "移民局同大使館嘅遞交系統一般接受加咗適度水印嘅副本，只要姓名、身份證號碼、相片依然清晰可讀。但如果係代辦公司幫你處理申請，佢哋可能會要求乾淨副本以便重複翻拍上載。呢種情況下最少要做嘅係：喺水印寫明「僅供 [代辦公司名稱] [簽證類別] 申請之用 [日期]」，令副本流出時只會對應嗰一次申請。同時保留紀錄，方便日後追蹤。",
          },
          {
            q: "副本已經流出咗，可以點處理？",
            a: "四步：一，即時記錄流出嘅時間、對象、方式；二，如果懷疑被拎去申請信用產品，向信貸資料庫（環聯 TransUnion）申請信貸提示（Credit Alert）或者定期監察報告；三，向私隱專員公署投訴——如果對方係機構、疑似違反 PDPO 收集或者保存個人資料嘅原則，公署可以介入；四，涉及詐騙報警。加水印嘅實際作用，就係喺呢個時候幫你快速判斷副本嘅來源同用途——由邊次遞交流出，寫得幾具體都會有紀錄。",
          },
          {
            q: "ImageMarker 會唔會將我嘅身份證副本上載到伺服器？",
            a: "唔會。ImageMarker 係 100% 喺你嘅瀏覽器本機處理，你揀嘅副本由頭到尾都只留喺你部機入面，唔會傳去任何伺服器。你可以直接關咗網絡再試一次，功能一樣正常——呢個係最簡單嘅驗證方法。",
          },
        ]),
      ],
    });
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            首頁
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">
            部落格
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time
              dateTime="2026-09-06"
              className="text-sm text-muted-foreground"
            >
              2026年9月6日
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">{HEADLINE}</h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              以前要交香港身份證副本，大多數係去銀行分行、去政府部門、去律師樓——面對面交出去，對方影完立即還返俾你。而家嘅實務已經完全反轉：
              <strong>虛擬銀行開戶、加密貨幣交易所 KYC、網上求職、BNO 或者加拿大移民文件遞交、電子錢包升等級</strong>
              ，全部都要你自己揸手機影一張身份證副本，然後上載去對方嘅系統。
            </p>
            <p>
              呢個轉變令副本嘅風險完全變咗形。以前一份副本頂多存喺對方公司嘅檔案櫃，冇乜途徑對外流出；而家一份副本會經過你嘅手機、雲端相簿、瀏覽器暫存、平台嘅伺服器、第三方 KYC 供應商，甚至可能再送去監管機構或者其他合作方。呢篇文集中處理呢個新場景——網上上載身份證副本前應該做啲乜、水印應該點寫、被 KYC 系統退返點算，以及副本真係流出咗可以點善後。
            </p>
            <p>
              如果你想搵嘅係身份證副本嘅一般加水印教學（開戶、租樓、搵工、電訊商合約嘅通用做法），可以睇{" "}
              <Link
                href="/blog/watermark-hkid"
                className="text-primary hover:underline"
              >
                身份證副本加水印完全指南
              </Link>
              。呢篇文由頭到尾都圍住「網上上載」呢個場景講。
            </p>

            <h2>網上場景同傳統場景，最大分別喺邊？</h2>
            <p>
              主要有三點，值得逐點理解一次，因為呢啲分別直接決定你嘅副本應該點處理。
            </p>
            <p>
              <strong>一，副本會俾多過一間機構睇。</strong>
              當你上載到虛擬銀行、加密貨幣交易所或者匯款平台，副本通常會即時傳去第三方嘅 KYC 供應商——業界常見有 Sumsub、Onfido、Persona、Jumio、Veriff、IDnow。佢哋負責 OCR 讀字、核對文件真偽、比對制裁名單，然後將結果返俾平台。你嘅身份證副本亦會存喺呢啲供應商嘅系統，長達數年，直至平台同佢哋嘅合約年期屆滿。你可以喺平台嘅私隱政策入面搵「處理者」（processor）或者「分處理者」（sub-processor）呢個字，通常會列到 KYC 供應商嘅名。
            </p>
            <p>
              <strong>二，你冇辦法追回一份已經上載嘅副本。</strong>
              呢個係比傳統場景更加關鍵嘅一點。實體副本影完可以攞返，退咗學可以要求對方剪碎；但一份已經上載去 Sumsub 或者 Onfido 嘅副本，冇任何用戶端嘅按鈕可以「刪除」佢。你唯一嘅選擇係按 GDPR、PDPO 或者當地法規要求刪除，然後等對方回覆——過程以月計。呢個現實令水印嘅重要性提升好多，因為水印就係唯一「跟住副本一齊行」嘅限制條件。
            </p>
            <p>
              <strong>三，OCR 會對水印挑剔。</strong>
              自動化 KYC 系統會用 OCR 逐個欄位讀你嘅身份證。透明度太高（超過 50%）、顏色太深、或者水印字體太粗，都可能令姓名、身份證號碼或者機讀區被誤判，觸發自動退返。所以喺網上場景，水印嘅參數要調得比傳統場景更加溫和：透明度 30 至 45%，選淺色文字，字型唔好太粗。
            </p>

            <h2>網上上載場景一覽：邊啲收得緊、邊啲鬆</h2>

            <h3>虛擬銀行開戶</h3>
            <p>
              Mox、ZA Bank、livi、WeLab、PAO Bank、Ant Bank、Fusion Bank、Airstar，全部要求身份證副本加自拍活體檢測（liveness check）。開戶流程通常喺 5 分鐘內完成，副本會經 KYC 供應商即時處理。實務上，加咗 30 至 40% 透明度嘅淺色水印可以通過，被退返時再拆水印重試。水印文字建議寫「僅供 [銀行名稱] 開戶 KYC 之用 [日期]」。
            </p>

            <h3>加密貨幣交易所</h3>
            <p>
              HashKey Exchange、OSL、Binance（境外）、OKX（境外）呢類平台嘅 KYC 特別嚴格，因為受《打擊洗錢及恐怖分子資金籌集條例》規管，同時要對境外部分應付更多監管機構。文件真偽檢測、活體檢測、跨平台反詐騙訊號共享（透過同一 KYC 供應商）都會做。呢個場景係最應該加水印嘅——一旦副本流出，會被交叉比對進入 KYC 供應商共享嘅詐騙訊號庫。水印文字寫明平台名同日期，令副本流出時更難套用。
            </p>

            <h3>電子錢包同支付平台</h3>
            <p>
              PayMe、AlipayHK、WeChat Pay HK 等平台嘅基本註冊唔一定要身份證副本，但升級到高額轉帳、餐飲商戶收款或者跨境結算功能就要交。呢個階段大多數用手機拍照上載，然後即時 OCR 判定；加水印以「僅供 [平台] 額度升級 KYC 之用 [日期]」寫法，一般都能通過。
            </p>

            <h3>移民、簽證同海外文件遞交</h3>
            <p>
              英國 BNO 5+1、加拿大 SUV／Federal Skilled Worker、澳洲技術移民、美國 O-1，都會要求上載香港身份證副本。移民局同大使館嘅系統一般接受加咗適度水印嘅副本，但如果經代辦公司或者律師樓遞交，就要視乎佢哋嘅內部流程。水印一定要寫明「僅供 [代辦公司／律師樓名稱] [簽證類別] 申請之用 [日期]」，令副本被翻用或者流出時可以即刻識別來源。
            </p>

            <h3>網上求職平台</h3>
            <p>
              JobsDB、LinkedIn Verified、Indeed、Glassdoor 等平台嘅「已核實身分」badge，會要求你上載身份證副本。呢個場景實務上風險最大——求職相關嘅身份證副本流失事件係香港最常見嘅個人資料外洩案例類型之一，尤其係假招聘（fake recruitment）騙徒。除咗加水印之外，仲要確認求職平台本身值得信任，唔好將副本直接透過 WhatsApp 或者 Telegram 交俾「HR」。
            </p>

            <h3>網上開戶（傳統銀行嘅數碼申請）</h3>
            <p>
              匯豐、恒生、中銀、渣打、東亞等傳統銀行嘅網上開戶申請，需求嚴謹程度介乎虛擬銀行同實體開戶之間。呢類申請大多數會經內部 KYC 部門加第三方供應商雙重處理。副本會存喺傳統銀行嘅檔案系統長達七年以上（受《打擊洗錢及恐怖分子資金籌集條例》規管），加水印時可以連 KYC 供應商嘅名都寫埋。
            </p>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
              lang="zh"
            />

            <h2>水印應該寫啲乜？三個必備元素</h2>
            <p>
              網上場景同傳統場景一樣，水印文字都係三個元素：
              <strong>對象 + 用途 + 日期</strong>
              。但因為網上場景嘅副本會經過多個機構，用詞要更具體。
            </p>
            <ul>
              <li>
                <strong>弱：</strong>
                「副本」、「Confidential」——冇對象、冇用途、冇日期。副本流出時完全冇分別。
              </li>
              <li>
                <strong>弱：</strong>
                「僅供 KYC 之用」——邊個 KYC？副本流去第二間平台時一樣可以用。
              </li>
              <li>
                <strong>強：</strong>
                「僅供 ZA Bank 開戶 KYC 之用 2026年9月6日」——一個平台、一個流程、一個日期。
              </li>
              <li>
                <strong>更強（KYC 供應商已知時）：</strong>
                「僅供 ZA Bank／Sumsub 開戶 KYC 之用 2026年9月6日」——連 KYC 供應商都寫埋，令副本流出時，套用去其他平台嘅 KYC 供應商時，OCR 已經讀到「呢份唔屬於呢度」。
              </li>
            </ul>

            <h2>上載前嘅檢查清單</h2>
            <ol>
              <li>
                <strong>喺 app 或者網頁裡面拍照，如果佢支援</strong>
                。呢個做法會令副本只留喺 app 嘅暫存區，唔會出現喺你嘅相簿。如果 app 唔支援，先拍一張新嘅、上載完立即刪；千祈唔好用三個月前留喺相簿嘅舊副本。
              </li>
              <li>
                <strong>清除 EXIF 資料。</strong>
                手機拍嘅副本通常會夾帶 GPS 座標同拍攝時間。KYC 供應商將呢啲資料存埋，就等於連你影相嗰陣喺邊都知埋。用{" "}
                <Link
                  href="/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF 清除工具
                </Link>{" "}
                快速清咗佢。
              </li>
              <li>
                <strong>加水印。</strong>
                對象、用途、日期。透明度 30 至 45%，淺色，平鋪覆蓋整張相。
              </li>
              <li>
                <strong>放大 200% 逐個欄位睇一次。</strong>
                姓名、身份證號碼、代碼、相片——每一項都要清楚可讀。如果水印遮住任何一項，透明度調低啲。
              </li>
              <li>
                <strong>只透過官方途徑上載。</strong>
                絕對唔好用 WhatsApp、Telegram、電郵附件將身份證副本交俾「客戶服務」——正規平台嘅 KYC 只會經 app 或者官方網站入面嘅上載按鈕。
              </li>
              <li>
                <strong>上載完後刪除本機嘅乾淨版同水印版。</strong>
                兩個都要刪。連水印版都留喺相簿，都可能被下次事件（電話被偷、iCloud 帳戶被盜）帶出去。
              </li>
              <li>
                <strong>睇多次私隱政策入面嘅「資料保留期」條款。</strong>
                通常喺 data retention 或者 record-keeping 段落。金融類服務嘅副本保留期普遍係 5 至 7 年——呢個時間長度值得你揀 app 之前諗一諗。
              </li>
            </ol>

            <h2>自拍嘅風險完全唔同</h2>
            <p>
              好多 app 除咗要身份證副本，仲會要一段活體檢測嘅自拍片。自拍片
              <strong>唔可以加水印</strong>
              ——KYC 供應商需要未經修改嘅面部影像同動作片段，改咗就會被判失敗。
            </p>
            <p>
              但自拍片本身係另一個獨立嘅私隱問題。錄之前建議睇多次：
            </p>
            <ul>
              <li>
                自拍係以圖片、影片，定係生物特徵向量（biometric template）方式保存？三種嘅保留期同法律風險唔一樣。
              </li>
              <li>
                KYC 供應商會唔會將生物特徵向量拎去比對佢其他客戶嘅資料（例如檢查「同一個人係咪喺其他交易所開多過一個戶口」）？呢種共享喺 Sumsub、Onfido、Persona 等大廠都存在。
              </li>
              <li>
                你嘅生物資料受咩司法區規管？香港嘅個人資料私隱條例（PDPO）冇專門嘅生物特徵條款，但如果 KYC 供應商總部喺歐洲，就要遵守 GDPR 第 9 條特別類別資料規定。
              </li>
            </ul>

            <InlineCTA
              tool="exif-clean"
              position="mid_article"
              location={SLUG}
              lang="zh"
            />

            <h2>身份證副本被人拎到手，通常會做啲乜</h2>
            <p>
              呢啲唔係假設，係香港警方、私隱專員公署同信貸資料庫近年公佈嘅實際個案類型。
            </p>
            <ul>
              <li>
                <strong>虛假貸款申請。</strong>
                財務公司同網貸平台嘅網上申請只需要身份證副本加地址證明，副本就可以套現。你收到第一封 sms 通知落款率先由外判催數公司發出。
              </li>
              <li>
                <strong>傀儡帳戶（Money Mule）。</strong>
                詐騙集團利用你嘅副本開設虛擬銀行或者電子錢包帳戶，將黑錢過數；當帳戶被凍結時，被追討責任嘅名字係你。
              </li>
              <li>
                <strong>假求職／假招聘。</strong>
                詐騙者用你嘅副本代簽合約，你嘅稅務同 MPF 紀錄會被種下，直到收到強積金局或者稅務局嘅信先發現。
              </li>
              <li>
                <strong>虛擬電話號碼／SIM 卡註冊。</strong>
                副本可以用嚟註冊 SIM 卡，然後 SIM 卡用嚟做詐騙——通訊紀錄追返你身上。
              </li>
              <li>
                <strong>網上服務嘅假身分驗證。</strong>
                部分需要驗證年齡或者身份嘅網站（賭博、成人、電子煙），會用副本開帳戶。呢啲帳戶如果違反當地法規，責任又落返你身上。
              </li>
            </ul>

            <h2>副本已經流出咗，可以點善後</h2>
            <p>
              加咗水印嘅副本，係呢一刻幫到你嘅——你至少知道嗰次流出係屬於邊個平台、邊個日期、邊次遞交。以下四步係實務做法。
            </p>
            <ol>
              <li>
                <strong>即時記錄流出資訊。</strong>
                邊個平台、邊次遞交、日期、水印內容、你有冇收到通知（例如平台嘅資料外洩通知）。呢啲資料喺後面幾步都要用到。
              </li>
              <li>
                <strong>信貸監察。</strong>
                向環聯資訊有限公司（TransUnion Hong Kong）申請信貸提示（Credit Alert）或者定期監察報告。當有人用你嘅身份申請信用產品時，你會收到提醒。呢個係防止虛假貸款套現嘅最直接手段。
              </li>
              <li>
                <strong>私隱專員公署投訴。</strong>
                如果流出源自機構或者商戶違反 PDPO 嘅收集、保存、使用原則（例如未經告知俾第三方、保存期超乎所需），可以向公署投訴。公署有權要求對方調查、更正或者刪除。實務上，遞交投訴前準備好流出證據同水印副本可以加快處理。
              </li>
              <li>
                <strong>涉及詐騙即時報警。</strong>
                去警署或者透過網上舉報系統（e-Report Centre）舉報。警方會發參考編號（Police Reference Number），呢個編號往後喺信貸資料更正、銀行帳戶解凍等程序都會用到。
              </li>
            </ol>

            <h2>常見問題</h2>
            <p>
              <strong>Q：加咗水印會唔會被 KYC 系統 reject？</strong>
              <br />
              A：有可能，如果水印太深或者遮住重要欄位。虛擬銀行、加密貨幣交易所嘅 KYC 系統會自動用 OCR 讀身份證號碼、姓名同代碼，透明度超過 50% 或者用深色都容易觸發重交。實務上，先用 30 至 45% 透明度、淺色文字試一次；被 reject 先再交一次乾淨版本。切勿倒轉次序——一份未加水印嘅乾淨副本上載到 KYC 供應商嘅伺服器之後，你就冇辦法追返。
            </p>
            <p>
              <strong>Q：上載到虛擬銀行同上載到普通網站，處理有唔同嗎？</strong>
              <br />
              A：有。虛擬銀行、加密貨幣交易所、匯款公司呢類受金管局、證監會或者境外監管機構規管嘅平台，通常會透過第三方 KYC 供應商（Sumsub、Onfido、Persona、Jumio）處理你嘅副本。呢個意思係你嘅身份證副本至少會存喺兩個地方——平台本身，同 KYC 供應商。所以水印文字最好連 KYC 供應商嘅名都寫埋。
            </p>
            <p>
              <strong>Q：移民 KYC 可唔可以加水印？</strong>
              <br />
              A：可以。移民局同大使館嘅遞交系統一般接受加咗適度水印嘅副本，只要姓名、身份證號碼、相片依然清晰可讀。如果係代辦公司幫你處理申請，佢哋可能會要求乾淨副本；呢種情況下，水印寫明「僅供 [代辦公司名稱] [簽證類別] 申請之用 [日期]」，令副本流出時只會對應嗰一次申請。
            </p>
            <p>
              <strong>Q：香港身份證副本被人拎到手，實際會用嚟做啲乜？</strong>
              <br />
              A：最常見有四類：虛假貸款、傀儡帳戶、假求職、虛擬 SIM 卡註冊。四類都唔需要正本，只需要一份可以清楚 OCR 讀到嘅副本。加水印就係要令副本流出時，冇辦法輕易套用喺其他場景。
            </p>
            <p>
              <strong>Q：副本已經流出咗，可以點處理？</strong>
              <br />
              A：四步：記錄流出資訊、向環聯申請信貸提示、向私隱專員公署投訴、涉及詐騙即時報警。加水印嘅副本喺呢個時候會提供實質幫助——你可以指出邊次遞交流出、日期同對象。
            </p>
            <p>
              <strong>Q：ImageMarker 會唔會將我嘅身份證副本上載到伺服器？</strong>
              <br />
              A：唔會。ImageMarker 係 100% 喺你嘅瀏覽器本機處理，你揀嘅副本由頭到尾都只留喺你部機入面，唔會傳去任何伺服器。你可以直接關咗網絡再試一次，功能一樣正常。
            </p>

            <h2>上載前嗰十秒</h2>
            <p>
              網上上載嘅過程只需要十秒，但副本嘅生命週期以年計算。呢十秒你可以控制嘅係——寫喺副本上面嘅文字。將副本綁定去一個平台、一個用途、一個日期。清除 EXIF。刪除本機嘅乾淨版本。呢啲步驟嘅分別，就係一份可以隨處套用嘅副本，同一份只喺呢一次遞交生效嘅副本之間嘅分別。
            </p>
            <p>
              想搵通用場景（開戶、租樓、搵工、電訊商合約）嘅完整教學，去{" "}
              <Link
                href="/blog/watermark-hkid"
                className="text-primary hover:underline"
              >
                身份證副本加水印完全指南
              </Link>
              。想搵租樓專門嘅粵文版做法，去{" "}
              <Link
                href="/blog/hk-rent-id-copy-watermark"
                className="text-primary hover:underline"
              >
                香港租屋交身份證副本前，一定要加浮水印保護
              </Link>
              。
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              上載到 KYC 平台之前，先加上水印
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              免費、免安裝、100% 喺瀏覽器內處理，副本不會上載。
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              免費為身份證副本加水印<ReadMoreArrow />
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            <a
              href="https://ko-fi.com/justinlee2061"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              &#9749; 呢篇文有幫到你嘅話，可以請我飲杯咖啡
            </a>
          </p>
        </article>

        <PopularTools lang="zh" location={SLUG} className="mt-12" />
      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
