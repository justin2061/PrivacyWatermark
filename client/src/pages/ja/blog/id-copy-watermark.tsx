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

const SLUG = "id-copy-watermark";

const URL = "https://imagemarker.app/ja/blog/id-copy-watermark";

const TITLE = "身分証のコピーに透かしを入れる方法";

const DESCRIPTION =
  "身分証のコピーは一度渡すと回収できず、なりすましに悪用される恐れがあります。提出先・用途・日付を透かしで入れて悪用を防ぐ方法を解説。ブラウザだけで完結し、画像のアップロードは一切なし、無料で使えます。";

export default function JaIdCopyWatermark() {
  useEffect(() => {
    const cleanup = setPageSeo({
      title:
        "身分証のコピーに透かしを入れる方法｜無料・アップロード不要 | ImageMarker",
      description: DESCRIPTION,
      canonical: URL,
      locale: "ja_JP",
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-07-15",
          dateModified: "2026-07-15",
        }),
        blogBreadcrumb(TITLE, URL, "ja"),
        faqSchema([
          {
            q: "透かし入りのコピーでも受け取ってもらえますか？",
            a: "氏名・番号・顔写真が読める状態であれば、多くの提出先で問題なく受け付けてもらえます。用途を書き添えたコピーを渡すことは、本人確認の実務でも一般的です。なお、透かしのない「きれいなコピー」でなければ絶対に受け付けないと言われた場合は、その理由を確認したほうが安心です。",
          },
          {
            q: "透かしには何と書けばいいですか？",
            a: "「提出先」「用途」「日付」の3点を入れてください。たとえば「〇〇不動産 賃貸契約用 2026年7月15日」のように書きます。単に「コピー」とだけ書いた透かしは、どこにでも使い回せてしまうため効果がほとんどありません。",
          },
          {
            q: "自分の身分証に透かしを入れるのは違法ではありませんか？",
            a: "自分自身の本人確認書類のコピーに、用途を示す透かしを入れること自体は問題ありません。ポイントは、確認に必要な情報を消してしまわないことです。提出先が読み取れなくなると再提出になり、かえって手間が増えます。",
          },
          {
            q: "スマホでもできますか？",
            a: "できます。ImageMarker はブラウザ上で動くため、iPhone の Safari でも Android の Chrome でも、アプリをインストールせずにそのまま使えます。撮影した写真をその場で加工して送れます。",
          },
          {
            q: "画像はアップロードされませんか？",
            a: "アップロードされません。処理はすべて端末のブラウザ内で完結し、画像がサーバーに送られることはありません。機内モードのままでも動作するので、実際に試して確かめられます。",
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
          <Link href="/ja/blog" className="hover:text-foreground transition-colors">
            ブログ
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time dateTime="2026-07-15" className="text-sm text-muted-foreground">
              2026年7月15日
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              身分証のコピーに透かしを入れる方法
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              賃貸契約、銀行の口座開設、転職先の入社手続き、フリマアプリの本人確認——身分証のコピーを求められる場面は、思っているよりずっと多いものです。急かされるまま運転免許証をスマホで撮って、そのままメールやチャットで送ってしまった経験のある方も少なくないはずです。
            </p>
            <p>
              ただ、送ってしまったその画像は、相手のサーバーやメールボックスに残り続けます。誰が閲覧できるのか、いつ削除されるのか、こちらからは確認できません。そこで役立つのが、透かし（ウォーターマーク）です。
            </p>

            <h2>身分証のコピーが悪用されるとどうなるか</h2>
            <p>
              運転免許証やマイナンバーカードのコピーには、氏名・生年月日・住所・顔写真・番号が揃っています。これは、他人がなりすますのに十分な情報です。悪用された場合、次のようなことが起こり得ます。
            </p>
            <ul>
              <li>
                <strong>なりすましによる契約。</strong>
                本人になりすまして口座を開設されたり、借入や携帯電話の契約に使われたりする恐れがあります。
              </li>
              <li>
                <strong>他サービスの本人確認の突破。</strong>
                画像アップロードだけで本人確認（KYC）を済ませるサービスでは、一枚のコピーがそのまま使い回されることがあります。
              </li>
              <li>
                <strong>名簿業者への流出。</strong>
                提出先が不正アクセスを受けたり、内部から持ち出されたりすれば、個人情報がまとめて出回ることになります。
              </li>
            </ul>
            <p>
              そして何より重要なのが、
              <strong>一度出したコピーは回収できない</strong>
              という点です。削除を依頼できても、すでに複製されていれば意味がありません。だからこそ、渡す前の一手間が効いてきます。
            </p>

            <h2>透かしが有効な理由</h2>
            <p>
              透かしの本質は、コピーの
              <strong>用途を限定する</strong>
              ことにあります。「〇〇不動産 賃貸契約用」と全面に入っていれば、そのコピーは賃貸契約という一つの目的にしか使えなくなります。仮に流出しても、他の場面で使おうとすれば不自然さがすぐに露見するため、再利用の価値が大きく下がります。提出先を書いておけば、どこから漏れたのかを特定する手がかりにもなります。
            </p>
            <p>
              とはいえ、透かしは暗号化ではありません。画像編集の心得がある人なら、時間をかければある程度は消せます。透かしにできるのは、悪用のハードルを上げ、割に合わなくすることであって、絶対的な防御ではない——この点は正直にお伝えしておきます。それでも、何も書かれていないコピーを渡すのとでは、リスクの大きさがまるで違います。
            </p>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
              lang="ja"
            />

            <h2>透かしに書くべき内容</h2>
            <p>
              入れるべきなのは、
              <strong>提出先 + 用途 + 日付</strong>
              の3点セットです。
            </p>
            <p>
              <strong>悪い例：</strong>
              <br />
              「コピー」
            </p>
            <p>
              <strong>良い例：</strong>
              <br />
              「〇〇不動産 賃貸契約用 2026年7月15日」
            </p>
            <p>
              3つそれぞれに役割があります。
              <strong>提出先</strong>
              を書くと、そのコピーは他社に出しても意味をなさなくなり、万一出回ったときの出所もたどれます。
              <strong>用途</strong>
              を書けば、同じ相手であっても目的外の手続きに転用しづらくなります。
              <strong>日付</strong>
              を入れることで、いつの時点のコピーかがはっきりし、何年も後に持ち出されても古いものだと一目で分かります。どれか一つでも欠けると、限定の効果はぐっと弱まります。
            </p>

            <h2>透かしの入れ方（3ステップ）</h2>
            <h3>ステップ1：ツールを開く</h3>
            <p>
              スマホでもパソコンでも構いません。ブラウザで{" "}
              <Link href="/ja/" className="text-primary hover:underline">
                imagemarker.app/ja/
              </Link>{" "}
              を開きます。アプリのインストールも会員登録も不要です。
            </p>

            <h3>ステップ2：画像を選び、文字を入れる</h3>
            <p>
              身分証の画像を選びます。このとき画像は端末から出ません。処理はすべてブラウザ内で行われ、アップロードは一切ないため、機内モードのままでも動作します。
            </p>
            <p>
              続いて透かしの文字を入力し、
              <strong>繰り返し（タイル）表示をオン</strong>
              にして全面に配置します。不透明度は
              <strong>30〜50%程度</strong>
              が目安です。文字がはっきり読めて、かつ下の情報も確認できる濃さに調整してください。
            </p>

            <h3>ステップ3：ダウンロードして送る</h3>
            <p>
              仕上がりを確認したらダウンロードします。あとは、原本ではなく
              <strong>透かし入りのコピー</strong>
              のほうを送るだけです。ここまで1分もかかりません。
            </p>

            <h2>実践的なコツ</h2>
            <ul>
              <li>
                <strong>透かしは全面に敷く。</strong>
                角に一つ入れただけでは、トリミングで簡単に消せてしまいます。文書の端から端まで重なるように配置してください。
              </li>
              <li>
                <strong>氏名・番号・顔写真は読める濃さを保つ。</strong>
                濃くしすぎると相手が確認できず、再提出を求められて二度手間になります。守るための工夫が、手続きの障害になっては本末転倒です。
              </li>
              <li>
                <strong>必要な面だけを送る。</strong>
                裏面を求められていないなら、表面だけで十分です。渡す情報は少ないほど安全です。
              </li>
              <li>
                <strong>不要な項目はマスキングする。</strong>
                本籍地や住所など、その手続きに関係のない欄はモザイクや塗りつぶしで隠しておきましょう。マイナンバーカードの扱いについては{" "}
                <Link
                  href="/ja/blog/my-number-card-copy-safe"
                  className="text-primary hover:underline"
                >
                  マイナンバーカードのコピーを安全に渡す方法
                </Link>
                も参考になります。
              </li>
              <li>
                <strong>送信後は削除を依頼する。</strong>
                手続きが終わったら、コピーの廃棄を一言お願いしておきます。確実ではありませんが、伝えておく価値はあります。
              </li>
            </ul>

            <InlineCTA
              tool="mosaic"
              position="mid_article"
              location={SLUG}
              lang="ja"
            />

            <h2>よくある質問</h2>
            <p>
              <strong>Q：透かし入りのコピーでも受け取ってもらえますか？</strong>
              <br />
              A：氏名・番号・顔写真が読める状態であれば、多くの提出先で問題なく受け付けてもらえます。用途を書き添えたコピーを渡すことは、本人確認の実務でも一般的です。なお、透かしのない「きれいなコピー」でなければ絶対に受け付けないと言われた場合は、その理由を確認したほうが安心です。
            </p>
            <p>
              <strong>Q：透かしには何と書けばいいですか？</strong>
              <br />
              A：「提出先」「用途」「日付」の3点を入れてください。たとえば「〇〇不動産 賃貸契約用 2026年7月15日」のように書きます。単に「コピー」とだけ書いた透かしは、どこにでも使い回せてしまうため効果がほとんどありません。
            </p>
            <p>
              <strong>
                Q：自分の身分証に透かしを入れるのは違法ではありませんか？
              </strong>
              <br />
              A：自分自身の本人確認書類のコピーに、用途を示す透かしを入れること自体は問題ありません。ポイントは、確認に必要な情報を消してしまわないことです。提出先が読み取れなくなると再提出になり、かえって手間が増えます。
            </p>
            <p>
              <strong>Q：スマホでもできますか？</strong>
              <br />
              A：できます。ImageMarker はブラウザ上で動くため、iPhone の Safari でも Android の Chrome でも、アプリをインストールせずにそのまま使えます。撮影した写真をその場で加工して送れます。
            </p>
            <p>
              <strong>Q：画像はアップロードされませんか？</strong>
              <br />
              A：アップロードされません。処理はすべて端末のブラウザ内で完結し、画像がサーバーに送られることはありません。機内モードのままでも動作するので、実際に試して確かめられます。
            </p>

            <h2>渡す前の1分が、後の何年かを守る</h2>
            <p>
              身分証のコピーを求められること自体は、避けられません。ただ、そのコピーがどう使われ得るかは、渡す側の一手間である程度コントロールできます。次にコピーを求められたら、送信ボタンを押す前に、提出先・用途・日付の3点を入れた透かしを重ねてみてください。
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <a
                href="https://ko-fi.com/justinlee2061"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                ☕ この記事が役に立ったら、コーヒーを一杯おごってください
              </a>
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              身分証のコピーを、渡す前に守りませんか
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              無料・登録不要。100%
              ブラウザ内で処理され、画像がアップロードされることはありません。
            </p>
            <Link
              href="/ja/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              ImageMarker を無料で使う
              <ReadMoreArrow />
            </Link>
          </div>
        </article>

        {/* 人気ツールへの導線 */}
        <PopularTools lang="ja" location={SLUG} className="mt-12" />
      </main>

      <SiteFooter lang="ja" />
    </div>
  );
}
