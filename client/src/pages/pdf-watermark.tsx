import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { KofiSupport } from "@/components/KofiSupport";
import { ToolRecommendations } from "@/components/ToolRecommendations";
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
  Upload,
} from "lucide-react";

const POSITIONS: { value: WatermarkPosition; label: string }[] = [
  { value: "top-left", label: "左上" },
  { value: "top-center", label: "上中" },
  { value: "top-right", label: "右上" },
  { value: "center-left", label: "左中" },
  { value: "center", label: "正中" },
  { value: "center-right", label: "右中" },
  { value: "bottom-left", label: "左下" },
  { value: "bottom-center", label: "下中" },
  { value: "bottom-right", label: "右下" },
  { value: "repeat", label: "重複鋪滿" },
];

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: "small", label: "小" },
  { value: "medium", label: "中" },
  { value: "large", label: "大" },
  { value: "xlarge", label: "特大" },
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
  text: "僅供辦理XX業務使用",
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

// Draw a single watermark image onto the preview canvas (top-left origin) at a
// position, scaled to targetW, mirroring the PDF placement logic.
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

export default function PdfWatermarkPage() {
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
      title: "PDF 浮水印工具 — 免費線上為 PDF 每頁加浮水印",
      description:
        "免費線上 PDF 浮水印工具，可為 PDF 每一頁加上文字或 Logo 浮水印，支援中文、透明度、位置與重複鋪滿。100% 在瀏覽器本機處理，PDF 不會上傳到任何伺服器，適合證件、合約等機密文件。",
      canonical: "https://imagemarker.app/pdf-watermark",
      jsonLd: [
        webAppSchema({
          name: "PDF 浮水印工具 — ImageMarker",
          description:
            "免費線上 PDF 浮水印工具，可為 PDF 每一頁加上文字或 Logo 浮水印，支援中文、透明度、位置與重複鋪滿。100% 本機處理，PDF 不會上傳到任何伺服器。",
          url: "https://imagemarker.app/pdf-watermark",
          featureList: [
            "100% 瀏覽器本機處理，PDF 不上傳",
            "文字與 Logo 浮水印可同時套用，各自獨立設定透明度",
            "支援中文浮水印文字、自訂顏色與位置",
            "重複鋪滿模式，套用到 PDF 的每一頁",
          ],
        }),
        faqSchema([
          {
            q: "PDF 會上傳到伺服器嗎？",
            a: "不會。所有處理都在你的瀏覽器中以 pdf-lib 完成，PDF 檔案不會上傳、儲存或傳送給任何第三方。",
          },
          {
            q: "可以加中文浮水印嗎？",
            a: "可以。本工具會用瀏覽器把文字繪製後嵌入 PDF，因此完整支援中文、日文等文字，不會出現亂碼。",
          },
          {
            q: "浮水印會套用到每一頁嗎？",
            a: "會。設定好的文字或 Logo 浮水印會自動套用到 PDF 的每一頁。",
          },
        ]),
      ],
    });
  }, []);

  const update = (patch: Partial<PdfWatermarkSettings>) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  // Pre-render the text watermark to an <img> for the live preview.
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

  // Redraw the mock-page preview whenever settings change.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // A4 aspect (portrait): 210 x 297.
    const W = 420;
    const H = 594;
    canvas.width = W;
    canvas.height = H;

    ctx.clearRect(0, 0, W, H);
    // Page background + faint content lines to look like a document.
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

    let pending = 0;
    const tryDraw = () => {
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

    // Wait for any not-yet-loaded images, then draw once.
    const imgs = [textPreviewImg, logoPreviewImg].filter(Boolean) as HTMLImageElement[];
    const notReady = imgs.filter((im) => !im.complete);
    if (notReady.length === 0) {
      tryDraw();
      return;
    }
    pending = notReady.length;
    let cancelled = false;
    const onOne = () => {
      if (cancelled) return;
      pending -= 1;
      if (pending <= 0) {
        // Redraw base then overlay to keep ordering deterministic.
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = "#e5e7eb";
        ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
        ctx.fillStyle = "#eef0f3";
        for (let i = 0; i < 14; i++) {
          const y = 48 + i * 34;
          const lineW = i % 4 === 3 ? W * 0.4 : W * 0.72;
          ctx.fillRect(40, y, lineW, 12);
        }
        tryDraw();
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
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("請選擇 PDF 檔案");
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
      alert("Logo 請選擇 PNG、JPG 或 SVG 檔案");
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      alert("Logo 檔案請小於 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update({ logoSrc: reader.result as string, logoEnabled: true });
    reader.readAsDataURL(file);
  };

  const apply = async () => {
    if (!selectedFile) return;
    if (!settings.textEnabled && !settings.logoEnabled) {
      setError("請至少啟用文字或 Logo 浮水印。");
      return;
    }
    if (settings.textEnabled && !settings.text.trim() && !settings.logoEnabled) {
      setError("請輸入浮水印文字，或啟用 Logo 浮水印。");
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const buf = await selectedFile.arrayBuffer();
      const { bytes, pageCount } = await applyPdfWatermark(buf, settings);
      // Copy into a fresh ArrayBuffer-backed view so Blob typing is happy.
      const blob = new Blob([bytes.slice()], { type: "application/pdf" });
      setResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { url: URL.createObjectURL(blob), size: blob.size, pageCount };
      });
      if (typeof gtag !== "undefined") gtag("event", "apply_pdf_watermark");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? `處理失敗：${e.message}` : "處理失敗，請確認 PDF 檔案是否正常。"
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
      <SiteHeader lang="zh" current="pdf-watermark" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy notice — 精簡信任標誌 */}
        <PrivacyBanner lang="zh" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: upload + settings */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">上傳 PDF</h2>
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  onPickPdf(e.dataTransfer.files[0]);
                }}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="上傳 PDF 區域，點擊或拖放檔案"
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Upload className="text-gray-400 w-12 h-12 mb-4 mx-auto" aria-hidden="true" />
                <p className="text-gray-600 mb-2">將 PDF 拖放到此處，或點擊選擇檔案</p>
                <p className="text-sm text-gray-600 mb-4">僅支援 PDF 檔案</p>
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  選擇 PDF
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => onPickPdf(e.target.files?.[0])}
                aria-label="選擇 PDF 檔案"
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

            {/* Text watermark */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">文字浮水印</h2>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.textEnabled}
                    onChange={(e) => update({ textEnabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-gray-600">啟用</span>
                </label>
              </div>

              <div className={settings.textEnabled ? "" : "opacity-50 pointer-events-none"}>
                <label htmlFor="wm-text" className="block text-sm font-medium text-gray-700 mb-1">
                  浮水印文字
                </label>
                <input
                  id="wm-text"
                  type="text"
                  value={settings.text}
                  onChange={(e) => update({ text: e.target.value })}
                  placeholder="例如：僅供辦理XX業務使用"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="wm-color" className="block text-sm font-medium text-gray-700 mb-1">
                      顏色
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
                      大小
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
                  透明度：{settings.textOpacity}%
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
                  位置
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

            {/* Logo watermark */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Logo 浮水印</h2>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.logoEnabled}
                    onChange={(e) => update({ logoEnabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-gray-600">啟用</span>
                </label>
              </div>

              <div className={settings.logoEnabled ? "" : "opacity-50 pointer-events-none"}>
                <div className="flex items-center space-x-3 mb-4">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-primary transition-colors text-sm"
                  >
                    選擇 Logo（PNG / JPG / SVG）
                  </button>
                  {settings.logoSrc && (
                    <img
                      src={settings.logoSrc}
                      alt="Logo 預覽"
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
                  aria-label="選擇 Logo 檔案"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  大小：{settings.logoSize}% 頁寬
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
                  透明度：{settings.logoOpacity}%
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
                  位置
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

          {/* Right: preview + actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">預覽（示意頁面）</h2>
              <p className="text-xs text-gray-500 mb-4">
                下方為浮水印在單一頁面上的排版示意，實際會套用到 PDF 的每一頁。
              </p>
              <div className="flex justify-center bg-gray-100 rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto shadow-md rounded"
                  style={{ maxHeight: "480px" }}
                  aria-label="浮水印排版預覽"
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
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      已為 {result.pageCount} 頁加上浮水印，輸出檔案 {formatSize(result.size)}。
                    </p>
                  </div>
                )}

                <button
                  onClick={apply}
                  disabled={!selectedFile || isProcessing}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                  {isProcessing ? "處理中..." : "套用浮水印到 PDF"}
                </button>

                <button
                  onClick={download}
                  disabled={!result}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  下載加浮水印的 PDF
                </button>

                <button
                  onClick={reset}
                  disabled={!selectedFile}
                  className="w-full bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  重新開始
                </button>

                <KofiSupport className="mt-2" />

                {result && (
                  <KofiSupport variant="success" className="mt-4" />
                )}
              </div>
            </Card>
          </div>
        </div>

        {result && (
          <ToolRecommendations current="pdf-watermark" lang="zh" className="mt-12" />
        )}

        {/* Features */}
        <section className="mt-12">
          <h2 className="sr-only">特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">純本地處理</h3>
              <p className="text-sm text-gray-600">
                PDF 不會離開你的瀏覽器，沒有伺服器、沒有上傳，也沒有檔案大小限制。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">每頁自動套用</h3>
              <p className="text-sm text-gray-600">
                文字與 Logo 浮水印可同時使用，一次套用到 PDF 的每一頁。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">完整支援中文</h3>
              <p className="text-sm text-gray-600">
                以瀏覽器繪製文字後嵌入 PDF，中文、日文浮水印不會亂碼。
              </p>
            </Card>
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">為什麼要在 PDF 上加浮水印？</h2>
          <p>
            寄送合約、報價單、證件掃描檔或投標文件時，加上「僅供 XX 用途」的浮水印能有效防止文件被盜用或轉作他用。
            對於身分證、護照、存摺等機密文件的 PDF 影本，浮水印更是保護個資的重要一步。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">100% 本機處理，隱私安全</h2>
          <p>
            和許多需要把檔案上傳到伺服器的線上 PDF 服務不同，本工具完全在你的瀏覽器中以 pdf-lib 運作。
            你的 PDF 不會被上傳、儲存或傳送給任何第三方，特別適合處理含個人資訊或商業機密的文件。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">文字與 Logo 浮水印</h2>
          <p>
            你可以只加文字浮水印、只加 Logo 浮水印，或兩者同時使用，並各自調整透明度、大小與位置。
            選擇「重複鋪滿」模式時，浮水印會以交錯的方式平鋪整頁，最大程度防止被裁切移除。
          </p>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 隱私工具集 - 保護您的隱私安全
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-primary hover:underline">
                浮水印工具
              </Link>
              <Link href="/compress" className="text-sm text-primary hover:underline">
                圖片壓縮
              </Link>
              <Link href="/resize" className="text-sm text-primary hover:underline">
                圖片縮放
              </Link>
              <Link href="/blog" className="text-sm text-primary hover:underline">
                教學文章
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
