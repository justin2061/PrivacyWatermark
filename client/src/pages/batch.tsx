import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { ProUpsell } from "@/components/ProUpsell";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { trackToolUseStart } from "@/lib/analytics";
import {
  useBatchWatermark,
  MAX_FILES,
} from "@/hooks/useBatchWatermark";

// 超過此張數即顯示 Pro 提示（免費功能不受限，只是提示大量處理的 Pro 版）
const FREE_IMAGE_LIMIT = 10;
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
  const [proDismissed, setProDismissed] = useState(false);
  const startedRef = useRef(false);

  // tool_use_start：第一次有圖片進來時送一次
  useEffect(() => {
    if (!startedRef.current && images.length > 0) {
      startedRef.current = true;
      trackToolUseStart("batch");
    }
  }, [images.length]);

  const showProPrompt = images.length > FREE_IMAGE_LIMIT && !proDismissed;

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
        {/* 桌面版：Header 下方一個固定高度的 app 版面 —— 隱私條 + 工具區剛好填滿一個視窗高度，
            工具區內部各自捲動、操作全程不需捲動整頁；下方內容照常在其下方流動。
            所有 app 版面樣式一律用 lg: 前綴，手機版完全維持原本排版不受影響。 */}
        <div className="lg:h-[calc(100vh-4rem)] lg:-mt-8 lg:pt-4 lg:flex lg:flex-col lg:overflow-hidden">
        <PrivacyBanner lang="zh" className="mb-8 lg:mb-4 lg:flex-shrink-0" />

        {/* 第 11 張以上：非阻斷式 Pro 提示（可關閉，不影響免費操作） */}
        {showProPrompt && (
          <ProUpsell
            tool="batch"
            lang="zh"
            imageCount={images.length}
            onClose={() => setProDismissed(true)}
            className="mb-8 lg:mb-4 lg:flex-shrink-0"
          />
        )}

        {/* 手機版：預覽置頂 sticky、設定在下可捲動；桌面維持左右兩欄。
            三個區塊都是 grid 的直接子元素，sticky 的包含區塊才會涵蓋整個設定區高度。
            桌面：grid 以 flex-1 填滿 app 版面剩餘高度，rows 為 [預覽 1fr / 隱私提示 auto]。 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 lg:flex-1 lg:min-h-0 lg:grid-rows-[minmax(0,1fr)_auto]">
          {/* Left Panel - Upload + Controls + Actions（手機在預覽下方、桌面左欄滿高、內部捲動、按鈕釘底） */}
          <div className="space-y-6 order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:h-full lg:min-h-0 lg:flex lg:flex-col lg:space-y-0 lg:gap-6">
            {/* 桌面：這一塊（上傳 + 設定）內部捲動；手機維持原本區塊流 */}
            <div className="space-y-6 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 lg:-mr-2">
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
            </div>

            {/* Action Buttons（桌面釘在左欄底部） */}
            <Card className="p-6 lg:flex-shrink-0">
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

                {allProcessed && (
                  <DownloadSuccess
                    tool="batch"
                    lang="zh"
                    imageCount={images.length}
                    className="mt-4"
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Preview（手機置頂 sticky，隨設定調整即時可見；桌面右欄上方） */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 sticky top-16 z-30 -mx-4 px-4 pt-2 pb-3 bg-gray-50 shadow-sm sm:-mx-6 sm:px-6 lg:static lg:z-auto lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:bg-transparent lg:shadow-none lg:min-h-0 lg:overflow-y-auto">
            <Card className="p-3 sm:p-6">
              {/* 標題列在手機隱藏，省下 sticky 高度 */}
              <div className="hidden sm:flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">預覽畫面</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>即時預覽</span>
                </div>
              </div>

              {/* Big preview（手機固定 ~120px 小高度，sticky 不佔滿螢幕、下方設定看得到） */}
              <div className="border border-gray-200 rounded-lg p-2 sm:p-4 bg-gray-50 h-[120px] sm:h-auto sm:min-h-[400px] flex items-center justify-center">
                {!selectedImage ? (
                  <div className="text-center">
                    <span className="text-gray-400 text-3xl sm:text-6xl sm:mb-4 block">📷</span>
                    <p className="text-gray-500 mb-2 hidden sm:block">上傳圖片後會在此處顯示預覽</p>
                    <p className="text-sm text-gray-400 hidden sm:block">點擊縮圖可切換查看不同圖片</p>
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[104px] sm:max-h-[400px] object-contain"
                  />
                )}
              </div>

              {/* 檔名/尺寸資訊在手機隱藏 */}
              {selectedImage && (
                <div className="mt-4 hidden sm:flex justify-between text-sm text-gray-500">
                  <span className="truncate mr-2">{selectedImage.file.name}</span>
                  <span className="flex-shrink-0">
                    {selectedImage.img.naturalWidth}×{selectedImage.img.naturalHeight}
                  </span>
                </div>
              )}

              {/* Thumbnail strip（手機隱藏，改由上傳清單切換預覽圖片） */}
              {hasImages && (
                <div className="mt-4 hidden sm:flex gap-2 overflow-x-auto pb-1" aria-label="圖片縮圖列">
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
          </div>

          {/* Privacy reminder（手機最下、桌面右欄下方） */}
          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 lg:min-h-0 lg:overflow-y-auto">
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
        </div>

        {allProcessed && (
          <ToolRecommendations current="batch" lang="zh" className="mt-12" />
        )}
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
