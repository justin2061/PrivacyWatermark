import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { UploadZone } from "@/components/UploadZone";
import { ActionButtons } from "@/components/ActionButtons";
import { trackToolUseStart, trackToolEvent } from "@/lib/analytics";
import { setPageSeo, webAppSchema, faqSchema } from "@/lib/seo";
import {
  applyPdfWatermark,
  renderTextToPng,
  type PdfWatermarkSettings,
  type WatermarkPosition,
  type FontSize,
} from "@/lib/pdfWatermarkProcessor";
import {
  CheckCircle,
  Download,
  FileText,
  Image as ImageIcon,
  Lock,
  RefreshCw,
} from "lucide-react";

const POSITIONS: { value: WatermarkPosition; label: string }[] = [
  { value: "top-left", label: "Top left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "center-left", label: "Center left" },
  { value: "center", label: "Center" },
  { value: "center-right", label: "Center right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
  { value: "repeat", label: "Tile (repeat)" },
];

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "xlarge", label: "X-Large" },
];

const TEXT_SIZE_RATIO: Record<FontSize, number> = {
  small: 0.18,
  medium: 0.28,
  large: 0.42,
  xlarge: 0.6,
};

const DEFAULT_SETTINGS: PdfWatermarkSettings = {
  textEnabled: true,
  logoEnabled: false,
  text: "CONFIDENTIAL",
  textColor: "#ff0000",
  textOpacity: 40,
  textPosition: "repeat",
  fontSize: "medium",
  logoSrc: null,
  logoOpacity: 40,
  logoSize: 25,
  logoPosition: "center",
};

const MAX_LOGO_SIZE = 5 * 1024 * 1024;
const ACCEPTED_LOGO = ["image/png", "image/jpeg", "image/svg+xml"];

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

function drawPreviewImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  position: WatermarkPosition,
  canvasW: number,
  canvasH: number,
  targetW: number,
  opacity: number
) {
  const scale = targetW / img.naturalWidth;
  const w = targetW;
  const h = img.naturalHeight * scale;
  ctx.globalAlpha = opacity;

  if (position === "repeat") {
    const gapX = w * 1.6;
    const gapY = h * 3;
    for (let y = 0; y < canvasH; y += gapY) {
      const rowOffset = (Math.floor(y / gapY) % 2) * (gapX / 2);
      for (let x = -gapX; x < canvasW + gapX; x += gapX) {
        ctx.drawImage(img, x + rowOffset, y, w, h);
      }
    }
    ctx.globalAlpha = 1;
    return;
  }

  const margin = Math.min(canvasW, canvasH) * 0.04;
  let x = (canvasW - w) / 2;
  let y = (canvasH - h) / 2;
  if (position.includes("left")) x = margin;
  if (position.includes("right")) x = canvasW - w - margin;
  if (position.includes("top")) y = margin;
  if (position.includes("bottom")) y = canvasH - h - margin;
  ctx.drawImage(img, x, y, w, h);
  ctx.globalAlpha = 1;
}

