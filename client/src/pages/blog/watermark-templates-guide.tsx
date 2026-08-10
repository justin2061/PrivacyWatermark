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
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/watermark-templates-guide";
const SLUG = "watermark-templates-guide";
// 標題前綴「身分證影本簽註寫法」不動（該字群目前排名 1.9–4.2，是本頁最大資產），
// 只改後半：補上「加註位置」承接卡在 7–8 名的位置類查詢，並把「證件浮水印範本」
// 換成 GSC 實際有排名的「證件浮水印範例」（原本 2.5 名，改成字面完全命中）。
const TITLE =
  "身分證影本簽註寫法＋加註位置：10 種情境範本與證件浮水印範例（2026）";
const OG = "https://imagemarker.app/og/zh/watermark-templates-guide.png";

export default function WatermarkTemplatesGuidePage() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: `${TITLE} | ImageMarker`,
      // 這頁排名 6.1 但 CTR 只有 7.4%（第 6 名的合理值是 10%+），問題在描述本身。
      // 改成把最能誘發點擊的元素前置：年份、數量（10 種）、「範例」「直接照抄」，
      // 疑問句改成承諾句，結尾補「3 步驟」給想立刻動手的人。
      description:
        "【2026 最新】10 種情境的身分證影本簽註範例，直接照抄就能用。簽註寫法三行格式、加註位置放哪才不會被裁掉、正反面規則一次講清楚，另附 3 步驟免費做出證件浮水印。",
      canonical: URL,
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "身分證影本簽註寫法與加註位置完整教學：手寫三行簽註格式、簽註要寫在影本哪個位置、正反面規則，＋10 種常見情境文字範本。",
          url: URL,
          datePublished: "2026-04-10",
          dateModified: "2026-08-09",
        }),
        faqSchema([
          {
            q: "身分證影本簽註寫法要怎麼寫才對？",
            a: "手寫簽註要分三行、用藍色原子筆、每行文字後劃一條橫線防止被補寫，部分筆畫與證件文字交叉或接觸，且不可遮蔽姓名與身分證字號等重要欄位。內容用「用途＋對象＋日期」，例如「僅供 OO 銀行申辦信用卡使用 2026/07/01」。",
          },
          {
            q: "簽註要寫什麼內容？",
            a: "只要三個要素：用途（為什麼交這張影本）、對象（交給誰／哪家公司）、日期（提供當天）。合起來就是「僅供 OO 銀行申辦信用卡使用 2026/08/09」。三者缺一都會讓限制失效——沒有對象等於誰都能用，沒有日期等於永久有效。",
          },
          {
            q: "簽註要寫在影本的哪個位置？",
            a: "寫在證件影像本身上、與欄位文字部分交疊，最好斜跨版面，不要只寫在紙張上下方的空白邊緣——邊緣的註記一刀就能裁掉。同時要避開姓名、身分證字號與照片的正上方，讓對方仍能辨識，這是簽註和塗黑最大的差別。",
          },
          {
            q: "身分證影本正反面都要簽註嗎？",
            a: "都要。正反面是兩張獨立的影像，只註記其中一面，另一面就是一張沒有任何限制的乾淨影本，可以單獨被拿去使用。兩面各自寫上完整的「用途＋對象＋日期」。",
          },
          {
            q: "租屋要交身分證影本，簽註怎麼寫？",
            a: "寫「僅供 OO 房東／OO 仲介租屋契約使用 2026/08/09」，把對象寫到實際的房東姓名或仲介公司名，不要只寫「租屋使用」。若當下還不確定簽約對象，至少要有日期＋租屋用途。",
          },
          {
            q: "護照影本的簽註要寫在哪裡？",
            a: "護照影本簽註寫在資料頁影像上、跨過底色區域，但要避開姓名、護照號碼、出生日期與機器可判讀區（頁面最下方兩行英數字）。內容同樣是「僅供 OO 旅行社辦理簽證使用 2026/08/09」。",
          },
          {
            q: "對方不接受有浮水印或簽註的影本怎麼辦？",
            a: "內政部即建議在影本上加註用途，正當的公司與機構都會接受。堅持要乾淨影本的反而要提高警覺，這不符合個資保護慣例。",
          },
          {
            q: "簽註一定要加日期嗎？",
            a: "非常必要。日期限定影本的有效時間，事後被挪作他用時法律上站不住腳，也讓濫用更容易被追溯。",
          },
          {
            q: "公司報到要交身分證影本，註記怎麼寫？",
            a: "寫「僅供 OO 公司到職報到／人資備存使用 2026/07/01」，明確限定公司與用途即可。",
          },
          {
            q: "手機拍的身分證影本也能加簽註或浮水印嗎？",
            a: "可以。用 ImageMarker 在手機瀏覽器就能加數位浮水印，免安裝 App；不方便手寫時，數位浮水印可調透明度、覆蓋範圍更好控制。",
          },
          {
            q: "影本加註和浮水印有什麼不同？哪個比較有效？",
            a: "加註（簽註）是用筆手寫在紙本影本上的用途註記，浮水印是用軟體加在電子檔上的半透明文字。兩者都遵守「用途＋對象＋日期」原則，但數位浮水印可以覆蓋整張證件、與影像融合，比手寫加註更難被裁切或修圖去除。紙本親手交付用手寫加註即可，電子檔傳送則務必用數位浮水印，兩者並用防護最完整。",
          },
        ]),
        blogBreadcrumb("身分證影本簽註寫法＋加註位置", URL),
      ],
    });
    return cleanup;
  }, []);

  const templates = [
    { num: 1, title: "租屋", template: "僅供 {OO房東/仲介} 租屋用途 2026/XX/XX" },
    { num: 2, title: "求職", template: "僅供 {OO公司} 徵才審核 2026/XX/XX" },
    { num: 3, title: "銀行開戶", template: "僅供 {OO銀行} 開戶使用 2026/XX/XX" },
    { num: 4, title: "辦手機門號", template: "僅供 {中華電信/台灣大哥大} 申辦門號 2026/XX/XX" },
    { num: 5, title: "保險投保", template: "僅供 {OO人壽} 投保使用 2026/XX/XX" },
    { num: 6, title: "申請信用卡", template: "僅供 {OO銀行} 申辦信用卡 2026/XX/XX" },
    { num: 7, title: "汽機車過戶", template: "僅供 OO 過戶使用 2026/XX/XX" },
    { num: 8, title: "辦貸款", template: "僅供 {OO銀行} 貸款申請 2026/XX/XX" },
    { num: 9, title: "政府機關申辦", template: "僅供 {戶政/地政/監理站} 申辦使用 2026/XX/XX" },
    { num: 10, title: "公司行政（報稅／薪轉）", template: "僅供 {OO公司} 人資備存 2026/XX/XX" },
  ];

  const templateDetails = [
    {
      num: 1, title: "租屋",
      when: "租房子時，房東或仲介要求提供身分證影本確認租客身份。",
      template: "僅供 {OO房東/仲介} 租屋用途 2026/XX/XX",
      tip: "把「OO房東/仲介」換成實際姓名或公司名稱，如「大安仲介公司」。若尚不確定，可先寫「租屋用途」。"
    },
    {
      num: 2, title: "求職",
      when: "應徵工作時，雇主在背景調查或入職流程要求提供身分證影本。",
      template: "僅供 {OO公司} 徵才審核 2026/XX/XX",
      tip: "面試前提供就寫「徵才審核」，錄取後入職用就改為「僅供 OO公司 到職備存」。"
    },
    {
      num: 3, title: "銀行開戶",
      when: "到銀行新開存款帳戶或投資帳戶，行員要求留存身分證影本。",
      template: "僅供 {OO銀行} 開戶使用 2026/XX/XX",
      tip: "各大銀行對帶有浮水印的影本接受度高，這是主管機關建議的標準作法。"
    },
    {
      num: 4, title: "辦手機門號",
      when: "申辦或轉移電信門號，電信公司要求核驗身份。",
      template: "僅供 {中華電信/台灣大哥大} 申辦門號 2026/XX/XX",
      tip: "填上實際申辦的電信業者名稱，防止影本被拿去申辦其他電信商的門號。"
    },
    {
      num: 5, title: "保險投保",
      when: "購買人壽、醫療、車險等保險產品，保險公司或業務員需要核驗身份。",
      template: "僅供 {OO人壽} 投保使用 2026/XX/XX",
      tip: "若是透過保險業務員投保，建議把業務員姓名也加進去，如「僅供 OO 業務 OO人壽投保 2026/XX/XX」。"
    },
    {
      num: 6, title: "申請信用卡",
      when: "線上或臨櫃申請信用卡，銀行要求上傳或提供身分證影本。",
      template: "僅供 {OO銀行} 申辦信用卡 2026/XX/XX",
      tip: "線上申請時，上傳前記得用 ImageMarker 加好浮水印再拍照或截圖上傳。"
    },
    {
      num: 7, title: "汽機車過戶",
      when: "二手車/機車買賣，賣方或監理站需要買賣雙方的身分證影本辦理過戶。",
      template: "僅供 OO 過戶使用 2026/XX/XX",
      tip: "「OO」填車牌號碼或是對方姓名皆可，讓影本和這筆交易明確綁定。"
    },
    {
      num: 8, title: "辦貸款",
      when: "申請房貸、車貸、信用貸款，金融機構要求提供身分識別文件。",
      template: "僅供 {OO銀行} 貸款申請 2026/XX/XX",
      tip: "貸款資料往往會在多個部門流轉，浮水印格外重要。可加上「勿作他用」字樣。"
    },
    {
      num: 9, title: "政府機關申辦",
      when: "戶籍異動、地籍申請、駕照換發等，需要提交身分文件影本。",
      template: "僅供 {戶政/地政/監理站} 申辦使用 2026/XX/XX",
      tip: "政府機關原則上不拒絕有浮水印的影本，這是個資保護的合法作法。"
    },
    {
      num: 10, title: "公司行政（報稅／薪轉）",
      when: "到職時人資部門要求提供身分證影本作為薪轉帳戶設定或報稅用途。",
      template: "僅供 {OO公司} 人資備存 2026/XX/XX",
      tip: "公司內部流通的影本也需要保護。若是報稅用，可寫「僅供 OO公司 報稅備存 2026/XX/XX」。"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-3">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white text-sm" role="img" aria-label="相機">📷</span>
              </div>
              <span className="font-semibold text-gray-900">ImageMarker</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6" aria-label="breadcrumb">
          <Link href="/" className="hover:text-primary">首頁</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-primary">部落格</Link>
          <span>›</span>
          <span className="text-gray-900">簽註寫法與加註位置</span>
        </nav>

        <article className="bg-white rounded-xl shadow-sm p-8">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium mb-3">
              <span>實用指南</span>
              <span>·</span>
              <span>範本</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              身分證影本簽註寫法＋加註位置：10 種情境範本與證件浮水印範例（2026）
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time dateTime="2026-04-10">2026 年 4 月 10 日</time>
              <span>·</span>
              <span>最後更新 2026/08/09</span>
              <span>·</span>
              <span>閱讀約 10 分鐘</span>
            </div>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>前言</h2>
            <p>
              證件影本交出去後的命運你無法控制。在影本上<strong>簽註</strong>（也叫加註）限定用途，
              是最簡單有效的自保方式，但多數人卡在兩個問題：<strong>簽註寫法要怎麼寫</strong>，
              以及<strong>加註位置該放在哪</strong>。這篇一次把兩件事講完——手寫三行的正確格式、
              位置規則與各種證件的建議位置，再附上 10 種台灣常見情境的簽註範本與證件浮水印範例，
              直接照抄就能用。電子檔要傳出去的話，也可以用免費的
              <Link href="/">浮水印產生器</Link>
              把同一段文字做成數位浮水印。
            </p>

            <h2>身分證影本加註 vs 浮水印：差在哪？該選哪個？</h2>
            <p>
              保護證件影本有兩種主流做法，很多人分不清楚：<strong>身分證影本加註</strong>是用筆<strong>手寫（或列印）文字直接寫在影本上</strong>，標明用途與日期；<strong>浮水印</strong>則是用軟體在電子檔上疊一層<strong>半透明的覆蓋文字</strong>。兩者目的相同——限定影本只能用在特定用途、防止被冒用——但實作方式與防護力差很多。
            </p>
            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">比較項目</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">身分證影本加註（手寫）</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">數位浮水印</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">做法</td>
                    <td className="p-3 border border-gray-200 text-gray-600">用筆寫在紙本影本上</td>
                    <td className="p-3 border border-gray-200 text-gray-600">軟體在電子檔疊半透明文字</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">會不會遮住證件內容</td>
                    <td className="p-3 border border-gray-200 text-gray-600">容易寫歪、可能蓋到姓名或號碼</td>
                    <td className="p-3 border border-gray-200 text-gray-600">可調透明度，看得到浮水印也看得到內容</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">大量／重複使用</td>
                    <td className="p-3 border border-gray-200 text-gray-600">每張都要重寫，無法自動化</td>
                    <td className="p-3 border border-gray-200 text-gray-600">範本一鍵套用，可批次處理多張</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">傳電子檔（LINE／Email）</td>
                    <td className="p-3 border border-gray-200 text-gray-600">手寫字可能被裁切或修圖抹除</td>
                    <td className="p-3 border border-gray-200 text-gray-600">與影像像素融合，更難去除</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">美觀與辨識度</td>
                    <td className="p-3 border border-gray-200 text-gray-600">字跡潦草時對方不易辨認</td>
                    <td className="p-3 border border-gray-200 text-gray-600">字體工整、位置精準，較美觀</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>結論：能用數位浮水印就用浮水印。</strong>身分證影本加註在你「當面交付紙本」時仍然管用，但只要影本是用手機拍照、LINE 或 Email 傳送，就一律建議改用數位浮水印——它不會遮擋證件內容、可以一鍵套用範本自動化處理、字體工整更美觀，也更難被裁切或修圖去除。真正萬無一失的做法，是<strong>先在電子檔加好浮水印再列印或傳送</strong>，這樣連印出來的紙本都自帶標記。下面的簽註寫法規則與 10 種範本，手寫加註與數位浮水印都適用。
            </p>
            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>身分證影本簽註寫法：手寫三行的正確做法</h2>
            <p>
              先講最常被問的兩件事：<strong>簽註要寫什麼</strong>——用途、對象、日期三個要素，
              少一個限制就形同失效；<strong>簽註要寫在哪</strong>——寫在證件影像上並與欄位文字交疊，
              不要只寫在紙張邊緣。下面把規則、位置與正反面的處理方式一次講完。
            </p>
            <p>
              最傳統、也最多人問的「簽註寫法」是<strong>手寫在影本上</strong>。正確寫法其實有固定規則，照著做才有防護效果：
            </p>
            <ol>
              <li><strong>用藍色原子筆</strong>：正反兩面都要簽註，藍筆較能辨識是後加、不易被塗改。</li>
              <li><strong>分三行書寫</strong>：例如「1. 僅提供 OO 銀行　2. 申辦 OO 信用卡　3. 他用無效」。</li>
              <li><strong>每行文字後劃一條橫線</strong>：把該行填滿、封住空白，避免被人補寫其他用途。</li>
              <li><strong>部分筆畫與證件文字交叉或接觸</strong>：讓簽註和證件本體交疊，難以整段挖除或變造。</li>
              <li><strong>不可遮蔽姓名、身分證字號、照片</strong>：簽註是限定用途，不是塗黑，重要欄位仍須清楚可辨。</li>
            </ol>
            <p>
              <strong>加註位置</strong>建議寫在證件影像的空白處並跨到影像上，而不是只寫在頁面邊緣，這樣才能和證件內容綁在一起。
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4 not-prose">
              <p className="font-semibold text-gray-900 mb-2">手寫三行簽註範例（可直接照抄）</p>
              <ul className="text-sm text-gray-700 space-y-2 pl-1">
                <li className="flex items-baseline gap-2">
                  <span className="whitespace-nowrap">第一行：僅提供 OO 銀行</span>
                  <span className="flex-1 border-b border-gray-400" aria-hidden="true" />
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="whitespace-nowrap">第二行：申辦 OO 信用卡使用</span>
                  <span className="flex-1 border-b border-gray-400" aria-hidden="true" />
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="whitespace-nowrap">第三行：2026/07/01，他用無效</span>
                  <span className="flex-1 border-b border-gray-400" aria-hidden="true" />
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                三行寫完後，每行結尾用橫線把剩餘空白補滿，避免被人補寫其他用途；文字跨到證件影像上，但不要遮住姓名與身分證字號。這就是最標準的身分證影本簽註寫法範例。
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-amber-900 text-sm">
                <strong>手寫簽註 vs 數位浮水印：</strong>手寫快速但容易歪斜、可能遮到字，且每張都要重寫；
                數位浮水印可調透明度、精準覆蓋、一次套用多張，處理身分證這類敏感證件也更安全。
                兩者都用「用途＋對象＋日期」原則，下面的範本手寫、數位皆適用。
              </p>
            </div>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>身分證影本簽註寫法範例：8 種情境照著抄</h2>
            <p>
              「加註」和「簽註」指的是同一件事：<strong>用筆手寫</strong>在身分證影本上、限定用途的註記；而浮水印則是用軟體加在<strong>電子檔</strong>上的半透明文字。一個處理紙本、一個處理數位檔，核心原則相同——寫清楚<strong>用途＋對象＋日期</strong>三要素，缺一不可。
            </p>

            {/* 圖例：簽註該寫在影本的哪個位置 */}
            <figure className="not-prose my-6">
              <div className="border-2 border-gray-300 rounded-lg bg-white p-4">
                <p className="text-xs text-gray-500 mb-2">▼ 身分證影本簽註寫法範例：位置示意圖</p>
                <div className="relative border border-dashed border-gray-400 rounded bg-gray-50 p-4 h-44 overflow-hidden">
                  {/* 模擬證件欄位 */}
                  <div className="space-y-2 text-xs text-gray-400">
                    <p>姓名　王＿＿　　　　<span className="text-gray-300">［照片］</span></p>
                    <p>統一編號　A1234＊＊＊＊＊</p>
                    <p>出生年月日　民國 ＿＿ 年 ＿＿ 月 ＿＿ 日</p>
                    <p>發證日期　　　　　　　　縣市　＿＿＿</p>
                  </div>
                  {/* 模擬手寫簽註：斜跨版面、與證件文字交疊 */}
                  <div className="absolute inset-0 flex flex-col justify-center gap-1 px-6 -rotate-6">
                    <p className="text-blue-700 text-sm border-b border-blue-700 pb-0.5">1. 僅提供 OO 銀行</p>
                    <p className="text-blue-700 text-sm border-b border-blue-700 pb-0.5">2. 申辦 OO 信用卡使用</p>
                    <p className="text-blue-700 text-sm border-b border-blue-700 pb-0.5">3. 2026/07/20，他用無效</p>
                  </div>
                </div>
              </div>
              <figcaption className="text-sm text-gray-600 mt-2">
                圖例說明：藍色三行字＝手寫簽註，<strong>斜跨整張證件</strong>並與底下的欄位文字交疊，讓人無法整段挖除；
                每行結尾的橫線把剩餘空白補滿，防止被補寫其他用途。注意簽註<strong>避開了姓名與統一編號的正上方</strong>，
                對方仍能辨識，這是簽註與塗黑最大的差別。
              </figcaption>
            </figure>

            <p>以下 8 個簽註寫法範例可以直接照抄，把「OO」換成實際的對象名稱、日期改成當天即可：</p>
            <ul>
              <li><strong>租屋：</strong>「僅供 OO 房東租屋契約使用，不得作為其他用途 2026/07/20」</li>
              <li><strong>求職：</strong>「僅供 OO 公司徵才審核使用，不得作為其他用途 2026/07/20」</li>
              <li><strong>開戶：</strong>「僅供 OO 銀行開戶使用，不得作為其他用途 2026/07/20」</li>
              <li><strong>保險：</strong>「僅供 OO 人壽投保使用，不得作為其他用途 2026/07/20」</li>
              <li><strong>辦門號：</strong>「僅供 OO 電信申辦門號使用，不得作為其他用途 2026/07/20」</li>
              <li><strong>過戶：</strong>「僅供車牌 OOO-OOOO 過戶使用，不得作為其他用途 2026/07/20」</li>
              <li><strong>貸款：</strong>「僅供 OO 銀行房貸／信貸審核使用，不得作為其他用途 2026/07/20」</li>
              <li><strong>機關申辦：</strong>「僅供 OO 戶政事務所申辦使用，不得作為其他用途 2026/07/20」</li>
            </ul>
            <p>
              如果對方要求的是「一行寫完」的簡短版本，可以用這個最短公式：
              <strong>「僅供 ＿＿＿（對象）＿＿＿（用途）使用　YYYY/MM/DD」</strong>，
              三要素仍然齊全，是最低限度可接受的簽註寫法。
            </p>
            <p>
              範本抄好之後，還有一半的工作是<strong>把它寫對位置</strong>——寫在紙張邊緣的註記一刀就能裁掉，
              下一節完整說明加註位置的 4 條規則與各種證件的建議位置。
            </p>

            {/* 常見錯誤對照 */}
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <p className="font-semibold text-red-900 text-sm mb-2">✗ 常見錯誤寫法</p>
                <ul className="text-sm text-red-800 space-y-1.5">
                  <li>「影本」——沒有用途、沒有對象、沒有日期</li>
                  <li>「僅供辦事使用」——用途太籠統，等於沒限定</li>
                  <li>只寫在紙張最下緣——一刀裁掉就沒了</li>
                  <li>用鉛筆或淺色筆——可擦除、可覆蓋</li>
                  <li>整段塗黑身分證字號——對方會退件要求重給</li>
                </ul>
              </div>
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <p className="font-semibold text-green-900 text-sm mb-2">✓ 正確寫法</p>
                <ul className="text-sm text-green-800 space-y-1.5">
                  <li>「僅供 OO 銀行申辦信用卡使用 2026/07/20」</li>
                  <li>對象寫到具體公司名，不寫「某銀行」</li>
                  <li>斜跨證件影像、與欄位文字交疊</li>
                  <li>藍色原子筆，每行結尾補橫線</li>
                  <li>重要欄位保持可辨識，只限定用途</li>
                </ul>
              </div>
            </div>
            <h2>簽註／加註位置怎麼放？4 條規則與各種證件的建議位置</h2>
            <p>
              「寫什麼」決定影本被挪用時你站不站得住腳，「<strong>寫在哪</strong>」決定這段字會不會被輕鬆去掉。
              加註位置寫錯是最常見、也最可惜的失誤——內容寫得再完整，只要位置放在紙張邊緣，一刀裁掉就等於沒加。
              以下 4 條規則不分手寫加註或數位浮水印都適用：
            </p>
            <ol>
              <li>
                <strong>寫在證件影像上，不要寫在紙張空白邊緣。</strong>
                影印出來的 A4 上下通常留有大片空白，很多人習慣把註記寫在那裡——但那塊空白可以整條裁掉、
                重新影印後就是一張乾淨影本。註記必須落在證件本體的範圍內。
              </li>
              <li>
                <strong>讓筆畫與證件文字交疊。</strong>
                至少讓部分筆畫壓在底下的欄位文字上。交疊之後想去掉註記就必須連證件內容一起破壞，
                修圖時也會留下明顯痕跡。最理想的是<strong>斜跨版面</strong>，因為斜線沒辦法靠水平或垂直裁切移除。
              </li>
              <li>
                <strong>避開姓名、證號、照片的正上方。</strong>
                簽註的目的是限定用途，不是塗黑。關鍵欄位被蓋住，對方會直接退件要你重給一張乾淨的，
                反而失去保護。壓在欄位「附近」和壓在欄位「正上方」，差別就在這裡。
              </li>
              <li>
                <strong>正反面各寫一次。</strong>
                正反面是兩張獨立影像。只註記其中一面，另一面就是一張沒有任何限制的乾淨影本，
                可以被單獨拿去使用。兩面都要有完整的「用途＋對象＋日期」。
              </li>
            </ol>
            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">證件</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">建議加註位置</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">絕對要避開</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">身分證</td>
                    <td className="p-3 border border-gray-200 text-gray-600">斜跨中央，壓過出生年月日與發證日期那幾行</td>
                    <td className="p-3 border border-gray-200 text-gray-600">姓名、統一編號、照片</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">護照</td>
                    <td className="p-3 border border-gray-200 text-gray-600">資料頁中段，橫跨底色區域</td>
                    <td className="p-3 border border-gray-200 text-gray-600">護照號碼、姓名、最下方兩行機器可判讀區</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">駕照／行照</td>
                    <td className="p-3 border border-gray-200 text-gray-600">斜跨中央空白帶</td>
                    <td className="p-3 border border-gray-200 text-gray-600">駕照號碼、車牌號碼、有效期限</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">健保卡</td>
                    <td className="p-3 border border-gray-200 text-gray-600">照片以外的下半部，壓過卡號下方留白</td>
                    <td className="p-3 border border-gray-200 text-gray-600">照片、姓名、卡號</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">存摺封面</td>
                    <td className="p-3 border border-gray-200 text-gray-600">帳號那一行的上下，斜跨整個封面</td>
                    <td className="p-3 border border-gray-200 text-gray-600">帳號、戶名（對方需要核對）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              各種證件的完整寫法可以參考{" "}
              <Link href="/blog/other-documents-watermark">存摺、健保卡、駕照影本的浮水印寫法</Link>；
              護照另有專篇的{" "}
              <Link href="/blog/passport-watermark-guide">護照影本浮水印教學</Link>。
              如果你的情境是<strong>租屋交影本給房東或仲介</strong>，交件流程與押金、租約的留存方式可以看{" "}
              <Link href="/blog/rent-id-watermark">租屋身分證影本加註怎麼寫</Link>。
            </p>
            <p>
              要提醒的是，手寫加註只能保護紙本。如果影本是用 LINE、Email 或線上表單傳送，對方拿到的是電子檔，手寫註記可能被裁切或修圖抹除；數位浮水印以半透明文字覆蓋整張證件、與影像像素融合，比手寫加註更難去除。傳電子檔前，先用{" "}
              <a href="https://imagemarker.app">ImageMarker</a>{" "}
              加上浮水印再送出。想比較其他工具的話，可以參考我們整理的{" "}
              <Link href="/blog/watermark-generators-recommendation">浮水印產生器</Link>{" "}
              推薦與功能比較表——處理身分證這類敏感證件時，務必選擇在瀏覽器本地端處理、不上傳檔案的浮水印產生器。
            </p>

            <h2>證件浮水印萬能公式</h2>
            <p>
              不管什麼情境，只要記住這個公式：
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-blue-900 font-semibold text-lg text-center">用途 ＋ 對象 ＋ 日期</p>
            </div>
            <ul>
              <li><strong>用途</strong>：為什麼要給這張影本</li>
              <li><strong>對象</strong>：給誰／哪家公司</li>
              <li><strong>日期</strong>：提供當天的日期</li>
            </ul>
            <p>
              有這三個要素，即使影本外流也很難被挪作他用。日期尤其重要——它限制了影本的有效時間，
              半年後對方還想拿來用，法律上站不住腳。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>10 種情境完整範本</h2>

            {/* Quick reference table */}
            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">情境</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">範本</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((t) => (
                    <tr key={t.num} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">{t.num}. {t.title}</td>
                      <td className="p-3 border border-gray-200 text-gray-600 font-mono text-xs">{t.template}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>以下逐一說明每個情境的使用時機和注意事項：</p>

            {templateDetails.map((detail) => (
              <div key={detail.num}>
                <h3>{detail.num}. {detail.title}</h3>
                <p><strong>什麼情況會用到：</strong>{detail.when}</p>
                <p><strong>建議範本：</strong></p>
                <blockquote>
                  <p className="font-mono">{detail.template}</p>
                </blockquote>
                <p><strong>小提醒：</strong>{detail.tip}</p>
              </div>
            ))}

            <h2>各情境的延伸閱讀：不只怎麼寫，還有怎麼交</h2>
            <p>
              上面 10 種範本解決的是「文字怎麼寫」。如果你正在處理某個特定情境，還想知道<strong>對方憑什麼要、什麼時候該拒絕、交出去之後怎麼留紀錄</strong>，這幾篇是各情境的深入版：
            </p>
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <Link href="/blog/rent-before-giving-id-3-things" className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all block">
                <p className="text-xs text-blue-600 font-medium mb-1">租屋情境</p>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">租屋交身分證影本前，一定要做的 3 件事</h3>
                <p className="text-xs text-gray-600">房東為何要影本、遮蔽哪些欄位、怎麼保留交件證據。</p>
              </Link>
              <Link href="/blog/job-interview-id-copy-safety" className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all block">
                <p className="text-xs text-blue-600 font-medium mb-1">求職情境</p>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">面試就要身分證影本？求職者的證件安全指南</h3>
                <p className="text-xs text-gray-600">哪些索取要求不合理、3 種求職詐騙劇本、何時才該交。</p>
              </Link>
              <Link href="/blog/id-watermark-complete-guide" className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all block">
                <p className="text-xs text-blue-600 font-medium mb-1">操作教學</p>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">證件影本加浮水印教學：3 步驟完成</h3>
                <p className="text-xs text-gray-600">範本抄好之後，照這三步實際做出一張安全影本。</p>
              </Link>
              <Link href="/blog/id-copy-leaked-consequences" className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all block">
                <p className="text-xs text-blue-600 font-medium mb-1">風險認識</p>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">身分證影本外洩後會發生什麼事？</h3>
                <p className="text-xs text-gray-600">盜辦門號、申貸、人頭帳戶，以及懷疑外洩時的處理步驟。</p>
              </Link>
            </div>

            <h2>浮水印的最佳設計原則</h2>
            <p>知道寫什麼之後，還要知道怎麼放才有效：</p>
            <ol>
              <li><strong>位置</strong>：覆蓋整張證件，而不是角落（角落容易被 PS 移除）</li>
              <li><strong>透明度</strong>：30–50% 最剛好，看得到浮水印也看得到證件資訊</li>
              <li><strong>字體大小</strong>：對角線覆蓋，文字要大到無法忽略</li>
              <li><strong>字色</strong>：深色字（黑／深藍）對比強，效果最好</li>
              <li><strong>重複文字</strong>：重要的影本可以讓浮水印文字重複出現多次</li>
            </ol>

            <h2>浮水印可以「移除」嗎？</h2>
            <p>
              有心人用 PS 可以嘗試移除，但如果你做到以下幾點，移除難度大增，攻擊者通常會放棄：
            </p>
            <ul>
              <li>覆蓋整張圖片（非角落）</li>
              <li>用有意義的文字（用途 ＋ 對象 ＋ 日期）</li>
              <li>文字疊在重要資訊（身分證字號）上方</li>
            </ul>

            <h2>常見問題 FAQ</h2>

            <h3>Q1：對方不接受有浮水印的影本怎麼辦？</h3>
            <p>
              內政部的建議就是加註用途。正當的公司／機構都會接受。
              堅持要乾淨影本的反而要小心——這不符合個資保護的慣例作法。
            </p>

            <h3>Q2：要加「日期」有必要嗎？</h3>
            <p>
              非常必要。日期限定了影本的有效時間。
              半年後對方還想用這張，法律上站不住腳，也讓濫用行為更容易被追溯。
            </p>

            <h3>Q3：如果對象我還不確定怎麼辦？</h3>
            <p>
              可以寫「僅供 2026/XX/XX 申辦 OO 業務使用」，至少有日期 ＋ 用途，
              比沒加好很多。
            </p>

            <h3>Q4：浮水印會不會影響證件辨識？</h3>
            <p>
              30–50% 透明度不會。你也可以在 ImageMarker 即時預覽調整到滿意為止，
              套用前就能確認效果。
            </p>

            <h3>Q5：手機拍的照片也能加嗎？</h3>
            <p>
              可以。ImageMarker 支援手機瀏覽器，在手機上直接操作即可，不需要安裝 App。
            </p>

            <h3>Q6：影本加註和浮水印有什麼不同？哪個比較有效？</h3>
            <p>
              加註（簽註）是用筆手寫在紙本影本上的用途註記，浮水印是用軟體加在電子檔上的半透明文字。兩者都遵守「用途＋對象＋日期」原則，但數位浮水印可以覆蓋整張證件、與影像融合，比手寫加註更難被裁切或修圖去除。紙本親手交付用手寫加註即可，電子檔傳送則務必用數位浮水印，兩者並用防護最完整。
            </p>

            <h3>Q7：簽註到底要寫什麼內容？</h3>
            <p>
              只要三個要素：<strong>用途</strong>（為什麼交這張影本）、<strong>對象</strong>（交給誰／哪家公司）、
              <strong>日期</strong>（提供當天）。合起來就是「僅供 OO 銀行申辦信用卡使用 2026/08/09」。
              三者缺一都會讓限制失效——沒有對象等於誰都能用，沒有日期等於永久有效。
            </p>

            <h3>Q8：簽註要寫在影本的哪個位置？</h3>
            <p>
              寫在證件影像本身上、與欄位文字部分交疊，最好斜跨版面，不要只寫在紙張上下方的空白邊緣——
              邊緣的註記一刀就能裁掉。同時要避開姓名、身分證字號與照片的正上方，讓對方仍能辨識，
              這是簽註和塗黑最大的差別。各種證件的建議位置整理在上面的表格裡。
            </p>

            <h3>Q9：身分證影本正反面都要簽註嗎？</h3>
            <p>
              都要。正反面是兩張獨立的影像，只註記其中一面，另一面就是一張沒有任何限制的乾淨影本，
              可以單獨被拿去使用。兩面各自寫上完整的「用途＋對象＋日期」。
            </p>

            <h3>Q10：租屋要交身分證影本，簽註怎麼寫？</h3>
            <p>
              寫「僅供 OO 房東／OO 仲介租屋契約使用 2026/08/09」，把對象寫到實際的房東姓名或仲介公司名，
              不要只寫「租屋使用」。若當下還不確定簽約對象，至少要有日期＋租屋用途。
              交件前後還要注意什麼，可以看{" "}
              <Link href="/blog/rent-id-watermark">租屋身分證影本加註怎麼寫</Link>。
            </p>

            <h3>Q11：護照影本的簽註要寫在哪裡？</h3>
            <p>
              護照影本簽註寫在資料頁影像上、跨過底色區域，但要避開姓名、護照號碼、出生日期與
              <strong>機器可判讀區</strong>（頁面最下方兩行英數字）。內容同樣是
              「僅供 OO 旅行社辦理簽證使用 2026/08/09」。
            </p>

            <h2>立即套用範本，保護你的證件</h2>
            <p>
              ImageMarker 工具頁提供上述所有情境的一鍵套用按鈕，
              點擊即可自動填入對應範本（含今日日期），再自訂對象名稱就完成。
            </p>
            <p>
              <a href="https://imagemarker.app" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium no-underline">
                立即使用 ImageMarker 加浮水印<ReadMoreArrow />
              </a>
            </p>
          </div>
        <p className="mt-8 text-center text-sm text-gray-400"><a href="https://ko-fi.com/justinlee2061" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">☕ 如果這篇文章幫到你，請我喝杯咖啡</a></p>
        </article>

        <PopularTools location={SLUG} className="mt-12" />

        {/* Related Articles */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">相關文章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/rent-id-watermark" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">隱私保護</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">租屋身分證影本加註怎麼寫？「僅供租屋使用」浮水印範例</h3>
            </Link>
            <Link href="/blog/watermark-generators-recommendation" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">工具推薦</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">5 款免費線上浮水印產生器推薦</h3>
            </Link>
            <Link href="/blog/mobile-watermark-tutorial" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">手機教學</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">手機怎麼幫身分證加浮水印？免安裝 App 的最快方法</h3>
            </Link>
            <Link href="/blog/other-documents-watermark" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">證件保護</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">不只身分證！存摺、健保卡、駕照影本也要加浮水印</h3>
            </Link>
            <Link href="/blog/id-photo-guide" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">證件照攻略</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">2026 證件照完全攻略：手機自拍、線上裁切、超商列印一次搞定</h3>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
