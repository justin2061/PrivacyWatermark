import { useEffect } from "react";
import { Link } from "wouter";

export default function WatermarkTemplatesGuidePage() {
  useEffect(() => {
    document.title = "證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）| ImageMarker";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本讓你直接套用，保護個資免於冒用。");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://imagemarker.app/blog/watermark-templates-guide";
  }, []);

  const templates = [
    { num: 1, title: "租屋", template: "僅供 {OO房東/仲介} 租屋用途 2026/XX/XX" },
    { num: 2, title: "求職", template: "僅供 {OO公司} 徵才審核 2026/XX/XX" },
    { num: 3, title: "銀行開戶", template: "僅供 {OO銀行} 開戶使用 2026/XX/XX" },
    { num: 4, title: "辦手機門號", template: "僅供 {中華電信/台灣大哥大} 申辦門號 2026/XX/XX" },
    { num: 5, title: "保險投保", template: "僅供 {OO人壽} 投保使用 2026/XX/XX" },
    { num: 6, title: "申請信用卡", template: "僅供 {OO銀行} 申辦信用卡 2026/XX/XX" },
    { num: 7, title: "汽機車過戶", template: "僅供 OO 過戶使用 2026/XX/XX" },
    { num: 8, title: "辦貸款", template: "僅供 {OO銀行} 貸款申請 2026/XX/XX" },
    { num: 9, title: "政府機關申辦", template: "僅供 {戶政/地政/監理站} 申辦使用 2026/XX/XX" },
    { num: 10, title: "公司行政（報稅／薪轉）", template: "僅供 {OO公司} 人資備存 2026/XX/XX" },
  ];

  const templateDetails = [
    {
      num: 1, title: "租屋",
      when: "租房子時，房東或仲介要求提供身分證影本確認租客身份。",
      template: "僅供 {OO房東/仲介} 租屋用途 2026/XX/XX",
      tip: "把「OO房東/仲介」換成實際姓名或公司名稱，如「大安仲介公司」。若尚不確定，可先寫「租屋用途」。"
    },
    {
      num: 2, title: "求職",
      when: "應徵工作時，雇主在背景調查或入職流程要求提供身分證影本。",
      template: "僅供 {OO公司} 徵才審核 2026/XX/XX",
      tip: "面試前提供就寫「徵才審核」，錄取後入職用就改為「僅供 OO公司 到職備存」。"
    },
    {
      num: 3, title: "銀行開戶",
      when: "到銀行新開存款帳戶或投資帳戶，行員要求留存身分證影本。",
      template: "僅供 {OO銀行} 開戶使用 2026/XX/XX",
      tip: "各大銀行對帶有浮水印的影本接受度高，這是主管機關建議的標準作法。"
    },
    {
      num: 4, title: "辦手機門號",
      when: "申辦或轉移電信門號，電信公司要求核驗身份。",
      template: "僅供 {中華電信/台灣大哥大} 申辦門號 2026/XX/XX",
      tip: "填上實際申辦的電信業者名稱，防止影本被拿去申辦其他電信商的門號。"
    },
    {
      num: 5, title: "保險投保",
      when: "購買人壽、醫療、車險等保險產品，保險公司或業務員需要核驗身份。",
      template: "僅供 {OO人壽} 投保使用 2026/XX/XX",
      tip: "若是透過保險業務員投保，建議把業務員姓名也加進去，如「僅供 OO 業務 OO人壽投保 2026/XX/XX」。"
    },
    {
      num: 6, title: "申請信用卡",
      when: "線上或臨櫃申請信用卡，銀行要求上傳或提供身分證影本。",
      template: "僅供 {OO銀行} 申辦信用卡 2026/XX/XX",
      tip: "線上申請時，上傳前記得用 ImageMarker 加好浮水印再拍照或截圖上傳。"
    },
    {
      num: 7, title: "汽機車過戶",
      when: "二手車/機車買賣，賣方或監理站需要買賣雙方的身分證影本辦理過戶。",
      template: "僅供 OO 過戶使用 2026/XX/XX",
      tip: "「OO」填車牌號碼或是對方姓名皆可，讓影本和這筆交易明確綁定。"
    },
    {
      num: 8, title: "辦貸款",
      when: "申請房貸、車貸、信用貸款，金融機構要求提供身分識別文件。",
      template: "僅供 {OO銀行} 貸款申請 2026/XX/XX",
      tip: "貸款資料往往會在多個部門流轉，浮水印格外重要。可加上「勿作他用」字樣。"
    },
    {
      num: 9, title: "政府機關申辦",
      when: "戶籍異動、地籍申請、駕照換發等，需要提交身分文件影本。",
      template: "僅供 {戶政/地政/監理站} 申辦使用 2026/XX/XX",
      tip: "政府機關原則上不拒絕有浮水印的影本，這是個資保護的合法作法。"
    },
    {
      num: 10, title: "公司行政（報稅／薪轉）",
      when: "到職時人資部門要求提供身分證影本作為薪轉帳戶設定或報稅用途。",
      template: "僅供 {OO公司} 人資備存 2026/XX/XX",
      tip: "公司內部流通的影本也需要保護。若是報稅用，可寫「僅供 OO公司 報稅備存 2026/XX/XX」。"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-3">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white text-sm" role="img" aria-label="相機">📷</span>
              </div>
              <span className="font-semibold text-gray-900">ImageMarker</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6" aria-label="breadcrumb">
          <Link href="/" className="hover:text-primary">首頁</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-primary">部落格</Link>
          <span>›</span>
          <span className="text-gray-900">浮水印內容範本</span>
        </nav>

        <article className="bg-white rounded-xl shadow-sm p-8">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium mb-3">
              <span>實用指南</span>
              <span>·</span>
              <span>範本</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time dateTime="2026-04-10">2026 年 4 月 10 日</time>
              <span>·</span>
              <span>閱讀約 8 分鐘</span>
            </div>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>前言</h2>
            <p>
              證件影本交出去後的命運你無法控制。加浮水印最簡單有效，但很多人卡在
              「浮水印到底要寫什麼才夠？」這篇整理 10 種台灣常見情境的實用範本，直接套用就好。
            </p>

            <h2>證件浮水印萬能公式</h2>
            <p>
              不管什麼情境，只要記住這個公式：
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
              <p className="text-blue-900 font-semibold text-lg text-center">用途 ＋ 對象 ＋ 日期</p>
            </div>
            <ul>
              <li><strong>用途</strong>：為什麼要給這張影本</li>
              <li><strong>對象</strong>：給誰／哪家公司</li>
              <li><strong>日期</strong>：提供當天的日期</li>
            </ul>
            <p>
              有這三個要素，即使影本外流也很難被挪作他用。日期尤其重要——它限制了影本的有效時間，
              半年後對方還想拿來用，法律上站不住腳。
            </p>

            <h2>10 種情境完整範本</h2>

            {/* Quick reference table */}
            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">情境</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">範本</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((t) => (
                    <tr key={t.num} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">{t.num}. {t.title}</td>
                      <td className="p-3 border border-gray-200 text-gray-600 font-mono text-xs">{t.template}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>以下逐一說明每個情境的使用時機和注意事項：</p>

            {templateDetails.map((detail) => (
              <div key={detail.num}>
                <h3>{detail.num}. {detail.title}</h3>
                <p><strong>什麼情況會用到：</strong>{detail.when}</p>
                <p><strong>建議範本：</strong></p>
                <blockquote>
                  <p className="font-mono">{detail.template}</p>
                </blockquote>
                <p><strong>小提醒：</strong>{detail.tip}</p>
              </div>
            ))}

            <h2>浮水印的最佳設計原則</h2>
            <p>知道寫什麼之後，還要知道怎麼放才有效：</p>
            <ol>
              <li><strong>位置</strong>：覆蓋整張證件，而不是角落（角落容易被 PS 移除）</li>
              <li><strong>透明度</strong>：30–50% 最剛好，看得到浮水印也看得到證件資訊</li>
              <li><strong>字體大小</strong>：對角線覆蓋，文字要大到無法忽略</li>
              <li><strong>字色</strong>：深色字（黑／深藍）對比強，效果最好</li>
              <li><strong>重複文字</strong>：重要的影本可以讓浮水印文字重複出現多次</li>
            </ol>

            <h2>浮水印可以「移除」嗎？</h2>
            <p>
              有心人用 PS 可以嘗試移除，但如果你做到以下幾點，移除難度大增，攻擊者通常會放棄：
            </p>
            <ul>
              <li>覆蓋整張圖片（非角落）</li>
              <li>用有意義的文字（用途 ＋ 對象 ＋ 日期）</li>
              <li>文字疊在重要資訊（身分證字號）上方</li>
            </ul>

            <h2>常見問題 FAQ</h2>

            <h3>Q1：對方不接受有浮水印的影本怎麼辦？</h3>
            <p>
              內政部的建議就是加註用途。正當的公司／機構都會接受。
              堅持要乾淨影本的反而要小心——這不符合個資保護的慣例作法。
            </p>

            <h3>Q2：要加「日期」有必要嗎？</h3>
            <p>
              非常必要。日期限定了影本的有效時間。
              半年後對方還想用這張，法律上站不住腳，也讓濫用行為更容易被追溯。
            </p>

            <h3>Q3：如果對象我還不確定怎麼辦？</h3>
            <p>
              可以寫「僅供 2026/XX/XX 申辦 OO 業務使用」，至少有日期 ＋ 用途，
              比沒加好很多。
            </p>

            <h3>Q4：浮水印會不會影響證件辨識？</h3>
            <p>
              30–50% 透明度不會。你也可以在 ImageMarker 即時預覽調整到滿意為止，
              套用前就能確認效果。
            </p>

            <h3>Q5：手機拍的照片也能加嗎？</h3>
            <p>
              可以。ImageMarker 支援手機瀏覽器，在手機上直接操作即可，不需要安裝 App。
            </p>

            <h2>立即套用範本，保護你的證件</h2>
            <p>
              ImageMarker 工具頁提供上述所有情境的一鍵套用按鈕，
              點擊即可自動填入對應範本（含今日日期），再自訂對象名稱就完成。
            </p>
            <p>
              <a href="https://imagemarker.app" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium no-underline">
                立即使用 ImageMarker 加浮水印 →
              </a>
            </p>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">相關文章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/rent-id-watermark" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">隱私保護</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">租屋交證件影本前必做！3 步驟幫身分證加浮水印</h3>
            </Link>
            <Link href="/blog/watermark-generators-recommendation" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow block">
              <p className="text-xs text-blue-600 font-medium mb-2">工具推薦</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">5 款免費線上浮水印產生器推薦</h3>
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
