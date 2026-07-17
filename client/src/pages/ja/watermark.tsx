import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { FileUploadZone } from "@/components/watermark/FileUploadZone";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { CanvasPreview } from "@/components/watermark/CanvasPreview";
import { ProcessingStatus } from "@/components/watermark/ProcessingStatus";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { useWatermark } from "@/hooks/useWatermark";
import { trackToolUseStart } from "@/lib/analytics";
import { setPageSeo, webAppSchema, localeAlternates } from "@/lib/seo";
import { Lock, Zap, Eraser } from "lucide-react";

const TITLE = "画像透かしツール｜身分証・書類の透かしを無料でブラウザ内作成";
const DESCRIPTION =
  "身分証や書類のコピーに透かしを入れる無料ツール。アップロード不要で、すべてブラウザ内だけで処理します。提出先・用途・日付を入れて、なりすましや目的外使用を防ぎましょう。";

export default function WatermarkJaPage() {
  const {
    selectedFile,
    watermarkSettings,
    canvasRef,
    processedImage,
    isProcessing,
    progress,
    handleFileSelect,
    updateWatermarkSettings,
    applyWatermark,
    downloadImage,
    resetCanvas
  } = useWatermark();

  useEffect(() => {
    return setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: "https://imagemarker.app/ja/",
      locale: "ja_JP",
      alternates: localeAlternates({ zh: "/", en: "/en/", ja: "/ja/" }),
      jsonLd: webAppSchema({
        name: "画像透かしツール — ImageMarker",
        description: DESCRIPTION,
        url: "https://imagemarker.app/ja/",
        inLanguage: "ja",
        featureList: [
          "すべて端末内で処理 — アップロードは一切なし",
          "身分証や書類に文字・ロゴの透かしを追加",
          "リアルタイムのプレビューとワンクリックのダウンロード",
          "PWA としてインストールすればオフラインでも利用可能",
        ],
      }),
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="ja" current="watermark" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="ja" className="mb-8" />

        {/* 版面與中英版一致：手機把預覽 sticky 在最上方，桌面維持左右兩欄。
            三個區塊都是 grid 的直接子元素，sticky 的 containing block 才會涵蓋
            整個設定欄的高度。 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 左欄：設定 */}
          <div className="space-y-6 order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <FileUploadZone
              selectedFile={selectedFile}
              onFileSelect={(file) => { if (typeof gtag !== 'undefined') gtag('event', 'upload_image'); trackToolUseStart('watermark'); handleFileSelect(file); }}
              lang="ja"
            />

            <WatermarkControls
              settings={watermarkSettings}
              onSettingsChange={updateWatermarkSettings}
              disabled={!selectedFile}
              lang="ja"
            />

            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'apply_watermark'); applyWatermark(); }}
                  disabled={!selectedFile || isProcessing}
                  aria-label={isProcessing ? "処理中です。しばらくお待ちください" : "透かしを適用"}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">🖌️</span>
                  {isProcessing ? "処理中..." : "透かしを適用"}
                </button>

                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'download_image'); downloadImage(); }}
                  disabled={!processedImage}
                  aria-label="処理した画像をダウンロード"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">📥</span>
                  画像をダウンロード
                </button>

                <button
                  onClick={resetCanvas}
                  disabled={!selectedFile}
                  aria-label="最初からやり直し、選択中の画像を消去"
                  className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">🔄</span>
                  最初からやり直す
                </button>
              </div>
            </Card>
          </div>

          {/* 右欄：預覽 */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 sticky top-16 z-30 -mx-4 px-4 pt-2 pb-3 bg-gray-50 shadow-sm will-change-transform lg:will-change-auto sm:-mx-6 sm:px-6 lg:static lg:z-auto lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:bg-transparent lg:shadow-none">
            <CanvasPreview
              canvasRef={canvasRef}
              selectedFile={selectedFile}
              processedImage={processedImage}
              lang="ja"
            />
          </div>

          {selectedFile && (
            <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 space-y-6">
              <ProcessingStatus
                selectedFile={selectedFile}
                processedImage={processedImage}
                progress={progress}
                lang="ja"
              />
              {processedImage && (
                <DownloadSuccess tool="watermark" lang="ja" imageCount={1} />
              )}
            </div>
          )}
        </div>

        <ToolsShowcase lang="ja" current="watermark" />

        <section className="mt-12" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">特長</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary text-3xl mb-3 mx-auto w-8 h-8" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">アップロードなし</h3>
              <p className="text-sm text-gray-600">画像の処理はすべて端末内で完結します。本人確認書類も外部のサーバーに送られることはありません。</p>
            </Card>

            <Card className="p-6 text-center">
              <span className="text-primary text-3xl mb-3 block" role="img" aria-label="稲妻のアイコン">⚡</span>
              <h3 className="font-semibold text-gray-900 mb-2">オフラインでも使える</h3>
              <p className="text-sm text-gray-600">PWA としてホーム画面に追加すれば、ネット接続がなくてもそのまま使えます。</p>
            </Card>

            <Card className="p-6 text-center">
              <Zap className="text-primary text-3xl mb-3 mx-auto w-8 h-8" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">すぐに仕上がる</h3>
              <p className="text-sm text-gray-600">透かしの効果はその場でプレビューに反映され、ワンクリックでダウンロードできます。</p>
            </Card>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="exif-cta-heading">
          <Card className="p-6 md:p-8 bg-blue-50 border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start space-x-3">
                <Eraser className="text-primary mt-1 w-8 h-8 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h2 id="exif-cta-heading" className="font-semibold text-gray-900 mb-1">
                    写真には GPS 位置情報が残っています — EXIF をワンクリックで削除
                  </h2>
                  <p className="text-sm text-gray-600">
                    写真を送る前に、EXIF に記録された位置情報・撮影日時・カメラの機種を削除しましょう。こちらも端末内だけで処理し、アップロードはありません。
                  </p>
                </div>
              </div>
              <Link
                href="/en/exif-clean"
                className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-white py-2.5 px-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                EXIF 削除ツールを開く<ReadMoreArrow />
              </Link>
            </div>
          </Card>
        </section>

        <section className="mt-12" aria-labelledby="articles-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="articles-heading" className="font-semibold text-gray-900">
              新着記事
            </h2>
            <Link
              href="/ja/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              すべて見る<ReadMoreArrow />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/ja/blog/id-copy-watermark"
              className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">
                身分証のコピーに透かしを入れる方法
              </h3>
              <p className="text-sm text-gray-600">
                何を書けばいいのか、濃さはどのくらいか。実際の手順まで解説します。
              </p>
            </Link>
            <Link
              href="/ja/blog/my-number-card-copy-safe"
              className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">
                マイナンバーカードのコピーを安全に送る方法
              </h3>
              <p className="text-sm text-gray-600">
                表面と裏面は別物です。裏面の提出を求められたときの考え方。
              </p>
            </Link>
            <Link
              href="/ja/blog/document-watermark-tool"
              className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">
                個人情報を守る書類の透かし入れツール
              </h3>
              <p className="text-sm text-gray-600">
                選ぶ基準はひとつ — そのファイル、どこで処理されていますか？
              </p>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang="ja" />
    </div>
  );
}
