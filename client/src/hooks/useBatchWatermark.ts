import { useState, useRef, useCallback, useEffect } from "react";
import JSZip from "jszip";
import { WatermarkSettings } from "@/components/watermark/WatermarkControls";
import { WatermarkProcessor } from "@/lib/watermarkProcessor";

export interface BatchImage {
  id: string;
  file: File;
  url: string; // object URL for thumbnail / preview source
  img: HTMLImageElement; // preloaded image element
  processed: string | null; // data URL after watermark applied
}

export const MAX_FILES = 20;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export function useBatchWatermark() {
  const [images, setImages] = useState<BatchImage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processor = useRef(new WatermarkProcessor());

  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
    mode: "text",
    text: "僅供參考",
    opacity: 50,
    position: "center",
    fontSize: "medium",
    color: "#000000",
    logoSrc: null,
    logoSize: 25,
  });

  const selectedImage = images.find((i) => i.id === selectedId) ?? null;
  const allProcessed = images.length > 0 && images.every((i) => i.processed);

  // Add files with validation
  const addFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setError(null);
      const incoming = Array.from(fileList);
      const accepted: File[] = [];
      const errors: string[] = [];

      setImages((prev) => {
        let remaining = MAX_FILES - prev.length;
        for (const file of incoming) {
          if (!ACCEPTED_TYPES.includes(file.type)) {
            errors.push(`${file.name}：僅支援 JPG / PNG`);
            continue;
          }
          if (file.size > MAX_FILE_SIZE) {
            errors.push(`${file.name}：超過 10MB 上限`);
            continue;
          }
          if (remaining <= 0) {
            errors.push(`最多只能上傳 ${MAX_FILES} 張圖片`);
            break;
          }
          accepted.push(file);
          remaining--;
        }
        return prev; // actual addition happens below after images load
      });

      if (errors.length > 0) {
        // de-duplicate the "max files" message
        setError(Array.from(new Set(errors)).join("；"));
      }

      const loaded: BatchImage[] = [];
      for (const file of accepted) {
        const url = URL.createObjectURL(file);
        try {
          const img = await loadImage(url);
          loaded.push({
            id: crypto.randomUUID(),
            file,
            url,
            img,
            processed: null,
          });
        } catch {
          URL.revokeObjectURL(url);
          errors.push(`${file.name}：無法讀取圖片`);
        }
      }

      if (loaded.length > 0) {
        setImages((prev) => [...prev, ...loaded]);
        setSelectedId((prev) => prev ?? loaded[0].id);
      }
    },
    []
  );

  const removeFile = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.url);
      const next = prev.filter((i) => i.id !== id);
      return next;
    });
    setSelectedId((prev) => {
      if (prev !== id) return prev;
      const remaining = images.filter((i) => i.id !== id);
      return remaining.length > 0 ? remaining[0].id : null;
    });
  }, [images]);

  const selectImage = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const updateWatermarkSettings = useCallback(
    (newSettings: Partial<WatermarkSettings>) => {
      setWatermarkSettings((prev) => ({ ...prev, ...newSettings }));
    },
    []
  );

  // Re-render preview whenever the selected image or settings change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!selectedImage) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    processor.current.previewWatermark(selectedImage.img, canvas, watermarkSettings);
  }, [selectedImage, watermarkSettings]);

  // Apply watermark to every image at full resolution
  const applyAll = useCallback(async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setProcessedCount(0);
    setError(null);

    const scratch = document.createElement("canvas");
    const results: Record<string, string> = {};

    for (let i = 0; i < images.length; i++) {
      const dataUrl = await processor.current.applyWatermark(
        images[i].img,
        scratch,
        watermarkSettings
      );
      results[images[i].id] = dataUrl;
      setProcessedCount(i + 1);
      // Yield to the event loop so the UI can update between images
      await new Promise((r) => setTimeout(r, 0));
    }

    setImages((prev) =>
      prev.map((img) =>
        results[img.id] ? { ...img, processed: results[img.id] } : img
      )
    );
    setIsProcessing(false);
  }, [images, watermarkSettings]);

  // Package every processed image into a ZIP and download it
  const downloadZip = useCallback(async () => {
    const processedImages = images.filter((i) => i.processed);
    if (processedImages.length === 0) return;

    const zip = new JSZip();
    for (let i = 0; i < processedImages.length; i++) {
      const item = processedImages[i];
      const blob = await (await fetch(item.processed!)).blob();
      const base = item.file.name.replace(/\.[^.]+$/, "");
      const ext = blob.type === "image/png" ? "png" : "jpg";
      // index prefix guarantees unique names and preserves upload order
      const name = `${String(i + 1).padStart(2, "0")}_${base}_浮水印.${ext}`;
      zip.file(name, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "watermarked_images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [images]);

  const reset = useCallback(() => {
    setImages((prev) => {
      prev.forEach((i) => URL.revokeObjectURL(i.url));
      return [];
    });
    setSelectedId(null);
    setProcessedCount(0);
    setIsProcessing(false);
    setError(null);
  }, []);

  // Revoke any outstanding object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    images,
    selectedImage,
    selectedId,
    watermarkSettings,
    canvasRef,
    isProcessing,
    processedCount,
    allProcessed,
    error,
    addFiles,
    removeFile,
    selectImage,
    updateWatermarkSettings,
    applyAll,
    downloadZip,
    reset,
  };
}
