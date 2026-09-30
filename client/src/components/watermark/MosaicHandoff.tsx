import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Grid2x2 } from "lucide-react";
import { stashHandoffImage } from "@/lib/imageHandoff";
import { trackToolHandoff } from "@/lib/analytics";

interface MosaicHandoffProps {
  file: File | null;
}

/**
 * 浮水印頁「先遮個資」的假門測試：把目前的原圖帶到馬賽克工具。
 * 放在上傳後、下載前——使用者正在處理證件的當下，才量得到「途中想遮」的真實需求。
 * 結果（tool_handoff_*）決定要不要把馬賽克直接做進浮水印編輯器。
 */
export function MosaicHandoff({ file }: MosaicHandoffProps) {
  const [, setLocation] = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  // 曝光：進入畫面才算（手機上這塊在預覽圖下方，掛載不等於看到），每張圖只送一次
  useEffect(() => {
    const el = ref.current;
    if (!file || !el) return;
    if (typeof IntersectionObserver === "undefined") {
      trackToolHandoff("view", "watermark", "mosaic");
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        trackToolHandoff("view", "watermark", "mosaic");
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [file]);

  if (!file) return null;

  const go = () => {
    stashHandoffImage(file, "watermark");
    trackToolHandoff("click", "watermark", "mosaic");
    setLocation("/mosaic");
  };

  return (
    <div ref={ref} className="rounded-lg border border-gray-200 bg-white p-3">
      <button
        type="button"
        onClick={go}
        className="group flex w-full items-center gap-3 text-left"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Grid2x2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-gray-900 group-hover:text-primary">
            身分證字號、地址要遮起來？
          </span>
          <span className="block text-xs text-gray-600">
            先帶這張圖去打馬賽克，同樣 100% 本機處理
          </span>
        </span>
        <ArrowRight
          className="h-4 w-4 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
