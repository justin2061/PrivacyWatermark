import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { UploadZone } from "@/components/UploadZone";
import { ActionButtons } from "@/components/ActionButtons";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { trackToolUseStart, trackToolEvent, trackDownloadComplete } from "@/lib/analytics";
import {
  CheckCircle,
  Download,
  Image as ImageIcon,
  Lock,
  RefreshCw,
  Zap,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp";

type OutputFormat = "original" | "image/jpeg" | "image/webp";

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

// 壓縮核心邏輯：用 Canvas 重新編碼
const compressImage = (
  file: File,
  quality: number,
  format: OutputFormat
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
        reject(new Error("無法建立 Canvas"));
        return;
      }
      // 轉 JPEG 時填白底，避免透明區域變黑
      const outType =
        format === "original" ? file.type : format;
      if (outType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("壓縮失敗"));
            return;
          }
          resolve({ blob, type: outType });
        },
        outType,
        quality / 100
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("圖片讀取失敗"));
    };
    img.src = url;
  });
};

export default function CompressPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<OutputFormat>("original");
  const [result, setResult] = useState<{
    url: string;
    size: number;
    type: string;
  } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return setPageSeo({
      title: "圖片壓縮工具 — 免費線上壓縮，100% 本機處理",
      description:
        "免費線上圖片壓縮工具，支援 JPG、PNG、WebP。在瀏覽器中以 Canvas 技術壓縮圖片、縮小檔案大小，100% 本機處理，圖片不會上傳到任何伺服器。",
      canonical: "https://imagemarker.app/compress",
      jsonLd: webAppSchema({
        name: "圖片壓縮工具 — ImageMarker",
        description:
          "免費線上圖片壓縮工具，支援 JPG、PNG、WebP。在瀏覽器中以 Canvas 技術壓縮圖片、縮小檔案大小，100% 本機處理，圖片不會上傳到任何伺服器。",
        url: "https://imagemarker.app/compress",
        featureList: [
          "100% 瀏覽器本機處理，圖片不上傳",
          "支援 JPG、PNG、WebP 格式",
          "可調整壓縮品質並即時預覽壓縮後檔案大小",
          "可選擇維持原格式或輸出為 JPEG、WebP",
        ],
      }),
    });
  }, []);

  // 品質或格式變動時自動重新壓縮
  useEffect(() => {
    if (!selectedFile) return;
    let cancelled = false;
    setIsCompressing(true);
    setError(null);
    const timer = setTimeout(() => {
      compressImage(selectedFile, quality, format)
        .then(({ blob, type }) => {
          if (cancelled) return;
          setResult((prev) => {
            if (prev) URL.revokeObjectURL(prev.url);
            return {
              url: URL.createObjectURL(blob),
              size: blob.size,
              type,
            };
          });
        })
        .catch((e) => {
          if (!cancelled) setError(e.message || "壓縮失敗");
        })
        .finally(() => {
          if (!cancelled) setIsCompressing(false);
        });
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [selectedFile, quality, format]);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!ACCEPTED.split(",").includes(file.type)) {
      alert("僅支援 JPG、PNG、WebP 格式");
      return;
    }
    trackToolUseStart("compress");
    trackToolEvent("compress_start", "compress");
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setError(null);
    setSelectedFile(file);
  };

  const downloadResult = () => {
    if (!result || !selectedFile) return;
    const base = selectedFile.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}-compressed.${extForType(result.type)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    trackToolEvent("compress_complete", "compress");
  };

  const reset = () => {
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setSelectedFile(null);
    setQuality(80);
    setFormat("original");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const ratio =
    selectedFile && result
      ? Math.max(0, Math.round((1 - result.size / selectedFile.size) * 100))
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="zh" current="compress" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 隱私提示 — 精簡信任標誌 */}
        <PrivacyBanner lang="zh" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側：上傳 + 設定 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">上傳圖片</h2>
              <UploadZone
                accept={ACCEPTED}
                onFiles={(files) => onPickFile(files[0])}
                title="將圖片拖放到此處，或點擊選擇檔案"
                description="支援 JPG、PNG、WebP 格式"
                buttonLabel="選擇檔案"
                ariaLabel="上傳圖片區域，點擊或拖放檔案"
                inputAriaLabel="選擇圖片檔案"
                inputRef={fileInputRef}
              />

              {selectedFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle
                        className="text-green-600 w-5 h-5"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatSize(selectedFile.size)}
                    </span>
                  </div>
                </div>
              )}
            </Card>

            {selectedFile && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">壓縮設定</h2>

                {/* 品質滑桿 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="quality"
                      className="text-sm font-medium text-gray-700"
                    >
                      壓縮品質
                    </label>
                    <span className="text-sm font-semibold text-primary">
                      {quality}%
                    </span>
                  </div>
                  <input
                    id="quality"
                    type="range"
                    min={1}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ ['--range-progress']: `${((quality - 1) / 99) * 100}%` } as any}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>檔案更小</span>
                    <span>畫質更好</span>
                  </div>
                </div>

                {/* 格式選擇 */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    輸出格式
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: "original", label: "保持原格式" },
                        { value: "image/jpeg", label: "轉 JPG" },
                        { value: "image/webp", label: "轉 WebP" },
                      ] as { value: OutputFormat; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormat(opt.value)}
                        className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                          format === opt.value
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG 含透明背景轉 JPG 後，透明區域會填白底。WebP 通常可在相同畫質下取得更小檔案。
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* 右側：結果 + 預覽 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">壓縮結果</h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  請先上傳圖片，這裡會顯示壓縮前後的大小比較與預覽。
                </p>
              )}
              {selectedFile && (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">原始大小</p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatSize(selectedFile.size)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">壓縮後</p>
                      <p className="text-base font-semibold text-gray-900">
                        {result ? formatSize(result.size) : "—"}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">壓縮率</p>
                      <p className="text-base font-semibold text-green-600">
                        {result ? `${ratio}% ↓` : "—"}
                      </p>
                    </div>
                  </div>

                  {isCompressing && (
                    <p className="text-sm text-gray-500 mb-4">壓縮中...</p>
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
                        alt="壓縮後的預覽"
                        className="max-w-full rounded-lg border border-gray-200"
                      />
                      <DownloadSuccess tool="compress" lang="zh" imageCount={1} className="mt-4" />
                    </>
                  )}
                </>
              )}
            </Card>

            <Card className="p-6">
              <ActionButtons
                download={{
                  onClick: () => {
                    trackDownloadComplete("compress", 1);
                    downloadResult();
                  },
                  disabled: !result || isCompressing,
                  icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "下載壓縮圖片",
                }}
                reset={{
                  onClick: reset,
                  disabled: !selectedFile,
                  icon: <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "重新開始",
                }}
              />
            </Card>
          </div>
        </div>

        {result && (
          <ToolRecommendations current="compress" lang="zh" className="mt-12" />
        )}

        {/* 特色 */}
        <section className="mt-12">
          <h2 className="sr-only">特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">純本地處理</h3>
              <p className="text-sm text-gray-600">
                圖片不會離開你的瀏覽器，沒有伺服器，沒有上傳，也沒有大小限制。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Zap className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">即時預覽</h3>
              <p className="text-sm text-gray-600">
                拉動品質滑桿即時看到壓縮後的大小與畫質，找到最適合的平衡點。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">多格式支援</h3>
              <p className="text-sm text-gray-600">
                支援 JPG、PNG、WebP，可保持原格式或轉檔，WebP 通常檔案更小。
              </p>
            </Card>
          </div>
        </section>

        {/* SEO 內容 */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            為什麼要壓縮圖片？
          </h2>
          <p>
            高解析度的照片動輒好幾 MB，會拖慢網頁載入速度、佔用儲存空間，也常超過論壇、表單或電子郵件的上傳大小限制。
            壓縮圖片可以在維持可接受畫質的前提下大幅縮小檔案，讓分享與上傳更順暢。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% 本機處理，隱私安全
          </h2>
          <p>
            和許多需要把圖片上傳到伺服器的線上壓縮服務不同，本工具完全在你的瀏覽器中以 Canvas API 運作。
            你的圖片不會被上傳、儲存或傳送給任何第三方，特別適合處理證件、合約或含個人資訊的照片。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            支援格式與建議
          </h2>
          <p>
            支援 JPG、PNG、WebP。照片類圖片建議使用 JPG 或 WebP；需要透明背景時可保持 PNG。
            一般而言，品質設定在 70–85% 之間，多數情況下肉眼難以察覺差異，卻能省下可觀的檔案大小。
          </p>
        </section>

        {/* 所有工具中心：推廣其他工具 */}
        <ToolsShowcase lang="zh" exclude="compress" />

      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
