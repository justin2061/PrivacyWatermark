import { useEffect } from "react";
import { Link } from "wouter";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/passport-travel-agency-watermark";
const TITLE = "護照影本交給旅行社安全嗎？報名旅行團前必做的自保 3 件事（2026）";

export default function PassportTravelAgencyWatermark() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: `${TITLE} | ImageMarker`,
      description:
        "報名旅行團、辦簽證要交護照影本給旅行社，安全嗎？從五福旅行社個資外洩事件，教你護照給旅行社前該做的 3 件自保，以及旅行社護照浮水印怎麼寫最安全。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "報名旅行團要交護照影本給旅行社的個資風險與自保方法，含旅行社護照浮水印範本與資料外洩自救步驟。",
          url: URL,
          datePublished: "2026-07-01",
        }),
        faqSchema([
          {
            q: "護照影本可以給旅行社嗎？",
            a: "可以，報名旅行團、代辦簽證或訂機票時，旅行社確實需要護照影本核對資料。但交出前建議加上「僅供 OO 旅行社辦理 OO 行程使用」的浮水印，並確認對方的個資保護與檔案刪除政策。",
          },
          {
            q: "護照給旅行社安全嗎？",
            a: "正規旅行社受個人資料保護法規範，但仍有外洩風險。2026 年 1 月五福旅行社就證實遭駭客攻擊、部分旅客個資外洩。加浮水印、限定用途、事後追蹤刪除，是你能自己掌握的防線。",
          },
          {
            q: "旅行社護照浮水印要怎麼寫？",
            a: "用「僅供【旅行社名稱】辦理【行程或簽證】使用 YYYY/MM/DD」的格式，寫上具體用途、對象與日期，並讓浮水印半透明覆蓋在資料區，避免被裁切或挪作他用。",
          },
          {
            q: "護照資料已經外洩了怎麼辦？",
            a: "先向旅行社確認外洩範圍並要求刪除，必要時可申請換發護照、到聯徵中心辦理註記，並提高對釣魚簡訊與詐騙電話的警覺。",
          },
        ]),
        blogBreadcrumb(TITLE, URL),
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
            <time dateTime="2026-07-01" className="text-sm text-muted-foreground">
              2026-07-01
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              護照影本交給旅行社安全嗎？報名旅行團前必做的自保 3 件事
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              暑假出國旺季一到，報名旅行團、委託旅行社代辦簽證或訂國際機票時，第一步幾乎都是「請提供護照影本」。多數人想都沒想就直接拍照上傳到 LINE 群組或 email 傳出去——但你有沒有想過，這張護照影本之後會被存到哪裡、有多少人看得到、行程結束後又會不會被刪除？
            </p>
            <p>
              這不是杞人憂天。2026 年 1 月，知名的<strong>五福旅行社證實遭到駭客攻擊，部分旅客個人資料外洩</strong>，護照相關資訊也在其中；同一時期多起旅遊、電商平台的個資外洩事件接連登上新聞。當你把護照交給旅行社，資料安全就有一部分不在你手上了。這篇文章教你在「交出去之前」就先做好自保。
            </p>

            <h2>為什麼護照影本交給旅行社有風險？</h2>
            <p>
              護照是效力最高的身分證件之一，一張護照影本上就包含：<strong>中英文姓名、護照號碼、出生年月日、身分證字號（部分頁面）、照片、簽發與到期日</strong>。這些欄位組合起來，足以被用於：
            </p>
            <p>
              <strong>1. 冒名申辦與盜刷：</strong>護照號碼＋出生日期常被拿來當作身分驗證的「答案」，用於冒名申辦服務或突破部分平台的驗證關卡。
            </p>
            <p>
              <strong>2. 訂票與簽證詐騙：</strong>你的護照資料可能被拿去代訂機票、辦理電子簽證，再轉賣或用於其他不法行程。
            </p>
            <p>
              <strong>3. 資料庫外洩的連鎖風險：</strong>旅行社會把護照影本存進內部系統或雲端，一旦公司遭駭（如五福事件），你的資料就跟著外流，而且你完全被動。
            </p>
            <p>
              旅行社確實受《個人資料保護法》規範，也有蒐集護照影本的正當業務需要。重點不是「不給」，而是「聰明地給」——在你能掌控的環節先上鎖。
            </p>

            <h2>自保第 1 件事：加上「限定用途」浮水印</h2>
            <p>
              最有效、也最簡單的一步，就是在護照影本上加浮水印，把它的「可用範圍」鎖死。核心公式是：
            </p>
            <p>
              <strong>「僅供【旅行社名稱】辦理【行程／簽證】使用 YYYY/MM/DD」</strong>
            </p>
            <p>常見情境的旅行社護照浮水印範本：</p>
            <p>
              <strong>報名旅行團：</strong>
              <br />
              「僅供 OO 旅行社 2026 日本北海道團報名使用 2026/07/01」
            </p>
            <p>
              <strong>委託代辦簽證：</strong>
              <br />
              「僅供 OO 旅行社辦理美國 ESTA 簽證使用 2026/07/01」
            </p>
            <p>
              <strong>代訂國際機票：</strong>
              <br />
              「僅供 OO 旅行社代訂機票開票使用 2026/07/01」
            </p>
            <p>
              寫法有三個要訣：<strong>用途具體、對象明確、一定要有日期</strong>。這麼一來，就算影本不慎外流，也很難被挪作其他用途，因為上面白紙黑字寫著限定範圍，冒用就是違法。浮水印透明度建議設在 30–40%，覆蓋在資料區但不遮住旅行社需要核對的欄位。
            </p>

            <h2>自保第 2 件事：確認旅行社怎麼存、何時刪</h2>
            <p>
              交件前多問一句，往往能避免日後的麻煩。你可以直接詢問承辦人員：
            </p>
            <p>
              「請問我的護照影本會存放在哪裡？行程結束後會刪除嗎？」正規旅行社通常都有個資保護政策，能明確回答；如果對方支支吾吾，或要求你把護照傳到私人 LINE、私人信箱，就要提高警覺。盡量透過旅行社的<strong>官方管道</strong>（公司 email、官網上傳系統）提供，避免傳給個人帳號。
            </p>

            <h2>自保第 3 件事：只給「當次需要」的頁面</h2>
            <p>
              不是每次都要交出完整護照。辦國內事務常常只需要基本資料頁；有些情境甚至只要護照號碼與英文姓名。<strong>能給局部就不要給全部</strong>，並避免同時附上身分證影本——護照＋身分證的組合，正是冒用者最想要的「黃金搭配」。
            </p>

            <h2>用 ImageMarker 幫護照加浮水印（30 秒完成）</h2>
            <p>
              處理護照這種高敏感證件，工具的安全性比什麼都重要。
              <a href="https://imagemarker.app" target="_blank" rel="noopener noreferrer">
                ImageMarker
              </a>{" "}
              的最大優勢是<strong>100% 在你的瀏覽器本地端處理，護照影本完全不會上傳到任何伺服器</strong>，處理完關掉網頁就什麼都不留下——這比任何要你上傳的 LINE 機器人或 App 都安全。
            </p>
            <p>
              使用步驟：打開{" "}
              <a href="https://imagemarker.app" target="_blank" rel="noopener noreferrer">
                imagemarker.app
              </a>{" "}
              → 上傳護照影本或直接拍照 → 輸入「僅供 OO 旅行社辦理 OO 行程使用＋日期」→ 調整透明度與位置 → 下載。整個過程不到一分鐘，出國前隨手就能完成。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：護照影本可以給旅行社嗎？</strong>
              <br />
              A：可以，這是旅行社辦理業務的正當需要。但交出前建議加上限定用途浮水印，並確認對方的個資保護與刪除政策。
            </p>
            <p>
              <strong>Q：加了浮水印，旅行社會不會不收？</strong>
              <br />
              A：不會。只要浮水印沒有遮住姓名、護照號碼等核對欄位，正規旅行社都能受理。浮水印限定的是「用途」，不影響資料辨識。
            </p>
            <p>
              <strong>Q：護照封面拍照會外洩個資嗎？</strong>
              <br />
              A：護照封面本身不含個資，封面的金色晶片標誌只是造型標示。真正的敏感資料在內頁基本資料頁，那一頁才是要小心加浮水印的重點。
            </p>
            <p>
              <strong>Q：已經把護照傳給旅行社了才看到這篇，還來得及嗎？</strong>
              <br />
              A：可以向旅行社要求刪除原檔、改以加浮水印的版本為準，並留意後續是否收到異常的訂票或簽證通知。若擔心外洩，可考慮換發護照。
            </p>

            <h2>結語：出國的好心情，從保護好護照開始</h2>
            <p>
              把「交護照影本前先加浮水印」當成出國準備清單的一項，就像記得帶行動電源、確認機票一樣自然。你無法控制旅行社的資安系統會不會被駭，但你可以決定交出去的那張影本長什麼樣子。這個一分鐘的小動作，就是你和個資風險之間最實在的一道防線。
            </p>
            <p>
              立即試試：{" "}
              <a href="https://imagemarker.app" target="_blank" rel="noopener noreferrer">
                https://imagemarker.app
              </a>
            </p>
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">
            <a
              href="https://ko-fi.com/justinlee2061"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              ☕ 如果這篇文章幫到你，請我喝杯咖啡
            </a>
          </p>
        </article>

        {/* 相關文章 */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">相關文章</h2>
          <div className="space-y-4">
            <Link href="/blog/passport-watermark-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  護照影本也要加浮水印！出國前必看的護照安全指南
                </h3>
                <p className="text-sm text-muted-foreground">
                  護照浮水印怎麼寫、放哪個位置最安全？附 5 種常見範本，出國前必看。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文 →
                </span>
              </article>
            </Link>
            <Link href="/blog/other-documents-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  不只身分證！存摺、健保卡、駕照影本也要加浮水印
                </h3>
                <p className="text-sm text-muted-foreground">
                  存摺、健保卡、駕照等影本也是詐騙高危目標，教你 6 種常見證件的浮水印寫法。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文 →
                </span>
              </article>
            </Link>
            <Link href="/blog/watermark-templates-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）
                </h3>
                <p className="text-sm text-muted-foreground">
                  租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本直接套用。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文 →
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
