import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { ProUpsell } from "@/components/ProUpsell";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { UploadZone } from "@/components/UploadZone";
import { ActionButton } from "@/components/ActionButtons";
import { useBatchWatermark, MAX_FILES } from "@/hooks/useBatchWatermark";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { trackToolUseStart } from "@/lib/analytics";

// Show the Pro prompt past this count (free features stay unrestricted)
const FREE_IMAGE_LIMIT = 10;
import {
  X,
  CheckCircle,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function BatchEnPage() {
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
  } = useBatchWatermark("en");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [proDismissed, setProDismissed] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startedRef.current && images.length > 0) {
      startedRef.current = true;
      trackToolUseStart("batch");
    }
  }, [images.length]);

  const showProPrompt = images.length > FREE_IMAGE_LIMIT && !proDismissed;

  useEffect(() => {
    return setPageSeo({
      title:
        "Batch Watermark Tool | Add Watermarks to Multiple Photos at Once",
      description:
        "Free batch watermark tool. Add the same text or logo watermark to up to 20 images at once and download them as a ZIP. 100% browser-based — nothing is uploaded.",
      canonical: "https://imagemarker.app/en/batch",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "Batch Watermark Tool — ImageMarker",
        description:
          "Free batch watermark tool. Add the same text or logo watermark to up to 20 images at once and download them as a ZIP. 100% browser-based — nothing is uploaded.",
        url: "https://imagemarker.app/en/batch",
        inLanguage: "en",
        featureList: [
          "100% local in-browser processing — no uploads",
          "Watermark up to 20 images at once",
          "Apply the same watermark settings to every image",
          "Download all processed images as a ZIP",
          "Live per-image preview with thumbnails",
        ],
      }),
    });
  }, []);

  const hasImages = images.length > 0;
  const progressPercent =
    images.length > 0 ? Math.round((processedCount / images.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="en" current="batch" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Notice — compact trust badge */}
        <PrivacyBanner lang="en" className="mb-8" />

        {/* Past the 11th image: non-blocking Pro prompt (dismissible) */}
        {showProPrompt && (
          <ProUpsell
            tool="batch"
            lang="en"
            imageCount={images.length}
            onClose={() => setProDismissed(true)}
            className="mb-8"
          />
        )}

        {/* Mobile: sticky preview on top, settings scroll below; desktop keeps two columns.
            All three blocks are direct grid children so the sticky containing block spans the full height. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload + Controls + Actions (below preview on mobile, left column on desktop) */}
          <div className="space-y-6 order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2">
            {/* Upload Zone */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upload Images
                </h2>
                <span className="text-sm text-gray-500">
                  {images.length} / {MAX_FILES}
                </span>
              </div>

              <UploadZone
                accept="image/jpeg,image/png"
                multiple
                onFiles={(files) => addFiles(files)}
                title="Drag and drop multiple images here, or click to select files"
                description={`Supports JPG and PNG, up to ${MAX_FILES} files, 10MB each`}
                buttonLabel="Choose Files"
                ariaLabel="Upload area, click or drop multiple files here"
                inputAriaLabel="Select image files"
                buttonAriaLabel="Select image files"
                inputRef={fileInputRef}
              />

              {error && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              {/* Uploaded file list */}
              {hasImages && (
                <ul
                  className="mt-4 space-y-2 max-h-64 overflow-y-auto"
                  aria-label="Uploaded images"
                >
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
                          aria-label="Watermark applied"
                        />
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(img.id);
                        }}
                        aria-label={`Remove ${img.file.name}`}
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
              lang="en"
            />

            {/* Action Buttons */}
            <Card className="p-6">
              <div className="space-y-3">
                <ActionButton
                  variant="primary"
                  onClick={applyAll}
                  disabled={!hasImages || isProcessing}
                  ariaLabel={isProcessing ? "Processing, please wait" : "Apply watermark to all"}
                  icon={
                    <span className="mr-2" aria-hidden="true">
                      ✨
                    </span>
                  }
                >
                  {isProcessing
                    ? `Processing... (${processedCount}/${images.length})`
                    : "Apply Watermark to All"}
                </ActionButton>

                {isProcessing && (
                  <div className="w-full bg-gray-200 rounded-full h-2" aria-hidden="true">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}

                <ActionButton
                  variant="success"
                  onClick={downloadZip}
                  disabled={!allProcessed || isProcessing}
                  ariaLabel="Download all as ZIP"
                  icon={
                    <span className="mr-2" aria-hidden="true">
                      📦
                    </span>
                  }
                >
                  Download All (ZIP)
                </ActionButton>

                <ActionButton
                  variant="neutral"
                  onClick={reset}
                  disabled={!hasImages}
                  ariaLabel="Start over and clear all images"
                  icon={
                    <span className="mr-2" aria-hidden="true">
                      🔄
                    </span>
                  }
                >
                  Start Over
                </ActionButton>

                {allProcessed && (
                  <DownloadSuccess
                    tool="batch"
                    lang="en"
                    imageCount={images.length}
                    className="mt-4"
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Preview (sticky on top for mobile so it stays visible while adjusting settings; right column on desktop) */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 sticky top-16 z-30 -mx-4 px-4 pt-2 pb-3 bg-gray-50 shadow-sm sm:-mx-6 sm:px-6 lg:static lg:z-auto lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:bg-transparent lg:shadow-none">
            <Card className="p-3 sm:p-6">
              {/* Header hidden on mobile to shrink the sticky area */}
              <div className="hidden sm:flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>Live preview</span>
                </div>
              </div>

              {/* Big preview (fixed ~120px on mobile so the sticky bar doesn't cover the settings below) */}
              <div className="border border-gray-200 rounded-lg p-2 sm:p-4 bg-gray-50 h-[120px] sm:h-auto sm:min-h-[400px] flex items-center justify-center">
                {!selectedImage ? (
                  <div className="text-center">
                    <span className="text-gray-400 text-3xl sm:text-6xl sm:mb-4 block">📷</span>
                    <p className="text-gray-500 mb-2 hidden sm:block">
                      Upload images and the preview will appear here
                    </p>
                    <p className="text-sm text-gray-400 hidden sm:block">
                      Click a thumbnail to switch between images
                    </p>
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[104px] sm:max-h-[400px] object-contain"
                  />
                )}
              </div>

              {/* File name/size hidden on mobile */}
              {selectedImage && (
                <div className="mt-4 hidden sm:flex justify-between text-sm text-gray-500">
                  <span className="truncate mr-2">{selectedImage.file.name}</span>
                  <span className="flex-shrink-0">
                    {selectedImage.img.naturalWidth}×
                    {selectedImage.img.naturalHeight}
                  </span>
                </div>
              )}

              {/* Thumbnail strip (hidden on mobile; switch preview via the upload list instead) */}
              {hasImages && (
                <div
                  className="mt-4 hidden sm:flex gap-2 overflow-x-auto pb-1"
                  aria-label="Image thumbnails"
                >
                  {images.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => selectImage(img.id)}
                      aria-label={`View ${img.file.name}`}
                      aria-pressed={img.id === selectedId}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        img.id === selectedId
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.file.name}
                        className="w-full h-full object-cover"
                      />
                      {img.processed && (
                        <span className="absolute bottom-0 right-0 bg-green-600 rounded-tl px-0.5">
                          <CheckCircle
                            className="w-3 h-3 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Privacy reminder (bottom on mobile, right column lower on desktop) */}
          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-start space-x-3">
                <ImageIcon className="text-green-600 mt-0.5 w-5 h-5 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  Every image is processed 100% in your browser and is never
                  uploaded to any server. When done, download them all in one
                  click — safe and convenient.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {allProcessed && (
          <ToolRecommendations current="batch" lang="en" className="mt-12" />
        )}
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
