import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { InlineCTA } from "@/components/InlineCTA";
import { PopularTools } from "@/components/PopularTools";
import { SiteFooter } from "@/components/SiteFooter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
  howToSchema,
} from "@/lib/seo";

const SLUG = "watermark-hkid";

const URL = "https://imagemarker.app/blog/watermark-hkid";

const HEADLINE = "身份證副本加水印完全指南：保護你的香港身份證";

const DESCRIPTION =
  "開銀行戶口、租樓、搵工、簽電訊商合約都要交身份證副本。本文教你水印應該寫什麼、哪些欄位可以遮蔽，以及 PDPO 下你可以問對方什麼。全程在瀏覽器處理，不會上載。";
const OG = "https://imagemarker.app/og/zh/watermark-hkid.png";

export default function WatermarkHkid() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: "身份證副本加水印完全指南｜保護香港身份證 | ImageMarker",
      description: DESCRIPTION,
      canonical: URL,
      locale: "zh_HK",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-08-17",
          dateModified: "2026-08-17",
          image: OG,
        }),
        blogBreadcrumb(HEADLINE, URL, "zh"),
        howToSchema({
          name: "香港身份證副本加水印的方法",
          description:
            "交出香港身份證副本之前，在瀏覽器內加上寫明對象、用途、日期的水印，全程不會上載到任何伺服器。",
          steps: [
            {
              name: "打開工具",
              text: "用手機或電腦的瀏覽器打開 imagemarker.app，不用安裝任何 App，也不用登記帳戶。",
            },
            {
              name: "揀相並輸入文字",
              text: "選擇身份證的相片，然後輸入「對象 + 用途 + 日期」，例如「僅供匯豐銀行開戶之用 2026年8月17日」。",
            },
            {
              name: "開啟重複平鋪並調校透明度",
              text: "開啟重複（平鋪）模式令水印鋪滿整張相，透明度調到 30 至 50%，令水印清楚可讀，底下的證件資料同樣看得到。",
            },
            {
              name: "下載並交出加了水印的版本",
              text: "確認姓名、身份證號碼、相片仍然清晰之後下載，只交出有水印的版本，並刪除未加水印的原圖。",
            },
          ],
        }),
        faqSchema([
          {
            q: "對方堅持要一份沒有水印的「乾淨」副本，可以怎樣處理？",
            a: "先問清楚三件事：影印副本的目的是什麼、會保存多久、誰會看到。根據《個人資料（私隱）條例》，收集個人資料必須有與其職能直接相關的合法目的，收集的資料亦不得超乎適度。如果對方講不出理由，卻堅持要一份完全沒有標記的身份證副本，你有理由提高警覺，並可以提出出示正本核對代替交出副本。",
          },
          {
            q: "加了水印，副本還算不算有效？合約會不會有問題？",
            a: "水印只是在副本上疊一層半透明文字，不會遮蓋或改動證件內容，正本亦完全不受影響。合約的效力來自雙方簽署的條款，而不是那份副本。要留意的是水印本身沒有特定法律效力，它的作用是阻嚇、標明副本的來源與用途，令副本被拿去冒名使用時價值大減。",
          },
          {
            q: "身份證副本可以遮住哪些部分？",
            a: "視乎對方真正需要什麼。如果只是核對姓名與身份，遮蓋身份證號碼中間幾位（例如 A12***(7)）通常已經足夠。但開銀行戶口這類受《打擊洗錢及恐怖分子資金籌集條例》規管的手續，銀行必須完成客戶盡職審查，號碼要保留。原則是：給最少的資料去達成那個目的，其餘一律遮住。",
          },
          {
            q: "身份證上的符號代碼代表什麼？要不要遮？",
            a: "香港身份證上印有代碼，反映持證人的居留狀況與登記資料，例如 A 代表擁有香港居留權、U 代表在報稱的出生日期時居留不受入境事務處處長限制、Z 代表報稱在香港出生，三粒星則代表 18 歲或以上持有成人身份證。這些代碼會透露居留身份，如果對方只是核對姓名，是可以一併遮蔽的欄位之一。",
          },
          {
            q: "我的副本會不會被上載到伺服器？",
            a: "不會。ImageMarker 是 100% 瀏覽器本機處理，你揀的相片由頭到尾只留在你部機裡面，不會傳去任何伺服器。你甚至可以先關掉網絡再用，功能一樣正常，這也是最簡單的驗證方法。",
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
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            部落格
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time
              dateTime="2026-08-17"
              className="text-sm text-muted-foreground"
            >
              2026年8月17日
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              身份證副本加水印完全指南：保護你的香港身份證
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              在香港，交身份證副本幾乎是日常。開銀行戶口要、租樓要、入職要、買電話台要，連健身房會籍、屋苑訪客登記、快遞代收都會有人開口問。大部分人拎起手機影一張，WhatsApp 一 send 就當完成，之後那張相去了哪裡、由誰保管、幾時銷毀，完全無從得知。
            </p>
            <p>
              問題就在這裡：副本一旦交出去，就收不回來。這篇會講清楚一張身份證副本到底洩露了什麼、《個人資料（私隱）條例》給了你什麼談判空間，然後用四個最常見的場景，示範水印應該寫什麼、哪些欄位可以遮。整個流程一分鐘，而且全程在你部機裡面完成。
            </p>

            <h2>一張副本，究竟洩露了什麼</h2>
            <p>
              比多數人以為的多。香港身份證上除了中英文姓名、出生日期、簽發日期和相片之外，還有兩樣容易被忽略的東西。
            </p>
            <p>
              第一是<strong>身份證號碼</strong>。格式是一至兩個英文字母、七個數字，加上括號內的校驗碼，例如 A123456(7)。它在香港幾乎是萬用識別碼，銀行、電訊商、政府部門、醫療機構全部都用它來對人。
            </p>
            <p>
              第二是<strong>符號代碼</strong>，就是印在證件上那幾個英文字母和星號。它們反映持證人的居留狀況與登記資料，常見的包括：
            </p>
            <ul>
              <li>
                <strong>***</strong>（三粒星）：持證人年滿 18 歲或以上，持有成人身份證。
              </li>
              <li>
                <strong>A</strong>：持證人擁有香港居留權。
              </li>
              <li>
                <strong>R</strong>：持證人擁有香港入境權。
              </li>
              <li>
                <strong>U</strong>：持證人在報稱的出生日期時，在香港的居留不受入境事務處處長限制。
              </li>
              <li>
                <strong>C</strong>：持證人在報稱的出生日期時，在香港的居留受入境事務處處長的條件限制。
              </li>
              <li>
                <strong>Z</strong>：持證人報稱在香港出生。
              </li>
            </ul>
            <p>
              換句話說，副本除了講出你是誰，還講出你的居留身份與出生地。如果對方只是想核對姓名，這一部分其實完全沒必要交出去——但幾乎沒有人想到要遮。
            </p>

            <h2>副本流出之後，會發生什麼事</h2>
            <ul>
              <li>
                <strong>被冒名開戶口或借貸。</strong>
                財務公司的網上申請門檻不高，一份乾淨的副本加上其他資料，足以用你的名義申請。你通常要等到收數電話或者自己申請貸款被拒，才會發現。
              </li>
              <li>
                <strong>被用來做傀儡戶口。</strong>
                詐騙集團需要大量以真人名義開立的戶口過數。當戶口被凍結、被列為可疑，掛住的是你的名字，處理起來牽涉報警與銀行調查，不是打個電話就解決。
              </li>
              <li>
                <strong>被拿去登記電話卡。</strong>
                香港的電話智能卡實名登記制自 2021 年起分階段推行，2023 年 2 月起所有預付卡都必須完成登記。正因為要實名，一張登記在你名下的卡對騙徒特別有價值——用來行騙時，追查方向會指向你。
              </li>
              <li>
                <strong>求職騙案。</strong>
                「先交身份證副本確認面試名額」是最有效的收集手法之一，因為它包裝在一份工作的期望裡面。
              </li>
            </ul>
            <p>
              留意這幾種情況的共通點：全部都不需要你的身份證正本，只需要一張<strong>乾淨、無標記、看起來像為那件事而準備</strong>的副本。水印要拿走的，正正是這一點。
            </p>

            <h2>PDPO 給了你什麼談判空間</h2>
            <p>
              香港《個人資料（私隱）條例》（第 486 章，一般叫 PDPO）比多數人用得上的多。當中的保障資料原則裡，有三條在這件事上特別有用：
            </p>
            <ul>
              <li>
                <strong>第 1 原則（收集目的及方式）：</strong>
                收集個人資料必須有合法且與收集者的職能或活動直接相關的目的，資料要有需要、不得超乎適度，而且收集方式必須合法及公平。收集時亦要告知你目的，以及資料可能會轉交哪類人士。
              </li>
              <li>
                <strong>第 3 原則（使用）：</strong>
                資料只可用於收集時所述的目的或直接相關的目的，要作其他用途須另行取得你的同意。
              </li>
              <li>
                <strong>第 6 原則（查閱及改正）：</strong>
                你有權查閱對方持有關於你的個人資料，以及要求改正。
              </li>
            </ul>
            <p>
              另外值得知道的是，個人資料私隱專員公署（PCPD）就身份證號碼與其他個人識別資料發出過實務守則，當中的取態很明確：<strong>不應在沒有需要的情況下收集身份證號碼或影印身份證</strong>。實務守則本身不是法例，但它是專員在處理投訴時的重要參考。
            </p>
            <p>
              你不需要在櫃檯上背條文。兩句就夠：「呢份副本係用嚟做咩？會保存幾耐？」正經的機構答得出，答不出的猶豫本身就是資訊。真的覺得對方收得過火，可以向 PCPD 投訴。
            </p>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
            />

            <h2>水印應該寫什麼</h2>
            <p>
              三樣，缺一不可：<strong>對象 + 用途 + 日期</strong>。
            </p>
            <p>
              <strong>差的例子：</strong>
              <br />
              「副本」、「COPY」、「複印本」
            </p>
            <p>
              <strong>好的例子：</strong>
              <br />
              「僅供匯豐銀行開戶之用 2026年8月17日」
            </p>
            <p>
              三樣各有作用。寫上<strong>對象</strong>，副本拿去另一間機構就明顯格格不入，而且日後真的流出，你追查得到是哪一次交出去的。寫上<strong>用途</strong>，即使同一個對象，也難以挪去做別的手續。寫上<strong>日期</strong>，副本就會「過期」——一張三年前的副本在今日出現，本身就是一個要解釋的問題，乾淨的副本則永遠不會引起懷疑。
            </p>
            <p>
              寫全名，不要用縮寫，知道分行的話連分行一齊寫。「僅供中銀香港旺角分行開戶之用」比「僅供銀行用」難重用得多。
            </p>

            <h2>三步驟加水印</h2>
            <p>
              保護證件副本最穩陣的方法，是由頭到尾都不要把它放上網。
              <Link href="/">ImageMarker</Link>{" "}
              <strong>全程在你的瀏覽器內處理</strong>
              ，相片不會傳送到任何伺服器。處理身份證這類文件，這一點比任何功能都重要。
            </p>

            <h3>步驟一：打開工具，揀相</h3>
            <p>
              用手機或電腦的瀏覽器打開{" "}
              <Link href="/">imagemarker.app</Link>{" "}
              ，不用安裝 App，也不用登記帳戶。揀你影好的身份證相片，相片全程留在你部機裡面。
            </p>

            <h3>步驟二：打字、開重複平鋪、調透明度</h3>
            <p>
              輸入「對象 + 用途 + 日期」，然後<strong>開啟重複（平鋪）模式</strong>，令水印鋪滿整張相。只在角落加一個標記，對方裁一刀就無晒。透明度建議{" "}
              <strong>30 至 50%</strong>
              ，水印要清楚讀得到，底下的姓名、號碼、相片同樣要看得清。
            </p>

            <h3>步驟三：下載，只交有水印的一份</h3>
            <p>
              下載前放大檢查一次：姓名、身份證號碼、相片是否仍然清晰。對方讀不到就要你重交，反而更麻煩。確認好之後只交有水印的版本，並把未加水印的原圖從相簿與下載資料夾刪走，免得日後手快傳錯。
            </p>
            <p>
              順帶一提，怎樣分辨一個線上工具有沒有偷偷上載你的相片？先開飛行模式，再用它加水印。如果離線都做得完，處理就是真的在你部機裡面發生。
            </p>

            <h2>四個常見場景</h2>

            <h3>開銀行戶口</h3>
            <p>
              這是少數真的需要完整副本的情況。銀行受《打擊洗錢及恐怖分子資金籌集條例》規管，必須完成客戶盡職審查，核實身份並按規定保存紀錄。在這裡遮蓋身份證號碼，只會令申請被退回。
            </p>
            <p>
              所以這一場景是<strong>加水印而不是遮蔽</strong>：寫「僅供〇〇銀行〇〇分行開戶之用 + 日期」，透明度調淺一點，方便櫃檯掃描。這也是副本對騙徒價值最高的一個場景，正因如此，把它綁死在一間銀行、一個日期上面才特別值得。
            </p>

            <h3>租樓</h3>
            <p>
              分兩個階段看。<strong>睇樓</strong>階段基本上不需要交任何副本，出示正本核對就夠。業主或地產代理在未有任何協議之前就要留一份副本，收集的已經超乎當下需要。
            </p>
            <p>
              到<strong>簽租約</strong>階段就合理了。水印寫上業主或代理行名稱、「僅供租賃用途」、日期。租樓這一塊的細節（包括業主可不可以要求、遇到堅持要乾淨副本時怎樣應對）另有一篇寫得更深入，見{" "}
              <Link href="/blog/hk-rent-id-copy-watermark">
                香港租屋交身份證副本前，一定要加浮水印保護
              </Link>
              。
            </p>

            <h3>搵工</h3>
            <p>
              時機就是最重要的訊號。<strong>入職</strong>之後，僱主為強積金、稅務申報需要你的身份證資料，這是正常的。
            </p>
            <p>
              但<strong>申請</strong>階段不是。未見過面、未收到聘書、對方公司未經核實，就要你在通訊軟件傳身份證副本，這是求職騙案最常見的形狀。真的要交，水印寫上公司全名與「僅供入職手續之用」；而請求出現的時機，比水印本身更值得你留意。
            </p>

            <h3>電訊商合約</h3>
            <p>
              實名登記制之下，開台或買預付卡都要核實身份，所以出示或交副本是預期之內。真正不必要的，是一間小店或第三方代理長期保存一份你的副本。可以的話，去官方門市辦理，不要讓副本留在店員的手機相簿裡面。
            </p>
            <p>
              水印寫「僅供〇〇電訊登記電話卡之用 + 日期」。日後這張副本若果出現在另一間電訊商或者貸款申請上面，不對版是寫在臉上的。
            </p>

            <h2>除了水印，還可以做的幾件事</h2>
            <ul>
              <li>
                <strong>遮蔽對方用不着的欄位。</strong>
                符號代碼、簽發日期，甚至身份證號碼中間幾位，只要那個用途不需要就可以遮。要用馬賽克或色塊完全蓋住，輕微模糊擋不住數字，放大依然讀得出。
              </li>
              <li>
                <strong>清除 EXIF 資料。</strong>
                用手機影身份證，相片通常連 GPS 座標一齊記低，而那個座標多數就是你屋企。香港身份證上根本沒有印住址，反而是那張相把位置補了上去。傳出去之前先清走。
              </li>
              <li>
                <strong>小心 WhatsApp 自動儲存。</strong>
                一張相 send 出去，幾秒之內就存在兩部手機的相簿，再備份上兩個雲端帳戶。有官方上載渠道的話，優先用官方渠道。
              </li>
              <li>
                <strong>手續完成後要求刪除。</strong>
                依 PDPO，個人資料的保留時間不應超過達成目的所需。開口講一句，對方的處理方式往往就會不同。
              </li>
            </ul>

            <InlineCTA
              tool="exif-clean"
              position="mid_article"
              location={SLUG}
            />

            <h2>常見問題</h2>
            <p>
              <strong>問：對方堅持要一份沒有水印的「乾淨」副本，可以怎樣處理？</strong>
              <br />
              答：先問清楚三件事：影印副本的目的是什麼、會保存多久、誰會看到。根據 PDPO，收集個人資料必須有與其職能直接相關的合法目的，收集的資料亦不得超乎適度。如果對方講不出理由，卻堅持要一份完全沒有標記的身份證副本，你有理由提高警覺，並可以提出出示正本核對代替交出副本。
            </p>
            <p>
              <strong>問：加了水印，副本還算不算有效？合約會不會有問題？</strong>
              <br />
              答：水印只是在副本上疊一層半透明文字，不會遮蓋或改動證件內容，正本亦完全不受影響。合約的效力來自雙方簽署的條款，而不是那份副本。要留意的是水印本身沒有特定法律效力，它的作用是阻嚇、標明副本的來源與用途，令副本被拿去冒名使用時價值大減。
            </p>
            <p>
              <strong>問：身份證副本可以遮住哪些部分？</strong>
              <br />
              答：視乎對方真正需要什麼。如果只是核對姓名與身份，遮蓋身份證號碼中間幾位（例如 A12***(7)）通常已經足夠。但開銀行戶口這類受《打擊洗錢及恐怖分子資金籌集條例》規管的手續，銀行必須完成客戶盡職審查，號碼要保留。原則是：給最少的資料去達成那個目的，其餘一律遮住。
            </p>
            <p>
              <strong>問：身份證上的符號代碼代表什麼？要不要遮？</strong>
              <br />
              答：香港身份證上印有代碼，反映持證人的居留狀況與登記資料，例如 A 代表擁有香港居留權、U 代表在報稱的出生日期時居留不受入境事務處處長限制、Z 代表報稱在香港出生，三粒星則代表 18 歲或以上持有成人身份證。這些代碼會透露居留身份，如果對方只是核對姓名，是可以一併遮蔽的欄位之一。
            </p>
            <p>
              <strong>問：我的副本會不會被上載到伺服器？</strong>
              <br />
              答：不會。ImageMarker 是 100% 瀏覽器本機處理，你揀的相片由頭到尾只留在你部機裡面，不會傳去任何伺服器。你甚至可以先關掉網絡再用，功能一樣正常，這也是最簡單的驗證方法。
            </p>

            <h2>一分鐘，換一份安心</h2>
            <p>
              在香港生活，交身份證副本躲不掉。但那份副本日後可以走到多遠，交出去之前其實由你決定：只交對方真正需要的、遮起用不着的、把對象用途日期寫滿整張相、清走 EXIF。分別就在於——一份到處都用得着的副本，和一份只在一個地方用得着的副本。
            </p>
            <p>
              下次有人開口要身份證副本，先過來加個水印：{" "}
              <Link href="/">imagemarker.app</Link>
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <a
                href="https://ko-fi.com/justinlee2061"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                ☕ 如果這篇文章幫到你，請我喝杯咖啡
              </a>
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              交出副本之前，先加個水印
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              免費、不用登記，100% 在瀏覽器內處理，相片不會上載。
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              免費為身份證加水印<ReadMoreArrow />
            </Link>
          </div>
        </article>

        {/* 熱門工具快速入口 */}
        <PopularTools location={SLUG} className="mt-12" />

        {/* 相關文章 */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">相關文章</h2>
          <div className="space-y-4">
            <Link href="/blog/hk-rent-id-copy-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  香港租屋交身份證副本前，一定要加浮水印保護
                </h3>
                <p className="text-sm text-muted-foreground">
                  專講租樓那一塊：業主可不可以要求副本、遇到堅持要乾淨副本時怎樣應對。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/id-copy-leaked-consequences">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分證影本外洩會有什麼後果？真實案例與自保方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  證件副本一旦流出，可能被拿去做什麼？了解實際風險，才知道為什麼要加水印。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/privacy-protection-toolkit">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  2026 個資安全工具箱：浮水印 + 馬賽克 + EXIF 清除
                </h3>
                <p className="text-sm text-muted-foreground">
                  只加水印其實只擋掉三分之一，三道防線一次講清楚。
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
