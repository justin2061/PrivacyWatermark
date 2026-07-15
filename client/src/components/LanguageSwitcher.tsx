import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LOCALES, switchLocalePath, type Lang } from "@/lib/tools";

interface LanguageSwitcherProps {
  lang: Lang;
  /** mobile 版在漢堡選單裡直接攤平成清單，不用彈出面板。 */
  variant?: "dropdown" | "list";
  onNavigate?: () => void;
}

/**
 * 🌐 語言切換。取代原本只能在中／英之間對切的單一按鈕，改成可擴充的選單——
 * 之後加語系只要往 LOCALES 補一筆即可。
 *
 * 用 <a> 而非 wouter 的 <Link>：換語系等於換整份 SEO（title/canonical/hreflang
 * 與 <html lang>），整頁重新載入最單純可靠，也讓爬蟲看到的就是使用者看到的。
 */
export function LanguageSwitcher({
  lang,
  variant = "dropdown",
  onNavigate,
}: LanguageSwitcherProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 點擊面板外或按 Esc 就收合
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = LOCALES.find((l) => l.lang === lang) ?? LOCALES[0];

  if (variant === "list") {
    return (
      <div className="py-1">
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Language</span>
        </div>
        {LOCALES.map((locale) => {
          const active = locale.lang === lang;
          return (
            <a
              key={locale.lang}
              href={switchLocalePath(location, locale.lang)}
              hrefLang={locale.lang}
              aria-label={locale.ariaLabel}
              aria-current={active ? "true" : undefined}
              onClick={onNavigate}
              className={`flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 ${
                active ? "text-primary font-medium bg-blue-50" : "text-gray-700"
              }`}
            >
              <span>{locale.label}</span>
              {active && <Check className="w-4 h-4" aria-hidden="true" />}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={current.ariaLabel}
        className={`flex items-center space-x-1 text-sm transition-colors outline-none ${
          open ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
        }`}
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span>{current.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full pt-3 w-44 z-50">
          <ul className="rounded-xl border border-gray-200 bg-white shadow-lg py-1.5">
            {LOCALES.map((locale) => {
              const active = locale.lang === lang;
              return (
                <li key={locale.lang}>
                  <a
                    href={switchLocalePath(location, locale.lang)}
                    hrefLang={locale.lang}
                    aria-label={locale.ariaLabel}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                      active
                        ? "text-primary font-medium bg-blue-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{locale.label}</span>
                    {active && <Check className="w-4 h-4" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
