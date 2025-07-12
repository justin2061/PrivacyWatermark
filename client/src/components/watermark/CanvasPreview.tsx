import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface CanvasPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  selectedFile: File | null;
  processedImage: string | null;
}

export function CanvasPreview({ canvasRef, selectedFile, processedImage }: CanvasPreviewProps) {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);

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
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">預覽畫面</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>即時預覽</span>
        </div>
      </div>
      
      {/* Canvas Container */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
        {!selectedFile ? (
          <div className="text-center">
            <span className="text-gray-400 text-6xl mb-4 block">📷</span>
            <p className="text-gray-500 mb-2">選擇圖片後會在此處顯示預覽</p>
            <p className="text-sm text-gray-400">支援即時預覽浮水印效果</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[400px] object-contain"
            style={{ display: selectedFile ? 'block' : 'none' }}
          />
        )}
      </div>
      
      {/* Canvas Info */}
      {selectedFile && (
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>格式: {selectedFile.type.split('/')[1].toUpperCase()}</span>
          <span>原始尺寸: {imageDimensions ? `${imageDimensions.width}×${imageDimensions.height}` : '載入中...'}</span>
        </div>
      )}
    </Card>
  );
}
