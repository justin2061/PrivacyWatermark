import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, ChevronDown, Menu, X } from "lucide-react";
import {
  CATEGORIES,
  toolsByCategory,
  toolHref,
  type Lang,
  type NavKey,
} from "@/lib/tools";
import { trackToolNav } from "@/lib/analytics";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// 對外沿用 NavKey（頁面以 current={...} 高亮目前工具）
export type { NavKey } from "@/lib/tools";

interface SiteHeaderProps {
  lang?: Lang;
  current?: NavKey;
}

export function SiteHeader({ lang = "zh", current }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const base = lang === "zh" ? "" : `/${lang}`;
  const home = lang === "zh" ? "/" : `/${lang}/`;

  const t = {
    zh: {
      brand: "證件浮水印工具",
      tagline: "安全的本地端圖片處理",
      tools: "工具",
      blog: "Blog",
      openMenu: "開啟選單",
      closeMenu: "關閉選單",
      cameraAlt: "相機圖示",
    },
    en: {
      brand: "Image Watermark Tool",
      tagline: "Secure local image processing",
      tools: "Tools",
      blog: "Blog",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      cameraAlt: "Camera icon",
    },
    ja: {
      brand: "画像透かしツール",
      tagline: "端末内で完結する安全な画像処理",
      tools: "ツール",
      blog: "ブログ",
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる",
      cameraAlt: "カメラのアイコン",
    },
  }[lang];

  // 目前頁面是否屬於某個工具（用來高亮桌面版「工具」入口）
  const toolsActive = CATEGORIES.some((cat) =>
    toolsByCategory(cat.id).some((tool) => tool.key === current),
  );

  const linkClass = (active: boolean) =>
    `flex items-center space-x-1.5 text-sm transition-colors ${
      active ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
    }`;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={home}
            className="flex items-center space-x-3 rounded-lg px-2 py-1 -ml-2 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span
                className="text-white text-lg"
                role="img"
                aria-label={t.cameraAlt}
              >
                📷
              </span>
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-semibold text-gray-900">
                {t.brand}
              </span>
              <span className="hidden sm:block text-xs text-gray-500">
                {t.tagline}
              </span>
            </div>
          </Link>

          {/* 桌面版導航 */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* 工具 Mega Menu（hover 展開，fade in/out） */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center space-x-1 text-sm transition-colors outline-none ${
                  toolsActive || megaOpen
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-primary"
                }`}
                aria-haspopup="true"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen((v) => !v)}
              >
                <span>{t.tools}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    megaOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Mega 面板：右對齊避免超出視窗，pt-3 當作與觸發鈕之間的懸停橋接 */}
              <div
                className={`absolute right-0 top-full pt-3 w-[600px] max-w-[calc(100vw-2rem)] transition-all duration-200 ${
                  megaOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="rounded-xl border border-gray-200 bg-white shadow-lg p-5 grid grid-cols-3 gap-5">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id}>
                      <div className="flex items-center gap-1.5 mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        <cat.icon className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{cat.label[lang]}</span>
                      </div>
                      <ul className="space-y-0.5">
                        {toolsByCategory(cat.id).map((tool) => {
                          const Icon = tool.icon;
                          const active = tool.key === current;
                          return (
                            <li key={tool.key}>
                              <Link
                                href={toolHref(tool, lang)}
                                onClick={() => {
                                  trackToolNav(tool.key, "mega_menu", cat.id);
                                  setMegaOpen(false);
                                }}
                                className={`group flex items-start gap-2.5 rounded-lg px-2 py-2 transition-colors ${
                                  active
                                    ? "bg-blue-50"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <Icon
                                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                    active
                                      ? "text-primary"
                                      : "text-gray-400 group-hover:text-primary"
                                  }`}
                                  aria-hidden="true"
                                />
                                <span className="min-w-0">
                                  <span
                                    className={`block text-sm leading-tight ${
                                      active
                                        ? "text-primary font-medium"
                                        : "text-gray-800 font-medium"
                                    }`}
                                  >
                                    {tool.label[lang]}
                                  </span>
                                  <span className="block text-xs text-gray-500 leading-snug mt-0.5">
                                    {tool.desc[lang]}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={`${base}/blog`}
              className={linkClass(current === "blog")}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{t.blog}</span>
            </Link>

            <LanguageSwitcher lang={lang} />
          </nav>

          {/* 手機版漢堡按鈕 */}
          <button
            type="button"
            className="md:hidden p-2 leading-none text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* 手機版展開選單：依分類顯示 */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-200 py-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="pb-1">
                <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  <cat.icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{cat.label[lang]}</span>
                </div>
                {toolsByCategory(cat.id).map((tool) => {
                  const Icon = tool.icon;
                  const active = tool.key === current;
                  return (
                    <Link
                      key={tool.key}
                      href={toolHref(tool, lang)}
                      onClick={() => {
                        trackToolNav(tool.key, "mobile_menu", cat.id);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-50 ${
                        active ? "text-primary font-medium bg-blue-50" : "text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{tool.label[lang]}</span>
                    </Link>
                  );
                })}
              </div>
            ))}

            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link
                href={`${base}/blog`}
                className={`flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-50 ${
                  current === "blog" ? "text-primary font-medium" : "text-gray-700"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{t.blog}</span>
              </Link>
              <LanguageSwitcher
                lang={lang}
                variant="list"
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
