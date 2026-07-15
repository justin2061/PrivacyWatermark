import {
  Stamp,
  Layers,
  FileText,
  Grid2x2,
  Eraser,
  Minimize2,
  Repeat,
  Scaling,
  Scissors,
  Crop,
  Shield,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Lang = "zh" | "en" | "ja";

/**
 * Locales that have a translated page for every tool. Japanese currently ships
 * only the watermark homepage (/ja/), so its tool links fall back to English
 * rather than 404 — see toolHref.
 */
const FULL_LOCALES: Lang[] = ["zh", "en"];

// 目前所在頁面的識別鍵，用來高亮對應的導航項目
export type NavKey =
  | "watermark"
  | "batch"
  | "pdf-watermark"
  | "exif-clean"
  | "remove-bg"
  | "mosaic"
  | "compress"
  | "convert"
  | "resize"
  | "social-crop"
  | "blog";

// 三大分類：隱私保護 / 圖片處理 / 社群創作
export type CategoryId = "protect" | "process" | "create";

interface Localized {
  zh: string;
  en: string;
  ja: string;
}

export interface CategoryDef {
  id: CategoryId;
  icon: LucideIcon;
  label: Localized;
}

export interface ToolDef {
  key: Exclude<NavKey, "blog">;
  /** 不含語系前綴的路徑；空字串代表首頁（浮水印） */
  slug: string;
  icon: LucideIcon;
  category: CategoryId;
  label: Localized;
  desc: Localized;
}

export const CATEGORIES: CategoryDef[] = [
  { id: "protect", icon: Shield, label: { zh: "隱私保護", en: "Protect", ja: "プライバシー保護" } },
  { id: "process", icon: Settings, label: { zh: "圖片處理", en: "Process", ja: "画像処理" } },
  { id: "create", icon: Sparkles, label: { zh: "社群創作", en: "Create", ja: "SNS・制作" } },
];

export const TOOLS: ToolDef[] = [
  // 🛡️ 隱私保護
  {
    key: "watermark",
    slug: "",
    icon: Stamp,
    category: "protect",
    label: { zh: "浮水印", en: "Watermark", ja: "透かし" },
    desc: {
      zh: "幫證件、文件加文字或 Logo 浮水印",
      en: "Add text or logo watermarks to IDs & docs",
      ja: "身分証や書類に文字・ロゴの透かしを入れる",
    },
  },
  {
    key: "batch",
    slug: "batch",
    icon: Layers,
    category: "protect",
    label: { zh: "批次浮水印", en: "Batch Watermark", ja: "一括透かし" },
    desc: {
      zh: "一次為多張圖片套用浮水印",
      en: "Watermark many images at once",
      ja: "複数の画像にまとめて透かしを入れる",
    },
  },
  {
    key: "pdf-watermark",
    slug: "pdf-watermark",
    icon: FileText,
    category: "protect",
    label: { zh: "PDF 浮水印", en: "PDF Watermark", ja: "PDF 透かし" },
    desc: {
      zh: "為 PDF 文件加上浮水印",
      en: "Stamp watermarks onto PDF files",
      ja: "PDF ファイルに透かしを入れる",
    },
  },
  {
    key: "mosaic",
    slug: "mosaic",
    icon: Grid2x2,
    category: "protect",
    label: { zh: "馬賽克遮蔽", en: "Mosaic & Blur", ja: "モザイク・ぼかし" },
    desc: {
      zh: "馬賽克、模糊或色塊遮蔽敏感內容",
      en: "Mosaic, blur or box out sensitive parts",
      ja: "見せたくない部分をモザイク・ぼかし・塗りつぶし",
    },
  },
  {
    key: "exif-clean",
    slug: "exif-clean",
    icon: Eraser,
    category: "protect",
    label: { zh: "EXIF 清除器", en: "EXIF Cleaner", ja: "EXIF 削除" },
    desc: {
      zh: "移除 GPS 定位與拍攝資訊",
      en: "Strip GPS location & camera metadata",
      ja: "GPS 位置情報や撮影データを削除",
    },
  },
  // ⚙️ 圖片處理
  {
    key: "compress",
    slug: "compress",
    icon: Minimize2,
    category: "process",
    label: { zh: "圖片壓縮", en: "Compress", ja: "画像圧縮" },
    desc: {
      zh: "縮小檔案大小又保留畫質",
      en: "Shrink file size while keeping quality",
      ja: "画質を保ったままファイルサイズを縮小",
    },
  },
  {
    key: "convert",
    slug: "convert",
    icon: Repeat,
    category: "process",
    label: { zh: "格式轉換", en: "Convert", ja: "形式変換" },
    desc: {
      zh: "JPG、PNG、WebP 格式互轉",
      en: "Convert between JPG, PNG & WebP",
      ja: "JPG・PNG・WebP を相互に変換",
    },
  },
  {
    key: "resize",
    slug: "resize",
    icon: Scaling,
    category: "process",
    label: { zh: "圖片縮放", en: "Resize", ja: "サイズ変更" },
    desc: {
      zh: "調整圖片寬高尺寸",
      en: "Resize image width & height",
      ja: "画像の幅と高さを調整",
    },
  },
  // ✨ 社群創作
  {
    key: "remove-bg",
    slug: "remove-bg",
    icon: Scissors,
    category: "create",
    label: { zh: "AI 去背", en: "AI Remove BG", ja: "AI 背景削除" },
    desc: {
      zh: "AI 一鍵去除圖片背景",
      en: "Remove image backgrounds with AI",
      ja: "AI がワンクリックで背景を消去",
    },
  },
  {
    key: "social-crop",
    slug: "social-crop",
    icon: Crop,
    category: "create",
    label: { zh: "社群裁切", en: "Social Crop", ja: "SNS 用トリミング" },
    desc: {
      zh: "各社群平台尺寸一鍵裁切",
      en: "Crop to sizes for every social platform",
      ja: "各 SNS の推奨サイズにトリミング",
    },
  },
];

/** 依語系組出工具連結（首頁 slug 為空字串）。 */
export function toolHref(tool: ToolDef, lang: Lang): string {
  // 日文版目前只有首頁浮水印工具，其餘工具尚未翻譯：與其連到 404，不如退回英文版。
  // 之後補齊 /ja/<slug> 頁面時，把該語系加進 FULL_LOCALES 即可自動改連日文版。
  const target: Lang =
    lang === "ja" && tool.slug !== "" && !FULL_LOCALES.includes("ja")
      ? "en"
      : lang;

  if (target === "en") {
    return tool.slug === "" ? "/en/" : `/en/${tool.slug}`;
  }
  if (target === "ja") {
    return tool.slug === "" ? "/ja/" : `/ja/${tool.slug}`;
  }
  return tool.slug === "" ? "/" : `/${tool.slug}`;
}

/** 取得某分類底下的工具。 */
export function toolsByCategory(category: CategoryId): ToolDef[] {
  return TOOLS.filter((tool) => tool.category === category);
}

/** 語言切換選單的選項（顯示名稱一律用該語言自己的寫法）。 */
export const LOCALES: { lang: Lang; label: string; ariaLabel: string }[] = [
  { lang: "zh", label: "繁體中文", ariaLabel: "切換到繁體中文" },
  { lang: "en", label: "English", ariaLabel: "Switch to English" },
  { lang: "ja", label: "日本語", ariaLabel: "日本語に切り替える" },
];

/**
 * 每個語系實際存在的「基準路徑」（去掉語系前綴後的形式）。切換語言時只有在
 * 對方語系真的有這一頁時才平移，否則退回該語系首頁。
 *
 * 這份清單必須保守：部落格文章是各語系各寫各的，並非一對一翻譯（例如
 * /blog/rent-id-watermark 就沒有英文版），照著換前綴會直接撞 404。因此只列
 * 出兩邊都保證存在的頁面：工具頁與部落格首頁。/convert/<slug> 由前綴另外處理。
 */
const SYMMETRIC_PATHS = new Set<string>([
  "/",
  "/blog",
  ...TOOLS.filter((tool) => tool.slug !== "").map((tool) => `/${tool.slug}`),
]);

/** 日文版目前只翻譯了首頁工具與部落格（含 3 篇文章）。 */
const JA_PATHS = new Set([
  "/",
  "/blog",
  "/blog/id-copy-watermark",
  "/blog/my-number-card-copy-safe",
  "/blog/document-watermark-tool",
]);

function existsIn(base: string, lang: Lang): boolean {
  if (lang === "ja") return JA_PATHS.has(base);
  // 格式對長尾頁 /convert/<slug> 中英皆有，用前綴判斷免得把 PAIRS 也搬進來。
  return SYMMETRIC_PATHS.has(base) || base.startsWith("/convert/");
}

/**
 * 把目前路徑換成另一個語系的對應路徑；對方沒有這一頁時退回該語系首頁，
 * 寧可少跳一層也不要讓使用者按了語言就撞到 404。
 */
export function switchLocalePath(currentPath: string, target: Lang): string {
  // 去掉語系前綴，取得共通的「基準路徑」，例如 /en/compress → /compress
  let base = currentPath.replace(/^\/(en|ja)(?=\/|$)/, "");
  if (base === "") base = "/";
  if (base.length > 1) base = base.replace(/\/$/, "");

  const home = { zh: "/", en: "/en/", ja: "/ja/" }[target];
  if (base === "/" || !existsIn(base, target)) return home;
  return target === "zh" ? base : `/${target}${base}`;
}
