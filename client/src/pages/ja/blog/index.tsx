import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { setPageSeo, localeAlternates } from "@/lib/seo";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const articles: Article[] = [
  {
    slug: "id-copy-watermark",
    title: "身分証のコピーに透かしを入れる方法",
    excerpt:
      "賃貸契約、口座開設、入社手続き — 身分証のコピーを求められる場面は意外と多いもの。一度送ったコピーは回収できません。透かしに何を書き、どのくらいの濃さにすればいいのかを解説します。",
    date: "2026-07-15",
    category: "使い方",
  },
  {
    slug: "my-number-card-copy-safe",
    title: "マイナンバーカードのコピーを安全に送る方法",
    excerpt:
      "表面と裏面は法律上まったく別物です。本人確認だけなら裏面は原則不要 — 番号法の目的制限をふまえて、求められたときにどう対応すればいいのかを整理しました。",
    date: "2026-07-15",
    category: "プライバシー",
  },
  {
    slug: "document-watermark-tool",
    title: "個人情報を守る！書類の透かし入れツールの選び方と使い方",
    excerpt:
      "個人情報を守るために、個人情報を見知らぬサーバーに渡していませんか。ツール選びで本当に大事な基準はひとつ — そのファイルがどこで処理されるかです。機内モードでの見分け方も紹介します。",
    date: "2026-07-15",
    category: "ツール選び",
  },
];

export default function JaBlogIndex() {
  useEffect(() => {
    return setPageSeo({
      title: "ブログ｜身分証・書類のプライバシー保護 — ImageMarker",
      description:
        "身分証や書類のコピーを安全に扱うための実践的な解説記事。透かしの入れ方、マイナンバーカードの扱い、ツールの選び方まで。",
      canonical: "https://imagemarker.app/ja/blog",
      locale: "ja_JP",
      alternates: localeAlternates({
        zh: "/blog",
        en: "/en/blog",
        ja: "/ja/blog",
      }),
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/ja/" className="hover:text-foreground transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <span>ブログ</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">ブログ</h1>
          <p className="text-muted-foreground">
            身分証や書類のコピーを安全に送るための、実践的な解説記事をお届けします。
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="p-6 border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                  {article.category}
                </span>
                <time dateTime={article.date}>{article.date}</time>
              </div>
              <h2 className="text-xl font-semibold mb-2 leading-snug">
                <Link
                  href={`/ja/blog/${article.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {article.excerpt}
              </p>
              <Link
                href={`/ja/blog/${article.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                続きを読む<ReadMoreArrow />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">
            さっそく透かしを入れてみますか？
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            無料・登録不要。すべてブラウザ内で処理され、画像はアップロードされません。
          </p>
          <Link
            href="/ja/"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            無料で透かしツールを使う<ReadMoreArrow />
          </Link>
        </div>
      </main>
    </div>
  );
}
