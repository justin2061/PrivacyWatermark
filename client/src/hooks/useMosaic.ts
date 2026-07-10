import { useCallback, useEffect, useRef, useState } from "react";

// 遮蔽工具核心邏輯：全部在瀏覽器端以 Canvas API 處理，圖片不會上傳。
//
// 座標系統：所有遮蔽區域（MaskRegion）都以「圖片原始像素」座標儲存。
// 可見的 <canvas> 點陣尺寸設為圖片原始尺寸，再交由 CSS（max-width:100%）縮放顯示，
// 因此指標事件需透過 getBoundingClientRect() 換算回原始像素座標。
//
// 兩張畫布：
//   fullCanvas（離屏）— 只存「合成後的乾淨結果」，下載時輸出這一張。
//   viewCanvas（可見）— 先畫上 fullCanvas，再疊上虛線選取框；虛線不會被下載。

export type MaskType = "mosaic" | "blur" | "solid";

export interface MaskRegion {
  id: number;
  type: MaskType;
  // 圖片原始像素座標（左上角 + 寬高，皆為正值）
  x: number;
  y: number;
  w: number;
  h: number;
  // 依 type 而定的參數（建立當下快照，之後調整滑桿不會回溯改變舊區域）
  pixelSize?: number; // mosaic：每個馬賽克方塊邊長（原始像素）
  blur?: number; // blur：高斯模糊半徑（px）
  color?: string; // solid：色塊顏色
}

interface Messages {
  invalidType: string;
  loadFailed: string;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// 拖曳選取的最小尺寸（原始像素），太小的視為誤觸不建立區域
const MIN_SELECTION = 8;

let nextId = 1;

/** 馬賽克（像素化）：在原圖上取樣該區域，縮小再放大（關閉平滑）造成方塊感。 */
function applyMosaic(
  ctx: CanvasRenderingContext2D,
  src: CanvasImageSource,
  r: Rect,
  block: number
) {
  const tw = Math.max(1, Math.round(r.w / block));
  const th = Math.max(1, Math.round(r.h / block));
  const tmp = document.createElement("canvas");
  tmp.width = tw;
  tmp.height = th;
  const tctx = tmp.getContext("2d");
  if (!tctx) return;
  tctx.imageSmoothingEnabled = false;
  tctx.drawImage(src, r.x, r.y, r.w, r.h, 0, 0, tw, th);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, 0, 0, tw, th, r.x, r.y, r.w, r.h);
  ctx.restore();
}

/** 高斯模糊：對含 padding 的區域套用 blur filter，再裁切回原區域，避免邊緣淡出。 */
function applyBlur(
  ctx: CanvasRenderingContext2D,
  src: CanvasImageSource,
  r: Rect,
  radius: number,
  natW: number,
  natH: number
) {
  const pad = Math.ceil(radius * 2) + 2;
  const sx = Math.max(0, r.x - pad);
  const sy = Math.max(0, r.y - pad);
  const sw = Math.min(natW, r.x + r.w + pad) - sx;
  const sh = Math.min(natH, r.y + r.h + pad) - sy;
  if (sw <= 0 || sh <= 0) return;
  const tmp = document.createElement("canvas");
  tmp.width = sw;
  tmp.height = sh;
  const tctx = tmp.getContext("2d");
  if (!tctx) return;
  tctx.filter = `blur(${radius}px)`;
  tctx.drawImage(src, sx, sy, sw, sh, 0, 0, sw, sh);
  ctx.save();
  ctx.beginPath();
  ctx.rect(r.x, r.y, r.w, r.h);
  ctx.clip();
  ctx.drawImage(tmp, 0, 0, sw, sh, sx, sy, sw, sh);
  ctx.restore();
}

