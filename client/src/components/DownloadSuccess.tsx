import { useEffect, useRef } from "react";
import { KofiSupport } from "@/components/KofiSupport";
import { AffiliateNextSteps } from "@/components/AffiliateNextSteps";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { trackToolResultReady } from "@/lib/analytics";
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
 * 下載成功畫面的統一 CTA 區塊：Pro 候補（變現訊號）＋ Ko-fi 贊助 ＋ 情境式聯盟「下一步」。
 * 順序刻意如此：候補名單是「你願意付錢嗎」，優先於「謝謝你」的贊助卡。
 *
 * 於出現時送出一次 tool_result_ready（帶 image_count 參數）——代表使用者已取得可下載的
 * 成果（漏斗中間層）。真正的 tool_download_complete 改由各頁下載按鈕的 onClick 送出，
 * 兩者相減就能看出「做完卻沒下載」的流失。
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
    trackToolResultReady(tool, imageCount);
    // 僅在掛載時送出一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <WaitlistCTA tool={tool} lang={lang} location="download_success" />
      <KofiSupport variant="success" lang={lang} location="download_success" />
      <AffiliateNextSteps current={tool} lang={lang} />
    </div>
  );
}
