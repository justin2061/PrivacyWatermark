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

// InlineCTA 出現的位置：文章中段 / 文章結尾 / 工具完成後
export type InlineCtaPosition = "mid_article" | "end_article" | "tool_complete";

/**
 * 追蹤文章／工具內 InlineCTA 的點擊（GA4）。
 * position 用來分辨是文章中段、結尾，或工具完成後的推薦。
 */
export function trackInlineCta(
  toTool: string,
  position: InlineCtaPosition,
  location?: string,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "inline_cta_click", {
      to_tool: toTool,
      position,
      location,
    });
  }
}

/**
 * 追蹤「你可能也需要」工具推薦的點擊（GA4）。
 * from_tool：目前所在工具；to_tool：被推薦點擊的工具。
 */
export function trackToolRecommendation(
  fromTool: string,
  toTool: string,
): void {
  if (typeof gtag !== "undefined") {
    gtag("event", "tool_recommendation_click", {
      from_tool: fromTool,
      to_tool: toTool,
    });
  }
}
