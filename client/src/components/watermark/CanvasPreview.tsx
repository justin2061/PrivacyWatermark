import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import type { Lang } from "@/lib/tools";

interface CanvasPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  selectedFile: File | null;
  processedImage: string | null;
  lang?: Lang;
}

export function CanvasPreview({ canvasRef, selectedFile, processedImage, lang = 'zh' }: CanvasPreviewProps) {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);

  const t = {
    zh: {
      title: '預覽畫面',
      live: '即時預覽',
      emptyMain: '選擇圖片後會在此處顯示預覽',
      emptySub: '支援即時預覽浮水印效果',
      format: '格式',
      size: '原始尺寸',
      loading: '載入中...',
    },
    en: {
      title: 'Preview',
      live: 'Live preview',
      emptyMain: 'Your preview will appear here after selecting an image',
      emptySub: 'Watermark effects update in real time',
      format: 'Format',
      size: 'Original size',
      loading: 'Loading...',
    },
    ja: {
      title: 'プレビュー',
      live: 'リアルタイム表示',
      emptyMain: '画像を選ぶと、ここにプレビューが表示されます',
      emptySub: '透かしの効果はその場で反映されます',
      format: '形式',
      size: '元のサイズ',
      loading: '読み込み中...',
    },
  }[lang];

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

      {/* Canvas Container — 手機用固定 px 高度（與 /batch 完全一致），不用 vh。
          固定 px 高度在捲動中恆定，sticky 穩定固定；且預覽精簡，下方設定區留白足夠。
          尺寸對齊 batch：container h-[120px] / canvas max-h-[104px]。 */}
      <div className="border border-gray-200 rounded-lg p-2 sm:p-4 bg-gray-50 h-[120px] sm:h-auto sm:min-h-[400px] flex items-center justify-center">
        {!selectedFile ? (
          <div className="text-center">
            <span className="text-gray-400 text-3xl sm:text-6xl sm:mb-4 block">📷</span>
            <p className="text-gray-500 mb-2 hidden sm:block">{t.emptyMain}</p>
            <p className="text-sm text-gray-400 hidden sm:block">{t.emptySub}</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[104px] sm:max-h-[400px] object-contain"
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
