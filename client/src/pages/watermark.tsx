import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { FileUploadZone } from "@/components/watermark/FileUploadZone";
import { DocTypeSuggestion } from "@/components/watermark/DocTypeSuggestion";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { CanvasPreview } from "@/components/watermark/CanvasPreview";
import { ProcessingStatus } from "@/components/watermark/ProcessingStatus";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { BotBlockNotice } from "@/components/ProtectionNotice";
import { detectProtection } from "@/lib/protection";
import { useWatermark } from "@/hooks/useWatermark";
import { trackToolUseStart, trackDownloadComplete } from "@/lib/analytics";
import { setPageSeo, webAppSchema, faqSchema, localeAlternates } from "@/lib/seo";
import { Lock, Zap, Eraser, Loader2 } from "lucide-react";

export default function WatermarkPage() {
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

  // 機器人／無頭瀏覽器：不載入互動工具元件，改顯示封鎖提示（prerender 不受影響）
  const { isBot: blocked } = detectProtection();

  useEffect(() => {
    return setPageSeo({
      title: "證件浮水印製作工具｜免費線上浮水印產生器、100% 本機處理 — ImageMarker",
      description:
        "免費線上浮水印產生器，專為身分證、護照、駕照等證件與機密文件設計。100% 本地端瀏覽器處理，不上傳任何檔案。支援自訂浮水印文字、透明度調整，適用租屋、求職等場景。",
      canonical: "https://imagemarker.app/",
      locale: "zh_TW",
      alternates: localeAlternates({ zh: "/", en: "/en/", ja: "/ja/" }),
      jsonLd: [
        webAppSchema({
          name: "證件浮水印工具 — ImageMarker",
          description:
            "免費線上證件浮水印製作工具，專為身分證、護照、駕照等機密文件設計。100% 本地端瀏覽器處理，不上傳任何檔案。支援自訂浮水印文字、透明度調整，適用租屋、求職等場景。",
          url: "https://imagemarker.app/",
          featureList: [
            "100% 瀏覽器本機處理，證件圖片不上傳",
            "自訂浮水印文字、透明度、大小與位置",
            "支援上傳 Logo／品牌圖片浮水印，可與文字浮水印同時使用",
            "文字與 Logo 皆有獨立透明度滑桿（0-100%）",
            "內建租屋、求職等常用浮水印範本，一鍵套用",
            "支援 JPG、PNG 格式，PWA 可離線使用",
          ],
        }),
        faqSchema([
          {
            q: "證件浮水印要寫什麼？",
            a: "建議寫明用途和日期，例如「僅供 XX 公司租屋使用 2026/04/05」。明確標註用途可以有效防止證件被挪作他用。",
          },
          {
            q: "使用這個工具圖片會被上傳嗎？",
            a: "不會。ImageMarker 100% 在您的瀏覽器本地端處理，所有圖片都不會上傳到任何伺服器，確保您的個資安全。",
          },
          {
            q: "支援哪些圖片格式？",
            a: "目前支援 JPG 和 PNG 格式，檔案大小上限為 10MB。",
          },
          {
            q: "手機可以使用嗎？",
            a: "可以。ImageMarker 支援所有現代瀏覽器，包括手機和平板上的 Chrome、Safari 等瀏覽器，也支援 PWA 離線使用。",
          },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "如何幫證件加浮水印",
          description:
            "使用 ImageMarker 免費線上工具，3 步驟幫身分證、護照、駕照等證件影本加上浮水印，保護個資安全。",
          totalTime: "PT1M",
          tool: { "@type": "HowToTool", name: "ImageMarker 證件浮水印工具" },
          step: [
            {
              "@type": "HowToStep",
              name: "上傳證件照片",
              text: "打開 imagemarker.app，將身分證、護照或駕照的照片拖放到上傳區域，或點擊「選擇檔案」按鈕上傳。支援 JPG 和 PNG 格式。",
              url: "https://imagemarker.app/",
            },
            {
              "@type": "HowToStep",
              name: "輸入浮水印文字",
              text: "在浮水印設定區輸入文字，例如「僅供 OO 租屋使用 2026/05/27」。可調整字體大小、透明度和位置。也可以點擊「快速套用」按鈕直接使用租屋、求職等常用範本。",
              url: "https://imagemarker.app/",
            },
            {
              "@type": "HowToStep",
              name: "下載加好浮水印的圖片",
              text: "預覽確認效果後，點擊「套用浮水印」再點「下載圖片」即可。整個過程不到一分鐘，且圖片完全在瀏覽器本地處理，不會上傳到任何伺服器。",
              url: "https://imagemarker.app/",
            },
          ],
        },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="zh" current="watermark" />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 機器人／無頭瀏覽器：以封鎖提示取代整個工具區（不載入工具元件） */}
        {blocked && (
          <div className="py-8 lg:py-12">
            <BotBlockNotice lang="zh" />
          </div>
        )}

        {/* Privacy Notice — 精簡信任標誌 */}
        {/* 桌面版：Header 下方一個固定高度的 app 版面 —— 隱私條 + 工具區剛好填滿一個視窗高度，
            工具區內部各自捲動、操作全程不需捲動整頁；下方 SEO 內容照常在其下方流動。
            所有 app 版面樣式一律用 lg: 前綴，手機版完全維持原本排版不受影響。 */}
        {!blocked && (
        <div className="lg:h-[calc(100vh-4rem)] lg:-mt-8 lg:pt-4 lg:flex lg:flex-col lg:overflow-hidden">
        <PrivacyBanner lang="zh" className="mb-8 lg:mb-4 lg:flex-shrink-0" />

        {/* 手機版：預覽區固定在上、設定區在下可滾動；桌面版維持左右兩欄。
            三個區塊都是 grid 的直接子元素，sticky 的包含區塊才會涵蓋整個設定區高度。
            桌面：grid 以 flex-1 填滿 app 版面剩餘高度，rows 為 [預覽 1fr / 狀態 auto]。 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6 lg:flex-1 lg:min-h-0 lg:grid-rows-[minmax(0,1fr)_auto]">
          {/* Left Panel - Controls（桌面：整欄滿高，設定區內部捲動、操作按鈕釘在底部） */}
          <div className="space-y-6 order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:h-full lg:min-h-0 lg:flex lg:flex-col lg:space-y-0 lg:gap-6">
            {/* 桌面：這一塊（上傳 + 設定）內部捲動；手機維持原本區塊流 */}
            <div className="space-y-6 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 lg:-mr-2">
            <FileUploadZone
              selectedFile={selectedFile}
              onFileSelect={(file) => { if (typeof gtag !== 'undefined') gtag('event', 'upload_image'); trackToolUseStart('watermark'); handleFileSelect(file); }}
            />

            {/* 證件類型自動識別（身分證 vs 護照）：依比例建議，使用者確認後套用對應範本 */}
            <DocTypeSuggestion
              file={selectedFile}
              onApplyTemplate={(text) => updateWatermarkSettings({ text, textEnabled: true, mode: 'text' })}
            />

            <WatermarkControls
              settings={watermarkSettings}
              onSettingsChange={updateWatermarkSettings}
              disabled={!selectedFile}
            />
            </div>

            {/* Action Buttons（桌面釘在左欄底部） */}
            <Card className="p-6 lg:flex-shrink-0">
              <div className="space-y-3">
                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'apply_watermark'); applyWatermark(); }}
                  disabled={!selectedFile || isProcessing}
                  aria-label={isProcessing ? "處理中，請稍候" : "套用浮水印"}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <span className="mr-2" aria-hidden="true">🖌️</span>
                  )}
                  {isProcessing ? "處理中..." : "套用浮水印"}
                </button>

                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'download_image'); trackDownloadComplete("watermark", 1); downloadImage(); }}
                  disabled={!processedImage}
                  aria-label="下載處理後的圖片"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">📥</span>
                  下載圖片
                </button>

                <button
                  onClick={resetCanvas}
                  disabled={!selectedFile}
                  aria-label="重新開始，清除目前的圖片"
                  className="w-full min-h-[44px] bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">🔄</span>
                  重新開始
                </button>
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview（與 /batch 一致：預覽固定渲染為 grid 直接子元素，
              讓手機 sticky 從初次排版就建立、捲動時穩定固定，不因上傳後才插入而失效）
              will-change-transform：載入圖片後預覽內含 <canvas>（獨立 GPU 圖層），若 sticky 容器
              本身沒被提升成合成圖層，捲動時 sticky 位移與 canvas 圖層會失去同步、預覽看似被推走。
              will-change: transform 把 sticky 容器提升成自己的合成圖層，讓 canvas 與容器一起移動。
              （transform-gpu 的 translate3d(0,0,0) 會被瀏覽器攤平成 2D、無法提升圖層，故不用它。）
              桌面 lg:static 不需要，lg:will-change-auto 關掉。 */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 sticky top-16 z-30 -mx-4 px-4 pt-2 pb-3 bg-gray-50 shadow-sm will-change-transform lg:will-change-auto sm:-mx-6 sm:px-6 lg:static lg:z-auto lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:bg-transparent lg:shadow-none lg:min-h-0 lg:overflow-y-auto">
            <CanvasPreview
              canvasRef={canvasRef}
              selectedFile={selectedFile}
              processedImage={processedImage}
            />
          </div>

          {/* 處理狀態與完成後的支持 CTA：上傳後才顯示（非 sticky，不影響預覽固定） */}
          {selectedFile && (
            <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 space-y-6 lg:min-h-0 lg:overflow-y-auto">
              <ProcessingStatus
                selectedFile={selectedFile}
                processedImage={processedImage}
                progress={progress}
              />
              {processedImage && (
                <DownloadSuccess tool="watermark" lang="zh" imageCount={1} />
              )}
            </div>
          )}
        </div>
        </div>
        )}

        {/* 所有工具中心 */}
        <ToolsShowcase lang="zh" current="watermark" />

        {/* 首頁的被動變現入口：沒上傳圖片、只是來逛的人也看得到候補名單。
            與完成畫面那個實例分處頁面上下段，不會同時出現在視野內。 */}
        <WaitlistCTA
          tool="homepage"
          lang="zh"
          location="homepage"
          className="mt-12"
        />

        {/* Features Section */}
        <section className="mt-12" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">產品特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary text-3xl mb-3 mx-auto w-8 h-8" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">隱私安全</h3>
              <p className="text-sm text-gray-600">圖片完全在本地處理，不會上傳到伺服器，保護身分證、護照、駕照等證件影本的個資安全</p>
            </Card>

            <Card className="p-6 text-center">
              <span className="text-primary text-3xl mb-3 block" role="img" aria-label="閃電圖示">⚡</span>
              <h3 className="font-semibold text-gray-900 mb-2">離線可用</h3>
              <p className="text-sm text-gray-600">支援 PWA 漸進式網頁應用，可安裝到桌面離線使用</p>
            </Card>

            <Card className="p-6 text-center">
              <Zap className="text-primary text-3xl mb-3 mx-auto w-8 h-8" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">快速處理</h3>
              <p className="text-sm text-gray-600">即時預覽浮水印效果，一鍵下載，流暢的使用體驗</p>
            </Card>
          </div>
        </section>

        {/* SEO 內容區：浮水印產生器說明 */}
        <section className="mt-12" aria-labelledby="generator-intro-heading">
          <Card className="p-6 md:p-8">
            <h2 id="generator-intro-heading" className="text-xl font-semibold text-gray-900 mb-4">
              免費線上浮水印產生器，專為證件影本設計
            </h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                ImageMarker 是一款<strong className="text-gray-900">免費、免註冊的線上浮水印產生器</strong>，
                專門針對身分證、護照、駕照、健保卡等證件影本設計。所有影像處理 100%
                在你的瀏覽器本地端完成，檔案<strong className="text-gray-900">不會上傳到任何伺服器</strong>——
                這也是它和多數雲端浮水印產生器最關鍵的差別：處理極敏感的證件時，檔案根本不需要離開你的裝置。
              </p>
              <p>
                使用方式很單純：上傳圖片、輸入浮水印文字（建議依「用途＋對象＋日期」公式撰寫，
                例如「僅供 OO 銀行開戶使用 2026/07/20」）、調整透明度與位置，即時預覽滿意後直接下載。
                支援 PWA 安裝到手機桌面，離線也能使用。
              </p>
              <p>
                想知道市面上還有哪些選擇？我們實測比較了 5 款主流工具，整理成{" "}
                <Link
                  href="/blog/watermark-generators-recommendation"
                  className="text-primary font-medium hover:underline"
                >
                  浮水印產生器推薦與比較表
                </Link>
                ，從隱私安全、是否需註冊、批次處理到 PDF 支援逐項比對；
                若你想知道浮水印該寫什麼內容，可以參考{" "}
                <Link
                  href="/blog/watermark-templates-guide"
                  className="text-primary font-medium hover:underline"
                >
                  身分證影本簽註寫法與 10 種情境範本
                </Link>
                。
              </p>
            </div>
          </Card>
        </section>

        {/* EXIF 清除入口 */}
        <section className="mt-12" aria-labelledby="exif-cta-heading">
          <Card className="p-6 md:p-8 bg-blue-50 border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start space-x-3">
                <Eraser className="text-primary mt-1 w-8 h-8 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h2 id="exif-cta-heading" className="font-semibold text-gray-900 mb-1">
                    照片暗藏 GPS 位置與拍攝資訊？用 EXIF 清除器一鍵移除
                  </h2>
                  <p className="text-sm text-gray-600">
                    上傳照片前，先清除 EXIF 中的 GPS 定位、拍攝時間、相機型號等隱私資訊。同樣 100% 本地處理，不會上傳到伺服器。
                  </p>
                </div>
              </div>
              <Link
                href="/exif-clean"
                className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-white py-2.5 px-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                前往 EXIF 清除器<ReadMoreArrow />
              </Link>
            </div>
          </Card>
        </section>

        {/* 延伸閱讀 */}
        <section className="mt-12" aria-labelledby="further-reading-heading">
          <h2 id="further-reading-heading" className="text-xl font-semibold text-gray-900 mb-6">延伸閱讀</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                <Link href="/blog/rent-id-watermark" className="hover:text-primary transition-colors">
                  租屋交證件影本前必做！3 步驟幫身分證加浮水印
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                教你如何用 ImageMarker 三步驟完成身分證浮水印，有效保護個資、防止證件影本被冒用。
              </p>
              <Link
                href="/blog/rent-id-watermark"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文<ReadMoreArrow />
              </Link>
            </Card>

            <Card className="p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                <Link href="/blog/watermark-generators-recommendation" className="hover:text-primary transition-colors">
                  5 款免費線上浮水印產生器推薦｜2026 年最新比較
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                精選 5 款最好用的免費浮水印工具，比較本地處理 vs 雲端上傳、隱私安全與功能優缺點。
              </p>
              <Link
                href="/blog/watermark-generators-recommendation"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文<ReadMoreArrow />
              </Link>
            </Card>

            <Card className="p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                <Link href="/blog/watermark-templates-guide" className="hover:text-primary transition-colors">
                  身分證影本簽註寫法＋證件浮水印範本：10 種情境怎麼寫（2026 最新）
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本讓你直接套用。
              </p>
              <Link
                href="/blog/watermark-templates-guide"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文<ReadMoreArrow />
              </Link>
            </Card>

            <Card className="p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                <Link href="/blog/mobile-watermark-tutorial" className="hover:text-primary transition-colors">
                  手機怎麼幫身分證加浮水印？免安裝 App 的最快方法
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                不用下載 App，用手機瀏覽器 3 分鐘完成證件浮水印，iPhone 和 Android 都適用。
              </p>
              <Link
                href="/blog/mobile-watermark-tutorial"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文<ReadMoreArrow />
              </Link>
            </Card>

            <Card className="p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                <Link href="/blog/other-documents-watermark" className="hover:text-primary transition-colors">
                  不只身分證！存摺、健保卡、駕照影本也要加浮水印
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                存摺、健保卡、駕照等影本也是詐騙高危目標，教你 6 種常見證件的浮水印寫法。
              </p>
              <Link
                href="/blog/other-documents-watermark"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文<ReadMoreArrow />
              </Link>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter lang="zh" />
    </div>
  );
}
