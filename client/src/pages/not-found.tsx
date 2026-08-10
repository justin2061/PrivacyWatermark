import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AlertCircle } from "lucide-react";
import { setPageSeo } from "@/lib/seo";
import type { Lang } from "@/lib/tools";

// Netlify 的 SPA fallback 讓任何不存在的網址都以 200 回傳 index.html，所以這頁
// 是「軟 404」。過去它完全沒有呼叫 setPageSeo，於是整頁沿用殼層 index.html 的
// 首頁標題與 canonical → https://imagemarker.app/：等於對每個亂打的網址宣告
// 「我就是首頁」，這正是 Google 會把垃圾網址收成首頁重複頁的成因。
// 這裡改成 noindex + canonical 指向自己，讓這些網址不進索引也不冒充首頁。

const COPY = {
  zh: {
    title: "找不到頁面（404）— ImageMarker",
    description: "這個網址不存在或已經移動。回首頁使用免費的線上浮水印與隱私工具。",
    heading: "找不到這個頁面",
    body: "網址可能打錯了，或這個頁面已經移動。以下是幾個常用的入口：",
    home: "回首頁（浮水印工具）",
    blog: "看教學文章",
  },
  en: {
    title: "Page Not Found (404) — ImageMarker",
    description:
      "This URL doesn't exist or has moved. Head back to the free online watermark and privacy tools.",
    heading: "We couldn't find that page",
    body: "The address may be mistyped, or the page has moved. Here are a few places to start:",
    home: "Go to the watermark tool",
    blog: "Read the blog",
  },
  ja: {
    title: "ページが見つかりません（404）— ImageMarker",
    description:
      "この URL は存在しないか、移動しました。無料の透かし・プライバシーツールへお戻りください。",
    heading: "ページが見つかりません",
    body: "URL が間違っているか、ページが移動した可能性があります。",
    home: "透かしツールへ戻る",
    blog: "ブログを読む",
  },
} as const;

const HOME: Record<Lang, string> = { zh: "/", en: "/en/", ja: "/ja/" };
const BLOG: Record<Lang, string> = { zh: "/blog", en: "/en/blog", ja: "/ja/blog" };

/** 從當前路徑推出語系，讓 404 至少維持在使用者原本所在的語言分支。 */
function langFromPath(path: string): Lang {
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/ja" || path.startsWith("/ja/")) return "ja";
  return "zh";
}

export default function NotFound() {
  const path =
    typeof window === "undefined" ? "/" : window.location.pathname;
  const lang = langFromPath(path);
  const t = COPY[lang];

  useEffect(() => {
    return setPageSeo({
      title: t.title,
      description: t.description,
      // 自己指向自己而不是首頁；配合 noindex，這個網址就不會被當成首頁的重複頁。
      canonical: `https://imagemarker.app${path}`,
      locale: lang === "zh" ? "zh_TW" : lang === "ja" ? "ja_JP" : "en_US",
      noindex: true,
    });
  }, [path, lang, t.title, t.description]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SiteHeader lang={lang} />

      <main className="flex-1 w-full flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
              <h1 className="text-2xl font-bold text-gray-900">{t.heading}</h1>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">{t.body}</p>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                href={HOME[lang]}
                className="text-primary hover:underline text-sm font-medium"
              >
                {t.home}
              </Link>
              <Link
                href={BLOG[lang]}
                className="text-primary hover:underline text-sm font-medium"
              >
                {t.blog}
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
