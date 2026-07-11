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

const URL = "https://imagemarker.app/blog/job-interview-id-copy-safety";
const SLUG = "job-interview-id-copy-safety";

export default function JobInterviewIdCopySafety() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "求職面試要交身分證影本？小心這些陷阱，教你安全提交 | ImageMarker",
      description:
        "面試就要你交身分證影本、存摺影本，合理嗎？本篇教你分辨哪些情況合理（入職手續）、哪些是求職詐騙陷阱，以及安全提交證件的方法：加浮水印、備註用途、遮蔽敏感資訊。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline:
            "求職面試要交身分證影本？小心這些陷阱，教你安全提交",
          description:
            "面試就要身分證影本合理嗎？教你分辨合理的入職手續與求職詐騙陷阱，以及安全提交證件的方法。",
          url: URL,
          datePublished: "2026-07-11",
          dateModified: "2026-07-11",
        }),
        blogBreadcrumb(
          "求職面試要交身分證影本？小心這些陷阱，教你安全提交",
          URL
        ),
        faqSchema([
          {
            q: "面試階段就要求繳交身分證影本合理嗎？",
            a: "通常不合理。核對身分、辦理勞健保等需要證件的程序，多半發生在確定錄取、報到入職之後。面試階段就索取證件影本、存摺影本或要求押證件，都應提高警覺。",
          },
          {
            q: "公司說要辦勞健保，要我先給身分證影本，可以嗎？",
            a: "辦理勞健保確實需要身分資料，但這應在你確定入職、簽訂勞動契約後進行。即使合理，也建議提供加了浮水印、註明「僅供○○公司到職勞健保使用」的影本，並保留紀錄。",
          },
          {
            q: "求職時哪些要求是詐騙警訊？",
            a: "要求繳保證金、押身分證正本、先辦門號或辦信用卡、要你提供存摺與提款卡、面試地點在私人住所或臨時據點，都是常見的求職詐騙警訊。",
          },
          {
            q: "怎麼安全地把證件影本交給公司？",
            a: "交件前先加浮水印，寫明用途與日期，並遮蔽用不到的欄位（如身分證字號部分位數），再透過公司正式管道提交，同時自己保留交件紀錄。",
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
              求職面試要交身分證影本？小心這些陷阱，教你安全提交
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              找工作已經夠焦慮了，好不容易接到面試通知，對方卻在面試當天、甚至還沒面試就說：「麻煩先把身分證正反面影本、存摺封面拍給我們建檔。」在急著想要這份工作的心情下，很多人就照做了。
            </p>
            <p>
              但這裡藏著一個關鍵問題：<strong>哪些情況要證件是合理的，哪些其實是求職詐騙的陷阱？</strong>這篇幫你把界線畫清楚，並教你就算真的需要交，也能交得安全。
            </p>

            <h2>合理 vs 不合理：什麼時候該給證件？</h2>
            <p>
              先記住一個大原則：<strong>需要證件的程序，幾乎都發生在「確定錄取、報到入職」之後，而不是面試階段。</strong>
            </p>

            <h3>✅ 相對合理的情況</h3>
            <ul>
              <li>
                <strong>確定錄取、辦理報到：</strong>簽訂勞動契約、辦理勞健保加保，這些確實需要你的身分資料。
              </li>
              <li>
                <strong>入職後的員工建檔：</strong>薪轉帳戶、緊急聯絡人等，屬於正式到職手續的一部分。
              </li>
            </ul>
            <p>
              即使是這些合理情況，你依然可以提供<strong>加了浮水印、註明用途</strong>的影本，而不是任人存放的空白版。
            </p>

            <h3>🚫 高風險、不合理的情況</h3>
            <ul>
              <li>
                <strong>還在面試階段就索取證件影本：</strong>面試是雙向評估，公司此時沒有正當理由留存你的身分證影本。
              </li>
              <li>
                <strong>要求繳「保證金」「服裝費」「教材費」：</strong>正當公司不會要求求職者先付錢。
              </li>
              <li>
                <strong>要你押身分證正本、或先辦門號、辦信用卡：</strong>這是典型的證件與門號盜用手法。
              </li>
              <li>
                <strong>索取存摺、提款卡、網銀密碼：</strong>幾乎可以斷定是要你的帳戶當人頭洗錢，千萬別給。
              </li>
            </ul>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>求職詐騙常見的 3 種劇本</h2>

            <h3>劇本一：假職缺、真蒐證</h3>
            <p>
              以高薪、輕鬆、免經驗的職缺吸引投履歷，面試草草了事，重點全放在「請先交證件影本、存摺影本建檔」。目的根本不是聘你，而是蒐集你的個資與帳戶。
            </p>

            <h3>劇本二：以「辦理入職」為名，騙證件辦門號</h3>
            <p>
              對方假裝已錄取你，要求先傳身分證影本「辦理員工手機門號」或「公司系統帳號」，實際是拿去盜辦門號、申貸。等你發現時，名下已多出你沒辦過的東西。
            </p>

            <h3>劇本三：人頭帳戶陷阱</h3>
            <p>
              以「薪資撥款需要」為由索取存摺、提款卡甚至網銀密碼。一旦交出，你的帳戶就成了詐騙贓款的中繼站，最後被列為警示帳戶、還得跑警局說明。<strong>任何工作都不需要你的提款卡與密碼。</strong>
            </p>

            <h2>真的要交，怎麼交才安全？</h2>
            <p>
              當你判斷這是合理的入職手續、決定提供影本時，交件前先做這三件事，把風險降到最低：
            </p>
            <p>
              <strong>1. 加浮水印，寫明用途與日期。</strong>
              <br />
              在影本上打一層半透明文字，例如「僅供○○公司到職勞健保使用，2026.07」，並讓文字橫跨身分證字號與照片，讓影本無法被挪作他用。
            </p>
            <p>
              <strong>2. 遮蔽用不到的敏感資訊。</strong>
              <br />
              視需要遮蔽身分證字號的部分位數等非必要欄位，只保留辦理手續真正需要的資料。
            </p>
            <p>
              <strong>3. 走正式管道、保留紀錄。</strong>
              <br />
              透過公司正式的 HR 信箱或系統提交，而非私人 LINE；同時截圖記錄交件時間、對象與用途，作為日後憑證。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>3 分鐘做好一份安全影本</h2>
            <p>
              用免費工具{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>{" "}
              即可完成，全程在你的瀏覽器內處理，<strong>圖片不會上傳到任何伺服器</strong>：
            </p>
            <ol>
              <li>打開網站，上傳身分證影本照片（手機、電腦皆可，免安裝 App）。</li>
              <li>選「覆蓋整張圖片」模式，輸入用途文字，例如「僅供○○公司到職使用 2026.07」。</li>
              <li>需要時用馬賽克／色塊蓋掉身分證字號部分位數，下載後透過公司正式管道提交。</li>
            </ol>

            <h2>結語：先分辨，再提交</h2>
            <p>
              求職路上，保護自己和爭取工作並不衝突。記住這個順序：<strong>先分辨這個要求合不合理，再決定要不要交、怎麼交</strong>。面試階段一律不交證件；確定入職後要交，也先加浮水印、遮敏感、留紀錄。
            </p>
            <p>
              下次收到「請先傳身分證影本」的訊息前，先冷靜判斷，再花三分鐘處理過再送出：{" "}
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
            <Link href="/blog/other-documents-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  不只身分證！存摺、健保卡、駕照影本也要加浮水印
                </h3>
                <p className="text-sm text-muted-foreground">
                  存摺、健保卡、駕照影本也是詐騙高危目標，教你 6 種證件的浮水印寫法。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/id-watermark-complete-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  證件影本加浮水印完整教學：5 種情境、3 步驟搞定
                </h3>
                <p className="text-sm text-muted-foreground">
                  從什麼是證件浮水印到 5 種常見情境的完整教學，3 步驟輕鬆完成。
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
