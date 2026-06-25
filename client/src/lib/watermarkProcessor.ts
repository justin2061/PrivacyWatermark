import { WatermarkSettings } from "@/components/watermark/WatermarkControls";

export class WatermarkProcessor {
  // Cache the most recently loaded logo so we don't decode it on every render
  private logoCache: { src: string; img: HTMLImageElement } | null = null;

  // For preview canvas - scaled down version
  loadImageToCanvas(img: HTMLImageElement, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate canvas size to maintain aspect ratio for preview
    const maxWidth = 600;
    const maxHeight = 400;

    let { width, height } = img;

    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }

    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
  }

  // For final watermark processing - use original image size
  async applyWatermark(
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    settings: WatermarkSettings
  ): Promise<string> {
    // Create a new canvas with original image dimensions for final processing
    const processingCanvas = document.createElement('canvas');
    const processingCtx = processingCanvas.getContext('2d');
    if (!processingCtx) return '';

    // Set canvas to original image size
    processingCanvas.width = img.naturalWidth;
    processingCanvas.height = img.naturalHeight;

    // Draw original image at full resolution
    processingCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    // Draw watermark (text or logo image) at full resolution
    if (settings.mode === 'image') {
      if (settings.logoSrc) {
        const logo = await this.loadLogo(settings.logoSrc);
        this.drawLogo(processingCtx, processingCanvas.width, processingCanvas.height, logo, settings);
      }
    } else {
      this.drawText(processingCtx, processingCanvas.width, processingCanvas.height, settings, true);
    }

    // Return high-quality data URL - preserve original format when possible
    const originalFormat = img.src.toLowerCase().includes('.png') ? 'image/png' : 'image/jpeg';
    const quality = originalFormat === 'image/jpeg' ? 0.95 : undefined; // PNG doesn't use quality parameter
    return processingCanvas.toDataURL(originalFormat, quality);
  }

  // Preview watermark on display canvas (for real-time preview)
  async previewWatermark(
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    settings: WatermarkSettings
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // First, draw the image at preview size
    this.loadImageToCanvas(img, canvas);

    if (settings.mode === 'image') {
      if (settings.logoSrc) {
        const logo = await this.loadLogo(settings.logoSrc);
        this.drawLogo(ctx, canvas.width, canvas.height, logo, settings);
      }
    } else {
      this.drawText(ctx, canvas.width, canvas.height, settings, false);
    }
  }

  // Load (and cache) a logo image from a data URL
  private loadLogo(src: string): Promise<HTMLImageElement> {
    if (this.logoCache && this.logoCache.src === src) {
      return Promise.resolve(this.logoCache.img);
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.logoCache = { src, img };
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Draw the logo watermark at the chosen position, size and opacity
  private drawLogo(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    logo: HTMLImageElement,
    settings: WatermarkSettings
  ) {
    // Some SVGs report no intrinsic size; fall back to a square so they still render
    let naturalW = logo.naturalWidth || logo.width;
    let naturalH = logo.naturalHeight || logo.height;
    if (!naturalW || !naturalH) {
      naturalW = 1;
      naturalH = 1;
    }

    // Logo width as a percentage of the original image width (clamped to a sane range)
    const sizePercent = Math.min(50, Math.max(10, settings.logoSize ?? 25));
    const targetWidth = canvasWidth * (sizePercent / 100);
    const targetHeight = targetWidth * (naturalH / naturalW);

    // Tiled / repeated pattern across the whole image
    if (settings.position === 'repeat') {
      this.drawLogoRepeat(ctx, canvasWidth, canvasHeight, logo, targetWidth, targetHeight, settings);
      return;
    }

    const margin = Math.max(10, Math.round(canvasWidth * 0.02));
    const { x, y } = this.calculateBoxPosition(
      settings.position,
      canvasWidth,
      canvasHeight,
      targetWidth,
      targetHeight,
      margin
    );

    ctx.save();
    ctx.globalAlpha = settings.opacity / 100;
    ctx.drawImage(logo, x, y, targetWidth, targetHeight);
    ctx.restore();
  }

  // Tile the logo diagonally to cover the entire image
  private drawLogoRepeat(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    logo: HTMLImageElement,
    targetWidth: number,
    targetHeight: number,
    settings: WatermarkSettings
  ) {
    const stepX = targetWidth * 1.6;
    const stepY = targetHeight * 1.8;
    const angle = (-30 * Math.PI) / 180;
    const diag = Math.sqrt(width * width + height * height);

    ctx.save();
    ctx.globalAlpha = settings.opacity / 100;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle);
    for (let y = -diag; y < diag; y += stepY) {
      for (let x = -diag; x < diag; x += stepX) {
        ctx.drawImage(logo, x - targetWidth / 2, y - targetHeight / 2, targetWidth, targetHeight);
      }
    }
    ctx.restore();
  }

  // Draw the text watermark (shadow scales with resolution when fullRes is true)
  private drawText(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    settings: WatermarkSettings,
    fullRes: boolean
  ) {
    const fontSize = this.getFontSize(settings.fontSize, width);
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    const { r, g, b } = this.hexToRgb(settings.color);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${settings.opacity / 100})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add a contrasting shadow so the watermark stays legible (dark shadow for light text, light shadow otherwise)
    const isLightColor = (r * 0.299 + g * 0.587 + b * 0.114) > 186;
    ctx.shadowColor = isLightColor ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = fullRes ? Math.max(2, Math.floor(width / 300)) : 2;
    ctx.shadowOffsetX = fullRes ? Math.max(1, Math.floor(width / 600)) : 1;
    ctx.shadowOffsetY = fullRes ? Math.max(1, Math.floor(width / 600)) : 1;

    // Tiled / repeated pattern across the whole image
    if (settings.position === 'repeat') {
      this.drawTextRepeat(ctx, width, height, settings, fontSize);
      this.resetShadow(ctx);
      return;
    }

    // Calculate position
    const position = this.calculateTextPosition(
      settings.position,
      width,
      height,
      ctx,
      settings.text
    );

    // Draw watermark text
    ctx.fillText(settings.text, position.x, position.y);

    // Reset shadow
    this.resetShadow(ctx);
  }

  // Tile the text watermark diagonally to cover the entire image
  private drawTextRepeat(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    settings: WatermarkSettings,
    fontSize: number
  ) {
    const text = settings.text || '';
    if (!text) return;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textWidth = ctx.measureText(text).width;
    const stepX = Math.max(textWidth + fontSize * 2, fontSize * 4);
    const stepY = fontSize * 3;
    const angle = (-30 * Math.PI) / 180;
    const diag = Math.sqrt(width * width + height * height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle);
    for (let y = -diag; y < diag; y += stepY) {
      for (let x = -diag; x < diag; x += stepX) {
        ctx.fillText(text, x, y);
      }
    }
    ctx.restore();
  }

  private resetShadow(ctx: CanvasRenderingContext2D) {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  private getFontSize(size: WatermarkSettings['fontSize'], canvasWidth: number): number {
    const baseSize = Math.max(canvasWidth * 0.05, 16); // Responsive base size

    switch (size) {
      case 'small': return baseSize * 0.7;
      case 'medium': return baseSize;
      case 'large': return baseSize * 1.4;
      case 'xlarge': return baseSize * 1.8;
      default: return baseSize;
    }
  }

  // Parse a #RGB or #RRGGBB hex color into its r/g/b components (falls back to black)
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    let h = (hex || '').trim().replace(/^#/, '');
    if (h.length === 3) {
      h = h.split('').map((c) => c + c).join('');
    }
    if (!/^[0-9a-fA-F]{6}$/.test(h)) {
      return { r: 0, g: 0, b: 0 };
    }
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }

  // Top-left corner for a box of (boxWidth × boxHeight) at the given nine-grid position
  private calculateBoxPosition(
    position: WatermarkSettings['position'],
    width: number,
    height: number,
    boxWidth: number,
    boxHeight: number,
    margin: number
  ): { x: number; y: number } {
    let x = 0;
    let y = 0;

    // Horizontal alignment
    switch (position) {
      case 'top-left':
      case 'center-left':
      case 'bottom-left':
        x = margin;
        break;
      case 'top-center':
      case 'center':
      case 'bottom-center':
        x = (width - boxWidth) / 2;
        break;
      case 'top-right':
      case 'center-right':
      case 'bottom-right':
        x = width - boxWidth - margin;
        break;
    }

    // Vertical alignment
    switch (position) {
      case 'top-left':
      case 'top-center':
      case 'top-right':
        y = margin;
        break;
      case 'center-left':
      case 'center':
      case 'center-right':
        y = (height - boxHeight) / 2;
        break;
      case 'bottom-left':
      case 'bottom-center':
      case 'bottom-right':
        y = height - boxHeight - margin;
        break;
    }

    // Keep the box inside the canvas
    x = Math.max(0, Math.min(x, width - boxWidth));
    y = Math.max(0, Math.min(y, height - boxHeight));

    return { x, y };
  }

  private calculateTextPosition(
    position: WatermarkSettings['position'],
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    text: string
  ): { x: number; y: number } {
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    const margin = 10; // 10px margin for edges

    let x = 0;
    let y = 0;

    // Horizontal alignment
    switch (position) {
      case 'top-left':
      case 'center-left':
      case 'bottom-left':
        ctx.textAlign = 'left';
        x = margin;
        break;
      case 'top-center':
      case 'center':
      case 'bottom-center':
        ctx.textAlign = 'center';
        x = width / 2;
        break;
      case 'top-right':
      case 'center-right':
      case 'bottom-right':
        ctx.textAlign = 'right';
        x = width - margin;
        break;
    }

    // Vertical alignment
    switch (position) {
      case 'top-left':
      case 'top-center':
      case 'top-right':
        ctx.textBaseline = 'top';
        y = margin;
        break;
      case 'center-left':
      case 'center':
      case 'center-right':
        ctx.textBaseline = 'middle';
        y = height / 2;
        break;
      case 'bottom-left':
      case 'bottom-center':
      case 'bottom-right':
        ctx.textBaseline = 'bottom';
        y = height - margin;
        break;
    }

    // Boundary checks to prevent text from going outside the canvas
    if (ctx.textAlign === 'left' && x + textWidth > width) {
      x = width - textWidth - margin;
    }
    if (ctx.textAlign === 'right' && x - textWidth < 0) {
      x = textWidth + margin;
    }
    if (ctx.textAlign === 'center') {
      if (x - textWidth / 2 < 0) x = textWidth / 2 + margin;
      if (x + textWidth / 2 > width) x = width - textWidth / 2 - margin;
    }

    if (ctx.textBaseline === 'top' && y + textHeight > height) {
      y = height - textHeight - margin;
    }
    if (ctx.textBaseline === 'bottom' && y - textHeight < 0) {
      y = textHeight + margin;
    }
    if (ctx.textBaseline === 'middle') {
      if (y - textHeight / 2 < 0) y = textHeight / 2 + margin;
      if (y + textHeight / 2 > height) y = height - textHeight / 2 - margin;
    }

    return { x, y };
  }
}
