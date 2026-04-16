import { useEffect } from "react";
import { Link } from "wouter";

const articles = [
  {
    slug: "watermark-templates-guide",
    category: "實用指南",
    title: "證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）",
    description: "租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本讓你直接套用，保護個資免於冒用。",
    date: "2026-04-10",
    displayDate: "2026 年 4 月 10 日",
    readTime: "8 分鐘",
  },
  {
    slug: "watermark-generators-recommendation",
    category: "工具推薦",
    title: "5 款免費線上浮水印產生器推薦（2026 最新）",
    description: "整理 5 款免費線上浮水印工具，比較功能、隱私安全性與使用難度，幫你找到最適合保護證件影本的浮水印產生器。",
    date: "2026-02-10",
    displayDate: "2026 年 2 月 10 日",
    readTime: "6 分鐘",
  },
  {
    slug: "rent-id-watermark",
    category: "隱私保護",
    title: "租屋交證件影本前必做！3 步驟幫身分證加浮水印",
    description: "房東要求提供身分證影本？先加浮水印再給！本文教你 3 個步驟，用免費工具快速在證件上加上租屋專用浮水印，防止個資被盜用。",
    date: "2026-01-15",
    displayDate: "2026 年 1 月 15 日",
    readTime: "5 分鐘",
  },
];

export default function BlogIndexPage() {
  useEffect(() => {
    document.title = "部落格 — 證件保護與隱私安全指南 | ImageMarker";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "ImageMarker 部落格：提供證件浮水印教學、隱私保護指南、常見情境範本，幫助你安全保護個人資料。");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://imagemarker.app/blog";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-3">
            <Link href="/">
              <a className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white text-sm" role="img" aria-label="相機">📷</span>
                </div>
                <span className="font-semibold text-gray-900">ImageMarker</span>
              </a>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6" aria-label="breadcrumb">
          <Link href="/"><a className="hover:text-primary">首頁</a></Link>
          <span>›</span>
          <span className="text-gray-900">部落格</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">部落格</h1>
          <p className="text-gray-600">證件保護、隱私安全、浮水印使用指南</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <a className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow block">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-blue-600 font-medium mb-2">{article.category}</p>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-snug hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.description}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <time dateTime={article.date}>{article.displayDate}</time>
                      <span>·</span>
                      <span>閱讀約 {article.readTime}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 ml-4 text-lg">→</span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h2 className="font-semibold text-blue-900 mb-2">立即保護你的證件</h2>
          <p className="text-blue-800 text-sm mb-4">100% 本地端處理，圖片不上傳伺服器</p>
          <Link href="/">
            <a className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              開啟浮水印工具 →
            </a>
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">© 2026 ImageMarker — 保護您的隱私安全</p>
        </div>
      </footer>
    </div>
  );
}
