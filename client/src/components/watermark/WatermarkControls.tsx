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

        {/* Quick Templates */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">💡 快速套用</p>
          <div className="flex flex-wrap gap-1">
            {[
              { label: '租屋', text: '僅供 {OO房東} 租屋使用' },
              { label: '求職', text: '僅供 {OO公司} 徵才審核' },
              { label: '銀行', text: '僅供 {OO銀行} 開戶使用' },
              { label: '手機', text: '僅供 {電信公司} 申辦門號' },
              { label: '保險', text: '僅供 {OO人壽} 投保使用' },
              { label: '信用卡', text: '僅供 {OO銀行} 申辦信用卡' },
              { label: '過戶', text: '僅供 {OO} 過戶使用' },
              { label: '貸款', text: '僅供 {OO銀行} 貸款申請' },
              { label: '政府', text: '僅供 {機關名稱} 申辦使用' },
              { label: '公司', text: '僅供 {OO公司} 人資備存' },
            ].map(t => (
              <button
                key={t.label}
                type="button"
                disabled={disabled}
                onClick={() => {
                  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
                  onSettingsChange({ text: t.text + ' ' + today });
                }}
                className="px-2 py-0.5 text-xs rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition-colors"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Opacity Slider */}
        <div>
          <Label htmlFor="opacitySlider" className="block text-sm font-medium text-gray-700 mb-2">
            透明度: {settings.opacity}%
          </Label>
          <Slider
            id="opacitySlider"
            value={[settings.opacity]}
            onValueChange={(value) => onSettingsChange({ opacity: value[0] })}
            min={10}
            max={90}
            step={5}
            disabled={disabled}
            className="w-full"
            aria-label={`透明度: ${settings.opacity}%`}
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
                aria-label={`浮水印位置: ${position.label}`}
                aria-pressed={settings.position === position.value}
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
            <SelectTrigger aria-label="字體大小">
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
