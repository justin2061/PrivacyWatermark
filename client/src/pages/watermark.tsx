import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileUploadZone } from "@/components/watermark/FileUploadZone";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { CanvasPreview } from "@/components/watermark/CanvasPreview";
import { ProcessingStatus } from "@/components/watermark/ProcessingStatus";
import { useWatermark } from "@/hooks/useWatermark";
import { Shield, Lock, Zap } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50">
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
                <p className="text-xs text-gray-500">安全的本地端圖片處理</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="text-green-600 w-4 h-4" aria-hidden="true" />
              <span className="text-sm text-gray-600">100% 本地處理</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Notice */}
        <Card className="bg-blue-50 border-blue-200 p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="text-primary mt-0.5 w-5 h-5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">隱私安全保護</h3>
              <p className="text-sm text-blue-800">
                您的圖片完全在瀏覽器中處理，不會上傳到任何伺服器。適合處理證件、機密文件等敏感資料。
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <FileUploadZone 
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
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
                  onClick={applyWatermark}
                  disabled={!selectedFile || isProcessing}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2">🖌️</span>
                  {isProcessing ? "處理中..." : "套用浮水印"}
                </button>
                
                <button
                  onClick={downloadImage}
                  disabled={!processedImage}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2">📥</span>
                  下載圖片
                </button>
                
                <button
                  onClick={resetCanvas}
                  disabled={!selectedFile}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2">🔄</span>
                  重新開始
                </button>
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
              <p className="text-sm text-gray-600">圖片完全在本地處理，不會上傳到伺服器，保護您的敏感資料</p>
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
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2025 證件浮水印工具 - 保護您的隱私安全</p>
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
    </div>
  );
}
