import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/image-compression-guide";

export default function ImageCompressionGuide() {
  useEffect(() => {
    return setPageSeo({
      title:
        "圖片太大怎麼辦？5 種免費線上圖片壓縮工具推薦（2026）| ImageMarker",
      description:
        "照片太大無法上傳、email 附件超過限制、網站載入太慢？這篇推薦並比較 5 款免費線上圖片壓縮工具：TinyPNG、Squoosh、iLoveIMG、Compressor.io、ImageMarker，分析壓縮效果、隱私差異與適用情境，教你選對工具把圖片變小又不失真。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline:
            "圖片太大怎麼辦？5 種免費線上圖片壓縮工具推薦（2026）",
          description:
            "比較 5 款免費線上圖片壓縮工具：TinyPNG、Squoosh、iLoveIMG、Compressor.io、ImageMarker，分析壓縮率、畫質、隱私（本機 vs 雲端上傳）與適用情境，幫你把圖片檔案變小。",
          url: URL,
          datePublished: "2026-07-07",
        }),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "免費線上圖片壓縮工具推薦",
          itemListElement: [
            "ImageMarker",
            "Squoosh",
            "TinyPNG",
            "iLoveIMG",
            "Compressor.io",
          ].map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
          })),
        },
        faqSchema([
          {
            q: "圖片壓縮會不會讓畫質變差？",
            a: "看壓縮方式。有損壓縮（如 JPEG）會捨棄部分肉眼較不敏感的細節換取更小檔案，壓過頭會出現色塊與模糊；無損壓縮則不損失畫質但縮減幅度較小。多數工具讓你調整壓縮強度，一般照片壓到 70～80% 品質，檔案能大幅縮小而肉眼幾乎看不出差異。",
          },
          {
            q: "壓縮圖片時，檔案會被上傳到伺服器嗎？",
            a: "取決於工具。TinyPNG、iLoveIMG、Compressor.io 等雲端工具會把圖片上傳到伺服器處理；Squoosh 和 ImageMarker 則在瀏覽器本機完成，圖片不上傳。壓縮一般網站素材無所謂，但若是證件、合約、含個資的截圖，建議用本機處理的工具。",
          },
          {
            q: "PNG 和 JPG 哪個比較適合壓縮？",
            a: "看內容。照片、漸層豐富的圖用 JPG（或 WebP）壓縮效率最高、檔案最小；需要透明背景或線條銳利的圖示、螢幕截圖則適合 PNG。若追求最小檔案又不需相容舊瀏覽器，可轉成 WebP，通常比 JPG／PNG 更小。",
          },
          {
            q: "email 附件或網站上傳有大小限制，圖片要壓到多小？",
            a: "多數 email 附件上限為 20～25MB，網站或表單常限制單張 2～5MB。一般用途把單張照片壓到 1MB 以內、長邊縮到 1600～2000px，通常就能順利上傳且畫質足夠。可以先縮放尺寸再壓縮，效果最好。",
          },
        ]),
        blogBreadcrumb(
          "圖片太大怎麼辦？5 種免費線上圖片壓縮工具推薦",
          URL
        ),
      ],
    });
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
              dateTime="2026-07-07"
              className="text-sm text-muted-foreground"
            >
              2026-07-07
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              圖片太大怎麼辦？5 種免費線上圖片壓縮工具推薦（2026）
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <h2>「檔案太大，無法上傳」</h2>
            <p>
              現在手機隨手一拍就是 5MB、10MB 的照片。想當 email 附件寄出被擋、上傳報名表單超過限制、放到網站上又讓頁面慢到讀者跑光——圖片太大，是每天都會撞到的小麻煩。
            </p>
            <p>
              解法就是<strong>圖片壓縮</strong>：在肉眼幾乎看不出差別的前提下，把檔案大小砍掉一大半。這篇推薦並比較 5 款好用的免費線上圖片壓縮工具，重點放在壓縮效果、隱私差異與適用情境，幫你依需求選對工具。
            </p>

            <h2>壓縮前先懂一件事：有損 vs 無損</h2>
            <p>
              <strong>有損壓縮</strong>（lossy，如 JPEG）會捨棄一些肉眼較不敏感的細節換取更小的檔案，壓過頭會出現色塊、模糊；<strong>無損壓縮</strong>（lossless）不損失任何畫質，但縮減幅度較小。多數工具讓你自己調強度——一般照片壓到 70～80% 品質，檔案通常能少一半以上，而肉眼幾乎看不出差異。
            </p>

            <h2>5 款免費圖片壓縮工具推薦</h2>

            <h3>1. TinyPNG（tinypng.com）</h3>
            <ul>
              <li>老牌壓縮服務，智慧有損壓縮效果好、操作極簡</li>
              <li>支援 PNG、JPEG、WebP、AVIF</li>
              <li>
                <strong>雲端處理</strong>：圖片會上傳到伺服器；免費版有張數與單檔大小限制
              </li>
              <li>
                <strong>適合：</strong>網站素材、部落格配圖等非敏感圖片的快速壓縮
              </li>
            </ul>

            <h3>2. Squoosh（squoosh.app）</h3>
            <ul>
              <li>Google 開源專案，用 WebAssembly 在瀏覽器本機壓縮</li>
              <li>編碼器最進階（MozJPEG、AVIF、WebP），有即時左右對比拉桿，可精細調整</li>
              <li>
                <strong>本機處理</strong>：檔案不上傳、離線可用
              </li>
              <li>缺點：一次只能一張、沒有批次、英文介面</li>
              <li>
                <strong>適合：</strong>追求單張極致壓縮品質的開發者、設計師
              </li>
            </ul>

            <h3>3. iLoveIMG（iloveimg.com）</h3>
            <ul>
              <li>工具最齊全，壓縮之外還有縮放、裁切、轉檔等，有繁中介面、支援批次</li>
              <li>
                <strong>雲端處理</strong>：所有操作在官方伺服器完成；免費版有次數與大小限制
              </li>
              <li>
                <strong>適合：</strong>需要一站式處理大量非敏感圖片的使用者
              </li>
            </ul>

            <h3>4. Compressor.io（compressor.io）</h3>
            <ul>
              <li>介面乾淨、壓縮率高，支援 JPEG、PNG、WebP、GIF、SVG，有損無損可選</li>
              <li>
                <strong>雲端處理</strong>：圖片上傳伺服器處理；免費版一次處理張數有限
              </li>
              <li>
                <strong>適合：</strong>想要高壓縮率、格式支援廣的非敏感圖片
              </li>
            </ul>

            <h3>5. ImageMarker（imagemarker.app）⭐ 本機隱私工具箱</h3>
            <ul>
              <li>
                <strong>100% 瀏覽器本機處理</strong>：壓縮時圖片不上傳到任何伺服器
              </li>
              <li>
                不只壓縮，同一站還有<Link href="/">浮水印</Link>、<Link href="/batch">批次</Link>、<Link href="/exif-clean">EXIF 清除</Link>、<Link href="/resize">縮放</Link>、<Link href="/convert">轉檔</Link>、<Link href="/remove-bg">AI 去背</Link>
              </li>
              <li>免費、免註冊、無廣告，繁體中文介面，支援 PWA 離線使用</li>
              <li>誠實說缺點：壓縮用瀏覽器原生 Canvas，極致壓縮率不如 Squoosh 的 MozJPEG/AVIF</li>
              <li>
                <strong>適合：</strong>要壓縮證件、含個資的圖片，或想一站搞定壓縮＋浮水印＋清 EXIF 的使用者
              </li>
            </ul>

            <h2>壓縮工具比較表</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>工具</th>
                    <th>本機處理</th>
                    <th>批次</th>
                    <th>壓縮率</th>
                    <th>繁中</th>
                    <th>額外功能</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ImageMarker</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>中上</td>
                    <td>✅</td>
                    <td>浮水印／EXIF／去背／轉檔</td>
                  </tr>
                  <tr>
                    <td>Squoosh</td>
                    <td>✅</td>
                    <td>❌</td>
                    <td>最高</td>
                    <td>❌</td>
                    <td>進階編碼器對比</td>
                  </tr>
                  <tr>
                    <td>TinyPNG</td>
                    <td>❌（上傳）</td>
                    <td>✅（有限制）</td>
                    <td>高</td>
                    <td>❌</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>iLoveIMG</td>
                    <td>❌（上傳）</td>
                    <td>✅（有限制）</td>
                    <td>中高</td>
                    <td>✅</td>
                    <td>縮放／裁切／轉檔</td>
                  </tr>
                  <tr>
                    <td>Compressor.io</td>
                    <td>❌（上傳）</td>
                    <td>有限</td>
                    <td>高</td>
                    <td>❌</td>
                    <td>格式支援廣</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>怎麼選？看你壓的是什麼圖</h2>
            <ul>
              <li>
                <strong>證件、合約、含個資的截圖</strong> → 只考慮本機處理：<Link href="/compress">ImageMarker</Link>（還能順手加浮水印、清 EXIF）
              </li>
              <li>
                <strong>單張圖片要壓到最小</strong> → Squoosh（AVIF／MozJPEG 編碼器最強）
              </li>
              <li>
                <strong>大量非敏感網站素材</strong> → TinyPNG、iLoveIMG、Compressor.io 都很方便
              </li>
              <li>
                <strong>想一站搞定壓縮＋浮水印＋EXIF＋轉檔</strong> → ImageMarker
              </li>
            </ul>

            <h2>小技巧：先縮尺寸，再壓縮</h2>
            <p>
              如果照片是為了上傳網頁或當附件，往往不需要原始的超高解析度。先把長邊<Link href="/resize">縮放</Link>到 1600～2000px，再做壓縮，檔案會小得更漂亮，而在螢幕上看幾乎沒差。這比單純狂調壓縮強度、把畫質壓爛更聰明。
            </p>

            <h2>用 ImageMarker 壓縮圖片（不上傳、免費）</h2>
            <ol>
              <li>
                開啟 <Link href="/compress">ImageMarker 圖片壓縮</Link>，拖入或選取照片
              </li>
              <li>調整壓縮品質（一般照片建議 70～80%），即時看檔案大小變化</li>
              <li>下載壓縮後的圖片；多張可搭配批次、需要縮小尺寸可先用<Link href="/resize">縮放</Link></li>
            </ol>
            <p>
              關鍵在於：ImageMarker 是 <strong>100% 瀏覽器本機處理</strong>——壓縮過程圖片不會上傳到任何伺服器，含個資的截圖、還沒公開的商品圖都不會多出一份雲端副本。免費、免註冊，斷網也能用。
            </p>

            <h2>常見問題 FAQ</h2>

            <p>
              <strong>Q: 圖片壓縮會不會讓畫質變差？</strong>
              <br />
              A: 看壓縮方式。有損壓縮會捨棄部分細節換更小檔案，壓過頭會模糊；無損壓縮不損畫質但縮減較小。一般照片壓到 70～80% 品質，檔案大幅縮小而肉眼幾乎看不出差異。
            </p>

            <p>
              <strong>Q: 壓縮圖片時，檔案會被上傳到伺服器嗎？</strong>
              <br />
              A: 看工具。TinyPNG、iLoveIMG、Compressor.io 等雲端工具會上傳伺服器；<Link href="/compress">ImageMarker</Link> 和 Squoosh 在瀏覽器本機完成、不上傳。壓證件或含個資的圖，建議用本機處理的工具。
            </p>

            <p>
              <strong>Q: PNG 和 JPG 哪個比較適合壓縮？</strong>
              <br />
              A: 照片、漸層豐富的圖用 JPG（或 WebP）效率最高；需要透明背景或線條銳利的圖示、截圖適合 PNG。追求最小檔案可用<Link href="/convert">轉檔</Link>轉成 WebP，通常比 JPG／PNG 更小。
            </p>

            <p>
              <strong>Q: email 附件或網站有大小限制，圖片要壓到多小？</strong>
              <br />
              A: email 附件上限多為 20～25MB，網站表單常限單張 2～5MB。一般把單張壓到 1MB 以內、長邊縮到 1600～2000px 就能順利上傳且畫質足夠。先縮尺寸再壓縮效果最好。
            </p>

            <h2>結語</h2>
            <p>
              圖片太大不必再頭痛。壓縮工具沒有絕對的「最好」，只有「最適合當下情境」的：非敏感圖片求方便，雲端工具就很好用；要極致壓縮率找 Squoosh；但只要圖片上有個資，就選檔案不離開裝置的本機工具。搞懂有損無損、先縮尺寸再壓縮，你就能又快又安全地把每張圖變小。
            </p>
            <p>
              立即免費壓縮圖片<ReadMoreArrow />{" "}
              <a
                href="https://imagemarker.app/compress"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://imagemarker.app/compress
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
            <Link href="/blog/tinypng-iloveimg-squoosh-alternatives">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  TinyPNG、iLoveIMG、Squoosh 替代方案：不上傳的免費圖片工具比較
                </h3>
                <p className="text-sm text-muted-foreground">
                  哪些圖片工具真正在瀏覽器本機處理？隱私差異與功能一次看懂。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/what-is-exif-data">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  你的照片藏了什麼秘密？EXIF 資訊一鍵清除教學
                </h3>
                <p className="text-sm text-muted-foreground">
                  照片藏了 GPS、時間、手機型號，交出前先一鍵清乾淨。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/batch-watermark-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  一次幫幾十張照片加浮水印！3 種批次浮水印方法比較
                </h3>
                <p className="text-sm text-muted-foreground">
                  比較手機 App、Photoshop、線上工具，一次搞定整批浮水印。
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
