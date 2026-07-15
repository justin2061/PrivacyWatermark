import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUpLeft, ArrowUp, ArrowUpRight,
  ArrowLeft, Crosshair, ArrowRight,
  ArrowDownLeft, ArrowDown, ArrowDownRight,
  Repeat,
} from "lucide-react";

export type WatermarkPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'repeat';

export interface WatermarkSettings {
  mode: 'text' | 'image'; // which settings tab is currently being edited (UI state)
  // Text and logo watermarks can be enabled independently and used together
  textEnabled: boolean;
  logoEnabled: boolean;

  // --- Text watermark ---
  text: string;
  textOpacity: number; // 0-100
  textPosition: WatermarkPosition;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  color: string; // text watermark color as hex

  // --- Logo watermark ---
  logoSrc: string | null; // logo image as a data URL (never uploaded — stays local)
  logoSize: number; // logo width as a percentage of the original image width (10-50)
  logoOpacity: number; // 0-100
  logoPosition: WatermarkPosition;
}

const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];

import type { Lang } from "@/lib/tools";

interface WatermarkControlsProps {
  settings: WatermarkSettings;
  onSettingsChange: (settings: Partial<WatermarkSettings>) => void;
  disabled?: boolean;
  lang?: Lang;
}

export function WatermarkControls({ settings, onSettingsChange, disabled, lang = 'zh' }: WatermarkControlsProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [showCustomColor, setShowCustomColor] = useState(false);

  const t = {
    zh: {
      settings: '浮水印設定',
      typeLabel: '浮水印類型',
      textMode: '📝 文字浮水印',
      imageMode: '🖼️ 圖片浮水印',
      enableText: '啟用文字浮水印',
      enableLogo: '啟用圖片浮水印',
      bothHint: '✨ 文字與 Logo 浮水印可以同時使用。',
      noneHint: '⚠️ 尚未啟用任何浮水印，請在上方開啟文字或圖片浮水印。',
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
    },
    en: {
      settings: 'Watermark Settings',
      typeLabel: 'Watermark type',
      textMode: '📝 Text Watermark',
      imageMode: '🖼️ Image Watermark',
      enableText: 'Enable text watermark',
      enableLogo: 'Enable logo watermark',
      bothHint: '✨ Both text and logo watermarks can be used together.',
      noneHint: '⚠️ No watermark enabled — turn on text and/or logo above.',
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
    },
    ja: {
      settings: '透かしの設定',
      typeLabel: '透かしの種類',
      textMode: '📝 文字の透かし',
      imageMode: '🖼️ 画像の透かし',
      enableText: '文字の透かしを使う',
      enableLogo: '画像の透かしを使う',
      bothHint: '✨ 文字とロゴの透かしは同時に使えます。',
      noneHint: '⚠️ 透かしがオフになっています。上で文字またはロゴをオンにしてください。',
      watermarkText: '透かしの文字',
      textPlaceholder: '透かしに入れる文字を入力...',
      quickTemplates: '💡 かんたん入力',
      logoImage: 'ロゴ画像',
      logoPreviewAlt: 'ロゴのプレビュー',
      replace: '変更',
      remove: '削除',
      uploadLogo: 'クリックしてロゴをアップロード',
      logoFormats: 'PNG・JPG・SVG に対応、最大 5MB',
      logoLocalNote: 'ロゴも端末内だけで処理され、アップロードされません。',
      logoUploadAria: 'ロゴ画像をアップロード',
      logoSize: (n: number) => `ロゴの大きさ: ${n}%（元画像の幅に対して）`,
      opacity: (n: number) => `不透明度: ${n}%`,
      color: '文字の色',
      custom: 'カスタム...',
      customColorAria: '透かしの色をカスタム指定',
      position: '透かしの位置',
      fontSize: '文字サイズ',
      fontSmall: '小 (24px)',
      fontMedium: '中 (36px)',
      fontLarge: '大 (48px)',
      fontXlarge: '特大 (64px)',
      alertType: 'ロゴは PNG・JPG・SVG 形式のみ対応しています',
      alertSize: 'ロゴ画像は 5MB 未満にしてください',
      positionAria: (l: string) => `透かしの位置: ${l}`,
    },
  }[lang];

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
      // Uploading a logo automatically enables the logo watermark
      onSettingsChange({ logoSrc: e.target?.result as string, logoEnabled: true });
    };
    reader.readAsDataURL(file);
  };

  const colorPresets = {
    zh: [
      { value: '#000000', label: '黑' },
      { value: '#555555', label: '深灰' },
      { value: '#CC0000', label: '紅' },
      { value: '#003399', label: '深藍' },
      { value: '#FFFFFF', label: '白' },
      { value: '#006600', label: '深綠' },
    ],
    en: [
      { value: '#000000', label: 'Black' },
      { value: '#555555', label: 'Dark Gray' },
      { value: '#CC0000', label: 'Red' },
      { value: '#003399', label: 'Dark Blue' },
      { value: '#FFFFFF', label: 'White' },
      { value: '#006600', label: 'Dark Green' },
    ],
    ja: [
      { value: '#000000', label: '黒' },
      { value: '#555555', label: 'グレー' },
      { value: '#CC0000', label: '赤' },
      { value: '#003399', label: '紺' },
      { value: '#FFFFFF', label: '白' },
      { value: '#006600', label: '緑' },
    ],
  }[lang];

  const isCustomColor = !colorPresets.some(
    (p) => p.value.toLowerCase() === settings.color.toLowerCase()
  );

  // Quick templates differ by language: photographer scenarios for English,
  // ID-submission scenarios for Chinese and Japanese — that is what each
  // market actually comes here to do.
  const templates = {
    en: [
      { label: 'Portfolio', text: '© Portfolio Use Only', withDate: false },
      { label: 'Client Preview', text: 'PREVIEW - Not for Print', withDate: false },
      { label: 'Stock Photo', text: 'Sample - Licensed Use Only', withDate: false },
      { label: 'Draft', text: 'DRAFT - Do Not Distribute', withDate: false },
      { label: 'Proof', text: 'PROOF - {Your Name}', withDate: false },
      { label: 'Copyright', text: '© 2026 {Your Name}', withDate: false },
    ],
    ja: [
      { label: '賃貸', text: '{〇〇不動産} 賃貸契約用', withDate: true },
      { label: '入社', text: '{〇〇株式会社} 入社手続き用', withDate: true },
      { label: '口座開設', text: '{〇〇銀行} 口座開設用', withDate: true },
      { label: '携帯', text: '{携帯会社} 契約用', withDate: true },
      { label: '保険', text: '{〇〇生命} 保険手続き用', withDate: true },
      { label: 'クレカ', text: '{〇〇カード} 申込用', withDate: true },
      { label: '役所', text: '{自治体名} 手続き用', withDate: true },
      { label: '転職', text: '{〇〇株式会社} 選考用', withDate: true },
      { label: '本人確認', text: '{提出先} 本人確認用', withDate: true },
      { label: 'コピー', text: 'コピー・目的外使用禁止', withDate: true },
    ],
    zh: [
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
    ],
  }[lang];

  const positions = {
    zh: [
      { value: 'top-left', label: '左上', icon: ArrowUpLeft },
      { value: 'top-center', label: '中上', icon: ArrowUp },
      { value: 'top-right', label: '右上', icon: ArrowUpRight },
      { value: 'center-left', label: '左中', icon: ArrowLeft },
      { value: 'center', label: '中央', icon: Crosshair },
      { value: 'center-right', label: '右中', icon: ArrowRight },
      { value: 'bottom-left', label: '左下', icon: ArrowDownLeft },
      { value: 'bottom-center', label: '中下', icon: ArrowDown },
      { value: 'bottom-right', label: '右下', icon: ArrowDownRight },
    ],
    en: [
      { value: 'top-left', label: 'Top Left', icon: ArrowUpLeft },
      { value: 'top-center', label: 'Top Center', icon: ArrowUp },
      { value: 'top-right', label: 'Top Right', icon: ArrowUpRight },
      { value: 'center-left', label: 'Center Left', icon: ArrowLeft },
      { value: 'center', label: 'Center', icon: Crosshair },
      { value: 'center-right', label: 'Center Right', icon: ArrowRight },
      { value: 'bottom-left', label: 'Bottom Left', icon: ArrowDownLeft },
      { value: 'bottom-center', label: 'Bottom Center', icon: ArrowDown },
      { value: 'bottom-right', label: 'Bottom Right', icon: ArrowDownRight },
    ],
    ja: [
      { value: 'top-left', label: '左上', icon: ArrowUpLeft },
      { value: 'top-center', label: '上中央', icon: ArrowUp },
      { value: 'top-right', label: '右上', icon: ArrowUpRight },
      { value: 'center-left', label: '左中央', icon: ArrowLeft },
      { value: 'center', label: '中央', icon: Crosshair },
      { value: 'center-right', label: '右中央', icon: ArrowRight },
      { value: 'bottom-left', label: '左下', icon: ArrowDownLeft },
      { value: 'bottom-center', label: '下中央', icon: ArrowDown },
      { value: 'bottom-right', label: '右下', icon: ArrowDownRight },
    ],
  }[lang];

  const repeatLabel = { zh: '重複', en: 'Repeat', ja: '繰り返し' }[lang];

  // Shared 9-grid + repeat position picker (used by both text and logo panels)
  const renderPositionGrid = (
    current: WatermarkPosition,
    onChange: (p: WatermarkPosition) => void,
    controlDisabled: boolean,
  ) => (
    <div>
      <Label className="block text-sm font-medium text-gray-700 mb-2">{t.position}</Label>
      <div className="grid grid-cols-3 gap-2">
        {positions.map((position) => (
          <button
            key={position.value}
            type="button"
            onClick={() => onChange(position.value as WatermarkPosition)}
            disabled={controlDisabled}
            aria-label={t.positionAria(position.label)}
            aria-pressed={current === position.value}
            className={`p-2 border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary text-xs transition-colors ${
              current === position.value
                ? 'border-primary bg-blue-50'
                : 'border-gray-300'
            } ${controlDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <position.icon className="w-4 h-4 mx-auto mb-1" aria-hidden="true" />
            <div>{position.label}</div>
          </button>
        ))}
      </div>
      {/* Repeat / tiled pattern */}
      <button
        type="button"
        onClick={() => onChange('repeat')}
        disabled={controlDisabled}
        aria-label={t.positionAria(repeatLabel)}
        aria-pressed={current === 'repeat'}
        className={`mt-2 w-full p-2 border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary text-xs transition-colors flex items-center justify-center gap-2 ${
          current === 'repeat'
            ? 'border-primary bg-blue-50'
            : 'border-gray-300'
        } ${controlDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Repeat className="w-4 h-4" aria-hidden="true" />
        <span>{repeatLabel}</span>
      </button>
    </div>
  );

  const tabs = [
    { value: 'text', label: t.textMode, enabled: settings.textEnabled },
    { value: 'image', label: t.imageMode, enabled: settings.logoEnabled },
  ] as const;

  const textControlsDisabled = disabled || !settings.textEnabled;
  const logoControlsDisabled = disabled || !settings.logoEnabled;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.settings}</h2>

      {/* Tab switch: text vs logo (both can be enabled together) */}
      <div className="grid grid-cols-2 gap-1 p-1 mb-4 bg-gray-100 rounded-lg" role="tablist" aria-label={t.typeLabel}>
        {tabs.map((m) => (
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
            className={`relative py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              settings.mode === m.value
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {m.label}
            {/* Green dot indicates this watermark is currently enabled */}
            {m.enabled && (
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500"
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {settings.mode === 'text' ? (
        <>
        {/* Enable text watermark toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={settings.textEnabled}
            disabled={disabled}
            onChange={(e) => onSettingsChange({ textEnabled: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
          />
          <span className="text-sm font-medium text-gray-700">{t.enableText}</span>
        </label>

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
            disabled={textControlsDisabled}
          />
        </div>

        {/* Quick Templates */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">{t.quickTemplates}</p>
          <div className="flex flex-wrap gap-2">
            {templates.map(tpl => (
              <button
                key={tpl.label}
                type="button"
                disabled={textControlsDisabled}
                onClick={() => {
                  if (typeof gtag !== 'undefined') gtag('event', 'use_template');
                  if (tpl.withDate) {
                    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
                    onSettingsChange({ text: tpl.text + ' ' + today });
                  } else {
                    onSettingsChange({ text: tpl.text });
                  }
                }}
                className="px-3 py-2 text-sm rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Opacity Slider */}
        <div>
          <Label htmlFor="textOpacitySlider" className="block text-sm font-medium text-gray-700 mb-2">
            {t.opacity(settings.textOpacity)}
          </Label>
          <Slider
            id="textOpacitySlider"
            value={[settings.textOpacity]}
            onValueChange={(value) => onSettingsChange({ textOpacity: value[0] })}
            min={0}
            max={100}
            step={5}
            disabled={textControlsDisabled}
            className="w-full"
            aria-label={t.opacity(settings.textOpacity)}
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
                disabled={textControlsDisabled}
                title={preset.label}
                aria-label={preset.label}
                className={`w-9 h-9 rounded-md border transition-all ${
                  settings.color.toLowerCase() === preset.value.toLowerCase()
                    ? 'ring-2 ring-offset-2 ring-primary border-primary'
                    : 'border-gray-300'
                } ${textControlsDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ backgroundColor: preset.value }}
              />
            ))}
            <button
              type="button"
              onClick={() => setShowCustomColor((v) => !v)}
              disabled={textControlsDisabled}
              className={`px-3 h-9 rounded-md border text-sm transition-all ${
                isCustomColor
                  ? 'ring-2 ring-offset-2 ring-primary border-primary'
                  : 'border-gray-300'
              } ${textControlsDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
                disabled={textControlsDisabled}
                className="w-10 h-9 rounded border border-gray-300 cursor-pointer disabled:opacity-50"
                aria-label={t.customColorAria}
              />
              <span className="text-sm text-gray-600 uppercase">{settings.color}</span>
            </div>
          )}
        </div>

        {/* Text Position */}
        {renderPositionGrid(
          settings.textPosition,
          (p) => onSettingsChange({ textPosition: p }),
          textControlsDisabled,
        )}

        {/* Font Size — 使用原生 <select>：手機上採用系統原生選單，避免 Radix Select
            的 scroll-lock 在行動裝置造成畫面縮放／卡住。text-base 讓 iOS 不會在
            聚焦時自動放大（font-size < 16px 會觸發縮放）。 */}
        <div>
          <Label htmlFor="fontSizeSelect" className="block text-sm font-medium text-gray-700 mb-2">{t.fontSize}</Label>
          <select
            id="fontSizeSelect"
            value={settings.fontSize}
            onChange={(e) => onSettingsChange({ fontSize: e.target.value as WatermarkSettings['fontSize'] })}
            disabled={textControlsDisabled}
            aria-label={t.fontSize}
            className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="small">{t.fontSmall}</option>
            <option value="medium">{t.fontMedium}</option>
            <option value="large">{t.fontLarge}</option>
            <option value="xlarge">{t.fontXlarge}</option>
          </select>
        </div>
        </>
        ) : (
        <>
        {/* Enable logo watermark toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={settings.logoEnabled}
            disabled={disabled}
            onChange={(e) => onSettingsChange({ logoEnabled: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
          />
          <span className="text-sm font-medium text-gray-700">{t.enableLogo}</span>
        </label>

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
            disabled={logoControlsDisabled || !settings.logoSrc}
            className="w-full"
            aria-label={t.logoSize(settings.logoSize)}
          />
        </div>

        {/* Logo Opacity Slider */}
        <div>
          <Label htmlFor="logoOpacitySlider" className="block text-sm font-medium text-gray-700 mb-2">
            {t.opacity(settings.logoOpacity)}
          </Label>
          <Slider
            id="logoOpacitySlider"
            value={[settings.logoOpacity]}
            onValueChange={(value) => onSettingsChange({ logoOpacity: value[0] })}
            min={0}
            max={100}
            step={5}
            disabled={logoControlsDisabled || !settings.logoSrc}
            className="w-full"
            aria-label={t.opacity(settings.logoOpacity)}
          />
        </div>

        {/* Logo Position */}
        {renderPositionGrid(
          settings.logoPosition,
          (p) => onSettingsChange({ logoPosition: p }),
          logoControlsDisabled || !settings.logoSrc,
        )}
        </>
        )}

        {/* Status hint */}
        {settings.textEnabled && settings.logoEnabled ? (
          <p className="text-xs text-green-600">{t.bothHint}</p>
        ) : (!settings.textEnabled && !settings.logoEnabled) ? (
          <p className="text-xs text-amber-600">{t.noneHint}</p>
        ) : null}
      </div>
    </Card>
  );
}
