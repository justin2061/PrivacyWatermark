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
  Languages,
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

export default function ExifCleanEnPage() {
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
  } = useExifCleaner("en");

  useEffect(() => {
    return setPageSeo({
      title:
        "Free EXIF Remover — Strip GPS & Metadata From Photos, 100% Local",
      description:
        "Free online EXIF remover. Strip GPS location, camera model, serial number and other hidden metadata from your photos before sharing. 100% browser-based — nothing is uploaded.",
      canonical: "https://imagemarker.app/en/exif-clean",
      locale: "en_US",
      jsonLd: webAppSchema({
        name: "EXIF Cleaner — ImageMarker",
        description:
          "Free online EXIF remover. Strip GPS location, camera model, serial number and other hidden metadata from your photos before sharing. 100% browser-based — nothing is uploaded.",
        url: "https://imagemarker.app/en/exif-clean",
        inLanguage: "en",
        featureList: [
          "100% local in-browser processing — no uploads",
          "Strip GPS location, camera model and serial number",
          "Automatic red flags for sensitive metadata fields",
          "Lossless JPEG cleaning — metadata removed without re-encoding",
          "Supports JPG, PNG and WebP",
        ],
      }),
    });
  }, []);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    if (!ACCEPTED.split(",").includes(file.type)) {
      alert("Only JPG, PNG and WebP formats are supported");
      return;
    }
    handleFileSelect(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/en"
              className="flex items-center space-x-3 hover-elevate rounded-lg px-2 py-1 -ml-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg" role="img" aria-label="EXIF cleaner">
                  🧼
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">EXIF Cleaner</h1>
                <p className="text-xs text-gray-600">
                  Remove GPS, camera and software data from photos
                </p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/en"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <ImageIcon className="w-4 h-4" aria-hidden="true" />
                <span>Watermark Tool</span>
              </Link>
              <a
                href="/exif-clean"
                className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                aria-label="切換到中文"
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
              <h2 className="font-medium text-blue-900 mb-1">Why remove EXIF?</h2>
              <p className="text-sm text-blue-800">
                Phones and cameras write hidden data into every photo: GPS
                coordinates, camera model, serial number, editing software and
                the exact time it was taken. Stripping this before uploading to
                social media, forums or sending it to a third party prevents your
                home address and movements from being reverse-engineered. All
                processing happens in your browser — images are never uploaded.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                <button
                  onClick={cleanFile}
                  disabled={!selectedFile || isCleaning || isReading}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <EraserIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {isCleaning ? "Cleaning…" : "Remove Metadata"}
                </button>

                <button
                  onClick={downloadCleaned}
                  disabled={!cleaned}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download Clean Image
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

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Detected Metadata
              </h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  Upload an image and all detected hidden data will be listed
                  here.
                </p>
              )}
              {selectedFile && isReading && (
                <p className="text-sm text-gray-500">Analyzing…</p>
              )}
              {selectedFile && !isReading && report && !report.hasMetadata && (
                <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle
                    className="text-green-600 w-5 h-5 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      This image has no metadata
                    </p>
                    <p className="text-xs text-green-800 mt-1">
                      Nothing to clean — you can use it as is.
                    </p>
                  </div>
                </div>
              )}
              {selectedFile && !isReading && report && report.hasMetadata && (
                <>
                  {report.sensitiveCount > 0 && (
                    <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                      <AlertTriangle
                        className="text-amber-600 w-5 h-5 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium text-amber-900">
                          {report.sensitiveCount} sensitive item
                          {report.sensitiveCount > 1 ? "s" : ""} detected
                        </p>
                        <p className="text-xs text-amber-800 mt-1">
                          Fields marked red (GPS, serial number, date taken,
                          etc.) should be removed before sharing.
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
                            className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            <td className="px-3 py-2 font-medium text-gray-700 align-top w-1/3">
                              {entry.sensitive && (
                                <span
                                  className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2 align-middle"
                                  aria-label="Sensitive data"
                                />
                              )}
                              {entry.label}
                            </td>
                            <td
                              className={`px-3 py-2 break-all ${
                                entry.sensitive
                                  ? "text-red-700"
                                  : "text-gray-600"
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Result
                </h2>
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <CheckCircle
                    className="text-green-600 w-5 h-5 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">
                      Clean version created
                    </p>
                    <p className="text-xs text-green-800 mt-1">
                      File: {cleaned.filename}　Size: {formatSize(cleaned.size)}
                    </p>
                  </div>
                </div>
                <img
                  src={cleaned.url}
                  alt="Preview after removing metadata"
                  className="max-w-full rounded-lg border border-gray-200"
                />
                <KofiSupport variant="success" lang="en" className="mt-4" />
              </Card>
            )}
          </div>
        </div>

        <section className="mt-12">
          <h2 className="sr-only">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Local Only</h3>
              <p className="text-sm text-gray-600">
                Images never leave your browser — no server, no upload.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Zap
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Lossless JPEG</h3>
              <p className="text-sm text-gray-600">
                JPEGs use piexifjs to strip the metadata segment directly without
                re-encoding, so quality is untouched.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Sensitive Data Alerts
              </h3>
              <p className="text-sm text-gray-600">
                Automatically flags high-risk fields like GPS, serial number and
                capture time in red.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2026 Privacy Tools - Protecting your privacy
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/en" className="text-sm text-primary hover:underline">
                Watermark Tool
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
