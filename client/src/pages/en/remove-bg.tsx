import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { KofiSupport } from "@/components/KofiSupport";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import {
  CheckCircle,
  Download,
  Lock,
  RefreshCw,
  Scissors,
  Sparkles,
  Upload,
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp";

type Stage = "idle" | "loading-model" | "processing" | "done";
type BgMode = "transparent" | "white" | "custom";

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

const STAGE_LABEL: Record<Stage, string> = {
  idle: "",
  "loading-model":
    "Loading AI model (first run downloads ~30MB, please wait)…",
  processing: "AI is analyzing and removing the background…",
  done: "Done!",
};

// Composite the transparent cutout onto a solid background color
function compositeBackground(
  transparentBlob: Blob,
  color: string
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(transparentBlob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to create canvas"));
        return;
      }
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to composite background"));
          return;
        }
        resolve(blob);
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to read image"));
    };
    img.src = url;
  });
}

export default function RemoveBgEnPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cutoutBlob, setCutoutBlob] = useState<Blob | null>(null);
  const [result, setResult] = useState<{ url: string; size: number } | null>(
    null
  );
  const [stage, setStage] = useState<Stage>("idle");
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [customColor, setCustomColor] = useState("#f3f4f6");
  // Preview URL of the uploaded source image, so users can see which image is being processed
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);

  // Create / revoke the source preview URL based on the selected file
  useEffect(() => {
    if (!selectedFile) {
      setSourceUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setSourceUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    return setPageSeo({
      title: "AI Background Remover — Free Online, 100% Local Processing",
      description:
        "Free AI background remover. Remove image backgrounds in one click and download a transparent PNG. The AI model runs entirely in your browser — your images are never uploaded to any server.",
      canonical: "https://imagemarker.app/en/remove-bg",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "AI Background Remover — ImageMarker",
        description:
          "Free AI background remover. Remove image backgrounds in one click and download a transparent PNG. The AI model runs entirely in your browser — your images are never uploaded to any server.",
        url: "https://imagemarker.app/en/remove-bg",
        inLanguage: "en",
        featureList: [
          "AI model runs 100% locally in your browser — no uploads",
          "One-click background removal with transparent PNG output",
          "Replace the background with white or a custom color",
          "Model cached after first use — works offline",
          "Supports JPG, PNG and WebP",
        ],
      }),
    });
  }, []);

  const isProcessing = stage === "loading-model" || stage === "processing";

  useEffect(() => {
    if (!cutoutBlob) return;
    let cancelled = false;
    const apply = async () => {
      try {
        let outBlob: Blob = cutoutBlob;
        if (bgMode === "white") {
          outBlob = await compositeBackground(cutoutBlob, "#ffffff");
        } else if (bgMode === "custom") {
          outBlob = await compositeBackground(cutoutBlob, customColor);
        }
        if (cancelled) return;
        setResult((prev) => {
          if (prev) URL.revokeObjectURL(prev.url);
          return { url: URL.createObjectURL(outBlob), size: outBlob.size };
        });
      } catch (e) {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : "Failed to process background"
          );
      }
    };
    apply();
    return () => {
      cancelled = true;
    };
  }, [cutoutBlob, bgMode, customColor]);

  const handleRemoveBg = async (file: File) => {
    setError(null);
    setStage("loading-model");
    setPercent(0);
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          const [action] = key.split(":");
          if (action === "fetch" || action === "download") {
            setStage("loading-model");
          } else {
            setStage("processing");
          }
          if (total > 0) {
            setPercent(Math.min(100, Math.round((current / total) * 100)));
          }
        },
        output: { format: "image/png", quality: 1 },
      });
      setCutoutBlob(blob);
      setStage("done");
      setPercent(100);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error
          ? `Background removal failed: ${e.message}`
          : "Background removal failed. Please check your connection and try again."
      );
      setStage("idle");
    }
  };

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!ACCEPTED.split(",").includes(file.type)) {
      alert("Only JPG, PNG and WebP formats are supported");
      return;
    }
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setCutoutBlob(null);
    setError(null);
    setStage("idle");
    setPercent(0);
    setBgMode("transparent");
    setSelectedFile(file);
  };

  const downloadResult = () => {
    if (!result || !selectedFile) return;
    const base = selectedFile.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}-no-bg.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setCutoutBlob(null);
    setSelectedFile(null);
    setStage("idle");
    setPercent(0);
    setError(null);
    setBgMode("transparent");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="en" current="remove-bg" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            AI Background Remover — Remove Image Backgrounds in One Click
          </h2>
          <p className="text-gray-600">
            100% local processing, AI-powered, nothing uploaded to a server
          </p>
        </div>

        {/* Privacy notice */}
        <PrivacyBanner lang="en" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: upload + actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Upload Image
              </h2>
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
                aria-label="Upload area, click or drop a file"
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Upload
                  className="text-gray-400 w-12 h-12 mb-4 mx-auto"
                  aria-hidden="true"
                />
                <p className="text-gray-600 mb-2">
                  Drag and drop an image here, or click to select a file
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Supports JPG, PNG and WebP
                </p>
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
                aria-label="Select an image file"
              />

              {selectedFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle
                        className="text-green-600 w-5 h-5"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium">
                        {selectedFile.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatSize(selectedFile.size)}
                    </span>
                  </div>
                </div>
              )}

              {selectedFile && (
                <button
                  onClick={() => handleRemoveBg(selectedFile)}
                  disabled={isProcessing}
                  className="w-full mt-4 bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                  {isProcessing
                    ? "Processing…"
                    : cutoutBlob
                    ? "Remove Again"
                    : "Remove Background"}
                </button>
              )}
            </Card>

            {/* Progress */}
            {(isProcessing || stage === "done") && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Progress
                </h2>
                <div className="space-y-3">
                  <ol className="space-y-2 text-sm">
                    <li
                      className={`flex items-center ${
                        stage === "loading-model"
                          ? "text-primary font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="mr-2">
                        {stage === "loading-model" ? "⏳" : "✅"}
                      </span>
                      Load AI model
                    </li>
                    <li
                      className={`flex items-center ${
                        stage === "processing"
                          ? "text-primary font-medium"
                          : stage === "done"
                          ? "text-gray-400"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="mr-2">
                        {stage === "processing"
                          ? "⏳"
                          : stage === "done"
                          ? "✅"
                          : "○"}
                      </span>
                      Analyze image &amp; remove background
                    </li>
                    <li
                      className={`flex items-center ${
                        stage === "done"
                          ? "text-green-600 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="mr-2">
                        {stage === "done" ? "✅" : "○"}
                      </span>
                      Done
                    </li>
                  </ol>
                  {isProcessing && (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2 transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {STAGE_LABEL[stage]}
                      </p>
                    </>
                  )}
                </div>
              </Card>
            )}

            {/* Background options */}
            {cutoutBlob && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Background
                </h2>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {(
                    [
                      { value: "transparent", label: "Transparent" },
                      { value: "white", label: "White" },
                      { value: "custom", label: "Custom Color" },
                    ] as { value: BgMode; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBgMode(opt.value)}
                      className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                        bgMode === opt.value
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {bgMode === "custom" && (
                  <div className="flex items-center space-x-3">
                    <label htmlFor="bg-color" className="text-sm text-gray-700">
                      Pick a background color
                    </label>
                    <input
                      id="bg-color"
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-10 h-8 rounded cursor-pointer border border-gray-300"
                    />
                    <span className="text-xs text-gray-500">{customColor}</span>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Right: result preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Result</h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  Upload an image and press “Remove Background”. The cutout will
                  appear here on a checkerboard background.
                </p>
              )}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
              {/* Show the uploaded source image before a result is produced */}
              {selectedFile && !result && sourceUrl && (
                <div>
                  <div className="rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-100">
                    <img
                      src={sourceUrl}
                      alt="Uploaded source image preview"
                      className="max-w-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {isProcessing
                      ? "Processing… this is the image being cut out."
                      : "Your selected image. Click “Remove Background” on the left to start."}
                  </p>
                </div>
              )}
              {result && (
                <div
                  className="rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: "#ffffff",
                    backgroundImage:
                      "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                >
                  <img
                    src={result.url}
                    alt="Background removed preview"
                    className="max-w-full"
                  />
                </div>
              )}
              {result && (
                <>
                  <p className="text-xs text-gray-500 mt-2">
                    Output size: {formatSize(result.size)} (PNG)
                  </p>
                  <KofiSupport variant="success" lang="en" className="mt-4" />
                </>
              )}
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={downloadResult}
                  disabled={!result || isProcessing}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download PNG
                </button>
                <button
                  onClick={reset}
                  disabled={!selectedFile}
                  className="w-full bg-gray-500 text-white py-2.5 min-h-[44px] px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Start Over
                </button>
                <KofiSupport lang="en" className="mt-2" />
              </div>
            </Card>
          </div>
        </div>

        {/* Features */}
        <section className="mt-12">
          <h2 className="sr-only">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Local AI Processing
              </h3>
              <p className="text-sm text-gray-600">
                The AI model runs in your browser. Your image never leaves your
                device — no server, no upload.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Scissors
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                One-Click Cutout
              </h3>
              <p className="text-sm text-gray-600">
                No manual tracing or selection. The AI detects the subject and
                removes the background, outputting a transparent PNG.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Sparkles
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Background Replace
              </h3>
              <p className="text-sm text-gray-600">
                Swap the background to transparent, white or a custom color —
                perfect for product shots and ID photos.
              </p>
            </Card>
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            What is AI background removal?
          </h2>
          <p>
            AI background removal uses a machine-learning model to automatically
            detect the subject of an image (a person, product or object) and make
            the background transparent. Compared with manually tracing in
            Photoshop, AI removal takes a single click and handles tricky edges
            like hair far more naturally.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            100% local, privacy-first
          </h2>
          <p>
            Unlike many cloud background removers that upload your photo, this
            tool uses the open-source @imgly/background-removal model and runs
            entirely in your browser via WebAssembly/ONNX. Your images are never
            uploaded, stored or shared with any third party — ideal for
            portraits, IDs and confidential product photos.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Slow on first use, fast afterwards
          </h2>
          <p>
            On first use, the browser downloads a ~30MB AI model, which can take
            a little while depending on your connection. The model is cached in
            the browser&apos;s IndexedDB, so later cutouts are fast and can even
            work offline.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Common use cases
          </h2>
          <p>
            Background removers are widely used for e-commerce white-background
            product shots, social media stickers, profile photos, slide assets,
            and swapping background colors. Combine it with our watermark,
            compression and format-conversion tools to handle images end to end.
          </p>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 Privacy Tools - Protecting your privacy
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/en" className="text-sm text-primary hover:underline">
                Watermark Tool
              </Link>
              <Link
                href="/en/compress"
                className="text-sm text-primary hover:underline"
              >
                Compress
              </Link>
              <Link
                href="/en/blog"
                className="text-sm text-primary hover:underline"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
