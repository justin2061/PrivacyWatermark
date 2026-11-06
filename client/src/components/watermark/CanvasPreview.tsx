import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import { Eye, Maximize2, ChevronDown, ChevronUp, X, Loader2 } from "lucide-react";
import type { Lang } from "@/lib/tools";
import { trackToolEvent } from "@/lib/analytics";

interface CanvasPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  selectedFile: File | null;
  processedImage: string | null;
  lang?: Lang;
  /** 以原圖解析度渲染目前設定，供全螢幕檢視；未提供時退回預覽 canvas。 */
  renderFullPreview?: () => Promise<string | null>;
}

const EXPANDED_KEY = "imagemarker.previewExpanded";

function readExpanded(): boolean {
  try {
    return localStorage.getItem(EXPANDED_KEY) === "1";
  } catch {
    return false;
  }
}

export function CanvasPreview({ canvasRef, selectedFile, processedImage, lang = 'zh', renderFullPreview }: CanvasPreviewProps) {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  // 手機版預覽大小：精簡（預設，sticky 不擋設定區）／放大（邊調邊看）
  const [expanded, setExpanded] = useState<boolean>(readExpanded);
  // 全螢幕檢視
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);
  const [actualSize, setActualSize] = useState(false);

  const t = {
    zh: {
      title: '預覽畫面',
      live: '即時預覽',
      emptyMain: '選擇圖片後會在此處顯示預覽',
      emptySub: '支援即時預覽浮水印效果',
      format: '格式',
      size: '原始尺寸',
      loading: '載入中...',
      expand: '放大預覽',
      collapse: '縮小預覽',
      expandShort: '放大',
      collapseShort: '縮小',
      fullscreen: '全螢幕檢視',
      close: '關閉',
      rendering: '正在以原始解析度產生預覽…',
      hintFit: '點圖片看原始大小',
      hintActual: '點圖片縮回整張',
    },
    en: {
      title: 'Preview',
      live: 'Live preview',
      emptyMain: 'Your preview will appear here after selecting an image',
      emptySub: 'Watermark effects update in real time',
      format: 'Format',
      size: 'Original size',
      loading: 'Loading...',
      expand: 'Enlarge preview',
      collapse: 'Shrink preview',
      expandShort: 'Larger',
      collapseShort: 'Smaller',
      fullscreen: 'View full screen',
      close: 'Close',
      rendering: 'Rendering at full resolution…',
      hintFit: 'Tap image for actual size',
      hintActual: 'Tap image to fit screen',
    },
    ja: {
      title: 'プレビュー',
      live: 'リアルタイム表示',
      emptyMain: '画像を選ぶと、ここにプレビューが表示されます',
      emptySub: '透かしの効果はその場で反映されます',
      format: '形式',
      size: '元のサイズ',
      loading: '読み込み中...',
      expand: 'プレビューを拡大',
      collapse: 'プレビューを縮小',
      expandShort: '拡大',
      collapseShort: '縮小',
      fullscreen: '全画面で見る',
      close: '閉じる',
      rendering: '元の解像度で描画しています…',
      hintFit: '画像をタップで原寸表示',
      hintActual: '画像をタップで全体表示',
    },
  }[lang];

  useEffect(() => {
    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src); // Clean up
      };
      img.src = URL.createObjectURL(selectedFile);
    } else {
      setImageDimensions(null);
    }
  }, [selectedFile]);

  const toggleExpanded = () => {
    setExpanded(prev => {
      const next = !prev;
      try { localStorage.setItem(EXPANDED_KEY, next ? "1" : "0"); } catch { /* 無痕模式等 */ }
      trackToolEvent(next ? "preview_expand" : "preview_collapse", "watermark");
      return next;
    });
  };

  const openViewer = useCallback(async () => {
    if (!selectedFile) return;
    setActualSize(false);
    setViewerSrc(null);
    setViewerOpen(true);
    trackToolEvent("preview_fullscreen_open", "watermark");
    let src: string | null = null;
    try {
      src = renderFullPreview ? await renderFullPreview() : null;
    } catch {
      src = null;
    }
    if (!src && canvasRef.current) {
      try { src = canvasRef.current.toDataURL(); } catch { src = null; }
    }
    setViewerSrc(src);
  }, [selectedFile, renderFullPreview, canvasRef]);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    setViewerSrc(null);
  }, []);

  return (
    <Card className="p-3 lg:p-6">
      {/* 標題列在 lg 以下（預覽 sticky 的範圍）隱藏，讓 sticky 預覽保持精簡 */}
      <div className="hidden lg:flex items-center justify-between mb-4">
        <h2 className="text-base lg:text-lg font-semibold text-gray-900">{t.title}</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>{t.live}</span>
        </div>
      </div>

      {/* Canvas Container — 手機用固定 px 高度（與 /batch 一致），不用 vh：
          高度在捲動中恆定，sticky 才穩定固定。
          精簡：container h-[120px] / canvas max-h-[104px]。
          放大：container 隨圖高（h-auto），canvas 上限 max-h-[260px]；
          橫向證件圖會自然矮於 260，不會白白佔掉直式高度。 */}
      <div
        className={`relative border border-gray-200 rounded-lg p-2 lg:p-4 bg-gray-50 lg:h-auto lg:min-h-[400px] flex items-center justify-center ${
          expanded && selectedFile ? 'h-auto min-h-[120px]' : 'h-[120px]'
        }`}
      >
        {!selectedFile ? (
          <div className="text-center">
            <span className="text-gray-400 text-3xl lg:text-6xl lg:mb-4 block">📷</span>
            <p className="text-gray-500 mb-2 hidden lg:block">{t.emptyMain}</p>
            <p className="text-sm text-gray-400 hidden lg:block">{t.emptySub}</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            onClick={openViewer}
            title={t.fullscreen}
            className={`max-w-full object-contain cursor-zoom-in lg:max-h-[400px] ${
              expanded ? 'max-h-[260px]' : 'max-h-[104px]'
            }`}
            style={{ display: selectedFile ? 'block' : 'none' }}
          />
        )}

        {selectedFile && (
          <>
            {/* 放大／縮小：只在手機（sticky 精簡預覽）出現 */}
            <button
              type="button"
              onClick={toggleExpanded}
              aria-label={expanded ? t.collapse : t.expand}
              aria-pressed={expanded}
              className="lg:hidden absolute left-1.5 bottom-1.5 inline-flex items-center gap-0.5 rounded-md bg-white/90 border border-gray-200 px-2 py-1 text-xs text-gray-700 shadow-sm active:bg-gray-100"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{expanded ? t.collapseShort : t.expandShort}</span>
            </button>
            {/* 全螢幕檢視 */}
            <button
              type="button"
              onClick={openViewer}
              aria-label={t.fullscreen}
              title={t.fullscreen}
              className="absolute right-1.5 bottom-1.5 lg:right-3 lg:bottom-3 inline-flex items-center justify-center rounded-md bg-white/90 border border-gray-200 p-1.5 text-gray-700 shadow-sm hover:bg-white active:bg-gray-100"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Canvas Info（手機隱藏，節省 sticky 高度） */}
      {selectedFile && (
        <div className="mt-4 hidden lg:flex justify-between text-xs lg:text-sm text-gray-500">
          <span>{t.format}: {selectedFile.type.split('/')[1].toUpperCase()}</span>
          <span>{t.size}: {imageDimensions ? `${imageDimensions.width}×${imageDimensions.height}` : t.loading}</span>
        </div>
      )}

      {viewerOpen && (
        <FullscreenViewer
          src={viewerSrc}
          actualSize={actualSize}
          onToggleSize={() => setActualSize(v => !v)}
          onClose={closeViewer}
          labels={t}
        />
      )}
    </Card>
  );
}

