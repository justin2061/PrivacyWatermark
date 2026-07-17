import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { UploadZone } from "@/components/UploadZone";
import { ActionButtons } from "@/components/ActionButtons";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { trackToolUseStart, trackToolEvent } from "@/lib/analytics";
import { PAIRS } from "@/lib/convertPairs";
import {
  CheckCircle,
  Download,
  Image as ImageIcon,
  Lock,
  RefreshCw,
  Repeat,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

type TargetFormat = "image/jpeg" | "image/png" | "image/webp";

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

// 轉檔核心邏輯：用 Canvas 重新編碼成目標格式
const convertImage = (
  file: File,
  format: TargetFormat
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
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("轉換失敗"));
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
      reject(new Error("圖片讀取失敗"));
    };
    img.src = url;
  });
};

export default function ConvertPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState<TargetFormat>("image/jpeg");
  const [result, setResult] = useState<{
    url: string;
    size: number;
    type: string;
  } | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return setPageSeo({
      title: "圖片格式轉換工具 — 免費線上轉換 JPG/PNG/WebP",
      description:
        "免費線上圖片格式轉換工具，支援 PNG轉JPG、JPG轉PNG、WebP轉換。在瀏覽器中以 Canvas 技術即時轉換圖片格式，100% 本機處理，圖片不會上傳到任何伺服器。",
      canonical: "https://imagemarker.app/convert",
      jsonLd: webAppSchema({
        name: "圖片格式轉換工具 — ImageMarker",
        description:
          "免費線上圖片格式轉換工具，支援 PNG轉JPG、JPG轉PNG、WebP轉換。在瀏覽器中以 Canvas 技術即時轉換圖片格式，100% 本機處理，圖片不會上傳到任何伺服器。",
        url: "https://imagemarker.app/convert",
        featureList: [
          "100% 瀏覽器本機處理，圖片不上傳",
          "支援 PNG 轉 JPG、JPG 轉 PNG、WebP 互轉",
          "可上傳 JPG、PNG、WebP、BMP、GIF 格式",
          "轉 JPG 時自動填入白色背景，避免透明區域變黑",
        ],
      }),
    });
  }, []);

  // 格式變動時自動重新轉換
  useEffect(() => {
    if (!selectedFile) return;
    let cancelled = false;
    setIsConverting(true);
    setError(null);
    const timer = setTimeout(() => {
      convertImage(selectedFile, format)
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
          if (!cancelled) setError(e.message || "轉換失敗");
        })
        .finally(() => {
          if (!cancelled) setIsConverting(false);
        });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [selectedFile, format]);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("請選擇圖片檔案（JPG、PNG、WebP、BMP、GIF）");
      return;
    }
    trackToolUseStart("convert");
    trackToolEvent("convert_start", "convert");
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
    a.download = `${base}.${extForType(result.type)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    trackToolEvent("convert_complete", "convert");
  };

  const reset = () => {
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setSelectedFile(null);
    setFormat("image/jpeg");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="zh" current="convert" />

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
                description="支援 JPG、PNG、WebP、BMP、GIF"
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">轉換設定</h2>

                {/* 目標格式選擇 */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    目標格式
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: "image/jpeg", label: "JPG" },
                        { value: "image/png", label: "PNG" },
                        { value: "image/webp", label: "WebP" },
                      ] as { value: TargetFormat; label: string }[]
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
                    含透明背景的 PNG 轉成 JPG 後，透明區域會自動填上白底。JPG / WebP 為失真格式，PNG 為無損格式。
                  </p>
                </div>

                {/* 常見轉換場景 */}
                <div className="mt-6 space-y-2 text-xs text-gray-600">
                  <p className="font-medium text-gray-700">常見轉換場景</p>
                  <p>• <strong>PNG → JPG</strong>：縮小檔案、去除透明背景（填白底），適合上傳與分享。</p>
                  <p>• <strong>JPG → PNG</strong>：取得無損格式，方便後續編輯或保留清晰邊緣。</p>
                  <p>• <strong>WebP → JPG</strong>：解決 WebP 在部分軟體或平台無法開啟的相容性問題。</p>
                  <p>• <strong>→ WebP</strong>：取得更小的檔案，加快網頁載入速度。</p>
                </div>
              </Card>
            )}
          </div>

          {/* 右側：結果 + 預覽 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">轉換結果</h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  請先上傳圖片，這裡會顯示轉換前後的格式、大小比較與預覽。
                </p>
              )}
              {selectedFile && (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">
                        原始（{extForType(selectedFile.type).toUpperCase()}）
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatSize(selectedFile.size)}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">
                        轉換後（{result ? extForType(result.type).toUpperCase() : "—"}）
                      </p>
                      <p className="text-base font-semibold text-green-600">
                        {result ? formatSize(result.size) : "—"}
                      </p>
                    </div>
                  </div>

                  {isConverting && (
                    <p className="text-sm text-gray-500 mb-4">轉換中...</p>
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
                        alt="轉換後的預覽"
                        className="max-w-full rounded-lg border border-gray-200"
                      />
                      <DownloadSuccess tool="convert" lang="zh" imageCount={1} className="mt-4" />
                    </>
                  )}
                </>
              )}
            </Card>

            <Card className="p-6">
              <ActionButtons
                download={{
                  onClick: downloadResult,
                  disabled: !result || isConverting,
                  icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "下載轉換後圖片",
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
          <ToolRecommendations current="convert" lang="zh" className="mt-12" />
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
              <Repeat className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">即時轉換</h3>
              <p className="text-sm text-gray-600">
                選好目標格式立即看到轉換後的預覽與檔案大小，無需等待上傳下載。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">多格式支援</h3>
              <p className="text-sm text-gray-600">
                可讀取 JPG、PNG、WebP、BMP、GIF，並轉換為 JPG、PNG 或 WebP。
              </p>
            </Card>
          </div>
        </section>

        {/* SEO 內容 */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            為什麼要轉換圖片格式？
          </h2>
          <p>
            不同圖片格式各有用途：JPG 適合照片、檔案小且相容性高；PNG 支援透明背景與無損畫質，適合圖示與去背圖；
            WebP 則能在相近畫質下取得更小的檔案。當你遇到平台只接受特定格式、需要透明背景，或想縮小檔案時，就需要轉換格式。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% 本機處理，隱私安全
          </h2>
          <p>
            和許多需要把圖片上傳到伺服器的線上轉檔服務不同，本工具完全在你的瀏覽器中以 Canvas API 運作。
            你的圖片不會被上傳、儲存或傳送給任何第三方，特別適合處理證件、合約或含個人資訊的照片。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            常見格式轉換建議
          </h2>
          <p>
            <strong>PNG 轉 JPG</strong> 可大幅縮小檔案，但會失去透明背景（自動填白底）；<strong>JPG 轉 PNG</strong>
            能轉成無損格式，但檔案通常會變大；<strong>WebP 轉 JPG</strong> 可解決舊版軟體或平台無法開啟 WebP 的相容性問題。
            若以縮小檔案、加速網頁為目標，轉成 WebP 通常是最佳選擇。
          </p>
        </section>

        {/* 熱門轉換：格式對長尾頁內部連結 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">熱門轉換</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PAIRS.map((pair) => (
              <Link
                key={pair.slug}
                href={`/convert/${pair.slug}`}
                className="flex items-center justify-center bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                {pair.fromLabel} 轉 {pair.toLabel}
              </Link>
            ))}
          </div>
        </section>

        {/* 所有工具中心：推廣其他工具 */}
        <ToolsShowcase lang="zh" exclude="convert" />

      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
