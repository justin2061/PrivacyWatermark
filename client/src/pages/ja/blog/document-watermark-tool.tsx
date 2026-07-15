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

const SLUG = "document-watermark-tool";

const URL = "https://imagemarker.app/ja/blog/document-watermark-tool";

const DESCRIPTION =
  "書類やスキャン画像に透かしを入れて個人情報を守る方法。ツールの選び方の基準、アップロード不要のブラウザ完結ツールの使い方。";

export default function JaDocumentWatermarkTool() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "個人情報を守る書類の透かし入れツール｜無料・ブラウザ完結 | ImageMarker",
      description: DESCRIPTION,
      canonical: URL,
      locale: "ja_JP",
      jsonLd: [
        articleSchema({
          headline: "個人情報を守る！書類の透かし入れツールの選び方と使い方",
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-07-15",
          dateModified: "2026-07-15",
        }),
        blogBreadcrumb(
          "個人情報を守る！書類の透かし入れツールの選び方と使い方",
          URL,
          "ja"
        ),
        faqSchema([
          {
            q: "無料の透かしツールは安全ですか？",
            a: "無料かどうかより、ファイルがどこで処理されるかが重要です。サーバーにアップロードするタイプでは、保存期間や第三者への提供、運営元の所在国が分からないことも少なくありません。身分証や契約書のように取り返しのつかない書類なら、端末の中だけで処理が完結するブラウザ完結型を選んでください。",
          },
          {
            q: "ブラウザ完結型かどうかはどう見分けますか？",
            a: "いちばん確実なのは、ページを開いたあとに機内モードにして使ってみることです。オフラインでも透かしを入れて保存できれば、ファイルはサーバーに送られていません。あわせて、アップロードの進捗バーが出ないか、プライバシーポリシーに保存期間の記載があるかも確認するとよいでしょう。",
          },
          {
            q: "透かしはどのくらいの濃さがいいですか？",
            a: "不透明度30〜50%程度が目安です。透かしの文字がはっきり読めて、なおかつ下の氏名や番号も判読できる濃さにします。濃すぎると提出先が確認できず再提出になり、薄すぎると簡単に消されてしまいます。プレビューを見ながら調整してください。",
          },
          {
            q: "日本語が文字化けするのはなぜですか？",
            a: "日本語のフォントが読み込まれていないと、漢字やかなが「□（豆腐）」や記号として表示されることがあります。海外製のツールでよく起きる現象です。透かしを入れる前に、必ずプレビューで日本語が正しく表示されるか確認してください。",
          },
          {
            q: "PDFにも透かしを入れられますか？",
            a: "入れられます。PDFのまま提出する書類は、画像に変換せずPDF用の透かしツールを使うほうが画質も文字も劣化しません。ImageMarkerにはPDF透かしツールがあり、こちらもブラウザ内で処理されます。",
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
          <Link href="/ja/" className="hover:text-foreground transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link
            href="/ja/blog"
            className="hover:text-foreground transition-colors"
          >
            ブログ
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time
              dateTime="2026-07-15"
              className="text-sm text-muted-foreground"
            >
              2026年7月15日
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              個人情報を守る！書類の透かし入れツールの選び方と使い方
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              「書類 透かし 無料」で検索すると、オンラインツールが大量に出てきます。どれも似たような画面で、どれを選んでも同じように見えるかもしれません。
            </p>
            <p>
              ただし、そこに入れようとしているのが身分証のコピーや契約書なら、話は変わります。選び方を間違えると本末転倒です。個人情報を守るために透かし（ウォーターマーク）を入れたはずが、その過程で書類そのものを見知らぬサーバーに渡してしまうからです。
            </p>
            <p>
              この記事では、機能の多さではなく「安心して大事な書類を通せるか」という観点から、ツールの選び方を整理します。
            </p>

            <h2>最重要の判断基準：ファイルはどこで処理されるのか</h2>
            <p>
              透かしツールは、処理の場所によって大きく2種類に分かれます。
            </p>
            <p>
              ひとつは<strong>サーバー処理型</strong>です。書類をいったん運営元のサーバーにアップロードし、向こう側で透かしを合成して、できあがった画像をダウンロードさせます。もうひとつが<strong>ブラウザ完結型</strong>で、こちらは処理がすべて自分の端末の中で行われ、ファイルは一度も外に出ません。
            </p>
            <p>
              画面上の操作はほとんど同じなので、使っている本人には違いが見えません。しかし中身はまったく別物です。一般に、サーバー処理型のツールでは、アップロードされたファイルの<strong>保存期間</strong>、<strong>第三者への提供の有無</strong>、そして<strong>運営元がどの国の法域にあるか</strong>が利用者側から分からないことが少なくありません。「24時間で自動削除」と書かれていても、それを外から確かめる手段はありません。
            </p>
            <p>
              写真の加工なら、それでも許容できるかもしれません。とはいえ身分証や契約書は、一度流出したら取り消せない類の情報です。ここは信頼で判断するのではなく、そもそも送らないほうが確実です。
            </p>

            <h3>見分け方：機内モードで試す</h3>
            <p>
              どちらのタイプかを確かめる、いちばん手軽で確実な方法があります。
            </p>
            <ol>
              <li>ツールのページを普通に開きます。</li>
              <li>
                ページが表示されたら、<strong>機内モードをオンにする</strong>（またはWi-Fiを切る）。
              </li>
              <li>そのまま画像を読み込み、透かしを入れて保存してみます。</li>
            </ol>
            <p>
              オフラインのまま最後まで動けば、そのツールはブラウザ完結型です。ネットにつながっていないのですから、ファイルがサーバーに届きようがありません。逆に、通信が切れた瞬間にエラーになったり処理が止まったりするなら、サーバー処理型だと考えてよいでしょう。
            </p>
            <p>ほかにも、次の2点が判断材料になります。</p>
            <ul>
              <li>
                <strong>アップロードの進捗バーが出るか。</strong>
                ファイルを選んだあとに「アップロード中…」と進捗が伸びるなら、それは文字どおり送信しています。ブラウザ完結型なら、大きめの画像でもほぼ一瞬で表示されます。
              </li>
              <li>
                <strong>プライバシーポリシーに保存期間の記載があるか。</strong>
                そもそも預からないツールなら「サーバーに送信しない」と書けます。保存期間や削除の話が細かく書かれている時点で、預かることが前提です。
              </li>
            </ul>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
              lang="ja"
            />

            <h2>そのほかの選定基準（5つ）</h2>
            <p>
              処理場所を確認したうえで、次の5点も見ておくと失敗しません。どれも実際に使ってから「しまった」となりやすいポイントです。
            </p>
            <ul>
              <li>
                <strong>① 全面（タイル）配置に対応しているか。</strong>
                隅に小さく入れただけの透かしは、その部分をトリミングすれば消えてしまいます。書類全体に繰り返し並べられるかどうかは、透かしの効き目を左右します。
              </li>
              <li>
                <strong>② 不透明度を調整できるか。</strong>
                濃すぎると提出先が氏名や番号を読み取れず、再提出になります。薄すぎれば意味がありません。プレビューを見ながら濃さを詰められることが大切です。
              </li>
              <li>
                <strong>③ 日本語フォントが正しく表示されるか。</strong>
                海外製のツールでは、漢字やかなが「□」（いわゆる豆腐）や文字化けになることがあります。英数字だけで試すと気づけないので、必ず実際の日本語文面でプレビューしてください。
              </li>
              <li>
                <strong>④ 会員登録やメールアドレスを要求しないか。</strong>
                透かしを入れるだけの作業に、アカウントは本来必要ありません。登録を求められるなら、何のために個人情報を集めているのかを考える価値があります。
              </li>
              <li>
                <strong>⑤ 出力画像に提供元のロゴが強制的に入らないか。</strong>
                無料版だとサービス名のロゴが勝手に入る場合があります。提出用の書類に見知らぬロゴが乗っていると、相手を無用に混乱させます。
              </li>
            </ul>

            <h2>有料ツール・Word/Excel・PDFソフトはどうか</h2>
            <p>
              手元のソフトで済ませたい、という方もいるでしょう。実際、用途によっては十分です。
            </p>
            <p>
              WordやExcelにも「透かし」機能があります。ただしこれは文書そのものの背景に文字を敷く機能なので、自分で作った書類には向く一方、スキャンした身分証や撮影した画像に入れるには回りくどくなりがちです。画像を貼り付けて印刷用に整える手間を考えると、画像には画像用のツールを使うほうが早く済みます。
            </p>
            <p>
              提出する書類がPDFのままなら、PDF用の透かしツールを使ってください。画像に変換してから透かしを入れて戻す、という手順を踏むと、文字がぼやけたりファイルサイズが膨らんだりします。要するに、<strong>ファイルの形式に合ったツールを使い分ける</strong>のが結局いちばん確実です。
            </p>

            <InlineCTA
              tool="pdf-watermark"
              position="mid_article"
              location={SLUG}
              lang="ja"
            />

            <h2>ImageMarkerの場合</h2>
            <p>
              ここまでに挙げた基準に、
              <Link href="/ja/" className="text-primary hover:underline">
                ImageMarker
              </Link>
              を当てはめると次のようになります。
            </p>
            <ul>
              <li>
                <strong>処理場所：</strong>
                ブラウザ完結。画像は端末から出ません。アップロードもありません。
              </li>
              <li>
                <strong>配置と濃さ：</strong>
                全面（タイル）配置と不透明度の調整に対応しています。
              </li>
              <li>
                <strong>登録・費用：</strong>
                会員登録もメールアドレスも不要、無料で使えます。
              </li>
            </ul>
            <p>
              なお、PWAとして端末にインストールすれば、オフラインのままでも動きます。これは便利さの話であると同時に、サーバーに何も送っていないことの何よりの証拠でもあります。前述の機内モードのテストは、そのまま試してもらってかまいません。
            </p>

            <h2>書類の種類別・透かしに書く内容</h2>
            <p>
              透かしの文面は「<strong>提出先＋用途＋日付</strong>」の3点が基本です。この3つがそろって初めて、その画像が別の場面で使い回されにくくなります。
            </p>
            <p>
              <strong>身分証のコピー：</strong>
              <br />
              「〇〇不動産 賃貸契約手続きのみ使用 2026/07/15」
            </p>
            <p>
              <strong>契約書：</strong>
              <br />
              「〇〇株式会社 業務委託契約 確認用 2026/07/15」
            </p>
            <p>
              <strong>診断書・証明書：</strong>
              <br />
              「〇〇社 人事部 休職申請のみ使用 2026/07/15」
            </p>
            <p>
              <strong>名刺・請求書：</strong>
              <br />
              「〇〇社 見積依頼のみ使用 2026/07/15」
            </p>
            <p>
              身分証のコピーについては
              <Link
                href="/ja/blog/id-copy-watermark"
                className="text-primary hover:underline"
              >
                身分証コピーの透かしの入れ方
              </Link>
              で手順を詳しく解説しています。マイナンバーカードは扱いに固有の注意点があるため、
              <Link
                href="/ja/blog/my-number-card-copy-safe"
                className="text-primary hover:underline"
              >
                マイナンバーカードのコピーを安全に渡す方法
              </Link>
              もあわせてご覧ください。
            </p>

            <h2>透かしだけでは足りない</h2>
            <p>
              透かしは万能ではありません。書類を渡すときは、次の4点もセットで考えてください。
            </p>
            <ul>
              <li>
                <strong>EXIF（位置情報）を削除する。</strong>
                スマホで撮影した書類の画像には、撮影場所の緯度経度や日時が埋め込まれていることがあります。自宅で撮ったなら、それは自宅の座標です。送る前に
                <Link
                  href="/ja/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF削除ツール
                </Link>
                で消しておきましょう。
              </li>
              <li>
                <strong>不要な項目をマスキングする。</strong>
                提出先が必要としない番号や住所は、モザイクや塗りつぶしで隠します。渡さない情報は漏れません。
              </li>
              <li>
                <strong>必要な面だけ送る。</strong>
                裏面まで求められていないのに両面を送る必要はありません。
              </li>
              <li>
                <strong>送信後の削除を依頼する。</strong>
                用が済んだら削除してもらうよう、ひとこと添えておきます。
              </li>
            </ul>

            <h2>よくある質問</h2>
            <p>
              <strong>Q：無料の透かしツールは安全ですか？</strong>
              <br />
              A：無料かどうかより、ファイルがどこで処理されるかが重要です。サーバーにアップロードするタイプでは、保存期間や第三者への提供、運営元の所在国が分からないことも少なくありません。身分証や契約書のように取り返しのつかない書類なら、端末の中だけで処理が完結するブラウザ完結型を選んでください。
            </p>
            <p>
              <strong>Q：ブラウザ完結型かどうかはどう見分けますか？</strong>
              <br />
              A：いちばん確実なのは、ページを開いたあとに機内モードにして使ってみることです。オフラインでも透かしを入れて保存できれば、ファイルはサーバーに送られていません。あわせて、アップロードの進捗バーが出ないか、プライバシーポリシーに保存期間の記載があるかも確認するとよいでしょう。
            </p>
            <p>
              <strong>Q：透かしはどのくらいの濃さがいいですか？</strong>
              <br />
              A：不透明度30〜50%程度が目安です。透かしの文字がはっきり読めて、なおかつ下の氏名や番号も判読できる濃さにします。濃すぎると提出先が確認できず再提出になり、薄すぎると簡単に消されてしまいます。プレビューを見ながら調整してください。
            </p>
            <p>
              <strong>Q：日本語が文字化けするのはなぜですか？</strong>
              <br />
              A：日本語のフォントが読み込まれていないと、漢字やかなが「□（豆腐）」や記号として表示されることがあります。海外製のツールでよく起きる現象です。透かしを入れる前に、必ずプレビューで日本語が正しく表示されるか確認してください。
            </p>
            <p>
              <strong>Q：PDFにも透かしを入れられますか？</strong>
              <br />
              A：入れられます。PDFのまま提出する書類は、画像に変換せずPDF用の透かしツールを使うほうが画質も文字も劣化しません。ImageMarkerにはPDF透かしツールがあり、こちらもブラウザ内で処理されます。
            </p>

            <h2>まとめ：選ぶ基準はひとつに絞れる</h2>
            <p>
              機能の数や見た目の派手さは、あとから比べればいい話です。大事な書類を扱うなら、まず「ファイルがどこで処理されるのか」を確かめる。それだけで、選択肢はかなり絞り込めます。判断に迷ったら、機内モードにして動くかどうかを試してみてください。
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              アップロードなしで、書類に透かしを
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              無料・登録不要。処理はすべてブラウザ内で完結し、ファイルは端末から出ません。
            </p>
            <Link
              href="/ja/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              ImageMarkerを無料で使う<ReadMoreArrow />
            </Link>
          </div>
        </article>

        {/* 人気ツールへの導線 */}
        <PopularTools lang="ja" location={SLUG} className="mt-12" />

        {/* 関連記事 */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">関連記事</h2>
          <div className="space-y-4">
            <Link href="/ja/blog/id-copy-watermark">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  身分証コピーの透かしの入れ方
                </h3>
                <p className="text-sm text-muted-foreground">
                  身分証のコピーを渡す前に。透かしを入れる手順と、文面の具体例をまとめました。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  記事を読む<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/ja/blog/my-number-card-copy-safe">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  マイナンバーカードのコピーを安全に渡す方法
                </h3>
                <p className="text-sm text-muted-foreground">
                  マイナンバーカードならではの注意点と、コピーを求められたときの対処を解説します。
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  記事を読む<ReadMoreArrow />
                </span>
              </article>
            </Link>
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-gray-400">
          <a
            href="https://ko-fi.com/justinlee2061"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            &#9749; この記事が役に立ったら、コーヒーを一杯おごってください
          </a>
        </p>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            © 2026 ImageMarker — あなたのプライバシーを守ります
          </p>
        </div>
      </footer>
    </div>
  );
}
