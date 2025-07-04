import { WatermarkSettings } from "@/components/watermark/WatermarkControls";

export class WatermarkProcessor {
  loadImageToCanvas(img: HTMLImageElement, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate canvas size to maintain aspect ratio
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

  async applyWatermark(
    img: HTMLImageElement, 
    canvas: HTMLCanvasElement, 
    settings: WatermarkSettings
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // First, draw the image
    this.loadImageToCanvas(img, canvas);

    // Configure watermark text styling
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
      fontSize
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
    fontSize: number
  ): { x: number; y: number } {
    const margin = fontSize;
    
    switch (position) {
      case 'center':
        return { x: width / 2, y: height / 2 };
      case 'top-left':
        return { x: margin, y: margin };
      case 'top-right':
        return { x: width - margin, y: margin };
      case 'bottom-left':
        return { x: margin, y: height - margin };
      case 'bottom-right':
        return { x: width - margin, y: height - margin };
      default:
        return { x: width / 2, y: height / 2 };
    }
  }
}
