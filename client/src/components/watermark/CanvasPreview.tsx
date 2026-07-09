import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface CanvasPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  selectedFile: File | null;
  processedImage: string | null;
  lang?: 'zh' | 'en';
}

export function CanvasPreview({ canvasRef, selectedFile, processedImage, lang = 'zh' }: CanvasPreviewProps) {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);

  const t = lang === 'en' ? {
    title: 'Preview',
    live: 'Live preview',
    emptyMain: 'Your preview will appear here after selecting an image',
    emptySub: 'Watermark effects update in real time',
    format: 'Format',
    size: 'Original size',
    loading: 'Loading...',
  } : {
    title: '預覽畫面',
    live: '即時預覽',
    emptyMain: '選擇圖片後會在此處顯示預覽',
    emptySub: '支援即時預覽浮水印效果',
    format: '格式',
    size: '原始尺寸',
    loading: '載入中...',
  };

  useEffect(() => {
    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src); // Clean up
      };
      img.src = URL.createObjectURL(selectedFile);
    } else {
      setImageDimensions(null);
    }
  }, [selectedFile]);

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">{t.title}</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>{t.live}</span>
        </div>
      </div>

      {/* Canvas Container — compact on mobile so the sticky preview stays ~40% of the screen */}
      <div className="border border-gray-200 rounded-lg p-2 md:p-4 bg-gray-50 min-h-[150px] md:min-h-[400px] flex items-center justify-center">
        {!selectedFile ? (
          <div className="text-center">
            <span className="text-gray-400 text-6xl mb-4 block">📷</span>
            <p className="text-gray-500 mb-2">{t.emptyMain}</p>
            <p className="text-sm text-gray-400">{t.emptySub}</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[24vh] md:max-h-[400px] object-contain"
            style={{ display: selectedFile ? 'block' : 'none' }}
          />
        )}
      </div>

      {/* Canvas Info */}
      {selectedFile && (
        <div className="mt-2 md:mt-4 flex justify-between text-xs md:text-sm text-gray-500">
          <span>{t.format}: {selectedFile.type.split('/')[1].toUpperCase()}</span>
          <span>{t.size}: {imageDimensions ? `${imageDimensions.width}×${imageDimensions.height}` : t.loading}</span>
        </div>
      )}
    </Card>
  );
}
