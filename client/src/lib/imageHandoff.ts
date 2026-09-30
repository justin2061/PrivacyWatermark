/**
 * 工具之間「帶著圖片跳頁」的交接區（例：浮水印頁 → 馬賽克頁）。
 *
 * 刻意只存在模組記憶體，不用 sessionStorage：手機照片轉 base64 動輒 4MB 以上，
 * 很容易撞到 storage 上限；而站內跳頁走 wouter 的 client-side navigation，
 * JS 記憶體會保留，檔案原封不動傳過去，也不會在瀏覽器留下任何痕跡（本站主打圖片不落地）。
 * 使用者若在目標頁重整，交接自然消失，退回一般上傳流程即可。
 */

export interface ImageHandoff {
  file: File;
  /** 來源工具，用於 GA 歸因（tool_handoff_complete 的 from_tool） */
  from: string;
  createdAt: number;
}

// 超過這個時間還沒被取走，就當作使用者已經走別的路了，不要突然塞一張舊圖給他
const MAX_AGE_MS = 5 * 60 * 1000;

let pending: ImageHandoff | null = null;

export function stashHandoffImage(file: File, from: string): void {
  pending = { file, from, createdAt: Date.now() };
}

/** 取出並清空（只能取一次，避免之後再進同一頁又被帶入舊圖）。 */
export function takeHandoffImage(): ImageHandoff | null {
  const h = pending;
  pending = null;
  if (!h || Date.now() - h.createdAt > MAX_AGE_MS) return null;
  return h;
}
