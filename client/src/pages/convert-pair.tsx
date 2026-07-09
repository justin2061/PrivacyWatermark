import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { KofiSupport } from "@/components/KofiSupport";
import { setPageSeo, webAppSchema, faqSchema } from "@/lib/seo";
import { PAIRS, type ConvertPair, type PairMime } from "@/lib/convertPairs";
import {
  ArrowRight,
  CheckCircle,
  Download,
  RefreshCw,
  Upload,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

function extForType(type: string) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  if (type === "image/png") return "png";
  return "img";
}

// 轉檔核心邏輯：用 Canvas 重新編碼成目標格式（轉 JPG 時填白底避免透明區變黑）
const convertImage = (
  file: File,
  format: PairMime
): Promise<{ blob: Blob; type: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas error"));
        return;
      }
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Conversion failed"));
            return;
          }
          resolve({ blob, type: format });
        },
        format,
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
};

interface ConvertPairPageProps {
  pair: ConvertPair;
  lang?: "zh" | "en";
}

export default function ConvertPairPage({ pair, lang = "zh" }: ConvertPairPageProps) {
  const en = lang === "en";
  const content = en ? pair.en : pair.zh;
  const base = en ? "/en" : "";
  const canonical = `https://imagemarker.app${base}/convert/${pair.slug}`;
  const pairName = en
    ? `${pair.fromLabel} to ${pair.toLabel}`
    : `${pair.fromLabel} 轉 ${pair.toLabel}`;

  const t = en
    ? {
        headerTitle: `${pair.fromLabel} to ${pair.toLabel} Converter`,
        headerSub: "Secure Local Format Conversion",
        watermarkTool: "Watermark Tool",
        localBadge: "100% Local",
        switchLang: "中文",
        switchAria: "切換到中文版",
        upload: `Upload ${pair.fromLabel} Image`,
        dropHint: "Drag and drop an image here, or click to select",
        supports: "Supports JPG, PNG, WebP, BMP, GIF",
        chooseFile: "Choose File",
        uploadAria: "Upload area, click or drag and drop a file",
        selectAria: "Select image file",
        notImage: "Please choose an image file (JPG, PNG, WebP, BMP, GIF)",
        result: "Result",
        resultHint: `Upload an image and it will be converted to ${pair.toLabel} instantly, with a before/after size comparison.`,
        original: "Original",
        converted: "Converted",
        converting: "Converting...",
        download: `Download ${pair.toLabel} Image`,
        startOver: "Start Over",
        kofi: "☕ Found it useful? Buy me a coffee",
        previewAlt: "Converted preview",
        outputLocked: `Output format: ${pair.toLabel}. Need another format? Use the`,
        fullConverter: "full converter",
        faqTitle: "Frequently Asked Questions",
        moreTitle: "Other conversions",
        allFormats: "All formats — Image Format Converter",
        footer: "© 2025 ImageMarker — Protect your privacy",
        footerWatermark: "Watermark Tool",
        footerCompress: "Image Compressor",
        footerResize: "Image Resizer",
      }
    : {
        headerTitle: `${pair.fromLabel} 轉 ${pair.toLabel}`,
        headerSub: "安全的本地端格式轉換處理",
        watermarkTool: "浮水印工具",
        localBadge: "100% 本地處理",
        switchLang: "EN",
        switchAria: "Switch to English",
        upload: `上傳 ${pair.fromLabel} 圖片`,
        dropHint: "將圖片拖放到此處，或點擊選擇檔案",
        supports: "支援 JPG、PNG、WebP、BMP、GIF",
        chooseFile: "選擇檔案",
        uploadAria: "上傳圖片區域，點擊或拖放檔案",
        selectAria: "選擇圖片檔案",
        notImage: "請選擇圖片檔案（JPG、PNG、WebP、BMP、GIF）",
        result: "轉換結果",
        resultHint: `上傳圖片後會立即轉成 ${pair.toLabel}，並顯示轉換前後的檔案大小比較。`,
        original: "原始",
        converted: "轉換後",
        converting: "轉換中...",
        download: `下載 ${pair.toLabel} 圖片`,
        startOver: "重新開始",
        kofi: "☕ 覺得好用？請我喝杯咖啡",
        previewAlt: "轉換後的預覽",
        outputLocked: `輸出格式已鎖定為 ${pair.toLabel}。需要其他格式？請使用`,
        fullConverter: "完整轉換工具",
        faqTitle: "常見問題",
        moreTitle: "其他格式轉換",
        allFormats: "所有格式 — 圖片格式轉換工具",
        footer: "© 2025 隱私工具集 - 保護您的隱私安全",
        footerWatermark: "浮水印工具",
        footerCompress: "圖片壓縮",
        footerResize: "圖片縮放",
      };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    url: string;
    size: number;
    type: string;
  } | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return setPageSeo({
      title: content.title,
      description: content.description,
      canonical,
      ...(en ? { locale: "en_US" } : {}),
      jsonLd: [
        webAppSchema({
          name: en
            ? `${pairName} Converter — ImageMarker`
            : `${pairName} 轉檔工具 — ImageMarker`,
          description: content.description,
          url: canonical,
          ...(en ? { inLanguage: "en" } : {}),
          featureList: en
            ? [
                "100% local in-browser processing — no uploads",
                `Converts ${pair.fromLabel} to ${pair.toLabel} instantly`,
                "Reads JPG, PNG, WebP, BMP and GIF input",
                "Before/after file size comparison",
              ]
            : [
                "100% 瀏覽器本機處理，圖片不上傳",
                `即時將 ${pair.fromLabel} 轉成 ${pair.toLabel}`,
                "可上傳 JPG、PNG、WebP、BMP、GIF 格式",
                "顯示轉換前後檔案大小比較",
              ],
        }),
        faqSchema(content.faq),
      ],
    });
  }, [pair.slug, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // 上傳後自動轉成鎖定的目標格式
  useEffect(() => {
    if (!selectedFile) return;
    let cancelled = false;
    setIsConverting(true);
    setError(null);
    const timer = setTimeout(() => {
      convertImage(selectedFile, pair.to)
        .then(({ blob, type }) => {
          if (cancelled) return;
          setResult((prev) => {
            if (prev) URL.revokeObjectURL(prev.url);
            return { url: URL.createObjectURL(blob), size: blob.size, type };
          });
        })
        .catch((e) => {
          if (!cancelled) setError(e.message || (en ? "Conversion failed" : "轉換失敗"));
        })
        .finally(() => {
          if (!cancelled) setIsConverting(false);
        });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [selectedFile, pair.to, en]);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert(t.notImage);
      return;
    }
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setError(null);
    setSelectedFile(file);
  };

  const downloadResult = () => {
    if (!result || !selectedFile) return;
    const baseName = selectedFile.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}.${extForType(result.type)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const otherPairs = PAIRS.filter((p) => p.slug !== pair.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang={lang} current="convert" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* h1 + 前言 */}
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {content.h1}
          </h1>
          {content.intro.map((p, i) => (
            <p key={i} className="text-gray-600 mb-3 max-w-3xl">
              {p}
            </p>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側：上傳 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.upload}</h2>
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  onPickFile(e.dataTransfer.files[0]);
                }}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={t.uploadAria}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Upload
                  className="text-gray-400 w-12 h-12 mb-4 mx-auto"
                  aria-hidden="true"
                />
                <p className="text-gray-600 mb-2">{t.dropHint}</p>
                <p className="text-sm text-gray-600 mb-4">{t.supports}</p>
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.chooseFile}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED}
                className="hidden"
                onChange={(e) => onPickFile(e.target.files?.[0])}
                aria-label={t.selectAria}
              />

              {selectedFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-600 w-5 h-5" aria-hidden="true" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatSize(selectedFile.size)}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4">
                {t.outputLocked}{" "}
                <Link
                  href={en ? "/en/convert" : "/convert"}
                  className="text-primary hover:underline"
                >
                  {t.fullConverter}
                </Link>
                {en ? "." : "。"}
              </p>
            </Card>
          </div>

          {/* 右側：結果 + 下載 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.result}</h2>
              {!selectedFile && <p className="text-sm text-gray-500">{t.resultHint}</p>}
              {selectedFile && (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">
                        {en
                          ? `${t.original} (${extForType(selectedFile.type).toUpperCase()})`
                          : `${t.original}（${extForType(selectedFile.type).toUpperCase()}）`}
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatSize(selectedFile.size)}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">
                        {en
                          ? `${t.converted} (${result ? extForType(result.type).toUpperCase() : pair.toLabel})`
                          : `${t.converted}（${result ? extForType(result.type).toUpperCase() : pair.toLabel}）`}
                      </p>
                      <p className="text-base font-semibold text-green-600">
                        {result ? formatSize(result.size) : "—"}
                      </p>
                    </div>
                  </div>

                  {isConverting && (
                    <p className="text-sm text-gray-500 mb-4">{t.converting}</p>
                  )}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {result && (
                    <>
                      <img
                        src={result.url}
                        alt={t.previewAlt}
                        className="max-w-full rounded-lg border border-gray-200"
                      />
                      <KofiSupport variant="success" lang={en ? "en" : "zh"} className="mt-4" />
                    </>
                  )}
                </>
              )}
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={downloadResult}
                  disabled={!result || isConverting}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t.download}
                </button>
                <button
                  onClick={reset}
                  disabled={!selectedFile}
                  className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t.startOver}
                </button>
                <KofiSupport lang={en ? "en" : "zh"} className="mt-2" />
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ（內容與 faqSchema 完全一致） */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.faqTitle}</h2>
          <div className="space-y-4">
            {content.faq.map((item, i) => (
              <Card key={i} className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600">{item.a}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 內部連結：其他格式對 + 主轉換頁 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.moreTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherPairs.map((p) => (
              <Link
                key={p.slug}
                href={`${base}/convert/${p.slug}`}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                <span>
                  {en
                    ? `${p.fromLabel} to ${p.toLabel}`
                    : `${p.fromLabel} 轉 ${p.toLabel}`}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            ))}
            <Link
              href={en ? "/en/convert" : "/convert"}
              className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-primary hover:border-primary transition-colors"
            >
              <span>{t.allFormats}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">{t.footer}</p>
            <div className="flex items-center space-x-4">
              <Link
                href={en ? "/en/" : "/"}
                className="text-sm text-primary hover:underline"
              >
                {t.footerWatermark}
              </Link>
              <Link
                href={en ? "/en/compress" : "/compress"}
                className="text-sm text-primary hover:underline"
              >
                {t.footerCompress}
              </Link>
              <Link
                href={en ? "/en/resize" : "/resize"}
                className="text-sm text-primary hover:underline"
              >
                {t.footerResize}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
