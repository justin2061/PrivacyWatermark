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

const URL =
  "https://imagemarker.app/blog/tinypng-iloveimg-squoosh-alternatives";
const SLUG = "tinypng-iloveimg-squoosh-alternatives";

export default function TinypngIloveimgSquooshAlternatives() {
  useEffect(() => {
    return setPageSeo({
      title:
        "TinyPNG、iLoveIMG、Squoosh 替代方案：不上傳伺服器的免費圖片工具比較（2026）| ImageMarker",
      description:
        "TinyPNG 和 iLoveIMG 都會把圖片上傳到雲端伺服器處理。這篇比較 4 款免費線上圖片工具的隱私差異：哪些真正在瀏覽器本機處理、免費限制、批次、浮水印、EXIF 清除功能一次看懂。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline:
            "TinyPNG、iLoveIMG、Squoosh 替代方案：不上傳伺服器的免費圖片工具比較（2026）",
          description:
            "比較 TinyPNG、iLoveIMG、Squoosh 與 ImageMarker 的隱私差異與功能：哪些工具會上傳圖片、哪些在瀏覽器本機處理，以及批次、浮水印、EXIF 清除功能比較。",
          url: URL,
          datePublished: "2026-07-03",
        }),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "免費線上圖片工具比較",
          itemListElement: ["ImageMarker", "Squoosh", "TinyPNG", "iLoveIMG"].map(
            (name, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
            })
          ),
        },
        faqSchema([
          {
            q: "用 TinyPNG 或 iLoveIMG 壓縮圖片，檔案會被上傳嗎？",
            a: "會。TinyPNG 和 iLoveIMG 都是雲端服務，圖片會先上傳到官方伺服器處理完再回傳下載連結。一般照片通常沒問題，但處理證件、合約、含個資的截圖時，檔案離開裝置本身就是風險。",
          },
          {
            q: "怎麼確認一個線上工具是不是本機處理？",
            a: "最簡單的方法：打開瀏覽器開發者工具的 Network 分頁，上傳並處理一張圖，如果沒有出現包含圖片內容的上傳請求，就是本機處理。也可以先斷網再操作，本機處理的工具離線也能運作。",
          },
          {
            q: "Squoosh 也是本機處理，和 ImageMarker 差在哪？",
            a: "兩者都在瀏覽器本機處理、都不上傳。Squoosh 的壓縮編碼器較進階（MozJPEG、AVIF），適合單張圖片的極致壓縮；但它一次只能處理一張、也沒有浮水印、EXIF 清除、批次、去背等功能，且是英文介面。需要處理證件或多張圖片時 ImageMarker 較合適。",
          },
          {
            q: "處理身分證、護照等證件影本應該用哪個工具？",
            a: "只用本機處理的工具（ImageMarker 或 Squoosh），且建議加上浮水印再交出。證件影本上傳到任何第三方伺服器，都等於多一份你無法控制的個資副本。",
          },
        ]),
        blogBreadcrumb(
          "TinyPNG、iLoveIMG、Squoosh 替代方案：不上傳的免費圖片工具比較",
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
              dateTime="2026-07-03"
              className="text-sm text-muted-foreground"
            >
              2026-07-03
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              TinyPNG、iLoveIMG、Squoosh 替代方案：不上傳伺服器的免費圖片工具比較（2026）
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <h2>你壓縮的圖片，去了哪裡？</h2>
            <p>
              需要壓縮、轉檔或縮放圖片時，多數人會直接搜尋「線上圖片壓縮」，點開第一個結果就把檔案丟上去。但很少人注意到一個關鍵差異：<strong>有些工具會把你的圖片上傳到它們的伺服器處理，有些則完全在你的瀏覽器本機完成</strong>。
            </p>
            <p>
              壓縮一張風景照，上不上傳也許無所謂。但如果是<strong>身分證影本、護照、合約截圖、還沒發布的商品圖</strong>，檔案一旦離開你的裝置，你就多了一份無法控制的副本——它會在對方伺服器停留多久、被怎麼使用，取決於你多半沒讀過的隱私政策。
            </p>
            <p>
              這篇誠實比較 4 款常見的免費線上圖片工具：TinyPNG、iLoveIMG、Squoosh 和 ImageMarker，重點放在「檔案有沒有離開你的裝置」以及各自的功能與限制。
            </p>

            <InlineCTA tool="compress" position="mid_article" location={SLUG} />

            <h2>快速結論</h2>
            <ul>
              <li>
                <strong>TinyPNG、iLoveIMG：雲端處理</strong>——圖片會上傳到官方伺服器，功能完整但不適合敏感檔案，免費版有數量/大小限制
              </li>
              <li>
                <strong>Squoosh：本機處理</strong>——Google 出品的開源壓縮工具，編碼器最強，但一次只能一張、只有壓縮/轉檔
              </li>
              <li>
                <strong>ImageMarker：本機處理</strong>——浮水印、批次、EXIF 清除、AI 去背、壓縮、轉檔、縮放都在瀏覽器完成，繁體中文介面、免費免註冊
              </li>
            </ul>

            <h2>逐一介紹</h2>

            <h3>TinyPNG（tinypng.com）</h3>
            <ul>
              <li>老牌圖片壓縮服務，智慧有損壓縮效果好</li>
              <li>支援 PNG、JPEG、WebP、AVIF</li>
              <li>
                <strong>雲端處理</strong>：圖片會上傳到伺服器
              </li>
              <li>免費版有每次張數與單檔大小限制</li>
              <li>
                <strong>適合：</strong>網站素材、部落格圖片等非敏感圖片的快速壓縮
              </li>
            </ul>

            <h3>iLoveIMG（iloveimg.com）</h3>
            <ul>
              <li>工具最齊全：壓縮、縮放、裁切、轉檔、浮水印、去背都有</li>
              <li>有繁體中文介面，支援批次</li>
              <li>
                <strong>雲端處理</strong>：所有操作都在官方伺服器完成
              </li>
              <li>免費版有次數與檔案大小限制，進階功能需付費</li>
              <li>
                <strong>適合：</strong>需要一站式處理大量非敏感圖片的使用者
              </li>
            </ul>

            <h3>Squoosh（squoosh.app）</h3>
            <ul>
              <li>Google Chrome Labs 開源專案，用 WebAssembly 在瀏覽器本機壓縮</li>
              <li>
                <strong>本機處理</strong>：檔案不上傳，離線也能用
              </li>
              <li>編碼器最進階（MozJPEG、AVIF、WebP），有即時左右對比</li>
              <li>缺點：一次只能處理一張、沒有批次、沒有浮水印/EXIF 清除/去背、英文介面</li>
              <li>
                <strong>適合：</strong>追求單張圖片極致壓縮品質的開發者、設計師
              </li>
            </ul>

            <h3>ImageMarker（imagemarker.app）⭐ 隱私工具箱</h3>
            <ul>
              <li>
                <strong>100% 瀏覽器本機處理</strong>：所有工具的檔案都不上傳，連 AI 去背的模型都在本機執行
              </li>
              <li>
                工具齊全：<Link href="/">證件浮水印</Link>、<Link href="/batch">批次浮水印</Link>、<Link href="/exif-clean">EXIF 清除</Link>、<Link href="/remove-bg">AI 去背</Link>、<Link href="/compress">壓縮</Link>、<Link href="/convert">轉檔</Link>、<Link href="/resize">縮放</Link>
              </li>
              <li>免費、免註冊、無廣告，繁體中文介面，支援 PWA 離線使用</li>
              <li>誠實說缺點：壓縮編碼器用瀏覽器原生 Canvas，極致壓縮率不如 Squoosh 的 MozJPEG/AVIF；不支援 PDF</li>
              <li>
                <strong>適合：</strong>處理證件、含個資圖片，或想要一站式隱私工具箱的使用者
              </li>
            </ul>

            <InlineCTA tool="exif-clean" position="mid_article" location={SLUG} />

            <h2>功能比較表</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>工具</th>
                    <th>本機處理</th>
                    <th>批次</th>
                    <th>浮水印</th>
                    <th>EXIF 清除</th>
                    <th>AI 去背</th>
                    <th>繁中</th>
                    <th>免註冊</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ImageMarker</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>Squoosh</td>
                    <td>✅</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>TinyPNG</td>
                    <td>❌（上傳伺服器）</td>
                    <td>✅（有限制）</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>iLoveIMG</td>
                    <td>❌（上傳伺服器）</td>
                    <td>✅（有限制）</td>
                    <td>✅</td>
                    <td>❌</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>部分功能需註冊</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>怎麼選？看你處理的是什麼圖</h2>
            <ul>
              <li>
                <strong>證件、合約、含個資的圖片</strong> → 只考慮本機處理：ImageMarker（可順便加浮水印、清 EXIF）
              </li>
              <li>
                <strong>單張圖片要壓到最小</strong> → Squoosh（AVIF/MozJPEG 編碼器）
              </li>
              <li>
                <strong>大量非敏感網站素材</strong> → TinyPNG 或 iLoveIMG 都很方便
              </li>
              <li>
                <strong>想要一個工具搞定壓縮＋浮水印＋EXIF＋去背</strong> → ImageMarker
              </li>
            </ul>

            <h2>常見問題 FAQ</h2>

            <p>
              <strong>Q: 用 TinyPNG 或 iLoveIMG 壓縮圖片，檔案會被上傳嗎？</strong>
              <br />
              A: 會。兩者都是雲端服務，圖片會先上傳到官方伺服器處理完再回傳。一般照片通常沒問題，但處理證件、合約、含個資的截圖時，檔案離開裝置本身就是風險。
            </p>

            <p>
              <strong>Q: 怎麼確認一個線上工具是不是本機處理？</strong>
              <br />
              A: 打開瀏覽器開發者工具的 Network 分頁，上傳並處理一張圖，如果沒有出現包含圖片內容的上傳請求，就是本機處理。也可以先斷網再操作——本機處理的工具離線也能運作，ImageMarker 和 Squoosh 都通過這個測試。
            </p>

            <p>
              <strong>Q: Squoosh 也是本機處理，和 ImageMarker 差在哪？</strong>
              <br />
              A: 兩者都不上傳檔案，這點都值得信任。差別在定位：Squoosh 專注單張圖片的極致壓縮，編碼器較強；ImageMarker 是隱私工具箱，涵蓋浮水印、批次、EXIF 清除、AI 去背，且是繁體中文介面。
            </p>

            <p>
              <strong>Q: 處理身分證、護照等證件影本應該用哪個？</strong>
              <br />
              A: 只用本機處理的工具，且交出前建議先用 <Link href="/">ImageMarker 加上浮水印</Link>、再用 <Link href="/exif-clean">EXIF 清除</Link>移除拍攝定位資訊，雙重保護。
            </p>

            <h2>結語</h2>
            <p>
              「免費線上工具」不代表沒有成本——有時成本是你的檔案副本。工具本身沒有好壞，關鍵是分清楚場合：非敏感圖片用雲端工具求方便沒問題，但只要圖片上有個資，就選擇檔案不離開裝置的本機處理工具。
            </p>
            <p>
              立即試用 ImageMarker<ReadMoreArrow />{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
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

        <PopularTools location={SLUG} tools={["compress", "convert", "exif-clean", "watermark"]} className="mt-12" />

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
                  完整比較本地端處理 vs 雲端上傳、隱私安全、功能優缺點。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/batch-watermark-methods">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  一次處理多張證件影本！批次加浮水印的 3 種方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  比較逐張處理、Photoshop 批次、線上工具 3 種方法的優缺點。
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
                  三步驟幫身分證影本加上浮水印，防止個資被冒用。
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
