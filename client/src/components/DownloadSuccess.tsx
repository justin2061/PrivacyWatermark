import { useEffect, useRef } from "react";
import { KofiSupport } from "@/components/KofiSupport";
import { AffiliateNextSteps } from "@/components/AffiliateNextSteps";
import { trackDownloadComplete } from "@/lib/analytics";
import type { Lang, NavKey } from "@/lib/tools";

type ToolKey = Exclude<NavKey, "blog">;

interface DownloadSuccessProps {
  /** 目前工具（決定聯盟推薦與埋點的 tool_name） */
  tool: ToolKey;
  lang?: Lang;
  /** 本次處理／下載的圖片張數（批次為實際張數，單張工具為 1） */
  imageCount?: number;
  className?: string;
}

/**
 * 下載成功畫面的統一 CTA 區塊：Ko-fi 贊助（移到此處）＋ 情境式聯盟「下一步」。
 * 於出現時送出一次 tool_download_complete + image_count 埋點——這一刻代表使用者
 * 已取得可下載的成果（漏斗的分子）。全站工具一致：這個成功畫面出現即計為一次
 * 完成，image_count 帶入本次處理張數（批次為實際張數，單張工具為 1）。
 */
export function DownloadSuccess({
  tool,
  lang = "zh",
  imageCount = 1,
  className = "",
}: DownloadSuccessProps) {
  // 避免 React 嚴格模式/重繪造成重複計數：每次掛載只送一次
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackDownloadComplete(tool, imageCount);
    // 僅在掛載時送出一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <KofiSupport variant="success" lang={lang} location="download_success" />
      <AffiliateNextSteps current={tool} lang={lang} />
    </div>
  );
}
