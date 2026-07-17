import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { UploadZone } from "@/components/UploadZone";
import { ActionButtons } from "@/components/ActionButtons";
import { trackToolUseStart } from "@/lib/analytics";
import { useExifCleaner } from "@/hooks/useExifCleaner";
import { setPageSeo, webAppSchema } from "@/lib/seo";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  EraserIcon,
  Lock,
  RefreshCw,
  Shield,
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
    trackToolUseStart("exif-clean");
    if (!ACCEPTED.split(",").includes(file.type)) {
      alert("Only JPG, PNG and WebP formats are supported");
      return;
    }
    handleFileSelect(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="en" current="exif-clean" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="en" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Upload Image
              </h2>
              <UploadZone
                accept={ACCEPTED}
                onFiles={(files) => onPickFile(files[0])}
                title="Drag and drop an image here, or click to select a file"
                description="Supports JPG, PNG and WebP"
                buttonLabel="Choose File"
                ariaLabel="Upload area, click or drop a file"
                inputAriaLabel="Select an image file"
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
              <ActionButtons
                apply={{
                  onClick: cleanFile,
                  disabled: !selectedFile || isCleaning || isReading,
                  icon: <EraserIcon className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: isCleaning ? "Cleaning…" : "Remove Metadata",
                }}
                download={{
                  onClick: downloadCleaned,
                  disabled: !cleaned,
                  icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "Download Clean Image",
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
                <DownloadSuccess tool="exif-clean" lang="en" imageCount={1} className="mt-4" />
              </Card>
            )}
          </div>
        </div>

        {cleaned && (
          <ToolRecommendations current="exif-clean" lang="en" className="mt-12" />
        )}

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

        {/* 所有工具中心：推廣其他工具 */}
        <ToolsShowcase lang="en" exclude="exif-clean" />

      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
