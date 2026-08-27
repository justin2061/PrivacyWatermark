import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Check, Copy } from "lucide-react";
import { InlineCTA } from "@/components/InlineCTA";
import { PopularTools } from "@/components/PopularTools";
import { SiteFooter } from "@/components/SiteFooter";
import { trackToolEvent } from "@/lib/analytics";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  howToSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/id-copy-annotation-templates";
const SLUG = "id-copy-annotation-templates";
// 這頁是為「簽註寫法／加註寫法／簽註範本」這組字群做的落地頁：GSC 顯示三個查詢
// 合計 517 曝光、CTR 只有 4%，因為原本沒有任何一頁是「可以直接複製的文字清單」。
// 分工：watermark-templates-guide 講規則（怎麼寫、寫在哪、正反面），這頁只給成品。
// 兩頁互相連結，不要把這頁再寫成教學文，否則就是自己蠶食自己。
const TITLE = "身分證影本簽註寫法完整範本 — 20 組常見場景可直接複製";
const OG = "https://imagemarker.app/og/zh/id-copy-annotation-templates.png";

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

/**
 * 一鍵複製。navigator.clipboard 在非安全來源與部分舊版 Safari 不存在，
 * 所以保留 textarea + execCommand 的退路——複製失敗等於這頁沒有用。
 */
async function copyText(text: string): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    // 掉到下面的 fallback
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    // 兩條路都失敗就讓使用者自己選取，文字本來就顯示在畫面上
  }
  ta.remove();
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
      description:
        "20 組身分證影本簽註範本，租屋、開戶、求職、入職、實名認證都有，每組都能一鍵複製直接貼上。附加註寫法通用公式與 4 步驟做成免費證件浮水印。",
      canonical: URL,
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "20 組常見場景的身分證影本簽註／加註範本文字，可一鍵複製後直接做成證件浮水印。",
          url: URL,
          datePublished: "2026-08-27",
          dateModified: "2026-08-27",
        }),
        howToSchema({
          name: "如何把簽註範本做成身分證影本浮水印",
          description:
            "複製對應場景的簽註文字，貼進免費線上浮水印工具，調整透明度後下載，全程在瀏覽器完成、不上傳檔案。",
          steps: HOW_TO_STEPS,
        }),
        faqSchema([
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
            q: "一張影本要寫幾組簽註？",
            a: "一個用途一組。正反面各是一張獨立影像，兩面都要各寫一次完整的「用途＋對象＋日期」，只寫一面等於另一面是完全沒有限制的乾淨影本。",
          },
          {
            q: "同一份影本要交給兩個不同單位，可以共用嗎？",
            a: "不要共用。回到工具重做一份，把對象換成第二個單位。共用一份等於簽註限定的對象失效，也失去了追溯來源的能力。",
          },
          {
            q: "按了複製沒有反應怎麼辦？",
            a: "多半是瀏覽器封鎖了剪貼簿權限（常見於非 HTTPS 或舊版 Safari）。範本文字本來就顯示在畫面上，直接長按選取複製即可，效果一樣。",
          },
          {
            q: "浮水印文字要多大、透明度多少才合適？",
            a: "透明度 30–50%、文字覆蓋整張證件、用重複或斜放排列效果最好。要能一眼看見浮水印，也要能看清楚證件內容——簽註的目的是限定用途，不是塗黑。",
          },
          {
            q: "對方說有浮水印的影本不收，怎麼辦？",
            a: "內政部本來就建議在證件影本上加註用途，正當的公司與機構都會接受。堅持只收乾淨影本的一方反而值得警覺，可以請對方說明為什麼不能加註。",
          },
        ]),
        blogBreadcrumb("身分證影本簽註範本", URL),
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
          <span className="text-gray-900">簽註範本</span>
        </nav>

        <article className="bg-white rounded-xl shadow-sm p-8">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium mb-3">
              <span>實用範本</span>
              <span>·</span>
              <span>可直接複製</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              身分證影本簽註寫法完整範本 — 20 組常見場景可直接複製
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time dateTime="2026-08-27">2026 年 8 月 27 日</time>
              <span>·</span>
              <span>20 組範本</span>
              <span>·</span>
              <span>閱讀約 4 分鐘</span>
            </div>
          </header>

          <div className="prose prose-gray max-w-none">
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
              想知道簽註要寫在證件的哪個位置、正反面規則、手寫三行格式怎麼寫，看{" "}
              <Link href="/blog/watermark-templates-guide">身分證影本簽註寫法＋加註位置完整規則</Link>
              ；租屋情境的完整流程看{" "}
              <Link href="/blog/rent-id-watermark">租屋身分證影本加註怎麼寫</Link>
              ；影本外流會發生什麼事看{" "}
              <Link href="/blog/id-copy-leaked-consequences">身分證影本外流的後果</Link>。
              傳送前也建議先用{" "}
              <Link href="/exif-clean">EXIF 清除工具</Link>
              把照片裡的拍攝地點與時間一併移除。
            </p>

            <h2>常見問題</h2>

            <h3>簽註範本可以直接複製使用嗎？</h3>
            <p>
              可以。這頁 20 組範本都附一鍵複製按鈕，複製出來的文字已經帶上今天的日期，
              只要把 ○○ 換成實際的公司或機構名稱就能直接使用，手寫加註或數位浮水印都適用。
            </p>

            <h3>範本裡的 ○○ 要換成什麼？</h3>
            <p>
              換成實際收件的對象名稱，越具體越好。寫「僅供租屋使用」等於誰都能用，
              要寫成「僅供 大安房屋仲介 租屋簽約使用」。如果簽約對象還沒確定，至少要保留用途與日期。
            </p>

            <h3>簽註的日期要寫哪一天？</h3>
            <p>
              寫你交出影本的當天。日期的作用是限定這份影本的有效時間，
              事後被挪作他用時，過期的日期就是你主張未授權的依據。複製按鈕會自動帶入今天的日期。
            </p>

            <h3>一張影本要寫幾組簽註？</h3>
            <p>
              一個用途一組。正反面各是一張獨立影像，兩面都要各寫一次完整的「用途＋對象＋日期」，
              只寫一面等於另一面是完全沒有限制的乾淨影本。
            </p>

            <h3>同一份影本要交給兩個不同單位，可以共用嗎？</h3>
            <p>
              不要共用。回到工具重做一份，把對象換成第二個單位。
              共用一份等於簽註限定的對象失效，也失去了追溯來源的能力。
            </p>

            <h3>按了複製沒有反應怎麼辦？</h3>
            <p>
              多半是瀏覽器封鎖了剪貼簿權限（常見於非 HTTPS 或舊版 Safari）。
              範本文字本來就顯示在畫面上，直接長按選取複製即可，效果一樣。
            </p>

            <h3>浮水印文字要多大、透明度多少才合適？</h3>
            <p>
              透明度 30–50%、文字覆蓋整張證件、用重複或斜放排列效果最好。
              要能一眼看見浮水印，也要能看清楚證件內容——簽註的目的是限定用途，不是塗黑。
            </p>

            <h3>對方說有浮水印的影本不收，怎麼辦？</h3>
            <p>
              內政部本來就建議在證件影本上加註用途，正當的公司與機構都會接受。
              堅持只收乾淨影本的一方反而值得警覺，可以請對方說明為什麼不能加註。
            </p>

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
            <Link href="/blog/watermark-templates-guide" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">寫法規則</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">身分證影本簽註寫法＋加註位置：10 種情境範本與證件浮水印範例</h3>
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
