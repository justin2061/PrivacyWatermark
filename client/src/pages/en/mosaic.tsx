import { useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { trackToolUseStart } from "@/lib/analytics";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { useMosaic, type MaskType } from "@/hooks/useMosaic";
import {
  CheckCircle,
  Download,
  Grid2x2,
  Lock,
  MousePointerClick,
  RefreshCw,
  Trash2,
  Undo2,
  Upload,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

const MASK_OPTIONS: { value: MaskType; label: string; desc: string }[] = [
  { value: "mosaic", label: "Mosaic", desc: "Pixelate" },
  { value: "blur", label: "Blur", desc: "Soften" },
  { value: "solid", label: "Solid Box", desc: "Full cover" },
];

export default function MosaicEnPage() {
  const m = useMosaic({
    invalidType: "Please choose an image file (JPG, PNG, WebP, BMP, GIF)",
    loadFailed: "Failed to load image",
  });

  useEffect(() => {
    return setPageSeo({
      title: "Image Mosaic & Blur Tool - Privacy First | ImageMarker",
      description:
        "Free online mosaic and blur tool. Drag to select an area and pixelate, blur a face, or add a solid box over license plates, IDs and sensitive info. 100% local in-browser processing — no uploads. Works on mobile with touch.",
      canonical: "https://imagemarker.app/en/mosaic",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "Image Mosaic & Blur Tool — ImageMarker",
        description:
          "Free online mosaic and blur tool. Drag to select an area and pixelate, blur a face online, or add a solid box over sensitive info. 100% local in-browser processing — no uploads.",
        url: "https://imagemarker.app/en/mosaic",
        inLanguage: "en",
        featureList: [
          "100% local in-browser processing — no uploads",
          "Drag to select areas — works with mouse and touch",
          "Three modes: mosaic, gaussian blur, solid color box",
          "Adjustable mosaic pixel size and blur strength",
          "Multiple regions, each individually removable",
        ],
      }),
    });
  }, []);

  const hasResult = m.regions.length > 0;

  const onPickFile = (file?: File | null) => {
    if (file) trackToolUseStart("mosaic");
    m.onPickFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="en" current="mosaic" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="en" className="mb-8" />

        {!m.selectedFile ? (
          <Card className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Image Mosaic / Blur Tool
            </h1>
            <div
              onDrop={(e) => {
                e.preventDefault();
                onPickFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => m.fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  m.fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload area, click or drag and drop a file"
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Upload className="text-gray-400 w-12 h-12 mb-4 mx-auto" aria-hidden="true" />
              <p className="text-gray-600 mb-2">Drag and drop an image here, or click to select</p>
              <p className="text-sm text-gray-600 mb-4">Supports JPG, PNG, WebP, BMP, GIF</p>
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose File
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              After uploading, drag on the image to mosaic or blur faces, license plates and IDs. Everything runs in your browser.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Main: canvas */}
            <div className="space-y-4 order-2 lg:order-1">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 min-w-0">
                    <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium truncate">{m.selectedFile.name}</span>
                  </div>
                  {m.origSize && (
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {m.origSize.w}×{m.origSize.h}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <MousePointerClick className="w-4 h-4" aria-hidden="true" />
                  <span>Press and drag on the image to select the area to mask (you can add several)</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 flex justify-center">
                  <canvas
                    ref={m.viewCanvasRef}
                    onPointerDown={m.onPointerDown}
                    onPointerMove={m.onPointerMove}
                    onPointerUp={m.onPointerUp}
                    className="max-w-full cursor-crosshair"
                    style={{ touchAction: "none" }}
                    aria-label="Image canvas — drag to select a region to mask"
                  />
                </div>
              </Card>
            </div>

            {/* Sidebar: tools */}
            <div className="space-y-4 order-1 lg:order-2">
              <Card className="p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">Mask Type</h2>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {MASK_OPTIONS.map((opt) => {
                    const active = m.maskType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => m.setMaskType(opt.value)}
                        className={`py-2 px-1 rounded-lg text-sm border transition-colors ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                        }`}
                      >
                        {opt.label}
                        <span className="block text-[10px] opacity-70">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {m.maskType === "mosaic" && (
                  <div className="mb-1">
                    <label htmlFor="pixelSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Mosaic strength (block size): {m.pixelSize}px
                    </label>
                    <input
                      id="pixelSize"
                      type="range"
                      min={4}
                      max={60}
                      value={m.pixelSize}
                      onChange={(e) => m.setPixelSize(Number(e.target.value))}
                      style={{ "--range-progress": `${((m.pixelSize - 4) / 56) * 100}%` } as React.CSSProperties}
                    />
                    <p className="text-xs text-gray-500 mt-1">Larger values make bigger, blockier squares.</p>
                  </div>
                )}

                {m.maskType === "blur" && (
                  <div className="mb-1">
                    <label htmlFor="blur" className="block text-sm font-medium text-gray-700 mb-2">
                      Blur strength: {m.blurStrength}px
                    </label>
                    <input
                      id="blur"
                      type="range"
                      min={2}
                      max={40}
                      value={m.blurStrength}
                      onChange={(e) => m.setBlurStrength(Number(e.target.value))}
                      style={{ "--range-progress": `${((m.blurStrength - 2) / 38) * 100}%` } as React.CSSProperties}
                    />
                    <p className="text-xs text-gray-500 mt-1">Larger values increase the blur.</p>
                  </div>
                )}

                {m.maskType === "solid" && (
                  <div className="mb-1">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Box Color</span>
                    <div className="flex items-center gap-2">
                      {["#000000", "#ffffff"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => m.setSolidColor(c)}
                          className={`w-8 h-8 rounded-lg border-2 ${
                            m.solidColor.toLowerCase() === c ? "border-primary" : "border-gray-300"
                          }`}
                          style={{ backgroundColor: c }}
                          aria-label={c === "#000000" ? "Black" : "White"}
                        />
                      ))}
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="color"
                          value={m.solidColor}
                          onChange={(e) => m.setSolidColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-gray-300 bg-white"
                          aria-label="Custom box color"
                        />
                        Custom
                      </label>
                    </div>
                  </div>
                )}
              </Card>

              {/* Masked region list */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900">
                    Masked Regions ({m.regions.length})
                  </h2>
                  {hasResult && (
                    <button
                      type="button"
                      onClick={m.clearRegions}
                      className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                {!hasResult ? (
                  <p className="text-sm text-gray-500">No regions selected yet.</p>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-y-auto">
                    {m.regions.map((r, i) => {
                      const typeLabel =
                        MASK_OPTIONS.find((o) => o.value === r.type)?.label || r.type;
                      return (
                        <li
                          key={r.id}
                          className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <span className="text-sm text-gray-700">
                            #{i + 1} {typeLabel}
                            <span className="text-xs text-gray-400 ml-1">
                              {r.w}×{r.h}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => m.removeRegion(r.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            aria-label={`Delete region ${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {hasResult && (
                  <button
                    type="button"
                    onClick={m.undoLast}
                    className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-lg py-2 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Undo2 className="w-4 h-4" aria-hidden="true" />
                    Undo last
                  </button>
                )}
              </Card>

              {/* Actions */}
              <Card className="p-5">
                <div className="space-y-3">
                  <button
                    onClick={m.download}
                    disabled={!hasResult}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    Download Image
                  </button>
                  <button
                    onClick={m.reset}
                    className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                    Start Over
                  </button>
                  {hasResult && <DownloadSuccess tool="mosaic" lang="en" imageCount={1} className="mt-1" />}
                </div>
              </Card>
            </div>
          </div>
        )}

        <input
          ref={m.fileInputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => onPickFile(e.target.files?.[0])}
          aria-label="Select image file"
        />

        {/* Features */}
        <section className="mt-12">
          <h2 className="sr-only">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">100% Local</h3>
              <p className="text-sm text-gray-600">
                Your images never leave your browser. No server, no uploads — safe for photos with personal data.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Grid2x2 className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Three Mask Modes</h3>
              <p className="text-sm text-gray-600">
                Mosaic, gaussian blur or a solid color box — with adjustable strength for any masking need.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <MousePointerClick className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Drag to Mask</h3>
              <p className="text-sm text-gray-600">
                Select regions right on the image, with touch support, and remove any region individually.
              </p>
            </Card>
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Mosaic and blur images online, privately
          </h2>
          <p>
            Before sharing a photo you often need to hide a face, a license plate, a house number, an ID number or
            personal info in a chat screenshot. This mosaic tool lets you drag right on the image to select an area and
            apply a mosaic (pixelation), gaussian blur or a solid color box to cover sensitive content in seconds.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% local processing, no uploads
          </h2>
          <p>
            Unlike many online mosaic services that upload your images to a server, this tool runs entirely in your
            browser using the Canvas API. Your images are never uploaded, stored or sent to any third party — ideal for
            IDs, contracts and any photo containing personal information.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Mosaic, blur or solid box?
          </h2>
          <p>
            Mosaic pixelates the region into blocks, balancing privacy and looks. Gaussian blur softens the area and is
            great to blur a face online or a busy background. A solid box fully covers the area — the safest, non-reversible
            option for ID numbers and anything that must never leak. Adjust the mosaic block size and blur strength to taste.
          </p>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 ImageMarker — Protect your privacy
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/en/" className="text-sm text-primary hover:underline">
                Watermark Tool
              </Link>
              <Link href="/en/exif-clean" className="text-sm text-primary hover:underline">
                EXIF Cleaner
              </Link>
              <Link href="/en/resize" className="text-sm text-primary hover:underline">
                Image Resizer
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
