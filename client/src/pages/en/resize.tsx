import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Download,
  Image as ImageIcon,
  Languages,
  Link2,
  Link2Off,
  Lock,
  RefreshCw,
  Scaling,
  Shield,
  Upload,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

type Preset = { label: string; w: number; h: number };

const PRESET_GROUPS: { title: string; items: Preset[] }[] = [
  {
    title: "Social Media",
    items: [
      { label: "Instagram Square", w: 1080, h: 1080 },
      { label: "FB Cover", w: 820, h: 312 },
      { label: "Twitter Header", w: 1500, h: 500 },
    ],
  },
  {
    title: "General",
    items: [
      { label: "HD", w: 1920, h: 1080 },
      { label: "4K", w: 3840, h: 2160 },
      { label: "800×600", w: 800, h: 600 },
      { label: "640×480", w: 640, h: 480 },
    ],
  },
  {
    title: "ID Photo",
    items: [
      { label: '2 inch', w: 413, h: 531 },
      { label: '1 inch', w: 295, h: 413 },
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
        reject(new Error("Could not create canvas"));
        return;
      }
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
            reject(new Error("Resize failed"));
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
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
};

export default function ResizeEnPage() {
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
    document.title = "Image Resizer — Free Online Tool to Resize Images";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Free online image resizer. Enter a width and height to resize images, with built-in presets for social media and ID photos. Runs in your browser with Canvas — 100% local processing, no uploads."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://imagemarker.app/en/resize");
    }
  }, []);

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
          if (!cancelled) setError(e.message || "Resize failed");
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
      alert("Please choose an image file (JPG, PNG, WebP, BMP, GIF)");
      return;
    }
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
      alert("Failed to load image");
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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/en/"
              className="flex items-center space-x-3 hover-elevate rounded-lg px-2 py-1 -ml-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg" role="img" aria-label="Resize">
                  📐
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Image Resizer</h1>
                <p className="text-xs text-gray-600">Secure Local Image Resizing</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/en/"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <ImageIcon className="w-4 h-4" aria-hidden="true" />
                <span>Watermark Tool</span>
              </Link>
              <a
                href="/resize"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                aria-label="切換到中文版"
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span>中文</span>
              </a>
              <div className="flex items-center space-x-2">
                <Shield className="text-green-600 w-4 h-4" aria-hidden="true" />
                <span className="text-sm text-gray-600">100% Local</span>
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
              <h2 className="font-medium text-blue-900 mb-1">Why use this resizer?</h2>
              <p className="text-sm text-blue-800">
                Resize images to fit social media dimensions, make ID photos, or shrink images for faster
                loading. Everything runs in your browser with the Canvas API — your images are never
                uploaded to any server, there are no size limits and no copies are kept.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: upload + settings */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Image</h2>
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
                <Upload
                  className="text-gray-400 w-12 h-12 mb-4 mx-auto"
                  aria-hidden="true"
                />
                <p className="text-gray-600 mb-2">Drag and drop an image here, or click to select</p>
                <p className="text-sm text-gray-600 mb-4">Supports JPG, PNG, WebP, BMP, GIF</p>
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED}
                className="hidden"
                onChange={(e) => onPickFile(e.target.files?.[0])}
                aria-label="Select image file"
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resize Settings</h2>

                <div className="flex items-end space-x-3 mb-2">
                  <div className="flex-1">
                    <label
                      htmlFor="width"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Width (px)
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
                    aria-label={lockRatio ? "Aspect ratio locked, click to unlock" : "Aspect ratio unlocked, click to lock"}
                    title={lockRatio ? "Aspect ratio locked" : "Aspect ratio unlocked"}
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
                      Height (px)
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
                    ? "Aspect ratio locked — changing one side updates the other automatically."
                    : "Aspect ratio unlocked — set width and height freely (the image may stretch)."}
                </p>

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

          {/* Right: result + preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Result</h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  Upload an image to see the before/after dimensions, size comparison and preview.
                </p>
              )}
              {selectedFile && origSize && (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Original</p>
                      <p className="text-base font-semibold text-gray-900">
                        {origSize.w}×{origSize.h}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Resized</p>
                      <p className="text-base font-semibold text-green-600">
                        {result ? `${result.w}×${result.h}` : "—"}
                      </p>
                    </div>
                  </div>

                  {result && (
                    <p className="text-xs text-gray-500 mb-4">
                      Output file size: {formatSize(result.size)}
                    </p>
                  )}
                  {isResizing && (
                    <p className="text-sm text-gray-500 mb-4">Resizing...</p>
                  )}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {result && (
                    <img
                      src={result.url}
                      alt="Resized preview"
                      className="max-w-full rounded-lg border border-gray-200"
                    />
                  )}
                </>
              )}
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={downloadResult}
                  disabled={!result || isResizing}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download Resized Image
                </button>
                <button
                  onClick={reset}
                  disabled={!selectedFile}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Start Over
                </button>
                <a
                  href="https://ko-fi.com/justinlee2061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-blue-500 transition-colors mt-2 inline-block"
                >
                  ☕ Found it useful? Buy me a coffee
                </a>
              </div>
            </Card>
          </div>
        </div>

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
              <Scaling className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Resize</h3>
              <p className="text-sm text-gray-600">
                Enter dimensions or tap a preset and instantly see the resized preview and file size.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Handy Presets</h3>
              <p className="text-sm text-gray-600">
                Built-in social media, HD/4K and ID photo sizes you can apply with one tap.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Why resize images?
          </h2>
          <p>
            Different uses call for different dimensions: social media covers, avatars and ID photos all
            have fixed specs, while oversized web images slow down page loads. With a resizer you can
            quickly set an image to an exact width and height to meet upload rules or shrink the file.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% local processing, private by design
          </h2>
          <p>
            Unlike many online resizers that upload your images to a server, this tool runs entirely in
            your browser using the Canvas API. Your images are never uploaded, stored or sent to any third
            party — ideal for IDs, contracts and any photo containing personal information.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Lock ratio and presets
          </h2>
          <p>
            The aspect ratio is locked by default, so changing the width updates the height automatically to
            avoid distortion. When you need an exact fixed size (like an ID photo or social cover), tap a
            built-in preset to apply it instantly, or unlock the ratio to enter width and height freely.
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
              <Link href="/en/compress" className="text-sm text-primary hover:underline">
                Image Compressor
              </Link>
              <Link href="/en/convert" className="text-sm text-primary hover:underline">
                Image Converter
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
