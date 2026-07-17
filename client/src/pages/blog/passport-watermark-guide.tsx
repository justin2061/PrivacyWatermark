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

const URL = "https://imagemarker.app/blog/passport-watermark-guide";
const SLUG = "passport-watermark-guide";

export default function PassportWatermarkGuide() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "護照影本也要加浮水印！出國前必看的護照安全指南 | ImageMarker",
      description:
        "出國旅遊交護照影本給旅行社前，一定要先加浮水印！本篇教你護照浮水印怎麼寫、放哪個位置最安全，附 5 種常見範本。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: "護照影本也要加浮水印！出國前必看的護照安全指南",
          description:
            "出國旅遊交護照影本給旅行社前，一定要先加浮水印！本篇教你護照浮水印怎麼寫、放哪個位置最安全，附 5 種常見範本。",
          url: URL,
          datePublished: "2026-05-27",
          dateModified: "2026-05-27",
        }),
        blogBreadcrumb("護照影本也要加浮水印！出國前必看的護照安全指南", URL),
        faqSchema([
          {
            q: "旅行社說護照影本加浮水印他們系統無法辨識怎麼辦？",
            a: "正規旅行社一定能接受加註用途的浮水印，這是國際慣例。如果對方堅持要「乾淨」的影本，建議改換其他業者，這可能是個警訊。",
          },
          {
            q: "護照影本需要寄出實體版本，浮水印有用嗎？",
            a: "實體影本一樣可以印出帶浮水印的版本，效果相同。事實上實體影本更容易被多次複印流通，加浮水印更重要。",
          },
          {
            q: "簽證代辦說要看「無浮水印正本」，這正常嗎？",
            a: "申請簽證的「正本」是指護照本人，不是影本。代辦只需要影本用來填寫資料表，加浮水印完全合理。如果對方堅持要無浮水印影本，建議直接拒絕。",
          },
          {
            q: "護照效期欄位被浮水印蓋住了怎麼辦？",
            a: "調整浮水印位置避開效期欄位，或降低該區域的透明度。ImageMarker 支援即時預覽，可以反覆調整到滿意為止。",
          },
          {
            q: "護照照片頁很多資訊密集，浮水印會不會反而看不清楚？",
            a: "透明度設定在 30-40% 時，浮水印與資料都能清晰辨識。如果你發現浮水印太淡，可以加粗字體或加深顏色。",
          },
          {
            q: "護照影本可以用手機拍照代替嗎？",
            a: "可以。多數旅行社與簽證中心接受清晰的拍照檔或掃描檔，重點是護照四角完整入鏡、無反光、文字清楚可辨。交出前記得先加上浮水印，防止照片檔被挪作他用。",
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
              dateTime="2026-05-27"
              className="text-sm text-muted-foreground"
            >
              2026-05-27
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              護照影本也要加浮水印！出國前必看的護照安全指南
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              準備出國旅遊，旅行社請你把護照影本傳過去；申請簽證，代辦業者要你拍張護照基本資料頁；公司外派，人事部要你提供護照掃描檔——這些情境是不是很熟悉？但你有沒有想過，這張護照影本一旦離開你的手，就可能被儲存在不知道多少台電腦、雲端硬碟、甚至是業務員的手機相簿裡？
            </p>
            <p>
              護照上的資料比身分證更敏感：護照號碼、出生日期、英文姓名、發照日期、效期，任何一項被有心人取得，都可能被用來偽造身分、申辦境外帳戶，甚至是國際詐騙的工具。出國前的這道防線，請務必做好。
            </p>

            <h2>為什麼護照影本特別需要浮水印？</h2>
            <p>
              身分證影本一般只在台灣境內被使用，但護照影本流通範圍更廣——旅行社、航空公司、海外接待單位、簽證機構，甚至國外的飯店都可能拿到。流通路徑越長，外洩風險越高。
            </p>
            <p>
              更關鍵的是，護照號碼一旦外洩，補辦程序遠比身分證複雜，還需要重新申辦各國簽證。事前花一分鐘加浮水印，比事後處理輕鬆太多。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>護照影本怎麼印？</h2>
            <p>
              很多人出國前才發現家裡沒有印表機，其實要印護照影本有三種簡單做法：
            </p>
            <p>
              <strong>1. 影印店：</strong>
              <br />
              帶護照到影印店，請店家影印「基本資料頁」（有照片那一頁）即可。彩色或黑白都可以，多數用途不要求彩色，黑白影本便宜又夠用。
            </p>
            <p>
              <strong>2. 超商多功能事務機：</strong>
              <br />
              7-11、全家等超商的多功能事務機都能影印。把護照攤平放在掃描玻璃上，選擇影印功能即可。建議用 A4 紙、縮放比例維持 100% 原尺寸，資料清楚可辨最重要，不需要刻意放大。
            </p>
            <p>
              <strong>3. 手機拍照後轉印：</strong>
              <br />
              用手機把護照基本資料頁拍清楚（四角完整、避免反光），再透過超商的雲端列印服務（ibon、FamiPort）上傳檔案印出。這個做法最大的好處是——印出前可以先幫電子檔加上浮水印。
            </p>
            <p>
              無論用哪種方式，最安全的做法都是<strong>先在電子檔上加好浮水印再列印</strong>。紙本影本一旦交出去，就可能被再次複印流通；而印出來就帶有浮水印的影本，每一份複製品都會保留「僅供 OO 用途」的標記。列印前先到{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>{" "}
              處理，只要一分鐘。
            </p>

            <h3>護照影本的常見用途</h3>
            <p>
              最常需要護照影本的場合包括：<strong>辦簽證</strong>（簽證中心或代辦通常要求 A4 影本或掃描檔）、<strong>旅行社報名</strong>（訂機票、訂房、團體旅遊報名）、<strong>飯店入住</strong>（部分國外飯店會留存護照影本）。不論交給誰，都建議依照下面的範本加上對應用途的浮水印。
            </p>

            <h2>5 種常見情境的護照浮水印範本</h2>
            <p>
              針對不同用途，浮水印的寫法略有差異。以下是 5 種最常見的情境範本，可以直接套用：
            </p>
            <p>
              <strong>1. 旅行社訂機票/訂房：</strong>
              <br />
              「僅供 OO 旅行社 2026 年 6 月日本行訂房使用 2026/05/27」
            </p>
            <p>
              <strong>2. 申請簽證/代辦：</strong>
              <br />
              「僅供 OO 簽證代辦申請美國 B1/B2 簽證使用 2026/05/27」
            </p>
            <p>
              <strong>3. 外商公司報到/外派：</strong>
              <br />
              「僅供 OO 公司人事部入職資料使用 2026/05/27」
            </p>
            <p>
              <strong>4. 海外租屋/長住申請：</strong>
              <br />
              「僅供 OO 房屋仲介東京新宿區租屋使用 2026/05/27」
            </p>
            <p>
              <strong>5. 學校交換/留學申請：</strong>
              <br />
              「僅供 OO 大學國際處交換學生申請使用 2026/05/27」
            </p>
            <p>
              寫法的核心三要素：<strong>用途 + 對象 + 日期</strong>。日期建議寫到「年月日」，避免被當作可長期使用的影本。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>浮水印放哪個位置最安全？</h2>
            <p>
              很多人會擔心浮水印蓋住護照資料，導致對方無法辨識。其實有幾個技巧可以兼顧安全與可讀性：
            </p>
            <p>
              <strong>最推薦：覆蓋整張護照</strong>
              <br />
              使用斜向或重複排列的浮水印覆蓋整張圖片，這樣即使影本被裁切或局部使用，浮水印依然存在。透明度建議 30-40%，文字仍清晰但不影響資料讀取。
            </p>
            <p>
              <strong>次推薦：橫跨護照號碼區</strong>
              <br />
              如果一定要單一位置，建議橫跨「護照號碼」與「個人照片」區域。這兩個區域是身分驗證最關鍵的部分，浮水印放在這裡可以有效防止這些資料被獨立擷取使用。
            </p>
            <p>
              <strong>避免的位置：</strong>
              <br />
              不要只放在四個角落或邊緣，這些位置很容易被裁切移除。
            </p>

            <h2>3 步驟用 ImageMarker 幫護照加浮水印</h2>

            <h3>步驟一：拍攝或掃描護照基本資料頁</h3>
            <p>
              用手機拍攝護照基本資料頁時，盡量在光線充足、平整的背景下拍攝。打開{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>
              ，把照片拖進上傳區，或點「選擇檔案」上傳。整個過程不會上傳到任何伺服器，所有處理都在你的瀏覽器中完成。
            </p>

            <h3>步驟二：套用浮水印範本</h3>
            <p>
              在浮水印文字輸入框填入上面提到的範本，依照你的用途調整對象和日期。建議選擇「覆蓋整張圖片」模式，並把透明度設定在 30-40%。
            </p>

            <h3>步驟三：預覽並下載</h3>
            <p>
              即時預覽確認浮水印不會蓋住關鍵資料後，點「套用浮水印」並下載。傳給對方時，建議用 PDF 格式，避免被輕易編輯。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：旅行社說護照影本加浮水印他們系統無法辨識怎麼辦？</strong>
              <br />
              A：正規旅行社一定能接受加註用途的浮水印，這是國際慣例。如果對方堅持要「乾淨」的影本，建議改換其他業者，這可能是個警訊。
            </p>
            <p>
              <strong>Q：護照影本需要寄出實體版本，浮水印有用嗎？</strong>
              <br />
              A：實體影本一樣可以印出帶浮水印的版本，效果相同。事實上實體影本更容易被多次複印流通，加浮水印更重要。
            </p>
            <p>
              <strong>Q：簽證代辦說要看「無浮水印正本」，這正常嗎？</strong>
              <br />
              A：申請簽證的「正本」是指護照本人，不是影本。代辦只需要影本用來填寫資料表，加浮水印完全合理。如果對方堅持要無浮水印影本，建議直接拒絕。
            </p>
            <p>
              <strong>Q：護照效期欄位被浮水印蓋住了怎麼辦？</strong>
              <br />
              A：調整浮水印位置避開效期欄位，或降低該區域的透明度。ImageMarker 支援即時預覽，可以反覆調整到滿意為止。
            </p>
            <p>
              <strong>Q：護照照片頁很多資訊密集，浮水印會不會反而看不清楚？</strong>
              <br />
              A：透明度設定在 30-40% 時，浮水印與資料都能清晰辨識。如果你發現浮水印太淡，可以加粗字體或加深顏色。
            </p>
            <p>
              <strong>Q：護照影本可以用手機拍照代替嗎？</strong>
              <br />
              A：可以。多數旅行社與簽證中心接受清晰的拍照檔或掃描檔，重點是護照四角完整入鏡、無反光、文字清楚可辨。交出前記得先加上浮水印，防止照片檔被挪作他用。
            </p>

            <h2>出國前的最後一道防線</h2>
            <p>
              護照影本的外洩風險，遠超過大多數人的想像。出國前花一分鐘加上浮水印，是最簡單也最有效的自保方式。下次旅行社請你傳護照影本前，記得先到 ImageMarker 處理一下再傳出去。
            </p>
            <p>
              立即試試：{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://imagemarker.app
              </a>
            </p>
          </div>
        <p className="mt-8 text-center text-sm text-gray-400"><a href="https://ko-fi.com/justinlee2061" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">☕ 如果這篇文章幫到你，請我喝杯咖啡</a></p>
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
            <Link href="/blog/watermark-templates-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）
                </h3>
                <p className="text-sm text-muted-foreground">
                  租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本讓你直接套用。
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
