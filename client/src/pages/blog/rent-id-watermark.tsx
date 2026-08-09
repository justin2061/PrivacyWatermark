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

const SLUG = "rent-id-watermark";

const URL = "https://imagemarker.app/blog/rent-id-watermark";

export default function RentIdWatermark() {
  useEffect(() => {
    const cleanup = setPageSeo({
      // 2026-07-27 曾把標題改成以泛用的「身分證影本加註／加註位置」開頭，想承接
      // GSC 當時判給本頁的加註查詢。結果是這頁和 watermark-templates-guide 對打同
      // 一組字，兩邊都卡在 7–8 名：本頁標題喊加註，但 H1、小標、內文完全沒有加註
      // 內容，等於只有標題命中；templates-guide 有完整的簽註寫法與位置章節卻被稀釋。
      // 這次把泛用的「簽註寫法／加註位置」整合回 templates-guide（那邊已補上位置章節
      // 與各證件位置表），本頁收斂成「租屋情境」專頁：保留加註字眼維持 SERP 命中，
      // 但用「租屋」限定，不再宣稱通用範本。
      title:
        "租屋身分證影本加註怎麼寫？「僅供租屋使用」浮水印範例（2026） | ImageMarker",
      description:
        "房東或仲介要身分證影本，加註怎麼寫才安全？租屋情境的「用途＋對象＋日期」加註格式、房東／仲介／包租代管三種對象的寫法差異，以及「僅供租屋使用」浮水印範例，90 秒用 ImageMarker 完成。100% 本機處理不上傳，手機也能用。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: "租屋身分證影本加註怎麼寫？「僅供租屋使用」浮水印範例",
          description:
            "租屋交身分證影本給房東或仲介前，加註該怎麼寫？房東／仲介／包租代管三種對象的寫法差異、「僅供租屋使用」浮水印範例，以及 3 步驟用 ImageMarker 完成。",
          url: URL,
          datePublished: "2026-04-06",
          dateModified: "2026-08-09",
        }),
        blogBreadcrumb("租屋身分證影本加註怎麼寫？「僅供租屋使用」浮水印範例", URL),
        faqSchema([
          {
            q: "租屋的身分證影本加註要怎麼寫？",
            a: "寫「僅供 OO 房東／OO 仲介租屋契約使用 2026/08/09」。用途、對象、日期三個都要有，對象要寫到實際簽約的房東姓名或仲介公司名，不要只寫「租屋使用」——沒有指名對象，等於誰拿到都能用。",
          },
          {
            q: "房東、仲介、包租代管，加註寫法有差嗎？",
            a: "有。直接跟房東簽約就寫房東姓名；透過仲介帶看、由仲介收件就寫仲介公司全名並加上「代收」；包租代管業者則寫該業者的公司名。對象寫得愈具體，影本流到第三方時愈站得住腳。",
          },
          {
            q: "租屋只給身分證正面可以嗎？",
            a: "可以先問對方是否只需要正面。房東核對身分通常正面就夠，若對方要求正反面，兩面都要各自加註——反面沒加註的話，它就是一張沒有任何限制的乾淨影本。",
          },
          {
            q: "加了浮水印的證件影本，對方還會接受嗎？",
            a: "會的。依照內政部的建議，提供證件影本時本來就應該加註用途。大多數房東和公司都能理解並接受，如果對方堅持不接受有浮水印的影本，反而要小心對方的意圖。",
          },
          {
            q: "浮水印會不會太淡看不到，或太深蓋住資訊？",
            a: "ImageMarker 提供透明度調整功能，你可以即時預覽效果。建議設定在 30–50% 的透明度，既能清楚看到浮水印文字，又不會影響證件內容的辨識。",
          },
          {
            q: "手機可以用嗎？",
            a: "可以。ImageMarker 支援所有現代瀏覽器，包括手機上的 Chrome 和 Safari。也支援 PWA 模式，加到手機桌面後可以像 App 一樣使用。",
          },
          {
            q: "租屋可以用手機拍身分證代替影印嗎？",
            a: "可以。多數房東和仲介都接受清晰的身分證照片檔，重點是四角完整、無反光、文字清楚可辨。傳送前務必先加上「僅供租屋使用」的浮水印，傳出去之後也記得提醒對方妥善保管、用畢刪除。",
          },
          {
            q: "我的證件照片真的不會被上傳嗎？",
            a: "真的不會。ImageMarker 採用 100% 瀏覽器端處理技術，你的圖片從頭到尾都只存在於你自己的裝置上。你可以在斷網的情況下使用，功能完全不受影響。",
          },
          {
            q: "除了身分證，其他證件也可以用嗎？",
            a: "當然可以。護照、駕照、健保卡、學生證，甚至是存摺封面等任何你需要提供影本的文件，都可以用這個工具加上浮水印。",
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
              dateTime="2026-04-06"
              className="text-sm text-muted-foreground"
            >
              2026-04-06 · 最後更新 2026-08-09
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              租屋身分證影本加註怎麼寫？「僅供租屋使用」浮水印範例
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              租屋找房子，好不容易看到滿意的物件，房東或仲介接著就會要你提供身分證影本。但在交出去之前，你有沒有想過——這張影本會不會被拿去做其他用途？答案是先在影本上<strong>加註</strong>：寫明這張影本只能用在租屋這件事，這是內政部長年宣導的自保做法，也是本篇要教的重點。
            </p>
            <p>
              在台灣每年都有不少因為證件影本外洩而導致的身分冒用事件，被冒名辦手機門號、貸款、甚至開公司的案例時有所聞。下面先講加註該怎麼寫，再講怎麼在 90 秒內做出一張加好浮水印的影本。
            </p>

            <h2>租屋的身分證影本加註要寫什麼？</h2>
            <p>
              加註（簽註）的格式其實只有一條公式：
              <strong>用途 ＋ 對象 ＋ 日期</strong>。三個要素缺一，限制就形同失效——
              沒寫對象等於誰拿到都能用，沒寫日期等於這張影本永久有效。租屋情境套進去就是：
            </p>
            <blockquote>
              <p>僅供 OO 房東租屋契約使用 2026/08/09</p>
            </blockquote>
            <p>
              關鍵在<strong>對象要寫到具體的名字</strong>。「僅供租屋使用」看起來有限制，
              實際上沒有指名任何人，影本轉手給誰都說得通；寫上實際簽約的房東姓名或仲介公司全名，
              才真正把這張影本綁在這一筆交易上。
            </p>

            <h3>房東、仲介、包租代管：三種對象的寫法差異</h3>
            <p>
              租屋的收件對象其實不只一種，寫法要跟著換：
            </p>
            <ul>
              <li>
                <strong>直接跟房東簽約：</strong>「僅供 王 OO 房東租屋契約使用 2026/08/09」——
                寫房東本人姓名，這是最單純的情況。
              </li>
              <li>
                <strong>透過仲介帶看、仲介收件：</strong>
                「僅供 OO 不動產代收租屋契約使用 2026/08/09」——
                寫仲介公司全名並註明「代收」。影本最後會轉交房東，加上「代收」能讓兩手都被涵蓋。
              </li>
              <li>
                <strong>包租代管業者：</strong>「僅供 OO 資產管理租屋契約使用 2026/08/09」——
                寫該業者的公司名。這類業者手上同時有大量房客資料，對象寫具體特別重要。
              </li>
            </ul>
            <p>
              還沒確定簽約對象、只是先送審資料時，至少要有日期＋租屋用途，
              等確定對象後再重新給一份寫明對象的版本。
            </p>
            <div className="not-prose border rounded-lg p-4 my-6 bg-muted/40">
              <p className="text-sm">
                其他情境（求職、開戶、保險、貸款、過戶……）的完整寫法、手寫三行格式，
                以及<strong>加註位置該放在證件的哪個部位</strong>才不會被裁掉，整理在{" "}
                <Link
                  href="/blog/watermark-templates-guide"
                  className="text-primary font-medium hover:underline"
                >
                  《身分證影本簽註寫法＋加註位置：10 種情境範本》
                </Link>
                ，這裡就不重複了。
              </p>
            </div>
            <p>
              位置的部分只講租屋最常踩到的一點：<strong>正反面都要各自加註</strong>。
              房東要正反面影本時，很多人只在正面寫了註記——反面那張沒有任何限制，
              單獨拿出去用完全沒有阻礙。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>手寫加註 vs 證件浮水印：LINE 傳檔請用浮水印</h2>
            <p>
              證件浮水印就是用軟體在影本的<strong>電子檔</strong>上疊一層半透明文字，內容和手寫加註完全一樣，
              都是「用途＋對象＋日期」。差別在於手寫加註只保護得了你當面交出去的那張紙。
            </p>
            <p>
              租屋現在多半是用 LINE 或 Email 把身分證照片傳給房東、仲介——對方拿到的是一個可以無限轉傳的檔案，
              紙上的手寫字在拍照後可能被裁切掉或用修圖抹除。數位浮水印覆蓋整張證件、與影像像素融合，
              要去除就得連證件內容一起破壞，這是傳電子檔時唯一站得住腳的做法。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>3 步驟幫證件加浮水印</h2>
            <p>
              用 ImageMarker 這個免費線上工具，只要三個步驟就能完成：
            </p>

            <h3>步驟一：上傳你的證件照片</h3>
            <p>
              打開{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>
              ，你會看到一個簡單的上傳區域。直接把身分證、護照或駕照的照片拖進去，或點「選擇檔案」上傳。支援 JPG 和 PNG 格式，最大 10MB。
            </p>
            <p>
              最重要的是——你的照片完全不會上傳到任何伺服器。所有處理都在你自己的瀏覽器裡完成，關掉網頁後什麼都不會留下。
            </p>

            <h3>步驟二：輸入浮水印文字</h3>
            <p>
              在浮水印設定區，輸入你想要的文字。可以調整字體大小、透明度，還能選擇浮水印顯示的位置（建議選擇覆蓋整張圖片，效果最好）。
            </p>

            <h3>步驟三：下載加好浮水印的圖片</h3>
            <p>
              預覽確認沒問題後，點「套用浮水印」再下載圖片就完成了。整個過程不到一分鐘。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：租屋的身分證影本加註要怎麼寫？</strong>
              <br />
              A：寫「僅供 OO 房東／OO 仲介租屋契約使用 2026/08/09」。用途、對象、日期三個都要有，對象要寫到實際簽約的房東姓名或仲介公司名，不要只寫「租屋使用」——沒有指名對象，等於誰拿到都能用。
            </p>
            <p>
              <strong>Q：房東、仲介、包租代管，加註寫法有差嗎？</strong>
              <br />
              A：有。直接跟房東簽約就寫房東姓名；透過仲介帶看、由仲介收件就寫仲介公司全名並加上「代收」；包租代管業者則寫該業者的公司名。對象寫得愈具體，影本流到第三方時愈站得住腳。
            </p>
            <p>
              <strong>Q：租屋只給身分證正面可以嗎？</strong>
              <br />
              A：可以先問對方是否只需要正面。房東核對身分通常正面就夠，若對方要求正反面，兩面都要各自加註——反面沒加註的話，它就是一張沒有任何限制的乾淨影本。
            </p>
            <p>
              <strong>Q：加了浮水印的證件影本，對方還會接受嗎？</strong>
              <br />
              A：會的。依照內政部的建議，提供證件影本時本來就應該加註用途。大多數房東和公司都能理解並接受，如果對方堅持不接受有浮水印的影本，反而要小心對方的意圖。
            </p>
            <p>
              <strong>
                Q：浮水印會不會太淡看不到，或太深蓋住資訊？
              </strong>
              <br />
              A：ImageMarker 提供透明度調整功能，你可以即時預覽效果。建議設定在
              30–50% 的透明度，既能清楚看到浮水印文字，又不會影響證件內容的辨識。
            </p>
            <p>
              <strong>Q：手機可以用嗎？</strong>
              <br />
              A：可以。ImageMarker 支援所有現代瀏覽器，包括手機上的 Chrome 和
              Safari。也支援 PWA 模式，加到手機桌面後可以像 App 一樣使用。
            </p>
            <p>
              <strong>Q：租屋可以用手機拍身分證代替影印嗎？</strong>
              <br />
              A：可以。多數房東和仲介都接受清晰的身分證照片檔，重點是四角完整、無反光、文字清楚可辨。傳送前務必先加上「僅供租屋使用」的浮水印，傳出去之後也記得提醒對方妥善保管、用畢刪除。
            </p>
            <p>
              <strong>Q：我的證件照片真的不會被上傳嗎？</strong>
              <br />
              A：真的不會。ImageMarker 採用 100%
              瀏覽器端處理技術，你的圖片從頭到尾都只存在於你自己的裝置上。你可以在斷網的情況下使用，功能完全不受影響。
            </p>
            <p>
              <strong>Q：除了身分證，其他證件也可以用嗎？</strong>
              <br />
              A：當然可以。護照、駕照、健保卡、學生證，甚至是存摺封面等任何你需要提供影本的文件，都可以用這個工具加上浮水印。
            </p>

            <h2>保護個資，從一個小動作開始</h2>
            <p>
              加浮水印只需要不到一分鐘，卻能大幅降低證件被冒用的風險。下次需要提供證件影本時，記得先到 ImageMarker 加上浮水印再交出去。
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

        {/* 熱門工具快速入口 */}
        <PopularTools location={SLUG} className="mt-12" />

        {/* 相關文章 */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">相關文章</h2>
          <div className="space-y-4">
            <Link href="/blog/watermark-generators-recommendation">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  5 款免費線上浮水印產生器推薦｜2026 年最新比較
                </h3>
                <p className="text-sm text-muted-foreground">
                  精選 5 款最好用的免費浮水印工具，完整比較本地處理 vs 雲端上傳、隱私安全與功能優缺點。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/watermark-templates-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分證影本簽註寫法＋加註位置：10 種情境範本與證件浮水印範例
                </h3>
                <p className="text-sm text-muted-foreground">
                  簽註要寫什麼、加註位置放在證件哪裡才不會被裁掉、正反面規則，＋10 種情境範本直接照抄。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/mobile-watermark-tutorial">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  手機怎麼幫身分證加浮水印？免安裝 App 的最快方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  不用下載 App，用手機瀏覽器 3 分鐘完成證件浮水印，iPhone 和 Android 都適用。
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
                  存摺、健保卡、駕照等影本也是詐騙高危目標，教你 6 種常見證件的浮水印寫法。
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
