import { useEffect, useState } from "react";
import { IdCard, BookUser, X } from "lucide-react";

/**
 * 證件類型自動識別（身分證 vs 護照）
 *
 * 不使用 AI，純靠圖片長寬比例判斷，再由使用者確認：
 *   - 台灣身分證 85.5×54mm → 長短邊比約 1.58
 *   - 護照資料頁攤開／橫掃描通常更寬（≥ 1.9），符合「護照比身分證寬」的直覺
 *   - 落在兩者之間或無法判斷 → 顯示手動選擇
 *
 * 判斷結果只是「建議」，一律等使用者按下按鈕才套用對應浮水印範本，
 * 避免自動覆蓋使用者已經輸入的文字。範本內容：
 *   - 身分證：「僅供 OO 使用 <日期>」
 *   - 護照：  「僅供 OO 使用 護照影本 <日期>」
 */

type DocType = "id" | "passport" | "unknown";

interface DocTypeSuggestionProps {
  file: File | null;
  /** 套用範本文字（會一併啟用文字浮水印） */
  onApplyTemplate: (text: string) => void;
}

function classifyByRatio(longSide: number, shortSide: number): DocType {
  if (shortSide <= 0) return "unknown";
  const ratio = longSide / shortSide;
  // 身分證比例集中在 1.58 附近，給一個寬鬆區間
  if (ratio >= 1.45 && ratio <= 1.72) return "id";
  // 護照（攤開／橫掃描）明顯更寬
  if (ratio >= 1.9) return "passport";
  return "unknown";
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "/");
}

function templateFor(type: "id" | "passport"): string {
  const date = todayStr();
  return type === "passport"
    ? `僅供 OO 使用 護照影本 ${date}`
    : `僅供 OO 使用 ${date}`;
}

export function DocTypeSuggestion({ file, onApplyTemplate }: DocTypeSuggestionProps) {
  const [detected, setDetected] = useState<DocType | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [applied, setApplied] = useState<"id" | "passport" | null>(null);

  // 換檔就重新偵測比例
  useEffect(() => {
    setDetected(null);
    setDismissed(false);
    setApplied(null);
    if (!file) return;

    let cancelled = false;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (!cancelled) {
        const longSide = Math.max(img.naturalWidth, img.naturalHeight);
        const shortSide = Math.min(img.naturalWidth, img.naturalHeight);
        setDetected(classifyByRatio(longSide, shortSide));
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      if (!cancelled) setDetected("unknown");
      URL.revokeObjectURL(url);
    };
    img.src = url;

    return () => {
      cancelled = true;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const apply = (type: "id" | "passport") => {
    if (typeof gtag !== "undefined") gtag("event", "apply_doc_template", { doc_type: type });
    onApplyTemplate(templateFor(type));
    setApplied(type);
  };

  if (!file || detected === null || dismissed) return null;

  // 已套用 → 顯示確認訊息（可再切換另一種）
  if (applied) {
    const other = applied === "id" ? "passport" : "id";
    const otherLabel = other === "id" ? "身分證" : "護照";
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3 flex items-center justify-between gap-3">
        <p className="text-sm text-green-800">
          ✓ 已套用{applied === "id" ? "身分證" : "護照"}浮水印範本，記得把「OO」改成實際對象。
        </p>
        <button
          type="button"
          onClick={() => apply(other)}
          className="text-xs text-green-700 underline whitespace-nowrap hover:text-green-900"
        >
          改用{otherLabel}範本
        </button>
      </div>
    );
  }

  const dismissBtn = (
    <button
      type="button"
      onClick={() => setDismissed(true)}
      aria-label="關閉證件類型建議"
      className="text-blue-400 hover:text-blue-600 flex-shrink-0"
    >
      <X className="w-4 h-4" aria-hidden="true" />
    </button>
  );

  // 有把握 → 建議並提供「其實是另一種」的切換
  if (detected === "id" || detected === "passport") {
    const label = detected === "id" ? "身分證" : "護照";
    const other = detected === "id" ? "passport" : "id";
    const otherLabel = detected === "id" ? "護照" : "身分證";
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            {detected === "id" ? (
              <IdCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <BookUser className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <p className="text-sm text-blue-900">
              看起來像<strong>{label}影本</strong>，要套用對應的浮水印範本嗎？
            </p>
          </div>
          {dismissBtn}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={() => apply(detected)}
            className="px-3 py-1.5 text-sm rounded-md bg-primary text-white hover:bg-blue-700 transition-colors"
          >
            套用{label}範本
          </button>
          <button
            type="button"
            onClick={() => apply(other)}
            className="px-3 py-1.5 text-sm rounded-md border border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            其實是{otherLabel}
          </button>
        </div>
      </div>
    );
  }

  // 無法判斷 → 手動選擇
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-blue-900">
          無法自動判斷證件類型，請選擇要套用哪種浮水印範本：
        </p>
        {dismissBtn}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <button
          type="button"
          onClick={() => apply("id")}
          className="px-3 py-1.5 text-sm rounded-md border border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
        >
          <IdCard className="w-4 h-4" aria-hidden="true" />
          身分證
        </button>
        <button
          type="button"
          onClick={() => apply("passport")}
          className="px-3 py-1.5 text-sm rounded-md border border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
        >
          <BookUser className="w-4 h-4" aria-hidden="true" />
          護照
        </button>
      </div>
    </div>
  );
}
