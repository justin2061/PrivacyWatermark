import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/rent-scam-id-fraud";

export default function RentScamIdFraud() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "租屋詐騙手法大公開：如何避免證件被冒用（2026 最新）| ImageMarker",
      description:
        "假房東、假仲介、要求先交證件影本……租屋詐騙花招百出。本篇拆解 5 種常見租屋詐騙與證件冒用手法，教你如何辨識詐騙、保護身分證影本不被拿去盜辦門號與貸款。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: "租屋詐騙手法大公開：如何避免證件被冒用",
          description:
            "假房東、假仲介、要求先交證件影本……本篇拆解 5 種常見租屋詐騙與證件冒用手法，教你如何辨識詐騙、保護身分證影本不被冒用。",
          url: URL,
          datePublished: "2026-07-07",
          dateModified: "2026-07-07",
        }),
        blogBreadcrumb("租屋詐騙手法大公開：如何避免證件被冒用", URL),
        faqSchema([
          {
            q: "身分證影本外洩會被拿去做什麼？",
            a: "常見被冒用於盜辦手機門號、開立人頭帳戶、申辦小額貸款或信用卡，甚至登記為人頭公司負責人。因此提供影本前務必加註用途浮水印。",
          },
          {
            q: "怎麼判斷租屋廣告是不是詐騙？",
            a: "價格明顯低於行情、房東急著要你先付訂金或先傳證件、拒絕看屋或視訊看屋、要求匯款到私人帳戶，這些都是高風險警訊。",
          },
          {
            q: "已經把沒加浮水印的身分證影本傳出去了怎麼辦？",
            a: "留意近期的門號、貸款、聯徵紀錄，必要時撥打 165 反詐騙專線諮詢或辦理身分證掛失換發。之後所有影本都養成加浮水印的習慣。",
          },
          {
            q: "加浮水印能完全防止證件被冒用嗎？",
            a: "無法 100% 防止，但能大幅提高冒用難度、增加被櫃台識破的機率，並在事後成為有力證據。搭配辨識詐騙、不亂傳證件，才是完整自保。",
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
              租屋詐騙手法大公開：如何避免證件被冒用
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              租屋市場僧多粥少，詐騙集團正是看準租客「怕租不到、急著搶下好房」的心理下手。輕則被騙訂金，重則<strong>身分證影本被拿去盜辦門號、貸款、開人頭公司</strong>，麻煩纏身好幾個月。本篇拆解 5 種常見的租屋詐騙與證件冒用手法，並教你怎麼保護自己。
            </p>

            <h2>5 種常見租屋詐騙手法</h2>

            <h3>手法一：假房東、假物件騙訂金</h3>
            <p>
              詐騙者盜用他人真實的房屋照片，用遠低於行情的租金刊登廣告，等你上鉤後便催促「先付訂金卡位」。等你匯款到指定帳戶，人就消失了。<strong>看屋前絕不付訂金</strong>是鐵則。
            </p>

            <h3>手法二：要求「先傳證件」才能看屋</h3>
            <p>
              「要先確認你是不是誠意租客，請先傳身分證正反面。」這是套取個資的典型話術。正常流程是先看屋、談妥條件才進到簽約與核對身分，<strong>沒有哪個階段需要你先把證件影本傳給素未謀面的人</strong>。
            </p>

            <h3>手法三：假仲介、假代管收取費用與證件</h3>
            <p>
              冒充房仲或「二房東代管」，一次要走服務費、押金與你的證件影本。查證對方是否為合法登記的不動產經紀業、要求出示不動產經紀人證書，能過濾掉大部分假仲介。
            </p>

            <h3>手法四：以「建檔」「辦理入住」名義留存證件</h3>
            <p>
              就算是真房東，也可能在無惡意的情況下把你的證件影本隨手存在手機或電腦，日後裝置遺失、外洩，你的個資就跟著曝光。這也是為什麼影本一定要限定用途。
            </p>

            <h3>手法五：釣魚連結、假租屋平台</h3>
            <p>
              以「填資料驗證身分」「上傳證件完成媒合」為由，誘導你在假網站上傳證件照片。認明官方平台網址、不點來路不明的連結，是基本防線。
            </p>

            <h2>證件被冒用，會發生什麼事？</h2>
            <p>
              一張外洩的身分證影本，在詐騙集團手上可能被用來：
            </p>
            <ul>
              <li>盜辦手機門號，累積高額欠費或作為詐騙工具。</li>
              <li>開立人頭帳戶，淪為洗錢或詐騙的收款戶。</li>
              <li>申辦小額貸款、信用卡，讓你背上莫名債務。</li>
              <li>登記為人頭公司負責人，承擔稅務與法律責任。</li>
            </ul>
            <p>
              這些都不是危言聳聽，而是歷年防詐通報中反覆出現的真實手法。事後要一一申訴、報案、澄清，往往要耗上好幾個月。
            </p>

            <h2>如何避免證件被冒用？4 個自保重點</h2>
            <p>
              <strong>1. 看屋前不傳證件、不付訂金。</strong>
              <br />
              任何「先傳證件、先付款」的要求都要高度警覺。
            </p>
            <p>
              <strong>2. 查證房東與仲介身分。</strong>
              <br />
              要求核對房屋權狀、身分證正本，仲介則確認經紀業登記與證照。
            </p>
            <p>
              <strong>3. 真的要交影本，一定加浮水印限定用途。</strong>
              <br />
              寫明「僅供○○租屋使用＋日期」，並用浮水印橫跨身分證字號與照片，讓影本無法被挪作他用。可用{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>{" "}
              的「覆蓋整張圖片」模式，一分鐘完成，且圖片完全不會上傳到任何伺服器，全程在你自己的瀏覽器內處理。
            </p>
            <p>
              <strong>4. 傳送後提醒對方刪除，並保留紀錄。</strong>
              <br />
              用畢請對方刪除影本，同時自己截圖保存「何時、給了誰、什麼用途」，作為日後追究的依據。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：怎麼判斷租屋廣告是不是詐騙？</strong>
              <br />
              A：價格明顯低於行情、催促先付訂金或先傳證件、拒絕看屋、要求匯款到私人帳戶，都是高風險警訊。
            </p>
            <p>
              <strong>Q：已經把沒加浮水印的身分證影本傳出去了怎麼辦？</strong>
              <br />
              A：留意近期門號、貸款與聯徵紀錄，必要時撥打 165 反詐騙專線諮詢，或辦理身分證掛失換發；之後所有影本都養成加浮水印的習慣。
            </p>
            <p>
              <strong>Q：加浮水印能完全防止證件被冒用嗎？</strong>
              <br />
              A：無法 100% 防止，但能大幅提高冒用難度、增加被識破機率，並在事後成為有力證據。搭配辨識詐騙、不亂傳證件，才是完整自保。
            </p>

            <h2>結語：警覺心＋浮水印，雙重防線</h2>
            <p>
              對付租屋詐騙，最好的武器是「警覺心」加上「限定用途的浮水印」。前者讓你不上鉤，後者讓萬一外洩的影本也難以被冒用。下次要交證件影本前，先花一分鐘加上浮水印，把風險擋在門外。
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
            <Link href="/blog/is-id-watermark-useful">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分證浮水印有用嗎？真相解析＋3 個真實案例
                </h3>
                <p className="text-sm text-muted-foreground">
                  浮水印真的擋得住冒用嗎？用 3 個真實案例與個資法依據告訴你答案。
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
                  租屋要準備哪些文件？哪些能拒絕？教你安全交付身分證影本、加浮水印自保。
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
