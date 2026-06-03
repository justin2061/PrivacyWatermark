import exifr from "exifr";
import piexif from "piexifjs";

export interface MetadataEntry {
  label: string;
  value: string;
  sensitive?: boolean;
}

export interface MetadataReport {
  hasMetadata: boolean;
  entries: MetadataEntry[];
  sensitiveCount: number;
}

const SENSITIVE_FIELDS = new Set([
  "GPSLatitude",
  "GPSLongitude",
  "GPSAltitude",
  "GPSPosition",
  "GPSDateStamp",
  "GPSTimeStamp",
  "latitude",
  "longitude",
  "DateTimeOriginal",
  "CreateDate",
  "ModifyDate",
  "Make",
  "Model",
  "LensMake",
  "LensModel",
  "Software",
  "SerialNumber",
  "BodySerialNumber",
  "InternalSerialNumber",
  "OwnerName",
  "Artist",
  "Copyright",
  "HostComputer",
]);

const FIELD_LABELS: Record<string, string> = {
  Make: "相機品牌",
  Model: "相機型號",
  LensMake: "鏡頭品牌",
  LensModel: "鏡頭型號",
  Software: "處理軟體",
  DateTimeOriginal: "拍攝時間",
  CreateDate: "建立時間",
  ModifyDate: "修改時間",
  GPSLatitude: "GPS 緯度",
  GPSLongitude: "GPS 經度",
  GPSAltitude: "GPS 海拔",
  GPSPosition: "GPS 位置",
  latitude: "緯度",
  longitude: "經度",
  SerialNumber: "相機序號",
  BodySerialNumber: "機身序號",
  InternalSerialNumber: "內部序號",
  OwnerName: "擁有者",
  Artist: "作者",
  Copyright: "版權資訊",
  HostComputer: "處理裝置",
  ImageWidth: "圖片寬度",
  ImageHeight: "圖片高度",
  Orientation: "方向",
  XResolution: "水平解析度",
  YResolution: "垂直解析度",
  ResolutionUnit: "解析度單位",
  ColorSpace: "色彩空間",
  ExposureTime: "曝光時間",
  FNumber: "光圈值",
  ISO: "ISO 值",
  FocalLength: "焦距",
  Flash: "閃光燈",
  WhiteBalance: "白平衡",
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleString("zh-TW");
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export async function readMetadata(file: File): Promise<MetadataReport> {
  let raw: Record<string, unknown> | undefined;
  try {
    raw = (await exifr.parse(file, {
      gps: true,
      tiff: true,
      exif: true,
      xmp: true,
      icc: false,
      iptc: true,
      jfif: true,
      ihdr: true,
      mergeOutput: true,
      sanitize: true,
      reviveValues: true,
    })) as Record<string, unknown> | undefined;
  } catch {
    raw = undefined;
  }

  if (!raw || Object.keys(raw).length === 0) {
    return { hasMetadata: false, entries: [], sensitiveCount: 0 };
  }

  const entries: MetadataEntry[] = [];
  let sensitiveCount = 0;

  for (const [key, value] of Object.entries(raw)) {
    const formatted = formatValue(value);
    if (!formatted) continue;
    const sensitive = SENSITIVE_FIELDS.has(key);
    if (sensitive) sensitiveCount++;
    entries.push({
      label: FIELD_LABELS[key] ?? key,
      value: formatted,
      sensitive,
    });
  }

  entries.sort((a, b) => {
    if (a.sensitive === b.sensitive) return a.label.localeCompare(b.label, "zh-TW");
    return a.sensitive ? -1 : 1;
  });

  return { hasMetadata: entries.length > 0, entries, sensitiveCount };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mimeMatch = header.match(/data:([^;]+)/);
  const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

async function stripJpegLossless(file: File): Promise<Blob> {
  const dataUrl = await fileToDataUrl(file);
  const cleaned = piexif.remove(dataUrl);
  return dataUrlToBlob(cleaned);
}

async function stripViaCanvas(file: File, mimeType: string): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("圖片載入失敗"));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("無法建立 canvas context");
    ctx.drawImage(img, 0, 0);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("輸出失敗"))),
        mimeType,
        mimeType === "image/jpeg" ? 0.95 : undefined,
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function stripMetadata(file: File): Promise<Blob> {
  if (file.type === "image/jpeg" || file.type === "image/jpg") {
    try {
      return await stripJpegLossless(file);
    } catch {
      return stripViaCanvas(file, "image/jpeg");
    }
  }
  if (file.type === "image/png") return stripViaCanvas(file, "image/png");
  if (file.type === "image/webp") return stripViaCanvas(file, "image/webp");
  return stripViaCanvas(file, file.type || "image/jpeg");
}

export function buildCleanedFilename(original: string): string {
  const dot = original.lastIndexOf(".");
  if (dot <= 0) return `${original}_clean`;
  return `${original.slice(0, dot)}_clean${original.slice(dot)}`;
}
