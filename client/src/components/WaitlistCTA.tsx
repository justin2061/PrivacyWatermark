import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { trackWaitlistCtaView, trackWaitlistCtaClick } from "@/lib/analytics";
import type { Lang } from "@/lib/tools";

interface WaitlistCTAProps {
  /** 目前工具，作為埋點的 tool_name（分辨哪個工具的完成頁最會轉換） */
  tool: string;
  lang?: Lang;
  /**
   * 出現位置，用於埋點區分轉換率：
   * download_success（剛做完事、高意圖）／ homepage ／ blog_article。
   */
  location?: string;
  className?: string;
}

/**
 * 兩種文案角度，用來測哪個真的能把 0.24% 的 CTR 拉起來：
 * - pain：直接問痛點（一次 50 張？），賣「省下的工」
 * - early：問重複勞動（每次重打？），賣「早鳥價＋先用到」
 * 功能條列兩者共用——具體功能本身就是最強的說服力，弱的是標題。
 */
type Variant = "pain" | "early";

const VARIANTS: Variant[] = ["pain", "early"];
const VARIANT_KEY = "im_waitlist_variant";

interface CopyBlock {
  title: string;
  bullets: string[];
  foot: string;
  cta: string;
}

const COPY: Record<Lang, Record<Variant, CopyBlock>> = {
  zh: {
    pain: {
      title: "一次要處理 50 張以上？",
      bullets: [
        "批次一次 50+ 張，不用一張一張慢慢來",
        "儲存常用浮水印範本，下次一鍵套用",
        "PDF 浮水印輸出，合約、報價單直接蓋",
      ],
      foot: "這些都在 Pro 版規劃中。留個 Email，上線第一時間通知你。",
      cta: "加入 Pro 候補名單，搶先體驗",
    },
    early: {
      title: "常用的浮水印文字，每次都要重打一次？",
      bullets: [
        "儲存常用浮水印範本，下次一鍵套用",
        "批次一次 50+ 張，不用一張一張慢慢來",
        "PDF 浮水印輸出，合約、報價單直接蓋",
      ],
      foot: "Pro 版開發中，候補名單享早鳥價。只在上線時通知一次，不寄廣告。",
      cta: "加入 Pro 候補名單，搶先體驗",
    },
  },
  en: {
    pain: {
      title: "Processing 50+ images at a time?",
      bullets: [
        "Batch 50+ images in one go, not one by one",
        "Save your watermark presets, reuse in one click",
        "PDF watermarking for contracts and invoices",
      ],
      foot: "All planned for Pro. Leave your email and we'll tell you the moment it ships.",
      cta: "Join the Pro waitlist — get early access",
    },
    early: {
      title: "Retyping the same watermark text every time?",
      bullets: [
        "Save your watermark presets, reuse in one click",
        "Batch 50+ images in one go, not one by one",
        "PDF watermarking for contracts and invoices",
      ],
      foot: "Pro is in development. Waitlist members get early-bird pricing — one email, no spam.",
      cta: "Join the Pro waitlist — get early access",
    },
  },
  ja: {
    pain: {
      title: "一度に 50 枚以上を処理していませんか？",
      bullets: [
        "一括で 50 枚以上をまとめて処理",
        "よく使う透かしをテンプレート保存、次回はワンクリック",
        "PDF への透かし出力（契約書・見積書にも）",
      ],
      foot: "すべて Pro で計画中です。メールを登録すれば、公開時に最初にお知らせします。",
      cta: "Pro ウェイトリストに登録して先行体験",
    },
    early: {
      title: "同じ透かし文字を毎回打ち直していませんか？",
      bullets: [
        "よく使う透かしをテンプレート保存、次回はワンクリック",
        "一括で 50 枚以上をまとめて処理",
        "PDF への透かし出力（契約書・見積書にも）",
      ],
      foot: "Pro は開発中です。ウェイトリスト登録者には早期割引をご案内します（配信は 1 回のみ）。",
      cta: "Pro ウェイトリストに登録して先行体験",
    },
  },
};

/** 候補頁路徑（zh 無語系前綴，與站上其他頁一致）。 */
function waitlistHref(lang: Lang): string {
  return lang === "zh" ? "/waitlist" : `/${lang}/waitlist`;
}

/**
 * 同一位訪客固定拿到同一個變體，否則同一人在首頁／文章頁看到不同文案，
 * 曝光與點擊會被算到不同組，CTR 就沒有意義。localStorage 不可用時退回 "pain"。
 */
function resolveVariant(): Variant {
  try {
    const stored = window.localStorage.getItem(VARIANT_KEY);
    if (stored === "pain" || stored === "early") return stored;
    const picked = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    window.localStorage.setItem(VARIANT_KEY, picked);
    return picked;
  } catch {
    return "pain";
  }
}

/**
 * Pro 候補 CTA。在下載完成畫面裡，這張卡只在使用者「真的按下下載」之後才出現
 * （見 DownloadSuccess）——先讓人把事情做完，再問願不願意付錢。
 * 出現送 waitlist_cta_view、點擊送 waitlist_cta_click，兩者都帶 variant 以便比較文案。
 */
export function WaitlistCTA({
  tool,
  lang = "zh",
  location = "download_success",
  className = "",
}: WaitlistCTAProps) {
  // 預渲染時一律先輸出 "pain"，靜態 HTML 才有固定內容；變體在瀏覽器端才決定。
  const [variant, setVariant] = useState<Variant>("pain");
  const t = COPY[lang][variant];
  const firedRef = useRef(false);
  // 首頁同時有「完成畫面」與「頁尾」兩個實例，寫死的 id 會重複——useId 保證唯一。
  const headingId = useId();

  useEffect(() => {
    const picked = resolveVariant();
    setVariant(picked);
    if (firedRef.current) return;
    firedRef.current = true;
    trackWaitlistCtaView(tool, location, picked);
  }, [tool, location]);

  return (
    <section
      className={`rounded-lg border border-primary/30 bg-gradient-to-br from-blue-50 to-white p-4 ${className}`}
      aria-labelledby={headingId}
    >
      <h3
        id={headingId}
        className="flex items-start gap-2 text-base font-semibold text-gray-900"
      >
        <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
        {t.title}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {t.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm leading-relaxed text-gray-700">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.foot}</p>
      <a
        href={waitlistHref(lang)}
        onClick={() => trackWaitlistCtaClick(tool, location, variant)}
        className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        {t.cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
