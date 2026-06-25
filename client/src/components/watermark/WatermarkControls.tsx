import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export interface WatermarkSettings {
  mode: 'text' | 'image';
  text: string;
  opacity: number;
  position: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'repeat';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  color: string; // text watermark color as hex
  logoSrc: string | null; // logo image as a data URL (never uploaded — stays local)
  logoSize: number; // logo width as a percentage of the original image width (10-50)
}

const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];

type Lang = 'zh' | 'en';

interface WatermarkControlsProps {
  settings: WatermarkSettings;
  onSettingsChange: (settings: Partial<WatermarkSettings>) => void;
  disabled?: boolean;
  lang?: Lang;
}

export function WatermarkControls({ settings, onSettingsChange, disabled, lang = 'zh' }: WatermarkControlsProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [showCustomColor, setShowCustomColor] = useState(false);

  const t = lang === 'en' ? {
    settings: 'Watermark Settings',
    typeLabel: 'Watermark type',
    textMode: '📝 Text Watermark',
    imageMode: '🖼️ Image Watermark',
    watermarkText: 'Watermark Text',
    textPlaceholder: 'Enter watermark text...',
    quickTemplates: '💡 Quick Templates',
    logoImage: 'Logo Image',
    logoPreviewAlt: 'Logo preview',
    replace: 'Replace',
    remove: 'Remove',
    uploadLogo: 'Click to upload logo',
    logoFormats: 'PNG, JPG, SVG. Max 5MB',
    logoLocalNote: 'Your logo is also processed 100% locally and never uploaded.',
    logoUploadAria: 'Upload logo image',
    logoSize: (n: number) => `Logo Size: ${n}% (of image width)`,
    opacity: (n: number) => `Opacity: ${n}%`,
    color: 'Color',
    custom: 'Custom...',
    customColorAria: 'Custom watermark color',
    position: 'Position',
    fontSize: 'Font Size',
    fontSmall: 'Small (24px)',
    fontMedium: 'Medium (36px)',
    fontLarge: 'Large (48px)',
    fontXlarge: 'XL (64px)',
    alertType: 'Only PNG, JPG and SVG logos are supported',
    alertSize: 'Logo must be smaller than 5MB',
    positionAria: (l: string) => `Watermark position: ${l}`,
  } : {
    settings: '浮水印設定',
    typeLabel: '浮水印類型',
    textMode: '📝 文字浮水印',
    imageMode: '🖼️ 圖片浮水印',
    watermarkText: '浮水印文字',
    textPlaceholder: '輸入浮水印文字...',
    quickTemplates: '💡 快速套用',
    logoImage: 'Logo 圖片',
    logoPreviewAlt: 'Logo 預覽',
    replace: '更換',
    remove: '移除',
    uploadLogo: '點擊上傳 Logo',
    logoFormats: '支援 PNG、JPG、SVG，最大 5MB',
    logoLocalNote: 'Logo 也 100% 在本地處理，不會上傳。',
    logoUploadAria: '上傳 Logo 圖片',
    logoSize: (n: number) => `Logo 大小: ${n}%（佔原圖寬度）`,
    opacity: (n: number) => `透明度: ${n}%`,
    color: '浮水印顏色',
    custom: '自訂...',
    customColorAria: '自訂浮水印顏色',
    position: '浮水印位置',
    fontSize: '字體大小',
    fontSmall: '小 (24px)',
    fontMedium: '中 (36px)',
    fontLarge: '大 (48px)',
    fontXlarge: '特大 (64px)',
    alertType: '僅支援 PNG、JPG、SVG 格式的 Logo 圖片',
    alertSize: 'Logo 圖片請小於 5MB',
    positionAria: (l: string) => `浮水印位置: ${l}`,
  };

  const handleLogoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
      alert(t.alertType);
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      alert(t.alertSize);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof gtag !== 'undefined') gtag('event', 'upload_logo');
      onSettingsChange({ logoSrc: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const colorPresets = lang === 'en' ? [
    { value: '#000000', label: 'Black' },
    { value: '#555555', label: 'Dark Gray' },
    { value: '#CC0000', label: 'Red' },
    { value: '#003399', label: 'Dark Blue' },
    { value: '#FFFFFF', label: 'White' },
    { value: '#006600', label: 'Dark Green' },
  ] : [
    { value: '#000000', label: '黑' },
    { value: '#555555', label: '深灰' },
    { value: '#CC0000', label: '紅' },
    { value: '#003399', label: '深藍' },
    { value: '#FFFFFF', label: '白' },
    { value: '#006600', label: '深綠' },
  ];

  const isCustomColor = !colorPresets.some(
    (p) => p.value.toLowerCase() === settings.color.toLowerCase()
  );

  // Quick templates differ by language: photographer scenarios for English
  const templates = lang === 'en' ? [
    { label: 'Portfolio', text: '© Portfolio Use Only', withDate: false },
    { label: 'Client Preview', text: 'PREVIEW - Not for Print', withDate: false },
    { label: 'Stock Photo', text: 'Sample - Licensed Use Only', withDate: false },
    { label: 'Draft', text: 'DRAFT - Do Not Distribute', withDate: false },
    { label: 'Proof', text: 'PROOF - {Your Name}', withDate: false },
    { label: 'Copyright', text: '© 2026 {Your Name}', withDate: false },
  ] : [
    { label: '租屋', text: '僅供 {OO房東} 租屋使用', withDate: true },
    { label: '求職', text: '僅供 {OO公司} 徵才審核', withDate: true },
    { label: '銀行', text: '僅供 {OO銀行} 開戶使用', withDate: true },
    { label: '手機', text: '僅供 {電信公司} 申辦門號', withDate: true },
    { label: '保險', text: '僅供 {OO人壽} 投保使用', withDate: true },
    { label: '信用卡', text: '僅供 {OO銀行} 申辦信用卡', withDate: true },
    { label: '過戶', text: '僅供 {OO} 過戶使用', withDate: true },
    { label: '貸款', text: '僅供 {OO銀行} 貸款申請', withDate: true },
    { label: '政府', text: '僅供 {機關名稱} 申辦使用', withDate: true },
    { label: '公司', text: '僅供 {OO公司} 人資備存', withDate: true },
  ];

  const positions = lang === 'en' ? [
    { value: 'top-left', label: 'Top Left', icon: '↖' },
    { value: 'top-center', label: 'Top Center', icon: '↑' },
    { value: 'top-right', label: 'Top Right', icon: '↗' },
    { value: 'center-left', label: 'Center Left', icon: '←' },
    { value: 'center', label: 'Center', icon: '⊕' },
    { value: 'center-right', label: 'Center Right', icon: '→' },
    { value: 'bottom-left', label: 'Bottom Left', icon: '↙' },
    { value: 'bottom-center', label: 'Bottom Center', icon: '↓' },
    { value: 'bottom-right', label: 'Bottom Right', icon: '↘' },
  ] : [
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

  const repeatLabel = lang === 'en' ? 'Repeat' : '重複';

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.settings}</h2>

      {/* Mode switch: text vs image */}
      <div className="grid grid-cols-2 gap-1 p-1 mb-4 bg-gray-100 rounded-lg" role="tablist" aria-label={t.typeLabel}>
        {([
          { value: 'text', label: t.textMode },
          { value: 'image', label: t.imageMode },
        ] as const).map((m) => (
          <button
            key={m.value}
            type="button"
            role="tab"
            aria-selected={settings.mode === m.value}
            disabled={disabled}
            onClick={() => {
              if (typeof gtag !== 'undefined') gtag('event', 'switch_watermark_mode', { mode: m.value });
              onSettingsChange({ mode: m.value as WatermarkSettings['mode'] });
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
            {t.watermarkText}
          </Label>
          <Input
            id="watermarkText"
            placeholder={t.textPlaceholder}
            value={settings.text}
            onChange={(e) => onSettingsChange({ text: e.target.value })}
            disabled={disabled}
          />
        </div>

        {/* Quick Templates */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">{t.quickTemplates}</p>
          <div className="flex flex-wrap gap-1">
            {templates.map(tpl => (
              <button
                key={tpl.label}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (typeof gtag !== 'undefined') gtag('event', 'use_template');
                  if (tpl.withDate) {
                    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
                    onSettingsChange({ text: tpl.text + ' ' + today });
                  } else {
                    onSettingsChange({ text: tpl.text });
                  }
                }}
                className="px-2 py-0.5 text-xs rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition-colors"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>
        </>
        ) : (
        <>
        {/* Logo Upload */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">{t.logoImage}</Label>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleLogoSelect}
            className="hidden"
            aria-label={t.logoUploadAria}
          />
          {settings.logoSrc ? (
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <img
                src={settings.logoSrc}
                alt={t.logoPreviewAlt}
                className="w-12 h-12 object-contain rounded bg-gray-50 flex-shrink-0"
              />
              <div className="flex-1 flex gap-2">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => logoInputRef.current?.click()}
                  className="text-sm text-primary hover:underline disabled:opacity-50"
                >
                  {t.replace}
                </button>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onSettingsChange({ logoSrc: null })}
                  className="text-sm text-gray-500 hover:text-red-500 disabled:opacity-50"
                >
                  {t.remove}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={() => logoInputRef.current?.click()}
              aria-label={t.logoUploadAria}
              className={`w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary hover:bg-blue-50 transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="text-3xl block mb-2" aria-hidden="true">🖼️</span>
              <p className="text-sm text-gray-600">{t.uploadLogo}</p>
              <p className="text-xs text-gray-400 mt-1">{t.logoFormats}</p>
            </button>
          )}
          <p className="text-xs text-gray-400 mt-1">{t.logoLocalNote}</p>
        </div>

        {/* Logo Size Slider */}
        <div>
          <Label htmlFor="logoSizeSlider" className="block text-sm font-medium text-gray-700 mb-2">
            {t.logoSize(settings.logoSize)}
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
            aria-label={t.logoSize(settings.logoSize)}
          />
        </div>
        </>
        )}

        {/* Opacity Slider */}
        <div>
          <Label htmlFor="opacitySlider" className="block text-sm font-medium text-gray-700 mb-2">
            {t.opacity(settings.opacity)}
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
            aria-label={t.opacity(settings.opacity)}
          />
        </div>

        {/* Color Selection */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">{t.color}</Label>
          <div className="flex flex-wrap items-center gap-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => onSettingsChange({ color: preset.value })}
                disabled={disabled}
                title={preset.label}
                aria-label={preset.label}
                className={`w-9 h-9 rounded-md border transition-all ${
                  settings.color.toLowerCase() === preset.value.toLowerCase()
                    ? 'ring-2 ring-offset-2 ring-primary border-primary'
                    : 'border-gray-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ backgroundColor: preset.value }}
              />
            ))}
            <button
              type="button"
              onClick={() => setShowCustomColor((v) => !v)}
              disabled={disabled}
              className={`px-3 h-9 rounded-md border text-sm transition-all ${
                isCustomColor
                  ? 'ring-2 ring-offset-2 ring-primary border-primary'
                  : 'border-gray-300'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {t.custom}
            </button>
          </div>
          {(showCustomColor || isCustomColor) && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="color"
                value={settings.color}
                onChange={(e) => onSettingsChange({ color: e.target.value })}
                disabled={disabled}
                className="w-10 h-9 rounded border border-gray-300 cursor-pointer disabled:opacity-50"
                aria-label={t.customColorAria}
              />
              <span className="text-sm text-gray-600 uppercase">{settings.color}</span>
            </div>
          )}
        </div>

        {/* Position Selection */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">{t.position}</Label>
          <div className="grid grid-cols-3 gap-2">
            {positions.map((position) => (
              <button
                key={position.value}
                onClick={() => onSettingsChange({ position: position.value as WatermarkSettings['position'] })}
                disabled={disabled}
                aria-label={t.positionAria(position.label)}
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
          {/* Repeat / tiled pattern */}
          <button
            onClick={() => onSettingsChange({ position: 'repeat' })}
            disabled={disabled}
            aria-label={t.positionAria(repeatLabel)}
            aria-pressed={settings.position === 'repeat'}
            className={`mt-2 w-full p-2 border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary text-xs transition-colors flex items-center justify-center gap-2 ${
              settings.position === 'repeat'
                ? 'border-primary bg-blue-50'
                : 'border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="text-sm" aria-hidden="true">🔄</span>
            <span>{repeatLabel}</span>
          </button>
        </div>

        {/* Font Size (text mode only) */}
        {settings.mode === 'text' && (
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">{t.fontSize}</Label>
          <Select
            value={settings.fontSize}
            onValueChange={(value) => onSettingsChange({ fontSize: value as WatermarkSettings['fontSize'] })}
            disabled={disabled}
          >
            <SelectTrigger aria-label={t.fontSize}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">{t.fontSmall}</SelectItem>
              <SelectItem value="medium">{t.fontMedium}</SelectItem>
              <SelectItem value="large">{t.fontLarge}</SelectItem>
              <SelectItem value="xlarge">{t.fontXlarge}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        )}
      </div>
    </Card>
  );
}
