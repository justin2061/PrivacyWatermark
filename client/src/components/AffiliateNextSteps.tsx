import { ArrowUpRight, type LucideIcon, Palette, Wand2, ImageIcon } from "lucide-react";
import { trackAffiliateClick } from "@/lib/analytics";
import type { Lang, NavKey } from "@/lib/tools";

type ToolKey = Exclude<NavKey, "blog">;

interface Affiliate {
  name: string; // GA affiliate_name（穩定英文代號）
  icon: LucideIcon;
  /**
   * 對外連結。目前先放官網首頁；待申請到聯盟行銷後，直接換成帶追蹤參數的
   * 聯盟連結即可（GA 事件與 UI 皆不需改動）。
   */
  url: string;
  label: { zh: string; en: string };
  /** 情境化的一句話「下一步」文案 */
  blurb: { zh: string; en: string };
}

const CANVA: Affiliate = {
  name: "canva",
  icon: Palette,
  url: "https://www.canva.com/",
  label: { zh: "用 Canva 做社群圖", en: "Design with Canva" },
  blurb: {
    zh: "把處理好的圖片做成貼文、限動或封面",
    en: "Turn your image into posts, stories or covers",
  },
};

const ADOBE: Affiliate = {
  name: "adobe",
  icon: Wand2,
  url: "https://www.adobe.com/products/photoshop.html",
  label: { zh: "用 Adobe 進階編輯", en: "Edit further in Adobe" },
  blurb: {
    zh: "需要修圖、去瑕疵或更細緻的調整",
    en: "For retouching and finer edits",
  },
};

const SHUTTERSTOCK: Affiliate = {
  name: "shutterstock",
  icon: ImageIcon,
  url: "https://www.shutterstock.com/",
  label: { zh: "到 Shutterstock 找素材", en: "Find stock on Shutterstock" },
  blurb: {
    zh: "缺背景圖或設計素材？這裡有海量選擇",
    en: "Need backgrounds or design assets? Browse millions",
  },
};

// 每個工具的完成頁，情境式推薦最多 1–2 個「下一步」外部服務
const NEXT_STEPS: Record<ToolKey, Affiliate[]> = {
  watermark: [CANVA, ADOBE],
  batch: [CANVA, ADOBE],
  "pdf-watermark": [ADOBE],
  mosaic: [ADOBE, CANVA],
  "exif-clean": [CANVA],
  compress: [CANVA, SHUTTERSTOCK],
  convert: [CANVA, ADOBE],
  resize: [CANVA, SHUTTERSTOCK],
  "remove-bg": [CANVA, SHUTTERSTOCK],
  "social-crop": [CANVA, SHUTTERSTOCK],
};

interface AffiliateNextStepsProps {
  current: ToolKey;
  lang?: Lang;
  className?: string;
}

/**
 * 下載完成頁的「下一步」情境式推薦（外部聯盟服務，最多 1–2 項）。
 * 與內部工具推薦（ToolRecommendations）互補：那個留住站內流量，
 * 這個承接「處理完之後要做什麼」的高意圖出站需求並帶聯盟收益。
 * 每次點擊送出 GA affiliate_click（affiliate_name / tool_name）。
 */
export function AffiliateNextSteps({
  current,
  lang = "zh",
  className = "",
}: AffiliateNextStepsProps) {
  const isEn = lang === "en";
  const items = NEXT_STEPS[current] ?? [];
  if (items.length === 0) return null;

  const heading = isEn ? "Next step" : "下一步";

  return (
    <section
      className={`rounded-lg border border-gray-200 bg-white p-4 ${className}`}
      aria-labelledby="affiliate-next-heading"
    >
      <h3
        id="affiliate-next-heading"
        className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
      >
        {heading}
      </h3>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackAffiliateClick(item.name, current)}
              className="group flex items-start gap-3 rounded-lg border border-gray-200 p-3 transition-all hover:border-primary hover:shadow-sm"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {item.label[lang]}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-0.5 text-xs text-gray-500 leading-snug">
                  {item.blurb[lang]}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
