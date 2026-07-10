import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { KofiSupport } from "@/components/KofiSupport";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import {
  CheckCircle,
  Crop,
  Download,
  ExternalLink,
  Facebook,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  Lock,
  Move,
  RefreshCw,
  Sliders,
  Sparkles,
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

const PLATFORMS: Platform[] = [
  { key: "ig-post", name: "Instagram Post", w: 1080, h: 1080, ratio: "1:1", icon: Instagram },
  { key: "ig-story", name: "Instagram Story", w: 1080, h: 1920, ratio: "9:16", icon: Instagram },
  { key: "fb-cover", name: "Facebook Cover", w: 820, h: 312, ratio: "205:78", icon: Facebook },
  { key: "fb-post", name: "Facebook Post", w: 1200, h: 630, ratio: "1.91:1", icon: Facebook },
  { key: "yt-thumb", name: "YouTube Thumbnail", w: 1280, h: 720, ratio: "16:9", icon: Youtube },
  { key: "tw-header", name: "Twitter / X Header", w: 1500, h: 500, ratio: "3:1", icon: Twitter },
  { key: "li-cover", name: "LinkedIn Cover", w: 1584, h: 396, ratio: "4:1", icon: Linkedin },
  { key: "pin", name: "Pinterest Pin", w: 1000, h: 1500, ratio: "2:3", icon: ImageIcon },
];

const CUSTOM_KEY = "custom";
const MAX_DISPLAY_H = 460;

function extForType(type: string) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  return "png";
}

function maxCropFor(imgW: number, imgH: number, ratio: number) {
  if (imgW / imgH > ratio) {
    return { w: imgH * ratio, h: imgH };
  }
  return { w: imgW, h: imgW / ratio };
}

