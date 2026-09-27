import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { trackNextStepClick } from "@/lib/analytics";
import { TOOLS, toolHref, type Lang, type NavKey } from "@/lib/tools";

type ToolKey = Exclude<NavKey, "blog">;

interface NextStep {
  to: ToolKey;
  /** 以任務為主的一句標題（不是工具名），說明「為什麼現在該做這一步」 */
  label: Record<Lang, string>;
  blurb: Record<Lang, string>;
}

// ── 可重用的情境步驟 ─────────────────────────────────────────────────────
const CLEAN_EXIF_BEFORE_SHARING: NextStep = {
  to: "exif-clean",
  label: { zh: "傳出去前，清掉照片定位", en: "Strip location data before sharing", ja: "送る前に位置情報を消す" },
  blurb: {
    zh: "手機照片常藏有拍攝地點與時間，一鍵清除再傳",
    en: "Phone photos often carry GPS and timestamps — remove them in one click",
    ja: "スマホ写真には撮影場所や日時が残りがち。ワンクリックで削除",
  },
};

const COMPRESS_FOR_UPLOAD: NextStep = {
  to: "compress",
  label: { zh: "檔案太大傳不上去？壓縮一下", en: "Too big to upload? Compress it", ja: "容量オーバー？圧縮する" },
  blurb: {
    zh: "表單、Email 常限制 1–2MB，壓小再上傳",
    en: "Forms and email often cap files at 1–2 MB",
    ja: "フォームやメールは 1〜2MB 制限が多いので小さくしてから",
  },
};

const WATERMARK_BEFORE_POSTING: NextStep = {
  to: "watermark",
  label: { zh: "加上浮水印，避免被盜用", en: "Add a watermark before posting", ja: "透かしを入れて無断転載を防ぐ" },
  blurb: {
    zh: "放上網路或交給別人前，標上用途或名稱",
    en: "Mark the purpose or your name before it leaves your hands",
    ja: "ネットに載せる・人に渡す前に用途や名前を入れる",
  },
};

const CROP_FOR_SOCIAL: NextStep = {
  to: "social-crop",
  label: { zh: "要發文？裁成社群尺寸", en: "Posting it? Crop to social sizes", ja: "投稿するなら SNS サイズに切り抜く" },
  blurb: {
    zh: "IG 貼文、限動、FB 封面一鍵套用尺寸",
    en: "One-click sizes for Instagram posts, stories and Facebook covers",
    ja: "Instagram 投稿・ストーリーズ・Facebook カバーにワンクリック",
  },
};

const BATCH_THE_REST: NextStep = {
  to: "batch",
  label: { zh: "還有很多張？一次批次處理", en: "More photos? Do them in one batch", ja: "枚数が多いなら一括処理" },
  blurb: {
    zh: "多張照片同時套用相同浮水印，打包下載",
    en: "Apply the same watermark to many photos and download a ZIP",
    ja: "複数の写真に同じ透かしを入れて ZIP でダウンロード",
  },
};

const PDF_TOO: NextStep = {
  to: "pdf-watermark",
  label: { zh: "文件是 PDF？也能加浮水印", en: "Got a PDF? Watermark it too", ja: "PDF にも透かしを入れられます" },
  blurb: {
    zh: "合約、申請書每一頁都加上用途標示",
    en: "Stamp every page of a contract or application",
    ja: "契約書や申請書の全ページに用途を記載",
  },
};

const MOSAIC_FIELDS: NextStep = {
  to: "mosaic",
  label: { zh: "有欄位要遮？用馬賽克蓋掉", en: "Need to hide a field? Blur it out", ja: "隠したい欄はモザイクで" },
  blurb: {
    zh: "身分證字號、地址等不必給的資訊直接遮蔽",
    en: "Cover ID numbers, addresses and anything they don't need",
    ja: "番号や住所など、渡す必要のない情報を隠す",
  },
};

/**
 * 每個工具完成後的「下一步」（站內，最多 2 項）。
 *
 * 刻意只放頁面下方「你可能也需要」（ToolRecommendations）沒有列出的工具，
 * 兩個區塊才不會重複；浮水印頁沒有那個區塊，所以直接放最常接著做的兩步。
 * 調整 ToolRecommendations 的 RECOMMENDATIONS 時，記得回來檢查這裡是否重疊。
 *
 * 沿革：原本是 Canva／Adobe／Shutterstock 的外部連結（AffiliateNextSteps，
 * 事件 affiliate_click），2026-09 改為全部站內，把完成當下的高意圖流量留在站上。
 */
const NEXT_STEPS: Record<ToolKey, NextStep[]> = {
  watermark: [CLEAN_EXIF_BEFORE_SHARING, COMPRESS_FOR_UPLOAD],
  batch: [PDF_TOO, MOSAIC_FIELDS],
  "pdf-watermark": [BATCH_THE_REST],
  mosaic: [CROP_FOR_SOCIAL],
  "exif-clean": [CROP_FOR_SOCIAL, BATCH_THE_REST],
  compress: [CLEAN_EXIF_BEFORE_SHARING],
  convert: [CLEAN_EXIF_BEFORE_SHARING],
  resize: [WATERMARK_BEFORE_POSTING, CLEAN_EXIF_BEFORE_SHARING],
  "remove-bg": [WATERMARK_BEFORE_POSTING],
  "social-crop": [WATERMARK_BEFORE_POSTING, CLEAN_EXIF_BEFORE_SHARING],
};

interface NextStepsProps {
  current: ToolKey;
  lang?: Lang;
  className?: string;
}

/**
 * 下載完成頁的「下一步」情境式推薦（站內工具，最多 2 項）。
 * 每次點擊送出 GA next_step_click（from_tool / to_tool）。
 */
export function NextSteps({ current, lang = "zh", className = "" }: NextStepsProps) {
  const steps = NEXT_STEPS[current] ?? [];
  if (steps.length === 0) return null;

  const heading = { zh: "下一步", en: "Next step", ja: "次のステップ" }[lang];

  return (
    <section
      className={`rounded-lg border border-gray-200 bg-white p-4 ${className}`}
      aria-labelledby="next-steps-heading"
    >
      <h3
        id="next-steps-heading"
        className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
      >
        {heading}
      </h3>
      <div className="space-y-2">
        {steps.map((step) => {
          const tool = TOOLS.find((t) => t.key === step.to);
          if (!tool) return null;
          const Icon = tool.icon;
          return (
            <Link
              key={step.to}
              href={toolHref(tool, lang)}
              onClick={() => trackNextStepClick(current, step.to)}
              className="group flex items-start gap-3 rounded-lg border border-gray-200 p-3 transition-all hover:border-primary hover:shadow-sm"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {step.label[lang]}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-0.5 text-xs text-gray-500 leading-snug">
                  {step.blurb[lang]}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
