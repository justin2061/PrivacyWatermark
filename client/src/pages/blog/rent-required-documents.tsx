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

const URL = "https://imagemarker.app/blog/rent-required-documents";
const SLUG = "rent-required-documents";

export default function RentRequiredDocuments() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "租屋簽約要交哪些文件？身分證影本安全交付指南（2026）| ImageMarker",
      description:
        "租屋簽約到底要準備哪些文件？房東可以要身分證影本嗎？本篇整理租屋必備文件清單，並教你如何安全交付身分證影本、加浮水印自保，避免個資被冒用。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: "租屋簽約要交哪些文件？身分證影本安全交付指南",
          description:
            "租屋簽約到底要準備哪些文件？房東可以要身分證影本嗎？本篇整理租屋必備文件清單，並教你如何安全交付身分證影本、加浮水印自保。",
          url: URL,
          datePublished: "2026-07-07",
          dateModified: "2026-07-07",
        }),
        blogBreadcrumb("租屋簽約要交哪些文件？身分證影本安全交付指南", URL),
        faqSchema([
          {
            q: "租屋簽約一定要給房東身分證影本嗎？",
            a: "簽約時房東確認承租人身分是合理的，但「核對」正本即可，不一定要留存影本。若房東要留存，建議只給加註用途浮水印的影本，並保留正本自行核對。",
          },
            {
            q: "租屋要準備哪些文件？",
            a: "一般需要：本人身分證（供核對）、印章或簽名、押金與首期租金、以及保證人資料（部分房東要求）。學生或外籍人士可能另需在學證明或居留證件。",
          },
          {
            q: "身分證影本上寫『僅供租屋使用』有法律效力嗎？",
            a: "加註用途能明確限定影本的蒐集目的，依《個資法》對方不得逾越目的使用。萬一被冒用，這行字也是你申訴、報案時的有力證據。",
          },
          {
            q: "可以用手機拍身分證傳給房東嗎？",
            a: "可以，多數房東接受清晰的照片檔。傳送前務必先加上「僅供○○租屋使用＋日期」的浮水印，並提醒對方用畢刪除。",
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
          <Link href="/blog" className="hover:text-foreground transition-colors">
            部落格
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time dateTime="2026-07-07" className="text-sm text-muted-foreground">
              2026-07-07
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              租屋簽約要交哪些文件？身分證影本安全交付指南
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              找到心儀的房子、談好租金，接下來就是簽約。這時房東或仲介往往會列出一串「要準備的文件」，其中最讓人猶豫的，就是<strong>身分證影本</strong>。到底租屋簽約要交哪些文件？哪些一定要給、哪些可以拒絕？這篇一次講清楚，並教你怎麼把個資風險降到最低。
            </p>

            <h2>租屋簽約必備文件清單</h2>
            <p>
              一般民間租屋（住宅），承租人常會被要求準備以下項目：
            </p>
            <ul>
              <li>
                <strong>本人身分證：</strong>用於「核對」身分，確認簽約人就是本人。重點是核對，不一定等於要留影本。
              </li>
              <li>
                <strong>印章或簽名：</strong>用於在租賃契約上用印、簽署。
              </li>
              <li>
                <strong>押金與首期租金：</strong>依內政部定型化契約，押金上限為 2 個月租金。
              </li>
              <li>
                <strong>保證人資料（視情況）：</strong>部分房東會要求提供保證人，學生族群尤其常見。
              </li>
              <li>
                <strong>其他證明（視身分）：</strong>學生可能需在學證明、外籍人士需居留證或護照。
              </li>
            </ul>

            <h3>哪些「不需要」交？</h3>
            <p>
              健保卡影本、存摺影本、信用卡資料，在單純住宅租賃通常<strong>都不是必要文件</strong>。若房東額外索取這些，你有權詢問用途，或直接婉拒。租屋不是辦貸款，不需要交出這麼多敏感資料。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>身分證影本：核對正本，別隨手留影本</h2>
            <p>
              最安全的做法是：<strong>當面出示身分證正本讓房東核對，但不留下影本</strong>。契約上填寫姓名與身分證字號即可，多數情況足夠。
            </p>
            <p>
              如果房東堅持要「留存」一份影本建檔，也不是不能給，但你必須做兩件事保護自己：
            </p>

            <h3>1. 只給「加註用途」的影本</h3>
            <p>
              在影本上明確寫出：<strong>「僅供○○房東／○○租屋處租賃建檔使用，他用無效，日期 2026/07/07」</strong>。這行字讓影本只能用於這次租屋，一旦被挪用去辦門號、貸款，就會被櫃台與系統擋下，也讓對方承擔違反《個資法》蒐集目的的責任。
            </p>

            <h3>2. 用浮水印覆蓋，不要只在角落寫字</h3>
            <p>
              手寫在角落的字很容易被裁切、修圖去掉。正確做法是用浮水印<strong>橫跨身分證字號與照片區域</strong>，讓任何想去除浮水印的人都會連帶破壞關鍵資訊。用{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>{" "}
              選擇「覆蓋整張圖片」模式，把透明度調在 30–40%，一分鐘就能完成，而且所有處理都在你自己的瀏覽器內完成，圖片不會上傳到任何伺服器。
            </p>

            <h2>交付影本的 3 個安全原則</h2>
            <p>
              <strong>原則一：能出示正本核對，就不留影本。</strong>
              <br />
              這是風險最低的方式。
            </p>
            <p>
              <strong>原則二：一定要留影本，就加浮水印限定用途。</strong>
              <br />
              寫明「用途＋對象＋日期」三要素，缺一不可。
            </p>
            <p>
              <strong>原則三：用通訊軟體傳送後，提醒對方用畢刪除。</strong>
              <br />
              LINE、Email 傳送的影本會留在對方裝置與雲端，務必先加浮水印，並主動提醒刪除。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>常見問題</h2>
            <p>
              <strong>Q：租屋簽約一定要給房東身分證影本嗎？</strong>
              <br />
              A：不一定。房東確認你的身分是合理的，但「核對正本」通常就足夠。若要留存影本，請只給加註用途浮水印的版本。
            </p>
            <p>
              <strong>Q：身分證影本寫「僅供租屋使用」真的有效嗎？</strong>
              <br />
              A：有效。加註用途明確限定了影本的蒐集目的，依《個資法》對方不得逾越目的使用；萬一被冒用，這也是你申訴、報案的直接證據。
            </p>
            <p>
              <strong>Q：可以用手機拍身分證傳給房東嗎？</strong>
              <br />
              A：可以，重點是四角完整、無反光、文字清楚。傳送前務必先加浮水印，並提醒對方用畢刪除。
            </p>

            <h2>結語：文件給得剛好，個資守得牢</h2>
            <p>
              租屋簽約其實需要的文件不多，關鍵是「給得剛好」——該核對的核對，不必要的不給，必須留存的就加浮水印限定用途。花一分鐘保護自己，遠比事後花好幾個月處理身分冒用划算得多。
            </p>
            <p>
              立即幫身分證影本加浮水印：{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://imagemarker.app
              </a>
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
                  租屋前必看！教你用 ImageMarker 三步驟幫身分證影本加上浮水印，防止個資被冒用。
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
                  房東要身分證影本合理嗎？哪些能給、哪些能拒絕？一篇搞懂你的權利與自保方法。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/rent-scam-id-fraud">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  租屋詐騙手法大公開：如何避免證件被冒用
                </h3>
                <p className="text-sm text-muted-foreground">
                  假房東、假仲介、要求證件影本……拆解常見租屋詐騙手法，教你保護證件不被冒用。
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
