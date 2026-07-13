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
    <Card className="p-3 sm:p-6">
      {/* 標題列在手機隱藏，讓 sticky 預覽保持精簡 */}
      <div className="hidden sm:flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t.title}</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>{t.live}</span>
        </div>
      </div>

      {/* Canvas Container — 手機用「固定 px」而非 vh 高度。
          vh 在 iOS Safari 會隨捲動時網址列收合／展開而重新計算，
          導致 sticky 預覽在上傳圖片後高度變動、進而脫離固定（batch 頁用固定 px 才不會壞）。
          改為固定 px 後高度在捲動中恆定，sticky 穩定固定，與 /batch 一致。 */}
      <div className="border border-gray-200 rounded-lg p-2 sm:p-4 bg-gray-50 h-[240px] sm:h-auto sm:min-h-[400px] flex items-center justify-center">
        {!selectedFile ? (
          <div className="text-center">
            <span className="text-gray-400 text-3xl sm:text-6xl sm:mb-4 block">📷</span>
            <p className="text-gray-500 mb-2 hidden sm:block">{t.emptyMain}</p>
            <p className="text-sm text-gray-400 hidden sm:block">{t.emptySub}</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[224px] sm:max-h-[400px] object-contain"
            style={{ display: selectedFile ? 'block' : 'none' }}
          />
        )}
      </div>

      {/* Canvas Info（手機隱藏，節省 sticky 高度） */}
      {selectedFile && (
        <div className="mt-4 hidden sm:flex justify-between text-xs sm:text-sm text-gray-500">
          <span>{t.format}: {selectedFile.type.split('/')[1].toUpperCase()}</span>
          <span>{t.size}: {imageDimensions ? `${imageDimensions.width}×${imageDimensions.height}` : t.loading}</span>
        </div>
      )}
    </Card>
  );
}
