import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  trackCrossPromoView,
  trackCrossPromoClick,
  type CrossPromoSite,
} from "@/lib/analytics";

interface Promo {
  site: CrossPromoSite;
  href: string;
  title: string;
  blurb: string;
}

// 兩個都是同一位作者的獨立站，文案以台灣上班族為對象，所以只在中文頁顯示。
const PROMOS: Promo[] = [
  {
    site: "salarykit",
    href: "https://salarykit.app/?utm_source=imagemarker&utm_medium=cross_promo&utm_campaign=download_success",
    title: "算算你的薪水實領多少",
    blurb: "扣完勞健保、勞退後，每月到手多少一次看懂",
  },
  {
    site: "getcareers",
    href: "https://getcareers.app/?utm_source=imagemarker&utm_medium=cross_promo&utm_campaign=download_success",
    title: "查查你的公司薪資行情",
    blurb: "同產業、同職位的薪資水準，談薪前先有底",
  },
];

interface CrossPromoProps {
  /** 目前工具（埋點 from_tool） */
  tool: string;
  className?: string;
}

/**
 * 下載完成後的低調站外推薦：每次掛載隨機挑一個（salarykit / getcareers）。
 * 刻意做成一行小字卡，不搶下載與 Ko-fi 的注意力；曝光與點擊各送一個 GA 事件。
 */
export function CrossPromo({ tool, className = "" }: CrossPromoProps) {
  // 掛載時選一次，重繪不換，避免曝光事件與畫面上的卡片對不上
  const [promo] = useState(() => PROMOS[Math.floor(Math.random() * PROMOS.length)]);

  useEffect(() => {
    trackCrossPromoView(promo.site, tool);
    // 每次掛載一次曝光
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a
      href={promo.href}
      target="_blank"
      rel="noopener"
      onClick={() => trackCrossPromoClick(promo.site, tool)}
      className={`group flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:border-primary ${className}`}
    >
      <span className="min-w-0">
        <span className="block text-xs text-gray-400">順便看看我們的另一個小工具</span>
        <span className="block text-sm font-medium text-gray-800 group-hover:text-primary">
          {promo.title}
        </span>
        <span className="block text-xs text-gray-500">{promo.blurb}</span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 flex-shrink-0 text-gray-300 group-hover:text-primary"
        aria-hidden="true"
      />
    </a>
  );
}
