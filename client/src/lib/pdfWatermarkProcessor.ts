// Client-side PDF watermark processor.
//
// Everything runs in the browser via pdf-lib — the PDF is read, watermarked on
// every page, and re-serialised without ever touching a server. Text watermarks
// are rendered to a transparent <canvas> and embedded as a PNG rather than drawn
// with pdf-lib's drawText. That deliberately sidesteps pdf-lib's standard fonts,
// which are WinAnsi-only and cannot encode CJK (Chinese/Japanese/Korean) — the
// browser's canvas renders any text the system can, so 中文浮水印 just works.

import { PDFDocument, type PDFImage, type PDFPage } from "pdf-lib";

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "repeat";

export type FontSize = "small" | "medium" | "large" | "xlarge";

export interface PdfWatermarkSettings {
  textEnabled: boolean;
  logoEnabled: boolean;

  // Text watermark
  text: string;
  textColor: string; // hex
  textOpacity: number; // 0-100
  textPosition: WatermarkPosition;
  fontSize: FontSize;

  // Logo watermark
  logoSrc: string | null; // data URL — stays local, never uploaded
  logoOpacity: number; // 0-100
  logoSize: number; // logo width as a % of page width (5-50)
  logoPosition: WatermarkPosition;
}

// Text width relative to page width, per size preset.
const TEXT_SIZE_RATIO: Record<FontSize, number> = {
  small: 0.18,
  medium: 0.28,
  large: 0.42,
  xlarge: 0.6,
};

/**
 * Render watermark text to a transparent PNG data URL. Drawn large (relative to
 * a fixed base) for crisp embedding; the PDF drawing step scales it per page.
 */
export function renderTextToPng(
  text: string,
  color: string
): { dataUrl: string; width: number; height: number } | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const basePx = 96; // render resolution — scaled down when placed on the page
  const padding = Math.round(basePx * 0.15);
  const font = `bold ${basePx}px "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", -apple-system, "Segoe UI", sans-serif`;

  const measureCanvas = document.createElement("canvas");
  const mctx = measureCanvas.getContext("2d");
  if (!mctx) return null;
  mctx.font = font;
  const metrics = mctx.measureText(trimmed);
  const textWidth = Math.ceil(metrics.width);
  const width = textWidth + padding * 2;
  const height = Math.ceil(basePx * 1.4) + padding * 2;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(trimmed, width / 2, height / 2);

  return { dataUrl: canvas.toDataURL("image/png"), width, height };
}

// Convert a data URL to a Uint8Array of raw bytes.
function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// Rasterise an SVG (or any image) data URL / object URL to a PNG data URL, so it
// can be embedded — pdf-lib only embeds PNG/JPG, not SVG.
function rasterizeToPng(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const w = img.naturalWidth || 512;
      const h = img.naturalHeight || 512;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("無法建立 Canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Logo 圖片讀取失敗"));
    img.src = src;
  });
}

// Compute the (x, y) bottom-left origin for a watermark of the given size at an
// anchor position on a page. PDF origin is bottom-left.
function anchorXY(
  position: Exclude<WatermarkPosition, "repeat">,
  pageW: number,
  pageH: number,
  w: number,
  h: number
): { x: number; y: number } {
  const margin = Math.min(pageW, pageH) * 0.04;
  let x = (pageW - w) / 2;
  let y = (pageH - h) / 2;

  if (position.includes("left")) x = margin;
  if (position.includes("right")) x = pageW - w - margin;
  if (position.includes("top")) y = pageH - h - margin;
  if (position.includes("bottom")) y = margin;

  return { x, y };
}

// Draw an embedded image onto a page at the given position (single anchor or
// tiled repeat), scaled to targetW while preserving aspect ratio.
function drawWatermark(
  page: PDFPage,
  image: PDFImage,
  position: WatermarkPosition,
  targetW: number,
  opacity: number
) {
  const { width: pageW, height: pageH } = page.getSize();
  const scale = targetW / image.width;
  const w = targetW;
  const h = image.height * scale;

  if (position === "repeat") {
    // Tile diagonally across the page with generous spacing.
    const gapX = w * 1.6;
    const gapY = h * 3;
    for (let y = 0; y < pageH; y += gapY) {
      // Offset alternate rows for a staggered, watermark-like pattern.
      const rowOffset = (Math.floor(y / gapY) % 2) * (gapX / 2);
      for (let x = -gapX; x < pageW + gapX; x += gapX) {
        page.drawImage(image, {
          x: x + rowOffset,
          y,
          width: w,
          height: h,
          opacity,
        });
      }
    }
    return;
  }

  const { x, y } = anchorXY(position, pageW, pageH, w, h);
  page.drawImage(image, { x, y, width: w, height: h, opacity });
}

export interface ProcessResult {
  bytes: Uint8Array;
  pageCount: number;
}

/**
 * Apply the configured watermark(s) to every page of the PDF and return the new
 * PDF bytes. 100% in-browser — the input bytes never leave the page.
 */
export async function applyPdfWatermark(
  pdfBytes: ArrayBuffer,
  settings: PdfWatermarkSettings
): Promise<ProcessResult> {
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  // Embed the text watermark once and reuse across every page.
  let textImage: PDFImage | null = null;
  if (settings.textEnabled && settings.text.trim()) {
    const png = renderTextToPng(settings.text, settings.textColor);
    if (png) {
      textImage = await pdfDoc.embedPng(dataUrlToBytes(png.dataUrl));
    }
  }

  // Embed the logo once and reuse across every page.
  let logoImage: PDFImage | null = null;
  if (settings.logoEnabled && settings.logoSrc) {
    const isPng = /^data:image\/png/i.test(settings.logoSrc);
    const isJpg = /^data:image\/jpe?g/i.test(settings.logoSrc);
    if (isJpg) {
      logoImage = await pdfDoc.embedJpg(dataUrlToBytes(settings.logoSrc));
    } else if (isPng) {
      logoImage = await pdfDoc.embedPng(dataUrlToBytes(settings.logoSrc));
    } else {
      // SVG or other — rasterise to PNG first.
      const pngUrl = await rasterizeToPng(settings.logoSrc);
      logoImage = await pdfDoc.embedPng(dataUrlToBytes(pngUrl));
    }
  }

  for (const page of pages) {
    const { width: pageW } = page.getSize();

    if (textImage) {
      const targetW = pageW * TEXT_SIZE_RATIO[settings.fontSize];
      drawWatermark(
        page,
        textImage,
        settings.textPosition,
        targetW,
        settings.textOpacity / 100
      );
    }

    if (logoImage) {
      const targetW = pageW * (settings.logoSize / 100);
      drawWatermark(
        page,
        logoImage,
        settings.logoPosition,
        targetW,
        settings.logoOpacity / 100
      );
    }
  }

  const bytes = await pdfDoc.save();
  return { bytes, pageCount: pages.length };
}
