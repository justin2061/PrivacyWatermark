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
import { trackToolUseStart, trackToolEvent, trackDownloadComplete } from "@/lib/analytics";
import { useExifCleaner } from "@/hooks/useExifCleaner";
import { setPageSeo, webAppSchema, faqSchema, localeAlternates } from "@/lib/seo";
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

const TITLE = "写真の位置情報（Exif）を削除｜無料・アップロード不要";
const DESCRIPTION =
  "写真に埋め込まれた GPS 位置情報・撮影日時・カメラ機種・シリアル番号などの Exif メタデータを無料で削除。すべてブラウザ内で処理し、画像はどこにもアップロードされません。";

// FAQ はページ上の表示と FAQPage JSON-LD で同じ配列を使う（食い違うと構造化データが無効になる）
const FAQS = [
  { q: "Exif とは何ですか？なぜ削除したほうがいいのですか？", a: "Exif はスマートフォンやカメラで撮った写真に自動で埋め込まれる情報で、GPS の位置情報、撮影日時、カメラの機種、場合によっては端末のシリアル番号まで含まれます。自宅で撮った写真をそのまま送ると、ファイル内の位置情報から住所が分かってしまうことがあります。Exif を削除すれば、画像そのものだけが残ります。" },
  { q: "Exif を削除すると画質やファイルサイズは変わりますか？", a: "JPG は画素を再圧縮せずにメタデータ部分だけを取り除くため、画質は元の画像とまったく同じです。PNG と WebP はメタデータを除いて保存し直しますが、見た目は変わりません。メタデータがなくなる分、ファイルサイズはわずかに小さくなります。" },
  { q: "写真はサーバーにアップロードされますか？", a: "いいえ。ファイルの読み込みも書き換えもすべてブラウザの中で行うため、写真が端末の外に出ることはありません。プライバシーを守るためのツールなので、アップロードしない設計にしています。" },
  { q: "対応しているファイル形式は？", a: "JPG（JPEG）、PNG、WebP です。iPhone の HEIC には直接対応していないため、先に画像変換ツールで JPG に変換してから、この画面で Exif を削除してください。" },
  { q: "SNS に投稿すれば Exif は自動で消えますか？", a: "大手 SNS の多くはアップロード時に Exif の大部分を削除しますが、すべての場合に当てはまるとは限りません。メールへの添付、クラウドの共有リンク、掲示板、ファイルとしての送信などでは、Exif がそのまま残ることがあります。送り先が分からないときは、送る前に自分で削除しておくのが確実です。" },
  { q: "位置情報だけを消して、カメラの設定は残せますか？", a: "このツールは Exif をまとめて削除します。プライバシー上いちばん問題になるのは位置情報で、項目ごとに選ぶには本格的なメタデータ編集ツールが必要になるためです。項目単位で調整したい場合は、ExifTool などのローカルツールをおすすめします。" },
];

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

