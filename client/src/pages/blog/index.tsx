import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { setPageSeo } from "@/lib/seo";

const articles = [
  {
    slug: "id-copy-leaked-consequences",
    title:
      "2026 台灣詐騙手法大公開：身分證影本外洩後會發生什麼事？",
    date: "2026-07-11",
    summary:
      "台灣詐騙財損破 502 億。身分證影本一旦外洩，可能被盜辦門號、申貸、開人頭帳戶，甚至讓你淪為洗錢工具。拆解最新詐騙手法與真實後果，教你最簡單的自保——交件前先加浮水印。",
  },
  {
    slug: "rent-before-giving-id-3-things",
    title: "租屋必看：給房東證件影本前，這 3 件事一定要做",
    date: "2026-07-11",
    summary:
      "房東要你的身分證影本合理嗎？交出去前這 3 件事一定要先做：加浮水印限定用途、遮蔽敏感資訊、保留交件證據。附 step by step 教學，教你安全交付不怕被冒用。",
  },
  {
    slug: "job-interview-id-copy-safety",
    title: "求職面試要交身分證影本？小心這些陷阱，教你安全提交",
    date: "2026-07-11",
    summary:
      "面試就要身分證影本、存摺影本，合理嗎？教你分辨合理的入職手續與求職詐騙陷阱，以及安全提交證件的方法：加浮水印、備註用途、遮蔽敏感資訊。",
  },
  {
    slug: "id-watermark-complete-guide",
    title: "證件影本加浮水印完整教學：5 種情境、3 步驟搞定",
    date: "2026-07-11",
    summary:
      "證件浮水印怎麼加？完整教學：什麼是證件浮水印、租屋求職開戶辦卡簽證 5 種情境怎麼寫、3 步驟完成，再教 Logo 浮水印與馬賽克遮蔽的進階搭配。附常見問題 FAQ。",
  },
  {
    slug: "batch-watermark-guide",
    title: "一次幫幾十張照片加浮水印！3 種批次浮水印方法比較",
    date: "2026-07-07",
    summary:
      "幾十張照片一張張加浮水印太累。本篇比較手機 App、Photoshop 批次、線上工具 3 種批次浮水印方法的速度、學習成本與隱私差異，教你一次上傳、統一套用、打包下載。",
  },
  {
    slug: "what-is-exif-data",
    title: "你的照片藏了什麼秘密？EXIF 資訊一鍵清除教學",
    date: "2026-07-07",
    summary:
      "每張手機照片都偷偷記錄了 GPS 座標、拍攝時間、手機型號。本篇解釋 EXIF 是什麼、藏了哪些個資、有什麼風險，並教你用免費本機工具一鍵清除，交出照片前先清乾淨。",
  },
  {
    slug: "image-compression-guide",
    title: "圖片太大怎麼辦？5 種免費線上圖片壓縮工具推薦",
    date: "2026-07-07",
    summary:
      "照片太大無法上傳、附件被擋、網站載入慢？本篇比較 TinyPNG、Squoosh、iLoveIMG、Compressor.io、ImageMarker 5 款免費壓縮工具的壓縮率、隱私與適用情境。",
  },
  {
    slug: "rent-required-documents",
    title: "租屋簽約要交哪些文件？身分證影本安全交付指南",
    date: "2026-07-07",
    summary:
      "租屋簽約到底要準備哪些文件？房東可以要身分證影本嗎？整理租屋必備文件清單，教你哪些能給、哪些能拒絕，以及如何加浮水印安全交付身分證影本。",
  },
  {
    slug: "rent-scam-id-fraud",
    title: "租屋詐騙手法大公開：如何避免證件被冒用",
    date: "2026-07-07",
    summary:
      "假房東、假仲介、要求先傳證件……本篇拆解 5 種常見租屋詐騙與證件冒用手法，教你辨識詐騙、保護身分證影本不被拿去盜辦門號與貸款。",
  },
  {
    slug: "landlord-asks-for-id",
    title: "房東要求提供證件影本，我該給嗎？完整分析",
    date: "2026-07-07",
    summary:
      "房東要身分證影本合理嗎？租屋一定要給嗎？完整分析你的權利、哪些能給哪些能拒絕，附拒絕與折衷的實用話術，以及安全交付方法。",
  },
  {
    slug: "anti-theft-photo-watermark",
    title: "防盜圖浮水印怎麼加最有效？攝影師、賣家必學的 5 個技巧（2026）",
    date: "2026-07-03",
    summary:
      "角落的小浮水印裁切、AI 修復幾秒就能移除。本篇教你真正有效的防盜圖浮水印：滿版斜向重複、半透明疊主體等 5 個技巧，附攝影、電商、插畫、社群四種情境建議。",
  },
  {
    slug: "tinypng-iloveimg-squoosh-alternatives",
    title: "TinyPNG、iLoveIMG、Squoosh 替代方案：不上傳的免費圖片工具比較（2026）",
    date: "2026-07-03",
    summary:
      "TinyPNG 和 iLoveIMG 都會把圖片上傳到雲端伺服器。這篇誠實比較 4 款免費圖片工具的隱私差異：哪些真正在瀏覽器本機處理，批次、浮水印、EXIF 清除功能一次看懂。",
  },
  {
    slug: "passport-travel-agency-watermark",
    title: "護照影本交給旅行社安全嗎？報名旅行團前必做的自保 3 件事",
    date: "2026-07-01",
    summary:
      "報名旅行團、辦簽證要交護照影本給旅行社，安全嗎？從五福旅行社個資外洩事件，教你交件前的自保 3 件事，以及旅行社護照浮水印怎麼寫最安全。",
  },
  {
    slug: "rent-id-watermark",
    title: "租屋交證件影本前必做！3 步驟幫身分證加浮水印",
    date: "2026-04-06",
    summary:
      "每次提供身分證影本前，花不到一分鐘加上浮水印，大幅降低個資被冒用的風險。了解浮水印要寫什麼、怎麼寫，以及用 ImageMarker 三步驟完成。",
  },
  {
    slug: "watermark-generators-recommendation",
    title: "5 款免費線上浮水印產生器推薦｜2026 年最新比較",
    date: "2026-04-07",
    summary:
      "精選 5 款最好用的免費浮水印工具，完整比較本地端處理 vs 雲端上傳、隱私安全、功能優缺點，幫你找到最適合自己的工具。",
  },
  {
    slug: "watermark-templates-guide",
    title: "證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）",
    date: "2026-04-16",
    summary:
      "租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本讓你直接套用。",
  },
  {
    slug: "passport-watermark-guide",
    title: "護照影本也要加浮水印！出國前必看的護照安全指南",
    date: "2026-05-27",
    summary:
      "出國旅遊交護照影本給旅行社前，一定要先加浮水印！本篇教你護照浮水印怎麼寫、放哪個位置最安全，附 5 種常見範本。",
  },
  {
    slug: "mobile-watermark-tutorial",
    title: "手機怎麼幫身分證加浮水印？免安裝 App 的最快方法",
    date: "2026-05-27",
    summary:
      "不用下載 App，用手機瀏覽器就能幫身分證加浮水印。本篇教你 3 分鐘完成，iPhone 和 Android 都適用。",
  },
  {
    slug: "other-documents-watermark",
    title: "不只身分證！存摺、健保卡、駕照影本也要加浮水印",
    date: "2026-05-27",
    summary:
      "除了身分證，存摺封面、健保卡、駕照等影本也是詐騙的高危目標。本篇教你 6 種常見證件的浮水印寫法，一次保護所有個資。",
  },
  {
    slug: "is-id-watermark-useful",
    title: "身分證浮水印有用嗎？真相解析＋3 個真實案例",
    date: "2026-07-07",
    summary:
      "身分證浮水印真的有用，不是心理作用！用 3 個台灣真實案例＋個資法依據，解析浮水印如何擋下門號、貸款、開公司的冒用，以及正確加法。",
  },
  {
    slug: "batch-watermark-methods",
    title: "一次處理多張證件影本！批次加浮水印的 3 種方法",
    date: "2026-06-03",
    summary:
      "需要一次幫多張證件影本加浮水印？本篇比較逐張處理、Photoshop 批次、線上工具 3 種方法的優缺點。",
  },
];

export default function BlogIndex() {
  useEffect(() => {
    return setPageSeo({
      title: "部落格 | ImageMarker 證件浮水印工具",
      description:
        "ImageMarker 部落格：分享證件保護、個資安全的實用知識與教學。",
      canonical: "https://imagemarker.app/blog",
      locale: "zh_TW",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 回首頁
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">部落格</h1>
        <div className="space-y-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <article className="block border rounded-xl p-6 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <time
                  dateTime={article.date}
                  className="text-sm text-muted-foreground"
                >
                  {article.date}
                </time>
                <h2 className="text-xl font-semibold mt-2 mb-3">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.summary}
                </p>
                <span className="inline-block mt-4 text-sm text-primary font-medium">
                  閱讀文章<ReadMoreArrow />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
