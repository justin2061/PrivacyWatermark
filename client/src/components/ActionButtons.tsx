import type { ReactNode } from "react";

export type ActionVariant = "primary" | "success" | "neutral";

const VARIANT_CLASS: Record<ActionVariant, string> = {
  // 主要動作（套用 / 處理）：藍底
  primary:
    "w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center",
  // 下載：綠底
  success:
    "w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center",
  // 重置：灰底（含 min-h-[44px] 觸控目標）
  neutral:
    "w-full bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]",
};

interface ActionButtonProps {
  variant: ActionVariant;
  onClick: () => void;
  disabled?: boolean;
  /** 圖示節點，含自身 margin（例如 <Download className="w-4 h-4 mr-2" />）。 */
  icon?: ReactNode;
  /** 按鈕文字，支援動態載入文字（例如 isX ? "處理中…" : "套用"）。 */
  children: ReactNode;
  ariaLabel?: string;
  /** 追加的 className（例如 remove-bg 的套用鈕需要 mt-4）。 */
  className?: string;
}

/**
 * 單顆動作按鈕，統一三種樣式（primary / success / neutral）。
 * 圖示與文字仍由呼叫端傳入，因此各工具的圖示、載入文字、disabled 條件完全保留。
 */
export function ActionButton({
  variant,
  onClick,
  disabled,
  icon,
  children,
  ariaLabel,
  className,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={
        className
          ? `${VARIANT_CLASS[variant]} ${className}`
          : VARIANT_CLASS[variant]
      }
    >
      {icon}
      {children}
    </button>
  );
}

interface ActionConfig {
  onClick: () => void;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

interface ActionButtonsProps {
  /** 套用 / 處理（藍）。工具沒有明確套用步驟時可省略。 */
  apply?: ActionConfig;
  /** 下載（綠）。 */
  download?: ActionConfig;
  /** 重置（灰）。 */
  reset?: ActionConfig;
  /** 外層容器 className，預設 space-y-3。 */
  className?: string;
}

/**
 * 套用 / 下載 / 重置 三顆按鈕的統一組合，只渲染有傳入的那幾顆（許多工具沒有套用鈕）。
 * 樣式與排列統一，行為（onClick、disabled、圖示、載入文字）由呼叫端決定，功能不變。
 */
export function ActionButtons({
  apply,
  download,
  reset,
  className = "space-y-3",
}: ActionButtonsProps) {
  return (
    <div className={className}>
      {apply && (
        <ActionButton
          variant="primary"
          onClick={apply.onClick}
          disabled={apply.disabled}
          icon={apply.icon}
          ariaLabel={apply.ariaLabel}
        >
          {apply.label}
        </ActionButton>
      )}
      {download && (
        <ActionButton
          variant="success"
          onClick={download.onClick}
          disabled={download.disabled}
          icon={download.icon}
          ariaLabel={download.ariaLabel}
        >
          {download.label}
        </ActionButton>
      )}
      {reset && (
        <ActionButton
          variant="neutral"
          onClick={reset.onClick}
          disabled={reset.disabled}
          icon={reset.icon}
          ariaLabel={reset.ariaLabel}
        >
          {reset.label}
        </ActionButton>
      )}
    </div>
  );
}
