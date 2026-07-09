import { useState } from "react";
import { Link } from "wouter";
import {
  Stamp,
  Layers,
  FileText,
  Eraser,
  Scissors,
  Minimize2,
  Repeat,
  Scaling,
  BookOpen,
  Languages,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Lang = "zh" | "en";

// 目前所在頁面的識別鍵，用來高亮對應的導航項目
export type NavKey =
  | "watermark"
  | "batch"
  | "pdf-watermark"
  | "exif-clean"
  | "remove-bg"
  | "compress"
  | "convert"
  | "resize"
  | "blog";

interface NavItem {
  key: NavKey;
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SiteHeaderProps {
  lang?: Lang;
  current?: NavKey;
}

export function SiteHeader({ lang = "zh", current }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isEn = lang === "en";
  const base = isEn ? "/en" : "";
  const home = isEn ? "/en/" : "/";

  const t = isEn
    ? {
        brand: "Image Watermark Tool",
        tagline: "Secure local image processing",
        more: "More Tools",
        blog: "Blog",
        langLabel: "中文",
        langHref: "/",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        moreSection: "More Tools",
      }
    : {
        brand: "證件浮水印工具",
        tagline: "安全的本地端圖片處理",
        more: "更多工具",
        blog: "Blog",
        langLabel: "EN",
        langHref: "/en/",
        openMenu: "開啟選單",
        closeMenu: "關閉選單",
        moreSection: "更多工具",
      };

  // 主導航：核心功能
  const primary: NavItem[] = [
    {
      key: "watermark",
      href: home,
      label: isEn ? "Watermark" : "浮水印",
      icon: Stamp,
    },
    {
      key: "batch",
      href: `${base}/batch`,
      label: isEn ? "Batch" : "批次處理",
      icon: Layers,
    },
    {
      key: "pdf-watermark",
      href: `${base}/pdf-watermark`,
      label: isEn ? "PDF Watermark" : "PDF 浮水印",
      icon: FileText,
    },
  ];

  // 「更多工具」下拉選單：次要功能
  const more: NavItem[] = [
    {
      key: "exif-clean",
      href: `${base}/exif-clean`,
      label: isEn ? "EXIF Cleaner" : "EXIF 清除器",
      icon: Eraser,
    },
    {
      key: "remove-bg",
      href: `${base}/remove-bg`,
      label: isEn ? "AI Remove BG" : "AI 去背",
      icon: Scissors,
    },
    {
      key: "compress",
      href: `${base}/compress`,
      label: isEn ? "Compress" : "圖片壓縮",
      icon: Minimize2,
    },
    {
      key: "convert",
      href: `${base}/convert`,
      label: isEn ? "Convert" : "格式轉換",
      icon: Repeat,
    },
    {
      key: "resize",
      href: `${base}/resize`,
      label: isEn ? "Resize" : "圖片縮放",
      icon: Scaling,
    },
  ];

  const moreActive = more.some((item) => item.key === current);

  const linkClass = (active: boolean) =>
    `flex items-center space-x-1.5 text-sm transition-colors ${
      active
        ? "text-primary font-medium"
        : "text-gray-600 hover:text-primary"
    }`;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={home}
            className="flex items-center space-x-3 rounded-lg px-2 py-1 -ml-2 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg" role="img" aria-label={isEn ? "Camera icon" : "相機圖示"}>
                📷
              </span>
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-semibold text-gray-900">{t.brand}</span>
              <span className="hidden sm:block text-xs text-gray-500">{t.tagline}</span>
            </div>
          </Link>

          {/* 桌面版導航 */}
          <nav className="hidden md:flex items-center space-x-5">
            {primary.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.key} href={item.href} className={linkClass(item.key === current)}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* 更多工具下拉 */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center space-x-1 text-sm transition-colors outline-none ${
                  moreActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                }`}
              >
                <span>{t.more}</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {more.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.key} asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 cursor-pointer ${
                          item.key === current ? "text-primary font-medium" : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`${base}/blog`} className={linkClass(current === "blog")}>
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{t.blog}</span>
            </Link>

            <a
              href={t.langHref}
              className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              aria-label={isEn ? "Switch to Chinese" : "Switch to English"}
            >
              <Languages className="w-4 h-4" aria-hidden="true" />
              <span>{t.langLabel}</span>
            </a>
          </nav>

          {/* 手機版漢堡按鈕 */}
          <button
            type="button"
            className="md:hidden p-2 text-2xl leading-none text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* 手機版展開選單 */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-200 py-2">
            {primary.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-50 ${
                    item.key === current ? "text-primary font-medium" : "text-gray-700"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="px-4 pt-3 pb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
              {t.moreSection}
            </div>
            {more.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-gray-50 ${
                    item.key === current ? "text-primary font-medium" : "text-gray-700"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

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
              <a
                href={t.langHref}
                className="flex items-center space-x-2 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                aria-label={isEn ? "Switch to Chinese" : "Switch to English"}
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span>{t.langLabel}</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
