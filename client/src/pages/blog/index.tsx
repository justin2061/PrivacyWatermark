import { useEffect } from "react";
import { Link } from "wouter";

const articles = [
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
];

export default function BlogIndex() {
  useEffect(() => {
    document.title = "部落格 | ImageMarker 證件浮水印工具";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "ImageMarker 部落格：分享證件保護、個資安全的實用知識與教學。"
      );
    }
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
                  閱讀文章 →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
