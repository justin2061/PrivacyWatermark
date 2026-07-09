import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { KofiSupport } from "@/components/KofiSupport";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import {
  useBatchWatermark,
  MAX_FILES,
} from "@/hooks/useBatchWatermark";
import {
  Upload,
  X,
  CheckCircle,
  Eye,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function BatchPage() {
  const {
    images,
    selectedImage,
    selectedId,
    watermarkSettings,
    canvasRef,
    isProcessing,
    processedCount,
    allProcessed,
    error,
    addFiles,
    removeFile,
    selectImage,
    updateWatermarkSettings,
    applyAll,
    downloadZip,
    reset,
  } = useBatchWatermark();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return setPageSeo({
      title: "批次浮水印工具 — 一次處理多張證件影本，100% 本機處理",
      description:
        "免費線上批次浮水印工具，一次上傳最多 20 張圖片，套用相同的浮水印設定，再打包成 ZIP 一鍵下載。所有圖片 100% 在你的瀏覽器處理，不會上傳到任何伺服器。",
      canonical: "https://imagemarker.app/batch",
      jsonLd: webAppSchema({
        name: "批次浮水印工具 — ImageMarker",
        description:
          "免費線上批次浮水印工具，一次上傳最多 20 張圖片，套用相同的浮水印設定，再打包成 ZIP 一鍵下載。所有圖片 100% 在你的瀏覽器處理，不會上傳到任何伺服器。",
        url: "https://imagemarker.app/batch",
        featureList: [
          "100% 瀏覽器本機處理，圖片不上傳",
          "一次最多批次處理 20 張圖片",
          "同一組文字＋Logo 浮水印設定套用到所有圖片",
          "支援 Logo／品牌圖片浮水印，可與文字浮水印同時使用",
          "處理進度即時顯示，完成後打包 ZIP 一鍵下載",
          "支援 JPG、PNG 格式，每張最大 10MB",
        ],
      }),
    });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      addFiles(event.target.files);
    }
    // reset so selecting the same file again still fires onChange
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const hasImages = images.length > 0;
  const progressPercent =
    images.length > 0 ? Math.round((processedCount / images.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="zh" current="batch" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Notice — 精簡信任標誌 */}
        <PrivacyBanner lang="zh" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload + Controls + Actions */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">上傳圖片</h2>
                <span className="text-sm text-gray-500">
                  {images.length} / {MAX_FILES}
                </span>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                aria-label="上傳圖片區域，點擊或拖放多個檔案到此處"
              >
                <Upload
                  className="text-gray-400 text-4xl mb-4 mx-auto w-12 h-12"
                  aria-hidden="true"
                />
                <p className="text-gray-600 mb-2">將多張圖片拖放到此處，或點擊選擇檔案</p>
                <p className="text-sm text-gray-600 mb-4">
                  支援 JPG、PNG 格式，最多 {MAX_FILES} 張，每張最大 10MB
                </p>
                <button
                  type="button"
                  aria-label="選擇圖片檔案"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  選擇檔案
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onChange={handleFileChange}
                className="hidden"
                aria-label="選擇圖片檔案"
              />

              {error && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              {/* Uploaded file list */}
              {hasImages && (
                <ul className="mt-4 space-y-2 max-h-64 overflow-y-auto" aria-label="已上傳圖片列表">
                  {images.map((img) => (
                    <li
                      key={img.id}
                      className={`flex items-center gap-3 p-2 rounded-lg border transition-colors cursor-pointer ${
                        img.id === selectedId
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => selectImage(img.id)}
                    >
                      <img
                        src={img.url}
                        alt={img.file.name}
                        className="w-10 h-10 object-cover rounded flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {img.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(img.file.size)}
                        </p>
                      </div>
                      {img.processed && (
                        <CheckCircle
                          className="w-4 h-4 text-green-600 flex-shrink-0"
                          aria-label="已套用浮水印"
                        />
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(img.id);
                        }}
                        aria-label={`移除 ${img.file.name}`}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Watermark Settings (reused) */}
            <WatermarkControls
              settings={watermarkSettings}
              onSettingsChange={updateWatermarkSettings}
              disabled={!hasImages}
            />

            {/* Action Buttons */}
            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={applyAll}
                  disabled={!hasImages || isProcessing}
                  aria-label={isProcessing ? "處理中，請稍候" : "全部套用浮水印"}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <span className="mr-2" aria-hidden="true">
                      ✨
                    </span>
                  )}
                  {isProcessing
                    ? `處理中... (${processedCount}/${images.length})`
                    : "全部套用浮水印"}
                </button>

                {isProcessing && (
                  <div className="w-full bg-gray-200 rounded-full h-2" aria-hidden="true">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}

                <button
                  onClick={downloadZip}
                  disabled={!allProcessed || isProcessing}
                  aria-label="下載全部（ZIP）"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">
                    📦
                  </span>
                  下載全部（ZIP）
                </button>

                <button
                  onClick={reset}
                  disabled={!hasImages}
                  aria-label="重新開始，清除所有圖片"
                  className="w-full bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
                >
                  <span className="mr-2" aria-hidden="true">
                    🔄
                  </span>
                  重新開始
                </button>

                <KofiSupport className="mt-2" />

                {allProcessed && (
                  <KofiSupport variant="success" className="mt-4" />
                )}
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">預覽畫面</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>即時預覽</span>
                </div>
              </div>

              {/* Big preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
                {!selectedImage ? (
                  <div className="text-center">
                    <span className="text-gray-400 text-6xl mb-4 block">📷</span>
                    <p className="text-gray-500 mb-2">上傳圖片後會在此處顯示預覽</p>
                    <p className="text-sm text-gray-400">點擊縮圖可切換查看不同圖片</p>
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[400px] object-contain"
                  />
                )}
              </div>

              {selectedImage && (
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span className="truncate mr-2">{selectedImage.file.name}</span>
                  <span className="flex-shrink-0">
                    {selectedImage.img.naturalWidth}×{selectedImage.img.naturalHeight}
                  </span>
                </div>
              )}

              {/* Thumbnail strip */}
              {hasImages && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="圖片縮圖列">
                  {images.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => selectImage(img.id)}
                      aria-label={`查看 ${img.file.name}`}
                      aria-pressed={img.id === selectedId}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        img.id === selectedId ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.file.name}
                        className="w-full h-full object-cover"
                      />
                      {img.processed && (
                        <span className="absolute bottom-0 right-0 bg-green-600 rounded-tl px-0.5">
                          <CheckCircle className="w-3 h-3 text-white" aria-hidden="true" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Privacy reminder */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-start space-x-3">
                <ImageIcon className="text-green-600 mt-0.5 w-5 h-5 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  所有圖片 100% 在你的瀏覽器處理，不會上傳到任何伺服器。處理完成後一鍵打包下載，安全又方便。
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © 2025 證件浮水印工具 - 保護您的隱私安全
              </p>
            </div>
            <Link href="/" className="text-sm text-primary font-medium hover:underline">
              ← 返回單張處理
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
