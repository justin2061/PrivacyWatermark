import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { InlineCTA } from "@/components/InlineCTA";
import { PopularTools } from "@/components/PopularTools";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/landlord-asks-for-id";
const SLUG = "landlord-asks-for-id";

export default function LandlordAsksForId() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "房東要求提供證件影本，我該給嗎？完整分析（2026）| ImageMarker",
      description:
        "房東要身分證影本合理嗎？租屋一定要給證件影本嗎？本篇完整分析你的權利、哪些能給哪些能拒絕、如何用浮水印安全交付，並附拒絕與折衷的實用話術。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: "房東要求提供證件影本，我該給嗎？完整分析",
          description:
            "房東要身分證影本合理嗎？本篇完整分析你的權利、哪些能給哪些能拒絕、如何用浮水印安全交付，並附實用話術。",
          url: URL,
          datePublished: "2026-07-07",
          dateModified: "2026-07-07",
        }),
        blogBreadcrumb("房東要求提供證件影本，我該給嗎？完整分析", URL),
        faqSchema([
          {
            q: "房東可以要求身分證影本嗎？",
            a: "房東為確認承租人身分、簽訂契約而核對身分證是合理的，但依《個資法》應在必要範圍內。核對正本通常已足夠，是否留存影本你可以協商。",
          },
          {
            q: "租屋可以拒絕給身分證影本嗎？",
            a: "可以協商以出示正本核對代替留存影本。若房東執意留存，建議只給加註『僅供○○租屋使用』浮水印的影本，而非乾淨影本。",
          },
          {
            q: "房東要健保卡、存摺影本合理嗎？",
            a: "單純住宅租賃通常不需要健保卡、存摺等影本，這些屬於過度蒐集。你可以詢問用途或婉拒，只提供必要的身分核對。",
          },
          {
            q: "如果一定要給影本，怎麼給最安全？",
            a: "在影本上用浮水印橫跨身分證字號與照片，寫明『僅供○○租屋使用＋日期』，透明度調 30–40%，用畢提醒房東刪除。",
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
              房東要求提供證件影本，我該給嗎？完整分析
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            {/* 精選摘要框 */}
            <div className="not-prose mb-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-primary mb-2">
                ✅ 快速結論
              </p>
              <p className="text-base leading-relaxed text-foreground m-0">
                房東為簽約「核對」你的身分是合理的，但依《個資法》應限於必要範圍。最安全的做法是<strong>出示正本供核對、不留影本</strong>；若房東堅持留存，就只給<strong>加註「僅供○○租屋使用」浮水印</strong>的影本，而不是一張乾淨影本。
              </p>
            </div>

            <p>
              簽約在即，房東一句「身分證影本給我留一份建檔」，讓不少租客心裡犯嘀咕：該給嗎？不給會不會租不到？給了會不會被冒用？這篇幫你把「該不該給、能不能拒絕、要給怎麼給」一次講清楚。
            </p>

            <h2>房東要證件影本，合理嗎？</h2>
            <p>
              先說結論：<strong>房東要「核對」你的身分是合理的，但「留存影本」不是理所當然。</strong>
            </p>
            <p>
              房東出租房屋，確認承租人真實身分、避免把房子租給假身分的人，是正當需求。但依《個人資料保護法》，蒐集個資必須有特定目的、且不得逾越必要範圍。換句話說——為了簽約核對身分，<strong>看你的身分證正本通常就夠了</strong>，是否需要留下一份影本，是可以協商的。
            </p>

            <h3>哪些要求算「過度蒐集」？</h3>
            <p>
              下列情況通常超出租屋必要範圍，你有權詢問用途或婉拒：
            </p>
            <ul>
              <li>要求健保卡、存摺封面、信用卡影本。</li>
              <li>要求身分證正反面「乾淨」影本留存，卻說不出具體用途。</li>
              <li>在看屋、還沒談定條件的階段就要你先交證件。</li>
            </ul>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>該給嗎？三種情境的建議</h2>

            <h3>情境一：房東只是要核對身分</h3>
            <p>
              最理想。當面出示身分證正本讓房東確認，契約上填寫姓名與身分證字號即可，<strong>不需要留影本</strong>。
            </p>

            <h3>情境二：房東堅持要留一份影本建檔</h3>
            <p>
              可以給，但<strong>絕不要給乾淨影本</strong>。務必先加上浮水印，寫明「僅供○○房東租屋建檔使用，他用無效，2026/07/07」，並用浮水印橫跨身分證字號與照片，讓影本無法被挪去辦門號、貸款。
            </p>

            <h3>情境三：房東要求健保卡、存摺等額外證件</h3>
            <p>
              這通常是過度蒐集。你可以直接詢問：「請問這份資料的用途是什麼？」多數情況下房東說不出必要理由，就可以婉拒，只提供身分核對即可。
            </p>

            <h2>如何禮貌拒絕或折衷？實用話術</h2>
            <p>
              拒絕不代表撕破臉，你可以這樣說：
            </p>
            <ul>
              <li>
                <strong>折衷核對：</strong>「身分證我帶正本給您當面核對，這樣您也能確認是本人，我就不另外留影本了，可以嗎？」
              </li>
              <li>
                <strong>加浮水印版本：</strong>「沒問題，我提供一份加註『僅供租屋使用』的影本給您建檔，這也是保護雙方，避免資料外流的責任問題。」
              </li>
              <li>
                <strong>婉拒額外證件：</strong>「健保卡跟存摺就先不提供了，租屋應該用不到這些，如果後續有需要再麻煩您告訴我用途。」
              </li>
            </ul>
            <p>
              把「加浮水印」講成是<strong>保護雙方</strong>的做法，房東通常都能接受。若對方堅持一定要乾淨影本、又說不出理由，反而要提高警覺。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>一定要給，就這樣安全交付</h2>
            <p>
              用{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>{" "}
              幫影本加浮水印，只要三步驟：上傳證件照片、輸入「僅供○○租屋使用＋日期」、選「覆蓋整張圖片」模式下載。透明度建議 30–40%，既看得清內容、又難以裁切去除。整個過程都在你自己的瀏覽器內完成，圖片<strong>不會上傳到任何伺服器</strong>，用起來安心。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：租屋可以拒絕給身分證影本嗎？</strong>
              <br />
              A：可以協商以出示正本核對代替留存影本。若房東執意留存，建議只給加浮水印、限定用途的影本。
            </p>
            <p>
              <strong>Q：房東要健保卡、存摺影本合理嗎？</strong>
              <br />
              A：單純住宅租賃通常不需要，屬於過度蒐集。你可以詢問用途或婉拒。
            </p>
            <p>
              <strong>Q：如果一定要給影本，怎麼給最安全？</strong>
              <br />
              A：用浮水印橫跨身分證字號與照片，寫明「僅供○○租屋使用＋日期」，用畢提醒房東刪除。
            </p>

            <h2>結語：給得有底線，租得更安心</h2>
            <p>
              面對房東要證件影本，你不必為難，也不必照單全收。記住原則：<strong>能核對正本就不留影本，要留影本就加浮水印限定用途，額外證件可婉拒。</strong>守住這條底線，租屋才能租得安心。
            </p>
            <p>
              立即幫證件影本加浮水印：{" "}
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
            <Link href="/blog/rent-required-documents">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  租屋簽約要交哪些文件？身分證影本安全交付指南
                </h3>
                <p className="text-sm text-muted-foreground">
                  租屋要準備哪些文件？哪些能拒絕？教你安全交付身分證影本、加浮水印自保。
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
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            © 2026 ImageMarker — 保護您的隱私安全
          </p>
        </div>
      </footer>
    </div>
  );
}