export default function ExifCleanJaPage() {
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
  } = useExifCleaner("ja");

  // クリーンなファイルができた時点で complete イベントを送る
  useEffect(() => {
    if (cleaned) trackToolEvent("exif_clean_complete", "exif-clean");
  }, [cleaned]);

  useEffect(() => {
    return setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: "https://imagemarker.app/ja/exif-clean",
      locale: "ja_JP",
      alternates: localeAlternates({ zh: "/exif-clean", en: "/en/exif-clean", ja: "/ja/exif-clean" }),
      keywords:
        "Exif 削除,写真 位置情報 削除,GPS 情報 削除,画像 メタデータ 削除,Exif 消す,撮影場所 バレる,写真 個人情報,オンライン 無料,アップロード不要,ブラウザ処理",
      jsonLd: [
        webAppSchema({
          name: "Exif 削除ツール — ImageMarker",
          description: DESCRIPTION,
          url: "https://imagemarker.app/ja/exif-clean",
          inLanguage: "ja",
          featureList: [
            "すべてブラウザ内で処理 — 画像はアップロードされません",
            "GPS 位置情報・カメラ機種・シリアル番号を削除",
            "位置情報など注意が必要な項目を自動で赤く表示",
            "JPEG は再圧縮せずにメタデータだけを削除（画質は変わりません）",
            "JPG・PNG・WebP に対応",
          ],
        }),
        faqSchema(FAQS),
      ],
    });
  }, []);

  const onPickFile = (file?: File | null) => {
    if (!file) return;
    trackToolUseStart("exif-clean");
    trackToolEvent("exif_clean_start", "exif-clean");
    if (!ACCEPTED.split(",").includes(file.type)) {
      alert("JPG・PNG・WebP 形式のみ対応しています");
      return;
    }
    handleFileSelect(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="ja" current="exif-clean" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
          写真の位置情報（Exif）を削除 — 無料・アップロード不要でブラウザ内処理
        </h1>
        <PrivacyBanner lang="ja" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                画像をアップロード
              </h2>
              <UploadZone
                accept={ACCEPTED}
                onFiles={(files) => onPickFile(files[0])}
                title="ここに画像をドラッグ＆ドロップ、またはクリックして選択"
                description="JPG・PNG・WebP に対応"
                buttonLabel="ファイルを選択"
                ariaLabel="画像のアップロード領域。クリックまたはドロップしてください"
                inputAriaLabel="画像ファイルを選択"
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
                  label: isCleaning ? "削除中…" : "メタデータを削除",
                }}
                download={{
                  onClick: () => {
                    trackDownloadComplete("exif-clean", 1);
                    downloadCleaned();
                  },
                  disabled: !cleaned,
                  icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "削除済みの画像をダウンロード",
                }}
                reset={{
                  onClick: reset,
                  disabled: !selectedFile,
                  icon: <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: "最初からやり直す",
                }}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                検出されたメタデータ
              </h2>
              {!selectedFile && (
                <p className="text-sm text-gray-500">
                  画像をアップロードすると、埋め込まれている情報がここに一覧表示されます。
                </p>
              )}
              {selectedFile && isReading && (
                <p className="text-sm text-gray-500">解析中…</p>
              )}
              {selectedFile && !isReading && report && !report.hasMetadata && (
                <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle
                    className="text-green-600 w-5 h-5 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      この画像にはメタデータがありません
                    </p>
                    <p className="text-xs text-green-800 mt-1">
                      削除するものはないので、そのまま使えます。
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
                          注意が必要な項目が {report.sensitiveCount} 件見つかりました
                        </p>
                        <p className="text-xs text-amber-800 mt-1">
                          赤く表示された項目（位置情報、シリアル番号、撮影日時など）は、共有する前に削除することをおすすめします。
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
                                  aria-label="注意が必要な情報"
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
                  処理結果
                </h2>
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <CheckCircle
                    className="text-green-600 w-5 h-5 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">
                      メタデータを削除した画像を作成しました
                    </p>
                    <p className="text-xs text-green-800 mt-1">
                      ファイル名：{cleaned.filename}　サイズ：{formatSize(cleaned.size)}
                    </p>
                  </div>
                </div>
                <img
                  src={cleaned.url}
                  alt="メタデータを削除した後のプレビュー"
                  className="max-w-full rounded-lg border border-gray-200"
                />
                <DownloadSuccess tool="exif-clean" lang="ja" imageCount={1} className="mt-4" />
              </Card>
            )}
          </div>
        </div>

        {cleaned && (
          <ToolRecommendations current="exif-clean" lang="ja" className="mt-12" />
        )}

        <section className="mt-12">
          <h2 className="sr-only">特長</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">端末内で完結</h3>
              <p className="text-sm text-gray-600">
                画像はブラウザの外に出ません。サーバーへのアップロードもありません。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Zap
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">JPEG は画質そのまま</h3>
              <p className="text-sm text-gray-600">
                JPEG は再圧縮せず、メタデータの部分だけを直接取り除くので画質は劣化しません。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield
                className="text-primary w-8 h-8 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                危険な項目を自動表示
              </h3>
              <p className="text-sm text-gray-600">
                位置情報・シリアル番号・撮影日時など、特に注意が必要な項目を赤く表示します。
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12 text-gray-700 leading-relaxed space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            身分証の写真を送る前にも、位置情報を消しておく
          </h2>
          <p>
            マイナンバーカードや運転免許証、パスポートを自宅で撮影した写真には、撮影した場所の位置情報が残っていることがあります。
            コピーに透かしを入れて提出先・用途を限定するのと同じように、送る前に Exif も削除しておけば、
            書類の内容以外の情報まで相手に渡してしまうことを防げます。
          </p>
        </section>

        <section className="mt-12 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">よくある質問</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-1 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* すべてのツール */}
        <ToolsShowcase lang="ja" exclude="exif-clean" />

      </main>

      <SiteFooter lang="ja" />
    </div>
  );
}
