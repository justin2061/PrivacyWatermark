import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { KofiSupport } from "@/components/KofiSupport";
import { useExifCleaner } from "@/hooks/useExifCleaner";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  EraserIcon,
  Image as ImageIcon,
  Lock,
  RefreshCw,
  Shield,
  Upload,
  Zap,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp";

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

export default function ExifCleanPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
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
  } = useExifCleaner();

  useEffect(() => {
    return setPageSeo({
      title: "EXIF 清除器 — 移除照片 GPS 與隱私資訊，100% 本機處理",
      description:
        "免費線上 EXIF 清除工具，移除照片中的 GPS 定位、相機型號、序號、拍攝時間等隱藏資訊，分享前保護隱私。100% 瀏覽器本機處理，圖片不會上傳到任何伺服器。",
      canonical: "https://imagemarker.app/exif-clean",
      jsonLd: webAppSchema({
        name: "EXIF 清除器 — ImageMarker",
        description:
          "免費線上 EXIF 清除工具，移除照片中的 GPS 定位、相機型號、序號、拍攝時間等隱藏資訊，分享前保護隱私。100% 瀏覽器本機處理，圖片不會上傳到任何伺服器。",
        url: "https://imagemarker.app/exif-clean",
        featureList: [
          "100% 瀏覽器本機處理，照片不上傳",
          "移除 GPS 定位、相機型號、序號等隱藏資訊",
          "自動標紅 GPS、序號、拍攝時間等敏感欄位",
          "JPEG 無損清除，不重新編碼畫質不變",
          "支援 JPG、PNG、WebP 格式",
        ],
      }),
    });
  }, []);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!ACCEPTED.split(",").includes(file.type)) {
      alert("僅支援 JPG、PNG、WebP 格式");
      return;
    }
    handleFileSelect(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 hover-elevate rounded-lg px-2 py-1 -ml-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg" role="img" aria-label="橡皮擦">🧼</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">EXIF 清除器</h1>
                <p className="text-xs text-gray-600">移除照片中的 GPS、相機、軟體等隱私資訊</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <ImageIcon className="w-4 h-4" aria-hidden="true" />
                <span>浮水印工具</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="text-green-600 w-4 h-4" aria-hidden="true" />
                <span className="text-sm text-gray-600">100% 本地處理</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-blue-50 border-blue-200 p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="text-primary mt-0.5 w-5 h-5" />
            <div>
              <h2 className="font-medium text-blue-900 mb-1">為什麼要清除 EXIF？</h2>
              <p className="text-sm text-blue-800">
                手機與相機在每張照片裡都會寫入隱藏資訊：拍攝地點 GPS、相機型號、序號、修圖軟體、拍攝時間等。
                上傳到社群、論壇或交給第三方前清除這些資料，可避免家裡地址、行蹤被反推出來。所有處理都在瀏覽器中完成，圖片不會上傳。
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">上傳圖片</h2>
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
                aria-label="上傳圖片區域，點擊或拖放檔案"
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Upload className="text-gray-400 w-12 h-12 mb-4 mx-auto" aria-hidden="true" />
                <p className="text-gray-600 mb-2">將圖片拖放到此處，或點擊選擇檔案</p>
                <p className="text-sm text-gray-600 mb-4">支援 JPG、PNG、WebP 格式</p>
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  選擇檔案
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED}
                className="hidden"
                onChange={(e) => onPickFile(e.target.files?.[0])}
                aria-label="選擇圖片檔案"
              />

              {selectedFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-600 w-5 h-5" aria-hidden="true" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                    <span className="text-xs text-gray-600">{formatSize(selectedFile.size)}</span>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={cleanFile}
                  disabled={!selectedFile || isCleaning || isReading}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <EraserIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {isCleaning ? "清除中..." : "清除 metadata"}
                </button>

                <button
                  onClick={downloadCleaned}
                  disabled={!cleaned}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  下載乾淨圖片
                </button>

                <button
                  onClick={reset}
                  disabled={!selectedFile}
                  className="w-full bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  重新開始
                </button>

                <KofiSupport className="mt-2" />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">偵測到的 metadata</h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">請先上傳圖片，這裡會列出所有偵測到的隱藏資訊。</p>
              )}
              {selectedFile && isReading && (
                <p className="text-sm text-gray-500">分析中...</p>
              )}
              {selectedFile && !isReading && report && !report.hasMetadata && (
                <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="text-green-600 w-5 h-5 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-green-900">這張圖已經沒有 metadata</p>
                    <p className="text-xs text-green-800 mt-1">不需要清除，可直接使用。</p>
                  </div>
                </div>
              )}
              {selectedFile && !isReading && report && report.hasMetadata && (
                <>
                  {report.sensitiveCount > 0 && (
                    <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                      <AlertTriangle className="text-amber-600 w-5 h-5 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-medium text-amber-900">
                          偵測到 {report.sensitiveCount} 項敏感資訊
                        </p>
                        <p className="text-xs text-amber-800 mt-1">
                          標紅的欄位（GPS、序號、拍攝時間等）建議清除後再分享。
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {report.entries.map((entry, idx) => (
                          <tr
                            key={`${entry.label}-${idx}`}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-3 py-2 font-medium text-gray-700 align-top w-1/3">
                              {entry.sensitive && (
                                <span
                                  className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2 align-middle"
                                  aria-label="敏感資訊"
                                />
                              )}
                              {entry.label}
                            </td>
                            <td
                              className={`px-3 py-2 break-all ${
                                entry.sensitive ? "text-red-700" : "text-gray-600"
                              }`}
                            >
                              {entry.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </Card>

            {cleaned && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">清除結果</h2>
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <CheckCircle className="text-green-600 w-5 h-5 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">已產生乾淨版本</p>
                    <p className="text-xs text-green-800 mt-1">
                      檔名：{cleaned.filename}　大小：{formatSize(cleaned.size)}
                    </p>
                  </div>
                </div>
                <img
                  src={cleaned.url}
                  alt="清除 metadata 後的預覽"
                  className="max-w-full rounded-lg border border-gray-200"
                />
                <KofiSupport variant="success" className="mt-4" />
              </Card>
            )}
          </div>
        </div>

        <section className="mt-12">
          <h2 className="sr-only">特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">純本地處理</h3>
              <p className="text-sm text-gray-600">
                圖片不會離開你的瀏覽器，沒有伺服器，沒有上傳。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Zap className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">JPEG 無損</h3>
              <p className="text-sm text-gray-600">
                JPEG 採用 piexifjs 直接刪除 metadata 段，不重新編碼，畫質完全不變。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">敏感資訊提示</h3>
              <p className="text-sm text-gray-600">
                自動標紅 GPS、序號、拍攝時間等高風險欄位。
              </p>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 隱私工具集 - 保護您的隱私安全
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-primary hover:underline">
                浮水印工具
              </Link>
              <Link href="/blog" className="text-sm text-primary hover:underline">
                教學文章
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
