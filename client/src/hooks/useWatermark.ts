import { useState, useRef, useCallback } from "react";
import { WatermarkSettings } from "@/components/watermark/WatermarkControls";
import { WatermarkProcessor } from "@/lib/watermarkProcessor";

export function useWatermark() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Cache the decoded image so settings changes re-render from it directly,
  // instead of re-reading the file + decoding a new Image on every change.
  // Matches /batch's approach; avoids the repeated canvas rebuild that makes
  // Chrome device-emulation promote the canvas to a layer and desync sticky.
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
    mode: "text",
    textEnabled: true,
    logoEnabled: false,
    text: "僅供參考",
    textOpacity: 50,
    textPosition: "center",
    fontSize: "medium",
    color: "#000000",
    logoSrc: null,
    logoSize: 25,
    logoOpacity: 50,
    logoPosition: "bottom-right",
  });

  const processor = useRef(new WatermarkProcessor());

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setProcessedImage(null);
    setProgress(0);
    
    // Load image to canvas for preview with watermark
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Cache the decoded image and render the first preview from it
        imageRef.current = img;
        if (canvasRef.current) {
          processor.current.previewWatermark(img, canvasRef.current, watermarkSettings);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [watermarkSettings]);

  const updateWatermarkSettings = useCallback((newSettings: Partial<WatermarkSettings>) => {
    setWatermarkSettings(prev => {
      const updated = { ...prev, ...newSettings };

      // Re-render preview from the cached decoded image — no file re-read,
      // so the canvas is repainted from an already-decoded bitmap (like /batch).
      if (imageRef.current && canvasRef.current) {
        processor.current.previewWatermark(imageRef.current, canvasRef.current, updated);
      }

      return updated;
    });
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
          
          // Process watermark at original image resolution
          const dataUrl = await processor.current.applyWatermark(
            img, 
            canvasRef.current!, 
            watermarkSettings
          );
          
          setProgress(75);
          setProcessedImage(dataUrl);
          setProgress(100);
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

    // Create download link with proper filename
    const link = document.createElement('a');
    const originalName = selectedFile.name;
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
    const ext = originalName.substring(originalName.lastIndexOf('.'));
    
    link.download = `${nameWithoutExt}_浮水印${ext}`;
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
    imageRef.current = null;

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
