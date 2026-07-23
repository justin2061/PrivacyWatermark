import { ArrowUpRight, type LucideIcon, Palette, Wand2, ImageIcon } from "lucide-react";
import { trackAffiliateClick } from "@/lib/analytics";
import type { Lang, NavKey } from "@/lib/tools";

type ToolKey = Exclude<NavKey, "blog">;

interface Affiliate {
  name: string; // GA affiliate_name（穩定英文代號）
  icon: LucideIcon;
  /**
   * 外部服務連結。
   *
   * 沿革：commit 4f61f1e 曾把這些普通官網連結改成 null（理由：沒分潤就不要把流量
   * 送出去）。2026-07-21 改回填入普通官網連結——先讓區塊能顯示並累積 affiliate_click
   * 數據，點擊量本身就是日後申請聯盟的籌碼；在那之前這些連結賺不到任何分潤。
   *
   * url 為 null 的項目仍然不渲染（保留這條規則，避免出現 # 死連結）。
   */
  url: string | null;
  label: Record<Lang, string>;
  /** 情境化的一句話「下一步」文案 */
  blurb: Record<Lang, string>;
}

const CANVA: Affiliate = {
  name: "canva",
  icon: Palette,
  // TODO: 換成 Canva 聯盟追蹤連結（目前是普通官網連結，無分潤）
  url: "https://www.canva.com/",
  label: { zh: "用 Canva 做社群圖", en: "Design with Canva", ja: "Canva で SNS 画像を作る" },
  blurb: {
    zh: "把處理好的圖片做成貼文、限動或封面",
    en: "Turn your image into posts, stories or covers",
    ja: "加工した画像を投稿・ストーリー・カバーに仕上げる",
  },
};

const ADOBE: Affiliate = {
  name: "adobe",
  icon: Wand2,
  // TODO: 換成 Adobe 聯盟追蹤連結（目前是普通官網連結，無分潤）
  url: "https://www.adobe.com/express/",
  label: { zh: "用 Adobe 進階編輯", en: "Edit further in Adobe", ja: "Adobe でさらに編集する" },
  blurb: {
    zh: "需要修圖、去瑕疵或更細緻的調整",
    en: "For retouching and finer edits",
    ja: "レタッチや細かい調整をしたいときに",
  },
};

const SHUTTERSTOCK: Affiliate = {
  name: "shutterstock",
  icon: ImageIcon,
  // TODO: 換成 Shutterstock 聯盟追蹤連結（目前是普通官網連結，無分潤）
  url: "https://www.shutterstock.com/",
  label: { zh: "到 Shutterstock 找素材", en: "Find stock on Shutterstock", ja: "Shutterstock で素材を探す" },
  blurb: {
    zh: "缺背景圖或設計素材？這裡有海量選擇",
    en: "Need backgrounds or design assets? Browse millions",
    ja: "背景やデザイン素材が必要なら、膨大な選択肢から",
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
  // 只顯示有真實聯盟連結的項目；尚未申請到的（url 為 null）先不渲染，
  // 避免出現假連結或 # 死連結。等填入真實連結後即自動出現。
  const items = (NEXT_STEPS[current] ?? []).filter(
    (item): item is Affiliate & { url: string } => Boolean(item.url),
  );
  if (items.length === 0) return null;

  const heading = { zh: "下一步", en: "Next step", ja: "次のステップ" }[lang];

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
