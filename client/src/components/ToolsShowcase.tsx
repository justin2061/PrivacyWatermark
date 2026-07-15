import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, type LucideIcon } from "lucide-react";
import {
  CATEGORIES,
  TOOLS,
  toolHref,
  type CategoryId,
  type Lang,
  type NavKey,
} from "@/lib/tools";
import { trackToolNav } from "@/lib/analytics";

type Tab = "all" | CategoryId;

interface ToolsShowcaseProps {
  lang?: Lang;
  /** 目前頁面的工具（會加上「目前使用中」標記） */
  current?: NavKey;
  className?: string;
}

export function ToolsShowcase({ lang = "zh", current, className = "" }: ToolsShowcaseProps) {
  const [tab, setTab] = useState<Tab>("all");

  const t = {
    zh: { heading: "所有工具", subtitle: "10+ 款隱私優先的圖片工具，全部 100% 在你的瀏覽器執行", all: "全部", current: "使用中" },
    en: { heading: "All Tools", subtitle: "10+ privacy-first image tools — all run 100% in your browser", all: "All", current: "In use" },
    ja: { heading: "すべてのツール", subtitle: "プライバシー重視の画像ツール 10 種類以上。すべてブラウザ内で動作します", all: "すべて", current: "使用中" },
  }[lang];

  const tabs: { id: Tab; label: string; icon?: LucideIcon }[] = [
    { id: "all", label: t.all },
    ...CATEGORIES.map((cat) => ({ id: cat.id as Tab, label: cat.label[lang], icon: cat.icon })),
  ];

  const visible = tab === "all" ? TOOLS : TOOLS.filter((tool) => tool.category === tab);

  return (
    <section className={`mt-12 ${className}`} aria-labelledby="tools-showcase-heading">
      <div className="mb-5">
        <h2 id="tools-showcase-heading" className="text-xl font-semibold text-gray-900">
          {t.heading}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
      </div>

      {/* 分類 tab（可橫向滑動） */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-5" role="tablist" aria-label={t.heading}>
        {tabs.map((tabItem) => {
          const active = tab === tabItem.id;
          return (
            <button
              key={tabItem.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(tabItem.id)}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {tabItem.icon && <tabItem.icon className="w-4 h-4" aria-hidden="true" />}
              <span>{tabItem.label}</span>
            </button>
          );
        })}
      </div>

      {/* 卡片網格：手機 1 列、平板 2 列、桌面 3 列 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((tool) => {
          const Icon = tool.icon;
          const isCurrent = tool.key === current;
          return (
            <Link
              key={tool.key}
              href={toolHref(tool, lang)}
              onClick={() => trackToolNav(tool.key, "homepage_grid", tool.category)}
              className="group relative flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {tool.label[lang]}
                  </h3>
                  {isCurrent && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                      {t.current}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-600 leading-snug">{tool.desc[lang]}</p>
              </div>
              <ArrowRight
                className="h-4 w-4 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
