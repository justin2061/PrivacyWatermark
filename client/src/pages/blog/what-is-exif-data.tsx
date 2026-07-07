import { useEffect } from "react";
import { Link } from "wouter";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const URL = "https://imagemarker.app/blog/what-is-exif-data";

export default function WhatIsExifData() {
  useEffect(() => {
    return setPageSeo({
      title:
        "你的照片藏了什麼秘密？EXIF 資訊一鍵清除教學（2026）| ImageMarker",
      description:
        "每張手機照片都偷偷記錄了 GPS 座標、拍攝時間、手機型號等 EXIF 資訊，上傳到社群或交給別人時可能洩漏你家住址與作息。這篇解釋 EXIF 是什麼、藏了哪些個資、有什麼風險，並教你用免費線上工具一鍵清除。",
      canonical: URL,
      jsonLd: [
        articleSchema({
          headline: "你的照片藏了什麼秘密？EXIF 資訊一鍵清除教學（2026）",
          description:
            "完整解析照片 EXIF 資訊：GPS 定位、拍攝時間、手機型號等隱藏個資，說明外洩風險與常見誤解，並教你用免費本機工具一鍵清除 EXIF，保護住址與行蹤隱私。",
          url: URL,
          datePublished: "2026-07-07",
        }),
        faqSchema([
          {
            q: "EXIF 資訊到底包含哪些內容？",
            a: "EXIF（可交換圖檔格式）是相機與手機在拍照時自動寫入照片檔案的中繼資料，常見內容包含：GPS 經緯度座標（拍攝地點）、拍攝的日期與時間、相機或手機的品牌型號、鏡頭與曝光參數（光圈、快門、ISO），有些甚至含縮圖與軟體版本。其中 GPS 與時間對隱私威脅最大。",
          },
          {
            q: "上傳到 Facebook、IG 的照片還有 EXIF 嗎？",
            a: "多數大型社群平台（Facebook、Instagram、LINE）在你上傳時會自動移除或壓縮掉大部分 EXIF，尤其是 GPS。但這不代表安全：直接用電子郵件、雲端連結、私訊原始檔傳給別人，或上傳到部落格、論壇、二手交易平台時，EXIF 往往原封不動保留。想確保乾淨，最好自己先清除。",
          },
          {
            q: "清除 EXIF 會讓照片畫質變差嗎？",
            a: "不會。EXIF 是附加在影像檔上的文字中繼資料，移除它只是刪掉這些資訊欄位，不會重新壓縮或改動影像像素，照片畫質完全不變，檔案還會略微變小。",
          },
          {
            q: "怎麼清除照片的 EXIF 最安全？",
            a: "用本機處理的線上工具最安全，例如 ImageMarker 的 EXIF 清除功能——照片在你的瀏覽器裡完成清除，不會上傳到任何伺服器。避免用會把照片上傳雲端的工具清 EXIF，否則等於為了移除定位資訊反而把原始照片交了出去。",
          },
        ]),
        blogBreadcrumb("你的照片藏了什麼秘密？EXIF 資訊一鍵清除教學", URL),
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
              你的照片藏了什麼秘密？EXIF 資訊一鍵清除教學（2026）
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <h2>一張照片，可能出賣了你家住址</h2>
            <p>
              你在家隨手拍了張貓咪的照片，上傳到二手社團賣東西。畫面裡沒有門牌、沒有地址，看起來很安全——但這張照片檔案的角落，可能藏著一組<strong>精確到公尺的 GPS 座標</strong>，直接指向你家。這就是 EXIF 資訊的隱形風險。
            </p>
            <p>
              多數人從沒聽過 EXIF，卻每天在製造它。這篇文章帶你搞懂：EXIF 是什麼、藏了哪些個資、可能造成什麼風險，以及最重要的——怎麼在交出照片前一鍵清乾淨。
            </p>

            <h2>什麼是 EXIF？</h2>
            <p>
              EXIF（Exchangeable Image File Format，可交換圖檔格式）是相機和手機在<strong>拍照當下自動寫進照片檔案裡</strong>的一組中繼資料（metadata）。它不會出現在畫面上，但一直跟著檔案跑，直到有人主動移除。
            </p>
            <p>常見的 EXIF 內容包括：</p>
            <ul>
              <li>
                <strong>GPS 經緯度座標</strong>——照片在哪裡拍的，往往精確到幾公尺內
              </li>
              <li>
                <strong>拍攝日期與時間</strong>——精確到秒，透露你當下人在哪、幾點在做什麼
              </li>
              <li>
                <strong>手機／相機品牌與型號</strong>——你用什麼裝置拍的
              </li>
              <li>
                <strong>曝光參數</strong>——光圈、快門、ISO、焦距、有沒有開閃光燈
              </li>
              <li>
                <strong>其他</strong>——修圖軟體與版本，有時還內嵌一張縮圖
              </li>
            </ul>
            <p>
              對攝影師來說，這些資訊很實用；但對一般人來說，其中的 <strong>GPS 與時間</strong>就是不折不扣的個資。
            </p>

            <h2>EXIF 會帶來哪些風險？</h2>

            <h3>1. 洩漏住家與常出沒地點</h3>
            <p>
              在家、在公司、在小孩學校拍的照片，只要含 GPS，看到的人就能反推出這些地點。把幾張照片的座標一比對，你的生活範圍、作息路線就攤在陽光下。跟蹤、騷擾、竊盜都可能從這裡開始。
            </p>

            <h3>2. 暴露行蹤與作息</h3>
            <p>
              拍攝時間 + 地點的組合，等於一份你的行動紀錄。「這個時段家裡沒人」「這個人週末都在某地」——這些推論對有心人來說極有價值。
            </p>

            <h3>3. 二手交易、租屋、社群貼文的隱形破口</h3>
            <p>
              賣二手商品在家拍、租屋照在租屋處拍、日常貼文在生活圈拍——這些場景最容易不經意上傳含 GPS 的原始檔，把私密位置送給不特定的陌生人。
            </p>

            <h2>常見誤解：社群平台不是萬能保險</h2>
            <p>
              「我都發 IG 啊，聽說平台會自動清 EXIF？」——這句話對一半。Facebook、Instagram、LINE 等大型平台在你上傳時，<strong>確實會移除或壓縮掉大部分 EXIF（尤其 GPS）</strong>。但危險藏在這些場景：
            </p>
            <ul>
              <li>用 <strong>電子郵件、雲端連結、私訊直接傳原始檔</strong>給別人</li>
              <li>上傳到<strong>部落格、論壇、二手交易平台</strong>等不一定會清 EXIF 的網站</li>
              <li>把照片交給廠商、房仲、旅行社等第三方時</li>
            </ul>
            <p>
              換句話說，你不能假設「反正平台會處理」。<strong>唯一可靠的做法，是照片離開你手上之前，自己先清乾淨。</strong>
            </p>

            <h2>清除 EXIF 常見問題</h2>
            <p>
              <strong>會不會傷畫質？</strong>不會。EXIF 只是附在影像檔上的文字資訊，移除它不會重新壓縮、不會動到任何一個像素，照片看起來完全一樣，檔案還會小一點點。
            </p>
            <p>
              <strong>需要每張手動看嗎？</strong>不用。好的工具可以一次拖入多張、批次清除，不必逐張檢查那一長串參數。
            </p>

            <h2>用 ImageMarker 一鍵清除 EXIF（不上傳、3 步驟）</h2>
            <p>
              最安全的清除方式，是選擇<strong>本機處理</strong>的工具——照片在你自己的瀏覽器裡完成清除，全程不上傳。用 ImageMarker 的 <Link href="/exif-clean">EXIF 清除工具</Link>：
            </p>
            <ol>
              <li>
                開啟 <Link href="/exif-clean">ImageMarker EXIF 清除</Link>，拖入或選取要處理的照片
              </li>
              <li>工具會自動移除 GPS、拍攝時間、裝置型號等所有 EXIF 中繼資料</li>
              <li>下載乾淨版本，再放心上傳或傳給別人</li>
            </ol>
            <p>
              關鍵在於：ImageMarker 是 <strong>100% 瀏覽器本機處理</strong>——你的照片從頭到尾不會上傳到任何伺服器。這點對清 EXIF 特別重要：要是為了移除定位資訊，卻把原始照片上傳到雲端工具，等於前門關了後門開。免費、免註冊，斷網也能用。
            </p>
            <p>
              如果你交出的是<strong>證件影本</strong>，建議兩步都做：先用 <Link href="/exif-clean">EXIF 清除</Link>移除拍攝定位，再用 <Link href="/">浮水印工具</Link>標註用途，雙重保護個資。
            </p>

            <h2>常見問題 FAQ</h2>

            <p>
              <strong>Q: EXIF 資訊到底包含哪些內容？</strong>
              <br />
              A: 相機與手機在拍照時自動寫入的中繼資料，常見包含 GPS 經緯度、拍攝日期時間、手機／相機型號、光圈快門 ISO 等曝光參數，有時還有縮圖與軟體版本。其中 GPS 與時間對隱私威脅最大。
            </p>

            <p>
              <strong>Q: 上傳到 Facebook、IG 的照片還有 EXIF 嗎？</strong>
              <br />
              A: 大型社群平台上傳時多會移除或壓縮大部分 EXIF（尤其 GPS）。但用 email、雲端連結、私訊傳原始檔，或上傳到部落格、論壇、二手平台時，EXIF 往往完整保留。想確保乾淨，最好自己先清。
            </p>

            <p>
              <strong>Q: 清除 EXIF 會讓照片畫質變差嗎？</strong>
              <br />
              A: 不會。EXIF 是附加的文字中繼資料，移除它不會重新壓縮或改動影像像素，畫質完全不變，檔案還會略微變小。
            </p>

            <p>
              <strong>Q: 怎麼清除照片的 EXIF 最安全？</strong>
              <br />
              A: 用本機處理的工具，例如 <Link href="/exif-clean">ImageMarker 的 EXIF 清除</Link>——照片在瀏覽器裡完成清除、不上傳伺服器。避免用會把照片傳到雲端的工具清 EXIF，否則反而把原始照片交了出去。
            </p>

            <h2>結語</h2>
            <p>
              照片會說話，而 EXIF 說的往往是你不想讓陌生人知道的事：你家在哪、你幾點在哪、你用什麼裝置。好消息是，清除它只要幾秒鐘、不傷畫質，還能批次完成。養成一個習慣就好——<strong>照片離開你手上之前，先清 EXIF</strong>，尤其是在家拍的、要賣二手的、要交給第三方的。
            </p>
            <p>
              立即免費清除照片 EXIF →{" "}
              <a
                href="https://imagemarker.app/exif-clean"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://imagemarker.app/exif-clean
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
                  閱讀全文 →
                </span>
              </article>
            </Link>
            <Link href="/blog/anti-theft-photo-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  防盜圖浮水印怎麼加最有效？攝影師、賣家必學的 5 個技巧
                </h3>
                <p className="text-sm text-muted-foreground">
                  滿版斜向重複、半透明疊主體等 5 個真正有效的防盜圖技巧。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文 →
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
