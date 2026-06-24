import { useEffect } from "react";
import { Link } from "wouter";

export default function OtherDocumentsWatermark() {
  useEffect(() => {
    document.title =
      "不只身分證！存摺、健保卡、駕照影本也要加浮水印 | ImageMarker";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "除了身分證，存摺封面、健保卡、駕照等影本也是詐騙的高危目標。本篇教你 6 種常見證件的浮水印寫法，一次保護所有個資。"
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        "href",
        "https://imagemarker.app/blog/other-documents-watermark"
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
              dateTime="2026-05-27"
              className="text-sm text-muted-foreground"
            >
              2026-05-27
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              不只身分證！存摺、健保卡、駕照影本也要加浮水印
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              講到證件影本要加浮水印，大家第一個想到的幾乎都是身分證。但實際上，存摺封面、健保卡、駕照、行照、學生證、在職證明……這些日常生活中經常被要求提供的影本，外洩風險其實一點也不亞於身分證。更糟的是，因為大家對它們的警覺心比較低，反而成了詐騙集團眼中更容易得手的目標。
            </p>
            <p>
              這篇文章一次整理 6 種最常見證件的浮水印寫法，看完之後不論對方要你交哪一種影本，你都能立刻反應過來：「等等，我要先加浮水印再傳。」
            </p>

            <h2>為什麼這些「次要證件」反而更危險？</h2>
            <p>
              身分證影本大家都知道要小心，但下列這些證件卻常常被「順手就傳出去」：
            </p>
            <p>
              <strong>存摺封面：</strong>包含戶名、銀行、分行、帳號，是匯款詐騙、人頭帳戶申辦的關鍵資訊。
            </p>
            <p>
              <strong>健保卡：</strong>正面有身分證字號、出生年月日，背面有照片，幾乎等於半張身分證。
            </p>
            <p>
              <strong>駕照：</strong>同樣含身分證字號、出生日期、住址、照片，且效期較長不易發現被冒用。
            </p>
            <p>
              這些證件因為使用頻率高、流通範圍廣（銀行、汽車保養廠、租車公司、學校、補習班、健身房……），一旦外洩很難追蹤源頭。加浮水印是最簡單也最有效的事前防護。
            </p>

            <h2>6 種常見證件的浮水印範本</h2>
            <p>
              不同證件用途不同，浮水印寫法也略有差異。以下範本可以直接套用，依實際情境調整對象和日期即可：
            </p>

            <p>
              <strong>1. 存摺封面（薪轉、退費、匯款驗證）：</strong>
              <br />
              「僅供 OO 公司薪資轉帳帳戶登錄使用 2026/05/27」
              <br />
              「僅供 OO 商家退費匯款驗證使用 2026/05/27」
            </p>

            <p>
              <strong>2. 健保卡（醫療、學校報到、保險申辦）：</strong>
              <br />
              「僅供 OO 醫院初診登錄使用 2026/05/27」
              <br />
              「僅供 OO 保險公司理賠申請使用 2026/05/27」
            </p>

            <p>
              <strong>3. 駕照（租車、汽機車保養、駕駛登錄）：</strong>
              <br />
              「僅供 OO 租車公司 2026/05/27-05/30 租車登錄使用」
              <br />
              「僅供 OO 公司駕駛人資料登錄使用 2026/05/27」
            </p>

            <p>
              <strong>4. 行照（保險、過戶、車輛維修）：</strong>
              <br />
              「僅供 OO 產險公司強制險投保使用 2026/05/27」
              <br />
              「僅供 OO 監理站車輛過戶申請使用 2026/05/27」
            </p>

            <p>
              <strong>5. 學生證（學校報名、學生優惠、補習班登錄）：</strong>
              <br />
              「僅供 OO 補習班 2026 暑期班報名使用 2026/05/27」
              <br />
              「僅供 OO 影城學生票購票驗證使用 2026/05/27」
            </p>

            <p>
              <strong>6. 在職證明（貸款、簽證、租屋）：</strong>
              <br />
              「僅供 OO 銀行信用貸款申請使用 2026/05/27」
              <br />
              「僅供 OO 房屋仲介租屋審核使用 2026/05/27」
            </p>

            <p>
              寫法的核心三要素：<strong>用途 + 對象 + 日期</strong>。寫得越具體，被挪作他用的可能性就越低。
            </p>

            <h2>真實詐騙手法：你以為的小證件，是他們的金礦</h2>
            <p>
              <strong>手法一：存摺影本變人頭帳戶</strong>
              <br />
              詐騙集團常以「公司需要驗證匯款帳戶」為由索取存摺封面，搭配偽造的身分證影本，可以申辦網路銀行的補卡服務，進而盜領帳戶資金，或將你的帳戶轉為詐騙人頭帳戶。
            </p>
            <p>
              <strong>手法二：健保卡影本申辦電信門號</strong>
              <br />
              健保卡＋身分證字號就足以在部分電信通路辦理門號或預付卡，這些門號接著就用於詐騙、賭博、洗錢，警方一查全指向你。
            </p>
            <p>
              <strong>手法三：駕照／行照影本冒名簽約</strong>
              <br />
              駕照含住址、身分證字號，行照含車籍資料，兩者組合可以用於偽造汽車保險、強制險詐保案件，或冒名申辦汽車貸款。
            </p>
            <p>
              <strong>手法四：學生證／在職證明用於釣魚詐騙</strong>
              <br />
              詐騙集團蒐集學生證或在職證明後，會偽裝成「校方公告」「公司人事通知」寄送釣魚信，誘騙你或你的家人點擊惡意連結。
            </p>

            <h2>萬能浮水印公式：一句話保護所有證件</h2>
            <p>
              如果你嫌記範本太麻煩，記住這個萬能公式就好：
            </p>
            <p>
              <strong>「僅供【對方名稱】【具體用途】使用 YYYY/MM/DD」</strong>
            </p>
            <p>
              不論是哪一種證件，套用這個公式都能達到 8 成以上的保護效果。重點是：
            </p>
            <p>
              <strong>1. 一定要寫日期</strong>——讓對方知道這張影本有「使用期限」的暗示。
              <br />
              <strong>2. 一定要寫對象</strong>——避免被轉手到其他單位繼續使用。
              <br />
              <strong>3. 一定要寫用途</strong>——明確限定使用情境，挪作他用就是違法。
            </p>

            <h2>用 ImageMarker 一次幫所有證件加浮水印</h2>
            <p>
              如果你需要同時處理多種證件影本，
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                ImageMarker
              </a>{" "}
              是目前最方便的工具。三大優點：
            </p>
            <p>
              <strong>1. 完全在瀏覽器處理，不上傳伺服器：</strong>
              你的證件影本不會離開你的裝置，比任何 LINE 機器人或 APP 都安全。
            </p>
            <p>
              <strong>2. 支援多種範本切換：</strong>
              一個介面就能切換存摺、健保卡、駕照等不同情境，不用每次都重新輸入文字。
            </p>
            <p>
              <strong>3. 可調整透明度、位置、字體：</strong>
              針對不同證件的版面，可以即時預覽調整到最佳效果，既不影響資料辨識也能有效防護。
            </p>
            <p>
              使用步驟：打開{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>
              → 上傳證件影本 → 套用範本或自訂浮水印文字 → 預覽下載。整個過程不到一分鐘。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：銀行說存摺影本不能有任何標記，否則無法受理？</strong>
              <br />
              A：正規銀行受理「薪轉帳戶登錄」「退費驗證」等用途，加註用途的浮水印完全合理。如果是首次開戶或網銀申辦，銀行確實需要乾淨影本，但這類情境通常會臨櫃辦理，不會要求你「傳影本」。
            </p>
            <p>
              <strong>Q：健保卡背面有照片，浮水印會不會蓋住影響辨識？</strong>
              <br />
              A：浮水印透明度設定在 30-40% 即可兼顧辨識度與防護效果。若對方堅持要「無浮水印照片」，建議改用其他證件，例如身分證背面也有照片。
            </p>
            <p>
              <strong>Q：駕照效期很長，浮水印日期會不會反而讓對方覺得「過期」？</strong>
              <br />
              A：浮水印的日期代表「這次提供影本的日期」，不是駕照效期。可以在範本中明確寫「2026/05/27 租車登錄使用」，對方一看就懂這是使用日期。
            </p>
            <p>
              <strong>Q：在職證明加浮水印，公司主管會不會覺得我太麻煩？</strong>
              <br />
              A：在職證明通常是你向第三方（銀行、租屋仲介、簽證機構）提供，加浮水印是給對方看的，不是給公司看的。公司開立的原始文件不需要加浮水印，是你拿到後再加。
            </p>
            <p>
              <strong>Q：證件影本已經傳出去了才想到要加浮水印，還來得及嗎？</strong>
              <br />
              A：來不及了。建議立即聯繫對方刪除原檔，並補傳一份加浮水印的版本要求對方以新版為準。另外可以到聯徵中心申請「註記服務」，避免冒名申辦貸款或信用卡。
            </p>

            <h2>結語：浮水印不是麻煩，是日常習慣</h2>
            <p>
              把加浮水印當成像出門前檢查鑰匙、錢包一樣的日常習慣，就不會覺得麻煩。任何要傳出去的證件影本，先過一次 ImageMarker，再決定要不要傳。這個小動作，可能就是你和詐騙集團之間最重要的一道防線。
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
        <p className="mt-8 text-center text-sm text-gray-400"><a href="https://ko-fi.com/justinlee2061" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">☕ 如果這篇文章幫到你，請我喝杯咖啡</a></p>
        </article>

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
                  閱讀全文 →
                </span>
              </article>
            </Link>
            <Link href="/blog/passport-watermark-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  護照影本也要加浮水印！出國前必看的護照安全指南
                </h3>
                <p className="text-sm text-muted-foreground">
                  出國旅遊交護照影本給旅行社前，一定要先加浮水印！本篇教你護照浮水印怎麼寫、放哪個位置最安全。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文 →
                </span>
              </article>
            </Link>
            <Link href="/blog/watermark-templates-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）
                </h3>
                <p className="text-sm text-muted-foreground">
                  租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本讓你直接套用。
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
