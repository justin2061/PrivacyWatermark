// 格式對（programmatic SEO）設定：每個 pair 對應 /convert/<slug> 與 /en/convert/<slug>
// 內容須中英一致的事實正確性：透明度、失真/無損、相容性等描述都針對該格式對撰寫。

export type PairMime = "image/jpeg" | "image/png" | "image/webp";
// 來源格式可包含瀏覽器原生可解碼的 BMP／GIF／SVG，以及 HEIC
//（瀏覽器無法原生解碼，需先以 heic2any 於本機解碼再進 Canvas）。
// 輸出格式仍限 Canvas toBlob 支援的 JPG／PNG／WebP——
// GIF／BMP／TIFF 無法由 Canvas 編碼（toBlob 會靜默退回 PNG），故不做 *-to-gif 等頁面。
export type PairSourceMime =
  | PairMime
  | "image/heic"
  | "image/bmp"
  | "image/gif"
  | "image/svg+xml";

export interface PairFaq {
  q: string;
  a: string;
}

export interface PairLocaleContent {
  /** <title> */
  title: string;
  /** meta description */
  description: string;
  /** 頁面 h1 */
  h1: string;
  /** 1-2 段前言（純文字段落） */
  intro: string[];
  /** 3-4 組 FAQ，同時用於頁面可見區塊與 faqSchema */
  faq: PairFaq[];
}

export interface ConvertPair {
  slug: string;
  from: PairSourceMime;
  to: PairMime;
  fromLabel: string;
  toLabel: string;
  zh: PairLocaleContent;
  en: PairLocaleContent;
}

