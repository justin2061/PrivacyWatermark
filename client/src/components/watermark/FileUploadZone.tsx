import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Upload, CheckCircle } from "lucide-react";

interface FileUploadZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

export function FileUploadZone({ selectedFile, onFileSelect }: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
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
      <h2 className="text-lg font-semibold text-gray-900 mb-4">上傳圖片</h2>
      
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
        aria-label="上傳圖片區域，點擊或拖放檔案到此處"
      >
        <Upload className="text-gray-400 text-4xl mb-4 mx-auto w-12 h-12" aria-hidden="true" />
        <p className="text-gray-600 mb-2">將圖片拖放到此處，或點擊選擇檔案</p>
        <p className="text-sm text-gray-500 mb-4">支援 JPG、PNG 格式，最大 10MB</p>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          選擇檔案
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
        aria-label="選擇圖片檔案"
      />
      
      {/* File Info */}
      {selectedFile && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-600 w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
            </div>
            <span className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
