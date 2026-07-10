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
  type LucideIcon,
} from "lucide-react";

export type Lang = "zh" | "en";

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
}

export interface CategoryDef {
  id: CategoryId;
  emoji: string;
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
  { id: "protect", emoji: "🛡️", label: { zh: "隱私保護", en: "Protect" } },
  { id: "process", emoji: "⚙️", label: { zh: "圖片處理", en: "Process" } },
  { id: "create", emoji: "✨", label: { zh: "社群創作", en: "Create" } },
];

export const TOOLS: ToolDef[] = [
  // 🛡️ 隱私保護
  {
    key: "watermark",
    slug: "",
    icon: Stamp,
    category: "protect",
    label: { zh: "浮水印", en: "Watermark" },
    desc: {
      zh: "幫證件、文件加文字或 Logo 浮水印",
      en: "Add text or logo watermarks to IDs & docs",
    },
  },
  {
    key: "batch",
    slug: "batch",
    icon: Layers,
    category: "protect",
    label: { zh: "批次浮水印", en: "Batch Watermark" },
    desc: {
      zh: "一次為多張圖片套用浮水印",
      en: "Watermark many images at once",
    },
  },
  {
    key: "pdf-watermark",
    slug: "pdf-watermark",
    icon: FileText,
    category: "protect",
    label: { zh: "PDF 浮水印", en: "PDF Watermark" },
    desc: {
      zh: "為 PDF 文件加上浮水印",
      en: "Stamp watermarks onto PDF files",
    },
  },
  {
    key: "mosaic",
    slug: "mosaic",
    icon: Grid2x2,
    category: "protect",
    label: { zh: "馬賽克遮蔽", en: "Mosaic & Blur" },
    desc: {
      zh: "馬賽克、模糊或色塊遮蔽敏感內容",
      en: "Mosaic, blur or box out sensitive parts",
    },
  },
  {
    key: "exif-clean",
    slug: "exif-clean",
    icon: Eraser,
    category: "protect",
    label: { zh: "EXIF 清除器", en: "EXIF Cleaner" },
    desc: {
      zh: "移除 GPS 定位與拍攝資訊",
      en: "Strip GPS location & camera metadata",
    },
  },
  // ⚙️ 圖片處理
  {
    key: "compress",
    slug: "compress",
    icon: Minimize2,
    category: "process",
    label: { zh: "圖片壓縮", en: "Compress" },
    desc: {
      zh: "縮小檔案大小又保留畫質",
      en: "Shrink file size while keeping quality",
    },
  },
  {
    key: "convert",
    slug: "convert",
    icon: Repeat,
    category: "process",
    label: { zh: "格式轉換", en: "Convert" },
    desc: {
      zh: "JPG、PNG、WebP 格式互轉",
      en: "Convert between JPG, PNG & WebP",
    },
  },
  {
    key: "resize",
    slug: "resize",
    icon: Scaling,
    category: "process",
    label: { zh: "圖片縮放", en: "Resize" },
    desc: {
      zh: "調整圖片寬高尺寸",
      en: "Resize image width & height",
    },
  },
  // ✨ 社群創作
  {
    key: "remove-bg",
    slug: "remove-bg",
    icon: Scissors,
    category: "create",
    label: { zh: "AI 去背", en: "AI Remove BG" },
    desc: {
      zh: "AI 一鍵去除圖片背景",
      en: "Remove image backgrounds with AI",
    },
  },
  {
    key: "social-crop",
    slug: "social-crop",
    icon: Crop,
    category: "create",
    label: { zh: "社群裁切", en: "Social Crop" },
    desc: {
      zh: "各社群平台尺寸一鍵裁切",
      en: "Crop to sizes for every social platform",
    },
  },
];

/** 依語系組出工具連結（首頁 slug 為空字串）。 */
export function toolHref(tool: ToolDef, lang: Lang): string {
  if (lang === "en") {
    return tool.slug === "" ? "/en/" : `/en/${tool.slug}`;
  }
  return tool.slug === "" ? "/" : `/${tool.slug}`;
}

/** 取得某分類底下的工具。 */
export function toolsByCategory(category: CategoryId): ToolDef[] {
  return TOOLS.filter((tool) => tool.category === category);
}
