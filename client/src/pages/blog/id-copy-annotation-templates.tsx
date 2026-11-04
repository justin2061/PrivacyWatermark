import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Check, Copy } from "lucide-react";
import { InlineCTA } from "@/components/InlineCTA";
import { PopularTools } from "@/components/PopularTools";
import { SiteFooter } from "@/components/SiteFooter";
import { trackToolEvent } from "@/lib/analytics";
import { copyText } from "@/lib/copyText";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  howToSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/id-copy-annotation-templates";
const SLUG = "id-copy-annotation-templates";
// 這頁是「簽註／加註」這整組字群唯一的落地頁。
//
// 2026-09-16 合併：原本規則寫在 /blog/watermark-templates-guide、成品範本寫在這頁，
// 兩頁互相連結。實際結果是兩頁對打同一批查詢，templates-guide 連續 5 週沒有被
// Google 重新檢索（同一個蠶食劇本在 7/11 那批新文上線後就出現過一次）。所以把
// templates-guide 整篇搬進來，舊網址 301 到這裡（見 netlify.toml），讓規則與範本
// 由同一個 URL 承接。
//
// 標題刻意沿用 templates-guide 的前綴「身分證影本簽註寫法＋加註位置」一字不動——
// 那是它排名 1.9–4.2 的字串，也是這次合併要繼承的主要資產；後半的「證件浮水印範例」
// 同理（原本排名 2.5）。只有數量從「10 種情境」換成這頁本來就有的「20 組」。
const TITLE =
  "身分證影本簽註寫法＋加註位置：20 組範本與證件浮水印範例（2026）";
const OG = "https://imagemarker.app/og/zh/id-copy-annotation-templates.png";

// FAQPage schema 與畫面下方的「常見問題」共用這一份，兩邊不會各自漂移。
// 前四題是從 watermark-templates-guide 合併過來的「寫法／位置／正反面」核心問題，
// 也是那頁原本排名最好的字群，必須完整帶過來。
const FAQS = [
  {
    q: "身分證影本簽註寫法要怎麼寫才對？",
    a: "手寫簽註要分三行、用藍色原子筆、每行文字後劃一條橫線防止被補寫，部分筆畫與證件文字交叉或接觸，且不可遮蔽姓名與身分證字號等重要欄位。內容用「用途＋對象＋日期」，例如「僅供 OO 銀行申辦信用卡使用 2026/07/01」。",
  },
  {
    q: "簽註要寫什麼內容？",
    a: "只要三個要素：用途（為什麼交這張影本）、對象（交給誰／哪家公司）、日期（提供當天）。合起來就是「僅供 OO 銀行申辦信用卡使用 2026/09/16」。三者缺一都會讓限制失效——沒有對象等於誰都能用，沒有日期等於永久有效。",
  },
  {
    q: "簽註要寫在影本的哪個位置？",
    a: "寫在證件影像本身上、與欄位文字部分交疊，最好斜跨版面，不要只寫在紙張上下方的空白邊緣——邊緣的註記一刀就能裁掉。同時要避開姓名、身分證字號與照片的正上方，讓對方仍能辨識，這是簽註和塗黑最大的差別。各種證件的建議位置整理在本頁的位置對照表裡。",
  },
  {
    q: "身分證影本正反面都要簽註嗎？",
    a: "都要。正反面是兩張獨立的影像，只註記其中一面，另一面就是一張沒有任何限制的乾淨影本，可以單獨被拿去使用。兩面各自寫上完整的「用途＋對象＋日期」。",
  },
  {
    q: "簽註範本可以直接複製使用嗎？",
    a: "可以。這頁 20 組範本都附一鍵複製按鈕，複製出來的文字已經帶上今天的日期，只要把 ○○ 換成實際的公司或機構名稱就能直接使用，手寫加註或數位浮水印都適用。",
  },
  {
    q: "範本裡的 ○○ 要換成什麼？",
    a: "換成實際收件的對象名稱，越具體越好。寫「僅供租屋使用」等於誰都能用，要寫成「僅供 大安房屋仲介 租屋簽約使用」。如果簽約對象還沒確定，至少要保留用途與日期。",
  },
  {
    q: "簽註的日期要寫哪一天？",
    a: "寫你交出影本的當天。日期的作用是限定這份影本的有效時間，事後被挪作他用時，過期的日期就是你主張未授權的依據。複製按鈕會自動帶入今天的日期。",
  },
  {
    q: "同一份影本要交給兩個不同單位，可以共用嗎？",
    a: "不要共用。回到工具重做一份，把對象換成第二個單位。共用一份等於簽註限定的對象失效，也失去了追溯來源的能力。",
  },
  {
    q: "影本加註和浮水印有什麼不同？哪個比較有效？",
    a: "加註（簽註）是用筆手寫在紙本影本上的用途註記，浮水印是用軟體加在電子檔上的半透明文字。兩者都遵守「用途＋對象＋日期」原則，但數位浮水印可以覆蓋整張證件、與影像融合，比手寫加註更難被裁切或修圖去除。紙本親手交付用手寫加註即可，電子檔傳送則務必用數位浮水印，兩者並用防護最完整。",
  },
  {
    q: "租屋要交身分證影本，簽註怎麼寫？",
    a: "寫「僅供 OO 房東／OO 仲介租屋契約使用 2026/09/16」，把對象寫到實際的房東姓名或仲介公司名，不要只寫「租屋使用」。若當下還不確定簽約對象，至少要有日期＋租屋用途。",
  },
  {
    q: "護照影本的簽註要寫在哪裡？",
    a: "護照影本簽註寫在資料頁影像上、跨過底色區域，但要避開姓名、護照號碼、出生日期與機器可判讀區（頁面最下方兩行英數字）。內容同樣是「僅供 OO 旅行社辦理簽證使用 2026/09/16」。",
  },
  {
    q: "浮水印文字要多大、透明度多少才合適？",
    a: "透明度 30–50%、文字覆蓋整張證件、用重複或斜放排列效果最好。要能一眼看見浮水印，也要能看清楚證件內容——簽註的目的是限定用途，不是塗黑。",
  },
  {
    q: "對方說有浮水印或簽註的影本不收，怎麼辦？",
    a: "內政部本來就建議在證件影本上加註用途，正當的公司與機構都會接受。堅持只收乾淨影本的一方反而值得警覺，可以請對方說明為什麼不能加註。",
  },
  {
    q: "手機拍的身分證影本也能加簽註或浮水印嗎？",
    a: "可以。用 ImageMarker 在手機瀏覽器就能加數位浮水印，免安裝 App；不方便手寫時，數位浮水印可調透明度、覆蓋範圍更好控制。",
  },
  {
    q: "按了複製沒有反應怎麼辦？",
    a: "多半是瀏覽器封鎖了剪貼簿權限（常見於非 HTTPS 或舊版 Safari）。範本文字本來就顯示在畫面上，直接長按選取複製即可，效果一樣。",
  },
];

