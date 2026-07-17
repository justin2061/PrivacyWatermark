import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { UploadZone } from "@/components/UploadZone";
import { ActionButtons } from "@/components/ActionButtons";
import { trackToolUseStart } from "@/lib/analytics";
import { setPageSeo, webAppSchema } from "@/lib/seo";
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
        reject(new Error("Could not create canvas"));
        return;
      }
      const outType = format === "original" ? file.type : format;
      if (outType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Compression failed"));
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
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
};

export default function CompressEnPage() {
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
      title: "Image Compressor — Free Online Tool, 100% Local Processing",
      description:
        "Free online image compressor for JPG, PNG and WebP. Reduce image file size right in your browser with Canvas — 100% local processing, no uploads, no size limits.",
      canonical: "https://imagemarker.app/en/compress",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "Image Compressor — ImageMarker",
        description:
          "Free online image compressor for JPG, PNG and WebP. Reduce image file size right in your browser with Canvas — 100% local processing, no uploads, no size limits.",
        url: "https://imagemarker.app/en/compress",
        inLanguage: "en",
        featureList: [
          "100% local in-browser processing — no uploads",
          "Adjustable quality slider with live size preview",
          "Compress JPG, PNG and WebP images",
          "Optional conversion to JPG or WebP output",
          "No file size limits",
        ],
      }),
    });
  }, []);

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
          if (!cancelled) setError(e.message || "Compression failed");
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
    trackToolUseStart("compress");
    if (!ACCEPTED.split(",").includes(file.type)) {
      alert("Only JPG, PNG and WebP are supported");
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
    a.download = `${base}-compressed.${extForType(result.type)}`;
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
      <SiteHeader lang="en" current="compress" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="en" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: upload + settings */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Image</h2>
              <UploadZone
                accept={ACCEPTED}
                onFiles={(files) => onPickFile(files[0])}
                title="Drag and drop an image here, or click to select"
                description="Supports JPG, PNG and WebP"
                buttonLabel="Choose File"
                ariaLabel="Upload area, click or drag and drop a file"
                inputAriaLabel="Select image file"
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Compression Settings</h2>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="quality"
                      className="text-sm font-medium text-gray-700"
                    >
                      Quality
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
                    <span>Smaller file</span>
                    <span>Better quality</span>
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Output Format
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: "original", label: "Keep Original" },
                        { value: "image/jpeg", label: "To JPG" },
                        { value: "image/webp", label: "To WebP" },
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
                    Transparent PNGs get a white background when converted to JPG. WebP usually produces
                    smaller files at the same quality.
                  </p>
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
                  Upload an image to see the before/after size comparison and preview.
                </p>
              )}
              {selectedFile && (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Original</p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatSize(selectedFile.size)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Compressed</p>
                      <p className="text-base font-semibold text-gray-900">
                        {result ? formatSize(result.size) : "—"}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Saved</p>
                      <p className="text-base font-semibold text-green-600">
                        {result ? `${ratio}% ↓` : "—"}
                      </p>
                    </div>
                  </div>

                  {isCompressing && (
                    <p className="text-sm text-gray-500 mb-4">Compressing...</p>
                  )}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {result && (
                    <img
                      src={result.url}
                      alt="Compressed preview"
                      className="max-w-full rounded-lg border border-gray-200"
                    />
                  )}

                  {result && (
                    <DownloadSuccess tool="compress" lang="en" imageCount={1} className="mt-4" />
                  )}
                </>
              )}
            </Card>

            <Card className="p-6">
              <ActionButtons
                download={{
                  onClick: downloadResult,
                  disabled: !result || isCompressing,
                  icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "Download Compressed Image",
                }}
                reset={{
                  onClick: reset,
                  disabled: !selectedFile,
                  icon: <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "Start Over",
                }}
              />
            </Card>
          </div>
        </div>

        {result && (
          <ToolRecommendations current="compress" lang="en" className="mt-12" />
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
              <Zap className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">Live Preview</h3>
              <p className="text-sm text-gray-600">
                Drag the quality slider to instantly see the resulting size and quality.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <ImageIcon
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600">
                JPG, PNG and WebP supported. Keep the original or convert — WebP is usually smaller.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Why compress images?
          </h2>
          <p>
            High-resolution photos are often several megabytes each, which slows down page loads, eats up
            storage and frequently exceeds the upload limits of forums, forms and email. Compressing an
            image dramatically reduces its file size while keeping acceptable quality, making sharing and
            uploading far smoother.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% local processing, private by design
          </h2>
          <p>
            Unlike many online compressors that upload your images to a server, this tool runs entirely in
            your browser using the Canvas API. Your images are never uploaded, stored or sent to any third
            party — ideal for IDs, contracts and any photo containing personal information.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Supported formats and tips
          </h2>
          <p>
            JPG, PNG and WebP are supported. For photographs, JPG or WebP work best; keep PNG when you need
            transparency. In most cases a quality setting between 70–85% is visually indistinguishable from
            the original while saving a significant amount of space.
          </p>
        </section>
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
