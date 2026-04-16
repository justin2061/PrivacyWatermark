import { useEffect } from "react";
import { Link } from "wouter";

export default function RentIdWatermark() {
  useEffect(() => {
    document.title =
      "租屋交證件影本前必做！3 步驟幫身分證加浮水印 | ImageMarker";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "租屋前必看！教你用 ImageMarker 三步驟幫身分證影本加上浮水印，防止個資被冒用。浮水印該寫什麼、怎麼寫，全部一次說清楚。"
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        "href",
        "https://imagemarker.app/blog/rent-id-watermark"
      );
    }
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
              2026-04-06
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              租屋交證件影本前必做！3 步驟幫身分證加浮水印
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              租屋找房子，好不容易看到滿意的物件，房東或仲介接著就會要你提供身分證影本。但在交出去之前，你有沒有想過——這張影本會不會被拿去做其他用途？
            </p>
            <p>
              其實，在台灣每年都有不少因為證件影本外洩而導致的身分冒用事件。被冒名辦手機門號、貸款、甚至開公司的案例時有所聞。最簡單的自保方式，就是在證件影本上加上浮水印。
            </p>

            <h2>什麼是證件浮水印？</h2>
            <p>
              證件浮水印就是在你的身分證、護照、駕照等證件影本上，加上半透明的文字標記。這些文字會說明這份影本的用途和日期，讓任何拿到這張影本的人都知道它只能用在特定目的。
            </p>
            <p>
              即使影本不幸外流，有了浮水印的證件影本在被冒用時會大幅降低成功率，因為對方一看就知道這不是一份「乾淨」的影本。
            </p>

            <h2>浮水印要寫什麼？</h2>
            <p>
              很多人知道要加浮水印，但不確定該寫什麼。以下是幾個常見場景的建議：
            </p>
            <p>
              <strong>租屋用途：</strong>
              <br />
              「僅供 OO 不動產租屋使用 2026/04/06」
            </p>
            <p>
              <strong>求職用途：</strong>
              <br />
              「僅供 OO 公司人事部徵才使用 2026/04/06」
            </p>
            <p>
              <strong>辦理業務用途：</strong>
              <br />
              「僅供 OO 銀行開戶使用 2026/04/06」
            </p>
            <p>
              寫浮水印的重點：寫明「用途」+「對象」+「日期」。這三個資訊缺一不可，才能確保影本不會被挪作他用。
            </p>

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
          </div>
        </article>

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
                  閱讀全文 →
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