interface Template {
  /** 場景名稱，同時作為錨點與 GA4 事件參數 */
  scene: string;
  /** 一句話：什麼時候會用到這組 */
  when: string;
  /** 範本本體。傳入今天的日期，複製出去就是可以直接貼上的成品 */
  text: (today: string) => string;
}

const TEMPLATES: Template[] = [
  {
    scene: "租屋",
    when: "房東或仲介要求提供身分證影本核對租客身分。",
    text: (d) => `僅供 ○○房東／○○仲介 租屋簽約使用 ${d}，他用無效`,
  },
  {
    scene: "銀行開戶",
    when: "臨櫃或線上開立存款帳戶時附上的雙證件影本。",
    text: (d) => `僅供 ○○銀行 開立帳戶使用 ${d}，他用無效`,
  },
  {
    scene: "求職",
    when: "投遞履歷或面試階段，公司要求先附證件影本。",
    text: (d) => `僅供 ○○公司 應徵資格審核使用 ${d}，他用無效`,
  },
  {
    scene: "辦手機門號",
    when: "申辦新門號，門市要求雙證件影本留存。",
    text: (d) => `僅供 ○○電信 申辦門號使用 ${d}，他用無效`,
  },
  {
    scene: "保險",
    when: "投保、核保或申請理賠時要附被保險人證件影本。",
    text: (d) => `僅供 ○○人壽 投保核保使用 ${d}，他用無效`,
  },
  {
    scene: "信用卡",
    when: "申辦信用卡或補件時要求的財力與身分文件。",
    text: (d) => `僅供 ○○銀行 申辦信用卡使用 ${d}，他用無效`,
  },
  {
    scene: "貸款",
    when: "房貸、信貸、車貸送件時附的身分證明。",
    text: (d) => `僅供 ○○銀行 貸款申請使用 ${d}，他用無效`,
  },
  {
    scene: "旅行社",
    when: "委託旅行社代辦簽證、機票或團體報名。",
    text: (d) => `僅供 ○○旅行社 代辦簽證使用 ${d}，他用無效`,
  },
  {
    scene: "補習班",
    when: "報名課程、辦理學員證或請領政府補助時。",
    text: (d) => `僅供 ○○補習班 報名註冊使用 ${d}，他用無效`,
  },
  {
    scene: "健身房",
    when: "入會簽約、綁定分期扣款時要求的身分核對。",
    text: (d) => `僅供 ○○健身中心 入會申請使用 ${d}，他用無效`,
  },
  {
    scene: "不動產",
    when: "買賣、過戶、設定抵押，交給代書或地政士的文件。",
    text: (d) => `僅供 ○○地政士事務所 不動產過戶使用 ${d}，他用無效`,
  },
  {
    scene: "電信（續約／攜碼）",
    when: "門號續約、攜碼轉入或申裝家用寬頻。",
    text: (d) => `僅供 ○○電信 續約攜碼使用 ${d}，他用無效`,
  },
  {
    scene: "政府機關",
    when: "戶政、地政、監理站等單位臨櫃或郵寄申辦。",
    text: (d) => `僅供 ○○戶政事務所 申辦戶籍謄本使用 ${d}，他用無效`,
  },
  {
    scene: "醫院",
    when: "住院、手術同意書或申請診斷證明時的身分核對。",
    text: (d) => `僅供 ○○醫院 住院身分核對使用 ${d}，他用無效`,
  },
  {
    scene: "學校",
    when: "入學註冊、學籍異動或申請就學貸款。",
    text: (d) => `僅供 ○○大學 入學註冊使用 ${d}，他用無效`,
  },
  {
    scene: "公司入職",
    when: "錄取後報到，人資要求證件影本備存與設定薪轉。",
    text: (d) => `僅供 ○○公司 到職報到人資備存使用 ${d}，他用無效`,
  },
  {
    scene: "外送平台",
    when: "註冊成為外送員時上傳的身分與駕照文件。",
    text: (d) => `僅供 ○○外送平台 外送員身分審核使用 ${d}，他用無效`,
  },
  {
    scene: "共享機車",
    when: "註冊共享機車／汽車，平台審核駕照與身分。",
    text: (d) => `僅供 ○○共享機車 駕駛資格審核使用 ${d}，他用無效`,
  },
  {
    scene: "網路實名認證",
    when: "交易平台、加密貨幣或遊戲帳號要求上傳證件做 KYC。",
    text: (d) => `僅供 ○○平台 帳號實名驗證使用 ${d}，他用無效`,
  },
  {
    scene: "其他（通用）",
    when: "上面沒有對到的場景，把兩個 ○○ 換成對象與用途即可。",
    text: (d) => `僅供 ○○ 辦理○○業務使用 ${d}，他用無效`,
  },
];

