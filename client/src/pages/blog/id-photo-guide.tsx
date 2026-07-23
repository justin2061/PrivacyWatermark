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

const URL = "https://imagemarker.app/blog/id-photo-guide";
const SLUG = "id-photo-guide";
const TITLE =
  "2026 證件照完全攻略：手機自拍、線上裁切、超商列印一次搞定";

export default function IdPhotoGuide() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: `${TITLE}｜ImageMarker`,
      description:
        "不用花 400 元去相館！教你用手機拍出合格證件照，線上免費裁切成身分證、護照、健保卡尺寸，再到超商印出來。附 2026 最新規定與尺寸對照表。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "手機自拍證件照、線上免費裁切、超商列印的完整攻略：附 2026 台灣證件照尺寸與規定對照表、5 步驟拍攝教學，以及交影本前的浮水印保護做法。",
          url: URL,
          datePublished: "2026-07-23",
          dateModified: "2026-07-23",
        }),
        howToSchema({
          name: "手機自拍證件照 5 步驟",
          description:
            "在家用手機拍出合格證件照的完整步驟：白牆背景、自然光、眼睛高度、自然表情、多拍幾張。",
          steps: [
            {
              name: "找一面白牆或掛白布",
              text: "背景要單一、乾淨、無雜物，最好是白色或淺色牆面。若找不到白牆，可掛一塊白布或白色床單當背景，並確保背景沒有陰影。",
            },
            {
              name: "使用自然光，避免閃光燈",
              text: "站在窗邊、面向窗戶讓光線均勻打在臉上，但避免陽光直射造成過曝。不要開閃光燈，以免臉部反光或背景出現硬陰影。",
            },
            {
              name: "手機架在眼睛高度，用計時器自拍",
              text: "把手機固定在與眼睛同高的位置，鏡頭距離臉部約 1 到 1.5 公尺，使用自拍計時器或請人幫忙按，避免手持晃動與伸手變形。",
            },
            {
              name: "表情自然、不露齒、直視鏡頭",
              text: "嘴巴閉起來、微微上揚即可，不要露齒大笑，雙眼平視鏡頭、五官對稱，瀏海不要遮到眉毛與眼睛。",
            },
            {
              name: "多拍幾張選最好的",
              text: "一次拍 5 到 10 張，再挑光線最均勻、表情最自然、沒有反光與歪頭的一張，接著用線上工具裁切成需要的證件尺寸。",
            },
          ],
        }),
        faqSchema([
          {
            q: "證件照可以戴眼鏡嗎？",
            a: "原則上可以，但鏡框不能遮住眼睛、鏡片不能反光，也不能是有色鏡片或墨鏡。護照與身分證的規定較嚴格，若鏡片容易反光，建議拍照時暫時拿下眼鏡最保險。",
          },
          {
            q: "證件照可以用手機拍嗎？",
            a: "可以。只要符合白色背景、正面免冠、光線均勻、六個月內、解析度清晰等規定，手機自拍再用線上工具裁切成標準尺寸，多數證件都能使用。護照這類最嚴格的證件送件前，建議先確認受理單位是否接受自拍照。",
          },
          {
            q: "證件照背景一定要白色嗎？",
            a: "台灣的身分證、護照、健保卡等主要證件都要求白色或淺色的單一背景。少數證件可接受淺藍或淺灰，但白色最保險、通用性最高，拍攝時盡量選乾淨的白牆。",
          },
          {
            q: "證件照多久要換一次？",
            a: "台灣多數證件要求照片為「最近六個月內」拍攝。換發身分證、辦護照時若外貌與舊照差異太大（例如變胖變瘦、大幅整形、性別變更）也應重拍，避免核對時被退件。",
          },
          {
            q: "超商印證件照品質夠嗎？",
            a: "夠用。超商多功能事務機的相片列印解析度足以應付一般證件申辦，選亮面相紙、原尺寸列印即可。若是拍攝進度講究的場合（如專業攝影集），才需要相館的高階輸出。",
          },
          {
            q: "線上裁切的照片安全嗎？",
            a: "要看工具怎麼處理。像 IDIFY、ImageMarker 這類在瀏覽器本機（離線）處理的工具，照片不會上傳到伺服器，隱私最安全；而部分雲端工具會把照片傳到後端處理，建議避開或先確認其隱私政策。",
          },
        ]),
        blogBreadcrumb(
          "2026 證件照完全攻略：手機自拍、線上裁切、超商列印一次搞定",
          URL
        ),
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
            <time dateTime="2026-07-23" className="text-sm text-muted-foreground">
              2026-07-23
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              2026 證件照完全攻略：手機自拍、線上裁切、超商列印一次搞定
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              去相館拍一次證件照要 200 到 400 元，聽起來不多，但仔細想想——換發身分證要拍、辦護照要拍、考試報名要拍、辦學生證要拍、換工作履歷又要拍。一年下來，光是證件照就能花掉快一千塊。而且相館拍的往往你也不見得滿意，回家還是覺得哪裡怪怪的。
            </p>
            <p>
              其實，<strong>你手上的手機就能拍出合格的證件照</strong>。這篇文章帶你從頭到尾走一遍：先搞懂台灣各種證件照的尺寸與規定，再學會怎麼在家用手機自拍，接著用免費的線上工具裁切排版，最後到超商印出來。全部自己來，一張成本不到 10 元。
            </p>

            <h2>一、台灣證件照規定一覽</h2>
            <p>
              先弄清楚你要辦的證件需要哪種尺寸。台灣常見的證件照其實只有三種規格，記住這張表就夠了：
            </p>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">尺寸類型</th>
                    <th className="text-left py-2 px-3 font-semibold">大小</th>
                    <th className="text-left py-2 px-3 font-semibold">常見用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">2 吋大頭照</td>
                    <td className="py-2 px-3">3.5 × 4.5 cm</td>
                    <td className="py-2 px-3">身分證、護照、台胞證</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">2 吋半身照</td>
                    <td className="py-2 px-3">4.2 × 4.7 cm</td>
                    <td className="py-2 px-3">健保卡、國際駕照、履歷照</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">1 吋大頭照</td>
                    <td className="py-2 px-3">2.8 × 3.5 cm</td>
                    <td className="py-2 px-3">駕照、各類執照</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              除了尺寸，還有幾條<strong>共通規定</strong>幾乎所有證件都適用：
            </p>
            <ul>
              <li>
                <strong>白色背景：</strong>單一、乾淨的白色或淺色背景，不能有雜物或陰影。
              </li>
              <li>
                <strong>六個月內拍攝：</strong>照片要能反映你目前的樣貌，過舊會被退件。
              </li>
              <li>
                <strong>正面免冠：</strong>不能戴帽子（宗教因素除外），臉部要完整露出、五官對稱。
              </li>
              <li>
                <strong>不露齒：</strong>表情自然、嘴巴閉合，不要露齒大笑。
              </li>
              <li>
                <strong>眼鏡規定：</strong>可戴眼鏡但鏡框不能遮眼、鏡片不能反光，也不能戴墨鏡或有色鏡片。
              </li>
            </ul>
            <p>
              各證件對規定的<strong>嚴格程度</strong>不太一樣，大致排名是：
            </p>
            <p className="text-center font-medium">
              護照 &gt; 身分證 &gt; 駕照 ＝ 健保卡
            </p>
            <p>
              護照因為要送國際辨識，審核最嚴，尤其在意背景純白、光線均勻與臉部比例；健保卡與駕照則相對寬鬆。如果你只想拍一套通用的，<strong>就以護照的標準來拍</strong>，這樣拿去辦其他證件都不會有問題。
            </p>

            <h2>二、手機自拍證件照：5 步驟教學</h2>
            <p>
              不用專業相機，一支手機就能拍出合格證件照，重點在於背景、光線和角度。跟著這 5 步驟走：
            </p>
            <h3>Step 1：找一面白牆或掛白布</h3>
            <p>
              背景是最容易被退件的地方。找一面乾淨的白牆，站在前方約 30 到 50 公分處（人離牆遠一點，才不會在牆上投出影子）。家裡沒有白牆的話，掛一塊白布或白色床單也可以。
            </p>
            <h3>Step 2：自然光，避免閃光燈</h3>
            <p>
              光線決定成敗。白天站在窗邊、<strong>臉正對窗戶</strong>，讓自然光均勻打在整張臉上，是最理想的打光。避免背對窗戶（會變剪影）、避免陽光直射（會過曝），也<strong>不要開閃光燈</strong>——閃光燈會讓臉油亮反光、背景出現硬邊陰影。
            </p>
            <h3>Step 3：手機架在眼睛高度，距離 1-1.5 公尺</h3>
            <p>
              手機鏡頭要跟眼睛<strong>同高</strong>，太高會顯得畏縮、太低會有雙下巴。鏡頭距離臉部約 1 到 1.5 公尺（不要伸手自拍，會臉部變形），用手機的<strong>自拍計時器</strong>或請家人幫忙按快門。有腳架最好，沒有的話把手機靠在一疊書上固定也行。
            </p>
            <h3>Step 4：表情自然、不露齒、直視鏡頭</h3>
            <p>
              雙眼平視鏡頭，肩膀放正、頭不要歪，嘴巴閉起來、嘴角微微上揚就好。不要刻意擠出笑容或露齒，也不要面無表情到像通緝犯。瀏海撥開、不要遮到眉毛。
            </p>
            <h3>Step 5：多拍幾張選最好的</h3>
            <p>
              一次拍個 5 到 10 張，眨眼、歪頭、失焦的很正常。拍完慢慢挑一張光線最均勻、表情最自然的，再進到下一步裁切。
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-red-900 text-sm font-semibold mb-2">
                常見 NG 點，拍之前先檢查：
              </p>
              <ul className="text-red-900 text-sm space-y-1 list-disc pl-5">
                <li>背景有陰影或雜物（人站太靠牆）</li>
                <li>瀏海遮住眉毛或眼睛</li>
                <li>眼鏡反光、看不清眼睛</li>
                <li>頭歪一邊、肩膀不平</li>
                <li>光線一邊亮一邊暗（沒有正對光源）</li>
              </ul>
            </div>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>三、線上裁切與排版工具推薦</h2>
            <p>
              拍好照片後，需要把它裁切成標準的證件尺寸、去掉多餘背景，甚至排版成一張可列印的相紙。以下誠實推薦幾個好用的<strong>免費</strong>工具，先從外部工具開始——它們各有專長，你可以依需求挑：
            </p>
            <h3>IDIFY（開源、離線處理）</h3>
            <p>
              最推薦給重視隱私的人。IDIFY 是開源專案，<strong>完全在瀏覽器本機處理，照片不會上傳到任何伺服器</strong>，內建各國證件尺寸模板，裁切完直接下載。理念跟 ImageMarker 一致——你的證件照不該經過別人的伺服器。缺點是介面偏工程師風格，模板選單需要花點時間找。
            </p>
            <h3>好時有影（免費裁切 + 4×6 排版）</h3>
            <p>
              台灣人熟悉的老牌線上工具，能把單張證件照自動排版成 4×6 相紙（一張可排好幾張），很適合要拿去超商列印的情境。介面中文、操作直覺。缺點是功能較陽春、需連網上傳。
            </p>
            <h3>Pokecut（AI 去背 + 模板）</h3>
            <p>
              如果你拍的背景不夠乾淨，Pokecut 的 AI 一鍵去背很好用，還能換成純白背景、套用證件模板。適合背景沒拍好想補救的情況。缺點是進階功能與高解析下載可能要付費，且照片會上傳雲端處理。
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-blue-900 text-sm">
                <strong>關於 ImageMarker：</strong>我們目前主打的是浮水印、馬賽克、EXIF
                清除等隱私保護工具，
                <strong>證件照裁切功能正在規劃中</strong>
                ，未來會推出同樣「本機處理、不上傳」的證件照裁切排版。在那之前，上面幾款工具都很值得用；等你拍好、裁好證件照後，若要交影本給別人，記得回來用
                ImageMarker 加個浮水印保護（下面第五段會講）。
              </p>
            </div>

            <h2>四、超商列印完整指南</h2>
            <p>
              照片裁切、排版好之後，就能到超商印出來了。台灣四大超商都能印，步驟大同小異。
            </p>
            <h3>排版成 4×6 相紙尺寸</h3>
            <p>
              超商的相片列印是以 <strong>4×6（10.2 × 15.2 cm）</strong>
              為單位計費，所以最划算的做法是先把證件照排版成一張 4×6：
            </p>
            <ul>
              <li>一張 4×6 可以排 <strong>4 到 6 張 2 吋照片</strong>，印一次全部剪下來用。</li>
              <li>用前面提到的「好時有影」或其他排版工具，把同一張照片複製排滿一張 4×6。</li>
            </ul>
            <h3>各超商操作步驟</h3>
            <ul>
              <li>
                <strong>7-11 ibon：</strong>ibon 機台 → 列印 → 相片列印 → 用手機
                Wi-Fi 或 QR Code 上傳照片 → 選 4×6 亮面相紙 → 到櫃台取件付款。
              </li>
              <li>
                <strong>全家 FamiPort：</strong>FamiPort → 數位相片 →
                連線上傳或插記憶卡 → 選 4×6 → 列印付款。
              </li>
              <li>
                <strong>萊爾富 / OK 超商：</strong>流程類似，機台選相片列印、上傳檔案、選
                4×6 尺寸後印出。
              </li>
            </ul>
            <h3>列印小技巧</h3>
            <ul>
              <li>選<strong>亮面相紙</strong>，證件照較不建議用霧面。</li>
              <li>選「<strong>原尺寸列印</strong>」或「印滿白邊」，避免機台自動裁切把你的照片切掉一部分。</li>
              <li>費用約 <strong>6 到 8 元一張 4×6</strong>，一張就能剪出好幾張證件照，平均一張證件照不到 2 元。</li>
            </ul>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>五、證件照影本怎麼保護？</h2>
            <p>
              證件照拍好、印好了，接下來很可能要<strong>把證件照或含照片的證件影本交給別人</strong>——租屋時交給房東、入職時交給公司人資、報名時交給補習班或學校。這一步最容易被忽略，卻是個資外洩的高風險點。
            </p>
            <p>
              一張帶有你清晰大頭照的證件影本，一旦被有心人拿去，可能被用來偽造身分、盜辦帳號。所以<strong>交出影本前，先加上浮水印</strong>很重要：寫明「用途 ＋ 對象 ＋ 日期」，例如「僅供 OO 公司應徵使用 2026/07/23」，即使影本外流也很難被挪作他用。
            </p>
            <p>
              用 <a href="https://imagemarker.app">ImageMarker</a>{" "}
              加浮水印只要三步驟：上傳證件影本 → 輸入範本文字、選擇覆蓋整張、透明度調到
              30–40% → 預覽確認後下載。整個過程
              <strong>100% 在你的瀏覽器本機完成，檔案不會上傳到任何伺服器</strong>
              ，手機也能直接操作。相關情境的浮水印寫法，可以參考{" "}
              <Link href="/blog/rent-id-watermark">
                租屋交證件影本前必做的浮水印教學
              </Link>{" "}
              與{" "}
              <Link href="/blog/passport-watermark-guide">護照影本浮水印安全指南</Link>
              。
            </p>

            <h2>六、常見問題 FAQ</h2>
            <h3>Q1：證件照可以戴眼鏡嗎？</h3>
            <p>
              原則上可以，但鏡框不能遮住眼睛、鏡片不能反光，也不能是有色鏡片或墨鏡。護照與身分證的規定較嚴格，若鏡片容易反光，建議拍照時暫時拿下眼鏡最保險。
            </p>
            <h3>Q2：證件照可以用手機拍嗎？</h3>
            <p>
              可以。只要符合白色背景、正面免冠、光線均勻、六個月內、解析度清晰等規定，手機自拍再用線上工具裁切成標準尺寸，多數證件都能使用。護照這類最嚴格的證件送件前，建議先確認受理單位是否接受自拍照。
            </p>
            <h3>Q3：證件照背景一定要白色嗎？</h3>
            <p>
              台灣的身分證、護照、健保卡等主要證件都要求白色或淺色的單一背景。少數證件可接受淺藍或淺灰，但白色最保險、通用性最高，拍攝時盡量選乾淨的白牆。
            </p>
            <h3>Q4：證件照多久要換一次？</h3>
            <p>
              台灣多數證件要求照片為「最近六個月內」拍攝。換發身分證、辦護照時若外貌與舊照差異太大（例如變胖變瘦、大幅整形、性別變更）也應重拍，避免核對時被退件。
            </p>
            <h3>Q5：超商印證件照品質夠嗎？</h3>
            <p>
              夠用。超商多功能事務機的相片列印解析度足以應付一般證件申辦，選亮面相紙、原尺寸列印即可。除非是講究的專業用途，否則不必特地跑相館。
            </p>
            <h3>Q6：線上裁切的照片安全嗎？</h3>
            <p>
              要看工具怎麼處理。像 IDIFY、ImageMarker 這類在瀏覽器本機（離線）處理的工具，照片不會上傳到伺服器，隱私最安全；而部分雲端工具會把照片傳到後端處理，建議避開或先確認其隱私政策。
            </p>

            <h2>結語</h2>
            <p>
              證件照真的不必花錢跑相館。手機拍、線上裁、超商印，三步驟就能搞定，一整套下來成本不到 10 元，還能拍到自己滿意為止。唯一要記得的一件事是——<strong>如果證件照或影本要交給別人，先加上浮水印再交</strong>，花一分鐘就能大幅降低個資被冒用的風險。
            </p>
            <p>
              需要保護證件影本時，隨時到 ImageMarker：{" "}
              <a href="https://imagemarker.app" target="_blank" rel="noopener noreferrer">
                https://imagemarker.app
              </a>
            </p>
          </div>
        <p className="mt-8 text-center text-sm text-gray-400"><a href="https://ko-fi.com/justinlee2061" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">☕ 如果這篇文章幫到你，請我喝杯咖啡</a></p>
        </article>

        <PopularTools location={SLUG} className="mt-12" />

        {/* 相關文章 */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">相關文章</h2>
          <div className="space-y-4">
            <Link href="/blog/rent-id-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  租屋交證件影本前必做！3 步驟幫身分證加浮水印
                </h3>
                <p className="text-sm text-muted-foreground">
                  每次提供身分證影本前，花不到一分鐘加上浮水印，大幅降低個資被冒用的風險。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/passport-copy-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  出國護照影本怎麼印？護照影本可以幹嘛？完整實務指南
                </h3>
                <p className="text-sm text-muted-foreground">
                  超商列印與手機翻拍教學、6 種常見用途、影本與正本的效力，以及交件前如何加浮水印保護。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/watermark-templates-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  證件浮水印內容範本：10 種常見情境怎麼寫
                </h3>
                <p className="text-sm text-muted-foreground">
                  租屋、求職、開戶、簽證……每種情境的證件浮水印該寫什麼？完整範本讓你直接套用。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
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
