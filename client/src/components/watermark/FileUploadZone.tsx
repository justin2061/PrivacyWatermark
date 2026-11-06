import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Upload, ImageIcon, X } from "lucide-react";
import type { Lang } from "@/lib/tools";

interface FileUploadZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  /** 清除目前的圖片；有傳才顯示檔案卡片上的 ✕ */
  onRemove?: () => void;
  lang?: Lang;
}

export function FileUploadZone({ selectedFile, onFileSelect, onRemove, lang = 'zh' }: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    zh: {
      title: '上傳圖片',
      dropHint: '將圖片拖放到此處，或點擊選擇檔案',
      formats: '支援 JPG、PNG 格式，最大 10MB',
      choose: '選擇檔案',
      chooseAria: '選擇圖片檔案',
      zoneAria: '上傳圖片區域，點擊或拖放檔案到此處',
      remove: '移除這張圖片',
      localNote: '圖片只存在你的瀏覽器記憶體中，沒有上傳。按 ✕、重新整理或關閉頁面就會消失。',
    },
    en: {
      title: 'Upload Image',
      dropHint: 'Drag & drop image here, or click to select',
      formats: 'Supports JPG, PNG. Max 10MB',
      choose: 'Choose File',
      chooseAria: 'Choose image file',
      zoneAria: 'Upload area, click or drag a file here',
      remove: 'Remove this image',
      localNote: 'This image stays in your browser’s memory and is never uploaded. Press ✕, reload, or close the page and it’s gone.',
    },
    ja: {
      title: '画像を選ぶ',
      dropHint: 'ここに画像をドラッグ＆ドロップ、またはクリックして選択',
      formats: 'JPG・PNG に対応、最大 10MB',
      choose: 'ファイルを選択',
      chooseAria: '画像ファイルを選択',
      zoneAria: '画像アップロード領域。クリックするか、ファイルをドラッグしてください',
      remove: 'この画像を削除',
      localNote: '画像はブラウザのメモリ内だけにあり、アップロードされません。✕・再読み込み・ページを閉じると消えます。',
    },
  }[lang];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // 重設 value，否則清除後再選同一張圖不會觸發 change
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.title}</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label={t.zoneAria}
      >
        <Upload className="text-gray-400 text-4xl mb-4 mx-auto w-12 h-12" aria-hidden="true" />
        <p className="text-gray-600 mb-2">{t.dropHint}</p>
        <p className="text-sm text-gray-600 mb-4">{t.formats}</p>
        <button
          aria-label={t.chooseAria}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t.choose}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
        aria-label={t.chooseAria}
      />

      {/* File Info：中性視覺＋移除鈕，避免看起來像「已上傳到伺服器」 */}
      {selectedFile && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 min-w-0">
              <ImageIcon className="text-gray-500 w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium truncate">{selectedFile.name}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-xs text-gray-600">{formatFileSize(selectedFile.size)}</span>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  aria-label={t.remove}
                  title={t.remove}
                  className="ml-1 inline-flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-600">{t.localNote}</p>
        </div>
      )}
    </Card>
  );
}
