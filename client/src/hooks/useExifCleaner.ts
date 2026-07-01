import { useCallback, useState } from "react";
import {
  buildCleanedFilename,
  readMetadata,
  stripMetadata,
  type Lang,
  type MetadataReport,
} from "@/lib/exifProcessor";

interface CleanedResult {
  blob: Blob;
  url: string;
  size: number;
  filename: string;
}

export function useExifCleaner(lang: Lang = "zh") {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [report, setReport] = useState<MetadataReport | null>(null);
  const [cleaned, setCleaned] = useState<CleanedResult | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const releaseCleaned = useCallback((current: CleanedResult | null) => {
    if (current) URL.revokeObjectURL(current.url);
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      setError(null);
      setReport(null);
      setCleaned((prev) => {
        releaseCleaned(prev);
        return null;
      });
      setSelectedFile(file);
      setIsReading(true);
      try {
        const result = await readMetadata(file, lang);
        setReport(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : lang === "en"
              ? "Failed to read metadata"
              : "讀取 metadata 失敗",
        );
      } finally {
        setIsReading(false);
      }
    },
    [releaseCleaned, lang],
  );

  const cleanFile = useCallback(async () => {
    if (!selectedFile) return;
    setError(null);
    setIsCleaning(true);
    try {
      const blob = await stripMetadata(selectedFile);
      const url = URL.createObjectURL(blob);
      const filename = buildCleanedFilename(selectedFile.name);
      setCleaned((prev) => {
        releaseCleaned(prev);
        return { blob, url, size: blob.size, filename };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "清除 metadata 失敗");
    } finally {
      setIsCleaning(false);
    }
  }, [selectedFile, releaseCleaned]);

  const downloadCleaned = useCallback(() => {
    if (!cleaned) return;
    const a = document.createElement("a");
    a.href = cleaned.url;
    a.download = cleaned.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [cleaned]);

  const reset = useCallback(() => {
    setCleaned((prev) => {
      releaseCleaned(prev);
      return null;
    });
    setSelectedFile(null);
    setReport(null);
    setError(null);
  }, [releaseCleaned]);

  return {
    selectedFile,
    report,
    cleaned,
    isReading,
    isCleaning,
    error,
    handleFileSelect,
    cleanFile,
    downloadCleaned,
    reset,
  };
}
