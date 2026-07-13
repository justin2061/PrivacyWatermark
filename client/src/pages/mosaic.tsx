import { useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { trackToolUseStart } from "@/lib/analytics";
import { useMosaic, type MaskType } from "@/hooks/useMosaic";
import {
  CheckCircle,
  Download,
  Grid2x2,
  Lock,
  MousePointerClick,
  RefreshCw,
  Trash2,
  Undo2,
  Upload,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

const MASK_OPTIONS: { value: MaskType; label: string; desc: string }[] = [
  { value: "mosaic", label: "馬賽克", desc: "像素化" },
  { value: "blur", label: "高斯模糊", desc: "柔化" },
  { value: "solid", label: "純色色塊", desc: "完全遮蔽" },
];

export default function MosaicPage() {
  const m = useMosaic({
    invalidType: "請選擇圖片檔案（JPG、PNG、WebP、BMP、GIF）",
    loadFailed: "圖片讀取失敗",
  });

  useEffect(() => {
    return setPageSeo({
      title: "圖片馬賽克工具 - 隱私優先 | ImageMarker",
      description:
        "免費線上圖片馬賽克工具，拖曳選取即可為人臉、車牌、證件號碼打馬賽克、高斯模糊或加上純色色塊。100% 瀏覽器本機處理，圖片不上傳，隱私安全。支援手機觸控操作。",
      canonical: "https://imagemarker.app/mosaic",
      jsonLd: webAppSchema({
        name: "圖片馬賽克工具 — ImageMarker",
        description:
          "免費線上圖片馬賽克工具，拖曳選取即可為人臉、車牌、證件號碼打馬賽克、高斯模糊或加上純色色塊。100% 瀏覽器本機處理，圖片不上傳。",
        url: "https://imagemarker.app/mosaic",
        featureList: [
          "100% 瀏覽器本機處理，圖片不上傳",
          "拖曳選取區域，支援滑鼠與手機觸控",
          "三種遮蔽方式：馬賽克、高斯模糊、純色色塊",
          "可調整馬賽克像素大小與模糊強度",
          "多區域遮蔽，每個區域可個別刪除",
        ],
      }),
    });
  }, []);

  const hasResult = m.regions.length > 0;

  const pickFile = (file?: File | null) => {
    if (!file) return;
    trackToolUseStart("mosaic");
    m.onPickFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="zh" current="mosaic" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="zh" className="mb-8" />

        {!m.selectedFile ? (
          /* 上傳前：置中的空狀態 */
          <Card className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              圖片馬賽克 / 遮蔽工具
            </h1>
            <div
              onDrop={(e) => {
                e.preventDefault();
                pickFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => m.fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  m.fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="上傳圖片區域，點擊或拖放檔案"
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Upload className="text-gray-400 w-12 h-12 mb-4 mx-auto" aria-hidden="true" />
              <p className="text-gray-600 mb-2">將圖片拖放到此處，或點擊選擇檔案</p>
              <p className="text-sm text-gray-600 mb-4">支援 JPG、PNG、WebP、BMP、GIF</p>
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                選擇檔案
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              上傳後在圖片上拖曳，即可為人臉、車牌或證件號碼打馬賽克。所有處理都在你的瀏覽器完成。
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* 主要：畫布 */}
            <div className="space-y-4 order-2 lg:order-1">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 min-w-0">
                    <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium truncate">{m.selectedFile.name}</span>
                  </div>
                  {m.origSize && (
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {m.origSize.w}×{m.origSize.h}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <MousePointerClick className="w-4 h-4" aria-hidden="true" />
                  <span>在圖片上按住並拖曳，框選要遮蔽的區域（可框選多個）</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 flex justify-center">
                  <canvas
                    ref={m.viewCanvasRef}
                    onPointerDown={m.onPointerDown}
                    onPointerMove={m.onPointerMove}
                    onPointerUp={m.onPointerUp}
                    className="max-w-full cursor-crosshair"
                    style={{ touchAction: "none" }}
                    aria-label="可拖曳選取遮蔽區域的圖片畫布"
                  />
                </div>
              </Card>
            </div>

            {/* 側邊：工具列 */}
            <div className="space-y-4 order-1 lg:order-2">
              <Card className="p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">遮蔽方式</h2>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {MASK_OPTIONS.map((opt) => {
                    const active = m.maskType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => m.setMaskType(opt.value)}
                        className={`py-2 px-1 rounded-lg text-sm border transition-colors ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                        }`}
                      >
                        {opt.label}
                        <span className="block text-[10px] opacity-70">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {m.maskType === "mosaic" && (
                  <div className="mb-1">
                    <label htmlFor="pixelSize" className="block text-sm font-medium text-gray-700 mb-2">
                      馬賽克強度（方塊大小）：{m.pixelSize}px
                    </label>
                    <input
                      id="pixelSize"
                      type="range"
                      min={4}
                      max={60}
                      value={m.pixelSize}
                      onChange={(e) => m.setPixelSize(Number(e.target.value))}
                      style={{ "--range-progress": `${((m.pixelSize - 4) / 56) * 100}%` } as React.CSSProperties}
                    />
                    <p className="text-xs text-gray-500 mt-1">數值越大，方塊越大、越模糊。</p>
                  </div>
                )}

                {m.maskType === "blur" && (
                  <div className="mb-1">
                    <label htmlFor="blur" className="block text-sm font-medium text-gray-700 mb-2">
                      模糊強度：{m.blurStrength}px
                    </label>
                    <input
                      id="blur"
                      type="range"
                      min={2}
                      max={40}
                      value={m.blurStrength}
                      onChange={(e) => m.setBlurStrength(Number(e.target.value))}
                      style={{ "--range-progress": `${((m.blurStrength - 2) / 38) * 100}%` } as React.CSSProperties}
                    />
                    <p className="text-xs text-gray-500 mt-1">數值越大，模糊程度越高。</p>
                  </div>
                )}

                {m.maskType === "solid" && (
                  <div className="mb-1">
                    <span className="block text-sm font-medium text-gray-700 mb-2">色塊顏色</span>
                    <div className="flex items-center gap-2">
                      {["#000000", "#ffffff"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => m.setSolidColor(c)}
                          className={`w-8 h-8 rounded-lg border-2 ${
                            m.solidColor.toLowerCase() === c ? "border-primary" : "border-gray-300"
                          }`}
                          style={{ backgroundColor: c }}
                          aria-label={c === "#000000" ? "黑色" : "白色"}
                        />
                      ))}
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="color"
                          value={m.solidColor}
                          onChange={(e) => m.setSolidColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-gray-300 bg-white"
                          aria-label="自訂色塊顏色"
                        />
                        自訂色
                      </label>
                    </div>
                  </div>
                )}
              </Card>

              {/* 已遮蔽區域列表 */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900">
                    已遮蔽區域（{m.regions.length}）
                  </h2>
                  {hasResult && (
                    <button
                      type="button"
                      onClick={m.clearRegions}
                      className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                    >
                      全部清除
                    </button>
                  )}
                </div>
                {!hasResult ? (
                  <p className="text-sm text-gray-500">尚未框選任何區域。</p>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-y-auto">
                    {m.regions.map((r, i) => {
                      const typeLabel =
                        MASK_OPTIONS.find((o) => o.value === r.type)?.label || r.type;
                      return (
                        <li
                          key={r.id}
                          className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <span className="text-sm text-gray-700">
                            #{i + 1} {typeLabel}
                            <span className="text-xs text-gray-400 ml-1">
                              {r.w}×{r.h}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => m.removeRegion(r.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            aria-label={`刪除第 ${i + 1} 個遮蔽區域`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {hasResult && (
                  <button
                    type="button"
                    onClick={m.undoLast}
                    className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-lg py-2 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Undo2 className="w-4 h-4" aria-hidden="true" />
                    復原上一步
                  </button>
                )}
              </Card>

              {/* 操作 */}
              <Card className="p-5">
                <div className="space-y-3">
                  <button
                    onClick={m.download}
                    disabled={!hasResult}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    下載處理後圖片
                  </button>
                  <button
                    onClick={m.reset}
                    className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                    重新開始
                  </button>
                  {hasResult && <DownloadSuccess tool="mosaic" lang="zh" imageCount={1} className="mt-1" />}
                </div>
              </Card>
            </div>
          </div>
        )}

        <input
          ref={m.fileInputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
          aria-label="選擇圖片檔案"
        />

        {hasResult && (
          <ToolRecommendations current="mosaic" lang="zh" className="mt-12" />
        )}

        {/* 特色 */}
        <section className="mt-12">
          <h2 className="sr-only">特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">純本地處理</h3>
              <p className="text-sm text-gray-600">
                圖片不會離開你的瀏覽器，沒有伺服器、沒有上傳，處理含個資的照片也安心。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Grid2x2 className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">三種遮蔽方式</h3>
              <p className="text-sm text-gray-600">
                馬賽克、高斯模糊、純色色塊任你選，強度可調，適合各種遮蔽需求。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <MousePointerClick className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">拖曳即用</h3>
              <p className="text-sm text-gray-600">
                直接在圖片上拖曳框選區域，支援手機觸控，每個區域都能個別刪除。
              </p>
            </Card>
          </div>
        </section>

        {/* SEO 內容 */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            線上圖片打馬賽克，保護隱私
          </h2>
          <p>
            分享照片前，常常需要遮住人臉、車牌、門牌、證件號碼或聊天截圖中的個人資訊。這個馬賽克線上工具讓你直接在圖片上拖曳框選，
            套用馬賽克（像素化）、高斯模糊或純色色塊，快速把敏感內容遮蔽起來。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% 本機處理，圖片不上傳
          </h2>
          <p>
            和許多需要把圖片上傳到伺服器的線上馬賽克服務不同，本工具完全在你的瀏覽器中以 Canvas API 運作。
            你的圖片不會被上傳、儲存或傳送給任何第三方，特別適合處理證件、合約或含個人資訊的照片。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            馬賽克、模糊還是色塊？
          </h2>
          <p>
            馬賽克把區域像素化成方塊，兼顧遮蔽與美觀；高斯模糊讓區域柔化，適合背景或人臉；純色色塊則是完全遮蔽，
            最安全、無法還原，適合證件號碼等絕不能外洩的資訊。可依需求調整馬賽克像素大小與模糊強度。
          </p>
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
              <Link href="/exif-clean" className="text-sm text-primary hover:underline">
                EXIF 清除
              </Link>
              <Link href="/resize" className="text-sm text-primary hover:underline">
                圖片縮放
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