function applyRegion(
  ctx: CanvasRenderingContext2D,
  src: CanvasImageSource,
  region: MaskRegion,
  natW: number,
  natH: number
) {
  const r: Rect = { x: region.x, y: region.y, w: region.w, h: region.h };
  if (region.type === "mosaic") {
    applyMosaic(ctx, src, r, region.pixelSize || 16);
  } else if (region.type === "blur") {
    applyBlur(ctx, src, r, region.blur || 12, natW, natH);
  } else {
    ctx.save();
    ctx.fillStyle = region.color || "#000000";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.restore();
  }
}

function normalizeRect(a: { x: number; y: number }, b: { x: number; y: number }): Rect {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    w: Math.abs(a.x - b.x),
    h: Math.abs(a.y - b.y),
  };
}

export function useMosaic(messages: Messages) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fullCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState<{ w: number; h: number } | null>(null);
  const [regions, setRegions] = useState<MaskRegion[]>([]);

  const [maskType, setMaskType] = useState<MaskType>("mosaic");
  const [pixelSize, setPixelSize] = useState(16);
  const [blurStrength, setBlurStrength] = useState(12);
  const [solidColor, setSolidColor] = useState("#000000");

  // 拖曳中的暫存選取（原始像素座標），未提交前只畫在 viewCanvas 疊層上
  const draftRef = useRef<Rect | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 把 fullCanvas 疊上虛線後畫到可見畫布
  const renderView = useCallback(() => {
    const view = viewCanvasRef.current;
    const full = fullCanvasRef.current;
    if (!view || !full) return;
    const ctx = view.getContext("2d");
    if (!ctx) return;
    // 可見畫布在圖片載入後才掛載，因此在繪製前確保點陣尺寸對齊原始圖片尺寸
    if (view.width !== full.width) view.width = full.width;
    if (view.height !== full.height) view.height = full.height;
    ctx.clearRect(0, 0, view.width, view.height);
    ctx.drawImage(full, 0, 0);

    // 換算「一個螢幕像素」在原始座標中的長度，讓虛線粗細看起來一致
    const rect = view.getBoundingClientRect();
    const scale = rect.width > 0 ? view.width / rect.width : 1;
    const line = Math.max(1, 1.5 * scale);
    const dash = 6 * scale;

    // 已提交的區域：淡色實線框，方便辨識
    ctx.save();
    ctx.lineWidth = line;
    ctx.strokeStyle = "rgba(37, 99, 235, 0.9)";
    for (const r of regionsRef.current) {
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    }
    // 拖曳中的選取：藍色虛線
    const draft = draftRef.current;
    if (draft) {
      ctx.setLineDash([dash, dash]);
      ctx.lineWidth = line;
      ctx.strokeStyle = "#2563eb";
      ctx.strokeRect(draft.x, draft.y, draft.w, draft.h);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(37, 99, 235, 0.12)";
      ctx.fillRect(draft.x, draft.y, draft.w, draft.h);
    }
    ctx.restore();
  }, []);

  // regions 在事件回呼中被讀取，用 ref 保持最新值
  const regionsRef = useRef<MaskRegion[]>([]);
  useEffect(() => {
    regionsRef.current = regions;
  }, [regions]);

  // 重新合成乾淨結果（原圖 + 所有區域）到離屏 fullCanvas
  const renderFull = useCallback(() => {
    const full = fullCanvasRef.current;
    const img = imgRef.current;
    if (!full || !img) return;
    const ctx = full.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, full.width, full.height);
    ctx.drawImage(img, 0, 0);
    for (const region of regionsRef.current) {
      applyRegion(ctx, img, region, full.width, full.height);
    }
  }, []);

  // 區域變動 → 重新合成 + 重畫
  useEffect(() => {
    if (!imgRef.current) return;
    renderFull();
    renderView();
  }, [regions, renderFull, renderView]);

  const onPickFile = useCallback(
    (file?: File | null) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert(messages.invalidType);
        return;
      }
      setRegions([]);
      draftRef.current = null;
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        imgRef.current = img;
        const natW = img.naturalWidth;
        const natH = img.naturalHeight;
        setOrigSize({ w: natW, h: natH });

        const full = document.createElement("canvas");
        full.width = natW;
        full.height = natH;
        fullCanvasRef.current = full;

        const view = viewCanvasRef.current;
        if (view) {
          view.width = natW;
          view.height = natH;
        }
        setSelectedFile(file);
        // 首次繪製（此時 regions 已清空）
        requestAnimationFrame(() => {
          renderFull();
          renderView();
        });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        alert(messages.loadFailed);
      };
      img.src = url;
    },
    [messages, renderFull, renderView]
  );

  // 指標事件（pointer events 同時支援滑鼠與觸控）
  const pointToImage = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const view = viewCanvasRef.current;
    if (!view) return { x: 0, y: 0 };
    const rect = view.getBoundingClientRect();
    const scaleX = rect.width > 0 ? view.width / rect.width : 1;
    const scaleY = rect.height > 0 ? view.height / rect.height : 1;
    const x = Math.max(0, Math.min(view.width, (e.clientX - rect.left) * scaleX));
    const y = Math.max(0, Math.min(view.height, (e.clientY - rect.top) * scaleY));
    return { x, y };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imgRef.current) return;
    e.preventDefault();
    try {
      (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    } catch {
      /* 忽略：某些環境下指標尚未啟用時無法擷取 */
    }
    dragStartRef.current = pointToImage(e);
    draftRef.current = { ...dragStartRef.current, w: 0, h: 0 };
    setIsDrawing(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartRef.current) return;
    const cur = pointToImage(e);
    draftRef.current = normalizeRect(dragStartRef.current, cur);
    renderView();
  };

  const commitDraft = () => {
    const draft = draftRef.current;
    dragStartRef.current = null;
    draftRef.current = null;
    setIsDrawing(false);
    if (!draft || draft.w < MIN_SELECTION || draft.h < MIN_SELECTION) {
      renderView();
      return;
    }
    const region: MaskRegion = {
      id: nextId++,
      type: maskType,
      x: Math.round(draft.x),
      y: Math.round(draft.y),
      w: Math.round(draft.w),
      h: Math.round(draft.h),
      ...(maskType === "mosaic" ? { pixelSize } : {}),
      ...(maskType === "blur" ? { blur: blurStrength } : {}),
      ...(maskType === "solid" ? { color: solidColor } : {}),
    };
    setRegions((prev) => [...prev, region]);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartRef.current) return;
    try {
      (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
    } catch {
      /* 忽略：指標可能已釋放 */
    }
    commitDraft();
  };

  const removeRegion = (id: number) => {
    setRegions((prev) => prev.filter((r) => r.id !== id));
  };

  const undoLast = () => {
    setRegions((prev) => prev.slice(0, -1));
  };

  const clearRegions = () => {
    setRegions([]);
  };

  const download = () => {
    const full = fullCanvasRef.current;
    if (!full || !selectedFile) return;
    const outType =
      selectedFile.type === "image/jpeg" ? "image/jpeg" : "image/png";
    full.toBlob(
      (blob) => {
        if (!blob) return;
        const base = selectedFile.name.replace(/\.[^.]+$/, "");
        const ext = outType === "image/jpeg" ? "jpg" : "png";
        const a = document.createElement("a");
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `${base}-masked.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      outType,
      0.92
    );
  };

  const reset = () => {
    setSelectedFile(null);
    setOrigSize(null);
    setRegions([]);
    imgRef.current = null;
    fullCanvasRef.current = null;
    draftRef.current = null;
    dragStartRef.current = null;
    setIsDrawing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    fileInputRef,
    viewCanvasRef,
    selectedFile,
    origSize,
    regions,
    maskType,
    setMaskType,
    pixelSize,
    setPixelSize,
    blurStrength,
    setBlurStrength,
    solidColor,
    setSolidColor,
    isDrawing,
    onPickFile,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    removeRegion,
    undoLast,
    clearRegions,
    download,
    reset,
  };
}
