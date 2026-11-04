import ProgSeoPage from "@/components/ProgSeoPage";
import { localeAlternates } from "@/lib/seo";

const ALTERNATES = localeAlternates({ zh: "/compress-to-200kb", en: "/en/compress-to-200kb" });

export default function CompressTo200kb() {
  return (
    <ProgSeoPage
      lang="zh"
      alternates={ALTERNATES}
      title="圖片壓縮到 200KB — 免費線上壓縮，不上傳檔案 | ImageMarker"
      description="把照片壓縮到 200KB 以內：履歷照片、線上申辦附件、報名表單常見的上傳限制，拉動品質滑桿就能達標。100% 在瀏覽器本機處理，照片不會上傳。"
      canonical="https://imagemarker.app/compress-to-200kb"
      h1="圖片壓縮到 200KB — 免費線上壓縮，不上傳檔案"
      siteHeaderCurrent="compress"
      toolHref="/compress"
      toolCta="開啟免費圖片壓縮工具"
      featureList={[
        "100% 瀏覽器本機處理，不上傳檔案",
        "即時顯示壓縮後檔案大小",
        "品質可調，找到剛好低於 200KB 的設定",
        "支援 JPG、PNG、WebP",
      ]}
      intro={[
        "200KB 比 100KB 寬鬆許多，是求職網站大頭貼、線上申辦附件、報名表單常見的上傳上限。手機照片通常 2～5 MB，大約要縮小十到二十倍。好消息是這個目標多半不必犧牲太多畫質：把品質調到 70～80% 左右，再視需要縮小尺寸，就能落在 200KB 以內。",
        "實際做法很簡單：上傳圖片後，拉動品質滑桿，畫面會即時顯示壓縮後的檔案大小，調到剛好低於 200KB 再下載。如果拉到 60% 仍然超標，代表像素太多，先到圖片縮放把長邊縮到 1600 像素左右，再回來壓縮，效果比單靠降畫質好得多。",
        "若原檔是 PNG（例如螢幕截圖、掃描檔），先轉成 JPG 通常就是最大的一步，檔案常能少掉一半以上。文字很多的截圖用 JPG 會有輕微雜訊，如果對方接受，可以改輸出 WebP 取得更乾淨的結果。",
        "需要壓縮的常常是證件、合約、簽名文件，這類檔案不適合丟到會收下檔案的線上服務。本工具在你的瀏覽器內用 Canvas 編碼，檔案沒有經過任何伺服器。證件影本建議先加浮水印註明用途，再壓縮後上傳。",
      ]}
      bullets={[
        "多數照片只要調品質就能達標，不必縮小尺寸。",
        "即時預覽檔案大小，調到剛好低於 200KB 即可下載。",
        "PNG 截圖先轉 JPG 或 WebP，縮小幅度最大。",
      ]}
      faqs={[
        {
          q: "壓到 200KB 畫質會很差嗎？",
          a: "通常不會。一般照片以 70～80% 的 JPG 品質，搭配適當尺寸，就能落在 200KB 內而且肉眼難分辨差異。只有原圖非常大時，才需要另外縮小尺寸。",
        },
        {
          q: "品質拉到多少才夠？",
          a: "從 75% 開始試，工具會即時顯示大小，不夠再往下調。若降到 60% 還是超過，建議先縮小圖片尺寸再壓縮，畫質會比硬降品質好。",
        },
        {
          q: "PNG 圖片怎麼壓到 200KB？",
          a: "PNG 是無損格式，檔案通常偏大。最有效的方式是輸出成 JPG 或 WebP，大小常常直接少掉一半以上。如果必須保留 PNG，只能靠縮小尺寸。",
        },
        {
          q: "我的檔案會被上傳嗎？",
          a: "不會。壓縮在瀏覽器內完成，檔案不會離開你的裝置，也不需要註冊。",
        },
        {
          q: "壓縮後的檔案格式會變嗎？",
          a: "可以自己選。上傳表單若只收 JPG，就選 JPG；沒有特別限制時，WebP 會再小一些。",
        },
        {
          q: "可以一次壓縮很多張嗎？",
          a: "目前工具一次處理一張。要批次加浮水印可以用批次浮水印工具。",
        },
      ]}
      seeAlso={[
        { href: "/compress-to-100kb", label: "圖片壓縮到 100KB（更嚴格的目標）" },
        { href: "/resize", label: "先縮小圖片尺寸，再壓縮" },
        { href: "/convert/png-to-jpg", label: "PNG 轉 JPG，檔案更小" },
        { href: "/blog/image-compression-guide", label: "圖片壓縮完整指南" },
        { href: "/", label: "壓縮證件前，先加上浮水印" },
      ]}
    />
  );
}
