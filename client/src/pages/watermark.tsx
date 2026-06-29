import { useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { FileUploadZone } from "@/components/watermark/FileUploadZone";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { CanvasPreview } from "@/components/watermark/CanvasPreview";
import { ProcessingStatus } from "@/components/watermark/ProcessingStatus";
import { useWatermark } from "@/hooks/useWatermark";
import { Shield, Lock, Zap, BookOpen, Eraser, Layers, Languages, Minimize2, Repeat, Scaling, Scissors } from "lucide-react";

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

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg" role="img" aria-label="相機圖示">📷</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">證件浮水印工具</h1>
                <p className="text-xs text-gray-600">安全的本地端圖片處理</p>
              </div>
            </div>
            {/* 桌面版導航 */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/batch"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <Layers className="w-4 h-4" aria-hidden="true" />
                <span>批次處理</span>
              </Link>
              <Link
                href="/exif-clean"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <Eraser className="w-4 h-4" aria-hidden="true" />
                <span>EXIF 清除器</span>
              </Link>
              <Link
                href="/remove-bg"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <Scissors className="w-4 h-4" aria-hidden="true" />
                <span>AI 去背</span>
              </Link>
              <Link
                href="/compress"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <Minimize2 className="w-4 h-4" aria-hidden="true" />
                <span>圖片壓縮</span>
              </Link>
              <Link
                href="/convert"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <Repeat className="w-4 h-4" aria-hidden="true" />
                <span>格式轉換</span>
              </Link>
              <Link
                href="/resize"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <Scaling className="w-4 h-4" aria-hidden="true" />
                <span>圖片縮放</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>使用教學與文章</span>
              </Link>
              <a
                href="/en/"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                aria-label="Switch to English"
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span>EN</span>
              </a>
              <div className="flex items-center space-x-2">
                <Shield className="text-green-600 w-4 h-4" aria-hidden="true" />
                <span className="text-sm text-gray-600">100% 本地處理</span>
              </div>
            </div>

            {/* 手機版漢堡按鈕 */}
            <button
              type="button"
              className="md:hidden p-2 text-2xl leading-none text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "關閉選單" : "開啟選單"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* 手機版展開選單 */}
          {menuOpen && (
            <nav className="md:hidden border-t border-gray-200 py-2">
              <Link
                href="/batch"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Layers className="w-4 h-4" aria-hidden="true" />
                <span>批次處理</span>
              </Link>
              <Link
                href="/exif-clean"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Eraser className="w-4 h-4" aria-hidden="true" />
                <span>EXIF 清除器</span>
              </Link>
              <Link
                href="/remove-bg"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Scissors className="w-4 h-4" aria-hidden="true" />
                <span>AI 去背</span>
              </Link>
              <Link
                href="/compress"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Minimize2 className="w-4 h-4" aria-hidden="true" />
                <span>圖片壓縮</span>
              </Link>
              <Link
                href="/convert"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Repeat className="w-4 h-4" aria-hidden="true" />
                <span>格式轉換</span>
              </Link>
              <Link
                href="/resize"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Scaling className="w-4 h-4" aria-hidden="true" />
                <span>圖片縮放</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>使用教學與文章</span>
              </Link>
              <a
                href="/en/"
                className="flex items-center space-x-2 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                aria-label="Switch to English"
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span>EN</span>
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Notice */}
        <Card className="bg-blue-50 border-blue-200 p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="text-primary mt-0.5 w-5 h-5" />
            <div>
              <h2 className="font-medium text-blue-900 mb-1">隱私安全保護</h2>
              <p className="text-sm text-blue-800">
                您的圖片完全在瀏覽器中處理，不會上傳到任何伺服器。適合處理身分證、護照、駕照、健保卡等各類證件影本及機密文件。無論是租屋、求職、辦理業務時需要提供證件影本，都建議先加上浮水印保護個資安全。
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <FileUploadZone
              selectedFile={selectedFile}
              onFileSelect={(file) => { if (typeof gtag !== 'undefined') gtag('event', 'upload_image'); handleFileSelect(file); }}
            />

            <WatermarkControls
              settings={watermarkSettings}
              onSettingsChange={updateWatermarkSettings}
              disabled={!selectedFile}
            />

            {/* Action Buttons */}
            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'apply_watermark'); applyWatermark(); }}
                  disabled={!selectedFile || isProcessing}
                  aria-label={isProcessing ? "處理中，請稍候" : "套用浮水印"}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">{isProcessing ? "⏳" : "🖌️"}</span>
                  {isProcessing ? "處理中..." : "套用浮水印"}
                </button>

                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'download_image'); downloadImage(); }}
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
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">🔄</span>
                  重新開始
                </button>

                <a
                  href="https://ko-fi.com/justinlee2061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-blue-500 transition-colors mt-2 inline-block"
                >
                  ☕ 覺得好用？請我喝杯咖啡
                </a>
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview Canvas */}
          <div className="space-y-6">
            <CanvasPreview
              canvasRef={canvasRef}
              selectedFile={selectedFile}
              processedImage={processedImage}
            />

            <ProcessingStatus
              selectedFile={selectedFile}
              processedImage={processedImage}
              progress={progress}
            />
          </div>
        </div>

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
                前往 EXIF 清除器 →
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
                租屋交證件影本前必做！3 步驟幫身分證加浮水印
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                教你如何用 ImageMarker 三步驟完成身分證浮水印，有效保護個資、防止證件影本被冒用。
              </p>
              <Link
                href="/blog/rent-id-watermark"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文 →
              </Link>
            </Card>

            <Card className="p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                5 款免費線上浮水印產生器推薦｜2026 年最新比較
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                精選 5 款最好用的免費浮水印工具，比較本地處理 vs 雲端上傳、隱私安全與功能優缺點。
              </p>
              <Link
                href="/blog/watermark-generators-recommendation"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文 →
              </Link>
            </Card>

            <Card className="p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                證件浮水印內容範本：10 種常見情境怎麼寫（2026 最新）
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                租屋、求職、開戶、保險……每種情境的證件浮水印該寫什麼？完整 10 種範本讓你直接套用。
              </p>
              <Link
                href="/blog/watermark-templates-guide"
                className="inline-block text-sm text-primary font-medium hover:underline"
              >
                閱讀全文 →
              </Link>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2025 證件浮水印工具 - 保護您的隱私安全</p>
              <a
                href="https://ko-fi.com/justinlee2061"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-blue-500 transition-colors mt-1 inline-block"
              >
                ☕ 支持這個免費工具
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="mr-1" role="img" aria-label="勾選">✅</span>
                開源軟體
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <span className="mr-1" role="img" aria-label="地球">🌐</span>
                PWA 支援
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA - 只在手機上且有圖片時顯示 */}
      {selectedFile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 p-3 flex gap-2 shadow-lg">
          <button
            onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'apply_watermark'); applyWatermark(); }}
            disabled={isProcessing}
            aria-label={isProcessing ? "處理中，請稍候" : "套用浮水印"}
            className="flex-1 bg-primary text-white py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? "⏳ 處理中..." : "🖌️ 套用浮水印"}
          </button>
          <button
            onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'download_image'); downloadImage(); }}
            disabled={!processedImage}
            aria-label="下載處理後的圖片"
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            📥 下載
          </button>
        </div>
      )}
    </div>
  );
}
