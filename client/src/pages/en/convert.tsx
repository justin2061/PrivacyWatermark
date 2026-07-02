import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import { PAIRS } from "@/lib/convertPairs";
import {
  CheckCircle,
  Download,
  Image as ImageIcon,
  Languages,
  Lock,
  RefreshCw,
  Repeat,
  Shield,
  Upload,
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
        reject(new Error("Could not create canvas"));
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

export default function ConvertEnPage() {
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
      title: "Image Format Converter — Free Online JPG/PNG/WebP Converter",
      description:
        "Free online image format converter. Convert PNG to JPG, JPG to PNG and WebP right in your browser with Canvas — 100% local processing, no uploads, no size limits.",
      canonical: "https://imagemarker.app/en/convert",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "Image Format Converter — ImageMarker",
        description:
          "Free online image format converter. Convert PNG to JPG, JPG to PNG and WebP right in your browser with Canvas — 100% local processing, no uploads, no size limits.",
        url: "https://imagemarker.app/en/convert",
        inLanguage: "en",
        featureList: [
          "100% local in-browser processing — no uploads",
          "Convert between JPG, PNG and WebP",
          "Reads JPG, PNG, WebP, BMP and GIF input",
          "Instant preview with before/after size comparison",
          "No file size limits",
        ],
      }),
    });
  }, []);

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
          if (!cancelled) setError(e.message || "Conversion failed");
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
      alert("Please choose an image file (JPG, PNG, WebP, BMP, GIF)");
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
    const base = selectedFile.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}.${extForType(result.type)}`;
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
    setFormat("image/jpeg");
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
                <span className="text-white text-lg" role="img" aria-label="Convert">
                  🔄
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Image Format Converter</h1>
                <p className="text-xs text-gray-600">Secure Local Format Conversion</p>
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
                href="/convert"
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
              <h2 className="font-medium text-blue-900 mb-1">Why use this converter?</h2>
              <p className="text-sm text-blue-800">
                Convert PNG to JPG, turn WebP into a more compatible format, or standardize your image
                formats. Everything runs in your browser with the Canvas API — your images are never
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Settings</h2>

                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Target Format
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
                    Transparent PNGs get a white background when converted to JPG. JPG and WebP are lossy
                    formats; PNG is lossless.
                  </p>
                </div>

                {/* Common conversion scenarios */}
                <div className="mt-6 space-y-2 text-xs text-gray-600">
                  <p className="font-medium text-gray-700">Common conversions</p>
                  <p>• <strong>PNG → JPG</strong>: smaller files, drops transparency (white background) — great for uploads and sharing.</p>
                  <p>• <strong>JPG → PNG</strong>: get a lossless format for further editing or crisp edges.</p>
                  <p>• <strong>WebP → JPG</strong>: fix compatibility when an app or platform can't open WebP.</p>
                  <p>• <strong>→ WebP</strong>: get smaller files and faster page loads.</p>
                </div>
              </Card>
            )}
          </div>

          {/* Right: result + preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Result</h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  Upload an image to see the before/after format, size comparison and preview.
                </p>
              )}
              {selectedFile && (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">
                        Original ({extForType(selectedFile.type).toUpperCase()})
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatSize(selectedFile.size)}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">
                        Converted ({result ? extForType(result.type).toUpperCase() : "—"})
                      </p>
                      <p className="text-base font-semibold text-green-600">
                        {result ? formatSize(result.size) : "—"}
                      </p>
                    </div>
                  </div>

                  {isConverting && (
                    <p className="text-sm text-gray-500 mb-4">Converting...</p>
                  )}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {result && (
                    <img
                      src={result.url}
                      alt="Converted preview"
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
                  disabled={!result || isConverting}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download Converted Image
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
              <Repeat className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Conversion</h3>
              <p className="text-sm text-gray-600">
                Pick a target format and instantly see the converted preview and file size.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600">
                Reads JPG, PNG, WebP, BMP and GIF, and converts to JPG, PNG or WebP.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Why convert image formats?
          </h2>
          <p>
            Each image format has its strengths: JPG is great for photos with small, widely compatible
            files; PNG supports transparency and lossless quality, ideal for icons and cut-outs; WebP gives
            smaller files at similar quality. When a platform only accepts a certain format, you need
            transparency, or you want a smaller file, converting formats is the answer.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% local processing, private by design
          </h2>
          <p>
            Unlike many online converters that upload your images to a server, this tool runs entirely in
            your browser using the Canvas API. Your images are never uploaded, stored or sent to any third
            party — ideal for IDs, contracts and any photo containing personal information.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Common conversion tips
          </h2>
          <p>
            <strong>PNG to JPG</strong> dramatically shrinks files but drops transparency (filled white);
            <strong> JPG to PNG</strong> gives you a lossless format but usually a larger file;
            <strong> WebP to JPG</strong> fixes compatibility with older software or platforms that can't
            open WebP. If your goal is smaller files and faster pages, converting to WebP is usually the
            best choice.
          </p>
        </section>

        {/* Popular conversions: internal links to format-pair pages */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PAIRS.map((pair) => (
              <Link
                key={pair.slug}
                href={`/en/convert/${pair.slug}`}
                className="flex items-center justify-center bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                {pair.fromLabel} to {pair.toLabel}
              </Link>
            ))}
          </div>
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
              <Link href="/en/resize" className="text-sm text-primary hover:underline">
                Image Resizer
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
