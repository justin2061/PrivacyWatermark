import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { UploadZone } from "@/components/UploadZone";
import { ActionButtons } from "@/components/ActionButtons";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { trackToolUseStart } from "@/lib/analytics";
import {
  CheckCircle,
  Download,
  Image as ImageIcon,
  Link2,
  Link2Off,
  Lock,
  RefreshCw,
  Scaling,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

type Preset = { label: string; w: number; h: number };

const PRESET_GROUPS: { title: string; items: Preset[] }[] = [
  {
    title: "社群媒體",
    items: [
      { label: "Instagram 方形", w: 1080, h: 1080 },
      { label: "FB 封面", w: 820, h: 312 },
      { label: "Twitter Header", w: 1500, h: 500 },
    ],
  },
  {
    title: "通用",
    items: [
      { label: "HD", w: 1920, h: 1080 },
      { label: "4K", w: 3840, h: 2160 },
      { label: "800×600", w: 800, h: 600 },
      { label: "640×480", w: 640, h: 480 },
    ],
  },
  {
    title: "大頭照",
    items: [
      { label: "2吋", w: 413, h: 531 },
      { label: "1吋", w: 295, h: 413 },
    ],
  },
];

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
  return "png";
}

// 縮放核心邏輯：用 Canvas drawImage 重新繪製到新尺寸
const resizeImage = (
  file: File,
  width: number,
  height: number
): Promise<{ blob: Blob; type: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("無法建立 Canvas"));
        return;
      }
      // JPEG 不支援透明，填白底避免黑邊
      const outType = file.type === "image/jpeg" ? "image/jpeg" : "image/png";
      if (outType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("縮放失敗"));
            return;
          }
          resolve({ blob, type: outType });
        },
        outType,
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

