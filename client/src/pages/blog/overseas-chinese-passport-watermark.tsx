import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { InlineCTA } from "@/components/InlineCTA";
import { PopularTools } from "@/components/PopularTools";
import { SiteFooter } from "@/components/SiteFooter";
import {
  setPageSeo,
  articleSchema,
  faqSchema,
  blogBreadcrumb,
} from "@/lib/seo";

const SLUG = "overseas-chinese-passport-watermark";

const URL = "https://imagemarker.app/blog/overseas-chinese-passport-watermark";

export default function OverseasChinesePassportWatermark() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: "海外華人必學：護照影本浮水印保護完整指南 | ImageMarker",
      description:
        "人在海外，護照就是你唯一的身分證明。租屋、開戶、辦門號、註冊學校都要交護照副本。這篇教你用雙語浮水印限定用途，降低跨境被冒用的風險。",
      canonical: URL,
      locale: "zh_TW",
      jsonLd: [
        articleSchema({
          headline: "海外華人必學：護照影本浮水印保護指南",
          description:
            "人在海外，護照就是你唯一的身分證明。租屋、開戶、辦門號、註冊學校都要交護照副本。這篇教你用雙語浮水印限定用途，降低跨境被冒用的風險。",
          url: URL,
          datePublished: "2026-07-15",
          dateModified: "2026-07-15",
        }),
        blogBreadcrumb("海外華人必學：護照影本浮水印保護指南", URL),
        faqSchema([
          {
            q: "浮水印要寫中文還是英文？",
            a: "建議以對方看得懂的語言為主，通常是英文或當地語言。前線的櫃檯人員、房仲、客服多半看不懂中文，若浮水印只有中文，他們無法判斷內容，反而可能要求你重傳一份沒有標記的副本。最穩妥的寫法是英文（或當地語言）為主、中文為輔的雙語格式。",
          },
          {
            q: "對方拒收有浮水印的護照副本怎麼辦？",
            a: "先確認浮水印是否蓋住了關鍵欄位，或是否因為看不懂語言而被誤會。調整透明度、改用雙語文字後多半就能通過。如果對方在你已經配合調整、資料完全可辨識的情況下，仍堅持要一份完全沒有標記的副本，這本身就值得警覺，你可以要求對方說明理由與保存期限。",
          },
          {
            q: "可以遮住護照號碼嗎？",
            a: "要看用途。銀行開戶、簽證申請、學校註冊通常必須核對護照號碼，遮住會直接被退件。但如果對方只是要確認姓名與國籍（例如某些門市登記），你可以先詢問是否接受遮蔽部分欄位。原則是：只提供對方真正需要的欄位，非必要的欄位再考慮遮蓋。",
          },
          {
            q: "人在國外網路不穩也能用嗎？",
            a: "可以。ImageMarker 全部在瀏覽器本機執行，頁面載入後即使斷線也能繼續加浮水印與下載。它同時支援 PWA，把網頁加到手機或電腦桌面後就能像一般 App 一樣開啟，適合網路不穩定或還在等當地門號開通的情況。",
          },
          {
            q: "檔案真的不會上傳嗎？",
            a: "不會。所有處理都在你自己的裝置上完成，圖片從頭到尾沒有離開瀏覽器，也沒有伺服器保存副本。你可以在完全斷網的狀態下操作來驗證這一點。對海外使用者來說這一點特別重要——你不會希望自己的護照檔案被送到一個不知道位在哪個國家、受哪國法律管轄的伺服器。",
          },
        ]),
      ],
    });
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            首頁
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">
            部落格
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time dateTime="2026-07-15" className="text-sm text-muted-foreground">
              2026-07-15
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              海外華人必學：護照影本浮水印保護指南
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              在原本的家鄉，護照大概一年只會拿出來幾次。但只要人搬到了海外，情況就完全反過來——護照變成你唯一被普遍承認的身分證明。租房子要、銀行開戶要、辦手機門號要、學校註冊要、找工作報到要、報稅要、簽證代辦也要。
            </p>
            <p>
              換句話說，你交出護照副本（台灣多稱影本、香港多稱影印本）的次數，比在國內多得多；而經手這份副本的陌生人——房東、仲介、櫃檯行員、門市店員、代辦公司的兼職人員——也多得多。每多一次，就多一個外流的可能。
            </p>

            <h2>護照副本外流的風險比想像中大</h2>
            <p>
              護照上的資訊不是零散的：<strong>護照號碼 + 英文姓名 + 出生日期 + 國籍</strong>，這四項湊在一起，就是一組足以代表你的完整身分。這比單一號碼外洩嚴重得多，因為它可以直接被拿去使用。
            </p>
            <p>
              常見的濫用方式包括：冒名申請簽證或線上服務、拿去通過某些平台的 KYC（身分驗證）審核、或是把你的真實資料和其他人的資料拼湊成「合成身分」去申辦帳戶。這些行為往往在很久以後才會被你察覺。
            </p>
            <p>
              而海外身分最痛的一點在於<strong>跨境追訴困難</strong>。你的護照由 A 國核發、你人在 B 國、副本外流後被拿去 C 國使用——三個國家的管轄權不同，報案要用你不熟悉的語言、面對你不熟悉的程序，處理時間可能拖上很久。事前預防的性價比，遠高於事後補救。
            </p>

            <h2>海外最常被要求護照副本的 6 個場景</h2>
            <p>
              <strong>1. 租屋（房東／仲介）：</strong>
              <br />
              海外租屋幾乎一定要驗身分。要注意的是，副本常常會被留在仲介的檔案櫃或個人電腦裡，租約結束後也未必會被銷毀。
            </p>
            <p>
              <strong>2. 銀行開戶：</strong>
              <br />
              分行通常會影印你的護照存檔。這是合規要求，很難拒絕，但你可以要求對方說明保存方式，並在自己交出的檔案上先標好用途。
            </p>
            <p>
              <strong>3. 電信門號：</strong>
              <br />
              風險常被低估。門市登記多半由兼職店員操作，副本可能只是隨手掃描進共用電腦，甚至用店員自己的手機拍照。
            </p>
            <p>
              <strong>4. 學校註冊：</strong>
              <br />
              留學生的護照檔案常在國際處、系辦、宿舍、保險窗口之間輾轉流傳，經手單位比你想像的多。
            </p>
            <p>
              <strong>5. 簽證／移民代辦：</strong>
              <br />
              代辦是接觸最多份護照的行業之一。務必確認對方是有登記的正式業者，並在副本上寫明「僅供本次某某簽證申請使用」。
            </p>
            <p>
              <strong>6. 換匯或加密貨幣交易所 KYC：</strong>
              <br />
              這類平台的伺服器與公司登記地往往不在你居住的國家，一旦資料庫外洩，你幾乎沒有實際的求償途徑。上傳前務必加上限定用途的浮水印。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>浮水印怎麼寫才有用</h2>
            <p>
              浮水印沒有法律強制力，它的價值在於<strong>阻嚇</strong>與<strong>限定用途</strong>——讓這份副本一眼就看得出「只能用在這一件事」，大幅降低它被轉手冒用的價值。要達到這個效果，三個要素缺一不可：<strong>用途 + 對象 + 日期</strong>。
            </p>
            <p>
              海外情境還要多一個關鍵重點：<strong>浮水印要用當地人看得懂的語言寫</strong>。很多人習慣直接寫中文，但審核你文件的是當地的行員、房仲或校務人員，他們看到一堆看不懂的方塊字，無法判斷那是不是塗改或損毀，反而更可能要求你重傳一份「乾淨」的副本——結果保護沒做到，還多繞一圈。
            </p>
            <p>
              建議以英文或當地語言為主，需要時再附上中文。幾個可以直接套用的範例：
            </p>
            <p>
              <strong>銀行開戶：</strong>
              <br />
              「For XYZ Bank account opening only — 2026-07-15」
            </p>
            <p>
              <strong>租屋（雙語）：</strong>
              <br />
              「For ABC Realty tenancy application only — 2026-07-15／僅供 ABC 房仲租屋申請使用」
            </p>
            <p>
              <strong>學校註冊：</strong>
              <br />
              「For University of XX enrolment only — 2026-07-15」
            </p>
            <p>
              日期一定要寫到年月日，這樣副本就自帶「時效感」，不容易被當成可以長期重複使用的檔案。
            </p>

            <h2>平鋪覆蓋 vs 角落標記</h2>
            <p>
              很多人怕蓋住資料，習慣把浮水印縮小放在角落——這幾乎等於沒有做。角落是最容易被裁掉的位置，對方只要簡單裁切一下，就得到一份看起來全新的「乾淨」副本。
            </p>
            <p>
              正確做法是<strong>斜向平鋪、覆蓋整張圖片</strong>。這樣不論對方怎麼裁切、局部擷取，畫面上都一定會留下標記。透明度建議設在 <strong>30–50%</strong>：文字清楚可讀，但護照號碼、姓名、效期這些關鍵欄位仍然辨識得出來，對方不會有正當理由退件。
            </p>

            <h2>3 步驟完成</h2>
            <h3>步驟一：上傳護照基本資料頁</h3>
            <p>
              打開{" "}
              <a
                href="https://imagemarker.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                imagemarker.app
              </a>
              ，把拍好或掃描好的護照基本資料頁拖進上傳區。拍攝時注意四角完整、光線充足、避免反光。
            </p>
            <p>
              這一步最重要的是：<strong>你的檔案留在你的裝置上</strong>。ImageMarker 是 100% 瀏覽器本機處理，圖片不會被送到任何伺服器。這件事對海外使用者的意義特別大——你不會想把自己的護照傳到一個不知道位在哪個國家、受哪國法律管轄、出事後你連怎麼申訴都不知道的伺服器上。你也可以直接把網路關掉再操作一次，功能完全不受影響。
            </p>
            <h3>步驟二：輸入雙語文字、選平鋪、調透明度</h3>
            <p>
              填入「用途 + 對象 + 日期」的英文（或雙語）文字，選擇覆蓋整張圖片的平鋪模式，透明度調到 30–50%，一邊看即時預覽一邊微調到關鍵欄位仍然清楚為止。
            </p>
            <h3>步驟三：下載後傳出</h3>
            <p>
              確認無誤後套用並下載。傳給對方時建議轉成 PDF，比較不容易被隨手編輯。想了解更多寫法，也可以參考{" "}
              <Link href="/blog/passport-watermark-guide">
                護照影本浮水印的基本指南
              </Link>
              。
            </p>

            <h2>除了浮水印，海外還要注意這幾件事</h2>
            <p>
              <strong>只傳需要的那一頁。</strong>
              對方要基本資料頁，就只給基本資料頁，不要為了省事整本掃描過去。簽證頁、出入境章記錄了你完整的行蹤，沒有必要一併交出。
            </p>
            <p>
              <strong>遮蓋非必要欄位。</strong>
              如果某個欄位對方用不到，就先用色塊或馬賽克蓋掉再傳。想知道證件外流實際會造成什麼後果，可以看{" "}
              <Link href="/blog/id-copy-leaked-consequences">
                證件影本外流的後果
              </Link>
              這篇。
            </p>
            <p>
              <strong>避免用飯店或公共影印機。</strong>
              多數事務機都有內建硬碟會暫存掃描影像，而你完全無法確認那台機器由誰維護、資料何時被清除。剛落地時尤其容易在飯店隨手印一份——這是最該避開的習慣。
            </p>
            <p>
              <strong>優先用有期限的傳送方式。</strong>
              能用會過期的連結，就不要用永久保存的聊天室附件；傳完之後主動提醒對方用畢刪除。
            </p>
            <p>
              <strong>清除照片的 EXIF 位置資訊。</strong>
              用手機拍護照時，照片可能默默記錄了你拍攝當下的 GPS 座標——也就是你家或宿舍的位置。把這張照片直接傳給素未謀面的房東或代辦，等於順便附上住址。傳出前先清掉。
            </p>

            <InlineCTA tool="exif-clean" position="mid_article" location={SLUG} />

            <p>
              延伸閱讀：<Link href="/blog/what-is-exif-data">什麼是 EXIF 資料</Link>，或直接用{" "}
              <Link href="/exif-clean">EXIF 清除器</Link>處理。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：浮水印要寫中文還是英文？</strong>
              <br />
              A：建議以對方看得懂的語言為主，通常是英文或當地語言。前線的櫃檯人員、房仲、客服多半看不懂中文，若浮水印只有中文，他們無法判斷內容，反而可能要求你重傳一份沒有標記的副本。最穩妥的寫法是英文（或當地語言）為主、中文為輔的雙語格式。
            </p>
            <p>
              <strong>Q：對方拒收有浮水印的護照副本怎麼辦？</strong>
              <br />
              A：先確認浮水印是否蓋住了關鍵欄位，或是否因為看不懂語言而被誤會。調整透明度、改用雙語文字後多半就能通過。如果對方在你已經配合調整、資料完全可辨識的情況下，仍堅持要一份完全沒有標記的副本，這本身就值得警覺，你可以要求對方說明理由與保存期限。
            </p>
            <p>
              <strong>Q：可以遮住護照號碼嗎？</strong>
              <br />
              A：要看用途。銀行開戶、簽證申請、學校註冊通常必須核對護照號碼，遮住會直接被退件。但如果對方只是要確認姓名與國籍（例如某些門市登記），你可以先詢問是否接受遮蔽部分欄位。原則是：只提供對方真正需要的欄位，非必要的欄位再考慮遮蓋。
            </p>
            <p>
              <strong>Q：人在國外網路不穩也能用嗎？</strong>
              <br />
              A：可以。ImageMarker 全部在瀏覽器本機執行，頁面載入後即使斷線也能繼續加浮水印與下載。它同時支援 PWA，把網頁加到手機或電腦桌面後就能像一般 App 一樣開啟，適合網路不穩定或還在等當地門號開通的情況。
            </p>
            <p>
              <strong>Q：檔案真的不會上傳嗎？</strong>
              <br />
              A：不會。所有處理都在你自己的裝置上完成，圖片從頭到尾沒有離開瀏覽器，也沒有伺服器保存副本。你可以在完全斷網的狀態下操作來驗證這一點。對海外使用者來說這一點特別重要——你不會希望自己的護照檔案被送到一個不知道位在哪個國家、受哪國法律管轄的伺服器。
            </p>

            <h2>在海外，自己就是自己的第一道防線</h2>
            <p>
              人在異鄉，出了事沒有熟悉的語言、沒有熟悉的程序可以依靠。與其事後奔波，不如在交出副本前多花一分鐘：寫清楚用途、寫上對方名稱與日期、用當地看得懂的語言、平鋪覆蓋整張。這個小動作不會讓你變得刀槍不入，但它會讓你的護照副本，在流出去之後變得沒什麼利用價值。
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
            <p className="mt-4 text-sm text-gray-500">
              <a
                href="https://ko-fi.com/justinlee2061"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                ☕ 如果這篇文章幫到你，請我喝杯咖啡
              </a>
            </p>
          </div>
        </article>

        {/* 熱門工具快速入口 */}
        <PopularTools location={SLUG} className="mt-12" />

        {/* 相關文章 */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">相關文章</h2>
          <div className="space-y-4">
            <Link href="/blog/passport-watermark-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  護照影本也要加浮水印！出國前必看的護照安全指南
                </h3>
                <p className="text-sm text-muted-foreground">
                  交護照影本給旅行社、簽證代辦前，浮水印怎麼寫、放哪個位置最安全，附 5 種常見範本。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/id-copy-leaked-consequences">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  證件影本外流會怎樣？被冒用的真實後果與自保方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  證件副本一旦外流可能被拿去做什麼？了解實際風險，才知道浮水印為什麼值得多花一分鐘。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/what-is-exif-data">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  什麼是 EXIF 資料？照片裡藏了哪些你不知道的個人資料
                </h3>
                <p className="text-sm text-muted-foreground">
                  手機拍的每張照片都可能帶著 GPS 座標與時間戳記，傳出去前你該先知道這件事。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