export default function SocialCropEnPage() {
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
  const [zoomPct, setZoomPct] = useState<number>(100);
  const [containerW, setContainerW] = useState<number>(0);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    return setPageSeo({
      title: "Social Media Image Resizer - Free Online Tool | ImageMarker",
      description:
        "Free social media image resizer and cropper. One click to resize image for Instagram, Facebook cover photo size, YouTube thumbnail size, Twitter/X, LinkedIn and Pinterest. Drag to crop with live preview — 100% in-browser, no uploads.",
      canonical: "https://imagemarker.app/en/social-crop",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "Social Media Image Resizer — ImageMarker",
        description:
          "Free social media image resizer and cropper with built-in Instagram, Facebook, YouTube, Twitter/X, LinkedIn and Pinterest sizes. Drag the crop box, preview live and download in one click. 100% local in-browser processing.",
        url: "https://imagemarker.app/en/social-crop",
        inLanguage: "en",
        featureList: [
          "Built-in Instagram, Facebook, YouTube, Twitter/X, LinkedIn and Pinterest sizes",
          "Drag the crop box to reposition and zoom the framing",
          "Live preview of the cropped result with one-click download",
          "Custom size support",
          "100% local in-browser processing — no uploads",
        ],
      }),
    });
  }, []);

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

  useEffect(() => {
    if (!imgSize) return;
    const mc = maxCropFor(imgSize.w, imgSize.h, ratio);
    setZoomPct(100);
    setPos({ x: (imgSize.w - mc.w) / 2, y: (imgSize.h - mc.h) / 2 });
    setDownloaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSize, platformKey, customW, customH]);

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
      alert("Please choose an image file (JPG, PNG, WebP, BMP, GIF)");
      return;
    }
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
      alert("Failed to load image");
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
      alert("Crop failed, please try again");
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
      <SiteHeader lang="en" current="social-crop" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="en" className="mb-8" />

        {!selectedFile && (
          <Card className="p-6 mb-8">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">Social Media Image Resizer</h1>
            <p className="text-sm text-gray-600 mb-4">
              Upload an image, pick a platform size, drag the crop box and export a perfectly sized image in one click.
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
              aria-label="Upload area, click or drag and drop a file"
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Upload className="text-gray-400 w-12 h-12 mb-4 mx-auto" aria-hidden="true" />
              <p className="text-gray-600 mb-2">Drag and drop an image here, or click to select</p>
              <p className="text-sm text-gray-600 mb-4">Supports JPG, PNG, WebP, BMP, GIF</p>
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose File
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
          aria-label="Select image file"
        />

        {selectedFile && imgUrl && imgSize && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: crop editor */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Crop Preview
                    {selectedPlatform && (
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        {selectedPlatform.name}
                      </span>
                    )}
                  </h2>
                  <span className="text-xs text-gray-500">
                    Target {target.w}×{target.h}
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
                        alt="Image to crop"
                        draggable={false}
                        className="block w-full h-full pointer-events-none"
                        style={{ width: displayW, height: displayH }}
                      />
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
                        aria-label="Crop box, drag to adjust the crop position"
                        aria-valuetext={`Position ${Math.round(pos.x)}, ${Math.round(pos.y)}`}
                        tabIndex={0}
                      >
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

                <div className="mt-5">
                  <label
                    htmlFor="zoom"
                    className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2"
                  >
                    <span>Zoom framing</span>
                    <span className="text-gray-500">{zoomPct}%</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onZoomChange(Math.max(100, zoomPct - 10))}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors"
                      aria-label="Zoom out (show more of the image)"
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
                      aria-label="Zoom in (crop a smaller area)"
                    >
                      <ZoomIn className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Drag the white crop box to reposition; use the slider to zoom in and crop a smaller area.
                  </p>
                </div>
              </Card>
            </div>

            {/* Right: platform picker + output */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Size</h2>
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
                    <span className="text-xs font-medium leading-tight">Custom Size</span>
                    <span
                      className={`text-[10px] ${
                        platformKey === CUSTOM_KEY ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      Enter width & height
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
                        Width (px)
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
                        Height (px)
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Output Preview</h2>
                <div className="flex justify-center mb-4 rounded-lg bg-gray-100 p-3">
                  <canvas
                    ref={previewCanvasRef}
                    className="max-w-full rounded border border-gray-200 bg-white"
                    style={{
                      width: ratio >= 1 ? Math.min(240, target.w) : undefined,
                      height: ratio < 1 ? Math.min(240, target.h) : undefined,
                      maxHeight: 240,
                    }}
                    aria-label="Cropped result preview"
                  />
                </div>
                <p className="text-center text-xs text-gray-500 mb-4">
                  Output size {target.w}×{target.h}px
                </p>

                <div className="space-y-3">
                  <button
                    onClick={download}
                    disabled={target.w < 1 || target.h < 1}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    Crop &amp; Download
                  </button>
                  <button
                    onClick={reset}
                    className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                    Start Over
                  </button>
                </div>

                {/* Canva recommendation (shown after download) */}
                {downloaded && (
                  <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <p className="flex items-start gap-2 text-sm text-purple-900">
                      <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span>
                        Need to add text and design to your social post? Try Canva's free templates.
                      </span>
                    </p>
                    <a
                      href={CANVA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-purple-700 hover:text-purple-900"
                    >
                      Go to Canva
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}

                <KofiSupport lang="en" className="mt-4 w-full justify-center" />
              </Card>

              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Original {imgSize.w}×{imgSize.h}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="mt-12">
          <h2 className="sr-only">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">100% Local</h3>
              <p className="text-sm text-gray-600">
                Your images never leave your browser. No server, no uploads, no size limits.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Crop className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">One-tap Presets</h3>
              <p className="text-sm text-gray-600">
                Built-in post, cover and thumbnail sizes for every major platform — pick one and crop, no specs to look up.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Live Preview</h3>
              <p className="text-sm text-gray-600">
                Drag the crop box and zoom the framing while the result updates instantly on the right.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Common social media image sizes</h2>
          <p>
            Every platform recommends different image sizes: an Instagram post is a 1080×1080 square and a
            story is a 1080×1920 portrait; a Facebook cover photo size is about 820×312 and a shared post
            image is 1200×630; a YouTube thumbnail size is 1280×720; a Twitter/X header is 1500×500; a
            LinkedIn cover is 1584×396; and a Pinterest Pin prefers a 1000×1500 portrait. This tool has all
            of these built in — pick a platform, drag the crop box and export an image that fits the spec.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% local processing, private by design
          </h2>
          <p>
            Unlike many online croppers that upload your images to a server, this tool runs entirely in your
            browser using the Canvas API. Your images are never uploaded, stored or sent to any third party —
            ideal for photos with personal information or commercial assets.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Want to add a design after cropping?</h2>
          <p>
            Once your image is the right size, if you want to add text, stickers or a layout to your post, pair
            it with{" "}
            <a
              href={CANVA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Canva
            </a>{" "}
            and its free templates to build a more complete social post quickly.
          </p>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 ImageMarker — Protect your privacy
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/en/" className="text-sm text-primary hover:underline">
                Watermark Tool
              </Link>
              <Link href="/en/resize" className="text-sm text-primary hover:underline">
                Image Resizer
              </Link>
              <Link href="/en/compress" className="text-sm text-primary hover:underline">
                Image Compressor
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
