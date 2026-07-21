// 格式對（programmatic SEO）設定：每個 pair 對應 /convert/<slug> 與 /en/convert/<slug>
// 內容須中英一致的事實正確性：透明度、失真/無損、相容性等描述都針對該格式對撰寫。

export type PairMime = "image/jpeg" | "image/png" | "image/webp";
// 來源格式可包含 HEIC（瀏覽器無法原生解碼，需先以 heic2any 於本機解碼再進 Canvas）。
// 輸出格式仍限 Canvas 支援的 JPG／PNG／WebP。
export type PairSourceMime = PairMime | "image/heic";

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
];
