import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { UploadZone } from "@/components/UploadZone";
import { ActionButton } from "@/components/ActionButtons";
import { trackToolUseStart, trackToolEvent, trackDownloadComplete } from "@/lib/analytics";
import { setPageSeo, webAppSchema, faqSchema, localeAlternates } from "@/lib/seo";
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
} from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

const MASK_OPTIONS: { value: MaskType; label: string; desc: string }[] = [
  { value: "mosaic", label: "モザイク", desc: "ピクセル化" },
  { value: "blur", label: "ぼかし", desc: "なめらかに" },
  { value: "solid", label: "塗りつぶし", desc: "完全に隠す" },
];

const TITLE = "写真にモザイク・ぼかしを入れる｜無料・アップロード不要";
const DESCRIPTION =
  "顔・車のナンバー・住所・マイナンバーなど、写真の見せたくない部分をドラッグで選んでモザイク・ぼかし・塗りつぶし。すべてブラウザ内で処理し、画像はアップロードされません。スマホにも対応。";

// FAQ はページ上の表示と FAQPage JSON-LD で同じ配列を使う（食い違うと構造化データが無効になる）
const FAQS = [
  { q: "どんなものにモザイクやぼかしを入れられますか？", a: "顔、車のナンバープレート、身分証の番号、住所、表札、キャッシュカードやクレジットカードの番号、パソコン画面、旅行写真に写り込んだ他人など、写真の中で読めないようにしたい四角い範囲なら何でも隠せます。" },
  { q: "画像はどこかにアップロードされますか？", a: "いいえ。処理はすべてブラウザ内の Canvas で行うため、元の画像が端末の外に出ることはありません。隠したい情報がそのまま写っている元画像こそ、知らないサーバーに残したくないものです。" },
  { q: "モザイクを元に戻されることはありませんか？", a: "十分な大きさのモザイクや強めのぼかしなら、元のピクセル情報は失われるため復元できません。ただし、文字の上に弱いぼかしや細かすぎるモザイクをかけた場合は、一部が読み取られる可能性があります。読めてはいけないものには、大きめのブロックか強いぼかしを使ってください。" },
  { q: "ナンバープレートやマイナンバーを隠すのに使えますか？", a: "はい、塗りつぶしと強めのモザイクはまさにそのための機能です。どちらも見た目をごまかすのではなく情報そのものを消します。マイナンバーやカード番号など、絶対に復元されてはいけないものには塗りつぶしをおすすめします。" },
  { q: "モザイクとぼかしの違いは？", a: "モザイクは範囲を大きな色のブロックに置き換えるため、隠したことがはっきり分かり、ブロックが大きければ復元できません。ぼかしはピクセルをなめらかに混ぜるので自然に見えますが、文字に弱いぼかしをかけると一部が戻せることがあります。特に重要な情報には、3 つ目の塗りつぶしがいちばん確実です。" },
  { q: "スマホでも使えますか？", a: "はい。範囲の選択はマウスだけでなくタッチ操作にも対応しているので、スマホで撮ったばかりの写真の顔や画面を、ブラウザだけで隠せます。" },
];

