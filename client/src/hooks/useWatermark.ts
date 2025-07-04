import { useState, useRef, useCallback } from "react";
import { WatermarkSettings } from "@/components/watermark/WatermarkControls";
import { WatermarkProcessor } from "@/lib/watermarkProcessor";

export function useWatermark() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
    text: "僅供參考",
    opacity: 50,
    position: "center",
    fontSize: "medium"
  });

  const processor = useRef(new WatermarkProcessor());

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setProcessedImage(null);
    setProgress(0);
    
    // Load image to canvas for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (canvasRef.current) {
          processor.current.loadImageToCanvas(img, canvasRef.current);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const updateWatermarkSettings = useCallback((newSettings: Partial<WatermarkSettings>) => {
    setWatermarkSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const applyWatermark = useCallback(async () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsProcessing(true);
    setProgress(25);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
          setProgress(50);
          
          if (canvasRef.current) {
            await processor.current.applyWatermark(
              img, 
              canvasRef.current, 
              watermarkSettings
            );
            
            setProgress(75);
            
            // Convert canvas to data URL
            const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
            setProcessedImage(dataUrl);
            setProgress(100);
          }
          
          setIsProcessing(false);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error applying watermark:', error);
      setIsProcessing(false);
      setProgress(0);
    }
  }, [selectedFile, watermarkSettings]);

  const downloadImage = useCallback(() => {
    if (!processedImage || !selectedFile) return;

    const link = document.createElement('a');
    link.download = `watermarked_${selectedFile.name}`;
    link.href = processedImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage, selectedFile]);

  const resetCanvas = useCallback(() => {
    setSelectedFile(null);
    setProcessedImage(null);
    setProgress(0);
    setIsProcessing(false);
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, []);

  return {
    selectedFile,
    watermarkSettings,
    canvasRef,
    processedImage,
    isProcessing,
    progress,
    handleFileSelect,
    updateWatermarkSettings,
    applyWatermark,
    downloadImage,
    resetCanvas
  };
}
