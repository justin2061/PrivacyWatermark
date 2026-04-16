import { useEffect } from "react";
import { Link } from "wouter";

export default function RentIdWatermarkPage() {
  useEffect(() => {
    document.title = "租屋交證件影本前必做！3 步驟幫身分證加浮水印 | ImageMarker";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "房東要求提供身分證影本？先加浮水印再給！本文教你 3 個步驟，用免費工具快速在證件上加上租屋專用浮水印，防止個資被盜用。");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://imagemarker.app/blog/rent-id-watermark";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6" aria-label="breadcrumb">
          <Link href="/"><a className="hover:text-primary">首頁</a></Link>
          <span>›</span>
          <Link href="/blog"><a className="hover:text-primary">部落格</a></Link>
          <span>›</span>
          <span className="text-gray-900">租屋交證件影本前必做</span>
        </nav>

        <article className="bg-white rounded-xl shadow-sm p-8">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium mb-3">
              <span>隱私保護</span>
              <span>·</span>
              <span>租屋</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              租屋交證件影本前必做！3 步驟幫身分證加浮水印
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time dateTime="2026-01-15">2026 年 1 月 15 日</time>
              <span>·</span>
              <span>閱讀約 5 分鐘</span>
            </div>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>為什麼租屋一定要加浮水印？</h2>
            <p>
              房東或仲介要求提供身分證影本是租屋過程中的常見流程，但這也是個資外洩的高風險時刻。
              一旦影本流出，不肖人士可能拿去申辦門號、辦信用卡、甚至詐騙第三方。
            </p>
            <p>
              加浮水印是最簡單、最有效的防護手段。浮水印明確標示「僅供租屋用途」，
              即使影本外流，也很難被挪作他用。
            </p>

            <h2>步驟 1：開啟 ImageMarker 工具</h2>
            <p>
              前往 <a href="https://imagemarker.app" className="text-primary hover:underline">imagemarker.app</a>，
              這是一款 100% 本地端處理的浮水印工具，圖片不會上傳到任何伺服器，可以放心使用。
            </p>
            <ul>
              <li>支援手機瀏覽器（iOS Safari / Android Chrome）</li>
              <li>不需要安裝 App 或登入</li>
              <li>完全免費</li>
            </ul>

            <h2>步驟 2：設定浮水印文字</h2>
            <p>在浮水印文字欄位輸入：</p>
            <blockquote>
              <p>僅供 XX 房東租屋用途 2026/XX/XX</p>
            </blockquote>
            <p>將 <code>XX 房東</code> 換成實際的房東姓名或仲介公司名稱，日期填當天。</p>
            <p><strong>建議設定：</strong></p>
            <ul>
              <li>透明度：40%（清晰可見但不遮蔽證件資訊）</li>
              <li>位置：中央覆蓋（最難被移除）</li>
              <li>字體：大或特大</li>
            </ul>

            <h2>步驟 3：預覽、套用並下載</h2>
            <p>
              上傳身分證圖片後，即時預覽浮水印效果。確認文字清晰且覆蓋重要資訊（身分證字號）後，
              點擊「套用浮水印」再下載。
            </p>

            <h2>常見問題</h2>
            <h3>房東說不接受有浮水印的影本？</h3>
            <p>
              根據內政部「個人資料保護法」精神，提供有用途標示的影本是正當行為。
              正規房東和仲介都能接受。若對方堅持要乾淨影本，反而需要提高警覺。
            </p>

            <h3>浮水印會不會被 PS 掉？</h3>
            <p>
              覆蓋整張圖的浮水印比角落水印難移除許多。只要文字疊在身分證字號等關鍵資訊上，
              移除後資訊也無法辨識，大幅降低冒用風險。
            </p>

            <h2>立即保護你的證件</h2>
            <p>
              租屋看房的過程中，請養成「先加浮水印再給影本」的習慣。
              30 秒就能完成，省去日後個資被冒用的麻煩。
            </p>
            <p>
              <a href="https://imagemarker.app" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium no-underline">
                立即使用 ImageMarker →
              </a>
            </p>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">相關文章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/watermark-generators-recommendation">
              <a className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
                <p className="text-xs text-blue-600 font-medium mb-2">工具推薦</p>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">5 款免費線上浮水印產生器推薦</h3>
              </a>
            </Link>
            <Link href="/blog/watermark-templates-guide">
              <a className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
                <p className="text-xs text-blue-600 font-medium mb-2">實用指南</p>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">證件浮水印內容範本：10 種情境怎麼寫</h3>
              </a>
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
