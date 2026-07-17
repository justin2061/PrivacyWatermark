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

const SLUG = "hk-rent-id-copy-watermark";

const URL = "https://imagemarker.app/blog/hk-rent-id-copy-watermark";

export default function HkRentIdCopyWatermark() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title: "香港租屋交身份證副本前，一定要加浮水印保護 | ImageMarker",
      description:
        "業主或地產代理開口要香港身份證副本？教你三步驟加浮水印，寫明用途、對象同日期，降低副本被冒用嘅風險。全程喺瀏覽器本機處理，唔會上載。",
      canonical: URL,
      locale: "zh_HK",
      jsonLd: [
        articleSchema({
          headline: "香港租屋交身份證副本前，一定要加浮水印",
          description:
            "業主或地產代理開口要香港身份證副本？教你三步驟加浮水印，寫明用途、對象同日期，降低副本被冒用嘅風險。全程喺瀏覽器本機處理，唔會上載。",
          url: URL,
          datePublished: "2026-07-15",
          dateModified: "2026-07-15",
        }),
        blogBreadcrumb("香港租屋交身份證副本前，一定要加浮水印", URL),
        faqSchema([
          {
            q: "業主堅持要一份「乾淨」、冇浮水印嘅副本，點算？",
            a: "可以先問清楚：影印存檔嘅目的係咩、會保存幾耐、邊個會睇到。根據《個人資料（私隱）條例》，收集個人資料必須有明確目的，而且唔可以超乎所需。如果對方講唔出理由，又堅持要一份完全冇標記嘅身份證副本，你有理由提高警覺，並可以提出出示正本核對代替影印。",
          },
          {
            q: "加咗浮水印，份副本仲有冇效？租約會唔會出問題？",
            a: "浮水印只係喺副本上加半透明文字，唔會遮蓋或修改證件內容，正本亦完全冇受影響。租約嘅效力來自雙方簽署嘅合約條款，唔係嗰份影印本。要留意嘅係，浮水印本身冇特定法律效力，佢嘅作用係阻嚇、標明副本來源同用途，令副本被攞去冒名使用時價值大減。",
          },
          {
            q: "可唔可以遮住部分身份證號碼？",
            a: "如果對方只係要核對姓名同身份，遮蓋號碼中間幾位（例如 A12***(7)）通常已經足夠。但如果係簽租約、需要喺文件上填寫完整號碼，就要保留。原則係：畀最少嘅資料去達成嗰個目的，其餘一律遮住。你可以用馬賽克工具喺同一個網站遮蓋唔需要嘅欄位。",
          },
          {
            q: "用手機做到嗎？",
            a: "做到。ImageMarker 喺手機瀏覽器（iPhone Safari、Android Chrome）都可以用，唔使裝任何 App。用手機影完身份證，直接喺瀏覽器加浮水印再傳畀業主或地產代理就得，全程幾十秒。",
          },
          {
            q: "我份身份證副本會唔會被上載到伺服器？",
            a: "唔會。ImageMarker 係 100% 瀏覽器本機處理，你揀嘅相片由頭到尾只存喺你部機入面，唔會傳去任何伺服器。你甚至可以熄咗網絡再用，功能一樣正常。",
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
              香港租屋交身份證副本前，一定要加浮水印
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              睇咗成個月樓，終於睇到心水單位：座向啱、租金啱、上班又方便。傾好價錢，地產代理拎住手機講一句：「唔該影張身份證畀我，出租約要用。」
            </p>
            <p>
              就係嗰一秒，好多人會頓一頓。唔畀，好似驚做唔成單嘢；畀咗，又唔知張身份證副本之後會去到邊、留喺邊部電腦、傳去邊個 WhatsApp 群組。其實你唔使二揀一——喺交出去之前加個浮水印，就係一個一分鐘做得完、但差別好大嘅動作。
            </p>

            <h2>點解香港租樓特別要小心</h2>
            <p>
              香港租樓嘅流程，通常唔止你同業主兩個人。一份身份證副本，可能經地產代理落單、傳去業主核對、再交去律師樓或者管理處登記出入卡。一份文件，幾個人手上都有一份，而你係完全冇辦法知道每一份最後係點樣保存或者刪除。
            </p>
            <p>
              香港身份證嘅資料密度亦好高：中英文全名、出生日期、簽發日期，加上一個獨一無二嘅身份證號碼（例如 A123456(7) 呢個格式）。一份清晰、冇任何標記嘅副本，配埋你即將入住嘅樓宇地址，對騙徒嚟講已經係一套幾完整嘅身份組合，可以攞去試冒名開戶、申請貸款、甚至開電話台。
            </p>
            <p>
              法例上，香港嘅《個人資料（私隱）條例》（PDPO）有明確原則：收集個人資料必須有合法而且與目的直接相關嘅需要，收集嘅範圍亦唔可以超乎所需。個人資料私隱專員公署（PCPD）亦曾公開提醒業主同地產代理，唔好過度收集身份證副本——核對身份係一回事，隨手影一份存檔又係另一回事。
            </p>

            <h2>業主可以要求身份證副本嗎？</h2>
            <p>
              呢度要分開兩件事講，因為好多爭拗都係卡喺呢個位。
            </p>
            <p>
              <strong>核對身份</strong>：喺簽租約之前確認你係邊個、係咪本人，本身係一個合理而且正當嘅目的。業主要承擔一個單位幾年嘅風險，想知道租客身份，唔算過分。
            </p>
            <p>
              <strong>影印存檔</strong>：呢個就係另一個層次。「出示正本畀你核對」同「畀你影一份放喺檔案入面」係兩件唔同嘅事，後者代表你嘅資料會長期留喺一個你控制唔到嘅地方。
            </p>
            <p>
              所以實務上你可以咁樣傾：先提出<strong>出示正本現場核對</strong>，唔使影印；如果對方基於簽租約、按金收據或者差餉登記等理由堅持要副本，就改為提供一份<strong>加咗浮水印、並遮蓋咗非必要欄位</strong>嘅版本。呢個唔係「唔合作」，而係按住條例嘅「唔可以超乎所需」原則去做——你畀嘅係啱啱好夠用嘅資料。
            </p>

            <InlineCTA tool="watermark" position="mid_article" location={SLUG} />

            <h2>浮水印應該寫咩？</h2>
            <p>
              好多人知道要加浮水印，但打開工具嗰陣先發現唔知寫乜。記住三樣嘢就得：<strong>用途 + 對象 + 日期</strong>。三個都要有，缺一都會令浮水印變得冇乜阻嚇力。
            </p>
            <p>
              <strong>交畀地產代理：</strong>
              <br />
              「此副本僅供 XXX 地產代理租約用途 2026-07-15」
            </p>
            <p>
              <strong>交畀業主核對：</strong>
              <br />
              「僅供業主核對身份 2026-07-15」
            </p>
            <p>
              <strong>交畀管理處登記：</strong>
              <br />
              「僅供 XXX 大廈管理處出入登記用途 2026-07-15」
            </p>
            <p>
              寫上日期特別重要：一份寫住兩年前日期嘅副本，一睇就知係舊嘢，被翻用嘅時候好難扮成新提交嘅文件。而寫明對象，就令同一份副本冇辦法喺另一單交易入面重用。
            </p>

            <h2>3 步驟加浮水印</h2>

            <h3>步驟一：打開工具，揀相</h3>
            <p>
              打開{" "}
              <Link href="/">ImageMarker</Link>
              ，將身份證嘅相或者掃描檔拉入去（手機就直接㩒「選擇檔案」影相或者揀相簿）。支援 JPG 同 PNG。
            </p>
            <p>
              呢一步最緊要嘅係：你張相<strong>唔會上載</strong>。全部處理都喺你自己部機嘅瀏覽器入面完成，熄咗個網頁就乜都唔會留低。你甚至可以熄埋 Wi-Fi 同數據再試——一樣做得到。
            </p>

            <h3>步驟二：打字、揀重複／平鋪、調透明度</h3>
            <p>
              輸入你頭先諗好嘅文字，然後<strong>揀「重複／平鋪」模式</strong>，令浮水印鋪滿成張圖，而唔係淨係擺一個喺角落——因為擺喺角落嘅浮水印，隨時被 crop 走。透明度建議調到 <strong>30–50%</strong>：睇得清楚浮水印，同時唔會遮到證件內容影響核對。
            </p>

            <h3>步驟三：下載</h3>
            <p>
              預覽冇問題就㩒下載，然後傳出去。由揀相到下載，成個過程唔使一分鐘。
            </p>

            <InlineCTA tool="mosaic" position="mid_article" location={SLUG} />

            <h2>仲要做埋呢幾樣</h2>
            <p>
              浮水印係第一層，但唔應該係唯一一層。以下四樣配埋一齊做，保護力先夠：
            </p>
            <p>
              <strong>1. 遮蓋部分號碼。</strong>如果對方只係要核對姓名同身份，用馬賽克工具遮住身份證號碼中間幾位（例如 A12***(7)），保留頭尾方便核對就夠。要填完整號碼先至保留。
            </p>
            <p>
              <strong>2. 只畀需要嘅嗰一頁。</strong>唔好順手將成疊文件、入息證明、銀行月結單一次過傳晒過去。對方要咩，就畀咩。
            </p>
            <p>
              <strong>3. 用有期限嘅方式傳送。</strong>盡量避免經公開群組或者電郵附件散播。用一對一嘅通訊、或者設有到期日嘅連結，減少副本喺唔同裝置之間無限複製。
            </p>
            <p>
              <strong>4. 講明用完刪除。</strong>傳送嗰陣加一句「呢份副本只供今次租約用途，完成後請刪除」。呢句嘢除咗係禮貌，亦係喺表明你收集資料嘅目的界線——日後有爭拗，你至少留低咗紀錄。
            </p>
            <p>
              想知道一份身份證副本流出街之後實際會發生咩事，可以睇埋{" "}
              <Link href="/blog/id-copy-leaked-consequences">
                身分證影本外洩會有什麼後果
              </Link>
              ；如果你依家正正就係卡喺「業主開口要證件」呢一步唔知點應對，{" "}
              <Link href="/blog/landlord-asks-for-id">
                房東要求身分證影本怎麼辦
              </Link>{" "}
              有更詳細嘅拒絕同折衷講法。
            </p>

            <h2>常見問題</h2>
            <p>
              <strong>Q：業主堅持要一份「乾淨」、冇浮水印嘅副本，點算？</strong>
              <br />
              A：可以先問清楚：影印存檔嘅目的係咩、會保存幾耐、邊個會睇到。根據《個人資料（私隱）條例》，收集個人資料必須有明確目的，而且唔可以超乎所需。如果對方講唔出理由，又堅持要一份完全冇標記嘅身份證副本，你有理由提高警覺，並可以提出出示正本核對代替影印。
            </p>
            <p>
              <strong>Q：加咗浮水印，份副本仲有冇效？租約會唔會出問題？</strong>
              <br />
              A：浮水印只係喺副本上加半透明文字，唔會遮蓋或修改證件內容，正本亦完全冇受影響。租約嘅效力來自雙方簽署嘅合約條款，唔係嗰份影印本。要留意嘅係，浮水印本身冇特定法律效力，佢嘅作用係阻嚇、標明副本來源同用途，令副本被攞去冒名使用時價值大減。
            </p>
            <p>
              <strong>Q：可唔可以遮住部分身份證號碼？</strong>
              <br />
              A：如果對方只係要核對姓名同身份，遮蓋號碼中間幾位（例如 A12***(7)）通常已經足夠。但如果係簽租約、需要喺文件上填寫完整號碼，就要保留。原則係：畀最少嘅資料去達成嗰個目的，其餘一律遮住。你可以用馬賽克工具喺同一個網站遮蓋唔需要嘅欄位。
            </p>
            <p>
              <strong>Q：用手機做到嗎？</strong>
              <br />
              A：做到。ImageMarker 喺手機瀏覽器（iPhone Safari、Android
              Chrome）都可以用，唔使裝任何 App。用手機影完身份證，直接喺瀏覽器加浮水印再傳畀業主或地產代理就得，全程幾十秒。
            </p>
            <p>
              <strong>Q：我份身份證副本會唔會被上載到伺服器？</strong>
              <br />
              A：唔會。ImageMarker 係 100%
              瀏覽器本機處理，你揀嘅相片由頭到尾只存喺你部機入面，唔會傳去任何伺服器。你甚至可以熄咗網絡再用，功能一樣正常。
            </p>

            <h2>一分鐘，換一份安心</h2>
            <p>
              租樓已經夠攰，冇人想因為一張身份證副本，喺搬入去之後仲要擔驚受怕。加浮水印唔會令你租唔到樓，亦唔會得罪任何一個正正經經做嘢嘅業主或地產代理——真正介意你加浮水印嘅人，反而先係你要留意嘅嗰個。
            </p>
            <p>
              下次要交身份證副本之前，先過嚟加個浮水印：{" "}
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
            <Link href="/blog/landlord-asks-for-id">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  房東要求身分證影本怎麼辦？合理範圍與自保方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  房東到底可不可以要求身分證影本？教你判斷合理範圍，以及不想給時的折衷說法。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/id-copy-leaked-consequences">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分證影本外洩會有什麼後果？真實案例與自保方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  證件影本一旦流出，可能被拿去做什麼？了解實際風險，才知道為什麼要加浮水印。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/rent-id-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  租屋交身分證影本前必做！3 步驟加浮水印保護個資
                </h3>
                <p className="text-sm text-muted-foreground">
                  租屋前必看！三步驟幫身分證影本加上浮水印，浮水印該寫什麼一次說清楚。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  閱讀全文<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/blog/mobile-watermark-tutorial">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  手機怎麼幫身分證加浮水印？免安裝 App 的最快方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  不用下載 App，用手機瀏覽器 3 分鐘完成證件浮水印，iPhone 和 Android 都適用。
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