export default function ResizePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [result, setResult] = useState<{
    url: string;
    size: number;
    type: string;
    w: number;
    h: number;
  } | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return setPageSeo({
      title: "圖片縮放工具 — 免費調整圖片大小",
      description:
        "免費線上圖片縮放工具，輸入寬高即可調整圖片大小，內建社群媒體與大頭照常用尺寸。在瀏覽器中以 Canvas 技術即時縮放，100% 本機處理，圖片不會上傳到任何伺服器。",
      canonical: "https://imagemarker.app/resize",
      jsonLd: webAppSchema({
        name: "圖片縮放工具 — ImageMarker",
        description:
          "免費線上圖片縮放工具，輸入寬高即可調整圖片大小，內建社群媒體與大頭照常用尺寸。在瀏覽器中以 Canvas 技術即時縮放，100% 本機處理，圖片不會上傳到任何伺服器。",
        url: "https://imagemarker.app/resize",
        featureList: [
          "100% 瀏覽器本機處理，圖片不上傳",
          "自訂寬高調整圖片大小，可鎖定長寬比避免變形",
          "內建社群媒體、HD/4K 與大頭照常用尺寸，一鍵套用",
          "即時預覽縮放前後的尺寸與檔案大小",
        ],
      }),
    });
  }, []);

  // 寬高變動時自動重新縮放
  useEffect(() => {
    if (!selectedFile || width < 1 || height < 1) return;
    let cancelled = false;
    setIsResizing(true);
    setError(null);
    const timer = setTimeout(() => {
      resizeImage(selectedFile, Math.round(width), Math.round(height))
        .then(({ blob, type }) => {
          if (cancelled) return;
          setResult((prev) => {
            if (prev) URL.revokeObjectURL(prev.url);
            return {
              url: URL.createObjectURL(blob),
              size: blob.size,
              type,
              w: Math.round(width),
              h: Math.round(height),
            };
          });
        })
        .catch((e) => {
          if (!cancelled) setError(e.message || "縮放失敗");
        })
        .finally(() => {
          if (!cancelled) setIsResizing(false);
        });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [selectedFile, width, height]);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("請選擇圖片檔案（JPG、PNG、WebP、BMP、GIF）");
      return;
    }
    trackToolUseStart("resize");
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setError(null);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      setOrigSize({ w: img.naturalWidth, h: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setSelectedFile(file);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert("圖片讀取失敗");
    };
    img.src = url;
  };

  const ratio = origSize ? origSize.w / origSize.h : 1;

  const onWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && val > 0) {
      setHeight(Math.round(val / ratio));
    }
  };

  const onHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && val > 0) {
      setWidth(Math.round(val * ratio));
    }
  };

  const applyPreset = (p: Preset) => {
    // 套用預設尺寸時暫時忽略鎖定比例，精準符合目標尺寸
    setWidth(p.w);
    setHeight(p.h);
  };

  const downloadResult = () => {
    if (!result || !selectedFile) return;
    const base = selectedFile.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}-${result.w}x${result.h}.${extForType(result.type)}`;
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
    setOrigSize(null);
    setWidth(0);
    setHeight(0);
    setLockRatio(true);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="zh" current="resize" />

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

              {selectedFile && origSize && (
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
                      {origSize.w}×{origSize.h}
                    </span>
                  </div>
                </div>
              )}
            </Card>

            {selectedFile && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">縮放設定</h2>

                {/* 寬高輸入 */}
                <div className="flex items-end space-x-3 mb-2">
                  <div className="flex-1">
                    <label
                      htmlFor="width"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      寬度 (px)
                    </label>
                    <input
                      id="width"
                      type="number"
                      min={1}
                      value={width || ""}
                      onChange={(e) => onWidthChange(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setLockRatio(!lockRatio)}
                    className={`mb-1 p-2 rounded-lg border transition-colors ${
                      lockRatio
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-500 border-gray-300 hover:border-primary"
                    }`}
                    aria-label={lockRatio ? "已鎖定比例，點擊解鎖" : "已解鎖比例，點擊鎖定"}
                    title={lockRatio ? "已鎖定長寬比" : "已解鎖長寬比"}
                  >
                    {lockRatio ? (
                      <Link2 className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Link2Off className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                  <div className="flex-1">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      高度 (px)
                    </label>
                    <input
                      id="height"
                      type="number"
                      min={1}
                      value={height || ""}
                      onChange={(e) => onHeightChange(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-6">
                  {lockRatio
                    ? "已鎖定長寬比，調整其一另一邊會自動換算。"
                    : "已解鎖長寬比，可自由設定寬高（圖片可能變形）。"}
                </p>

                {/* 預設尺寸 */}
                {PRESET_GROUPS.map((group) => (
                  <div key={group.title} className="mb-4">
                    <span className="block text-sm font-medium text-gray-700 mb-2">
                      {group.title}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((p) => {
                        const active = width === p.w && height === p.h;
                        return (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => applyPreset(p)}
                            className={`py-1.5 px-3 rounded-lg text-xs border transition-colors ${
                              active
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                            }`}
                          >
                            {p.label}
                            <span className="block text-[10px] opacity-70">
                              {p.w}×{p.h}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>

          {/* 右側：結果 + 預覽 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">縮放結果</h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  請先上傳圖片，這裡會顯示縮放前後的尺寸、大小比較與預覽。
                </p>
              )}
              {selectedFile && origSize && (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">原始尺寸</p>
                      <p className="text-base font-semibold text-gray-900">
                        {origSize.w}×{origSize.h}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">縮放後</p>
                      <p className="text-base font-semibold text-green-600">
                        {result ? `${result.w}×${result.h}` : "—"}
                      </p>
                    </div>
                  </div>

                  {result && (
                    <p className="text-xs text-gray-500 mb-4">
                      輸出檔案大小：{formatSize(result.size)}
                    </p>
                  )}
                  {isResizing && (
                    <p className="text-sm text-gray-500 mb-4">縮放中...</p>
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
                        alt="縮放後的預覽"
                        className="max-w-full rounded-lg border border-gray-200"
                      />
                      <DownloadSuccess tool="resize" lang="zh" imageCount={1} className="mt-4" />
                    </>
                  )}
                </>
              )}
            </Card>

            <Card className="p-6">
              <ActionButtons
                download={{
                  onClick: downloadResult,
                  disabled: !result || isResizing,
                  icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "下載縮放後圖片",
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
          <ToolRecommendations current="resize" lang="zh" className="mt-12" />
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
              <Scaling className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">即時縮放</h3>
              <p className="text-sm text-gray-600">
                輸入尺寸或點選預設按鈕，立即看到縮放後的預覽與檔案大小。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">常用尺寸快捷</h3>
              <p className="text-sm text-gray-600">
                內建社群媒體、HD/4K 與大頭照常用尺寸，一鍵套用。
              </p>
            </Card>
          </div>
        </section>

        {/* SEO 內容 */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            為什麼要調整圖片大小？
          </h2>
          <p>
            不同用途對圖片尺寸有不同要求：社群媒體封面、大頭貼、證件照都有固定規格，網頁圖片太大則會拖慢載入速度。
            透過縮放工具，你可以快速把圖片調整到指定的寬高，符合上傳規範或縮小檔案。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% 本機處理，隱私安全
          </h2>
          <p>
            和許多需要把圖片上傳到伺服器的線上縮放服務不同，本工具完全在你的瀏覽器中以 Canvas API 運作。
            你的圖片不會被上傳、儲存或傳送給任何第三方，特別適合處理證件、合約或含個人資訊的照片。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            鎖定比例與預設尺寸
          </h2>
          <p>
            預設會鎖定長寬比，調整寬度時高度會自動換算，避免圖片變形。若需要精準的固定尺寸（例如大頭照或社群封面），
            可點選內建的預設尺寸按鈕一鍵套用，或解鎖比例後自由輸入寬高。
          </p>
        </section>
      </main>

      <SiteFooter lang="zh" />
    </div>
  );
}
