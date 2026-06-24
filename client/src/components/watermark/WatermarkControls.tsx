import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export interface WatermarkSettings {
  mode: 'text' | 'image';
  text: string;
  opacity: number;
  position: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  logoSrc: string | null; // logo image as a data URL (never uploaded — stays local)
  logoSize: number; // logo width as a percentage of the original image width (10-50)
}

const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];

interface WatermarkControlsProps {
  settings: WatermarkSettings;
  onSettingsChange: (settings: Partial<WatermarkSettings>) => void;
  disabled?: boolean;
}


export function WatermarkControls({ settings, onSettingsChange, disabled }: WatermarkControlsProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
      alert("僅支援 PNG、JPG、SVG 格式的 Logo 圖片");
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      alert("Logo 圖片請小於 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof gtag !== 'undefined') gtag('event', 'upload_logo');
      onSettingsChange({ logoSrc: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

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

      {/* Mode switch: text vs image */}
      <div className="grid grid-cols-2 gap-1 p-1 mb-4 bg-gray-100 rounded-lg" role="tablist" aria-label="浮水印類型">
        {([
          { value: 'text', label: '📝 文字浮水印' },
          { value: 'image', label: '🖼️ 圖片浮水印' },
        ] as const).map((m) => (
          <button
            key={m.value}
            type="button"
            role="tab"
            aria-selected={settings.mode === m.value}
            disabled={disabled}
            onClick={() => {
              if (typeof gtag !== 'undefined') gtag('event', 'switch_watermark_mode', { mode: m.value });
              onSettingsChange({ mode: m.value });
            }}
            className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              settings.mode === m.value
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {settings.mode === 'text' ? (
        <>
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
                  if (typeof gtag !== 'undefined') gtag('event', 'use_template');
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
        </>
        ) : (
        <>
        {/* Logo Upload */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Logo 圖片</Label>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleLogoSelect}
            className="hidden"
            aria-label="上傳 Logo 圖片"
          />
          {settings.logoSrc ? (
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <img
                src={settings.logoSrc}
                alt="Logo 預覽"
                className="w-12 h-12 object-contain rounded bg-gray-50 flex-shrink-0"
              />
              <div className="flex-1 flex gap-2">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => logoInputRef.current?.click()}
                  className="text-sm text-primary hover:underline disabled:opacity-50"
                >
                  更換
                </button>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onSettingsChange({ logoSrc: null })}
                  className="text-sm text-gray-500 hover:text-red-500 disabled:opacity-50"
                >
                  移除
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={() => logoInputRef.current?.click()}
              aria-label="上傳 Logo 圖片"
              className={`w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary hover:bg-blue-50 transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="text-3xl block mb-2" aria-hidden="true">🖼️</span>
              <p className="text-sm text-gray-600">點擊上傳 Logo</p>
              <p className="text-xs text-gray-400 mt-1">支援 PNG、JPG、SVG，最大 5MB</p>
            </button>
          )}
          <p className="text-xs text-gray-400 mt-1">Logo 也 100% 在本地處理，不會上傳。</p>
        </div>

        {/* Logo Size Slider */}
        <div>
          <Label htmlFor="logoSizeSlider" className="block text-sm font-medium text-gray-700 mb-2">
            Logo 大小: {settings.logoSize}%（佔原圖寬度）
          </Label>
          <Slider
            id="logoSizeSlider"
            value={[settings.logoSize]}
            onValueChange={(value) => onSettingsChange({ logoSize: value[0] })}
            min={10}
            max={50}
            step={5}
            disabled={disabled || !settings.logoSrc}
            className="w-full"
            aria-label={`Logo 大小: ${settings.logoSize}%`}
          />
        </div>
        </>
        )}

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

        {/* Font Size (text mode only) */}
        {settings.mode === 'text' && (
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
        )}
      </div>
    </Card>
  );
}
