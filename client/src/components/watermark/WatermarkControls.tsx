import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export interface WatermarkSettings {
  text: string;
  opacity: number;
  position: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
}

interface WatermarkControlsProps {
  settings: WatermarkSettings;
  onSettingsChange: (settings: Partial<WatermarkSettings>) => void;
  disabled?: boolean;
}

export function WatermarkControls({ settings, onSettingsChange, disabled }: WatermarkControlsProps) {
  const positions = [
    { value: 'top-left', label: '左上', icon: '↖' },
    { value: 'top-center', label: '中上', icon: '↑' },
    { value: 'top-right', label: '右上', icon: '↗' },
    { value: 'center-left', label: '左中', icon: '←' },
    { value: 'center', label: '中央', icon: '⊕' },
    { value: 'center-right', label: '右中', icon: '→' },
    { value: 'bottom-left', label: '左下', icon: '↙' },
    { value: 'bottom-center', label: '中下', icon: '↓' },
    { value: 'bottom-right', label: '右下', icon: '↘' },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">浮水印設定</h2>
      
      <div className="space-y-4">
        {/* Watermark Text */}
        <div>
          <Label htmlFor="watermarkText" className="block text-sm font-medium text-gray-700 mb-2">
            浮水印文字
          </Label>
          <Input
            id="watermarkText"
            placeholder="輸入浮水印文字..."
            value={settings.text}
            onChange={(e) => onSettingsChange({ text: e.target.value })}
            disabled={disabled}
          />
        </div>

        {/* Opacity Slider */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            透明度: {settings.opacity}%
          </Label>
          <Slider
            value={[settings.opacity]}
            onValueChange={(value) => onSettingsChange({ opacity: value[0] })}
            min={10}
            max={90}
            step={5}
            disabled={disabled}
            className="w-full"
          />
        </div>

        {/* Position Selection */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">浮水印位置</Label>
          <div className="grid grid-cols-3 gap-2">
            {positions.map((position) => (
              <button
                key={position.value}
                onClick={() => onSettingsChange({ position: position.value as WatermarkSettings['position'] })}
                disabled={disabled}
                className={`p-2 border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary text-xs transition-colors ${
                  settings.position === position.value 
                    ? 'border-primary bg-blue-50' 
                    : 'border-gray-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-sm block mb-1">{position.icon}</span>
                <div>{position.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">字體大小</Label>
          <Select 
            value={settings.fontSize} 
            onValueChange={(value) => onSettingsChange({ fontSize: value as WatermarkSettings['fontSize'] })}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">小 (24px)</SelectItem>
              <SelectItem value="medium">中 (36px)</SelectItem>
              <SelectItem value="large">大 (48px)</SelectItem>
              <SelectItem value="xlarge">特大 (64px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