export default function PdfWatermarkEnPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<PdfWatermarkSettings>(DEFAULT_SETTINGS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number; pageCount: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return setPageSeo({
      title: "PDF Watermark Tool — Add Watermarks to PDF Online Free",
      description:
        "Free online PDF watermark tool. Add text or logo watermarks to every page of a PDF, with opacity, position and tiled repeat. 100% in-browser — your PDF never leaves your device. Perfect for IDs, contracts and confidential documents.",
      canonical: "https://imagemarker.app/en/pdf-watermark",
      locale: "en_US",
      jsonLd: [
        webAppSchema({
          name: "PDF Watermark Tool — ImageMarker",
          description:
            "Free online PDF watermark tool. Add text or logo watermarks to every page of a PDF, with opacity, position and tiled repeat. 100% in-browser — your PDF never leaves your device.",
          url: "https://imagemarker.app/en/pdf-watermark",
          inLanguage: "en",
          featureList: [
            "100% in-browser processing — your PDF is never uploaded",
            "Text and logo watermarks together, each with independent opacity",
            "Custom color, size and position, tiled repeat mode",
            "Applied automatically to every page of the PDF",
          ],
        }),
        faqSchema([
          {
            q: "Is my PDF uploaded to a server?",
            a: "No. All processing runs in your browser with pdf-lib. Your PDF is never uploaded, stored or sent to any third party.",
          },
          {
            q: "Does the watermark apply to every page?",
            a: "Yes. Your text or logo watermark is automatically applied to every page of the PDF.",
          },
          {
            q: "Can I use text and a logo at the same time?",
            a: "Yes. You can enable text and logo watermarks together, each with its own opacity, size and position.",
          },
        ]),
      ],
    });
  }, []);

  const update = (patch: Partial<PdfWatermarkSettings>) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  const textPreviewImg = useMemo(() => {
    if (!settings.textEnabled || !settings.text.trim()) return null;
    const png = renderTextToPng(settings.text, settings.textColor);
    if (!png) return null;
    const img = new Image();
    img.src = png.dataUrl;
    return img;
  }, [settings.textEnabled, settings.text, settings.textColor]);

  const logoPreviewImg = useMemo(() => {
    if (!settings.logoEnabled || !settings.logoSrc) return null;
    const img = new Image();
    img.src = settings.logoSrc;
    return img;
  }, [settings.logoEnabled, settings.logoSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 420;
    const H = 594;
    canvas.width = W;
    canvas.height = H;

    const paintBase = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
      ctx.fillStyle = "#eef0f3";
      for (let i = 0; i < 14; i++) {
        const y = 48 + i * 34;
        const lineW = i % 4 === 3 ? W * 0.4 : W * 0.72;
        ctx.fillRect(40, y, lineW, 12);
      }
    };

    const overlay = () => {
      if (textPreviewImg && textPreviewImg.complete) {
        drawPreviewImage(
          ctx,
          textPreviewImg,
          settings.textPosition,
          W,
          H,
          W * TEXT_SIZE_RATIO[settings.fontSize],
          settings.textOpacity / 100
        );
      }
      if (logoPreviewImg && logoPreviewImg.complete) {
        drawPreviewImage(
          ctx,
          logoPreviewImg,
          settings.logoPosition,
          W,
          H,
          W * (settings.logoSize / 100),
          settings.logoOpacity / 100
        );
      }
    };

    paintBase();

    const imgs = [textPreviewImg, logoPreviewImg].filter(Boolean) as HTMLImageElement[];
    const notReady = imgs.filter((im) => !im.complete);
    if (notReady.length === 0) {
      overlay();
      return;
    }
    let pending = notReady.length;
    let cancelled = false;
    const onOne = () => {
      if (cancelled) return;
      pending -= 1;
      if (pending <= 0) {
        paintBase();
        overlay();
      }
    };
    notReady.forEach((im) => im.addEventListener("load", onOne, { once: true }));
    return () => {
      cancelled = true;
    };
  }, [
    textPreviewImg,
    logoPreviewImg,
    settings.textPosition,
    settings.fontSize,
    settings.textOpacity,
    settings.logoPosition,
    settings.logoSize,
    settings.logoOpacity,
  ]);

  const onPickPdf = (file?: File | null) => {
    if (!file) return;
    trackToolUseStart("pdf-watermark");
    trackToolEvent("pdf_watermark_start", "pdf-watermark");
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a PDF file");
      return;
    }
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setError(null);
    setSelectedFile(file);
  };

  const onPickLogo = (file?: File | null) => {
    if (!file) return;
    if (!ACCEPTED_LOGO.includes(file.type)) {
      alert("Logo must be a PNG, JPG or SVG file");
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      alert("Logo file must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update({ logoSrc: reader.result as string, logoEnabled: true });
    reader.readAsDataURL(file);
  };

  const apply = async () => {
    if (!selectedFile) return;
    if (!settings.textEnabled && !settings.logoEnabled) {
      setError("Enable at least a text or logo watermark.");
      return;
    }
    if (settings.textEnabled && !settings.text.trim() && !settings.logoEnabled) {
      setError("Enter watermark text, or enable the logo watermark.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const buf = await selectedFile.arrayBuffer();
      const { bytes, pageCount } = await applyPdfWatermark(buf, settings);
      const blob = new Blob([bytes.slice()], { type: "application/pdf" });
      setResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { url: URL.createObjectURL(blob), size: blob.size, pageCount };
      });
      if (typeof gtag !== "undefined") gtag("event", "apply_pdf_watermark");
      trackToolEvent("pdf_watermark_complete", "pdf-watermark");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? `Processing failed: ${e.message}` : "Processing failed. Please check the PDF file."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const download = () => {
    if (!result || !selectedFile) return;
    const base = selectedFile.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}-watermarked.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (typeof gtag !== "undefined") gtag("event", "download_pdf_watermark");
  };

  const reset = () => {
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setSelectedFile(null);
    setSettings(DEFAULT_SETTINGS);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="en" current="pdf-watermark" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="en" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload PDF</h2>
              <UploadZone
                accept="application/pdf,.pdf"
                onFiles={(files) => onPickPdf(files[0])}
                title="Drop a PDF here, or click to choose a file"
                description="PDF files only"
                buttonLabel="Choose PDF"
                ariaLabel="Upload PDF area, click or drop a file"
                inputAriaLabel="Choose PDF file"
                inputRef={fileInputRef}
              />
              {selectedFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-600 w-5 h-5" aria-hidden="true" />
                      <span className="text-sm font-medium break-all">{selectedFile.name}</span>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-2">
                      {formatSize(selectedFile.size)}
                    </span>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Text watermark</h2>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.textEnabled}
                    onChange={(e) => update({ textEnabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-gray-600">Enable</span>
                </label>
              </div>

              <div className={settings.textEnabled ? "" : "opacity-50 pointer-events-none"}>
                <label htmlFor="wm-text" className="block text-sm font-medium text-gray-700 mb-1">
                  Watermark text
                </label>
                <input
                  id="wm-text"
                  type="text"
                  value={settings.text}
                  onChange={(e) => update({ text: e.target.value })}
                  placeholder="e.g. CONFIDENTIAL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="wm-color" className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      id="wm-color"
                      type="color"
                      value={settings.textColor}
                      onChange={(e) => update({ textColor: e.target.value })}
                      className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="wm-size" className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <select
                      id="wm-size"
                      value={settings.fontSize}
                      onChange={(e) => update({ fontSize: e.target.value as FontSize })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {FONT_SIZES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opacity: {settings.textOpacity}%
                </label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={settings.textOpacity}
                  onChange={(e) => update({ textOpacity: Number(e.target.value) })}
                  className="w-full mb-4"
                  style={{ ['--range-progress']: `${((settings.textOpacity - 5) / 95) * 100}%` } as any}
                />

                <label htmlFor="wm-pos" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  id="wm-pos"
                  value={settings.textPosition}
                  onChange={(e) => update({ textPosition: e.target.value as WatermarkPosition })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {POSITIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Logo watermark</h2>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.logoEnabled}
                    onChange={(e) => update({ logoEnabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-gray-600">Enable</span>
                </label>
              </div>

              <div className={settings.logoEnabled ? "" : "opacity-50 pointer-events-none"}>
                <div className="flex items-center space-x-3 mb-4">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-primary transition-colors text-sm"
                  >
                    Choose logo (PNG / JPG / SVG)
                  </button>
                  {settings.logoSrc && (
                    <img
                      src={settings.logoSrc}
                      alt="Logo preview"
                      className="w-10 h-10 object-contain border border-gray-200 rounded"
                    />
                  )}
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  className="hidden"
                  onChange={(e) => onPickLogo(e.target.files?.[0])}
                  aria-label="Choose logo file"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size: {settings.logoSize}% of page width
                </label>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={settings.logoSize}
                  onChange={(e) => update({ logoSize: Number(e.target.value) })}
                  className="w-full mb-4"
                  style={{ ['--range-progress']: `${((settings.logoSize - 5) / 45) * 100}%` } as any}
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opacity: {settings.logoOpacity}%
                </label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={settings.logoOpacity}
                  onChange={(e) => update({ logoOpacity: Number(e.target.value) })}
                  className="w-full mb-4"
                  style={{ ['--range-progress']: `${((settings.logoOpacity - 5) / 95) * 100}%` } as any}
                />

                <label htmlFor="logo-pos" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  id="logo-pos"
                  value={settings.logoPosition}
                  onChange={(e) => update({ logoPosition: e.target.value as WatermarkPosition })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {POSITIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview (sample page)</h2>
              <p className="text-xs text-gray-500 mb-4">
                Below is how the watermark lays out on a single page — it will be applied to every page of your PDF.
              </p>
              <div className="flex justify-center bg-gray-100 rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto shadow-md rounded"
                  style={{ maxHeight: "480px" }}
                  aria-label="Watermark layout preview"
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}
                {result && (
                  <>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        Watermarked {result.pageCount} page(s), output {formatSize(result.size)}.
                      </p>
                    </div>
                    <DownloadSuccess tool="pdf-watermark" lang="en" imageCount={1} className="mt-4" />
                  </>
                )}

                <ActionButtons
                  apply={{
                    onClick: apply,
                    disabled: !selectedFile || isProcessing,
                    icon: <FileText className="w-4 h-4 mr-2" aria-hidden="true" />,
                    label: isProcessing ? "Processing..." : "Apply watermark to PDF",
                  }}
                  download={{
                    onClick: download,
                    disabled: !result,
                    icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                    label: "Download watermarked PDF",
                  }}
                  reset={{
                    onClick: reset,
                    disabled: !selectedFile,
                    icon: <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />,
                    label: "Start over",
                  }}
                />
              </div>
            </Card>
          </div>
        </div>

        {result && (
          <ToolRecommendations current="pdf-watermark" lang="en" className="mt-12" />
        )}

        <section className="mt-12">
          <h2 className="sr-only">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Fully local</h3>
              <p className="text-sm text-gray-600">
                Your PDF never leaves your browser — no server, no upload, no file size limit.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Every page</h3>
              <p className="text-sm text-gray-600">
                Text and logo watermarks can be combined and applied to every page at once.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Unicode text</h3>
              <p className="text-sm text-gray-600">
                Text is rendered in the browser then embedded, so any language works without garbled glyphs.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why watermark a PDF?</h2>
          <p>
            When sending contracts, quotes, scanned IDs or tender documents, a "For X use only" watermark helps
            prevent your file from being reused or misused. For PDF copies of IDs, passports and bank documents, a
            watermark is an important step in protecting personal data.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">100% local, privacy-safe</h2>
          <p>
            Unlike many online PDF services that upload your file to a server, this tool runs entirely in your
            browser with pdf-lib. Your PDF is never uploaded, stored or sent to any third party — ideal for
            documents with personal or business-confidential information.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Text and logo watermarks</h2>
          <p>
            Use a text watermark, a logo watermark, or both together, each with its own opacity, size and position.
            The tiled repeat mode staggers the watermark across the whole page to make it hard to crop out.
          </p>
        </section>

        {/* 所有工具中心：推廣其他工具 */}
        <ToolsShowcase lang="en" exclude="pdf-watermark" />

      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