const HOW_TO_STEPS = [
  {
    name: "複製範本文字",
    text: "在上面的 20 組場景裡找到你的情境，按「複製」，再把 ○○ 換成實際的公司或機構名稱。",
  },
  {
    name: "上傳證件照片",
    text: "打開 ImageMarker 浮水印工具，選擇手機拍的或掃描的證件影本。檔案只在你的瀏覽器裡處理，不會上傳到任何伺服器。",
  },
  {
    name: "貼上文字並調整",
    text: "把剛剛複製的文字貼進浮水印欄位，透明度調到 30–50%，用重複或斜放模式讓文字覆蓋整張證件，但避開姓名、身分證字號與照片。",
  },
  {
    name: "下載並傳送",
    text: "確認正反面都各自加好浮水印後下載，再把加過浮水印的檔案傳給對方。原始無浮水印的檔案不要外流。",
  },
];

function formatToday(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}/${mm}/${dd}`;
}

function TemplateCard({ item, today }: { item: Template; today: string }) {
  const [copied, setCopied] = useState(false);
  const text = item.text(today);

  const handleCopy = async () => {
    await copyText(text);
    setCopied(true);
    // GA4：事件參數沿用既有的 tool_name 欄位，這裡放場景名，用來看哪些範本真的被複製
    trackToolEvent("annotation_template_copy", item.scene);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h3 className="text-base font-semibold text-gray-900 m-0">{item.scene}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">{item.when}</p>

      <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2.5 mb-3">
        <p className="text-[15px] leading-relaxed text-gray-900 m-0 break-words">
          {text}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`複製「${item.scene}」簽註範本`}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            copied
              ? "bg-green-600 text-white"
              : "bg-primary text-white hover:bg-blue-700"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" aria-hidden="true" />
              已複製
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" aria-hidden="true" />
              複製
            </>
          )}
        </button>
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 no-underline"
        >
          立即加上浮水印 →
        </Link>
      </div>
    </div>
  );
}

export default function IdCopyAnnotationTemplatesPage() {
  const today = useMemo(formatToday, []);

  useEffect(() => {
    const cleanup = setPageSeo({
      title: `${TITLE} | ImageMarker`,
      // 合併後描述改成同時涵蓋「範本」與「規則」兩種意圖：前半是這頁原有的
      // 一鍵複製賣點，後半接手 templates-guide 的「寫法／位置／正反面」。
      description:
        "【2026 最新】20 組身分證影本簽註範例，租屋、開戶、求職、入職、實名認證都有，一鍵複製直接貼上。簽註寫法三行格式、加註位置放哪才不會被裁掉、正反面規則一次講清楚，另附 4 步驟免費做出證件浮水印。",
      canonical: URL,
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "身分證影本簽註寫法與加註位置完整教學：手寫三行簽註格式、簽註要寫在影本哪個位置、正反面規則，＋20 組常見場景可一鍵複製的簽註範本與證件浮水印範例。",
          url: URL,
          datePublished: "2026-08-27",
          dateModified: "2026-09-16",
        }),
        howToSchema({
          name: "如何把簽註範本做成身分證影本浮水印",
          description:
            "複製對應場景的簽註文字，貼進免費線上浮水印工具，調整透明度後下載，全程在瀏覽器完成、不上傳檔案。",
          steps: HOW_TO_STEPS,
        }),
        faqSchema(FAQS),
        blogBreadcrumb("身分證影本簽註寫法＋加註位置", URL),
      ],
    });
    return cleanup;
  }, []);

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
              <span>範本可直接複製</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              身分證影本簽註寫法＋加註位置：20 組範本與證件浮水印範例（2026）
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time dateTime="2026-08-27">2026 年 8 月 27 日</time>
              <span>·</span>
              <span>最後更新 2026/09/16</span>
              <span>·</span>
              <span>閱讀約 9 分鐘</span>
            </div>
          </header>

          <div className="prose prose-gray max-w-none">
            <p>
              證件影本交出去後的命運你無法控制。在影本上<strong>簽註</strong>（也叫加註）限定用途，
              是最簡單有效的自保方式，但多數人卡在兩件事：<strong>簽註寫法要怎麼寫</strong>，
              以及<strong>加註位置該放在哪</strong>。這篇一次把兩件事講完——先給 20 組可以直接複製的
              範本，再講手寫三行的正確格式、位置規則與各種證件的建議位置，最後是證件浮水印範例
              與設計原則。電子檔要傳出去的話，可以用免費的
              <Link href="/">浮水印產生器</Link>
              把同一段文字做成數位浮水印。
            </p>
            <p>
              下面 20 組是台灣最常被要求交出身分證影本的場景，每組都有寫好的簽註文字，
              按「複製」就能直接用——日期已經自動帶成今天（{today}），
              只要把 <strong>○○</strong> 換成實際的公司或機構名稱。
              手寫加註、數位浮水印都適用。
            </p>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
              <p className="font-semibold text-gray-900 mb-2">通用公式</p>
              <p className="text-[15px] text-gray-900 mb-2">
                僅供 <strong>對象</strong> <strong>用途</strong>使用 <strong>日期</strong>，他用無效
              </p>
              <p className="text-sm text-gray-600 m-0">
                四個要素缺一不可：沒有對象等於誰都能用，沒有用途等於什麼都能辦，
                沒有日期等於永久有效，沒有「他用無效」則少了最直接的限制宣告。
              </p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
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
              <strong>結論：能用數位浮水印就用浮水印。</strong>身分證影本加註在你「當面交付紙本」時仍然管用，但只要影本是用手機拍照、LINE 或 Email 傳送，就一律建議改用數位浮水印——它不會遮擋證件內容、可以一鍵套用範本自動化處理、字體工整更美觀，也更難被裁切或修圖去除。真正萬無一失的做法，是<strong>先在電子檔加好浮水印再列印或傳送</strong>，這樣連印出來的紙本都自帶標記。下面的範本與簽註寫法規則，手寫加註與數位浮水印都適用。
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            20 組簽註範本
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {TEMPLATES.map((item) => (
              <TemplateCard key={item.scene} item={item} today={today} />
            ))}
          </div>

          <div className="mt-8">
            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />
          </div>

          <div className="prose prose-gray max-w-none mt-10">
            <h2>身分證影本簽註寫法：手寫三行的正確做法</h2>
            <p>
              範本抄好之後，還有一半的工作是<strong>把它寫對</strong>。最傳統、也最多人問的
              「簽註寫法」是<strong>手寫在影本上</strong>，正確寫法有固定規則，照著做才有防護效果：
            </p>
            <ol>
              <li><strong>用藍色原子筆</strong>：正反兩面都要簽註，藍筆較能辨識是後加、不易被塗改。</li>
              <li><strong>分三行書寫</strong>：例如「1. 僅提供 OO 銀行　2. 申辦 OO 信用卡　3. 他用無效」。</li>
              <li><strong>每行文字後劃一條橫線</strong>：把該行填滿、封住空白，避免被人補寫其他用途。</li>
              <li><strong>部分筆畫與證件文字交叉或接觸</strong>：讓簽註和證件本體交疊，難以整段挖除或變造。</li>
              <li><strong>不可遮蔽姓名、身分證字號、照片</strong>：簽註是限定用途，不是塗黑，重要欄位仍須清楚可辨。</li>
            </ol>
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
                  <span className="whitespace-nowrap">第三行：2026/09/16，他用無效</span>
                  <span className="flex-1 border-b border-gray-400" aria-hidden="true" />
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                三行寫完後，每行結尾用橫線把剩餘空白補滿，避免被人補寫其他用途；文字跨到證件影像上，但不要遮住姓名與身分證字號。這就是最標準的身分證影本簽註寫法範例。
              </p>
            </div>
            <p>
              如果對方要求的是「一行寫完」的簡短版本，可以用這個最短公式：
              <strong>「僅供 ＿＿＿（對象）＿＿＿（用途）使用　YYYY/MM/DD」</strong>，
              三要素仍然齊全，是最低限度可接受的簽註寫法。
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
                  <li>「僅供 OO 銀行申辦信用卡使用 2026/09/16」</li>
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

            {/* 圖例：簽註該寫在影本的哪個位置 */}
            <figure className="not-prose my-6">
              <div className="border-2 border-gray-300 rounded-lg bg-white p-4">
                <p className="text-xs text-gray-500 mb-2">▼ 身分證影本簽註寫法範例：加註位置示意圖</p>
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
                    <p className="text-blue-700 text-sm border-b border-blue-700 pb-0.5">3. 2026/09/16，他用無效</p>
                  </div>
                </div>
              </div>
              <figcaption className="text-sm text-gray-600 mt-2">
                圖例說明：藍色三行字＝手寫簽註，<strong>斜跨整張證件</strong>並與底下的欄位文字交疊，讓人無法整段挖除；
                每行結尾的橫線把剩餘空白補滿，防止被補寫其他用途。注意簽註<strong>避開了姓名與統一編號的正上方</strong>，
                對方仍能辨識，這是簽註與塗黑最大的差別。
              </figcaption>
            </figure>

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

            <h2>證件浮水印範例：4 個設計原則</h2>
            <p>知道寫什麼、寫在哪之後，數位浮水印還有四個參數要設對，才不會白做：</p>
            <ol>
              <li><strong>覆蓋範圍</strong>：覆蓋整張證件，而不是角落——角落的浮水印用修圖工具兩下就移除得掉。</li>
              <li><strong>透明度</strong>：30–50% 最剛好，看得到浮水印也看得到證件資訊。</li>
              <li><strong>字體大小與排列</strong>：用重複（平鋪）或斜放模式，文字要大到無法忽略，並壓在身分證字號那一帶。</li>
              <li><strong>字色</strong>：深色字（黑／深藍）對比強，效果最好；淺色字在深色底的證件上幾乎看不見。</li>
            </ol>
            <p>
              有心人用修圖軟體確實可以嘗試移除浮水印，但只要做到「覆蓋整張圖片、用有意義的文字、
              文字疊在身分證字號上方」這三件事，移除的成本就高到不值得——攻擊者通常會直接放棄，
              改找沒有加保護的目標。
            </p>

            <h2>把範本做成浮水印：4 個步驟</h2>
            <ol>
              {HOW_TO_STEPS.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong>：{s.text}
                </li>
              ))}
            </ol>

            <h2>為什麼要加浮水印？</h2>
            <p>
              證件影本一旦交出去，你就再也控制不了它會被複印幾份、存在誰的電腦裡、
              離職的員工會不會帶走。<strong>簽註（加註）不能阻止影本被拿走，但能讓它變得不好用</strong>——
              一張寫著「僅供 ○○銀行 開立帳戶使用」的影本，被拿去申辦門號或人頭帳戶時，
              收件方只要稍加查驗就會發現用途不符，事後追查也有明確的流出時間點。
            </p>
            <p>
              紙本當面交付，用筆手寫加註就夠了。但只要影本是用手機拍照、用 LINE 或 Email 傳出去的，
              就一定要改用<strong>數位浮水印</strong>：手寫字很容易被裁掉或修圖抹除，
              數位浮水印可以斜跨、重複覆蓋整張證件，與影像融合，去除的成本高得多。
              <Link href="/">ImageMarker 浮水印工具</Link>
              免費、免註冊，所有處理都在你自己的瀏覽器完成，圖片不會上傳到任何伺服器。
            </p>
            <p>
              租屋情境的完整流程看{" "}
              <Link href="/blog/rent-id-watermark">租屋身分證影本加註怎麼寫</Link>
              ；影本外流會發生什麼事看{" "}
              <Link href="/blog/id-copy-leaked-consequences">身分證影本外流的後果</Link>。
              傳送前也建議先用{" "}
              <Link href="/exif-clean">EXIF 清除工具</Link>
              把照片裡的拍攝地點與時間一併移除；證件影本如果檔案太大寄不出去，可以先用{" "}
              <Link href="/compress">圖片壓縮工具</Link>
              或{" "}
              <Link href="/convert/bmp-to-jpg">BMP 轉 JPG</Link>
              （掃描器與小畫家輸出的 BMP 常常好幾 MB，轉成 JPG 通常能縮小九成以上）處理過再送出。
            </p>

            <h2>各情境的延伸閱讀：不只怎麼寫，還有怎麼交</h2>
            <p>
              上面的範本與規則解決的是「文字怎麼寫、寫在哪」。如果你正在處理某個特定情境，還想知道
              <strong>對方憑什麼要、什麼時候該拒絕、交出去之後怎麼留紀錄</strong>，這幾篇是各情境的深入版：
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

            <h2>常見問題</h2>
            {FAQS.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}

            <h2>現在就把範本變成浮水印</h2>
            <p>
              <Link
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium no-underline"
              >
                立即加上浮水印 →
              </Link>
            </p>
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">
            <a
              href="https://ko-fi.com/justinlee2061"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              ☕ 如果這頁幫到你，請我喝杯咖啡
            </a>
          </p>
        </article>

        <PopularTools location={SLUG} className="mt-12" />

        {/* Related Articles */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">相關文章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/id-watermark-complete-guide" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">操作教學</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">證件影本加浮水印教學：3 步驟完成，手機電腦都適用</h3>
            </Link>
            <Link href="/blog/rent-id-watermark" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">隱私保護</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">租屋身分證影本加註怎麼寫？「僅供租屋使用」浮水印範例</h3>
            </Link>
            <Link href="/blog/id-copy-leaked-consequences" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">風險認識</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">身分證影本外流會怎樣？真實案例與事後補救</h3>
            </Link>
            <Link href="/blog/other-documents-watermark" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">證件保護</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">不只身分證！存摺、健保卡、駕照影本也要加浮水印</h3>
            </Link>
            <Link href="/blog/privacy-protection-toolkit" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">完整指南</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">個資保護三道防線：EXIF 清除、馬賽克、浮水印</h3>
            </Link>
            <Link href="/blog/mobile-watermark-tutorial" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">手機教學</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">手機怎麼幫身分證加浮水印？免安裝 App 的最快方法</h3>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
