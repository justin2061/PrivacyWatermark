import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { trackToolUseStart } from "@/lib/analytics";
import {
  CheckCircle,
  Crop,
  Download,
  Facebook,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  Lock,
  Move,
  RefreshCw,
  Sliders,
  Twitter,
  Upload,
  Youtube,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";
const CANVA_URL = "https://www.canva.com";

type Platform = {
  key: string;
  name: string;
  w: number;
  h: number;
  ratio: string;
  icon: LucideIcon;
};

// 常用社群媒體尺寸（含長寬比說明）
const PLATFORMS: Platform[] = [
  { key: "ig-post", name: "Instagram 貼文", w: 1080, h: 1080, ratio: "1:1", icon: Instagram },
  { key: "ig-story", name: "Instagram 限動", w: 1080, h: 1920, ratio: "9:16", icon: Instagram },
  { key: "fb-cover", name: "Facebook 封面", w: 820, h: 312, ratio: "205:78", icon: Facebook },
  { key: "fb-post", name: "Facebook 貼文", w: 1200, h: 630, ratio: "1.91:1", icon: Facebook },
  { key: "yt-thumb", name: "YouTube 縮圖", w: 1280, h: 720, ratio: "16:9", icon: Youtube },
  { key: "tw-header", name: "Twitter / X 標題", w: 1500, h: 500, ratio: "3:1", icon: Twitter },
  { key: "li-cover", name: "LinkedIn 封面", w: 1584, h: 396, ratio: "4:1", icon: Linkedin },
  { key: "pin", name: "Pinterest Pin", w: 1000, h: 1500, ratio: "2:3", icon: ImageIcon },
];

const CUSTOM_KEY = "custom";
const MAX_DISPLAY_H = 460; // 預覽區最大高度（px）

function extForType(type: string) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  return "png";
}

// 依目標長寬比，算出可完整框在圖片內的最大裁切框（原圖像素）
function maxCropFor(imgW: number, imgH: number, ratio: number) {
  if (imgW / imgH > ratio) {
    return { w: imgH * ratio, h: imgH };
  }
  return { w: imgW, h: imgW / ratio };
}

