import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { KofiSupport } from "@/components/KofiSupport";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { useBatchWatermark, MAX_FILES } from "@/hooks/useBatchWatermark";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import {
  Shield,
  Upload,
  X,
  ArrowLeft,
  CheckCircle,
  Eye,
  Image as ImageIcon,
  Languages,
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      addFiles(event.target.files);
    }
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg" role="img" aria-label="Camera icon">
                  📷
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Batch Watermark
                </h1>
                <p className="text-xs text-gray-600">
                  Process multiple images at once
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/en"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back to single image</span>
              </Link>
              <a
                href="/batch"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                aria-label="切換到中文"
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span>中文</span>
              </a>
              <div className="flex items-center space-x-2">
                <Shield className="text-green-600 w-4 h-4" aria-hidden="true" />
                <span className="text-sm text-gray-600">100% Local</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <Card className="bg-blue-50 border-blue-200 p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="text-primary mt-0.5 w-5 h-5" />
            <div>
              <h2 className="font-medium text-blue-900 mb-1">
                Batch Watermark — Process Many Images at Once
              </h2>
              <p className="text-sm text-blue-800">
                Upload up to {MAX_FILES} images at a time, apply the same
                watermark settings, then download them all as a ZIP. Every image
                is processed 100% in your browser and is never uploaded to any
                server.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload + Controls + Actions */}
          <div className="space-y-6">
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
                aria-label="Upload area, click or drop multiple files here"
              >
                <Upload
                  className="text-gray-400 text-4xl mb-4 mx-auto w-12 h-12"
                  aria-hidden="true"
                />
                <p className="text-gray-600 mb-2">
                  Drag and drop multiple images here, or click to select files
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Supports JPG and PNG, up to {MAX_FILES} files, 10MB each
                </p>
                <button
                  type="button"
                  aria-label="Select image files"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose Files
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onChange={handleFileChange}
                className="hidden"
                aria-label="Select image files"
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
                <button
                  onClick={applyAll}
                  disabled={!hasImages || isProcessing}
                  aria-label={isProcessing ? "Processing, please wait" : "Apply watermark to all"}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">
                    ✨
                  </span>
                  {isProcessing
                    ? `Processing... (${processedCount}/${images.length})`
                    : "Apply Watermark to All"}
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
                  aria-label="Download all as ZIP"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">
                    📦
                  </span>
                  Download All (ZIP)
                </button>

                <button
                  onClick={reset}
                  disabled={!hasImages}
                  aria-label="Start over and clear all images"
                  className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">
                    🔄
                  </span>
                  Start Over
                </button>

                <KofiSupport lang="en" className="mt-2" />

                {allProcessed && (
                  <KofiSupport variant="success" lang="en" className="mt-4" />
                )}
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>Live preview</span>
                </div>
              </div>

              {/* Big preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
                {!selectedImage ? (
                  <div className="text-center">
                    <span className="text-gray-400 text-6xl mb-4 block">📷</span>
                    <p className="text-gray-500 mb-2">
                      Upload images and the preview will appear here
                    </p>
                    <p className="text-sm text-gray-400">
                      Click a thumbnail to switch between images
                    </p>
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
                    {selectedImage.img.naturalWidth}×
                    {selectedImage.img.naturalHeight}
                  </span>
                </div>
              )}

              {/* Thumbnail strip */}
              {hasImages && (
                <div
                  className="mt-4 flex gap-2 overflow-x-auto pb-1"
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

            {/* Privacy reminder */}
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
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © 2026 Image Watermark Tool — Protecting your privacy
              </p>
            </div>
            <Link
              href="/en"
              className="text-sm text-primary font-medium hover:underline"
            >
              ← Back to single image
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
