import type { CategoryId } from "@/lib/tools";

// 新導航（Mega Menu / 手機選單 / 首頁工具中心）點擊工具的來源
export type NavSource = "mega_menu" | "mobile_menu" | "homepage_grid";

/**
 * 追蹤導航點擊事件（GA4）。沿用站上既有的 gtag 全域函式，
 * gtag 未載入時（例如未同意追蹤）安靜略過。
 */
export function trackToolNav(
  toolName: string,
  source: NavSource,
  category: CategoryId,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "tool_navigation_click", {
      tool_name: toolName,
      source,
      category,
    });
  }
}