export default function SocialCropPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  const [platformKey, setPlatformKey] = useState<string>("ig-post");
  const [customW, setCustomW] = useState<number>(1080);
  const [customH, setCustomH] = useState<number>(1080);

  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomPct, setZoomPct] = useState<number>(100); // 100 = 完整範圍，越大越放大
  const [containerW, setContainerW] = useState<number>(0);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    return setPageSeo({
      title: "社群媒體圖片裁切工具 - 免費線上工具 | ImageMarker",
      description:
        "免費社群圖片尺寸裁切工具，一鍵套用 Instagram 貼文/限動、Facebook 封面、YouTube 縮圖、Twitter/X、LinkedIn、Pinterest 等常用尺寸。拖曳裁切框即時預覽，全程在瀏覽器以 Canvas 處理，圖片不上傳。",
      canonical: "https://imagemarker.app/social-crop",
      jsonLd: webAppSchema({
        name: "社群媒體圖片裁切工具 — ImageMarker",
        description:
          "免費社群圖片尺寸裁切工具，內建 Instagram、Facebook、YouTube、Twitter/X、LinkedIn、Pinterest 等常用尺寸，拖曳裁切框即時預覽並一鍵下載。100% 瀏覽器本機處理。",
        url: "https://imagemarker.app/social-crop",
        featureList: [
          "內建 Instagram、Facebook、YouTube、Twitter/X、LinkedIn、Pinterest 常用尺寸",
          "拖曳裁切框調整位置，可縮放取景範圍",
          "即時預覽裁切結果並一鍵下載",
          "支援自訂尺寸",
          "100% 瀏覽器本機處理，圖片不上傳",
        ],
      }),
    });
  }, []);

  // 量測預覽容器寬度，供裁切框座標換算
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setContainerW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [imgEl]);

  const target =
    platformKey === CUSTOM_KEY
      ? { w: Math.max(1, Math.round(customW)), h: Math.max(1, Math.round(customH)) }
      : (() => {
          const p = PLATFORMS.find((x) => x.key === platformKey)!;
          return { w: p.w, h: p.h };
        })();
  const ratio = target.w / target.h;

  const maxCrop = imgSize ? maxCropFor(imgSize.w, imgSize.h, ratio) : { w: 0, h: 0 };
  const fraction = 100 / zoomPct;
  const cropW = maxCrop.w * fraction;
  const cropH = maxCrop.h * fraction;

  // 換平台 / 換圖 / 改自訂尺寸時，重置裁切框到置中最大範圍
  useEffect(() => {
    if (!imgSize) return;
    const mc = maxCropFor(imgSize.w, imgSize.h, ratio);
    setZoomPct(100);
    setPos({ x: (imgSize.w - mc.w) / 2, y: (imgSize.h - mc.h) / 2 });
    setDownloaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSize, platformKey, customW, customH]);

  // 顯示縮放比例：讓圖片填滿容器寬度，但高度不超過 MAX_DISPLAY_H
  let displayScale = 0;
  let displayW = 0;
  let displayH = 0;
  if (imgSize && containerW > 0) {
    displayScale = containerW / imgSize.w;
    if (imgSize.h * displayScale > MAX_DISPLAY_H) {
      displayScale = MAX_DISPLAY_H / imgSize.h;
    }
    displayW = imgSize.w * displayScale;
    displayH = imgSize.h * displayScale;
  }

  const clampPos = (x: number, y: number) => {
    if (!imgSize) return { x: 0, y: 0 };
    return {
      x: Math.min(Math.max(0, x), Math.max(0, imgSize.w - cropW)),
      y: Math.min(Math.max(0, y), Math.max(0, imgSize.h - cropH)),
    };
  };

  const onZoomChange = (val: number) => {
    if (!imgSize) {
      setZoomPct(val);
      return;
    }
    const oldFrac = 100 / zoomPct;
    const newFrac = 100 / val;
    const cx = pos.x + (maxCrop.w * oldFrac) / 2;
    const cy = pos.y + (maxCrop.h * oldFrac) / 2;
    const nW = maxCrop.w * newFrac;
    const nH = maxCrop.h * newFrac;
    setZoomPct(val);
    setPos({
      x: Math.min(Math.max(0, cx - nW / 2), Math.max(0, imgSize.w - nW)),
      y: Math.min(Math.max(0, cy - nH / 2), Math.max(0, imgSize.h - nH)),
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || displayScale === 0) return;
    const { sx, sy, px, py } = dragRef.current;
    const dx = (e.clientX - sx) / displayScale;
    const dy = (e.clientY - sy) / displayScale;
    setPos(clampPos(px + dx, py + dy));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  // 即時繪製裁切結果預覽
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !imgEl || !imgSize) return;
    canvas.width = target.w;
    canvas.height = target.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, target.w, target.h);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      imgEl,
      Math.round(pos.x),
      Math.round(pos.y),
      Math.round(cropW),
      Math.round(cropH),
      0,
      0,
      target.w,
      target.h
    );
  }, [imgEl, imgSize, pos, cropW, cropH, target.w, target.h]);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("請選擇圖片檔案（JPG、PNG、WebP、BMP、GIF）");
      return;
    }
    trackToolUseStart("social-crop");
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImgUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setImgEl(img);
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
      setSelectedFile(file);
      setDownloaded(false);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert("圖片讀取失敗");
    };
    img.src = url;
  };

  const download = async () => {
    if (!imgEl || !selectedFile) return;
    const canvas = document.createElement("canvas");
    canvas.width = target.w;
    canvas.height = target.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const outType =
      selectedFile.type === "image/jpeg" || selectedFile.type === "image/webp"
        ? selectedFile.type
        : "image/png";
    if (outType === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, target.w, target.h);
    }
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      imgEl,
      Math.round(pos.x),
      Math.round(pos.y),
      Math.round(cropW),
      Math.round(cropH),
      0,
      0,
      target.w,
      target.h
    );
    const blob: Blob | null = await new Promise((res) =>
      canvas.toBlob((b) => res(b), outType, 0.92)
    );
    if (!blob) {
      alert("裁切失敗，請重試");
      return;
    }
    const base = selectedFile.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}-${target.w}x${target.h}.${extForType(outType)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  };

  const reset = () => {
    setImgUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setSelectedFile(null);
    setImgEl(null);
    setImgSize(null);
    setPlatformKey("ig-post");
    setZoomPct(100);
    setDownloaded(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const selectedPlatform = PLATFORMS.find((p) => p.key === platformKey);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="zh" current="social-crop" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="zh" className="mb-8" />

        {!selectedFile && (
          <Card className="p-6 mb-8">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">社群媒體圖片裁切</h1>
            <p className="text-sm text-gray-600 mb-4">
              上傳圖片，選擇平台尺寸，拖曳裁切框即可一鍵輸出符合規格的圖片。
            </p>
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
              <p className="text-sm text-gray-600 mb-4">支援 JPG、PNG、WebP、BMP、GIF</p>
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                選擇檔案
              </button>
            </div>
          </Card>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => onPickFile(e.target.files?.[0])}
          aria-label="選擇圖片檔案"
        />

        {selectedFile && imgUrl && imgSize && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左：裁切編輯區 */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    裁切預覽
                    {selectedPlatform && (
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        {selectedPlatform.name}
                      </span>
                    )}
                  </h2>
                  <span className="text-xs text-gray-500">
                    目標 {target.w}×{target.h}
                  </span>
                </div>

                <div
                  ref={wrapperRef}
                  className="relative mx-auto overflow-hidden rounded-lg bg-gray-900 select-none"
                  style={{ width: displayW || "100%", height: displayH || undefined }}
                >
                  {displayW > 0 && (
                    <>
                      <img
                        src={imgUrl}
                        alt="待裁切圖片"
                        draggable={false}
                        className="block w-full h-full pointer-events-none"
                        style={{ width: displayW, height: displayH }}
                      />
                      {/* 裁切框 + 外部半透明遮罩（box-shadow） */}
                      <div
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        className="absolute border-2 border-white cursor-move"
                        style={{
                          left: pos.x * displayScale,
                          top: pos.y * displayScale,
                          width: cropW * displayScale,
                          height: cropH * displayScale,
                          boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                          touchAction: "none",
                        }}
                        role="slider"
                        aria-label="裁切框，拖曳以調整裁切位置"
                        aria-valuetext={`位置 ${Math.round(pos.x)}, ${Math.round(pos.y)}`}
                        tabIndex={0}
                      >
                        {/* 四角把手（視覺提示） */}
                        <span className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-white" />
                        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-white" />
                        <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-white" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-white" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Move className="w-6 h-6 text-white/70" aria-hidden="true" />
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* 縮放取景範圍 */}
                <div className="mt-5">
                  <label
                    htmlFor="zoom"
                    className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2"
                  >
                    <span>取景縮放</span>
                    <span className="text-gray-500">{zoomPct}%</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onZoomChange(Math.max(100, zoomPct - 10))}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors"
                      aria-label="縮小取景（顯示更多畫面）"
                    >
                      <ZoomOut className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <input
                      id="zoom"
                      type="range"
                      min={100}
                      max={400}
                      step={5}
                      value={zoomPct}
                      onChange={(e) => onZoomChange(Number(e.target.value))}
                      className="flex-1 h-2 accent-primary cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => onZoomChange(Math.min(400, zoomPct + 10))}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors"
                      aria-label="放大取景（裁切更小範圍）"
                    >
                      <ZoomIn className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    拖曳白色裁切框可調整位置；使用滑桿放大取景以裁切更小範圍。
                  </p>
                </div>
              </Card>
            </div>

            {/* 右：平台選單 + 輸出 */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">選擇尺寸</h2>
                <div className="grid grid-cols-2 gap-2">
                  {PLATFORMS.map((p) => {
                    const Icon = p.icon;
                    const active = platformKey === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setPlatformKey(p.key)}
                        className={`flex flex-col items-start gap-1 p-2.5 rounded-lg border text-left transition-colors ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        <span className="text-xs font-medium leading-tight">{p.name}</span>
                        <span
                          className={`text-[10px] ${active ? "text-white/80" : "text-gray-500"}`}
                        >
                          {p.w}×{p.h} · {p.ratio}
                        </span>
                      </button>
                    );
                  })}
                  {/* 自訂尺寸 */}
                  <button
                    type="button"
                    onClick={() => setPlatformKey(CUSTOM_KEY)}
                    className={`flex flex-col items-start gap-1 p-2.5 rounded-lg border text-left transition-colors ${
                      platformKey === CUSTOM_KEY
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                    }`}
                  >
                    <Sliders className="w-4 h-4" aria-hidden="true" />
                    <span className="text-xs font-medium leading-tight">自訂尺寸</span>
                    <span
                      className={`text-[10px] ${
                        platformKey === CUSTOM_KEY ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      自由輸入寬高
                    </span>
                  </button>
                </div>

                {platformKey === CUSTOM_KEY && (
                  <div className="mt-4 flex items-end gap-3">
                    <div className="flex-1">
                      <label
                        htmlFor="cw"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        寬度 (px)
                      </label>
                      <input
                        id="cw"
                        type="number"
                        min={1}
                        value={customW || ""}
                        onChange={(e) => setCustomW(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <span className="pb-2 text-gray-400">×</span>
                    <div className="flex-1">
                      <label
                        htmlFor="ch"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        高度 (px)
                      </label>
                      <input
                        id="ch"
                        type="number"
                        min={1}
                        value={customH || ""}
                        onChange={(e) => setCustomH(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">輸出預覽</h2>
                <div className="flex justify-center mb-4 rounded-lg bg-gray-100 p-3">
                  <canvas
                    ref={previewCanvasRef}
                    className="max-w-full rounded border border-gray-200 bg-white"
                    style={{
                      width: ratio >= 1 ? Math.min(240, target.w) : undefined,
                      height: ratio < 1 ? Math.min(240, target.h) : undefined,
                      maxHeight: 240,
                    }}
                    aria-label="裁切結果預覽"
                  />
                </div>
                <p className="text-center text-xs text-gray-500 mb-4">
                  輸出尺寸 {target.w}×{target.h}px
                </p>

                <div className="space-y-3">
                  <button
                    onClick={download}
                    disabled={target.w < 1 || target.h < 1}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    裁切並下載
                  </button>
                  <button
                    onClick={reset}
                    className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                    重新開始
                  </button>
                </div>

                {/* 下載後：Ko-fi 支持 + 情境式聯盟推薦（含 Canva，帶 GA 追蹤） */}
                {downloaded && (
                  <DownloadSuccess tool="social-crop" lang="zh" imageCount={1} className="mt-4" />
                )}
              </Card>

              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    原始尺寸 {imgSize.w}×{imgSize.h}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {downloaded && (
          <ToolRecommendations current="social-crop" lang="zh" className="mt-12" />
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
              <Crop className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">常用尺寸一鍵套用</h3>
              <p className="text-sm text-gray-600">
                內建各大社群平台的貼文、封面與縮圖尺寸，選了就能裁，不用查規格。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">即時預覽</h3>
              <p className="text-sm text-gray-600">
                拖曳裁切框與縮放取景，右側即時顯示裁切後的成品。
              </p>
            </Card>
          </div>
        </section>

        {/* SEO 內容 */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">社群圖片尺寸怎麼抓？</h2>
          <p>
            每個社群平台對圖片尺寸都有不同建議：Instagram 貼文是 1080×1080 的正方形、限動是
            1080×1920 的直式；Facebook 封面約 820×312、貼文分享圖 1200×630；YouTube 縮圖 1280×720；
            Twitter/X 標題 1500×500；LinkedIn 封面 1584×396；Pinterest Pin 則偏好 1000×1500 的直式。
            這個工具把這些常用尺寸都內建好了，選擇平台後拖曳裁切框即可輸出符合規格的圖片。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">100% 本機處理，隱私安全</h2>
          <p>
            和許多需要把圖片上傳到伺服器的線上裁切服務不同，本工具完全在你的瀏覽器中以 Canvas API
            運作。你的圖片不會被上傳、儲存或傳送給任何第三方，適合處理含個人資訊的照片或商業素材。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">裁切後想再加設計？</h2>
          <p>
            裁切好尺寸後，如果還想為貼文加上文字、貼紙或版面設計，可以搭配{" "}
            <a
              href={CANVA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Canva
            </a>{" "}
            的免費模板，快速做出更完整的社群貼文。
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
              <Link href="/resize" className="text-sm text-primary hover:underline">
                圖片縮放
              </Link>
              <Link href="/compress" className="text-sm text-primary hover:underline">
                圖片壓縮
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
