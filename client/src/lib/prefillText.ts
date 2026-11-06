/** 網址帶入浮水印文字的上限，比最長的簽註範本長一截，避免有人塞超長字串進畫布。 */
const MAX_PREFILL_LENGTH = 80;

/** 產生帶入浮水印文字的網址，例如簽註範本文章的「用這句加浮水印」。 */
export function prefillTextHref(path: string, text: string): string {
  return `${path}?text=${encodeURIComponent(text)}`;
}

/** 從 location.search 讀出要帶入的浮水印文字；沒有、空白或過長時回 null。 */
export function readPrefillText(search: string): string | null {
  const raw = new URLSearchParams(search).get("text");
  if (!raw) return null;
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text || text.length > MAX_PREFILL_LENGTH) return null;
  return text;
}
