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

const URL = "https://imagemarker.app/blog/hr-onboarding-watermark-sop";
const SLUG = "hr-onboarding-watermark-sop";
const TITLE =
  "人資到職文件浮水印 SOP：新人證件影本這樣收，才符合個資保護要求";

export default function HrOnboardingWatermarkSop() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: `${TITLE}｜ImageMarker`,
      description:
        "新人報到收身分證影本、存摺封面、學歷證明，HR 一次收好幾份。這篇提供可直接寫進公司規範的到職文件個資保護 SOP：哪些能收、哪些不能收、浮水印怎麼加、保存與銷毀怎麼訂。免費工具、不上傳、可批次。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "給 HR 的到職文件個資保護 SOP：招募與到職階段的收件界線、個資法下的安全維護義務、5 步驟收件流程、浮水印範本，以及保存與銷毀的訂定方式。",
          url: URL,
          datePublished: "2026-08-04",
          dateModified: "2026-08-04",
        }),
        howToSchema({
          name: "HR 到職證件影本個資保護 5 步驟 SOP",
          description:
            "從新人交件到歸檔銷毀的完整流程，確保到職證件影本只被用在人事作業上。",
          steps: [
            {
              name: "先界定「這次到職真正需要的文件清單」",
              text: "列出辦理勞健保、薪轉、勞退提繳等作業真正需要的文件，並寫成固定清單發給新人。清單外的文件一律不收，避免因為「順便留一份」而擴大個資持有範圍。",
            },
            {
              name: "收件時同步完成個資告知與同意",
              text: "在交件當下告知蒐集目的、利用範圍、保存期間與新人可行使的權利，並取得書面或系統紀錄。告知是法定義務，也是日後爭議時最重要的依據。",
            },
            {
              name: "收到後立即加浮水印，不保留乾淨版",
              text: "把新人交來的證件影本掃描或拍照後，第一時間加上「僅供 OO 公司到職人事作業使用」加日期的浮水印，滿版斜向、透明度 30% 至 40%，處理完刪除未加浮水印的原始檔與郵件附件。",
            },
            {
              name: "遮蔽非必要欄位再歸檔",
              text: "存摺封面只需帳號與戶名，其他交易資訊用馬賽克遮蔽；學經歷證明上的無關個資同樣處理。歸檔到權限管控的人事系統資料夾，限定 HR 承辦與主管可存取。",
            },
            {
              name: "設定保存期限與銷毀機制",
              text: "依法定人事資料保存年限訂出留存期間，離職後屆期的文件定期清查銷毀，電子檔徹底刪除、紙本碎紙，並留下銷毀紀錄。未錄取者的應徵資料更要主動刪除。",
            },
          ],
        }),
        faqSchema([
          {
            q: "公司可以要求新人提供身分證影本嗎？",
            a: "到職後為辦理勞健保投保、薪資轉帳、勞退提繳等人事作業而蒐集，屬於有特定目的的合理蒐集。但必須告知蒐集目的與利用範圍、只收必要的文件，並在目的消失後刪除。面試階段就要求身分證影本則較難主張必要性，通常應該等到確定錄取後再收。",
          },
          {
            q: "面試階段可以先收身分證影本嗎？",
            a: "不建議。就業服務法禁止雇主要求求職者提供非屬就業所需的隱私資料，面試階段核對身分通常看正本即可，不需要留存影本。真的有需要（例如須確認工作資格），也應在告知用途後只收最低限度的資料，並在未錄取時立即刪除。",
          },
          {
            q: "到職證件影本要保存多久？",
            a: "與人事、薪資、投保有關的文件依相關法規有保存年限（例如勞工名卡等人事資料須保存至勞工離職後一定期間）。原則是：有法定保存義務的依法保存，沒有的在目的達成後盡快刪除，並把保存期限明確寫進公司的個資管理規範，而不是留到硬碟滿為止。",
          },
          {
            q: "存摺封面影本可以要求提供嗎？",
            a: "為辦理薪資轉帳而蒐集帳號資訊是合理的，但只需要戶名與帳號。實務上建議請員工提供遮蔽掉其他資訊的影本，或收到後由 HR 用馬賽克把非必要欄位蓋掉再歸檔，降低外洩時的損害。",
          },
          {
            q: "HR 用免費線上工具處理員工證件，會不會有合規疑慮？",
            a: "會，而且是常被忽略的漏洞。多數線上工具會把檔案上傳到它的伺服器處理，等於員工個資被傳給了一個未經告知的第三方，可能構成未經同意的利用或委外未盡監督義務。選擇完全在瀏覽器本機處理、檔案不上傳的工具（例如 ImageMarker）就沒有這個問題。",
          },
          {
            q: "浮水印該寫什麼內容？",
            a: "至少包含用途、對象與日期，例如「僅供 OO 股份有限公司到職人事作業使用 2026/08/04」。若是要送交外部單位（例如勞保局、銀行薪轉開戶），就把對象改成該單位名稱，讓每一份影本只對應一個用途。",
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
            <time dateTime="2026-08-04" className="text-sm text-muted-foreground">
              2026-08-04
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">{TITLE}</h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              月初報到日，五個新人一起進來。每個人交一份身分證影本正反面、一份存摺封面、
              一份最高學歷證明，有的還附上前公司的離職證明、體檢報告、駕照影本。
              十分鐘之內，你的桌上多了二十幾張別人的個資，
              而它們接下來會被掃描、寄給投保單位、存進共用資料夾、
              最後留在某個資料夾裡好幾年——沒有人記得它們還在。
            </p>
            <p>
              HR 是全公司<strong>單位人力持有最多個資的職位</strong>。
              業務手上有客戶名單、財會手上有薪資數字，但只有 HR 同時握著
              身分證字號、出生年月日、戶籍地址、銀行帳號、家庭狀況與健康資訊。
              一旦這批資料外流，公司面對的不只是員工的信任崩塌，還有主管機關的裁罰。
            </p>
            <p>
              這篇文章給你一套<strong>可以直接複製進公司規範的到職文件 SOP</strong>：
              哪些文件能收、哪些不該收、收到之後怎麼加浮水印與遮蔽、
              保存多久、什麼時候該銷毀。全程用免費且不上傳雲端的工具就能完成。
            </p>

            <h2>一、先搞清楚：招募階段 vs 到職階段，界線完全不同</h2>
            <p>
              這是 HR 最常踩到的地方。同樣一份身分證影本，
              在面試階段收跟在到職後收，正當性差很多。
            </p>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">階段</th>
                    <th className="text-left py-2 px-3 font-semibold">合理蒐集範圍</th>
                    <th className="text-left py-2 px-3 font-semibold">不建議蒐集</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">投遞履歷</td>
                    <td className="py-2 px-3">姓名、聯絡方式、學經歷</td>
                    <td className="py-2 px-3">身分證字號、戶籍地址、家庭成員</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">面試</td>
                    <td className="py-2 px-3">核對身分證正本（不留存）</td>
                    <td className="py-2 px-3">身分證影本、存摺影本、信用紀錄</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">確定錄取後</td>
                    <td className="py-2 px-3">投保與薪轉所需文件</td>
                    <td className="py-2 px-3">與職務無關的健康或家庭資訊</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">到職報到</td>
                    <td className="py-2 px-3">身分證影本、存摺封面、學歷證明</td>
                    <td className="py-2 px-3">「先留著以後可能用到」的任何文件</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>就業服務法明文禁止雇主要求求職者提供非屬就業所需的隱私資料</strong>，
              而面試階段要判斷是否適任，通常看正本核對身分就夠了，
              沒有留存影本的必要。求職者這一側的角度可以看{" "}
              <Link href="/blog/job-interview-id-copy-safety">
                求職面試要交身分證影本？小心這些陷阱
              </Link>
              ——理解應徵者在擔心什麼，你的收件說明才會有說服力。
            </p>
            <p>
              到職後就不同了。辦理勞保、健保、勞退提繳、薪資轉帳，
              都需要正確的身分資訊與帳戶資訊，這時候蒐集就有明確的特定目的。
              關鍵是<strong>「等到需要的時候才收，收到必要的最小範圍」</strong>。
            </p>

            <h2>二、HR 的個資法義務：不只是「不要外洩」</h2>
            <p>
              個人資料保護法對公司（非公務機關）的要求可以簡化成四件事：
            </p>
            <ul>
              <li>
                <strong>特定目的：</strong>
                蒐集要有明確目的（人事管理、薪資給付、勞健保作業），
                不能為了「以後可能用得到」而蒐集。
              </li>
              <li>
                <strong>告知義務：</strong>
                蒐集時要告知當事人蒐集目的、利用期間與範圍、對象，
                以及當事人可以行使的權利（查詢、更正、刪除等）。
              </li>
              <li>
                <strong>目的內利用：</strong>
                為了投保而收的資料，不能拿去做別的用途；
                要跨目的使用必須另外取得同意。
              </li>
              <li>
                <strong>安全維護措施：</strong>
                必須採行<strong>適當的技術與組織措施</strong>
                防止資料被竊取、竄改、毀損或洩漏。這一條是罰鍰的主要依據。
              </li>
            </ul>
            <p>
              最後這條「適當的安全維護措施」是模糊地帶，也是實務上最容易被挑戰的地方。
              主管機關不會逐條告訴你要做什麼，但當外洩發生時，
              會回頭檢視你「做了哪些防護」。
              <strong>
                權限控管、加密存放、加註用途浮水印、定期銷毀，都是能拿得出來的具體作為
              </strong>
              ；什麼都沒做，就很難主張自己已盡義務。
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-amber-900 text-sm">
                <strong>注意：</strong>
                法規細節（保存年限、罰鍰級距、主管機關的行業別規範）會隨修法調整，
                本文說明的是實務原則與流程設計，
                實際訂定公司規範時請以最新法規與貴公司法務意見為準。
              </p>
            </div>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>三、到職文件收件 SOP：5 個步驟</h2>

            <h3>Step 1：先界定「這次到職真正需要的文件清單」</h3>
            <p>
              把要收的文件寫成固定清單，隨到職通知一起寄給新人，
              並且<strong>清單以外的文件一律不收</strong>。
              典型的必要清單大致是：
            </p>
            <ul>
              <li>身分證影本正反面（辦理勞健保投保、身分核對）</li>
              <li>存摺封面影本（薪資轉帳）</li>
              <li>最高學歷或證照影本（若為職務資格必要）</li>
              <li>外籍員工的居留證與工作許可相關文件</li>
            </ul>
            <p>
              很多公司會「順便」收駕照、戶籍謄本、體檢報告、緊急聯絡人全戶資料。
              每多收一份，你就多背一份風險，而且多數根本用不到。
              <strong>個資持有量越小，安全維護的成本越低</strong>。
            </p>

            <h3>Step 2：收件時同步完成個資告知與同意</h3>
            <p>
              報到當天讓新人簽一份個資蒐集告知同意書，內容至少寫清楚：
              蒐集目的、蒐集的個資類別、利用期間與地區、利用對象與方式、
              以及當事人可以行使的權利。這份文件在平時是形式，
              在爭議發生時是你唯一的依據。
            </p>
            <p>
              同時口頭補一句：「這些影本我們只會用在投保與薪轉，
              我們會加上用途浮水印，離職滿 OO 年後銷毀。」
              這句話對新人的觀感差異很大——
              新人第一天對公司的信任感，往往就建立在這種細節上。
            </p>

            <h3>Step 3：收到後立刻加浮水印，不留乾淨版</h3>
            <p>
              紙本掃描或手機翻拍完成後，<strong>第一個動作是加浮水印，不是存檔</strong>。
              順序反過來，公司系統裡就會永遠存在一份可以直接拿去冒用的乾淨影本。
            </p>
            <p>浮水印的設定原則：</p>
            <ul>
              <li>
                <strong>文字：</strong>
                「僅供 OO 股份有限公司到職人事作業使用 2026/08/04」
              </li>
              <li>
                <strong>版面：</strong>滿版斜向重複，不要只放角落（角落一裁就沒了）
              </li>
              <li>
                <strong>透明度：</strong>30% 到 40%，證號與姓名仍需清楚可讀
              </li>
              <li>
                <strong>批次：</strong>
                同一位新人的多份文件、甚至同一梯次多位新人，
                一次選取套用同一組文字再打包下載
              </li>
            </ul>
            <p>
              處理完成後，記得把來源清乾淨：郵件附件、掃描機暫存資料夾、
              手機相簿、與新人往來的通訊軟體對話。
              這些地方留下的乾淨版，才是實際外洩事件裡最常見的破口。
            </p>

            <h3>Step 4：遮蔽非必要欄位再歸檔</h3>
            <p>
              浮水印負責「限定用途」，遮蔽負責「減少暴露」，兩者要搭配：
            </p>
            <ul>
              <li>
                <strong>存摺封面：</strong>只留戶名與帳號，其餘資訊用馬賽克蓋掉。
              </li>
              <li>
                <strong>學歷證明：</strong>
                與資格認定無關的欄位（例如成績、住址）可一併遮蔽。
              </li>
              <li>
                <strong>要送外部的版本：</strong>
                送給銀行、投保單位的版本，浮水印的「對象」要改成該單位，
                做到一份影本只對應一個用途。
              </li>
            </ul>
            <p>
              歸檔時放進權限管控的資料夾，只有 HR 承辦與必要主管可以存取，
              不要放在全公司共用槽或個人桌面。
            </p>

            <InlineCTA tool="batch" position="mid_article" location={SLUG} />

            <h3>Step 5：設定保存期限與銷毀機制</h3>
            <p>
              這一步最容易被跳過，但它決定了公司長期累積的風險量。
            </p>
            <ul>
              <li>
                <strong>有法定保存義務的：</strong>
                人事、投保、薪資相關文件依規定保存，到期後清查銷毀。
              </li>
              <li>
                <strong>沒有法定義務的：</strong>目的達成即刪除，不要「先留著」。
              </li>
              <li>
                <strong>未錄取者的應徵資料：</strong>
                最容易被遺忘的一批。如果沒有取得同意留存於人才庫，
                應在招募結束後刪除。
              </li>
              <li>
                <strong>銷毀要留紀錄：</strong>
                誰在什麼時候銷毀了哪一批，紙本碎紙、電子檔徹底刪除，
                這份紀錄是你已盡安全維護義務的證明。
              </li>
            </ul>

            <h2>四、HR 常用浮水印文字範本</h2>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">用途</th>
                    <th className="text-left py-2 px-3 font-semibold">浮水印文字範本</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">一般到職歸檔</td>
                    <td className="py-2 px-3">
                      僅供（OO 股份有限公司）到職人事作業使用 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">勞健保投保</td>
                    <td className="py-2 px-3">
                      僅供辦理勞健保投保使用，不得作其他用途 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">薪轉帳戶開立</td>
                    <td className="py-2 px-3">
                      僅供（OO 銀行）薪資轉帳帳戶開立使用 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">外籍員工聘僱申請</td>
                    <td className="py-2 px-3">
                      僅供聘僱許可申請使用 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">教育訓練 / 證照登錄</td>
                    <td className="py-2 px-3">
                      僅供（OO 公司）證照登錄查驗使用 2026/08/04
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              其他情境（開戶、保險、監理單位）的寫法可以參考{" "}
              <Link href="/blog/watermark-templates-guide">
                證件浮水印內容範本：10 種常見情境怎麼寫
              </Link>
              ；存摺、健保卡、駕照這類非身分證文件的處理原則，
              整理在{" "}
              <Link href="/blog/other-documents-watermark">
                不只身分證！存摺、健保卡、駕照影本也要加浮水印
              </Link>
              。
            </p>

            <h2>五、工具選擇：為什麼「不上傳」對 HR 特別重要</h2>
            <p>
              這是 HR 最容易忽略的合規風險。你為了幫員工的身分證加浮水印，
              把檔案丟到某個免費線上工具——
              <strong>那個工具的伺服器就成了一個未經告知的第三方接收者</strong>。
            </p>
            <p>
              從個資法的角度看，這可能牽涉到：告知範圍外的利用、
              委外處理未盡監督義務、跨境傳輸（很多工具的伺服器在海外）。
              而且你完全無法回答「那家公司把檔案留了多久」這個問題。
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-blue-900 text-sm">
                <strong>ImageMarker 的做法：</strong>
                所有處理都在你的瀏覽器本機完成，
                <strong>檔案從頭到尾沒有離開過公司電腦</strong>，
                沒有上傳、沒有伺服器留存、不需要註冊帳號、不需要 IT 幫你安裝軟體。
                可以一次處理整梯新人的文件並打包下載，也支援
                <Link href="/pdf-watermark">PDF 文件加浮水印</Link>
                。對 HR 而言，這代表你的處理流程本身就是安全維護措施，
                而不是新增一個風險點。
              </p>
            </div>

            <h2>六、常見問題 FAQ</h2>
            <h3>Q1：公司可以要求新人提供身分證影本嗎？</h3>
            <p>
              到職後為辦理勞健保投保、薪資轉帳、勞退提繳等作業而蒐集，
              屬於有特定目的的合理蒐集。但必須告知目的與利用範圍、只收必要文件，
              並在目的消失後刪除。面試階段就要求身分證影本則較難主張必要性。
            </p>
            <h3>Q2：面試階段可以先收身分證影本嗎？</h3>
            <p>
              不建議。就業服務法禁止雇主要求求職者提供非屬就業所需的隱私資料，
              面試階段核對正本即可，不需留存影本。
              若確有必要，也應在告知用途後只收最低限度資料，未錄取時立即刪除。
            </p>
            <h3>Q3：到職證件影本要保存多久？</h3>
            <p>
              與人事、薪資、投保有關的文件依相關法規有保存年限；
              沒有法定保存義務的，目的達成後盡快刪除。
              重點是把期限明確寫進公司的個資管理規範並實際執行，
              而不是無限期堆在硬碟裡。
            </p>
            <h3>Q4：存摺封面影本可以要求提供嗎？</h3>
            <p>
              為辦理薪資轉帳而蒐集帳號資訊是合理的，但只需要戶名與帳號。
              建議請員工提供已遮蔽其他資訊的影本，
              或收到後由 HR 用馬賽克蓋掉非必要欄位再歸檔。
            </p>
            <h3>Q5：HR 用免費線上工具處理員工證件會有合規疑慮嗎？</h3>
            <p>
              會，而且常被忽略。多數線上工具會上傳檔案到自家伺服器，
              等於員工個資被傳給未經告知的第三方。
              選擇完全在瀏覽器本機處理、檔案不上傳的工具就沒有這個問題。
            </p>
            <h3>Q6：浮水印該寫什麼內容？</h3>
            <p>
              至少包含用途、對象與日期，例如
              「僅供 OO 股份有限公司到職人事作業使用 2026/08/04」。
              要送交外部單位時，把對象改成該單位名稱，
              讓每一份影本只對應一個用途。
            </p>

            <h2>結語：SOP 的價值在於「事情發生時你拿得出來」</h2>
            <p>
              沒有任何流程能保證個資百分之百不外洩。
              硬碟會壞、信會誤寄、離職同仁會帶走檔案。
              但當事情發生時，一家做了告知、做了浮水印、做了權限控管、
              做了定期銷毀的公司，跟一家什麼都沒做的公司，
              面對的後果完全不同——前者是意外，後者是疏失。
            </p>
            <p>
              而且這套 SOP 建置成本極低：一份文件清單、一份告知書、
              一個免費的瀏覽器工具、一條銷毀規則。
              第一次跑完大概兩小時，之後每梯新人只多花五分鐘。
            </p>
            <p>
              下一梯報到就可以開始：{" "}
              <a href="https://imagemarker.app" target="_blank" rel="noopener noreferrer">
                https://imagemarker.app
              </a>
              ，免費、免安裝、檔案不上傳。
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
            <Link href="/blog/business-confidential-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  中小企業機密文件浮水印：不用買 DRM，也能保護公司文件
                </h3>
                <p className="text-sm text-muted-foreground">
                  報價單、合約、設計稿外流怎麼辦？用免費工具做到可追溯的文件保護。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/realtor-id-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  房仲證件浮水印教學：帶看前先幫客戶證件加保護
                </h3>
                <p className="text-sm text-muted-foreground">
                  另一個每天收證件影本的職位。收件界線、保管 SOP 與浮水印範本。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/job-interview-id-copy-safety">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  求職面試要交身分證影本？小心這些陷阱，教你安全提交
                </h3>
                <p className="text-sm text-muted-foreground">
                  求職者那一側的觀點。看懂應徵者的疑慮，收件說明才有說服力。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/other-documents-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  不只身分證！存摺、健保卡、駕照影本也要加浮水印
                </h3>
                <p className="text-sm text-muted-foreground">
                  到職文件裡的非身分證文件該怎麼處理，6 種常見證件的寫法一次看。
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
