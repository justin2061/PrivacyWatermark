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

const URL = "https://imagemarker.app/blog/privacy-protection-toolkit";
const SLUG = "privacy-protection-toolkit";
const TITLE =
  "2026 個資安全工具箱：浮水印 + 馬賽克 + EXIF 清除，三步保護你的證件照片";

export default function PrivacyProtectionToolkit() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "2026 個資保護工具箱：浮水印＋馬賽克＋EXIF 清除三道防線｜ImageMarker",
      description:
        "交出去的證件照片要防三件事：被挪用、被讀走欄位、被反查地點。這篇把個資保護工具整理成三道防線——浮水印標記用途、馬賽克遮蔽敏感欄位、EXIF 清除移除隱藏的 GPS 與裝置資訊，附租屋、求職、二手交易、旅行社四種情境的操作順序，全部免費且不上傳伺服器。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "個資安全不是一個工具就能解決的事。這篇以三道防線的架構整理消費者能用的個資保護工具：浮水印限制用途、馬賽克遮蔽敏感資訊、EXIF 清除移除隱藏中繼資料，並說明四種常見交件情境該用哪幾道、順序怎麼排。",
          url: URL,
          datePublished: "2026-08-09",
          dateModified: "2026-08-09",
        }),
        howToSchema({
          name: "證件照片交出去之前的三道防線",
          description:
            "用瀏覽器本機工具依序完成 EXIF 清除、馬賽克遮蔽與浮水印標記，讓一份證件影本只能用在一件事情上。",
          steps: [
            {
              name: "先清 EXIF，移除看不見的中繼資料",
              text: "把翻拍或掃描的證件照片放進 EXIF 清除器，檢查偵測到的 GPS 座標、拍攝時間與裝置序號，一鍵刪除整段 metadata。這一步要放在最前面，因為後面的編輯都會以清乾淨的檔案為基礎。",
            },
            {
              name: "再用馬賽克遮蔽不需要給的欄位",
              text: "用馬賽克工具把對方不需要的欄位塗掉，例如出生地、配偶欄、父母姓名、身分證背面的役別、護照號碼末幾碼。遮蔽時要確認是真的把像素打散，而不是疊一層可以被移除的色塊。",
            },
            {
              name: "最後加浮水印，寫清楚用途、對象與日期",
              text: "用浮水印工具在證件影本上斜壓半透明文字，寫明「僅供 OO 用途使用、對象、日期」，並讓文字壓過證件主體與照片區域。加完之後再輸出下載，這份檔案才適合交出去。",
            },
          ],
        }),
        faqSchema([
          {
            q: "個資保護工具有必要用三個嗎？只加浮水印不行嗎？",
            a: "浮水印、馬賽克、EXIF 清除擋的是三種完全不同的攻擊。浮水印限制的是「這份檔案被拿去做別的事」，但它蓋不住畫面上的身分證字號，也刪不掉檔案裡的 GPS；馬賽克能遮蔽敏感欄位，但沒有寫明用途，檔案照樣能被轉手；EXIF 清除移除的是看不見的中繼資料，對畫面上的資訊完全無效。缺哪一道，那個方向就是空的。實務上不必每次都做滿三道，但你要清楚自己這次交件缺的是哪一道。",
          },
          {
            q: "三道防線該用什麼順序做？",
            a: "建議是 EXIF 清除 → 馬賽克 → 浮水印。先清 EXIF 是因為後面的編輯都會產生新檔案，順序顛倒容易漏；馬賽克放中間，是因為要先確定哪些欄位不給，再決定浮水印壓在哪裡才不會蓋掉對方真正要看的資訊；浮水印放最後，確保它壓在最終畫面上、不會被後續編輯覆蓋。",
          },
          {
            q: "為什麼一定要用不上傳伺服器的工具？",
            a: "這是個資保護工具特有的隱私悖論：你為了保護證件才打開工具，但如果這個工具是把檔案上傳到它的伺服器處理，你等於在保護之前，先把「還沒加保護的原始證件」交給了一個陌生的第三方——而且那份檔案帶著完整的 GPS 與未遮蔽的身分證字號。純瀏覽器本機處理的工具沒有這個問題，因為檔案從頭到尾沒有離開你的裝置。驗證方法很簡單：網頁載入後把網路關掉，還能正常處理的就是真的在本機跑。",
          },
          {
            q: "怎麼判斷一個線上工具是不是真的不上傳？",
            a: "最直接的方法是斷網測試：打開網頁、等它載完，然後關掉 Wi-Fi 或開飛航模式，再選檔案處理一次。真正的本機工具在斷網狀態下功能完全正常。另外也可以看它有沒有強制註冊、有沒有處理進度條（伺服器端處理通常會有上傳進度）、以及隱私政策有沒有明確寫「檔案不會離開瀏覽器」。",
          },
          {
            q: "身分證影本要遮住哪些欄位才安全？",
            a: "原則是「對方業務上需要什麼，就只留什麼」。租屋核對身分通常只需要姓名與照片，出生地、父母姓名、配偶欄、役別、住址遷徙紀錄都可以遮。銀行、電信等有法遵要求的機構會需要完整資訊，這種情況就不要遮欄位，改成把浮水印寫得更明確（用途、對象、日期、案件編號），讓這份影本無法被挪用。",
          },
          {
            q: "手機拍的照片加了浮水印，EXIF 還在嗎？",
            a: "看工具怎麼輸出。如果工具是在瀏覽器裡把圖片重新繪製後輸出（例如 Canvas 重新編碼），原始的 EXIF 通常不會被帶進新檔案，等於加浮水印時順便清掉了。但這是副作用不是保證，要確定的話還是先跑一次 EXIF 清除器，看偵測面板確認欄位真的歸零，尤其是要交出去的重要檔案。",
          },
          {
            q: "PDF 檔案也需要做這三道嗎？",
            a: "需要，而且 PDF 的風險常被低估。掃描或轉檔產生的 PDF 一樣會帶作者、軟體、建立時間等文件屬性，內頁的圖片也可能保留原始 EXIF。合約、報價單、投標文件這類要外送的 PDF，建議用 PDF 浮水印工具加上「僅供 OO 用途」的標示，需要遮蔽的段落則先在來源圖片上做馬賽克再組成 PDF。",
          },
          {
            q: "這些工具免費嗎？有沒有張數或檔案大小限制？",
            a: "ImageMarker 的浮水印、馬賽克、EXIF 清除、批次處理都可以免費使用，免註冊、免安裝，手機和電腦瀏覽器都能開。因為是在你自己的裝置上運算，沒有伺服器頻寬成本，所以也沒有上傳額度的限制；實際能處理多大的檔案取決於你裝置的記憶體，一般手機處理單張證件照片完全沒有問題。",
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
            <h2>你以為加了浮水印就安全了，其實只擋掉三分之一</h2>
            <p>
              大部分人對「保護證件照片」的理解，停在一件事上：加浮水印。
              寫上「僅供租屋使用」，覺得任務完成，檔案就傳出去了。
            </p>
            <p>
              但那份檔案同時還帶著另外兩個東西。
              第一，畫面上完整的身分證字號、出生地、父母姓名、住址——
              浮水印是半透明的，這些欄位一個都沒被蓋掉，對方要抄下來毫無阻礙。
              第二，檔案角落一段看不見的 EXIF 中繼資料，
              裡面很可能寫著你翻拍這份影本時所在位置的 GPS 座標，
              精確到幾公尺，也就是你家。
            </p>
            <p>
              換句話說，你只做了一件事，卻以為擋住了三件事。
              這就是個資保護最常見的失誤——
              <strong>不是工具不好用，是只用了一種工具</strong>。
            </p>
            <p>
              問題在於，這三種風險的性質完全不同，
              沒有任何單一功能能同時處理：
              浮水印處理的是「這份檔案之後被拿去做什麼」，
              馬賽克處理的是「畫面上看得到什麼」，
              EXIF 清除處理的是「檔案裡藏了什麼」。
              一個管未來、一個管表面、一個管內層，
              彼此完全不重疊，也因此不能互相取代。
            </p>
            <p>
              這篇文章把消費者實際用得上的個資保護工具，
              整理成一套三道防線的架構：每一道擋什麼、什麼時候需要、怎麼操作，
              以及租屋、求職、二手交易、旅行社這四種最常交件的情境，
              分別該做到哪幾道。全部都是免費、不上傳伺服器的做法。
            </p>

            <h2>三道防線總覽：各自擋住什麼</h2>
            <p>
              先把架構攤開。你可以把一份要交出去的證件照片，
              想成有三個外洩管道，各由一道防線負責：
            </p>
            <ul>
              <li>
                <strong>第一道／浮水印 — 管「用途」</strong>
                ：在畫面上壓一段「僅供 OO 使用、日期、對象」的半透明文字，
                讓這份影本在視覺上和某個特定用途綁定。
                擋的是被轉手、被拿去辦門號、被挪作其他申請。
              </li>
              <li>
                <strong>第二道／馬賽克 — 管「畫面」</strong>
                ：把對方業務上不需要的欄位打散遮蔽，
                例如出生地、配偶欄、父母姓名、證件背面的役別。
                擋的是「給得太多」——對方根本不需要，卻順手收走的那些資料。
              </li>
              <li>
                <strong>第三道／EXIF 清除 — 管「檔案內層」</strong>
                ：移除照片檔裡的 GPS 座標、拍攝時間、裝置型號與序號。
                擋的是被反查拍攝地點、被串連出你的行動軌跡與裝置身分。
              </li>
            </ul>
            <p>
              三道防線的重點不是「每次都要做滿」，
              而是<strong>你要知道自己這次缺的是哪一道</strong>。
              只加浮水印卻沒清 EXIF，等於門鎖好了但把地址寫在門墊下；
              只清 EXIF 卻不加浮水印，檔案照樣能被轉手到下一個人手上。
            </p>

            <h2>第一道防線：浮水印——讓盜用者無法直接使用</h2>

            <h3>什麼時候用</h3>
            <p>
              只要這份檔案要離開你手上、交給一個「不是你完全信任」的對象，
              就該加。房東、房仲、旅行社、二手買家、求職應徵的公司、
              代辦、健身房、社團登記——這些場合的共通點是：
              你不知道這份影本之後會被存在哪裡、被誰看到、留多久。
            </p>
            <p>
              浮水印的作用不是讓檔案「無法被複製」——這在技術上做不到。
              它的作用是<strong>提高被挪用的成本、留下明確的用途聲明</strong>。
              一份斜壓著「僅供 2026/08/09 向 OO 房屋租賃使用」的身分證影本，
              拿去銀行開戶或辦門號會立刻被櫃檯攔下，
              真的出事時，這段文字也是你主張「我沒有同意這個用途」的具體證據。
              關於浮水印到底有沒有用、法律效力如何，可以參考
              <Link href="/blog/is-id-watermark-useful">
                證件浮水印真的有用嗎
              </Link>
              這篇的完整討論。
            </p>

            <h3>怎麼寫才有效</h3>
            <p>三個要素缺一不可：</p>
            <ul>
              <li>
                <strong>用途</strong>——「僅供租屋簽約使用」「僅供投遞履歷使用」，
                寫得越具體越好，不要只寫「僅供本人使用」這種空話。
              </li>
              <li>
                <strong>對象</strong>——寫出收件方的名字，
                「僅供 OO 房屋租賃股份有限公司」。
                有對象才能證明這份影本流到別處是違反約定的。
              </li>
              <li>
                <strong>日期</strong>——標上交件當天日期，
                日後出現一份三年前日期的影本被拿去申辦，責任歸屬很清楚。
              </li>
            </ul>
            <p>
              版面上有兩個常見錯誤：
              <strong>文字太邊緣</strong>（貼在角落，裁掉就沒了）、
              <strong>透明度太高</strong>（幾乎看不見，等於沒加）。
              正確做法是斜向壓過證件主體與人像區域，
              透明度大約設在能看清底下欄位、但文字明顯到無法忽略的程度。
              更多寫法範例整理在
              <Link href="/blog/watermark-templates-guide">
                浮水印範本與寫法大全
              </Link>
              。
            </p>

            <h3>ImageMarker 操作</h3>
            <ol>
              <li>
                打開<Link href="/">浮水印工具</Link>，
                把證件照片拖進來或點擊選擇檔案。
              </li>
              <li>
                在文字欄輸入用途、對象與日期，
                調整字級、角度與透明度，讓文字斜壓過證件中央。
              </li>
              <li>按下載取得加好浮水印的版本，用這個檔案交件。</li>
            </ol>
            <p>
              如果要處理的是好幾張（例如身分證正反面加健保卡加存摺封面），
              用<Link href="/batch">批次浮水印工具</Link>
              一次套用同一組文字比較快，
              而且它在瀏覽器裡重新輸出圖片，原始 EXIF 不會被帶進新檔案。
              PDF 格式的合約、報價單則用
              <Link href="/pdf-watermark">PDF 浮水印工具</Link>
              ，做法一樣。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>第二道防線：馬賽克——遮蔽你根本不需要給的欄位</h2>

            <h3>什麼時候用</h3>
            <p>
              當對方要求的證件上，有<strong>他業務上根本用不到的資訊</strong>時。
              這種情況比想像中多：
            </p>
            <ul>
              <li>
                房東要核對你是不是本人，需要的是姓名和照片，
                但身分證背面的父母姓名、配偶欄、住址遷徙紀錄，跟租屋完全無關。
              </li>
              <li>
                二手交易面交要確認身分，看到姓名就夠了，
                身分證字號給出去只會多一個風險。
              </li>
              <li>
                投履歷附的畢業證書或成績單，
                公司要的是學歷，不是你的學號和出生年月日。
              </li>
              <li>
                在網路上分享截圖時，畫面裡的訂單編號、手機號碼、
                email、地址、對話中的第三人姓名，都該遮。
              </li>
            </ul>
            <p>
              判斷標準只有一句話：
              <strong>對方的業務需要這個欄位嗎？不需要就遮掉。</strong>
              個資保護法本來就是這個精神——蒐集必須有特定目的、
              而且不得逾越必要範圍。你遮掉不相關的欄位，不是刁難，是合理行使權利。
            </p>
            <p>
              但要注意例外：銀行、電信、保險等有法遵與洗錢防制要求的機構，
              確實需要完整證件資訊，這種情況不要遮欄位，
              改成把浮水印寫得更明確就好。
            </p>

            <h3>怎麼遮才不會被還原</h3>
            <p>
              遮蔽有一個常見的技術陷阱：
              <strong>用軟體疊一個色塊上去，不等於遮住了</strong>。
              如果檔案格式保留了圖層（例如某些 PDF、簡報檔、設計檔），
              對方把那一層刪掉，底下的資訊就完整露出來——
              這種事在新聞界和法院文書上出過不只一次事故。
            </p>
            <p>
              安全的做法是使用<strong>真正把像素打散或重新編碼</strong>
              的馬賽克／模糊，並且輸出成扁平的圖片格式（JPG／PNG）。
              另外兩個細節：遮蔽範圍要比敏感區塊大一圈，
              避免邊緣還留著可辨識的字元；
              馬賽克格子不要太細，太細的格子在高解析度下有機會被推測還原。
            </p>

            <h3>ImageMarker 操作</h3>
            <ol>
              <li>
                打開<Link href="/mosaic">馬賽克遮蔽工具</Link>，載入證件照片。
              </li>
              <li>
                在要遮蔽的欄位上拖曳框選，調整馬賽克強度，
                確認框選範圍完整蓋住整個欄位、包含邊緣。
              </li>
              <li>
                檢查一遍有沒有漏掉的區塊（背面的欄位很容易忘），
                然後下載遮蔽後的圖片。
              </li>
            </ol>
            <p>
              和第一道防線一樣，這個工具也是純瀏覽器本機處理，
              證件不會上傳到任何伺服器。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>第三道防線：EXIF 清除——刪掉那份看不見的附件</h2>

            <h3>什麼時候用</h3>
            <p>
              只要是<strong>用手機或相機拍出來的檔案</strong>，就該清。
              包括翻拍的證件影本、二手商品照、租屋看房照、
              寵物照、小孩照、傳給網友的日常照。
              掃描器產生的檔案通常不含 GPS，但仍會寫入裝置型號與軟體版本。
            </p>
            <p>
              EXIF 是相機在按下快門當下自動寫進檔案的中繼資料，
              裡面最關鍵的三項是<strong>GPS 經緯度、拍攝時間、機身序號</strong>：
              前兩者合起來是一份行動紀錄，第三項能把你不同帳號發的照片串成同一台裝置。
              它不會顯示在畫面上，也不會有任何提示，
              就一直躺在檔案裡跟著照片跑，直到有人主動刪掉。
            </p>
            <p>
              最容易出事的情境是「在家翻拍證件」：
              你為了交租屋資料，在客廳把身分證拍下來，
              這個檔案就同時帶著你的身分證字號和你家的座標。
              對方連查都不用查，兩份資料一起收到。
            </p>

            <h3>怎麼確認自己有沒有中招</h3>
            <p>
              iPhone 在照片 App 點下方的「i」，出現地圖就代表含 GPS；
              Android 看 Google 相簿的「詳細資料」；
              Windows 是右鍵→內容→詳細資料，往下捲到 GPS 欄位；
              Mac 用預覽程式的「工具→顯示檢閱器→GPS」。
              最快的方式是直接把照片丟進
              <Link href="/exif-clean">EXIF 清除器</Link>，
              它會列出這張照片實際存了哪些欄位，敏感項目標紅。
            </p>
            <p>
              想完整了解 EXIF 存了什麼、五種移除方法怎麼比較，
              可以讀這篇專門的教學：
              <Link href="/blog/remove-exif-online">
                EXIF 刪除線上工具怎麼用？照片 GPS 移除完整教學
              </Link>
              ；如果想先搞懂原理，
              <Link href="/blog/what-is-exif-data">EXIF 是什麼、藏了哪些個資</Link>
              講得更基礎。
            </p>

            <h3>ImageMarker 操作</h3>
            <ol>
              <li>
                打開<Link href="/exif-clean">EXIF 清除器</Link>，選擇照片。
              </li>
              <li>
                看一眼偵測面板：它會列出實際存在的 metadata 欄位，
                GPS、拍攝時間、序號等高風險項目標紅並顯示總數。
                這一步不要跳過，你才會知道原本要送出去的是什麼。
              </li>
              <li>
                按「清除 metadata」再下載。JPEG 是直接移除 metadata 區段、
                不重新編碼，所以畫質完全不變，檔案還會小一點。
              </li>
            </ol>

            <InlineCTA tool="exif-clean" position="mid_article" location={SLUG} />

            <h2>四種情境：實際上該做到哪幾道</h2>
            <p>
              知道三道防線之後，真正實用的問題是：
              我這次交件到底要做幾道、順序怎麼排。以下是四種最常見的情況。
            </p>

            <h3>情境一：租屋交件（三道全做）</h3>
            <p>
              租屋是風險最高的情境，因為你面對的是個人房東或代管，
              沒有企業級的個資保管制度，而且要交的往往是身分證正反面。
              建議順序：
            </p>
            <ol>
              <li>
                <strong>EXIF 清除</strong>——你八成是在家翻拍的，這一步先做。
              </li>
              <li>
                <strong>馬賽克</strong>——遮掉背面的父母姓名、配偶欄、
                住址遷徙紀錄，房東核對身分用不到。
              </li>
              <li>
                <strong>浮水印</strong>——寫「僅供 OO 租屋簽約使用 2026/08/09」。
              </li>
            </ol>
            <p>
              交件前的完整檢查清單與寫法範例，可以看
              <Link href="/blog/rent-id-watermark">租屋身分證影本加浮水印教學</Link>
              ；房東到底能不能要影本、你可以拒絕什麼，
              <Link href="/blog/landlord-asks-for-id">房東要身分證影本怎麼辦</Link>
              有更完整的說明。租屋詐騙的實際手法則在
              <Link href="/blog/rent-scam-id-fraud">租屋詐騙與證件盜用</Link>。
            </p>

            <h3>情境二：求職投履歷（EXIF ＋ 浮水印）</h3>
            <p>
              投履歷附證件影本要特別小心，因為求職是
              <strong>「一份檔案投給很多家公司」</strong>的情境，
              流出去的份數是所有情境裡最多的，
              而且面試沒上的公司會怎麼處理你的資料，你完全無從得知。
            </p>
            <p>
              原則上，<strong>面試階段不該提供身分證影本</strong>，
              正常流程是錄取報到後才需要。
              如果對方在面試前就索取，這件事本身就值得警覺。
              真的要給，做兩道：先清 EXIF，再加寫明公司名稱的浮水印，
              而且每一家公司都用不同的浮水印文字，
              日後外洩才追得出來源。細節可以參考
              <Link href="/blog/job-interview-id-copy-safety">
                面試被要求提供身分證影本怎麼辦
              </Link>
              。
            </p>

            <h3>情境三：二手交易（EXIF ＋ 馬賽克）</h3>
            <p>
              二手交易有兩件事要處理，而且都跟浮水印無關。
            </p>
            <p>
              第一是<strong>商品照的 EXIF</strong>：
              你在家拍要賣的東西，照片帶著住家座標貼上公開社團，
              等於每個看過貼文的人都知道你家在哪，
              約在超商面交的意義就消失了。
            </p>
            <p>
              第二是<strong>畫面裡的資訊</strong>：
              商品照的背景常常拍到家裡的擺設、窗外的地標、
              甚至桌上的信件與快遞單。
              轉帳截圖、對話截圖裡的帳號、手機號碼、真實姓名，
              也都要用馬賽克遮掉再貼出去。
            </p>
            <p>
              至於身分證——二手交易不需要交身分證影本，
              對方以「確認身分」為由索取時要直接拒絕。
              如果真的是高價品需要驗證，遮到只剩姓名再加浮水印，三道一起做。
            </p>

            <h3>情境四：旅行社與飯店交件（EXIF ＋ 浮水印）</h3>
            <p>
              辦簽證、訂機票、飯店 check-in 都會要護照影本，
              這是少數<strong>不能遮蔽欄位</strong>的情境——
              旅行社需要完整的護照號碼、英文姓名、效期來訂票，
              遮掉就辦不了事。
            </p>
            <p>
              所以這裡只做兩道：清 EXIF，加上寫明
              「僅供 OO 旅行社辦理 2026/09 日本簽證使用」的浮水印。
              護照的風險在於它是國際通用的身分證明，
              外洩後被盜用的範圍比身分證更廣，浮水印要寫得比平常更具體。
              完整做法在
              <Link href="/blog/passport-travel-agency-watermark">
                護照影本交旅行社前的浮水印教學
              </Link>
              與
              <Link href="/blog/passport-watermark-guide">護照浮水印完整指南</Link>
              。
            </p>

            <h2>為什麼一定要用「不上傳」的工具：個資保護的隱私悖論</h2>
            <p>
              這是整篇文章最重要的一段。
            </p>
            <p>
              個資保護工具有一個其他工具沒有的特殊性質：
              <strong>你拿去處理的檔案，本身就是最敏感的那份</strong>。
              你打開一個線上工具，是為了保護你的身分證；
              但如果這個工具是把檔案上傳到它的伺服器處理，
              那你在保護之前，已經先把
              <strong>一份還沒加浮水印、還沒遮欄位、還帶著完整 GPS 的原始證件</strong>
              ，交給了一個你不認識的第三方。
            </p>
            <p>
              前門鎖好了，後門大開。這就是個資保護的隱私悖論。
            </p>
            <p>
              而且這個風險是不對稱的：
              你把壓縮工具用錯了，最多是圖片糊掉；
              你把個資保護工具用錯了，外洩的是身分證字號加住家座標。
              一般圖片工具的隱私差異可以接受，個資工具不行。
            </p>
            <p>
              判斷方法比想像中簡單——<strong>斷網測試</strong>。
              打開網頁、等它完全載入，然後關掉 Wi-Fi 或開飛航模式，
              再選一個檔案處理一次。
              如果功能完全正常，代表所有運算都在你的瀏覽器裡用 JavaScript 完成，
              檔案沒有離開你的裝置；
              如果它卡住、跳錯誤、或出現上傳進度條，那就是伺服器端處理。
            </p>
            <p>
              次要但值得看的指標：有沒有強制註冊（要你的 email 做什麼？）、
              免費版會不會在輸出上打自己的廣告浮水印、
              隱私政策有沒有明確寫「檔案不會離開瀏覽器」而不是含糊的
              「我們會在 24 小時內刪除」——
              後者的意思是檔案確實上傳了。
              各家圖片工具的隱私比較整理在
              <Link href="/blog/tinypng-iloveimg-squoosh-alternatives">
                TinyPNG、iLoveIMG、Squoosh 替代方案比較
              </Link>
              。
            </p>

            <h2>為什麼值得用一站整合的工具箱</h2>
            <p>
              三道防線如果要用三個不同網站完成，實際操作起來會變成這樣：
              在 A 網站清 EXIF、下載；把檔案傳到 B 網站做馬賽克、再下載；
              把檔案傳到 C 網站加浮水印、又下載。
            </p>
            <p>
              問題有三個。
              第一，<strong>你要分別驗證三個網站的隱私政策</strong>，
              只要其中一個是伺服器端處理，整條鏈就破了，
              而且破在你最不會注意的中間那一段。
              第二，<strong>中間檔案散落在下載資料夾</strong>，
              那份「已經清了 EXIF 但還沒遮欄位」的半成品，
              和你辛苦保護的最終版一起躺在同一個資料夾裡，
              下次挑檔案傳給人時，很容易挑錯。
              第三，步驟一多就會偷懶，偷懶就會漏做——
              而漏掉的通常是最看不見、也最容易被忽略的 EXIF。
            </p>
            <p>
              <Link href="/">ImageMarker</Link>
              把這幾件事放在同一個網站、同一套隱私模型下：
              <Link href="/">浮水印</Link>、
              <Link href="/mosaic">馬賽克</Link>、
              <Link href="/exif-clean">EXIF 清除</Link>、
              <Link href="/batch">批次處理</Link>、
              <Link href="/pdf-watermark">PDF 浮水印</Link>
              全部是純瀏覽器本機運算，免費、免註冊、免安裝，
              手機和電腦都能開。你只要驗證一次「這個網站不上傳」，
              三道防線就都在同一個信任基礎上。
            </p>
            <p>
              如果你想從最常見的證件保護開始，
              <Link href="/blog/id-watermark-complete-guide">
                身分證浮水印完整指南
              </Link>
              是最好的起點；
              想先了解不做會有什麼後果，
              <Link href="/blog/id-copy-leaked-consequences">
                身分證影本外洩後會發生什麼事
              </Link>
              把實際的詐騙手法寫得很清楚。
            </p>

            <InlineCTA tool="batch" position="mid_article" location={SLUG} />

            <h2>常見問題 FAQ</h2>

            <p>
              <strong>Q: 個資保護工具有必要用三個嗎？只加浮水印不行嗎？</strong>
              <br />
              A: 三道防線擋的是三種不同的攻擊。浮水印擋不住畫面上的身分證字號，
              也刪不掉檔案裡的 GPS；馬賽克遮得住欄位，但沒寫用途，檔案照樣能被轉手；
              EXIF 清除對畫面上的資訊完全無效。缺哪一道，那個方向就是空的。
              不必每次都做滿三道，但要清楚自己這次缺的是哪一道。
            </p>

            <p>
              <strong>Q: 三道防線該用什麼順序做？</strong>
              <br />
              A: EXIF 清除 → 馬賽克 → 浮水印。
              先清 EXIF 是因為後面的編輯都會產生新檔案，順序顛倒容易漏；
              馬賽克放中間，先確定哪些欄位不給，才知道浮水印壓在哪不會蓋掉對方要看的資訊；
              浮水印最後，確保它壓在最終畫面上不被覆蓋。
            </p>

            <p>
              <strong>Q: 為什麼一定要用不上傳伺服器的工具？</strong>
              <br />
              A: 因為你拿去處理的就是最敏感的那份檔案。
              上傳到伺服器處理，等於在加保護之前，
              先把還帶著完整 GPS 和未遮蔽身分證字號的原始檔交給第三方。
              純瀏覽器本機工具沒有這個問題，檔案從頭到尾沒離開你的裝置。
            </p>

            <p>
              <strong>Q: 怎麼判斷一個線上工具是不是真的不上傳？</strong>
              <br />
              A: 斷網測試。打開網頁、等它載完，關掉 Wi-Fi 或開飛航模式，
              再處理一次檔案。真正的本機工具在斷網狀態下功能完全正常。
              另外看有沒有強制註冊、有沒有上傳進度條、
              隱私政策是寫「不會離開瀏覽器」還是「24 小時內刪除」——後者代表確實上傳了。
            </p>

            <p>
              <strong>Q: 身分證影本要遮住哪些欄位才安全？</strong>
              <br />
              A: 原則是「對方業務上需要什麼，就只留什麼」。
              租屋核對身分通常只需要姓名與照片，出生地、父母姓名、配偶欄、
              役別、住址遷徙紀錄都可以遮。
              銀行、電信等有法遵要求的機構需要完整資訊，
              這種情況不要遮欄位，改成把浮水印寫得更明確（用途、對象、日期、案件編號）。
            </p>

            <p>
              <strong>Q: 手機拍的照片加了浮水印，EXIF 還在嗎？</strong>
              <br />
              A: 看工具怎麼輸出。在瀏覽器裡重新繪製後輸出的工具，
              原始 EXIF 通常不會被帶進新檔案。
              但這是副作用不是保證，重要檔案還是先跑一次
              <Link href="/exif-clean">EXIF 清除器</Link>
              ，看偵測面板確認欄位歸零比較保險。
            </p>

            <p>
              <strong>Q: PDF 檔案也需要做這三道嗎？</strong>
              <br />
              A: 需要，而且 PDF 的風險常被低估。
              掃描或轉檔產生的 PDF 一樣會帶作者、軟體、建立時間等文件屬性，
              內頁圖片也可能保留原始 EXIF。
              合約、報價單、投標文件建議用
              <Link href="/pdf-watermark">PDF 浮水印工具</Link>
              加上用途標示，需要遮蔽的段落先在來源圖片上做馬賽克再組成 PDF。
            </p>

            <p>
              <strong>Q: 這些工具免費嗎？有沒有張數或檔案大小限制？</strong>
              <br />
              A: 浮水印、馬賽克、EXIF 清除、批次處理都可以免費使用，
              免註冊、免安裝，手機和電腦瀏覽器都能開。
              因為是在你自己的裝置上運算，沒有伺服器頻寬成本，也就沒有上傳額度限制；
              能處理多大的檔案取決於你裝置的記憶體，
              一般手機處理單張證件照片完全沒問題。
            </p>

            <h2>結語：把三道防線變成一個 30 秒的習慣</h2>
            <p>
              個資外洩很少是因為有人被駭。
              更常見的版本是：你自己在某個星期三的下午，
              為了趕快把租屋資料交出去，直接把相簿裡的原始照片傳了出去。
              沒有惡意、沒有攻擊、沒有漏洞——就只是少做了幾個步驟。
            </p>
            <p>
              所以最有效的做法不是記住一堆技術細節，
              而是把它壓縮成一個交件前的反射動作：
            </p>
            <p>
              <strong>
                這份檔案要交給我不完全信任的人嗎？
                要的話，先清 EXIF、遮掉他用不到的欄位、寫上用途和日期。
              </strong>
            </p>
            <p>
              三個動作，加起來不到一分鐘，
              而且全程在你自己的瀏覽器裡完成，什麼都不會上傳。
              換掉的是一份可以被轉手、被反查地點、被抄走整排欄位的裸檔案。
            </p>
            <p>
              立即免費使用個資保護工具箱<ReadMoreArrow />{" "}
              <a
                href="https://imagemarker.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://imagemarker.app
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
            <Link href="/blog/remove-exif-online">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  EXIF 刪除線上工具怎麼用？照片 GPS 移除完整教學
                </h3>
                <p className="text-sm text-muted-foreground">
                  第三道防線的完整版：30 秒確認照片有沒有 GPS，5 種移除方法比較。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文
                  <ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/id-watermark-complete-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分證影本浮水印完整指南：怎麼加、怎麼寫、有沒有法律效力
                </h3>
                <p className="text-sm text-muted-foreground">
                  第一道防線的完整版：浮水印的寫法、版面與實務效力一次講清楚。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文
                  <ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/id-copy-leaked-consequences">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  2026 台灣詐騙手法大公開：身分證影本外洩後會發生什麼事？
                </h3>
                <p className="text-sm text-muted-foreground">
                  不做這三道防線的後果：盜辦門號、申貸、開人頭帳戶的實際手法。
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
