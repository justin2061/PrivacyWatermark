import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Download } from "lucide-react";
import type { Lang } from "@/lib/tools";

interface ProcessingStatusProps {
  selectedFile: File | null;
  processedImage: string | null;
  progress: number;
  lang?: Lang;
}

export function ProcessingStatus({ selectedFile, processedImage, progress, lang = 'zh' }: ProcessingStatusProps) {
  const t = {
    zh: {
      title: '處理狀態',
      loaded: '圖片載入',
      processed: '浮水印處理',
      ready: '準備下載',
      progressAria: '浮水印處理進度',
    },
    en: {
      title: 'Processing Status',
      loaded: 'Image loaded',
      processed: 'Watermark applied',
      ready: 'Ready to download',
      progressAria: 'Watermark processing progress',
    },
    ja: {
      title: '処理状況',
      loaded: '画像の読み込み',
      processed: '透かしの適用',
      ready: 'ダウンロードの準備',
      progressAria: '透かし処理の進捗',
    },
  }[lang];

  const getStatusIcon = (completed: boolean, inProgress: boolean) => {
    if (completed) return <CheckCircle className="text-green-600 w-5 h-5" />;
    if (inProgress) return <Clock className="text-blue-600 w-5 h-5 animate-spin" />;
    return <Clock className="text-gray-400 w-5 h-5" />;
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.title}</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{t.loaded}</span>
          {getStatusIcon(!!selectedFile, false)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{t.processed}</span>
          {getStatusIcon(!!processedImage, progress > 0 && progress < 100)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{t.ready}</span>
          {getStatusIcon(!!processedImage, false)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <Progress value={progress} className="w-full" aria-label={t.progressAria} />
      </div>
    </Card>
  );
}
