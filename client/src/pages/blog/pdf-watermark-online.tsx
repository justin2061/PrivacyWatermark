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

const URL = "https://imagemarker.app/blog/pdf-watermark-online";
const SLUG = "pdf-watermark-online";
const TITLE =
  "PDF 浮水印怎麼加？合約、報價單線上免費加浮水印（全程不用上傳）";

export default function PdfWatermarkOnline() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "PDF 浮水印線上免費工具：合約、報價單加浮水印教學（不上傳）｜ImageMarker",
      description:
        "合約、報價單、商業提案這類機密 PDF 要加浮水印，卻不敢上傳到別人的伺服器？這篇比較 Smallpdf、文電通、DeftPDF 與 ImageMarker 四種 PDF 浮水印做法的上傳風險與免費額度，並示範 3 步驟在瀏覽器本機為 PDF 每一頁加上中文浮水印，免費、免註冊、檔案不離開你的電腦。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "機密 PDF 加浮水印的完整教學：哪些文件需要加、浮水印該寫什麼、四種線上 PDF 浮水印工具的上傳風險與免費額度比較，以及用純瀏覽器本機工具 3 步驟為 PDF 每一頁加上中文浮水印的做法。",
          url: URL,
          datePublished: "2026-08-09",
          dateModified: "2026-08-09",
        }),
        howToSchema({
          name: "線上為 PDF 加浮水印的 3 步驟",
          description:
            "用瀏覽器本機處理的免費線上工具，為合約、報價單等機密 PDF 的每一頁加上文字或 Logo 浮水印，全程不上傳伺服器。",
          steps: [
            {
              name: "開啟 PDF 浮水印工具並選擇檔案",
              text: "用電腦或手機瀏覽器開啟 ImageMarker 的 PDF 浮水印工具，把 PDF 拖進上傳區或點擊選擇檔案。PDF 只會載入到你自己的瀏覽器記憶體，不會傳送到任何伺服器，因此也沒有檔案大小限制。",
            },
            {
              name: "輸入浮水印文字並調整版面",
              text: "在文字欄輸入用途、對象與日期，例如「機密｜僅供 OO 公司評估報價使用 2026/08/09」。接著調整顏色、透明度與字級，位置建議選「重複鋪滿」，讓浮水印以交錯方式平鋪整頁，避免被裁切掉。需要的話也可以同時上傳公司 Logo 當作圖片浮水印，兩者的透明度與大小各自獨立設定。",
            },
            {
              name: "套用到每一頁並下載",
              text: "按下套用，工具會用 pdf-lib 在瀏覽器裡把浮水印寫進 PDF 的每一頁，原本的文字內容仍然可以選取與搜尋。確認預覽沒問題後下載，檔名會自動加上 -watermarked，再用這個版本寄出去。",
            },
          ],
        }),
        faqSchema([
          {
            q: "線上加 PDF 浮水印安全嗎？合約會不會外流？",
            a: "要看工具是在哪裡處理。Smallpdf、DeftPDF 這類主流線上服務都是伺服器端處理：你的合約必須先完整上傳到對方主機，加完浮水印再下載回來，檔案是否留存、留多久、由誰看得到，你只能相信對方的隱私政策。ImageMarker 的 PDF 浮水印工具則是用 pdf-lib 在你自己的瀏覽器裡運算，PDF 從頭到尾沒有離開你的電腦，網頁載入後就算斷網也能正常加浮水印，這是處理機密文件最安全的做法。",
          },
          {
            q: "PDF 浮水印可以打中文嗎？會不會變亂碼？",
            a: "可以，而且不會亂碼。很多 PDF 函式庫只內建幾種西文標準字型，直接寫中文會出現空白或問號。ImageMarker 的做法是先用瀏覽器的 canvas 把文字繪製成圖，再把這張圖嵌進 PDF，所以只要你的系統顯示得出來的中文、日文字元都能正常輸出。",
          },
          {
            q: "浮水印會套用到 PDF 的每一頁嗎？",
            a: "會。設定好的文字與 Logo 浮水印會自動套用到 PDF 的所有頁面，不需要一頁一頁處理。三十頁的合約和一頁的報價單，操作步驟完全一樣。",
          },
          {
            q: "加了浮水印的 PDF，對方還能複製文字嗎？",
            a: "可以。浮水印是疊加在頁面上的一層視覺標示，不會改變 PDF 原有的文字圖層，所以內文仍然可以選取、搜尋、複製。浮水印的目的不是讓文件無法使用，而是宣告用途與對象，讓這份檔案被轉用時一眼就看得出來。如果需要禁止複製與列印，那要用 PDF 權限密碼或企業 DRM，屬於另一個層次的控制。",
          },
          {
            q: "PDF 浮水印會不會被對方移除？",
            a: "沒有任何浮水印是絕對無法移除的，重點是提高成本。用「重複鋪滿」模式讓浮水印交錯平鋪整頁、壓過正文區域，就不可能靠裁切邊緣去掉；文字內容寫上具體的對象與日期，也讓移除行為本身變成明確的惡意事證。真正的價值在於：一份寫著「僅供 OO 公司評估使用」的報價單流到競爭對手手上時，你有證據說明它不該出現在那裡。",
          },
          {
            q: "報價單和合約的浮水印該寫什麼？",
            a: "三個要素缺一不可：用途（僅供評估報價使用、僅供投標審查使用）、對象（收件公司全名）、日期或版本號。建議格式是「機密｜僅供 OO 股份有限公司評估報價使用 2026/08/09」。每一家收件方都用不同的文字，日後文件外流時可以直接反推是哪一份、從誰手上流出去的。",
          },
          {
            q: "有免費額度限制嗎？一天只能加幾份？",
            a: "ImageMarker 的 PDF 浮水印工具沒有次數限制，也不需要註冊或安裝。多數雲端 PDF 服務會限制免費用戶每天處理的份數或檔案大小，是因為伺服器運算與頻寬要花錢；本機處理沒有這個成本，所以能處理多大的 PDF 只取決於你電腦的記憶體。",
          },
        ]),
        blogBreadcrumb(TITLE, URL),
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
            <time dateTime="2026-08-09" className="text-sm text-muted-foreground">
              2026-08-09
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">{TITLE}</h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <h2>那份報價單寄出去之後，你就再也管不到它了</h2>
            <p>
              星期二下午，你把一份 PDF 報價單寄給潛在客戶。
              裡面有你的成本結構、交期承諾、分階段折扣，
              還有你不太想讓同業看到的單價。
            </p>
            <p>
              客戶收到後轉給了他們的採購主管，採購主管轉給了財務，
              財務順手轉給另外兩家廠商「參考一下行情」。
              整個過程沒有惡意、沒有駭客、沒有人違法——
              只是一個 PDF 附件，在三次轉寄裡走完了它的旅程。
            </p>
            <p>
              這時你會發現一件事：
              <strong>那份檔案上完全沒有任何東西，說明它只能用在一件事上。</strong>
              沒有用途、沒有對象、沒有日期。
              它看起來就像一份可以自由流通的公開文件，
              所以它就真的被當成公開文件流通了。
            </p>
            <p>
              PDF 浮水印處理的就是這件事。它不能阻止轉寄，
              但它能讓每一頁都寫著「機密｜僅供 OO 公司評估報價使用 2026/08/09」——
              轉出去的人知道自己在做什麼，收到的人知道這份東西不該在他手上，
              真的出事時你也有具體證據。
            </p>
            <p>
              麻煩的是實務上的第二層問題：
              搜尋「PDF 浮水印 線上」找到的工具，
              幾乎每一個都要你先把這份機密合約
              <strong>整份上傳到它的伺服器</strong>。
              為了保護文件，先把文件交給陌生人——這個矛盾，
              是這篇文章想解決的重點。
            </p>

            <h2>一、哪些 PDF 該加浮水印</h2>
            <p>
              判斷標準很簡單：
              <strong>這份 PDF 交出去之後，會不會被轉寄給你不認識的人？</strong>
              只要答案是「有可能」，就值得加。實務上最常見的是這五類。
            </p>

            <h3>1. 合約與意向書</h3>
            <p>
              草約來回修改的過程中，同一份合約常常存在三、四個版本，
              分別躺在雙方好幾個人的信箱裡。
              浮水印除了寫用途，更該寫上
              <strong>版本與日期</strong>（例如「草案 v3｜2026/08/09｜未經簽署」），
              避免對方拿舊版本來主張條件，也避免自己簽錯版本。
              「未經簽署」四個字尤其重要——它讓草案不會被誤當成定案文件流通。
            </p>

            <h3>2. 報價單</h3>
            <p>
              報價單是最容易被拿去比價的文件，也是外流損失最直接的一種。
              對不同客戶報不同價格是正常的商業判斷，
              但兩份報價單在第三方手上相遇時就會變成麻煩。
              寫明對象與日期，至少讓報價和特定客戶、特定時間點綁在一起，
              「這是三個月前給另一家的條件」才說得清楚。
            </p>

            <h3>3. 商業提案與投標文件</h3>
            <p>
              提案簡報裡通常有你最核心的東西：執行方法、人力配置、時程規劃。
              有些單位收了提案卻沒發包，隔一陣子用你的架構自己做，
              或是拿去給另一家廠商執行。
              提案類文件建議把浮水印寫得更完整：
              <strong>機密＋對象＋案件名稱＋日期</strong>，
              讓這份文件的來源與用途無法被抹掉。
            </p>

            <h3>4. 機密報告與內部文件</h3>
            <p>
              財報、市場分析、稽核報告、客戶名單這類要在公司內外流動的文件，
              浮水印的價值在於<strong>可追溯</strong>：
              發給每個部門或每位收件者的版本各自標上不同的收件人名稱，
              一旦文件出現在不該出現的地方，來源立刻可以反推。
              這對中小企業特別實際——
              營業秘密法要求持有人採取「合理保密措施」才受保護，
              而在文件上明確標示機密與用途，正是最低成本的一種。
              完整做法可以參考
              <Link href="/blog/business-confidential-watermark">
                中小企業機密文件浮水印
              </Link>
              。
            </p>

            <h3>5. 證件與個人文件的 PDF</h3>
            <p>
              身分證、護照、存摺封面、在職證明、財力證明的掃描檔，
              很多時候是以 PDF 形式交出去的（銀行、簽證、租屋、投標附件）。
              這類檔案的風險比商業文件更高，因為外洩後被冒名申辦的是你本人。
              寫法和圖片版的證件浮水印一樣，
              可以直接沿用
              <Link href="/blog/watermark-templates-guide">浮水印範本與寫法大全</Link>
              的句型。
            </p>

            <h2>二、浮水印該寫什麼：三個要素</h2>
            <p>
              很多人加了浮水印卻沒有效果，原因是內容太空泛。
              「機密」「Confidential」「Draft」這種單一詞彙，
              對限制用途幾乎沒有幫助——它沒有指出這份文件屬於誰、給誰、什麼時候。
              有效的浮水印要有三個要素：
            </p>
            <ul>
              <li>
                <strong>用途</strong>——「僅供評估報價使用」「僅供投標審查使用」
                「僅供簽約對保使用」。寫得越具體，被挪用時越站得住腳。
              </li>
              <li>
                <strong>對象</strong>——收件方的公司全名或個人姓名。
                有對象，這份檔案出現在第三方手上才構成明確的異常。
              </li>
              <li>
                <strong>日期或版本</strong>——交件當天的日期，草案再加版本號。
                日後爭議時，時間點往往就是關鍵。
              </li>
            </ul>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">文件類型</th>
                    <th className="text-left py-2 px-3 font-semibold">浮水印文字範本</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">報價單</td>
                    <td className="py-2 px-3">
                      機密｜僅供 OO 股份有限公司評估報價使用 2026/08/09
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">合約草案</td>
                    <td className="py-2 px-3">
                      草案 v3｜未經簽署｜僅供 OO 公司審閱 2026/08/09
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">商業提案</td>
                    <td className="py-2 px-3">
                      機密｜OO 案提案書｜僅供 OO 單位評選使用 2026/08/09
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">內部報告</td>
                    <td className="py-2 px-3">
                      公司機密｜限業務部王 OO 閱｜禁止轉寄 2026/08/09
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">證件掃描 PDF</td>
                    <td className="py-2 px-3">
                      僅供 OO 銀行辦理房貸對保使用 2026/08/09
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              版面上有兩個常見錯誤。
              第一是<strong>放在頁尾或角落</strong>——列印時裁掉、
              截圖時避開，浮水印就消失了。
              第二是<strong>透明度調太高</strong>，
              淡到幾乎看不見，等於沒加。
              正確做法是斜向、半透明、壓過正文區域，
              最好用重複鋪滿讓整頁都有，讓人無法只留下乾淨的段落。
            </p>

            <h2>三、線上 PDF 浮水印工具比較</h2>
            <p>
              市面上能加 PDF 浮水印的工具不少，
              但對「合約、報價單」這種文件來說，
              功能差異其實不是重點——
              <strong>檔案要不要離開你的電腦</strong>才是。
              以下四種是台灣使用者最常遇到的選擇：
            </p>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">工具</th>
                    <th className="text-left py-2 px-3 font-semibold">要不要上傳</th>
                    <th className="text-left py-2 px-3 font-semibold">免費額度</th>
                    <th className="text-left py-2 px-3 font-semibold">批次／多頁</th>
                    <th className="text-left py-2 px-3 font-semibold">客製化</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">Smallpdf</td>
                    <td className="py-2 px-3">要，上傳到雲端伺服器</td>
                    <td className="py-2 px-3">免費版有每日次數限制，進階功能需訂閱</td>
                    <td className="py-2 px-3">單檔多頁可，批次多檔屬付費方案</td>
                    <td className="py-2 px-3">文字／圖片、透明度、旋轉、位置</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">文電通 Right PDF</td>
                    <td className="py-2 px-3">桌面版不用（線上服務要）</td>
                    <td className="py-2 px-3">軟體需購買授權，有試用期</td>
                    <td className="py-2 px-3">支援批次與範本套用</td>
                    <td className="py-2 px-3">完整，可存成浮水印範本重複使用</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">DeftPDF</td>
                    <td className="py-2 px-3">要，上傳到雲端伺服器</td>
                    <td className="py-2 px-3">線上版免費，有檔案大小與次數限制</td>
                    <td className="py-2 px-3">批次需改用桌面版</td>
                    <td className="py-2 px-3">文字／圖片、透明度、位置、旋轉</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">ImageMarker</td>
                    <td className="py-2 px-3">
                      <strong>不用，100% 瀏覽器本機</strong>
                    </td>
                    <td className="py-2 px-3">完全免費、免註冊、無次數限制</td>
                    <td className="py-2 px-3">自動套用到 PDF 每一頁</td>
                    <td className="py-2 px-3">
                      文字＋Logo 可同時，顏色／透明度／字級／9 種位置＋重複鋪滿
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">
              各家的免費額度與方案內容會隨時間調整，
              上表為撰稿當下的公開資訊，實際條件請以各官網為準。
            </p>

            <p>
              把這張表濃縮成一句話：
              <strong>
                功能大家都有，差別在你願不願意把合約傳上去，
                以及願意付多少錢。
              </strong>
            </p>
            <ul>
              <li>
                <strong>Smallpdf</strong> 介面成熟、功能齊全，
                但免費版有每日次數限制，且屬於典型的雲端處理架構——
                檔案先上傳、處理完再下載。
                對公開文件很方便，對合約則要自己衡量。
              </li>
              <li>
                <strong>文電通 Right PDF</strong> 是台灣本地的老牌 PDF 軟體，
                桌面版在自己電腦上運作，隱私上沒有上傳問題，
                批次與範本功能也最完整。
                代價是要買授權、要安裝，
                臨時要幫一份報價單加浮水印時反應速度不夠快。
              </li>
              <li>
                <strong>DeftPDF</strong> 功能項目多、線上版免費門檻低，
                但同樣是伺服器端處理，
                而且批次處理要另外裝桌面版。
              </li>
              <li>
                <strong>ImageMarker</strong> 走的是另一條路：
                功能不追求最多，但
                <strong>PDF 完全不離開瀏覽器</strong>，
                免費、免註冊、免安裝，打開網頁就能用，
                中文浮水印不會亂碼，浮水印自動套用到每一頁。
              </li>
            </ul>

            <InlineCTA tool="pdf-watermark" position="mid_article" location={SLUG} />

            <h2>四、ImageMarker 加 PDF 浮水印：3 步驟</h2>
            <p>
              <Link href="/pdf-watermark">ImageMarker 的 PDF 浮水印工具</Link>
              用 pdf-lib 在瀏覽器裡直接改寫 PDF，
              全程沒有伺服器參與。實際操作只有三步：
            </p>
            <ol>
              <li>
                <strong>選擇 PDF</strong>——
                打開 <Link href="/pdf-watermark">PDF 浮水印工具</Link>，
                把檔案拖進上傳區或點擊選擇。
                檔案只會載入到你的瀏覽器記憶體，
                因為不需要傳輸，所以也沒有檔案大小上限——
                能處理多大取決於你電腦的記憶體。
              </li>
              <li>
                <strong>輸入文字、調整版面</strong>——
                在文字欄填入用途、對象與日期，
                例如「機密｜僅供 OO 公司評估報價使用 2026/08/09」。
                接著調整顏色（預設紅色最醒目）、透明度與字級，
                位置建議直接選<strong>「重複鋪滿」</strong>，
                浮水印會交錯平鋪整頁，無法靠裁切去掉。
                需要企業識別的話，可以同時上傳公司 Logo 當圖片浮水印，
                文字和 Logo 的透明度、大小、位置各自獨立設定。
                右側預覽會即時反映調整結果。
              </li>
              <li>
                <strong>套用並下載</strong>——
                按下套用，浮水印會寫進 PDF 的每一頁，
                不需要一頁一頁處理。
                原本的文字圖層保持不變，內文仍然可以選取和搜尋。
                下載後檔名會自動加上 <code>-watermarked</code>，
                用這個版本寄出去就對了。
              </li>
            </ol>
            <p>
              兩個常被問到的細節：
              <strong>中文不會亂碼</strong>——
              工具是先用瀏覽器的 canvas 把文字繪製成圖再嵌進 PDF，
              繞過了 PDF 標準字型只支援西文的限制；
              <strong>斷網也能用</strong>——
              網頁載入完成後把 Wi-Fi 關掉，加浮水印的功能完全正常，
              這也是驗證「真的沒上傳」最直接的方法。
            </p>
            <p>
              如果你要處理的不是 PDF 而是圖片（手機翻拍的證件、掃描的截圖），
              用<Link href="/">圖片浮水印工具</Link>；
              一次好幾張則用
              <Link href="/batch">批次浮水印</Link>，
              做法可以參考
              <Link href="/blog/batch-watermark-guide">批次浮水印完整教學</Link>
              。
            </p>

            <h2>五、為什麼不該把機密 PDF 上傳到雲端</h2>
            <p>
              這一段是整篇最重要的部分。
            </p>
            <p>
              個資與機密保護工具有一個其他工具沒有的特性：
              <strong>你拿去處理的檔案，本身就是最敏感的那一份。</strong>
              你打開 PDF 浮水印工具，是因為這份合約不能亂流；
              但如果這個工具是伺服器端處理，
              那麼在浮水印加上去之前，
              一份<strong>還沒有任何標示、完全乾淨的原始合約</strong>，
              已經先完整上傳到一個你不認識的第三方主機了。
            </p>
            <p>
              前門鎖好了，後門大開。這就是
              <Link href="/blog/privacy-protection-toolkit">
                個資安全工具箱
              </Link>
              裡講的隱私悖論，而 PDF 是它最嚴重的版本——
              因為 PDF 通常是<strong>整份文件</strong>：
              不是一張照片，而是二十頁的合約、完整的成本結構、
              整份客戶名單。單一檔案的資訊密度高出一個量級。
            </p>
            <p>
              而且風險是不對稱的。
              壓縮工具用錯了，最多是圖片糊掉；
              PDF 浮水印工具用錯了，外流的是你的報價策略或客戶資料。
              更現實的是責任問題：
              如果你是受雇於公司的員工，
              把客戶合約上傳到未經公司核准的境外服務，
              這件事本身在多數公司的資安規範裡就已經是違規，
              和文件最後有沒有外洩無關。
            </p>
            <p>
              還有一層常被忽略的角度：
              <strong>營業秘密法要求持有人採取「合理保密措施」</strong>
              才能主張保護。
              把機密文件隨手上傳到來路不明的免費雲端服務，
              在爭訟時很難說是合理的保密措施；
              相對地，「文件標示機密與用途、處理過程不外傳第三方」
              則是很容易說明的做法。
            </p>
            <p>
              判斷一個工具到底有沒有上傳，方法很簡單——
              <strong>斷網測試</strong>：
              打開網頁、等它完全載入，然後關掉 Wi-Fi 或開飛航模式，
              再處理一次檔案。
              功能完全正常，代表運算都在你的瀏覽器裡用 JavaScript 完成；
              如果卡住、跳錯誤、或出現上傳進度條，那就是伺服器端處理。
            </p>
            <p>
              次要指標也值得看：有沒有強制註冊（要你的 email 做什麼？）、
              免費版會不會在輸出上打自己的廣告浮水印、
              隱私政策寫的是「檔案不會離開瀏覽器」還是
              「我們會在 1 小時內刪除」——
              後者的意思是檔案確實上傳了。
              各家圖片與文件工具的隱私差異，整理在
              <Link href="/blog/tinypng-iloveimg-squoosh-alternatives">
                TinyPNG、iLoveIMG、Squoosh 替代方案比較
              </Link>
              。
            </p>

            <h2>六、進階：PDF 的三道防線</h2>
            <p>
              浮水印處理的是「這份文件之後會被拿去做什麼」，
              但一份 PDF 交出去，其實有三個不同方向的外洩管道，
              浮水印只擋住其中一個。
              完整的架構在
              <Link href="/blog/privacy-protection-toolkit">
                個資安全工具箱：浮水印 + 馬賽克 + EXIF 清除
              </Link>
              ，這裡講 PDF 版本怎麼對應。
            </p>

            <h3>第一道／浮水印 — 管用途</h3>
            <p>
              就是這篇在做的事：
              用<Link href="/pdf-watermark">PDF 浮水印工具</Link>
              在每一頁壓上用途、對象與日期，
              讓文件和特定情境綁定，被轉用時看得出來。
            </p>

            <h3>第二道／馬賽克 — 管畫面</h3>
            <p>
              對方業務上用不到的欄位，本來就不該給。
              合約裡的其他客戶名稱、報告附件裡的個人聯絡資料、
              證件掃描檔上的父母姓名與役別，都可以先遮掉。
            </p>
            <p>
              這裡有一個實務上很重要的技術陷阱：
              <strong>在 PDF 上疊一個黑色色塊，不等於遮住了。</strong>
              PDF 是有圖層概念的格式，
              用某些編輯器加上去的色塊可以被直接刪除，
              底下的文字會完整露出來——
              這種事故在新聞界和法院文書上出現過不只一次，
              而且往往是把「已遮蔽」的檔案公開之後才被發現。
            </p>
            <p>
              安全的做法是回到來源：
              先在圖片階段用
              <Link href="/mosaic">馬賽克遮蔽工具</Link>
              把敏感區塊的<strong>像素真正打散</strong>，
              輸出成扁平的 JPG／PNG，再組成 PDF。
              遮蔽範圍記得比敏感區塊大一圈，
              避免邊緣還留著可辨識的字元。
            </p>

            <h3>第三道／EXIF 清除 — 管檔案內層</h3>
            <p>
              PDF 的隱藏資訊常被完全忽略。
              兩個來源：一是 PDF 本身的文件屬性
              （作者、建立軟體、建立與修改時間，有時還有原始檔案路徑，
              路徑裡可能就有你的電腦使用者名稱或公司內部目錄結構）；
              二是<strong>內頁圖片保留的原始 EXIF</strong>——
              如果這份 PDF 是把手機翻拍的證件照組合起來的，
              那些照片的 GPS 座標很可能原封不動跟著進了 PDF，
              也就是你翻拍時所在的位置。
            </p>
            <p>
              解法是在組成 PDF <strong>之前</strong>先處理來源圖片：
              用<Link href="/exif-clean">EXIF 清除器</Link>
              把每張照片的 metadata 清乾淨，再轉成 PDF。
              順序不能顛倒，因為 PDF 組成之後，
              內嵌圖片的 metadata 就不容易單獨處理了。
              完整做法看
              <Link href="/blog/remove-exif-online">
                EXIF 刪除線上工具怎麼用？照片 GPS 移除完整教學
              </Link>
              ，想先搞懂原理則看
              <Link href="/blog/what-is-exif-data">EXIF 是什麼、藏了哪些個資</Link>
              。
            </p>
            <p>
              所以一份「手機翻拍證件 → PDF → 寄給銀行」的完整流程，
              正確順序是：
              <strong>清 EXIF → 馬賽克遮蔽 → 組成 PDF → 加 PDF 浮水印</strong>。
              三道防線各擋一個方向，缺哪一道，那個方向就是空的。
            </p>

            <InlineCTA tool="exif-clean" position="mid_article" location={SLUG} />

            <h2>七、常見問題 FAQ</h2>

            <p>
              <strong>Q: 線上加 PDF 浮水印安全嗎？合約會不會外流？</strong>
              <br />
              A: 取決於工具在哪裡處理。Smallpdf、DeftPDF 這類服務是伺服器端處理，
              合約要先完整上傳；檔案留存多久、誰看得到，只能相信對方的政策。
              <Link href="/pdf-watermark">ImageMarker 的 PDF 浮水印工具</Link>
              以 pdf-lib 在你的瀏覽器裡運算，PDF 不會離開電腦，
              網頁載入後斷網也能正常使用。
            </p>

            <p>
              <strong>Q: PDF 浮水印可以打中文嗎？會不會變亂碼？</strong>
              <br />
              A: 可以，不會亂碼。很多 PDF 函式庫只內建西文標準字型，
              直接寫中文會變空白或問號。
              這個工具是先用瀏覽器 canvas 把文字繪製成圖再嵌進 PDF，
              所以中文、日文都能正常輸出。
            </p>

            <p>
              <strong>Q: 浮水印會套用到 PDF 的每一頁嗎？</strong>
              <br />
              A: 會，自動套用到所有頁面，不用一頁一頁處理。
              三十頁的合約和一頁的報價單，操作步驟完全一樣。
            </p>

            <p>
              <strong>Q: 加了浮水印的 PDF，對方還能複製文字嗎？</strong>
              <br />
              A: 可以。浮水印是疊加的視覺標示，不會改變原有的文字圖層，
              內文仍可選取、搜尋、複製。
              浮水印的目的是宣告用途與對象，不是讓文件無法使用；
              要禁止複製與列印，那要用 PDF 權限密碼或企業 DRM。
            </p>

            <p>
              <strong>Q: PDF 浮水印會不會被對方移除？</strong>
              <br />
              A: 沒有絕對無法移除的浮水印，重點是提高成本。
              用「重複鋪滿」讓浮水印交錯平鋪、壓過正文，就不可能靠裁切去掉；
              寫上具體對象與日期，移除行為本身也會變成明確的惡意事證。
            </p>

            <p>
              <strong>Q: 報價單和合約的浮水印該寫什麼？</strong>
              <br />
              A: 用途＋對象＋日期或版本。
              建議格式是「機密｜僅供 OO 股份有限公司評估報價使用 2026/08/09」。
              每一家收件方用不同文字，日後外流可以直接反推來源。
            </p>

            <p>
              <strong>Q: 有免費額度限制嗎？一天只能加幾份？</strong>
              <br />
              A: 沒有次數限制，也不用註冊或安裝。
              雲端服務會限制免費額度，是因為伺服器運算與頻寬要成本；
              本機處理沒有這個問題，能處理多大的 PDF 只取決於你電腦的記憶體。
            </p>

            <h2>結語：寄出去之前的那 30 秒</h2>
            <p>
              商業文件外流，很少是因為有人破解了什麼。
              更常見的版本是：一封轉寄、一次「順手給你參考」、
              一個離職員工帶走的資料夾。
              這些都不是技術問題，而是那份檔案上
              <strong>從來沒有寫過它只能用在哪裡</strong>。
            </p>
            <p>
              所以最有效的做法不是導入什麼系統，
              而是把它變成寄件前的反射動作：
            </p>
            <p>
              <strong>
                這份 PDF 會被轉寄嗎？會的話，先加上用途、對象和日期。
              </strong>
            </p>
            <p>
              三十秒的事，而且全程在你自己的瀏覽器裡完成，
              合約不會上傳到任何地方。
              換掉的是一份可以被無限轉寄、卻完全查不到來源的裸文件。
            </p>
            <p>
              立即免費為 PDF 加浮水印<ReadMoreArrow />{" "}
              <a
                href="https://imagemarker.app/pdf-watermark"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://imagemarker.app/pdf-watermark
              </a>
            </p>
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">
            <a
              href="https://ko-fi.com/justinlee2061"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              ☕ 如果這篇文章幫到你，請我喝杯咖啡
            </a>
          </p>
        </article>

        <PopularTools location={SLUG} className="mt-12" />

        {/* 相關文章 */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">相關文章</h2>
          <div className="space-y-4">
            <Link href="/blog/privacy-protection-toolkit">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  2026 個資安全工具箱：浮水印 + 馬賽克 + EXIF 清除
                </h3>
                <p className="text-sm text-muted-foreground">
                  三道防線各擋什麼、順序怎麼排，四種交件情境該做到哪幾道。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文
                  <ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/business-confidential-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  中小企業機密文件浮水印：不用買 DRM，免費幫公司文件加保護
                </h3>
                <p className="text-sm text-muted-foreground">
                  報價單、合約、設計稿外流怎麼辦？用免費工具做到機密標示與可追溯。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文
                  <ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/remove-exif-online">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  EXIF 刪除線上工具怎麼用？照片 GPS 移除完整教學
                </h3>
                <p className="text-sm text-muted-foreground">
                  組成 PDF 之前先清乾淨：5 種 EXIF 移除方法比較與 3 步驟教學。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文
                  <ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/watermark-templates-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分證影本簽註寫法＋加註位置：10 種情境範本與證件浮水印範例
                </h3>
                <p className="text-sm text-muted-foreground">
                  用途、對象、日期怎麼組合，10 種情境的浮水印文字範本直接套用。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文
                  <ReadMoreArrow />
                </span>
              </article>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