export const PAIRS: ConvertPair[] = [
  {
    slug: "png-to-jpg",
    from: "image/png",
    to: "image/jpeg",
    fromLabel: "PNG",
    toLabel: "JPG",
    zh: {
      title: "PNG 轉 JPG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 PNG 轉 JPG 工具。在瀏覽器中即時把 PNG 轉成 JPG，大幅縮小檔案，透明區域自動填白底。100% 本機處理，圖片不會上傳到任何伺服器。",
      h1: "PNG 轉 JPG — 免費線上轉檔，100% 本機處理",
      intro: [
        "PNG 是無損格式，畫質好但檔案通常很大；JPG 使用失真壓縮，同一張圖轉成 JPG 後檔案可以小很多，適合上傳表單、寄信附件或分享到社群平台。當平台限制檔案大小或只接受 JPG 時，PNG 轉 JPG 是最常見的解法。",
        "要注意的是 JPG 不支援透明背景：轉換時本工具會自動把 PNG 的透明區域填上白色底色，避免透明處變成黑色。轉出的 JPG 以 92% 品質編碼，一般照片與截圖肉眼幾乎看不出差異。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器，也不會留下副本。",
        },
        {
          q: "PNG 的透明背景轉成 JPG 後會怎樣？",
          a: "JPG 不支援透明度，本工具會自動把透明區域填上白色背景，避免透明處變成黑色。若需要保留透明背景，請改用 PNG 轉 WebP。",
        },
        {
          q: "PNG 轉 JPG 後檔案會小多少？",
          a: "視圖片內容而定，照片類圖片通常可縮小 50% 到 90%。本工具會即時顯示轉換前後的檔案大小比較，轉完馬上看得到。",
        },
        {
          q: "轉成 JPG 會損失畫質嗎？",
          a: "JPG 是失真格式，本工具以 92% 品質輸出，一般照片幾乎看不出差異；但含細小文字或銳利線條的圖可能出現輕微壓縮痕跡。",
        },
      ],
    },
    en: {
      title: "Convert PNG to JPG — Free Online Converter, 100% Local",
      description:
        "Free online PNG to JPG converter. Convert PNG to JPG right in your browser, shrink file size dramatically, transparency filled with white. 100% local — no uploads.",
      h1: "Convert PNG to JPG — Free, 100% Local",
      intro: [
        "PNG is a lossless format with great quality but often large files; JPG uses lossy compression, so the same image usually gets much smaller after converting — ideal for upload forms, email attachments and social platforms. When a site enforces size limits or only accepts JPG, converting PNG to JPG is the go-to fix.",
        "Note that JPG does not support transparency: this tool automatically fills transparent PNG areas with a white background so they don't turn black. The output JPG is encoded at 92% quality — visually indistinguishable for most photos and screenshots.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images are never uploaded to any server and no copies are kept.",
        },
        {
          q: "What happens to PNG transparency when converting to JPG?",
          a: "JPG does not support transparency. This tool automatically fills transparent areas with a white background so they don't turn black. If you need to keep transparency, use PNG to WebP instead.",
        },
        {
          q: "How much smaller will the JPG be?",
          a: "It depends on the image, but photos typically shrink by 50% to 90%. The tool shows a before/after size comparison instantly after conversion.",
        },
        {
          q: "Does converting to JPG lose quality?",
          a: "JPG is a lossy format. This tool exports at 92% quality, which is nearly indistinguishable for typical photos, though images with fine text or sharp lines may show slight compression artifacts.",
        },
      ],
    },
  },
  {
    slug: "jpg-to-png",
    from: "image/jpeg",
    to: "image/png",
    fromLabel: "JPG",
    toLabel: "PNG",
    zh: {
      title: "JPG 轉 PNG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 JPG 轉 PNG 工具。在瀏覽器中把 JPG 轉成無損 PNG 格式，適合後續編輯或平台要求 PNG 的場合。100% 本機處理，圖片不會上傳。",
      h1: "JPG 轉 PNG — 免費線上轉檔，100% 本機處理",
      intro: [
        "有些平台、表單或設計軟體只接受 PNG 檔，或你想把圖片存成無損格式再進行後續編輯，這時就需要 JPG 轉 PNG。PNG 使用無損壓縮，之後不管重新儲存幾次都不會再累積壓縮失真。",
        "要有正確期待：JPG 在拍攝或儲存時已經丟失的細節不會因為轉成 PNG 而恢復，畫質不會變好，只是「從此以後不再變差」。而且 PNG 檔案通常比原本的 JPG 大上數倍，若目標是縮小檔案，請改用 JPG 轉 WebP。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "JPG 轉 PNG 後畫質會變好嗎？",
          a: "不會。JPG 壓縮時已丟失的細節無法透過轉檔恢復；轉成 PNG 的好處是之後再編輯、再儲存都不會繼續失真。",
        },
        {
          q: "為什麼轉出來的 PNG 檔案比 JPG 大很多？",
          a: "PNG 是無損格式，會完整保存每個像素，照片類圖片的 PNG 通常比 JPG 大 3 到 10 倍，這是正常現象。",
        },
        {
          q: "JPG 轉 PNG 會自動變成透明背景嗎？",
          a: "不會。JPG 本身沒有透明資訊，轉成 PNG 後背景維持原樣。若要去除背景，請使用本站的圖片去背工具。",
        },
      ],
    },
    en: {
      title: "Convert JPG to PNG — Free Online Converter, 100% Local",
      description:
        "Free online JPG to PNG converter. Turn JPG into lossless PNG in your browser — ideal for further editing or platforms that require PNG. 100% local, no uploads.",
      h1: "Convert JPG to PNG — Free, 100% Local",
      intro: [
        "Some platforms, forms and design tools only accept PNG files, or you may want a lossless copy before further editing — that's when JPG to PNG conversion helps. PNG uses lossless compression, so no matter how many times you re-save it afterwards, no additional quality is lost.",
        "Set the right expectation: detail already lost in JPG compression cannot be recovered by converting to PNG — quality won't improve, it just stops degrading from here on. Also, PNG files are usually several times larger than the original JPG; if your goal is a smaller file, use JPG to WebP instead.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images never leave your device.",
        },
        {
          q: "Does converting JPG to PNG improve quality?",
          a: "No. Detail already lost to JPG compression cannot be recovered. The benefit of PNG is that future edits and re-saves won't cause any further quality loss.",
        },
        {
          q: "Why is the PNG so much larger than my JPG?",
          a: "PNG is a lossless format that stores every pixel exactly, so photo-type images typically become 3 to 10 times larger than the JPG. That's expected.",
        },
        {
          q: "Will the background become transparent after converting to PNG?",
          a: "No. A JPG carries no transparency information, so the background stays as-is. To remove a background, use our background remover tool.",
        },
      ],
    },
  },
  {
    slug: "webp-to-jpg",
    from: "image/webp",
    to: "image/jpeg",
    fromLabel: "WebP",
    toLabel: "JPG",
    zh: {
      title: "WebP 轉 JPG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 WebP 轉 JPG 工具。把網頁下載的 WebP 圖片轉成相容性最高的 JPG，解決舊軟體、平台打不開 WebP 的問題。100% 本機處理，不上傳。",
      h1: "WebP 轉 JPG — 免費線上轉檔，100% 本機處理",
      intro: [
        "從網頁另存的圖片常常是 WebP 格式，雖然檔案小，但部分舊版看圖軟體、修圖工具、辦公文件或上傳表單仍然不支援 WebP。把 WebP 轉成 JPG 之後，幾乎任何裝置與軟體都能開啟，是解決相容性問題最快的方法。",
        "WebP 支援透明背景而 JPG 不支援，轉換時本工具會自動把透明區域填上白色底色。若原圖含透明且你想保留，請改用 WebP 轉 PNG。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "為什麼要把 WebP 轉成 JPG？",
          a: "部分舊版軟體、看圖工具與上傳表單不支援 WebP。轉成 JPG 後相容性最高，幾乎所有裝置、軟體與平台都能開啟。",
        },
        {
          q: "WebP 的透明背景轉 JPG 後會怎樣？",
          a: "JPG 不支援透明度，透明區域會自動填上白色背景。若需要保留透明背景，請改用 WebP 轉 PNG。",
        },
        {
          q: "動態（動畫）WebP 可以轉嗎？",
          a: "可以上傳，但轉出的 JPG 是靜態圖片，只會保留動畫的第一個影格，動態效果不會保留。",
        },
      ],
    },
    en: {
      title: "Convert WebP to JPG — Free Online Converter, 100% Local",
      description:
        "Free online WebP to JPG converter. Turn WebP images saved from the web into universally compatible JPG files. 100% local in-browser processing, no uploads.",
      h1: "Convert WebP to JPG — Free, 100% Local",
      intro: [
        "Images saved from websites are often WebP. The files are small, but some older image viewers, photo editors, office documents and upload forms still don't accept WebP. Converting WebP to JPG makes the image openable on virtually every device and app — the fastest fix for compatibility issues.",
        "WebP supports transparency while JPG does not, so this tool automatically fills transparent areas with a white background during conversion. If your image has transparency you want to keep, use WebP to PNG instead.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images are never sent to any server.",
        },
        {
          q: "Why convert WebP to JPG?",
          a: "Some older software, image viewers and upload forms don't support WebP. JPG has the broadest compatibility — virtually every device, app and platform can open it.",
        },
        {
          q: "What happens to WebP transparency in JPG?",
          a: "JPG does not support transparency, so transparent areas are automatically filled with a white background. To keep transparency, convert WebP to PNG instead.",
        },
        {
          q: "Can I convert animated WebP?",
          a: "You can upload one, but the resulting JPG is a still image containing only the first frame — the animation is not preserved.",
        },
      ],
    },
  },
  {
    slug: "jpg-to-webp",
    from: "image/jpeg",
    to: "image/webp",
    fromLabel: "JPG",
    toLabel: "WebP",
    zh: {
      title: "JPG 轉 WebP — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 JPG 轉 WebP 工具。在瀏覽器中把 JPG 轉成更省空間的 WebP，加快網頁載入速度。100% 本機處理，圖片不會上傳到任何伺服器。",
      h1: "JPG 轉 WebP — 免費線上轉檔，100% 本機處理",
      intro: [
        "WebP 是 Google 推出的現代圖片格式，在相近畫質下通常比 JPG 小 20% 到 35%。如果你在經營網站或部落格，把 JPG 轉成 WebP 能明顯減少流量、加快頁面載入，對 SEO 與使用者體驗都有幫助。",
        "相容性方面，目前所有主流瀏覽器（Chrome、Edge、Firefox、Safari 14+）都支援 WebP，但一些較舊的看圖軟體或系統內建工具可能無法開啟。本工具以 92% 品質輸出 WebP，並即時顯示轉換前後的檔案大小。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "JPG 轉 WebP 能小多少？",
          a: "在相近畫質下，WebP 通常比 JPG 小 20% 到 35%，實際幅度依圖片內容而定。轉換後會立即顯示前後大小比較。",
        },
        {
          q: "WebP 的相容性如何？哪些地方打不開？",
          a: "所有主流瀏覽器（Chrome、Edge、Firefox、Safari 14 以上）都支援 WebP，但部分舊版看圖軟體、修圖工具或舊系統可能無法開啟。若收件方環境較舊，建議仍用 JPG。",
        },
        {
          q: "轉成 WebP 畫質會下降嗎？",
          a: "本工具輸出的是失真 WebP（品質 92%），與原 JPG 相比肉眼幾乎看不出差異，但檔案明顯更小。",
        },
      ],
    },
    en: {
      title: "Convert JPG to WebP — Free Online Converter, 100% Local",
      description:
        "Free online JPG to WebP converter. Convert JPG to space-saving WebP in your browser for faster page loads. 100% local processing — images never leave your device.",
      h1: "Convert JPG to WebP — Free, 100% Local",
      intro: [
        "WebP is a modern image format from Google that is typically 20% to 35% smaller than JPG at similar quality. If you run a website or blog, converting JPG to WebP noticeably cuts bandwidth and speeds up page loads — good for both SEO and user experience.",
        "Compatibility-wise, all major browsers (Chrome, Edge, Firefox, Safari 14+) support WebP, though some older image viewers and built-in system tools may not open it. This tool exports WebP at 92% quality and shows a before/after size comparison instantly.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images are never uploaded to any server.",
        },
        {
          q: "How much smaller is WebP than JPG?",
          a: "At similar quality, WebP is typically 20% to 35% smaller than JPG, depending on the image. The tool shows the before/after file sizes right after conversion.",
        },
        {
          q: "How compatible is WebP? Where might it fail to open?",
          a: "All major browsers (Chrome, Edge, Firefox, Safari 14 and later) support WebP, but some older image viewers, editors or legacy systems may not. If recipients use older software, JPG is the safer choice.",
        },
        {
          q: "Does converting to WebP reduce quality?",
          a: "This tool outputs lossy WebP at 92% quality — visually almost identical to the original JPG, but with a noticeably smaller file.",
        },
      ],
    },
  },
  {
    slug: "png-to-webp",
    from: "image/png",
    to: "image/webp",
    fromLabel: "PNG",
    toLabel: "WebP",
    zh: {
      title: "PNG 轉 WebP — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 PNG 轉 WebP 工具。把肥大的 PNG 轉成小很多的 WebP，同時保留透明背景，加速網頁載入。100% 瀏覽器本機處理，不上傳。",
      h1: "PNG 轉 WebP — 免費線上轉檔，100% 本機處理",
      intro: [
        "PNG 檔案往往很大，尤其是截圖與含透明背景的圖。WebP 同樣支援透明度（Alpha 通道），轉換後透明背景會完整保留，而檔案通常能縮小一半以上，是網頁圖片瘦身的首選。",
        "本工具輸出的是失真 WebP（品質 92%），對截圖、UI 圖與一般圖片幾乎看不出差異；若你需要位元級無損保存原圖，建議保留原始 PNG 檔。所有主流瀏覽器都支援 WebP，直接用於網站沒有問題。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "PNG 的透明背景轉 WebP 後會保留嗎？",
          a: "會。WebP 支援 Alpha 透明通道，轉換後透明背景會完整保留，這也是它比 JPG 更適合取代 PNG 的原因。",
        },
        {
          q: "轉出來的 WebP 是無損的嗎？",
          a: "本工具輸出的是失真 WebP（品質 92%），檔案更小、肉眼幾乎看不出差異。若需要位元級無損，請保留原始 PNG。",
        },
        {
          q: "為什麼網站圖片建議用 WebP？",
          a: "相同視覺品質下 WebP 檔案比 PNG 小很多，能加快頁面載入、減少流量，對 Core Web Vitals 與 SEO 都有幫助，且所有主流瀏覽器皆支援。",
        },
      ],
    },
    en: {
      title: "Convert PNG to WebP — Free Online Converter, 100% Local",
      description:
        "Free online PNG to WebP converter. Shrink bulky PNGs into much smaller WebP files while keeping transparency. 100% in-browser processing, no uploads.",
      h1: "Convert PNG to WebP — Free, 100% Local",
      intro: [
        "PNG files tend to be large, especially screenshots and images with transparent backgrounds. WebP also supports transparency (alpha channel), so your transparent background is fully preserved after conversion — while the file often shrinks by more than half. It's the top choice for slimming down web images.",
        "This tool outputs lossy WebP at 92% quality, which is visually indistinguishable for screenshots, UI graphics and most images; if you need a bit-exact lossless copy, keep the original PNG. All major browsers support WebP, so it's safe to use directly on websites.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images never leave your device.",
        },
        {
          q: "Is PNG transparency preserved in WebP?",
          a: "Yes. WebP supports an alpha transparency channel, so transparent backgrounds are fully preserved — which is why WebP is a better PNG replacement than JPG.",
        },
        {
          q: "Is the output WebP lossless?",
          a: "This tool outputs lossy WebP at 92% quality — much smaller files with virtually no visible difference. If you need bit-exact lossless storage, keep the original PNG.",
        },
        {
          q: "Why is WebP recommended for website images?",
          a: "At the same visual quality, WebP files are much smaller than PNG, speeding up page loads and cutting bandwidth — good for Core Web Vitals and SEO — and every major browser supports it.",
        },
      ],
    },
  },
  {
    slug: "webp-to-png",
    from: "image/webp",
    to: "image/png",
    fromLabel: "WebP",
    toLabel: "PNG",
    zh: {
      title: "WebP 轉 PNG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 WebP 轉 PNG 工具。把 WebP 轉成無損、保留透明背景、相容性極高的 PNG 格式。100% 瀏覽器本機處理，圖片不會上傳。",
      h1: "WebP 轉 PNG — 免費線上轉檔，100% 本機處理",
      intro: [
        "當你需要在不支援 WebP 的軟體中編輯圖片，或平台只接受 PNG 時，把 WebP 轉成 PNG 是最穩妥的選擇。PNG 是無損格式且支援透明度，WebP 原有的透明背景轉換後會完整保留，之後再編輯、再儲存也不會累積失真。",
        "代價是檔案大小：PNG 通常比 WebP 大不少，這是無損格式的正常現象。若只是要給舊軟體開啟一般照片、不在意透明背景，改用 WebP 轉 JPG 可以得到更小的檔案。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "WebP 的透明背景轉 PNG 後會保留嗎？",
          a: "會。PNG 完整支援透明度，WebP 的透明背景轉換後原樣保留，適合貼圖、圖示與去背圖。",
        },
        {
          q: "為什麼轉出來的 PNG 比 WebP 大？",
          a: "PNG 是無損格式，會完整保存每個像素，因此檔案通常比 WebP 大。若想要小檔案且不需要透明背景，可改用 WebP 轉 JPG。",
        },
        {
          q: "WebP 轉 PNG 會損失畫質嗎？",
          a: "不會。PNG 以無損方式保存解碼後的影像，轉換過程不會再產生任何壓縮失真。",
        },
      ],
    },
    en: {
      title: "Convert WebP to PNG — Free Online Converter, 100% Local",
      description:
        "Free online WebP to PNG converter. Turn WebP into lossless, transparency-preserving, universally supported PNG. 100% in-browser processing, no uploads.",
      h1: "Convert WebP to PNG — Free, 100% Local",
      intro: [
        "When you need to edit an image in software that doesn't support WebP, or a platform only accepts PNG, converting WebP to PNG is the safest option. PNG is lossless and supports transparency, so any transparent background in the WebP is fully preserved — and future edits and re-saves won't accumulate quality loss.",
        "The trade-off is file size: PNG is usually considerably larger than WebP, which is normal for a lossless format. If you just need an ordinary photo to open in older software and don't care about transparency, WebP to JPG gives you a smaller file.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images are never uploaded to any server.",
        },
        {
          q: "Is WebP transparency preserved in PNG?",
          a: "Yes. PNG fully supports transparency, so any transparent background in the WebP is preserved exactly — great for stickers, icons and cut-outs.",
        },
        {
          q: "Why is the PNG larger than the WebP?",
          a: "PNG is a lossless format that stores every pixel exactly, so files are usually larger than WebP. If you want a smaller file and don't need transparency, use WebP to JPG instead.",
        },
        {
          q: "Does converting WebP to PNG lose quality?",
          a: "No. PNG stores the decoded image losslessly, so the conversion itself introduces no additional compression artifacts.",
        },
      ],
    },
  },
  {
    slug: "heic-to-jpg",
    from: "image/heic",
    to: "image/jpeg",
    fromLabel: "HEIC",
    toLabel: "JPG",
    zh: {
      title: "HEIC 轉 JPG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 HEIC 轉 JPG 工具。把 iPhone 拍的 HEIC 照片轉成相容性最高的 JPG，Windows、Android 與各種上傳表單都能開。100% 本機解碼與轉換，照片不會上傳。",
      h1: "HEIC 轉 JPG — 免費線上轉檔，100% 本機處理",
      intro: [
        "HEIC 是 iPhone（iOS 11 以後）預設的照片格式，用 HEVC 壓縮，同畫質下檔案約只有 JPG 的一半，很省空間。但問題是相容性：Windows 舊版、部分 Android 手機、許多網站上傳欄位與老舊軟體都打不開 HEIC。把 HEIC 轉成 JPG 之後，幾乎任何裝置與平台都能正常顯示，是最快解決「照片傳出去對方打不開」的方法。",
        "由於瀏覽器本身無法原生解碼 HEIC，本工具會在你的裝置上以 WebAssembly 解碼器就地解開 HEIC，再用 Canvas 重新編碼成 JPG——全程 100% 在瀏覽器完成，照片不會上傳到任何伺服器。轉出的 JPG 以 92% 品質輸出，一般照片肉眼幾乎看不出差異。",
        "附帶的隱私好處：轉檔過程只保留畫面像素，原檔 HEIC 內嵌的 GPS 定位、拍攝時間等 EXIF 中繼資料不會寫進輸出的 JPG，等於順手幫照片去掉了位置資訊。",
      ],
      faq: [
        {
          q: "照片會被上傳嗎？",
          a: "不會。HEIC 解碼與轉檔完全在你的瀏覽器中執行（WebAssembly 解碼器 + Canvas），100% 本機處理，照片不會上傳到任何伺服器，也不會留下副本。",
        },
        {
          q: "為什麼一定要把 HEIC 轉成 JPG？",
          a: "HEIC 是 Apple 專屬格式，Windows 舊版、部分 Android 裝置、許多網站上傳欄位與老軟體都無法開啟。轉成 JPG 後相容性最高，幾乎所有裝置、軟體與平台都能顯示。",
        },
        {
          q: "轉成 JPG 後畫質會變差嗎？",
          a: "JPG 是失真格式，本工具以 92% 品質輸出，一般照片幾乎看不出差異。若你想要無損保存，請改用 HEIC 轉 PNG。",
        },
        {
          q: "HEIC 轉 JPG 後檔案會變大嗎？",
          a: "通常會略為變大。HEIC 壓縮效率比 JPG 高，同畫質下檔案更小，因此轉成 JPG 後檔案常見會增加。若在意檔案大小，可再用本站的圖片壓縮工具。",
        },
        {
          q: "Live Photo 或連拍的 HEIC 可以轉嗎？",
          a: "可以上傳，但轉出的 JPG 是靜態照片，只會保留主影格，動態或連拍的其他影格不會保留。",
        },
        {
          q: "轉檔會保留照片的 GPS 位置資訊嗎？",
          a: "不會。轉檔僅保留畫面像素，原檔的 GPS、拍攝時間等 EXIF 中繼資料不會寫入輸出的 JPG，對隱私反而更安全。",
        },
      ],
    },
    en: {
      title: "Convert HEIC to JPG — Free Online Converter, 100% Local",
      description:
        "Free online HEIC to JPG converter. Turn iPhone HEIC photos into universally compatible JPG that opens on Windows, Android and any upload form. 100% local decoding, no uploads.",
      h1: "Convert HEIC to JPG — Free, 100% Local",
      intro: [
        "HEIC is the default photo format on iPhone (iOS 11 and later). It uses HEVC compression, so at similar quality the file is roughly half the size of a JPG — great for saving space. The catch is compatibility: older Windows versions, some Android phones, many website upload fields and legacy apps simply can't open HEIC. Converting HEIC to JPG makes the photo display correctly on virtually any device or platform — the fastest fix for \"I sent a photo and they can't open it.\"",
        "Because browsers can't natively decode HEIC, this tool decodes it on your device with a WebAssembly decoder, then re-encodes to JPG with the Canvas API — 100% in your browser, so your photos are never uploaded to any server. The output JPG is encoded at 92% quality, visually indistinguishable for typical photos.",
        "A privacy bonus: conversion keeps only the pixels, so the GPS location, capture time and other EXIF metadata embedded in the original HEIC are not written into the output JPG — effectively stripping location data along the way.",
      ],
      faq: [
        {
          q: "Will my photos be uploaded?",
          a: "No. HEIC decoding and conversion run entirely in your browser (a WebAssembly decoder plus the Canvas API) — 100% local processing. Your photos are never uploaded to any server and no copies are kept.",
        },
        {
          q: "Why do I need to convert HEIC to JPG?",
          a: "HEIC is an Apple-specific format that older Windows versions, some Android devices, many upload fields and legacy software can't open. JPG has the broadest compatibility — virtually every device, app and platform can display it.",
        },
        {
          q: "Does converting to JPG reduce quality?",
          a: "JPG is a lossy format. This tool exports at 92% quality, which is nearly indistinguishable for typical photos. If you want lossless output, use HEIC to PNG instead.",
        },
        {
          q: "Will the JPG be larger than the HEIC?",
          a: "Usually a bit larger. HEIC compresses more efficiently than JPG, so files are smaller at the same quality — converting to JPG often increases the size. If size matters, run the result through our image compressor.",
        },
        {
          q: "Can I convert a Live Photo or burst HEIC?",
          a: "You can upload one, but the resulting JPG is a still image containing only the main frame — motion and other burst frames are not preserved.",
        },
        {
          q: "Does conversion keep the photo's GPS location?",
          a: "No. Conversion keeps only the pixels, so GPS, capture time and other EXIF metadata from the original are not written into the output JPG — which is actually safer for privacy.",
        },
      ],
    },
  },
  {
    slug: "heic-to-png",
    from: "image/heic",
    to: "image/png",
    fromLabel: "HEIC",
    toLabel: "PNG",
    zh: {
      title: "HEIC 轉 PNG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 HEIC 轉 PNG 工具。把 iPhone 的 HEIC 照片轉成無損、相容性極高的 PNG，方便後續編輯或平台要求 PNG 的場合。100% 本機解碼，照片不會上傳。",
      h1: "HEIC 轉 PNG — 免費線上轉檔，100% 本機處理",
      intro: [
        "HEIC 是 iPhone 預設的照片格式，省空間但相容性差，很多軟體與平台打不開。當你需要在不支援 HEIC 的軟體中編輯照片，或對方只接受 PNG 時，把 HEIC 轉成 PNG 是最穩妥的選擇。PNG 為無損格式，之後不管再編輯、再儲存幾次都不會累積壓縮失真，適合需要保留清晰邊緣的截圖、去背圖或設計素材。",
        "由於瀏覽器無法原生解碼 HEIC，本工具會在你的裝置上以 WebAssembly 解碼器就地解開 HEIC，再用 Canvas 重新編碼成 PNG——全程 100% 在瀏覽器完成，照片不會上傳。要有正確期待：PNG 是無損格式，檔案通常會比原本的 HEIC 大上不少，這是正常現象；若目標是縮小檔案、只是要讓對方能開啟一般照片，改用 HEIC 轉 JPG 會得到更小的檔案。",
      ],
      faq: [
        {
          q: "照片會被上傳嗎？",
          a: "不會。HEIC 解碼與轉檔完全在你的瀏覽器中執行（WebAssembly 解碼器 + Canvas），100% 本機處理，照片不會上傳到任何伺服器。",
        },
        {
          q: "HEIC 轉 PNG 和轉 JPG 有什麼差別？",
          a: "PNG 是無損格式，適合後續編輯或需要清晰邊緣、透明背景的場合，但檔案較大；JPG 是失真格式，檔案小、相容性高，適合一般分享與上傳。看你的用途選擇。",
        },
        {
          q: "為什麼轉出來的 PNG 檔案這麼大？",
          a: "PNG 是無損格式，會完整保存每個像素，加上 HEIC 原本壓縮效率很高，因此轉成 PNG 後檔案常見會大上數倍，屬正常現象。",
        },
        {
          q: "HEIC 轉 PNG 會損失畫質嗎？",
          a: "不會。PNG 以無損方式保存解碼後的影像，轉換過程本身不會再產生任何壓縮失真。",
        },
        {
          q: "轉檔會保留 GPS 位置等中繼資料嗎？",
          a: "不會。轉檔僅保留畫面像素，原檔的 GPS、拍攝時間等 EXIF 中繼資料不會寫入輸出的 PNG，對隱私更安全。",
        },
      ],
    },
    en: {
      title: "Convert HEIC to PNG — Free Online Converter, 100% Local",
      description:
        "Free online HEIC to PNG converter. Turn iPhone HEIC photos into lossless, widely supported PNG — ideal for editing or platforms that require PNG. 100% local decoding, no uploads.",
      h1: "Convert HEIC to PNG — Free, 100% Local",
      intro: [
        "HEIC is the default photo format on iPhone. It saves space but has poor compatibility — many apps and platforms can't open it. When you need to edit a photo in software that doesn't support HEIC, or a platform only accepts PNG, converting HEIC to PNG is the safest option. PNG is lossless, so no matter how many times you re-edit and re-save afterwards, no additional quality is lost — ideal for screenshots, cut-outs and design assets that need crisp edges.",
        "Because browsers can't natively decode HEIC, this tool decodes it on your device with a WebAssembly decoder, then re-encodes to PNG with the Canvas API — 100% in your browser, no uploads. Set the right expectation: PNG is lossless, so the file is usually considerably larger than the original HEIC, which is normal. If your goal is a smaller file and you just need an ordinary photo to open, HEIC to JPG gives you a much smaller result.",
      ],
      faq: [
        {
          q: "Will my photos be uploaded?",
          a: "No. HEIC decoding and conversion run entirely in your browser (a WebAssembly decoder plus the Canvas API) — 100% local processing. Your photos are never uploaded to any server.",
        },
        {
          q: "What's the difference between HEIC to PNG and HEIC to JPG?",
          a: "PNG is lossless — best for further editing or when you need crisp edges or transparency — but files are larger. JPG is lossy — smaller and highly compatible — better for everyday sharing and uploads. Choose based on your use case.",
        },
        {
          q: "Why is the resulting PNG so large?",
          a: "PNG is a lossless format that stores every pixel exactly, and HEIC compresses very efficiently to begin with, so the PNG is often several times larger. That's expected.",
        },
        {
          q: "Does converting HEIC to PNG lose quality?",
          a: "No. PNG stores the decoded image losslessly, so the conversion itself introduces no additional compression artifacts.",
        },
        {
          q: "Does conversion keep GPS and other metadata?",
          a: "No. Conversion keeps only the pixels, so GPS, capture time and other EXIF metadata from the original are not written into the output PNG — which is safer for privacy.",
        },
      ],
    },
  },
  {
    slug: "svg-to-png",
    from: "image/svg+xml",
    to: "image/png",
    fromLabel: "SVG",
    toLabel: "PNG",
    zh: {
      title: "SVG 轉 PNG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 SVG 轉 PNG 工具。把向量 SVG 轉成保留透明背景的點陣 PNG，供簡報、社群平台與不支援 SVG 的軟體使用。100% 本機處理，不上傳。",
      h1: "SVG 轉 PNG — 免費線上轉檔，100% 本機處理",
      intro: [
        "SVG 是向量格式，放大不會糊，但很多地方不吃：簡報軟體、社群平台上傳、通訊軟體、以及不少舊版影像編輯器都只接受點陣圖。把 SVG 轉成 PNG 之後，圖示、Logo 與插畫就能直接貼進這些場合，而且 PNG 支援透明背景，SVG 原本的透明區域會完整保留。",
        "轉換以 SVG 自身的尺寸做點陣化：若 SVG 有指定 width／height 就依該尺寸輸出，若只有 viewBox 而沒有明確尺寸，本工具會以 1024px 為基準輸出，避免產生空白圖。需要更大尺寸時，可先在原始 SVG 檔中把 width／height 調大再上傳。",
        "為了安全與隱私，轉檔完全在你的瀏覽器中以 Canvas 完成，SVG 不會上傳。也因為採用瀏覽器的沙箱化渲染，SVG 內若引用了外部字型或外部圖片連結，那些外部資源不會被載入，該部分可能不會出現在輸出的 PNG 中——建議先把字型轉為外框（path）再轉檔。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，SVG 檔不會上傳到任何伺服器。",
        },
        {
          q: "轉出的 PNG 是多大尺寸？可以指定嗎？",
          a: "依 SVG 本身的 width／height 輸出；若 SVG 只有 viewBox 沒有明確尺寸，會以 1024px 為基準。要更高解析度，請先在 SVG 原始檔中把 width／height 調大再上傳。",
        },
        {
          q: "SVG 的透明背景會保留嗎？",
          a: "會。PNG 支援 Alpha 透明通道，SVG 中沒有填色的區域轉換後仍是透明的，適合 Logo 與圖示。若改轉 JPG 則會被填成白底。",
        },
        {
          q: "為什麼有些文字或圖片沒有出現在轉出的 PNG 裡？",
          a: "瀏覽器基於安全考量不會為轉檔載入 SVG 內引用的外部字型或外部圖片網址。請先把文字轉成外框路徑（path）、或把圖片改成內嵌 data URI，再上傳轉檔。",
        },
      ],
    },
    en: {
      title: "Convert SVG to PNG — Free Online Converter, 100% Local",
      description:
        "Free online SVG to PNG converter. Rasterize vector SVG into transparent PNG for slide decks, social platforms and apps that don't accept SVG. 100% local, no uploads.",
      h1: "Convert SVG to PNG — Free, 100% Local",
      intro: [
        "SVG is a vector format that stays sharp at any size, but plenty of places won't take it: presentation software, social platform uploads, messaging apps and many older image editors accept raster images only. Converting SVG to PNG lets you drop icons, logos and illustrations straight into those places — and because PNG supports transparency, the transparent areas of your SVG are fully preserved.",
        "Rasterization uses the SVG's own dimensions: if the file specifies width and height, that size is used; if it only has a viewBox with no explicit size, this tool renders at a 1024px baseline so you don't end up with a blank image. For a larger export, raise the width and height in the SVG source before uploading.",
        "For safety and privacy the conversion runs entirely in your browser via the Canvas API — the SVG is never uploaded. Because rendering is sandboxed, any external fonts or externally linked images referenced by the SVG are not fetched and may be missing from the output PNG. Convert text to outlines (paths) first for a faithful result.",
      ],
      faq: [
        {
          q: "Will my file be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your SVG is never uploaded to any server.",
        },
        {
          q: "What size is the output PNG, and can I choose it?",
          a: "It follows the SVG's own width and height. If the SVG only has a viewBox with no explicit size, a 1024px baseline is used. For higher resolution, increase the width and height in the SVG source before uploading.",
        },
        {
          q: "Is SVG transparency preserved in the PNG?",
          a: "Yes. PNG supports an alpha channel, so unfilled areas of the SVG stay transparent — ideal for logos and icons. Converting to JPG instead would fill them with white.",
        },
        {
          q: "Why is some text or imagery missing from my PNG?",
          a: "For security, browsers don't fetch external fonts or externally linked images referenced inside an SVG during conversion. Convert text to outline paths, or embed images as data URIs, then convert again.",
        },
      ],
    },
  },
  {
    slug: "svg-to-jpg",
    from: "image/svg+xml",
    to: "image/jpeg",
    fromLabel: "SVG",
    toLabel: "JPG",
    zh: {
      title: "SVG 轉 JPG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 SVG 轉 JPG 工具。把向量 SVG 點陣化成相容性最高的 JPG，透明區域自動填白底。100% 瀏覽器本機處理，檔案不會上傳。",
      h1: "SVG 轉 JPG — 免費線上轉檔，100% 本機處理",
      intro: [
        "當你需要把 SVG 圖表、Logo 或插畫放進只接受 JPG 的表單、文件或平台時，就需要 SVG 轉 JPG。JPG 是相容性最高的圖片格式，幾乎任何裝置、軟體與上傳欄位都能接受，也不會有 SVG 那種「傳出去對方打不開」的問題。",
        "要注意 JPG 不支援透明背景：SVG 中沒有填色的區域轉換後會自動填上白色底色，避免變成黑色。若你的圖是要疊在有色背景上的 Logo 或圖示，建議改用 SVG 轉 PNG 以保留透明度。輸出以 92% 品質編碼。",
        "轉換依 SVG 自身的 width／height 點陣化，若原檔只有 viewBox 而未指定尺寸，會以 1024px 為基準輸出。全程在瀏覽器本機完成，SVG 不會上傳；SVG 內引用的外部字型或外部圖片基於安全考量不會被載入。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，SVG 檔不會上傳到任何伺服器。",
        },
        {
          q: "SVG 的透明背景轉成 JPG 後會怎樣？",
          a: "JPG 不支援透明度，透明區域會自動填上白色背景，避免變成黑色。若要保留透明背景，請改用 SVG 轉 PNG。",
        },
        {
          q: "轉出的 JPG 是多大尺寸？",
          a: "依 SVG 本身的 width／height 輸出；若原檔只有 viewBox 沒有明確尺寸，會以 1024px 為基準。要更高解析度，請先在 SVG 原始檔調大尺寸再上傳。",
        },
        {
          q: "SVG 轉成 JPG 後放大會糊嗎？",
          a: "會。SVG 是向量格式可無限放大，JPG 是固定解析度的點陣圖，放大就會失真。若之後還要放大使用，建議保留原始 SVG 檔。",
        },
      ],
    },
    en: {
      title: "Convert SVG to JPG — Free Online Converter, 100% Local",
      description:
        "Free online SVG to JPG converter. Rasterize vector SVG into universally compatible JPG, transparency filled with white. 100% in-browser processing, no uploads.",
      h1: "Convert SVG to JPG — Free, 100% Local",
      intro: [
        "When you need to drop an SVG chart, logo or illustration into a form, document or platform that only accepts JPG, SVG to JPG is the conversion you want. JPG has the broadest compatibility of any image format — virtually every device, app and upload field takes it, with none of the \"they can't open it\" problems SVG causes.",
        "Note that JPG does not support transparency: unfilled areas of the SVG are automatically filled with a white background so they don't turn black. If your graphic is a logo or icon meant to sit on a colored background, use SVG to PNG instead to keep transparency. Output is encoded at 92% quality.",
        "Rasterization follows the SVG's own width and height; if the file only has a viewBox with no explicit size, a 1024px baseline is used. Everything runs locally in your browser — the SVG is never uploaded — and for security, external fonts or images linked from inside the SVG are not fetched.",
      ],
      faq: [
        {
          q: "Will my file be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your SVG never leaves your device.",
        },
        {
          q: "What happens to SVG transparency in JPG?",
          a: "JPG does not support transparency, so transparent areas are automatically filled with a white background instead of turning black. To keep transparency, convert SVG to PNG instead.",
        },
        {
          q: "What size is the output JPG?",
          a: "It follows the SVG's own width and height. If the file only has a viewBox with no explicit size, a 1024px baseline is used. Increase the size in the SVG source first for a higher-resolution export.",
        },
        {
          q: "Will the JPG look blurry when enlarged?",
          a: "Yes. SVG is vector and scales infinitely; JPG is a fixed-resolution raster image, so enlarging it degrades quality. Keep the original SVG if you'll need larger versions later.",
        },
      ],
    },
  },
  {
    slug: "bmp-to-jpg",
    from: "image/bmp",
    to: "image/jpeg",
    fromLabel: "BMP",
    toLabel: "JPG",
    zh: {
      title: "BMP 轉 JPG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 BMP 轉 JPG 工具。把體積龐大的 BMP 點陣圖轉成小很多的 JPG，方便寄送與上傳。100% 瀏覽器本機處理，圖片不會上傳到任何伺服器。",
      h1: "BMP 轉 JPG — 免費線上轉檔，100% 本機處理",
      intro: [
        "BMP 是 Windows 早期的點陣圖格式，幾乎不做壓縮，因此檔案非常大——一張全螢幕截圖動輒好幾 MB，用郵件寄送或上傳表單常常直接超過大小限制。轉成 JPG 之後檔案通常能縮小九成以上，是處理老舊掃描檔、小畫家輸出與監控截圖最實用的一步。",
        "JPG 是失真格式，本工具以 92% 品質輸出，一般照片與截圖肉眼幾乎看不出差異。若你的 BMP 是含大量細小文字的畫面截圖、且必須完全無損，改用 BMP 轉 PNG 會更適合。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "BMP 轉 JPG 後檔案會小多少？",
          a: "因為 BMP 幾乎不壓縮，轉成 JPG 後通常能縮小 90% 以上。本工具會即時顯示轉換前後的檔案大小比較。",
        },
        {
          q: "轉成 JPG 會損失畫質嗎？",
          a: "JPG 是失真格式，本工具以 92% 品質輸出，一般內容幾乎看不出差異；但含細小文字或銳利線條的截圖可能出現輕微壓縮痕跡，此時建議改轉 PNG。",
        },
        {
          q: "BMP 的透明度會保留嗎？",
          a: "多數 BMP 本來就沒有透明資訊；即使有，JPG 也不支援透明度，透明區域會自動填上白色背景。需要透明請改用 BMP 轉 PNG。",
        },
      ],
    },
    en: {
      title: "Convert BMP to JPG — Free Online Converter, 100% Local",
      description:
        "Free online BMP to JPG converter. Shrink huge uncompressed BMP bitmaps into far smaller JPG files for email and uploads. 100% local in-browser processing, no uploads.",
      h1: "Convert BMP to JPG — Free, 100% Local",
      intro: [
        "BMP is an early Windows bitmap format that stores images with essentially no compression, so files are enormous — a single full-screen capture easily runs to several megabytes and blows past email and upload-form size limits. Converting to JPG typically cuts the file by more than 90%, making it the most practical first step for old scans, Paint exports and surveillance captures.",
        "JPG is a lossy format; this tool exports at 92% quality, which is visually indistinguishable for typical photos and screenshots. If your BMP is a UI capture packed with fine text and must stay lossless, BMP to PNG is the better choice.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images are never uploaded to any server.",
        },
        {
          q: "How much smaller will the JPG be?",
          a: "Because BMP is essentially uncompressed, converting to JPG usually shrinks the file by more than 90%. The tool shows a before/after size comparison instantly.",
        },
        {
          q: "Does converting to JPG lose quality?",
          a: "JPG is lossy. This tool exports at 92% quality, nearly indistinguishable for typical content, though screenshots with fine text or sharp lines may show slight artifacts — convert to PNG in that case.",
        },
        {
          q: "Is BMP transparency preserved?",
          a: "Most BMP files carry no transparency to begin with, and JPG doesn't support it either, so any transparent area is filled with white. Use BMP to PNG if you need transparency.",
        },
      ],
    },
  },
  {
    slug: "bmp-to-png",
    from: "image/bmp",
    to: "image/png",
    fromLabel: "BMP",
    toLabel: "PNG",
    zh: {
      title: "BMP 轉 PNG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 BMP 轉 PNG 工具。把未壓縮的 BMP 轉成同樣無損但小很多的 PNG，畫質完全不變。100% 瀏覽器本機處理，圖片不會上傳。",
      h1: "BMP 轉 PNG — 免費線上轉檔，100% 本機處理",
      intro: [
        "BMP 與 PNG 都是無損格式，差別在於 BMP 幾乎不壓縮而 PNG 有高效的無損壓縮。也就是說 BMP 轉 PNG 可以在畫質完全不變的前提下，把檔案縮小到原本的幾分之一——對含大量純色區塊的截圖與 UI 圖，壓縮效果特別明顯。",
        "這也是處理老舊 BMP 素材最推薦的轉法：現代軟體、網頁與各種上傳表單對 PNG 的支援遠比 BMP 好，而且不像轉 JPG 那樣會引入壓縮痕跡，細小文字與銳利線條都能完整保留。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "BMP 轉 PNG 會損失畫質嗎？",
          a: "不會。PNG 與 BMP 同樣是無損格式，轉換過程完整保存每個像素，不會產生任何壓縮失真。",
        },
        {
          q: "既然都是無損，為什麼 PNG 檔案小這麼多？",
          a: "BMP 幾乎不做壓縮，PNG 則使用高效的無損壓縮演算法。含大量純色區塊的截圖與 UI 圖常可縮小到原本的十分之一以下，畫質仍完全相同。",
        },
        {
          q: "該轉 PNG 還是 JPG？",
          a: "要完全無損、或圖中有細小文字與銳利線條，選 PNG；只是要檔案盡可能小、內容又是一般照片，選 BMP 轉 JPG 會更小。",
        },
      ],
    },
    en: {
      title: "Convert BMP to PNG — Free Online Converter, 100% Local",
      description:
        "Free online BMP to PNG converter. Turn uncompressed BMP into equally lossless but far smaller PNG with zero quality change. 100% in-browser processing, no uploads.",
      h1: "Convert BMP to PNG — Free, 100% Local",
      intro: [
        "BMP and PNG are both lossless formats — the difference is that BMP barely compresses at all while PNG uses efficient lossless compression. So converting BMP to PNG shrinks the file to a fraction of its original size with absolutely no change in quality, and the effect is most dramatic for screenshots and UI graphics with large flat-color areas.",
        "It's also the best way to modernize old BMP assets: modern software, websites and upload forms support PNG far better than BMP, and unlike converting to JPG it introduces no compression artifacts, so fine text and sharp lines survive intact.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images never leave your device.",
        },
        {
          q: "Does converting BMP to PNG lose quality?",
          a: "No. PNG is lossless just like BMP, so every pixel is preserved exactly and no compression artifacts are introduced.",
        },
        {
          q: "If both are lossless, why is the PNG so much smaller?",
          a: "BMP is essentially uncompressed while PNG uses an efficient lossless compression algorithm. Screenshots and UI graphics with flat-color areas often drop below a tenth of the original size at identical quality.",
        },
        {
          q: "Should I choose PNG or JPG?",
          a: "Choose PNG if you need true lossless output or the image contains fine text and sharp lines. If you just want the smallest possible file and the content is an ordinary photo, BMP to JPG goes smaller.",
        },
      ],
    },
  },
  {
    slug: "gif-to-jpg",
    from: "image/gif",
    to: "image/jpeg",
    fromLabel: "GIF",
    toLabel: "JPG",
    zh: {
      title: "GIF 轉 JPG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 GIF 轉 JPG 工具。把 GIF 圖片轉成相容性最高的靜態 JPG，動畫 GIF 會取第一個影格。100% 瀏覽器本機處理，圖片不會上傳。",
      h1: "GIF 轉 JPG — 免費線上轉檔，100% 本機處理",
      intro: [
        "當你需要把 GIF 放進只接受 JPG 的上傳欄位、履歷、文件或列印稿時，GIF 轉 JPG 就派得上用場。JPG 相容性最高，且對照片類內容的壓縮效率遠勝 GIF——GIF 最多只有 256 色，本來就不適合存放照片。",
        "有兩點要先知道：第一，動畫 GIF 轉出的是靜態圖片，只會保留第一個影格；第二，JPG 不支援透明背景，GIF 的透明區域會自動填上白色底色。若你需要保留透明背景，請改用 GIF 轉 PNG。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "動畫 GIF 轉 JPG 會保留動畫嗎？",
          a: "不會。JPG 是靜態格式，轉出的圖片只會保留 GIF 的第一個影格，動態效果不會保留。",
        },
        {
          q: "GIF 的透明背景轉 JPG 後會怎樣？",
          a: "JPG 不支援透明度，透明區域會自動填上白色背景，避免變成黑色。要保留透明背景請改用 GIF 轉 PNG。",
        },
        {
          q: "GIF 轉 JPG 畫質會變好嗎？",
          a: "不會。GIF 最多只有 256 色，已經丟失的色階不會因為轉成 JPG 而恢復；轉檔的好處是相容性與後續壓縮效率。",
        },
      ],
    },
    en: {
      title: "Convert GIF to JPG — Free Online Converter, 100% Local",
      description:
        "Free online GIF to JPG converter. Turn GIF images into universally compatible still JPG — animated GIFs use the first frame. 100% in-browser processing, no uploads.",
      h1: "Convert GIF to JPG — Free, 100% Local",
      intro: [
        "When you need a GIF to go into an upload field, résumé, document or print layout that only accepts JPG, GIF to JPG is the conversion you want. JPG has the broadest compatibility and compresses photographic content far better than GIF — which is capped at 256 colors and was never well suited to photos in the first place.",
        "Two things to know up front: animated GIFs produce a still image containing only the first frame, and JPG doesn't support transparency, so transparent areas of the GIF are filled with a white background. If you need transparency preserved, use GIF to PNG instead.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images are never uploaded to any server.",
        },
        {
          q: "Does an animated GIF keep its animation as JPG?",
          a: "No. JPG is a still format, so the output contains only the GIF's first frame — the animation is not preserved.",
        },
        {
          q: "What happens to GIF transparency in JPG?",
          a: "JPG does not support transparency, so transparent areas are automatically filled with a white background instead of turning black. Use GIF to PNG to keep transparency.",
        },
        {
          q: "Does converting GIF to JPG improve quality?",
          a: "No. A GIF holds at most 256 colors, and color detail already discarded can't be recovered. The benefit is compatibility and better downstream compression.",
        },
      ],
    },
  },
  {
    slug: "gif-to-png",
    from: "image/gif",
    to: "image/png",
    fromLabel: "GIF",
    toLabel: "PNG",
    zh: {
      title: "GIF 轉 PNG — 免費線上轉檔工具，100% 本機處理",
      description:
        "免費線上 GIF 轉 PNG 工具。把 GIF 轉成無損、支援全彩與透明背景的 PNG，動畫 GIF 會取第一個影格。100% 本機處理，圖片不會上傳。",
      h1: "GIF 轉 PNG — 免費線上轉檔，100% 本機處理",
      intro: [
        "GIF 最多只有 256 色，而且透明度只有「全透明或全不透明」兩種狀態，邊緣常常出現鋸齒。PNG 支援全彩與平滑的 Alpha 半透明，把 GIF 轉成 PNG 之後，透明背景會完整保留，之後再做編輯、去背或疊圖都更好處理，也不會像轉 JPG 那樣被填成白底。",
        "要注意動畫 GIF 轉出的是靜態圖片，只會保留第一個影格。另外轉檔不會憑空增加色彩：GIF 原本被限制在 256 色的畫面不會因為存成 PNG 而變成全彩，PNG 的好處是「從此以後不再失真」，以及更好的透明度與相容性。",
      ],
      faq: [
        {
          q: "圖片會被上傳嗎？",
          a: "不會。轉換完全在你的瀏覽器中以 Canvas 技術執行，100% 本機處理，圖片不會上傳到任何伺服器。",
        },
        {
          q: "動畫 GIF 轉 PNG 會保留動畫嗎？",
          a: "不會。轉出的是靜態 PNG，只會保留 GIF 的第一個影格。若要保留動畫，請維持原始 GIF 檔。",
        },
        {
          q: "GIF 的透明背景會保留嗎？",
          a: "會。PNG 完整支援透明度，GIF 的透明區域轉換後仍是透明的，且 PNG 還支援 GIF 做不到的平滑半透明邊緣。",
        },
        {
          q: "GIF 轉 PNG 後顏色會變多嗎？",
          a: "不會。GIF 儲存時已被限制在 256 色，這些丟失的色階無法透過轉檔恢復。PNG 的價值在於之後不再失真、以及更好的透明度支援。",
        },
      ],
    },
    en: {
      title: "Convert GIF to PNG — Free Online Converter, 100% Local",
      description:
        "Free online GIF to PNG converter. Turn GIF into lossless full-color PNG with transparency preserved — animated GIFs use the first frame. 100% local, no uploads.",
      h1: "Convert GIF to PNG — Free, 100% Local",
      intro: [
        "GIF is limited to 256 colors, and its transparency is all-or-nothing, which is why GIF edges so often look jagged. PNG supports full color and smooth alpha transparency, so converting GIF to PNG keeps the transparent background intact and gives you a file that's much easier to edit, cut out or composite later — with none of the white-fill you'd get from converting to JPG.",
        "Note that an animated GIF produces a still image containing only the first frame. Also, conversion doesn't invent color: a picture already quantized to 256 colors in the GIF won't become full-color by saving as PNG. What PNG buys you is no further quality loss from here on, plus better transparency and compatibility.",
      ],
      faq: [
        {
          q: "Will my images be uploaded?",
          a: "No. Conversion runs entirely in your browser using the Canvas API — 100% local processing. Your images never leave your device.",
        },
        {
          q: "Does an animated GIF keep its animation as PNG?",
          a: "No. The output is a still PNG containing only the GIF's first frame. Keep the original GIF if you need the animation.",
        },
        {
          q: "Is GIF transparency preserved in the PNG?",
          a: "Yes. PNG fully supports transparency, so transparent areas of the GIF stay transparent — and PNG additionally supports the smooth semi-transparent edges GIF cannot represent.",
        },
        {
          q: "Will the PNG have more colors than the GIF?",
          a: "No. The image was already quantized to 256 colors when saved as GIF, and that lost color detail can't be recovered. PNG's value is preventing further loss and better transparency support.",
        },
      ],
    },
  },
];