interface FullscreenViewerProps {
  src: string | null;
  actualSize: boolean;
  onToggleSize: () => void;
  onClose: () => void;
  labels: { close: string; rendering: string; hintFit: string; hintActual: string; fullscreen: string };
}

/**
 * 全螢幕檢視。必須 portal 到 body：預覽外層 sticky 容器有 will-change: transform，
 * 會變成 position: fixed 的包含區塊，不 portal 的話「全螢幕」只會蓋住預覽框。
 */
function FullscreenViewer({ src, actualSize, onToggleSize, onClose, labels }: FullscreenViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // 切到原始大小時捲到中央，浮水印通常鋪滿整張，中央最具代表性
  const onImgLoadOrToggle = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  };
  useEffect(() => {
    if (actualSize) requestAnimationFrame(onImgLoadOrToggle);
  }, [actualSize]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.fullscreen}
      className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
    >
      <div className="flex items-center justify-between px-3 py-2 text-white/80 text-xs flex-shrink-0">
        <span>{src ? (actualSize ? labels.hintActual : labels.hintFit) : ''}</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 p-2 text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div
        ref={scrollRef}
        className={`flex-1 min-h-0 overflow-auto ${actualSize ? '' : 'flex items-center justify-center p-2'}`}
        onClick={(e) => {
          // 點背景（非圖片）關閉
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            onClick={onToggleSize}
            className={
              actualSize
                ? 'max-w-none cursor-zoom-out'
                : 'max-w-full max-h-full object-contain cursor-zoom-in'
            }
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-white/80 text-sm">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>{labels.rendering}</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
