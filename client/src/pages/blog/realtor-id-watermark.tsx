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

const URL = "https://imagemarker.app/blog/realtor-id-watermark";
const SLUG = "realtor-id-watermark";
const TITLE =
  "房仲證件浮水印教學：帶看前先幫客戶證件加保護，3 步驟做完";

export default function RealtorIdWatermark() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: `${TITLE}｜ImageMarker`,
      description:
        "房仲每天收身分證影本、戶籍謄本、權狀，一旦外洩就是公司扛。教你 3 步驟幫客戶證件加浮水印，標註用途、對象與案件編號，全程在瀏覽器完成、不上傳雲端。附洗錢防制留存規定與證件保管 SOP。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "給房仲的證件個資保護實務：哪些階段會收到客戶證件、洗錢防制法的留存義務、外洩的法律代價，以及 3 步驟批次幫證件影本加浮水印的做法與範本。",
          url: URL,
          datePublished: "2026-08-04",
          dateModified: "2026-08-04",
        }),
        howToSchema({
          name: "房仲幫客戶證件影本加浮水印的 3 步驟",
          description:
            "收到客戶身分證影本、戶籍謄本後，立即加上限定用途的浮水印再歸檔，降低外洩後被冒用的風險。",
          steps: [
            {
              name: "收到當下就處理，不要先存原始檔",
              text: "客戶把證件影本傳到 LINE 或用手機翻拍給你之後，第一件事不是轉存到公司資料夾，而是先把檔案丟進浮水印工具處理。原始無浮水印的檔案處理完就從對話紀錄與相簿刪除，避免手機遺失或帳號被盜時整批外流。",
            },
            {
              name: "浮水印寫上用途、對象、案件編號與日期",
              text: "文字要明確限定這份影本能用在哪一件事，例如「僅供 OO 房屋 A1234 案件租賃簽約使用 2026/08/04」。加上案件編號的好處是日後若影本流出，可以直接回推是哪一件、哪一位承辦經手。",
            },
            {
              name: "滿版斜向、透明度 30-40%，批次套用後歸檔",
              text: "浮水印要覆蓋整張、斜向重複，透明度調到 30% 至 40%，讓證件內容仍可辨識但無法被裁切掉浮水印。同一位客戶通常有好幾份文件，用批次功能一次套用同一組文字，處理完再存進公司系統。",
            },
          ],
        }),
        faqSchema([
          {
            q: "房仲可以要求客戶提供身分證影本嗎？",
            a: "可以，但要有明確目的。租賃簽約時核對承租人身分、買賣案件依洗錢防制相關規定確認客戶身分，都是合理的蒐集目的。重點在於必須告知蒐集目的與利用範圍、只收必要的文件，並在目的消失後刪除，而不是無限期留存。",
          },
          {
            q: "客戶不願意給身分證影本怎麼辦？",
            a: "先分清楚是「核對」還是「留存」。多數帶看階段只需要當場核對正本、確認是本人，不需要留下影本。真的需要留存時，可以主動提出替代方案：由客戶自己先加上浮水印再傳、遮蔽非必要欄位、或當面拍攝後由你當場加浮水印給客戶確認，通常客戶就願意配合。",
          },
          {
            q: "證件影本加浮水印會影響簽約或送件效力嗎？",
            a: "只要浮水印是半透明、沒有蓋掉姓名、證號、照片等必要欄位，一般不影響核對與存檔。若對方是銀行、地政士或公務機關，建議事先確認能否接受帶浮水印的影本，多數單位是接受的，因為浮水印本身就是常見的防冒用做法。",
          },
          {
            q: "房仲收到的客戶證件要保存多久？",
            a: "依用途而定。單純為了核對身分而收的影本，目的達成後就應刪除；依洗錢防制相關規定辦理確認客戶身分而留存的資料，則有法定的保存年限（實務上為交易結束後五年），這部分應依主管機關最新規定與公司法遵政策辦理，不要憑印象決定。",
          },
          {
            q: "把客戶證件存在 LINE 對話紀錄裡有風險嗎？",
            a: "風險很高。LINE 帳號被盜、手機遺失、換機備份外流，都可能讓整串對話裡的證件影本一次外洩，而且業務離職後這些檔案仍留在個人裝置上，公司完全無法控管。正確做法是處理完浮水印後存進公司指定的權限管控空間，並刪除個人裝置上的副本。",
          },
          {
            q: "有沒有不用上傳雲端的批次浮水印工具？",
            a: "有。ImageMarker 完全在瀏覽器本機處理，證件影本不會傳到任何伺服器，也不需要安裝軟體或註冊帳號，可以一次選取多張文件套用同一組浮水印再打包下載。對房仲來說，這代表客戶個資不會多經手一個第三方雲端。",
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
              如果你是房仲，打開手機相簿往下滑，大概能滑出十幾張別人的身分證。
              有客戶用 LINE 傳來的租客身分證正反面、有簽約時翻拍的戶籍謄本、有屋主傳來的權狀，
              還有那種「先傳一下，我等等再補資料」之後就再也沒清掉的照片。
            </p>
            <p>
              這不是誰特別粗心，而是這行的工作方式就是如此——
              <strong>證件影本是流動的，但外洩的責任是固定的</strong>。
              一旦客戶的身分證影本從你的手機、你的信箱、你公司的共享資料夾流出去，
              被拿去辦門號、開人頭帳戶，客戶回頭要交代的對象就是你和你的公司。
            </p>
            <p>
              這篇文章不是要你少收文件——很多文件依規定你還非收不可——
              而是教你一個 30 秒就能做完的動作：
              <strong>收到證件的當下，先加上限定用途的浮水印再歸檔</strong>。
              下面會講清楚哪些階段會碰到證件、為什麼不能不收、外洩的代價有多重，
              以及實際怎麼做、浮水印該寫什麼。
            </p>

            <h2>一、房仲手上的客戶證件，比你以為的還多</h2>
            <p>
              先盤點一次。從第一次帶看到交屋，一個案件會經過你手上的個資文件大致是這些：
            </p>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">階段</th>
                    <th className="text-left py-2 px-3 font-semibold">常見文件</th>
                    <th className="text-left py-2 px-3 font-semibold">是否需要留存影本</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">看屋 / 帶看</td>
                    <td className="py-2 px-3">身分證正本（核對本人）</td>
                    <td className="py-2 px-3">通常不需要，當場核對即可</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">斡旋 / 要約</td>
                    <td className="py-2 px-3">身分證影本、聯絡資料</td>
                    <td className="py-2 px-3">視公司作業辦法，多為短期</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">租賃簽約</td>
                    <td className="py-2 px-3">承租人身分證影本、在職證明、保證人資料</td>
                    <td className="py-2 px-3">需要，附於契約</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">買賣簽約</td>
                    <td className="py-2 px-3">身分證影本、戶籍謄本、印鑑證明、權狀</td>
                    <td className="py-2 px-3">需要，且有法定保存年限</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">貸款 / 代書對接</td>
                    <td className="py-2 px-3">財力證明、存摺封面、扣繳憑單</td>
                    <td className="py-2 px-3">轉交為主，避免自留</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              看得出問題在哪嗎？<strong>真正需要「留存」的其實只有中後段</strong>，
              但實務上前面每個階段都會產生檔案：客戶先傳一張、你先拍一張、群組裡再轉傳一次。
              等到案件結束，這些散落的副本沒有人記得刪。
            </p>
            <p>
              而且房仲的個資風險有一個別的行業沒有的特性——
              <strong>你同時握著買方與賣方、房東與房客兩邊的資料</strong>。
              一份外洩的文件，可能同時讓兩邊都受害，
              也可能讓對方直接找上門質疑你是不是把資料賣給了誰。
            </p>

            <h2>二、房仲為什麼不能「乾脆不收」</h2>
            <p>
              有些人的第一反應是：那我通通不收不就好了？實務上做不到，原因有兩個。
            </p>
            <h3>1. 契約與核對本身就需要</h3>
            <p>
              租賃契約要確認承租人是本人、買賣要確認出售的人確實是所有權人，
              這是房仲最基本的把關義務。如果沒有核對、沒有留下依據，
              一旦出現冒名承租、假屋主詐騙，你會是第一個被追問「你當時怎麼核對的」的人。
              相關的詐騙手法可以參考{" "}
              <Link href="/blog/rent-scam-id-fraud">租屋詐騙手法大公開</Link>。
            </p>
            <h3>2. 洗錢防制的確認客戶身分義務</h3>
            <p>
              不動產經紀業被列為洗錢防制法下的「指定之非金融事業或人員」，
              在辦理不動產買賣時負有<strong>確認客戶身分、留存必要紀錄</strong>的義務，
              並須依規定保存一定年限。也就是說，某些文件不是你想不留就能不留的，
              不收反而是違規。
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-amber-900 text-sm">
                <strong>提醒：</strong>
                各公司適用的確認客戶身分程序、保存年限與應留存項目，
                請以主管機關最新公告與貴公司法遵規範為準，
                本文只說明「既然一定要留存，該怎麼留才安全」。
              </p>
            </div>
            <p>
              所以結論很清楚：房仲的問題從來不是「要不要收證件」，而是
              <strong>「收了之後怎麼保管、怎麼降低外洩後的傷害」</strong>。
              這就是浮水印的角色。
            </p>

            <h2>三、外洩一次的代價，不是道歉就能結束</h2>
            <p>
              個人資料保護法對非公務機關有明確要求：蒐集個資要有特定目的、要告知當事人，
              並且必須採行<strong>適當的安全維護措施</strong>防止資料被竊取、竄改或洩漏。
              沒做到會發生什麼事？
            </p>
            <ul>
              <li>
                <strong>民事賠償：</strong>當事人可請求損害賠償，
                即使無法證明實際損害，法院仍可依法酌定金額；
                受害人一多，就是集體求償。
              </li>
              <li>
                <strong>行政罰鍰：</strong>未採行適當安全維護措施，
                主管機關可命限期改正並處以罰鍰，情節重大者金額相當可觀。
              </li>
              <li>
                <strong>商譽與加盟品牌壓力：</strong>
                房仲品牌對外洩事件極度敏感，一則新聞就足以讓整個分店的來客量掉一段時間。
              </li>
              <li>
                <strong>對客戶的實際傷害：</strong>
                一份乾淨的身分證影本可能被拿去申辦門號、小額信貸、開立人頭帳戶。
                後果有多嚴重，可以看{" "}
                <Link href="/blog/id-copy-leaked-consequences">
                  身分證影本外洩後會發生什麼事
                </Link>
                。
              </li>
            </ul>
            <p>
              關鍵在於：<strong>你無法百分之百保證檔案不外流</strong>——
              手機會遺失、電腦會中毒、同事會誤寄、離職業務會帶走資料。
              既然無法保證，就要讓「外流的那份檔案本身」變得難以被利用。
              這正是浮水印能做到、而權限管控做不到的事。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>四、3 步驟：收到證件就先加浮水印</h2>
            <p>
              整套流程熟練後大約 30 秒，比你把檔案存進資料夾還快。
            </p>

            <h3>Step 1：收到當下就處理，不要先存原始檔</h3>
            <p>
              客戶用 LINE 傳來身分證照片、或你在簽約現場翻拍證件之後，
              <strong>第一個動作是打開浮水印工具，不是轉存到公司資料夾</strong>。
              順序很重要：先加浮水印再歸檔，代表公司系統裡永遠不會存在「乾淨版」；
              先歸檔再說，那個乾淨版就會一直留在那裡，直到某天被翻出來。
            </p>
            <p>
              處理完之後，記得回頭把 LINE 對話裡的原圖與手機相簿裡的翻拍照刪掉。
              這一步最常被跳過，但也是最容易造成外洩的環節——
              業務的個人手機從來不在公司的資安控管範圍內。
            </p>

            <h3>Step 2：浮水印要寫「用途＋對象＋案件編號＋日期」</h3>
            <p>
              一般人加浮水印只會寫「影本」兩個字，那沒有用。
              有效的浮水印必須讓這份影本<strong>只能用在一件事上</strong>，
              寫法有四個要素：
            </p>
            <ul>
              <li>
                <strong>用途：</strong>僅供租賃簽約使用、僅供貸款送件使用
              </li>
              <li>
                <strong>對象：</strong>寫明是給哪一家公司或哪一個單位
              </li>
              <li>
                <strong>案件編號：</strong>房仲專屬的關鍵，
                日後外流時能直接回推是哪一件、哪一位承辦
              </li>
              <li>
                <strong>日期：</strong>證明這份影本的時效範圍
              </li>
            </ul>
            <p>
              加上案件編號是房仲版本跟一般民眾版本最大的差別。
              民眾寫「僅供租屋使用」就夠了；
              你是經手上百件案子的人，沒有編號就無法追查來源。
            </p>

            <h3>Step 3：滿版斜向、透明度 30-40%，批次套用</h3>
            <p>
              位置與透明度會直接決定浮水印有沒有用：
            </p>
            <ul>
              <li>
                <strong>滿版斜向重複</strong>，不要只放在角落——
                角落的浮水印裁切一下就沒了。
              </li>
              <li>
                <strong>透明度 30% 到 40%</strong>，
                太淡等於沒加、太濃會蓋掉證號與照片影響核對。
              </li>
              <li>
                <strong>不要壓在關鍵欄位上</strong>：姓名、身分證字號、出生日期要保持可讀。
              </li>
            </ul>
            <p>
              同一位客戶通常一次給你三、四份文件（身分證正反面、戶籍謄本、在職證明），
              一張一張處理很浪費時間。用<strong>批次功能一次選取全部、套用同一組浮水印文字</strong>，
              處理完打包下載再一起歸檔。做法可參考{" "}
              <Link href="/blog/batch-watermark-guide">批次浮水印的 3 種方法比較</Link>。
            </p>

            <InlineCTA tool="batch" position="mid_article" location={SLUG} />

            <h2>五、房仲情境浮水印範本，直接複製改</h2>
            <p>
              下面這幾組可以直接套用，把括號內容換成你的公司名與案件編號即可：
            </p>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold">情境</th>
                    <th className="text-left py-2 px-3 font-semibold">浮水印文字範本</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">租賃簽約</td>
                    <td className="py-2 px-3">
                      僅供（OO 房屋）租賃契約案件（A1234）核對使用 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">買賣斡旋</td>
                    <td className="py-2 px-3">
                      僅供（OO 房屋）買賣斡旋案件（B5678）身分核對使用 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">送代書 / 地政士</td>
                    <td className="py-2 px-3">
                      僅供（OO 地政士事務所）辦理過戶使用，不得作其他用途 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">送銀行貸款</td>
                    <td className="py-2 px-3">
                      僅供（OO 銀行）房貸申請使用 2026/08/04
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">屋主身分核對</td>
                    <td className="py-2 px-3">
                      僅供（OO 房屋）委託銷售案件（C9012）核對所有權人使用 2026/08/04
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              更多情境的寫法（開戶、保險、監理站等）整理在{" "}
              <Link href="/blog/watermark-templates-guide">
                證件浮水印內容範本：10 種常見情境怎麼寫
              </Link>
              ，客戶問你「這樣寫對嗎」的時候可以直接把連結丟給他。
            </p>

            <h2>六、除了浮水印，房仲證件保管的 5 條 SOP</h2>
            <p>
              浮水印是最後一道保險，前面還有幾件事值得整間店一起做：
            </p>
            <ol>
              <li>
                <strong>只收「這個階段必要」的文件。</strong>
                帶看階段核對正本就好，不要習慣性先要影本。
                客戶問「為什麼要給」的時候，你要能一句話說清楚用途。
              </li>
              <li>
                <strong>告知蒐集目的。</strong>
                收件時明講「這份影本只會用在 OO，保存到 OO 為止」，
                並在公司的個資告知同意書上留下紀錄。這既是法遵要求，也是信任加分項。
              </li>
              <li>
                <strong>禁止用個人通訊軟體長期存放。</strong>
                LINE 群組轉傳最方便也最危險。傳完、處理完就刪，
                正式檔案一律放公司權限管控的空間。
              </li>
              <li>
                <strong>設定刪除時點。</strong>
                沒成交的斡旋案件、看完就沒下文的客戶資料，該刪就刪。
                法定必須保存的另案控管，其餘的留著只是風險。
              </li>
              <li>
                <strong>離職交接要清機。</strong>
                業務離職時，個人裝置裡的客戶證件影本一起清掉並簽確認，
                這是最常被忽略但也最容易出事的漏洞。
              </li>
            </ol>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-blue-900 text-sm">
                <strong>為什麼推薦本機處理的工具：</strong>
                如果你用的浮水印工具會把檔案上傳到它的伺服器，
                等於客戶的身分證又多經過一個第三方——
                而這個第三方不在你的個資告知範圍內。
                <strong>ImageMarker 完全在瀏覽器本機運算，檔案不會離開你的電腦或手機</strong>
                ，免安裝、免註冊，公司電腦有瀏覽器就能用。
              </p>
            </div>

            <h2>七、常見問題 FAQ</h2>
            <h3>Q1：房仲可以要求客戶提供身分證影本嗎？</h3>
            <p>
              可以，但要有明確目的。租賃簽約核對承租人身分、買賣案件依規定確認客戶身分，
              都是合理的蒐集目的。重點在於必須告知蒐集目的與利用範圍、只收必要文件，
              並在目的消失後刪除，而不是無限期留存。
            </p>
            <h3>Q2：客戶不願意給身分證影本怎麼辦？</h3>
            <p>
              先分清楚是「核對」還是「留存」。多數帶看階段只需當場核對正本、確認是本人，
              不需要留下影本。真的需要留存時，可以主動提出替代方案：
              請客戶自己先加浮水印再傳、遮蔽非必要欄位、
              或當面拍攝後由你當場加浮水印給客戶確認。
              願意主動提出保護做法的房仲，反而更容易取得信任。
            </p>
            <h3>Q3：加了浮水印會影響簽約或送件效力嗎？</h3>
            <p>
              只要浮水印是半透明、沒有蓋掉姓名、證號、照片等必要欄位，一般不影響核對與存檔。
              若對方是銀行、地政士或公務機關，建議事先確認能否接受帶浮水印的影本，
              多數單位是接受的，因為浮水印本身就是常見的防冒用做法。
            </p>
            <h3>Q4：客戶證件要保存多久？</h3>
            <p>
              依用途而定。單純為了核對身分而收的影本，目的達成後就應刪除；
              依洗錢防制相關規定辦理確認客戶身分而留存的資料則有法定保存年限，
              應依主管機關最新規定與公司法遵政策辦理，不要憑印象決定。
            </p>
            <h3>Q5：存在 LINE 對話紀錄裡有風險嗎？</h3>
            <p>
              風險很高。帳號被盜、手機遺失、換機備份外流，都可能讓整串對話裡的證件影本一次外洩，
              而且業務離職後檔案仍留在個人裝置上，公司無法控管。
              正確做法是處理完浮水印後存進公司指定的權限管控空間，並刪除個人裝置上的副本。
            </p>
            <h3>Q6：有沒有不用上傳雲端的批次浮水印工具？</h3>
            <p>
              有。ImageMarker 完全在瀏覽器本機處理，證件影本不會傳到任何伺服器，
              也不需要安裝軟體或註冊帳號，可以一次選取多張文件套用同一組浮水印再打包下載。
              對房仲來說，這代表客戶個資不會多經手一個第三方雲端。
            </p>

            <h2>結語：這是專業度，不是麻煩</h2>
            <p>
              客戶把身分證交給你的那一刻，其實是把信任交給你。
              大部分房仲不會出事，是因為運氣好，不是因為做了什麼保護。
              而只要出一次事，賠的是錢，毀的是這幾年累積的口碑。
            </p>
            <p>
              現在多做 30 秒的動作，換來的是：
              <strong>就算檔案外流，那份影本也用不了</strong>。
              更進一步，帶看時主動跟客戶說「我們收到的證件都會加註用途浮水印」，
              這句話本身就是差異化——客戶對房仲最大的疑慮之一就是個資，
              你直接把它變成賣點。
            </p>
            <p>
              現在就試一次：{" "}
              <a href="https://imagemarker.app" target="_blank" rel="noopener noreferrer">
                https://imagemarker.app
              </a>
              ，免費、免註冊、檔案不上傳。
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
            <Link href="/blog/hr-onboarding-watermark-sop">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  人資到職文件浮水印 SOP：新人證件影本這樣收才合規
                </h3>
                <p className="text-sm text-muted-foreground">
                  同樣是每天收證件影本的職位，HR 的合規壓力更大。一套可以直接寫進公司規範的收件流程。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/landlord-asks-for-id">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  房東要求提供證件影本，我該給嗎？完整分析
                </h3>
                <p className="text-sm text-muted-foreground">
                  站在客戶那一側的觀點。看懂客戶在擔心什麼，你才知道怎麼開口要文件。
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
                  租屋、求職、開戶、簽證……每種情境的證件浮水印該寫什麼？完整範本直接套用。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/rent-required-documents">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  租屋簽約要交哪些文件？身分證影本安全交付指南
                </h3>
                <p className="text-sm text-muted-foreground">
                  租賃案件的必備文件清單，哪些該收、哪些可以不收，一次列清楚。
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
