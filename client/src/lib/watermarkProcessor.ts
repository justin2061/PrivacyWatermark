import { WatermarkSettings } from "@/components/watermark/WatermarkControls";

export class WatermarkProcessor {
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

    // Configure watermark text styling based on original image size
    const fontSize = this.getFontSize(settings.fontSize, img.naturalWidth);
    processingCtx.font = `bold ${fontSize}px Inter, sans-serif`;
    processingCtx.fillStyle = `rgba(0, 0, 0, ${settings.opacity / 100})`;
    processingCtx.textAlign = 'center';
    processingCtx.textBaseline = 'middle';

    // Add text shadow for better visibility
    processingCtx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    processingCtx.shadowBlur = Math.max(2, Math.floor(img.naturalWidth / 300)); // Scale shadow with image size
    processingCtx.shadowOffsetX = Math.max(1, Math.floor(img.naturalWidth / 600));
    processingCtx.shadowOffsetY = Math.max(1, Math.floor(img.naturalWidth / 600));

    // Calculate position based on original image size
    const position = this.calculateTextPosition(
      settings.position, 
      img.naturalWidth, 
      img.naturalHeight,
      processingCtx,
      settings.text
    );

    // Draw watermark text
    processingCtx.fillText(settings.text, position.x, position.y);

    // Reset shadow
    processingCtx.shadowColor = 'transparent';
    processingCtx.shadowBlur = 0;
    processingCtx.shadowOffsetX = 0;
    processingCtx.shadowOffsetY = 0;

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

    // Configure watermark text styling for preview
    const fontSize = this.getFontSize(settings.fontSize, canvas.width);
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    ctx.fillStyle = `rgba(0, 0, 0, ${settings.opacity / 100})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add text shadow for better visibility
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    // Calculate position
    const position = this.calculateTextPosition(
      settings.position, 
      canvas.width, 
      canvas.height,
      ctx,
      settings.text
    );

    // Draw watermark text
    ctx.fillText(settings.text, position.x, position.y);

    // Reset shadow
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
