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

const URL = "https://imagemarker.app/blog/mobile-watermark-tutorial";
const SLUG = "mobile-watermark-tutorial";
const TITLE = "手機怎麼幫身分證加浮水印？免安裝 App 的最快方法";

export default function MobileWatermarkTutorial() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: `${TITLE} | ImageMarker`,
      description:
        "不用下載 App，用手機瀏覽器就能幫身分證加浮水印。本篇教你 3 分鐘完成，iPhone 和 Android 都適用。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description:
            "免安裝 App，用手機瀏覽器 3 分鐘幫身分證加浮水印的教學，iPhone 和 Android 都適用。",
          url: URL,
          datePublished: "2026-05-27",
          dateModified: "2026-07-01",
        }),
        faqSchema([
          {
            q: "手機網路不好可以用嗎？",
            a: "可以。ImageMarker 是在瀏覽器本地端處理，載入網頁後即使網路不穩也能完成加浮水印，檔案不會上傳。",
          },
          {
            q: "手機效能差會跑不動嗎？",
            a: "不會。加文字浮水印運算量很小，一般智慧型手機都能順暢處理。",
          },
          {
            q: "可以直接從 LINE 收到的照片加浮水印嗎？",
            a: "可以。先將 LINE 內的照片儲存到手機相簿，再到 imagemarker.app 上傳該照片即可。",
          },
          {
            q: "在手機上做的浮水印，傳到電腦會走樣嗎？",
            a: "不會。浮水印會直接合成在輸出的圖片檔上，跨裝置開啟都一致。",
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
              手機怎麼幫身分證加浮水印？免安裝 App 的最快方法
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              現在大部分的證件影本需求都是用手機拍照後直接傳送——LINE 給房東、Email 給人事部、用 WhatsApp 傳給海外的代辦。但很多人不知道，手機其實也能直接幫證件加上浮水印，而且根本不用下載任何 App。
            </p>
            <p>
              本篇手把手教你用手機瀏覽器在 3 分鐘內完成證件浮水印，iPhone 和 Android 都適用，過程中你的證件照片完全不會離開手機。
            </p>

            <h2>為什麼選瀏覽器工具，不選 App？</h2>
            <p>
              市面上有許多浮水印 App，但比起來，線上工具有幾個明顯優勢：
            </p>
            <p>
              <strong>線上工具 vs 浮水印 App 比較：</strong>
            </p>
            <p>
              <strong>1. 隱私風險</strong>
              <br />
              App：需要照片存取權限，部分 App 會上傳到雲端處理。
              <br />
              線上工具：純瀏覽器處理，不需要任何權限，照片不離開裝置。
            </p>
            <p>
              <strong>2. 廣告與付費功能</strong>
              <br />
              App：免費版常有廣告、限制功能或加上「by XXX App」浮水印。
              <br />
              線上工具：ImageMarker 完全免費，沒有任何浮水印或廣告。
            </p>
            <p>
              <strong>3. 儲存空間</strong>
              <br />
              App：佔用 30-100MB 不等的空間，還會持續更新。
              <br />
              線上工具：不需要安裝，加到桌面後就像 App 一樣使用。
            </p>
            <p>
              <strong>4. 跨平台</strong>
              <br />
              App：iPhone 和 Android 版本功能可能不同。
              <br />
              線上工具：用同一個網址，所有手機表現一致。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>3 步驟手機幫身分證加浮水印</h2>

            <h3>步驟一：用手機瀏覽器打開 ImageMarker</h3>
            <p>
              用 iPhone 的 Safari 或 Android 的 Chrome 開啟{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>
              。網頁載入後會看到一個大的上傳區域，介面跟電腦版幾乎一樣，但已經針對觸控操作優化。
            </p>
            <p>
              點上傳區域，手機會跳出選項：「拍照」或「從相簿選擇」。如果證件還沒拍，可以直接在這裡拍照；如果已經拍好，就從相簿挑選。
            </p>

            <h3>步驟二：輸入浮水印並調整</h3>
            <p>
              上傳後會進入編輯畫面。在浮水印文字框輸入內容，例如「僅供 OO 銀行開戶使用 2026/05/27」。手機上可以用兩指縮放預覽圖，方便確認效果。
            </p>
            <p>
              下方有三個關鍵調整：<strong>字體大小、透明度、覆蓋範圍</strong>。建議：
            </p>
            <p>
              - 字體大小：手機螢幕小，建議調到 24-32px<br />
              - 透明度：35-45% 最清楚<br />
              - 覆蓋範圍：選「整張圖片」，安全性最高
            </p>

            <h3>步驟三：套用並儲存到相簿</h3>
            <p>
              點「套用浮水印」，再點「下載」。
              <br />
              <strong>iPhone：</strong>會跳出分享選單，選「儲存影像」就會存到相簿。
              <br />
              <strong>Android：</strong>會直接下載到「下載」資料夾，部分機型會自動跳到圖庫。
            </p>
            <p>
              存到相簿後就可以直接用 LINE、Email 或任何訊息 App 傳出去了。
            </p>

            <h2>進階技巧：加到主畫面像 App 一樣用</h2>
            <p>
              如果你會經常用到，可以把 ImageMarker「加到主畫面」（PWA 功能），打開時不會有瀏覽器網址列，操作體驗跟原生 App 一樣，但不佔儲存空間。
            </p>
            <p>
              <strong>iPhone（Safari）：</strong>
              <br />
              1. 用 Safari 打開 imagemarker.app<br />
              2. 點下方分享按鈕（方框加箭頭）<br />
              3. 往下捲，點「加入主畫面」<br />
              4. 確認名稱後點「新增」，桌面就會出現 ImageMarker 圖示。
            </p>
            <p>
              <strong>Android（Chrome）：</strong>
              <br />
              1. 用 Chrome 打開 imagemarker.app<br />
              2. 點右上角三個點選單<br />
              3. 點「加到主畫面」<br />
              4. 確認後桌面就會出現捷徑。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>iPhone 和 Android 操作差異</h2>
            <p>
              整體流程兩個系統都一樣，但有幾個小細節要注意：
            </p>
            <p>
              <strong>下載位置：</strong>iPhone 預設儲存到「照片」App，Android 預設儲存到「下載」資料夾。如果 Android 找不到下載的圖片，可以打開「檔案」App 查看「Download」資料夾。
            </p>
            <p>
              <strong>檔案格式：</strong>iPhone 拍照預設是 HEIC 格式，ImageMarker 支援自動轉換為 JPG。Android 通常是 JPG 或 PNG，可以直接處理。
            </p>
            <p>
              <strong>輸入法：</strong>iPhone 注音輸入長按可選擇符號，Android 用 Gboard 輸入「/」可以快速切換到日期符號。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：手機網路不好可以用嗎？</strong>
              <br />
              A：可以。ImageMarker 第一次載入後會把資源快取，之後就算斷網也能正常使用。所有處理都在手機本地完成，不需要持續連網。
            </p>
            <p>
              <strong>Q：手機效能差會跑不動嗎？</strong>
              <br />
              A：ImageMarker 經過效能優化，5 年內的手機都能流暢使用。處理一張證件圖片大概 1-2 秒，即使是 5MB 以上的高解析度照片也沒問題。
            </p>
            <p>
              <strong>Q：可以直接從 LINE 收到的照片加浮水印嗎？</strong>
              <br />
              A：可以。先把 LINE 收到的照片儲存到相簿，再從 ImageMarker 選擇該照片即可。
            </p>
            <p>
              <strong>Q：在手機上做的浮水印，傳到電腦會走樣嗎？</strong>
              <br />
              A：不會。輸出的是標準 PNG/JPG，在任何裝置上看都一樣。如果擔心被裁切或編輯，建議下載後用螢幕截圖或 PDF 格式再傳出去。
            </p>

            <h2>馬上開始用手機保護你的證件</h2>
            <p>
              整個流程不到 3 分鐘，比下載一個 App 還快。下次要用手機傳證件影本時，記得先到 ImageMarker 加上浮水印再傳出去。
            </p>
            <p>
              用手機打開：{" "}
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
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">© 2026 ImageMarker — 保護您的隱私安全</p>
        </div>
      </footer>
    </div>
  );
}
