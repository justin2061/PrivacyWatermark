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

const URL = "https://imagemarker.app/blog/rent-before-giving-id-3-things";
const SLUG = "rent-before-giving-id-3-things";

export default function RentBeforeGivingId3Things() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "租屋必看：給房東證件影本前，這 3 件事一定要做 | ImageMarker",
      description:
        "租屋簽約，房東要你的身分證影本合理嗎？交出去前，這 3 件事一定要先做：加浮水印限定用途、遮蔽敏感資訊、保留交件證據。附 step by step 教學，教你安全交付、不怕個資被冒用。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: "租屋必看：給房東證件影本前，這 3 件事一定要做",
          description:
            "租屋交身分證影本給房東前，先做這 3 件事：加浮水印限定用途、遮蔽敏感資訊、保留交件證據。附 step by step 教學。",
          url: URL,
          datePublished: "2026-07-11",
          dateModified: "2026-07-11",
        }),
        blogBreadcrumb("租屋必看：給房東證件影本前，這 3 件事一定要做", URL),
        faqSchema([
          {
            q: "租屋房東要求身分證影本合理嗎？",
            a: "簽約時核對承租人身分是合理的，但通常「出示正本核對」或「加浮水印的影本」就足夠。房東沒有理由留存你未加保護的清晰影本，你有權要求限定用途或遮蔽部分資訊。",
          },
          {
            q: "身分證影本要遮住哪些資訊？",
            a: "簽約核身其實不需要完整的身分證字號。可視情況遮蔽或用浮水印覆蓋身分證字號的部分位數、以及不相關的欄位，只保留姓名與照片供核對即可。",
          },
          {
            q: "已經把影本給房東了，事後還能補救嗎？",
            a: "可以請房東用畢後刪除，並自己記錄交件時間與用途。日後若發現異常，撥打 165、查詢聯徵紀錄，必要時辦理身分證掛失換發。往後養成交件前加浮水印的習慣。",
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
            <time dateTime="2026-07-11" className="text-sm text-muted-foreground">
              2026-07-11
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              租屋必看：給房東證件影本前，這 3 件事一定要做
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              找到心儀的房子、談好租金，接著房東說一句「傳一下身分證影本給我建檔」，多數人幾乎是反射性地就把證件拍照傳了出去。畢竟房子難找，誰想在這種時候讓房東覺得你「很難搞」？
            </p>
            <p>
              但正是這個反射動作，讓不少租客的身分證影本流入了不該去的地方。這篇不是要你拒絕給影本，而是教你在<strong>交出去之前，先做好三件事</strong>——既能順利簽約，又能保護自己。
            </p>

            <h2>先搞懂：房東為什麼要你的證件影本？</h2>
            <p>
              合理的理由其實只有一個：<strong>核對承租人身分，確認簽約的人是本人</strong>。這在簽約當下用正本核對，或收一份加了浮水印的影本，就已經足夠。
            </p>
            <p>
              問題在於，很多房東會「順手」把你未加保護的清晰影本存在手機或電腦裡，一放就是整個租期。他不一定有惡意，但只要哪天手機遺失、電腦中毒、或影本被轉傳，你的個資就跟著曝光。<strong>風險不在房東本人，而在那張影本失控之後的去向。</strong>
            </p>
            <p>
              所以你要做的，不是質疑房東的人品，而是讓那張影本「就算外流也沒用」。以下三件事，簽約前花五分鐘就能做完。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>第 1 件事：加浮水印，寫明「僅供租屋使用」</h2>
            <p>
              這是最關鍵的一步。在影本上打一層半透明文字，明確標註<strong>用途＋對象＋日期</strong>，例如「僅供○○（房東姓名／地址）租屋簽約使用，2026.07」。
            </p>
            <p>
              重點是讓文字<strong>橫跨身分證字號與照片</strong>，而不是縮在角落。這樣一來，就算有人拿到影本，也很難把它 P 成一張「乾淨」的證件拿去辦門號、申貸——因為關鍵欄位上蓋著洗不掉的用途宣告，一送件就容易被櫃台識破。
            </p>

            <h2>第 2 件事：遮蔽用不到的敏感資訊</h2>
            <p>
              簽約核對身分，房東真的需要看到你完整的身分證字號嗎？多數情況並不需要。你可以<strong>遮蔽或用色塊蓋掉身分證字號的部分位數</strong>，以及其他和租屋無關的欄位，只保留姓名與照片供核對。
            </p>
            <p>
              「浮水印 + 局部遮蔽」是黃金組合：浮水印宣告用途，遮蔽則直接讓最敏感的資料看不到。給得剛好夠用，就是最安全的給法。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>第 3 件事：保留交件證據</h2>
            <p>
              交出影本後，別讓這件事船過水無痕。<strong>自己截圖或記錄「何時、給了誰、什麼用途、傳了哪一版影本」</strong>，並在對話中請房東「用畢後刪除」。
            </p>
            <p>
              這份紀錄平常用不到，但萬一日後名下冒出不明門號或貸款，它就是你釐清責任、向警方與業者說明的重要依據——證明你交出的是「限定用途、加了浮水印」的影本，而非任人挪用的空白版。
            </p>

            <h2>Step by Step：3 分鐘完成安全影本</h2>
            <p>
              用免費工具{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>{" "}
              就能一次搞定，全程在你自己的瀏覽器內處理，<strong>圖片不會上傳到任何伺服器</strong>：
            </p>
            <ol>
              <li>
                <strong>上傳影本：</strong>打開網站，把身分證影本照片拖進去（手機、電腦都適用，免安裝 App）。
              </li>
              <li>
                <strong>加浮水印：</strong>選「覆蓋整張圖片」模式，輸入用途文字，例如「僅供○○租屋簽約使用 2026.07」，調整透明度讓資料仍看得清、但文字明顯橫跨關鍵欄位。
              </li>
              <li>
                <strong>遮蔽敏感欄位：</strong>需要時，用馬賽克／色塊工具蓋掉身分證字號的部分位數。
              </li>
              <li>
                <strong>下載交件：</strong>下載處理好的影本，傳給房東，並截圖保留交件紀錄。
              </li>
            </ol>

            <h2>常見問題</h2>
            <p>
              <strong>Q：這樣做房東會不會覺得我很難搞？</strong>
              <br />
              A：加浮水印與遮蔽是很普遍的自保作法，正派房東通常都能理解。你仍然提供了可核對身分的影本，只是限定了用途——這是保護雙方的合理作法。
            </p>
            <p>
              <strong>Q：房東堅持要「沒有浮水印的乾淨影本」怎麼辦？</strong>
              <br />
              A：這時要提高警覺。簽約核身沒有理由堅持要未加保護的影本，你可以改用「出示正本當面核對」替代，或重新評估這位房東與物件是否可信。
            </p>
            <p>
              <strong>Q：只加浮水印、沒遮蔽，夠嗎？</strong>
              <br />
              A：加浮水印已能大幅提高冒用難度。若想更保險，再遮蔽身分證字號的部分位數更好。兩者搭配，安全度最高。
            </p>

            <h2>結語：給得剛好夠用，就是最好的保護</h2>
            <p>
              租屋交證件，不必在「怕租不到」和「怕被冒用」之間二選一。只要記得交件前的三件事——<strong>加浮水印、遮敏感、留證據</strong>——你就能既順利簽約，又把個資風險降到最低。
            </p>
            <p>
              下次房東再開口要影本前，先花三分鐘處理過再傳：{" "}
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
            <Link href="/blog/landlord-asks-for-id">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  房東要求提供證件影本，我該給嗎？完整分析
                </h3>
                <p className="text-sm text-muted-foreground">
                  房東要影本合理嗎？完整分析你的權利、能不能拒絕，附實用話術。
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
                  租屋要準備哪些文件？哪些能拒絕？教你安全交付身分證影本。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/id-copy-leaked-consequences">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分證影本外洩後會發生什麼事？2026 詐騙手法大公開
                </h3>
                <p className="text-sm text-muted-foreground">
                  影本外洩後可能被盜辦門號、申貸、開人頭帳戶，教你最簡單的自保方法。
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
