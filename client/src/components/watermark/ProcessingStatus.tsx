import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Download } from "lucide-react";

interface ProcessingStatusProps {
  selectedFile: File | null;
  processedImage: string | null;
  progress: number;
}

export function ProcessingStatus({ selectedFile, processedImage, progress }: ProcessingStatusProps) {
  const getStatusIcon = (completed: boolean, inProgress: boolean) => {
    if (completed) return <CheckCircle className="text-green-600 w-5 h-5" />;
    if (inProgress) return <Clock className="text-blue-600 w-5 h-5 animate-spin" />;
    return <Clock className="text-gray-400 w-5 h-5" />;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">處理狀態</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">圖片載入</span>
          {getStatusIcon(!!selectedFile, false)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">浮水印處理</span>
          {getStatusIcon(!!processedImage, progress > 0 && progress < 100)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">準備下載</span>
          {getStatusIcon(!!processedImage, false)}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <Progress value={progress} className="w-full" />
      </div>
    </Card>
  );
}
