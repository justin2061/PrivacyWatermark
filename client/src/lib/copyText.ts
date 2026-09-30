/**
 * 一鍵複製。navigator.clipboard 在非安全來源與部分舊版 Safari 不存在，
 * 所以保留 textarea + execCommand 的退路——複製失敗等於範本頁沒有用。
 */
export async function copyText(text: string): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    // 掉到下面的 fallback
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    // 兩條路都失敗就讓使用者自己選取，文字本來就顯示在畫面上
  }
  ta.remove();
}
