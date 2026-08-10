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

const URL = "https://imagemarker.app/blog/mosaic-photo-online";
const SLUG = "mosaic-photo-online";
const TITLE =
  "線上馬賽克怎麼打？照片遮蔽完整教學：臉部、車牌、身分證字號、門牌";
const OG = "https://imagemarker.app/og/zh/mosaic-photo-online.png";

export default function MosaicPhotoOnline() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "線上馬賽克工具：圖片打馬賽克教學，臉部、車牌、證件號碼一次遮｜ImageMarker",
      description:
        "要把照片裡的臉、車牌、身分證字號或門牌遮掉，卻不想把原圖上傳到別人的伺服器？這篇整理四種該打馬賽克的資訊、三種常見情境，比較 Redacted 與各家線上模糊工具的上傳風險，示範 3 步驟在瀏覽器本機打馬賽克，並說明為什麼截圖裁切、疊色塊可能被還原。",
      canonical: URL,
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "照片打馬賽克的完整教學：哪些資訊該遮、二手交易與社群發文的實際情境、線上馬賽克工具的上傳風險比較、3 步驟本機遮蔽操作，以及裁切與疊色塊為什麼不等於遮蔽。",
          url: URL,
          datePublished: "2026-08-10",
          dateModified: "2026-08-10",
        }),
        howToSchema({
          name: "線上為照片打馬賽克的 3 步驟",
          description:
            "用瀏覽器本機處理的免費線上馬賽克工具，把照片裡的臉部、車牌、身分證字號或門牌遮蔽起來，全程不上傳伺服器。",
          steps: [
            {
              name: "開啟馬賽克工具並載入照片",
              text: "用電腦或手機瀏覽器開啟 ImageMarker 的馬賽克遮蔽工具，把照片拖進上傳區或點擊選擇檔案，支援 JPG、PNG、WebP、BMP、GIF。圖片只會載入到你自己的瀏覽器記憶體，不會傳送到任何伺服器。",
            },
            {
              name: "選擇遮蔽方式並拖曳框選要遮的區域",
              text: "先選遮蔽方式：馬賽克（像素化）、高斯模糊或純色色塊，並用滑桿調整強度。接著直接在圖片上按住拖曳，框出要遮蔽的區域，可以框選多個區域，每一個都會列在右側清單裡，隨時可以個別刪除或復原上一步。手機用手指拖曳操作方式相同。",
            },
            {
              name: "檢查一遍後下載",
              text: "下載前把整張圖從上到下看過一遍，確認沒有漏掉的敏感區塊，尤其是背景裡的門牌、車牌、螢幕反光與證件背面欄位。確認後按下載，工具會輸出一張已經把像素真正改寫過的扁平圖片，遮蔽層無法被刪除還原。",
            },
          ],
        }),
        faqSchema([
          {
            q: "線上打馬賽克安全嗎？照片會不會被上傳？",
            a: "要看工具在哪裡處理。多數線上模糊、馬賽克服務都是伺服器端運算：你的原圖必須先完整上傳到對方主機，遮蔽完再下載回來——也就是說，那張還沒遮蔽、身分證字號和臉都清清楚楚的原始檔，已經先交到第三方手上了。ImageMarker 的馬賽克工具用 Canvas API 在你自己的瀏覽器裡運算，圖片從頭到尾沒有離開你的裝置。驗證方法很簡單：把網頁載入完成後關掉 Wi-Fi，功能照樣正常運作。",
          },
          {
            q: "馬賽克可以被還原嗎？打多細才安全？",
            a: "有機會，尤其是內容格式固定的資訊。像車牌、身分證字號、電話號碼這類字元集有限、排列規則明確的內容，如果馬賽克格子太細，等於保留了每個小區塊的平均色，研究上已有工具能靠反覆比對推測出原始字串。實務上的原則有三個：格子調大一點，讓每個方塊涵蓋的範圍遠大於單一字元；遮蔽範圍要比敏感區塊大一圈，避免邊緣殘留可辨識的字形；絕對不能外洩的資訊（身分證字號、金融帳號）直接用純色色塊，那是唯一完全不保留原始資訊的方式。",
          },
          {
            q: "把截圖裁切掉敏感部分，是不是就等於遮蔽了？",
            a: "不等於，而且有兩個陷阱。第一，裁切只能處理邊緣，畫面正中央的欄位裁不掉。第二，有些系統的裁切功能不會真的把被裁掉的資料丟棄：2023 年 Google Pixel 的截圖標示工具與 Windows 11 剪取工具都曾被發現同一類問題——裁切後覆寫原檔時沒有把檔案截短，殘留的舊資料讓被裁掉的部分可以被部分還原，各自都以資安漏洞的形式修補。安全的做法是不要依賴裁切，直接在敏感區塊上做真正改寫像素的遮蔽，並輸出成扁平的 JPG／PNG。",
          },
          {
            q: "在圖片上疊一個黑色方塊，算不算遮住了？",
            a: "在扁平圖片（JPG、PNG）上直接畫上不透明色塊並輸出，底下的像素確實被改寫掉了，是安全的。危險的是保留圖層的格式：PDF、簡報檔、設計原始檔裡加上去的色塊只是一個獨立物件，對方把那一層刪掉，底下的內容就完整露出來——新聞界和法院文書都出過這類事故，而且往往是檔案公開之後才被發現。要遮就在圖片階段遮，並確認輸出的是扁平圖片格式。",
          },
          {
            q: "手機可以打馬賽克嗎？需要下載 App 嗎？",
            a: "不用。ImageMarker 的馬賽克工具支援手機瀏覽器的觸控操作，用手指在照片上拖曳就能框選遮蔽區域，和電腦版一樣是本機處理。手機內建的相片編輯（iOS 的標示、Google 相簿的編輯）也能塗抹遮蔽，缺點是筆刷式塗抹不容易蓋乾淨、也不好控制強度，處理證件號碼這類資訊時比較容易留下邊角。",
          },
          {
            q: "打完馬賽克之後還需要做什麼嗎？",
            a: "看你要交出去做什麼。馬賽克管的是「畫面上看得到什麼」，但它不會限制這張圖被拿去做別的事，也刪不掉檔案裡看不見的 GPS 座標與拍攝時間。要限制用途就再加浮水印，寫上用途、對象與日期；要避免被反查拍攝地點就再清一次 EXIF。三件事各擋一個方向，完整順序與判斷方式整理在個資安全工具箱那篇。",
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
            <time dateTime="2026-08-10" className="text-sm text-muted-foreground">
              2026-08-10
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">{TITLE}</h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <h2>你以為你只是拍了一張桌子</h2>
            <p>
              你要在二手社團賣一台螢幕。
              擺在書桌上拍了一張，光線不錯，直接貼文。
            </p>
            <p>
              照片裡除了螢幕，還有：
              桌角那張還沒收起來的信封，上面印著你的姓名和地址；
              螢幕反射出的窗外，看得到對面大樓的招牌；
              右下角露出半截的健保卡；
              以及你完全沒注意到、但拍得清清楚楚的鑰匙上那串門牌號碼。
            </p>
            <p>
              沒有人是故意的。
              問題在於<strong>拍照的時候你在看主角，別人看照片的時候在看背景</strong>。
              而背景裡的那些東西，一旦被貼到公開社團，
              就等於連同你的住處、作息和證件一起送了出去。
            </p>
            <p>
              馬賽克處理的就是這件事：
              在照片離開你的手機之前，
              把畫面上那些對方根本不需要看到的資訊塗掉。
            </p>
            <p>
              而實務上會遇到第二層問題：
              搜尋「線上馬賽克」找到的工具，
              大多要你先把<strong>還沒遮蔽的原圖整張上傳</strong>到對方的伺服器。
              為了遮住身分證字號，先把身分證字號交給陌生人——
              這個矛盾，是這篇文章的重點之一。
            </p>

            <h2>一、什麼時候該打馬賽克：四種資訊</h2>
            <p>
              判斷標準只有一句話：
              <strong>看到這張照片的人，需要這個資訊才能完成他要做的事嗎？</strong>
              不需要，就遮掉。以下四類是實務上最常出事的。
            </p>

            <h3>1. 身分證字號與各種證號</h3>
            <p>
              身分證字號、護照號碼、駕照號碼、健保卡號、銀行帳號、信用卡號。
              這類號碼的特性是<strong>幾乎不會更換</strong>，
              一旦外流就是永久性的，而且它們是冒名申辦的關鍵拼圖——
              有了姓名加證號，再配上一張證件照，
              很多線上服務的身分驗證就已經過得去了。
            </p>
            <p>
              最常見的外流方式不是被駭，而是自己交出去的：
              交租屋資料、辦門號、投履歷、賣二手商品時「證明我是本人」。
              對方要核對的多半只是姓名和照片，
              證號給出去只是多一個風險。
              這類欄位建議直接用<strong>純色色塊</strong>，不要用馬賽克，理由後面會說。
            </p>

            <h3>2. 車牌</h3>
            <p>
              車牌是少數<strong>可以直接對應到一個真人</strong>的公開識別碼。
              賣車、賣車用品、分享行車紀錄器畫面、貼停車糾紛照片、
              甚至只是拍風景不小心帶到，都可能把自己或別人的車牌送出去。
            </p>
            <p>
              車牌特別需要注意遮蔽強度。
              它的字元組合有規則、字數固定、字型也固定，
              是最容易被反推的一類資訊——
              馬賽克格子調得太細，等於保留了每個字元的輪廓資訊。
            </p>

            <h3>3. 臉部</h3>
            <p>
              你自己的臉可以自己決定，
              但<strong>照片裡的其他人沒有同意過</strong>。
              小孩的同學、路人、餐廳鄰桌、活動現場的參加者，
              把他們的臉貼到公開網路上是另一回事。
            </p>
            <p>
              未成年人尤其要注意。
              把孩子的臉、學校制服、書包上的名牌一起貼出去，
              等於把一個沒有能力保護自己的人的完整識別資訊公開。
              臉部通常用<strong>高斯模糊</strong>就足夠，
              視覺上比方塊自然，也保留了畫面的完整感。
            </p>

            <h3>4. 門牌、地址與位置線索</h3>
            <p>
              門牌號碼、社區名稱、招牌、路標、快遞單、
              信封上的收件地址、學校制服、附近的地標建築。
              這些單獨看都不算什麼，
              但<strong>拼起來就能定位到一個很小的範圍</strong>。
            </p>
            <p>
              最容易漏掉的是<strong>包裹上的物流單</strong>：
              上面同時有姓名、電話、完整地址和訂單編號，
              而開箱文是最常見的社群內容之一。
              另外要提醒的是，位置線索不只出現在畫面上——
              照片檔案裡的 GPS 座標是另一條完全獨立的管道，
              遮了畫面不代表清了檔案，這點第五段會談。
            </p>

            <h2>二、三種最常見的情境</h2>

            <h3>情境一：二手交易拍照</h3>
            <p>
              二手交易的照片有兩個階段的風險。
              第一階段是<strong>商品照本身</strong>——
              背景裡的地址、門牌、家中格局、其他物品，
              以及最容易忽略的：螢幕或玻璃表面的反射。
            </p>
            <p>
              第二階段是<strong>面交前的身分驗證</strong>。
              有些買賣家會要求先看證件確認不是詐騙，
              這時候要遮的是身分證字號、出生年月日、地址與發證日期，
              留下姓名和照片就足以完成核對。
              遮完之後最好再加一層浮水印寫上用途，
              寫法可以直接套用
              <Link href="/blog/watermark-templates-guide">
                浮水印範本與寫法大全
              </Link>
              裡的句型。
            </p>

            <h3>情境二：社群發文與截圖分享</h3>
            <p>
              分享對話截圖是最容易連累別人的行為。
              截圖裡的頭像、暱稱、真實姓名、電話號碼、
              群組名稱、對話中提到的第三人姓名，
              全部都是別人的個資，而不是你的。
            </p>
            <p>
              訂單截圖、發票、電子票券也一樣：
              訂單編號、末五碼、取貨門市、QR Code
              都可能被拿去查詢或冒用。
              QR Code 特別危險，因為它看起來只是一個圖案，
              但實際上可能直接編碼了票券序號或個人連結——
              有疑慮就整個遮掉。
            </p>

            <h3>情境三：交件前遮敏感欄位</h3>
            <p>
              租屋、求職、辦貸款、送件申請，
              對方要的是「證明某件事」，不是「你的所有資料」。
              身分證背面的父母姓名、配偶欄、役別、住址遷徙紀錄，
              對房東核對身分完全沒有用；
              畢業證書上的學號與出生年月日，公司要的也不是那個。
            </p>
            <p>
              這不是刁難。
              個資保護法本來就要求蒐集必須有特定目的、
              而且不得逾越必要範圍——
              你遮掉不相關的欄位，是合理行使權利。
            </p>
            <p>
              但要記得例外：
              銀行、電信、保險這類有法遵與洗錢防制義務的機構，
              確實需要完整證件資訊。
              這種時候不要遮欄位，
              改成把浮水印的用途與對象寫得更明確就好，
              詳細做法在
              <Link href="/blog/id-watermark-complete-guide">
                證件影本加浮水印教學
              </Link>
              。
            </p>

            <h2>三、線上馬賽克工具比較</h2>
            <p>
              能把照片局部遮起來的工具很多，
              但對「證件、車牌、小孩的臉」這種照片來說，
              功能多寡不是重點——
              <strong>那張還沒遮的原圖有沒有離開你的裝置</strong>才是。
            </p>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">工具</th>
                    <th className="text-left py-2 px-3 font-semibold">要不要上傳</th>
                    <th className="text-left py-2 px-3 font-semibold">平台</th>
                    <th className="text-left py-2 px-3 font-semibold">費用</th>
                    <th className="text-left py-2 px-3 font-semibold">遮蔽方式</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">Redacted</td>
                    <td className="py-2 px-3">不用，本機處理</td>
                    <td className="py-2 px-3">macOS／iOS 原生 App，需安裝</td>
                    <td className="py-2 px-3">付費軟體</td>
                    <td className="py-2 px-3">像素化、模糊、色塊，介面為英文</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">雲端線上模糊服務</td>
                    <td className="py-2 px-3">
                      <strong>要，原圖上傳到伺服器</strong>
                    </td>
                    <td className="py-2 px-3">網頁，免安裝</td>
                    <td className="py-2 px-3">多半免費，有次數或檔案大小限制</td>
                    <td className="py-2 px-3">模糊、像素化，部分有自動偵測人臉</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">手機內建編輯</td>
                    <td className="py-2 px-3">不用，本機處理</td>
                    <td className="py-2 px-3">iOS 標示／Google 相簿</td>
                    <td className="py-2 px-3">免費，系統內建</td>
                    <td className="py-2 px-3">筆刷塗抹為主，強度與範圍不好控制</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">Photoshop／小畫家</td>
                    <td className="py-2 px-3">不用，本機處理</td>
                    <td className="py-2 px-3">桌面軟體，需安裝</td>
                    <td className="py-2 px-3">Photoshop 需訂閱；小畫家免費</td>
                    <td className="py-2 px-3">功能最完整，但操作步驟多</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">ImageMarker</td>
                    <td className="py-2 px-3">
                      <strong>不用，100% 瀏覽器本機</strong>
                    </td>
                    <td className="py-2 px-3">網頁，手機電腦都可，免安裝</td>
                    <td className="py-2 px-3">完全免費、免註冊、無次數限制</td>
                    <td className="py-2 px-3">
                      馬賽克／高斯模糊／純色色塊三選一，強度可調，可多區域
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">
              各家的方案內容與免費額度會隨時間調整，
              上表為撰稿當下的公開資訊，實際條件請以各官網為準。
            </p>

            <p>把這張表濃縮成幾句話：</p>
            <ul>
              <li>
                <strong>Redacted</strong> 是這個題目上最直接的對標產品，
                隱私立場一致——本機處理、不上傳。
                差別在它是 macOS／iOS 的原生 App：
                要安裝、要付費、只在 Apple 生態系裡，
                而且介面是英文的。
                臨時在 Windows 電腦或 Android 手機上要遮一張圖，它幫不上忙。
              </li>
              <li>
                <strong>雲端線上模糊服務</strong>免安裝、打開就能用，
                有些還有自動偵測人臉的功能，
                但它們是伺服器端處理：
                <strong>那張還沒遮蔽的原圖必須先整張上傳</strong>。
                拿來處理風景照沒問題，拿來處理證件則要自己衡量。
              </li>
              <li>
                <strong>手機內建編輯</strong>最方便、也確實是本機處理，
                問題出在精度：
                筆刷塗抹很難完整蓋住一整欄文字，
                邊角常常留下半個字，
                而且多數內建工具沒有可調的馬賽克強度。
              </li>
              <li>
                <strong>Photoshop</strong> 功能最強，但為了遮一張二手商品照
                開一個訂閱軟體，多數人不會做；
                小畫家則缺乏真正的像素化功能，
                只能手動畫色塊。
              </li>
              <li>
                <strong>ImageMarker</strong> 走的是中間路線：
                和 Redacted 一樣<strong>圖片完全不離開瀏覽器</strong>，
                但免安裝、免付費、免註冊，
                手機和電腦打開網頁就能用，介面是中文的，
                而且遮完之後可以直接接著加浮水印、清 EXIF，
                不用換三個網站。
              </li>
            </ul>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>四、ImageMarker 馬賽克操作：3 步驟</h2>
            <p>
              <Link href="/mosaic">ImageMarker 的馬賽克遮蔽工具</Link>
              用 Canvas API 在瀏覽器裡直接改寫像素，全程沒有伺服器參與。
              實際操作只有三步：
            </p>
            <ol>
              <li>
                <strong>載入照片</strong>——
                打開<Link href="/mosaic">馬賽克遮蔽工具</Link>，
                把圖片拖進上傳區或點擊選擇，
                支援 JPG、PNG、WebP、BMP、GIF。
                檔案只會載入到你的瀏覽器記憶體，
                因為不需要傳輸，所以也沒有檔案大小上限。
              </li>
              <li>
                <strong>選遮蔽方式，拖曳框選</strong>——
                先在右側選<strong>馬賽克（像素化）</strong>、
                <strong>高斯模糊</strong>或<strong>純色色塊</strong>，
                並用滑桿調整強度（馬賽克可調方塊大小 4–60px，
                模糊可調半徑 2–40px，色塊可自訂顏色）。
                然後直接在圖片上按住拖曳，框出要遮的區域。
                可以框選多個區域，
                每一個都會列在「已遮蔽區域」清單裡，
                可以個別刪除，也可以按「復原上一步」。
                不同區域還能用不同的遮蔽方式——
                臉用模糊、證號用色塊，同一張圖裡混著用沒問題。
                手機上用手指拖曳，操作完全一樣。
              </li>
              <li>
                <strong>檢查一遍再下載</strong>——
                下載前把整張圖從上到下看一次，
                特別檢查背景、反射面、邊角與證件背面欄位。
                確認後按下載，
                輸出的是一張已經<strong>真正改寫過像素的扁平圖片</strong>
                （JPG 輸入輸出 JPG，其餘輸出 PNG），
                遮蔽不是獨立圖層，不可能被刪掉還原。
              </li>
            </ol>
            <p>
              三種遮蔽方式怎麼選，有一個簡單的原則：
            </p>
            <ul>
              <li>
                <strong>純色色塊</strong>——絕對不能外洩的資訊。
                身分證字號、金融帳號、卡號、密碼。
                它是唯一完全不保留原始資訊的方式，沒有任何還原空間。
              </li>
              <li>
                <strong>馬賽克</strong>——需要遮蔽但希望畫面自然的內容。
                車牌、門牌、路標。記得把方塊調大。
              </li>
              <li>
                <strong>高斯模糊</strong>——臉部與背景。
                視覺上最柔和，適合不想讓照片看起來被大量塗改的場合；
                但強度要拉夠，太淡的模糊仍可辨識。
              </li>
            </ul>
            <p>
              和其他工具一樣，這個工具也可以做<strong>斷網測試</strong>：
              把網頁載入完成後關掉 Wi-Fi 或開飛航模式，再遮一張圖。
              功能完全正常，就代表運算真的都在你的瀏覽器裡。
            </p>

            <h2>五、遮完畫面還不夠：三道防線</h2>
            <p>
              馬賽克很有效，但它只擋住一個方向。
              一張照片交出去，其實有三條不同的外洩管道，
              完整架構在
              <Link href="/blog/privacy-protection-toolkit">
                個資安全工具箱：浮水印 + 馬賽克 + EXIF 清除
              </Link>
              ，這裡講三者怎麼配合。
            </p>

            <h3>馬賽克管「畫面」</h3>
            <p>
              就是這篇在做的事：
              把畫面上對方不需要看到的資訊真正塗掉。
              但它不會限制這張圖之後被拿去做什麼——
              一張遮好的身分證影本，
              照樣可以被轉手、被存起來、被拿去辦別的事。
            </p>

            <h3>浮水印管「用途」</h3>
            <p>
              浮水印在圖上壓出<strong>用途、對象與日期</strong>，
              例如「僅供 OO 房屋租賃對保使用 2026/08/10」，
              讓這份檔案和一個特定情境綁在一起。
              被挪作他用時，一眼就看得出來不對。
            </p>
            <p>
              用<Link href="/">圖片浮水印工具</Link>加，
              建議選重複鋪滿模式壓過整張圖，避免被裁切去掉。
              PDF 格式的合約、報價單則用
              <Link href="/pdf-watermark">PDF 浮水印工具</Link>，
              做法整理在
              <Link href="/blog/pdf-watermark-online">
                PDF 浮水印怎麼加？合約、報價單線上免費加浮水印
              </Link>
              。
            </p>

            <h3>EXIF 清除管「檔案內層」</h3>
            <p>
              這是最容易被忽略的一道，
              因為它<strong>完全看不見</strong>。
              手機拍照時會把 GPS 經緯度、拍攝時間、機身型號與序號
              寫進檔案的 EXIF 區段，
              它不會顯示在畫面上，也不會有任何提示，
              就一直跟著檔案跑。
            </p>
            <p>
              關鍵是：<strong>打馬賽克不會清掉 EXIF</strong>。
              你把身分證字號遮得完美無缺，
              但那張照片是在家裡客廳翻拍的，
              GPS 座標仍然原封不動指著你家。
              對方連查都不用查，兩份資料一起收到。
            </p>
            <p>
              解法是用<Link href="/exif-clean">EXIF 清除器</Link>
              把 metadata 清乾淨，
              完整教學看
              <Link href="/blog/remove-exif-online">
                EXIF 刪除線上工具怎麼用？照片 GPS 移除完整教學
              </Link>
              ，想先搞懂 EXIF 到底存了哪些東西則看
              <Link href="/blog/what-is-exif-data">
                EXIF 是什麼、藏了哪些個資
              </Link>
              。
            </p>

            <h3>順序怎麼排</h3>
            <p>
              建議是
              <strong>EXIF 清除 → 馬賽克 → 浮水印</strong>。
            </p>
            <ul>
              <li>
                先清 EXIF，是因為後面每一步編輯都會產生新檔案，
                順序顛倒容易忘記回頭處理原始檔。
              </li>
              <li>
                馬賽克放中間，
                是因為要先確定哪些欄位不給，
                才知道浮水印壓在哪裡不會蓋掉對方真正要看的資訊。
              </li>
              <li>
                浮水印放最後，
                確保它壓在最終畫面上，不會被後續編輯覆蓋掉。
              </li>
            </ul>
            <p>
              不必每次都做滿三道。
              賣二手商品貼照片，通常清 EXIF ＋ 馬賽克就夠；
              交證件影本給房東，三道都要；
              寄一份純文字的報價單 PDF，只需要浮水印。
              重點是你要清楚<strong>這次交件缺的是哪一道</strong>。
            </p>
            <p>
              這三個工具都在同一個站上，
              而且都是純瀏覽器本機處理，
              不用在 A 網站清 EXIF、下載、再傳到 B 網站遮馬賽克——
              那個過程本身就是三次上傳。
            </p>

            <InlineCTA tool="exif-clean" position="mid_article" location={SLUG} />

            <h2>六、為什麼不該用截圖裁切代替馬賽克</h2>
            <p>
              最常見的替代做法是：
              「我把有敏感資訊的部分裁掉就好了啊。」
              這個方法有兩個問題，第二個特別容易被低估。
            </p>

            <h3>問題一：裁切只能處理邊緣</h3>
            <p>
              敏感資訊很少剛好都在照片邊邊。
              身分證字號在證件正中央，
              對話截圖裡的電話號碼夾在訊息之間，
              商品照背景的門牌在畫面正後方。
              為了裁掉它們，你得把整張照片砍到剩下不能用。
            </p>

            <h3>問題二：被裁掉的資料不一定真的消失了</h3>
            <p>
              這是關鍵。
              一般人的直覺是「裁掉＝資料不見了」，
              但實際上要看軟體怎麼寫檔。
            </p>
            <p>
              2023 年有兩起被廣泛報導的案例：
              Google Pixel 的截圖標示工具、
              以及 Windows 11 的剪取工具，
              先後被發現在裁切後<strong>覆寫原檔時沒有把檔案截短</strong>——
              新的（比較小的）圖片資料寫進去之後，
              原檔尾端還留著舊資料，
              而這些殘留內容足以把被裁掉的部分還原出相當程度的畫面。
              兩者後來都以資安漏洞的形式修補，
              但在修補之前分享出去的那些截圖，已經收不回來了。
            </p>
            <p>
              這件事真正的教訓不是「這兩個工具很爛」，
              而是：
              <strong>
                你無法從畫面上判斷一個編輯操作到底改了什麼、留下了什麼。
              </strong>
              可靠的做法是不要依賴「移除」，
              而是依賴「改寫」——
              在敏感區塊上直接把像素換掉，再輸出成新檔案。
            </p>

            <h3>問題三：疊色塊不等於遮蔽（在有圖層的格式裡）</h3>
            <p>
              另一個常見錯誤是在 PDF、簡報檔或設計原始檔上
              疊一個黑色方塊。
              這些格式是有圖層概念的，
              那個方塊只是一個獨立物件，
              對方把它刪掉，底下的文字就完整露出來——
              新聞界與法院文書都出過這類事故，
              而且往往是「已遮蔽」的檔案公開之後才被發現。
            </p>
            <p>
              相對地，在扁平圖片（JPG／PNG）上畫上不透明色塊並輸出，
              底下的像素是真的被改寫掉了，這是安全的。
              差別在於<strong>輸出格式有沒有保留圖層</strong>。
              所以要遮就在圖片階段遮，並確認輸出是扁平圖片；
              如果最終要交的是 PDF，
              正確順序是先在來源圖片上遮好，再組成 PDF。
            </p>

            <h3>問題四：馬賽克打太細，也可能被推回去</h3>
            <p>
              最後一個技術細節。
              馬賽克的原理是把區域縮小取樣再放大，
              每個方塊保留的是該範圍的<strong>平均色</strong>。
              如果格子很細，保留下來的資訊就很多。
            </p>
            <p>
              對<strong>格式固定的內容</strong>——
              車牌、身分證字號、電話號碼——
              這件事特別危險：
              字元集有限、字型固定、位數固定，
              等於攻擊者可以把所有可能的字串用同樣方式渲染、
              打上同樣強度的馬賽克，再比對哪一個最接近。
              學術與開源社群已有針對像素化文字做這類還原的工具，
              對細格子的效果相當好。
            </p>
            <p>三個實務原則：</p>
            <ul>
              <li>
                <strong>格子調大</strong>：讓單一方塊涵蓋的範圍
                明顯大於一個字元，看不出字形輪廓才算夠。
              </li>
              <li>
                <strong>範圍放大一圈</strong>：遮蔽框要比敏感區塊大，
                避免邊緣殘留半個可辨識的字。
              </li>
              <li>
                <strong>最敏感的用純色</strong>：
                身分證字號、帳號、卡號直接用色塊，
                不留任何還原空間。
              </li>
            </ul>

            <h2>七、常見問題 FAQ</h2>

            <p>
              <strong>Q: 線上打馬賽克安全嗎？照片會不會被上傳？</strong>
              <br />
              A: 看工具在哪裡處理。多數線上模糊服務是伺服器端運算，
              那張還沒遮蔽的原圖必須先完整上傳。
              <Link href="/mosaic">ImageMarker 的馬賽克工具</Link>
              用 Canvas API 在你的瀏覽器裡運算，圖片不會離開裝置，
              網頁載入後斷網也能正常使用。
            </p>

            <p>
              <strong>Q: 馬賽克可以被還原嗎？打多細才安全？</strong>
              <br />
              A: 有機會，尤其是車牌、證號這種格式固定的內容。
              原則是格子調大、範圍放大一圈，
              絕對不能外洩的資訊直接用純色色塊——
              那是唯一完全不保留原始資訊的方式。
            </p>

            <p>
              <strong>Q: 把截圖裁切掉敏感部分，是不是就等於遮蔽了？</strong>
              <br />
              A: 不等於。裁切只能處理邊緣，
              而且 2023 年 Google Pixel 標示工具與 Windows 11 剪取工具
              都曾被發現裁切後的殘留資料可以被部分還原。
              安全做法是直接在敏感區塊上改寫像素，並輸出扁平圖片。
            </p>

            <p>
              <strong>Q: 在圖片上疊一個黑色方塊，算不算遮住了？</strong>
              <br />
              A: 在 JPG／PNG 上畫上不透明色塊並輸出是安全的，像素真的被改寫了。
              但在 PDF、簡報檔、設計原始檔這類保留圖層的格式裡疊色塊不安全，
              那一層可以被刪掉。
            </p>

            <p>
              <strong>Q: 手機可以打馬賽克嗎？需要下載 App 嗎？</strong>
              <br />
              A: 不用。工具支援手機瀏覽器觸控操作，
              用手指拖曳就能框選遮蔽區域，一樣是本機處理。
              手機內建的編輯功能也能塗抹，
              但筆刷式操作不容易蓋乾淨、強度也不好控制。
            </p>

            <p>
              <strong>Q: 打完馬賽克之後還需要做什麼嗎？</strong>
              <br />
              A: 看用途。馬賽克管畫面，
              但不限制這張圖被拿去做別的事，也刪不掉檔案裡的 GPS。
              要限制用途就加<Link href="/">浮水印</Link>，
              要避免被反查地點就用
              <Link href="/exif-clean">EXIF 清除器</Link>，
              完整判斷方式在
              <Link href="/blog/privacy-protection-toolkit">個資安全工具箱</Link>
              。
            </p>

            <h2>結語：貼出去之前的那 10 秒</h2>
            <p>
              照片外洩很少是因為有人破解了什麼。
              更常見的版本是：
              一張沒注意到背景的商品照、
              一份順手轉貼的對話截圖、
              一張為了證明身分而傳出去的證件翻拍。
            </p>
            <p>
              這些都不是技術問題，
              而是<strong>按下發送前沒有多看一眼</strong>。
            </p>
            <p>
              所以最有效的做法不是學會什麼工具，
              而是把它變成一個反射動作：
            </p>
            <p>
              <strong>
                這張圖裡，有沒有對方根本不需要看到的東西？有的話，先遮掉。
              </strong>
            </p>
            <p>
              十秒鐘的事，而且全程在你自己的瀏覽器裡完成，
              那張還沒遮蔽的原圖不會上傳到任何地方。
            </p>
            <p>
              立即免費為照片打馬賽克<ReadMoreArrow />{" "}
              <a
                href="https://imagemarker.app/mosaic"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://imagemarker.app/mosaic
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
            <Link href="/blog/remove-exif-online">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  EXIF 刪除線上工具怎麼用？照片 GPS 移除完整教學
                </h3>
                <p className="text-sm text-muted-foreground">
                  遮了畫面不代表清了檔案：5 種 EXIF 移除方法比較與 3 步驟教學。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文
                  <ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/pdf-watermark-online">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  PDF 浮水印怎麼加？合約、報價單線上免費加浮水印
                </h3>
                <p className="text-sm text-muted-foreground">
                  要交的是 PDF 而不是圖片時：機密文件不上傳也能加浮水印。
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
                  證件影本加浮水印教學：3 步驟完成，手機電腦都適用
                </h3>
                <p className="text-sm text-muted-foreground">
                  遮完欄位之後，接著把用途、對象與日期壓上去。
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
