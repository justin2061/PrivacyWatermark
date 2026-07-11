import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { TOOLS, toolHref, type Lang } from "@/lib/tools";
import { trackInlineCta, type InlineCtaPosition } from "@/lib/analytics";

type CtaTool =
  | "watermark"
  | "batch"
  | "pdf-watermark"
  | "mosaic"
  | "exif-clean"
  | "compress"
  | "convert"
  | "resize";

interface CtaPreset {
  /** 卡片標題（含情境鉤子） */
  title: Record<Lang, string>;
  /** 一句話補充 */
  desc: Record<Lang, string>;
  /** 按鈕文字 */
  button: Record<Lang, string>;
}

// 各工具的預設文案，讓 InlineCTA 一行就能放進文章
const PRESETS: Record<CtaTool, CtaPreset> = {
  watermark: {
    title: {
      zh: "立即為你的證件加上浮水印",
      en: "Add a watermark to your ID now",
    },
    desc: {
      zh: "免費、免安裝，100% 在你的瀏覽器完成，圖片不會上傳。",
      en: "Free, no install — runs 100% in your browser, nothing is uploaded.",
    },
    button: { zh: "免費使用浮水印工具", en: "Use the free watermark tool" },
  },
  batch: {
    title: {
      zh: "要一次處理多張圖片？用批次浮水印",
      en: "Many images at once? Use batch watermark",
    },
    desc: {
      zh: "一次上傳、統一套用、打包下載，同樣 100% 本機處理。",
      en: "Upload once, apply to all, download as a zip — all on-device.",
    },
    button: { zh: "免費使用批次浮水印", en: "Use batch watermark free" },
  },
  "pdf-watermark": {
    title: {
      zh: "要在 PDF 上加浮水印？",
      en: "Need to watermark a PDF?",
    },
    desc: {
      zh: "直接為 PDF 文件蓋上浮水印，不必先轉圖片，100% 本機處理。",
      en: "Stamp watermarks straight onto PDF files — no conversion, on-device.",
    },
    button: { zh: "免費使用 PDF 浮水印", en: "Use PDF watermark free" },
  },
  mosaic: {
    title: {
      zh: "想遮住證件上的敏感資訊？用馬賽克遮蔽",
      en: "Hide sensitive details with mosaic & blur",
    },
    desc: {
      zh: "把身分證字號、地址等欄位用馬賽克或色塊蓋掉，100% 本機處理。",
      en: "Cover ID numbers, addresses and more with mosaic or blur — on-device.",
    },
    button: { zh: "免費使用馬賽克工具", en: "Use the mosaic tool free" },
  },
  "exif-clean": {
    title: {
      zh: "照片暗藏 GPS 位置？先清除 EXIF 再傳出去",
      en: "Photos hide GPS data — strip EXIF before sharing",
    },
    desc: {
      zh: "一鍵移除 GPS 定位、拍攝時間與相機型號，100% 本機處理。",
      en: "Remove GPS, timestamps and camera info in one click, on-device.",
    },
    button: { zh: "免費使用 EXIF 清除器", en: "Use the EXIF cleaner free" },
  },
  compress: {
    title: {
      zh: "圖片太大無法上傳？先壓縮一下",
      en: "Image too large to upload? Compress it",
    },
    desc: {
      zh: "縮小檔案大小又保留畫質，100% 在瀏覽器完成，不會上傳。",
      en: "Shrink file size while keeping quality — 100% in-browser.",
    },
    button: { zh: "免費使用圖片壓縮", en: "Use image compression free" },
  },
  convert: {
    title: {
      zh: "要轉換圖片格式？",
      en: "Need to convert an image format?",
    },
    desc: {
      zh: "JPG、PNG、WebP 一鍵互轉，100% 本機處理，不會上傳。",
      en: "Convert between JPG, PNG and WebP in one click, on-device.",
    },
    button: { zh: "免費使用格式轉換", en: "Use format converter free" },
  },
  resize: {
    title: {
      zh: "要調整圖片尺寸？",
      en: "Need to resize an image?",
    },
    desc: {
      zh: "快速調整圖片寬高，100% 在瀏覽器完成，不會上傳。",
      en: "Resize width and height quickly — 100% in-browser.",
    },
    button: { zh: "免費使用圖片縮放", en: "Use the resize tool free" },
  },
};

interface InlineCTAProps {
  /** 要推薦的工具（決定連結與預設文案） */
  tool: CtaTool;
  /** 追蹤用：文章中段 / 結尾 / 工具完成後 */
  position?: InlineCtaPosition;
  /** 追蹤用：目前文章或工具的識別字串（例如 slug） */
  location?: string;
  /** 語系（預設 zh） */
  lang?: Lang;
  /** 覆寫預設標題 */
  title?: string;
  /** 覆寫預設說明 */
  desc?: string;
  className?: string;
}

/**
 * 文章中／工具頁內的醒目行動呼籲卡片。
 * 淺藍到淺紫的漸層背景，手機友好，點擊會送出 GA4 inline_cta_click 事件。
 *
 * 放在 blog 文章的 prose 區塊中；因為 prose 會替 <a>/<p> 加上樣式，
 * 這裡用 `not-prose` 隔離自訂樣式。
 */
export function InlineCTA({
  tool,
  position = "mid_article",
  location,
  lang = "zh",
  title,
  desc,
  className = "",
}: InlineCTAProps) {
  const preset = PRESETS[tool];
  const toolDef = TOOLS.find((t) => t.key === tool);
  const href = toolDef ? toolHref(toolDef, lang) : "/";
  const Icon = toolDef?.icon;

  return (
    <div
      className={`not-prose my-8 rounded-xl border border-indigo-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 sm:p-6 ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
            {Icon ? (
              <Icon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <span aria-hidden="true">🔒</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 leading-snug">
              {title ?? preset.title[lang]}
            </p>
            <p className="mt-1 text-sm text-gray-600 leading-snug">
              {desc ?? preset.desc[lang]}
            </p>
          </div>
        </div>
        <Link
          href={href}
          onClick={() => trackInlineCta(tool, position, location)}
          className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {preset.button[lang]}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
