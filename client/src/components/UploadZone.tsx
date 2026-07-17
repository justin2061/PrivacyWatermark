import { useRef, type RefObject } from "react";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  /** input 的 accept，例如 "image/jpeg,image/png,image/webp"。 */
  accept: string;
  /** 是否允許多選（批次工具用）。 */
  multiple?: boolean;
  /** 選到檔案（拖放或點選）後回呼，收到原生 FileList，呼叫端自行取 files[0] 或整包處理。 */
  onFiles: (files: FileList) => void;
  /** 主要說明文字，例如「將圖片拖放到此處，或點擊選擇檔案」。 */
  title: string;
  /** 次要說明文字（灰色小字），例如「支援 JPG、PNG、WebP 格式」。 */
  description: string;
  /** 選擇按鈕文字，例如「選擇檔案」/「Choose File」。 */
  buttonLabel: string;
  /** 拖放區的 aria-label。 */
  ariaLabel: string;
  /** 隱藏 input 的 aria-label；預設沿用 ariaLabel。 */
  inputAriaLabel?: string;
  /** 選擇按鈕的 aria-label；不傳則按鈕文字本身即為無障礙名稱。 */
  buttonAriaLabel?: string;
  /**
   * 由呼叫端（頁面或 hook）持有的 input ref。有些工具的 reset() 會透過
   * ref.current.value = "" 清空 input，所以 ref 必須留在呼叫端；不傳則用內部 ref。
   */
  inputRef?: RefObject<HTMLInputElement>;
  /** 拖放區內距，預設 p-8；馬賽克頁用 p-10。 */
  padding?: string;
}

/**
 * 全站共用的拖放上傳區。取代先前散落在 9 個工具頁、視覺一致但複製貼上的拖放區。
 * 只負責「拖放 / 點擊 / 鍵盤」三種開檔入口與樣式；驗證、狀態、reset 仍由呼叫端掌控，
 * 因此重構前後功能完全一致。
 */
export function UploadZone({
  accept,
  multiple = false,
  onFiles,
  title,
  description,
  buttonLabel,
  ariaLabel,
  inputAriaLabel,
  buttonAriaLabel,
  inputRef,
  padding = "p-8",
}: UploadZoneProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = inputRef ?? internalRef;

  const openPicker = () => ref.current?.click();

  return (
    <>
      <div
        onDrop={(e) => {
          e.preventDefault();
          // 只有真的拖進檔案才回呼，空拖放（拖文字/網址）維持 no-op，與各工具原本行為一致
          if (e.dataTransfer.files.length > 0) onFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        className={`border-2 border-dashed border-gray-300 rounded-lg ${padding} text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer`}
      >
        <Upload
          className="text-gray-400 w-12 h-12 mb-4 mx-auto"
          aria-hidden="true"
        />
        <p className="text-gray-600 mb-2">{title}</p>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <button
          type="button"
          aria-label={buttonAriaLabel}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {buttonLabel}
        </button>
      </div>
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) onFiles(e.target.files);
          // 清空 value，讓重選同一個檔案仍會觸發 onChange
          e.target.value = "";
        }}
        aria-label={inputAriaLabel ?? ariaLabel}
      />
    </>
  );
}
