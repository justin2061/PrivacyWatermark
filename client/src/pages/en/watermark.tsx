import { Link } from "wouter";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { FileUploadZone } from "@/components/watermark/FileUploadZone";
import { WatermarkControls } from "@/components/watermark/WatermarkControls";
import { CanvasPreview } from "@/components/watermark/CanvasPreview";
import { ProcessingStatus } from "@/components/watermark/ProcessingStatus";
import { KofiSupport } from "@/components/KofiSupport";
import { useWatermark } from "@/hooks/useWatermark";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { Lock, Zap, Eraser } from "lucide-react";

export default function WatermarkEnPage() {
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
      title:
        "Free Online Watermark Tool | Add Watermark to Photos — ImageMarker",
      description:
        "Free online watermark tool for photos and documents. Add text or logo watermarks with full privacy — 100% browser-based, no uploads. Perfect for photographers, designers and creators.",
      canonical: "https://imagemarker.app/en/",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "Image Watermark Tool — ImageMarker",
        description:
          "Free online watermark tool for photos and documents. Add text or logo watermarks with full privacy — 100% browser-based, no uploads. Perfect for photographers, designers and creators.",
        url: "https://imagemarker.app/en/",
        inLanguage: "en",
        featureList: [
          "100% local in-browser processing — no uploads",
          "Add text or logo watermarks to photos and documents",
          "Live preview with one-click download",
          "Works offline as an installable PWA",
        ],
      }),
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="en" current="watermark" />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Notice — compact trust badge */}
        <PrivacyBanner lang="en" className="mb-8" />

        {/* Mobile: preview pinned to the top, settings scroll below; desktop keeps two columns.
            All three blocks are direct grid children so the sticky preview's containing block
            spans the full settings height and stays pinned while scrolling. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Panel - Controls */}
          <div className="space-y-6 order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <FileUploadZone
              selectedFile={selectedFile}
              onFileSelect={(file) => { if (typeof gtag !== 'undefined') gtag('event', 'upload_image'); handleFileSelect(file); }}
              lang="en"
            />

            <WatermarkControls
              settings={watermarkSettings}
              onSettingsChange={updateWatermarkSettings}
              disabled={!selectedFile}
              lang="en"
            />

            {/* Action Buttons */}
            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'apply_watermark'); applyWatermark(); }}
                  disabled={!selectedFile || isProcessing}
                  aria-label={isProcessing ? "Processing, please wait" : "Apply watermark"}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">🖌️</span>
                  {isProcessing ? "Processing..." : "Apply Watermark"}
                </button>

                <button
                  onClick={() => { if (typeof gtag !== 'undefined') gtag('event', 'download_image'); downloadImage(); }}
                  disabled={!processedImage}
                  aria-label="Download processed image"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">📥</span>
                  Download Image
                </button>

                <button
                  onClick={resetCanvas}
                  disabled={!selectedFile}
                  aria-label="Start over and clear the current image"
                  className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2" aria-hidden="true">🔄</span>
                  Start Over
                </button>

                <KofiSupport lang="en" className="mt-2" />
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview Canvas (revealed after upload to keep first screen clean) */}
          {selectedFile ? (
            <>
              {/* Mobile: preview sticks to the top (top-16 clears the fixed header) so the
                  live preview stays visible while scrolling settings; lg:static on desktop */}
              <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 sticky top-16 z-30 -mx-4 px-4 pt-2 pb-3 bg-gray-50 shadow-sm sm:-mx-6 sm:px-6 lg:static lg:z-auto lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:bg-transparent lg:shadow-none">
                <CanvasPreview
                  canvasRef={canvasRef}
                  selectedFile={selectedFile}
                  processedImage={processedImage}
                  lang="en"
                />
              </div>

              {/* Processing status + success CTA: after settings on mobile, under preview on desktop */}
              <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 space-y-6">
                <ProcessingStatus
                  selectedFile={selectedFile}
                  processedImage={processedImage}
                  progress={progress}
                  lang="en"
                />
                {processedImage && <KofiSupport variant="success" lang="en" />}
              </div>
            </>
          ) : (
            <div className="hidden lg:flex items-center justify-center lg:col-start-2 lg:row-start-1">
              <div className="text-center text-gray-400">
                <span className="text-5xl mb-3 block" role="img" aria-hidden="true">🖼️</span>
                <p className="text-sm">Preview and processing status will appear here after you upload an image</p>
              </div>
            </div>
          )}
        </div>

        {/* All tools hub */}
        <ToolsShowcase lang="en" current="watermark" />

        {/* Features Section */}
        <section className="mt-12" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary text-3xl mb-3 mx-auto w-8 h-8" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">Images are processed entirely on your device and never uploaded — your photos and documents stay private.</p>
            </Card>

            <Card className="p-6 text-center">
              <span className="text-primary text-3xl mb-3 block" role="img" aria-label="Lightning icon">⚡</span>
              <h3 className="font-semibold text-gray-900 mb-2">Works Offline</h3>
              <p className="text-sm text-gray-600">Installable as a PWA — add it to your home screen and use it without an internet connection.</p>
            </Card>

            <Card className="p-6 text-center">
              <Zap className="text-primary text-3xl mb-3 mx-auto w-8 h-8" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600">Live preview of your watermark and one-click download for a smooth, instant workflow.</p>
            </Card>
          </div>
        </section>

        {/* EXIF cleaner entry */}
        <section className="mt-12" aria-labelledby="exif-cta-heading">
          <Card className="p-6 md:p-8 bg-blue-50 border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start space-x-3">
                <Eraser className="text-primary mt-1 w-8 h-8 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h2 id="exif-cta-heading" className="font-semibold text-gray-900 mb-1">
                    Photos hide GPS location and camera data — remove EXIF in one click
                  </h2>
                  <p className="text-sm text-gray-600">
                    Before sharing a photo, strip out the GPS coordinates, capture time and camera model stored in its EXIF metadata. Also 100% local — nothing is uploaded.
                  </p>
                </div>
              </div>
              <Link
                href="/en/exif-clean"
                className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-white py-2.5 px-5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Open EXIF Cleaner →
              </Link>
            </div>
          </Card>
        </section>

        {/* Latest Articles */}
        <section className="mt-12" aria-labelledby="articles-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="articles-heading" className="font-semibold text-gray-900">
              Latest Articles
            </h2>
            <Link
              href="/en/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/en/blog/protect-photos-online"
              className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">
                How to Protect Your Photos Online
              </h3>
              <p className="text-sm text-gray-600">
                A complete guide to watermarks, metadata and copyright for photographers.
              </p>
            </Link>
            <Link
              href="/en/blog/remove-exif-data"
              className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">
                Why You Should Remove EXIF Data
              </h3>
              <p className="text-sm text-gray-600">
                Your photos hide GPS location and device data. Here&apos;s how to strip it.
              </p>
            </Link>
            <Link
              href="/en/blog/digital-identity-protection"
              className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">
                Digital Identity Protection
              </h3>
              <p className="text-sm text-gray-600">
                7 practical steps to keep your documents and identity safe online.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2026 Image Watermark Tool — Protecting your privacy</p>
              <KofiSupport lang="en" className="mt-1" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="mr-1" role="img" aria-label="Check">✅</span>
                Open Source
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <span className="mr-1" role="img" aria-label="Globe">🌐</span>
                PWA Ready
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