export default function MosaicJaPage() {
  const m = useMosaic({
    invalidType: "画像ファイル（JPG・PNG・WebP・BMP・GIF）を選択してください",
    loadFailed: "画像を読み込めませんでした",
  });

  useEffect(() => {
    return setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: "https://imagemarker.app/ja/mosaic",
      locale: "ja_JP",
      alternates: localeAlternates({ zh: "/mosaic", en: "/en/mosaic", ja: "/ja/mosaic" }),
      keywords:
        "モザイク 加工,写真 モザイク,ぼかし 加工 オンライン,顔 ぼかし,ナンバープレート 隠す,マイナンバー 隠す,画像 塗りつぶし,個人情報 隠す,無料,アップロード不要,ブラウザ処理",
      jsonLd: [
        webAppSchema({
          name: "モザイク・ぼかしツール — ImageMarker",
          description: DESCRIPTION,
          url: "https://imagemarker.app/ja/mosaic",
          inLanguage: "ja",
          featureList: [
            "すべてブラウザ内で処理 — 画像はアップロードされません",
            "ドラッグで範囲を選択（マウス・タッチ対応）",
            "モザイク・ぼかし・塗りつぶしの 3 種類",
            "モザイクの粗さとぼかしの強さを調整可能",
            "複数の範囲を指定でき、1 つずつ削除も可能",
          ],
        }),
        faqSchema(FAQS),
      ],
    });
  }, []);

  const hasResult = m.regions.length > 0;

  const onPickFile = (file?: File | null) => {
    if (file) {
      trackToolUseStart("mosaic");
      trackToolEvent("mosaic_start", "mosaic");
    }
    m.onPickFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="ja" current="mosaic" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrivacyBanner lang="ja" className="mb-8" />

        {!m.selectedFile ? (
          <Card className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              写真にモザイク・ぼかしを入れる
            </h1>
            <UploadZone
              accept={ACCEPTED}
              onFiles={(files) => onPickFile(files[0])}
              title="ここに画像をドラッグ＆ドロップ、またはクリックして選択"
              description="JPG・PNG・WebP・BMP・GIF に対応"
              buttonLabel="ファイルを選択"
              ariaLabel="画像のアップロード領域。クリックまたはドロップしてください"
              inputAriaLabel="画像ファイルを選択"
              inputRef={m.fileInputRef}
              padding="p-10"
            />
            <p className="text-sm text-gray-500 mt-4 text-center">
              アップロード後、画像の上をドラッグして顔・ナンバープレート・身分証の番号などを隠せます。処理はすべてブラウザ内で完結します。
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* メイン：キャンバス（スマホでは上部に固定し、設定を変えながら画像を確認できる） */}
            <div className="space-y-4 order-1 lg:order-1 sticky top-16 z-30 [@media(max-height:640px)]:static -mx-4 px-4 pt-2 bg-gray-50 shadow-sm sm:-mx-6 sm:px-6 lg:static lg:z-auto lg:mx-0 lg:px-0 lg:pt-0 lg:bg-transparent lg:shadow-none">
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
                  <span>画像の上を押したままドラッグして、隠したい範囲を選択（複数指定できます）</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 flex justify-center">
                  <canvas
                    ref={m.viewCanvasRef}
                    onPointerDown={m.onPointerDown}
                    onPointerMove={m.onPointerMove}
                    onPointerUp={m.onPointerUp}
                    className="max-w-full max-h-[38vh] lg:max-h-none cursor-crosshair"
                    style={{ touchAction: "none" }}
                    aria-label="画像キャンバス。ドラッグで隠す範囲を選択"
                  />
                </div>
              </Card>
            </div>

            {/* サイドバー：設定（スマホではキャンバスの下） */}
            <div className="space-y-4 order-2 lg:order-2">
              <Card className="p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">隠し方</h2>
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
                      モザイクの粗さ（ブロックの大きさ）：{m.pixelSize}px
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
                    <p className="text-xs text-gray-500 mt-1">値を大きくするほどブロックが大きく粗くなります。</p>
                  </div>
                )}

                {m.maskType === "blur" && (
                  <div className="mb-1">
                    <label htmlFor="blur" className="block text-sm font-medium text-gray-700 mb-2">
                      ぼかしの強さ：{m.blurStrength}px
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
                    <p className="text-xs text-gray-500 mt-1">値を大きくするほど強くぼけます。</p>
                  </div>
                )}

                {m.maskType === "solid" && (
                  <div className="mb-1">
                    <span className="block text-sm font-medium text-gray-700 mb-2">塗りつぶしの色</span>
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
                          aria-label={c === "#000000" ? "黒" : "白"}
                        />
                      ))}
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="color"
                          value={m.solidColor}
                          onChange={(e) => m.setSolidColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-gray-300 bg-white"
                          aria-label="塗りつぶしの色をカスタム指定"
                        />
                        カスタム
                      </label>
                    </div>
                  </div>
                )}
              </Card>

              {/* 指定した範囲の一覧 */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900">
                    指定した範囲（{m.regions.length}）
                  </h2>
                  {hasResult && (
                    <button
                      type="button"
                      onClick={m.clearRegions}
                      className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                    >
                      すべて削除
                    </button>
                  )}
                </div>
                {!hasResult ? (
                  <p className="text-sm text-gray-500">まだ範囲が選択されていません。</p>
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
                            aria-label={`範囲 ${i + 1} を削除`}
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
                    ひとつ戻す
                  </button>
                )}
              </Card>

              {/* 操作 */}
              <Card className="p-5">
                <div className="space-y-3">
                  <ActionButton
                    variant="success"
                    onClick={() => {
                      m.download();
                      trackDownloadComplete("mosaic", 1);
                      trackToolEvent("mosaic_complete", "mosaic");
                    }}
                    disabled={!hasResult}
                    icon={<Download className="w-4 h-4 mr-2" aria-hidden="true" />}
                  >
                    画像をダウンロード
                  </ActionButton>
                  <ActionButton
                    variant="neutral"
                    onClick={m.reset}
                    icon={<RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />}
                  >
                    最初からやり直す
                  </ActionButton>
                  {hasResult && <DownloadSuccess tool="mosaic" lang="ja" imageCount={1} className="mt-1" />}
                </div>
              </Card>
            </div>
          </div>
        )}

        {hasResult && (
          <ToolRecommendations current="mosaic" lang="ja" className="mt-12" />
        )}

        {/* 特長 */}
        <section className="mt-12">
          <h2 className="sr-only">特長</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">端末内で完結</h3>
              <p className="text-sm text-gray-600">
                画像はブラウザの外に出ません。サーバーへのアップロードもないので、個人情報が写った写真でも安心です。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Grid2x2 className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">3 種類の隠し方</h3>
              <p className="text-sm text-gray-600">
                モザイク・ぼかし・塗りつぶしから選べて、強さも調整できます。
              </p>
            </Card>
            <Card className="p-6 text-center">
              <MousePointerClick className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">ドラッグで範囲指定</h3>
              <p className="text-sm text-gray-600">
                画像の上で直接範囲を選べます。タッチ操作に対応し、範囲は 1 つずつ削除できます。
              </p>
            </Card>
          </div>
        </section>

        {/* 説明 */}
        <section className="mt-12 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            写真の見せたくない部分を、ブラウザだけで隠す
          </h2>
          <p>
            写真を送ったり SNS に載せたりする前に、顔や車のナンバー、表札、身分証の番号、スクリーンショットに写った個人情報を隠したいことがあります。
            このツールでは画像の上をドラッグして範囲を選ぶだけで、モザイク・ぼかし・塗りつぶしをすぐにかけられます。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            アップロード不要、すべて端末内で処理
          </h2>
          <p>
            画像をサーバーにアップロードする多くのオンラインツールと違い、このツールはブラウザの Canvas API だけで処理します。
            画像がアップロード・保存されたり、第三者に送られたりすることはないので、身分証や契約書など個人情報を含む写真にも使えます。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            マイナンバーカードのコピーを送る前に
          </h2>
          <p>
            本人確認でマイナンバーカードの画像を求められても、提出先がマイナンバー（個人番号）を必要としない場合は、番号部分を塗りつぶしてから送るのが安心です。
            あわせて提出先・用途を書いた透かしを入れておけば、目的外の使い回しも防げます。
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            モザイク・ぼかし・塗りつぶしの使い分け
          </h2>
          <p>
            モザイクは範囲をブロック状にして、見た目とプライバシーのバランスが取れた方法です。ぼかしは顔や背景をなめらかに隠したいときに向いています。
            塗りつぶしは範囲を完全に覆うので元に戻せず、番号など絶対に漏れてはいけない情報にいちばん確実です。
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
        <ToolsShowcase lang="ja" exclude="mosaic" />

      </main>

      <SiteFooter lang="ja" />
    </div>
  );
}
