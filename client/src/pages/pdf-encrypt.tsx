import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { DownloadSuccess } from "@/components/DownloadSuccess";
import { ToolRecommendations } from "@/components/ToolRecommendations";
import { UploadZone } from "@/components/UploadZone";
import { ActionButtons } from "@/components/ActionButtons";
import { setPageSeo, webAppSchema, faqSchema, localeAlternates } from "@/lib/seo";
import { trackToolUseStart, trackToolEvent, trackDownloadComplete } from "@/lib/analytics";
import { encryptPdf, PdfEncryptError } from "@/lib/pdfEncryptProcessor";
import type { Lang } from "@/lib/tools";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Eye,
  EyeOff,
  FileLock2,
  Lock,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const MAX_SIZE = 100 * 1024 * 1024;
const MIN_PASSWORD = 6;

type PageLang = Exclude<Lang, "ja">;

// 中英共用同一個元件，文案集中在這張表。路由表以 props 傳 lang（見 routes.tsx）。
const T = {
  zh: {
    seoTitle: "PDF 加密碼 — 免費線上幫 PDF 設定開啟密碼，不上傳檔案",
    seoDescription:
      "免費線上 PDF 加密工具，幫 PDF 設定開啟密碼（AES-256 加密），可選擇同時禁止列印、複製與編輯。100% 在瀏覽器本機處理，PDF 與密碼都不會上傳到任何伺服器。",
    schemaName: "PDF 加密碼 — ImageMarker",
    features: [
      "100% 瀏覽器本機處理，PDF 與密碼都不上傳",
      "AES-256 加密，Acrobat、Chrome、手機閱讀器都能開",
      "可選擇同時禁止列印、複製文字與編輯",
      "免註冊、免安裝、免費",
    ],
    h1: "PDF 加密碼 — 幫 PDF 設定開啟密碼，100% 本機處理",
    uploadHeading: "上傳 PDF",
    uploadTitle: "將 PDF 拖放到此處，或點擊選擇檔案",
    uploadDesc: "支援 PDF 檔案，最大 100 MB",
    choose: "選擇檔案",
    uploadAria: "上傳 PDF 區域，點擊或拖放檔案",
    inputAria: "選擇 PDF 檔案",
    pwHeading: "設定密碼",
    pwLabel: "開啟密碼",
    pwHint: `至少 ${MIN_PASSWORD} 個字元，建議混合英文與數字`,
    confirmLabel: "再輸入一次密碼",
    show: "顯示密碼",
    hide: "隱藏密碼",
    restrict: "同時禁止列印、複製文字與編輯",
    restrictNote: "這些限制靠閱讀軟體自行遵守，部分軟體會忽略；真正擋住別人的是開啟密碼。",
    mismatch: "兩次輸入的密碼不一致",
    tooShort: `密碼至少需要 ${MIN_PASSWORD} 個字元`,
    warnTitle: "請務必記下密碼",
    warnBody: "密碼只存在你的瀏覽器裡，我們無法幫你找回。忘記密碼就打不開這份 PDF，請另外保管。",
    apply: "加密 PDF",
    applying: "加密中...",
    download: "下載加密後的 PDF",
    reset: "重新開始",
    resultHeading: "加密完成",
    resultTitle: "已產生加密版本",
    resultMeta: (name: string, size: string) => `檔名：${name}　大小：${size}`,
    resultHint: "下載後用 PDF 閱讀器打開，應該會先跳出輸入密碼的視窗。建議先開啟檢查一次再寄出。",
    errTooBig: "檔案超過 100 MB，請先壓縮或拆分",
    errType: "僅支援 PDF 檔案",
    errEncrypted: "這份 PDF 已經有密碼保護。請先用原本的密碼解除後再重新加密。",
    errInvalid: "無法讀取這份 PDF，檔案可能已損毀。",
    errFailed: "加密失敗，請換一份 PDF 再試一次。",
    featLocal: "純本地處理",
    featLocalDesc: "PDF 與密碼都不會離開你的瀏覽器，沒有伺服器，沒有上傳。",
    featAes: "AES-256 加密",
    featAesDesc: "採用 PDF 2.0 標準的 256 位元 AES，沒有密碼無法開啟內容。",
    featCompat: "到處都能開",
    featCompatDesc: "Adobe Acrobat、Chrome、Edge、Mac 預覽程式等主流閱讀器都會要求輸入密碼。",
    featuresHeading: "特色",
    faqHeading: "常見問題",
    faqs: [
      {
        q: "PDF 加密碼後，檔案會上傳到伺服器嗎？",
        a: "不會。加密在你的瀏覽器裡完成，PDF 與你輸入的密碼都不會傳到任何伺服器。你可以先斷網再操作，結果一樣。",
      },
      {
        q: "用的是哪種加密？安全嗎？",
        a: "AES-256，也就是 PDF 2.0 標準採用的演算法。真正的強度取決於密碼，建議至少 10 個字元並混合英文與數字，避免生日、手機號碼這類好猜的組合。",
      },
      {
        q: "忘記密碼可以救回來嗎？",
        a: "不行。密碼只存在你的瀏覽器，我們沒有備份；AES-256 也沒有後門。請把密碼另外保管，不要跟加密後的 PDF 放在同一封信裡。",
      },
      {
        q: "「禁止列印、複製與編輯」有多可靠？",
        a: "這是寫在 PDF 內的旗標，由閱讀軟體自行遵守，部分軟體與轉檔工具會忽略。它適合提醒用途，不適合當成防護。想擋住別人，請靠開啟密碼。",
      },
      {
        q: "可以幫已經有密碼的 PDF 換密碼嗎？",
        a: "目前不行。已加密的 PDF 需要先用原密碼解除，再重新加密。",
      },
      {
        q: "加密後的 PDF 在手機上打得開嗎？",
        a: "主流的手機閱讀器（例如 iPhone 的「檔案」App 與 Safari、Android 的 Chrome 與 Google Drive）都支援，打開時會要求輸入密碼。少數很舊的閱讀器可能不支援 AES-256，寄給對方前建議先確認。",
      },
    ],
  },
  en: {
    seoTitle: "Password Protect a PDF Online — Free, No Upload | ImageMarker",
    seoDescription:
      "Add a password to a PDF for free with AES-256 encryption, and optionally block printing, copying and editing. Runs 100% in your browser — the PDF and the password are never uploaded anywhere.",
    schemaName: "Password Protect PDF — ImageMarker",
    features: [
      "100% in-browser — the PDF and password are never uploaded",
      "AES-256 encryption that opens in Acrobat, Chrome and mobile readers",
      "Optionally block printing, copying text and editing",
      "No sign-up, no install, free",
    ],
    h1: "Password Protect a PDF Online — 100% In Your Browser",
    uploadHeading: "Upload a PDF",
    uploadTitle: "Drag a PDF here, or click to choose a file",
    uploadDesc: "PDF files up to 100 MB",
    choose: "Choose File",
    uploadAria: "PDF upload area — click or drop a file",
    inputAria: "Choose a PDF file",
    pwHeading: "Set a password",
    pwLabel: "Open password",
    pwHint: `At least ${MIN_PASSWORD} characters — mix letters and numbers`,
    confirmLabel: "Enter the password again",
    show: "Show password",
    hide: "Hide password",
    restrict: "Also block printing, copying text and editing",
    restrictNote:
      "These limits rely on the reader app to honor them and some apps ignore them. What actually keeps people out is the open password.",
    mismatch: "The two passwords don't match",
    tooShort: `Password needs at least ${MIN_PASSWORD} characters`,
    warnTitle: "Write the password down",
    warnBody:
      "The password exists only in your browser and we cannot recover it. If you forget it, this PDF cannot be opened — keep a copy somewhere safe.",
    apply: "Encrypt PDF",
    applying: "Encrypting...",
    download: "Download encrypted PDF",
    reset: "Start over",
    resultHeading: "Encrypted",
    resultTitle: "Encrypted copy ready",
    resultMeta: (name: string, size: string) => `File: ${name}  Size: ${size}`,
    resultHint:
      "Open the downloaded file in a PDF reader — it should ask for the password first. Worth checking once before you send it.",
    errTooBig: "That file is over 100 MB — compress or split it first",
    errType: "Only PDF files are supported",
    errEncrypted:
      "This PDF is already password-protected. Remove the existing password first, then encrypt it again.",
    errInvalid: "Couldn't read this PDF — the file may be damaged.",
    errFailed: "Encryption failed. Try a different PDF.",
    featLocal: "Fully local",
    featLocalDesc: "The PDF and password never leave your browser. No server, no upload.",
    featAes: "AES-256 encryption",
    featAesDesc:
      "The 256-bit AES from the PDF 2.0 standard — the contents can't be opened without the password.",
    featCompat: "Opens everywhere",
    featCompatDesc: "Adobe Acrobat, Chrome, Edge, macOS Preview and other mainstream readers prompt for the password.",
    featuresHeading: "Features",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "Is my PDF uploaded when I add a password?",
        a: "No. Encryption runs inside your browser, so neither the PDF nor the password is sent to a server. You can go offline first and get the same result.",
      },
      {
        q: "What encryption does it use, and is it secure?",
        a: "AES-256, the algorithm specified by PDF 2.0. Real-world strength depends on the password — use 10+ characters mixing letters and numbers, and avoid guessable things like birthdays or phone numbers.",
      },
      {
        q: "Can I recover the PDF if I forget the password?",
        a: "No. The password is only in your browser and we keep no copy, and AES-256 has no back door. Store the password separately — never in the same email as the encrypted PDF.",
      },
      {
        q: 'How reliable is "block printing, copying and editing"?',
        a: "It's a flag inside the PDF that reader apps choose to honor; some apps and converters ignore it. Treat it as a reminder, not protection. The open password is what keeps people out.",
      },
      {
        q: "Can I change the password on an already-protected PDF?",
        a: "Not yet. Remove the existing password with the original one first, then encrypt again.",
      },
      {
        q: "Will the encrypted PDF open on a phone?",
        a: "Mainstream mobile readers do — the Files app and Safari on iPhone, Chrome and Google Drive on Android — and ask for the password on open. A few very old readers may not support AES-256, so check with the recipient before sending.",
      },
    ],
  },
} as const;

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

export default function PdfEncryptPage({ lang = "zh" }: { lang?: PageLang }) {
  const t = T[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [restrict, setRestrict] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string; filename: string } | null>(null);

  const path = lang === "en" ? "/en/pdf-encrypt" : "/pdf-encrypt";

  useEffect(() => {
    return setPageSeo({
      title: t.seoTitle,
      description: t.seoDescription,
      canonical: `https://imagemarker.app${path}`,
      locale: lang === "en" ? "en_US" : undefined,
      alternates: localeAlternates({ zh: "/pdf-encrypt", en: "/en/pdf-encrypt" }),
      jsonLd: [
        webAppSchema({
          name: t.schemaName,
          description: t.seoDescription,
          url: `https://imagemarker.app${path}`,
          inLanguage: lang === "en" ? "en" : undefined,
          featureList: [...t.features],
        }),
        faqSchema(t.faqs.map((f) => ({ q: f.q, a: f.a }))),
      ],
    });
  }, [t, lang, path]);

  // 換結果或離開頁面時釋放 blob URL
  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const pwProblem = useMemo(() => {
    if (password.length > 0 && password.length < MIN_PASSWORD) return t.tooShort;
    if (confirm.length > 0 && confirm !== password) return t.mismatch;
    return null;
  }, [password, confirm, t]);

  const canEncrypt = !!file && !busy && password.length >= MIN_PASSWORD && confirm === password;

  const onPickFile = (picked?: File | null) => {
    if (!picked) return;
    if (picked.type !== "application/pdf" && !picked.name.toLowerCase().endsWith(".pdf")) {
      setError(t.errType);
      return;
    }
    if (picked.size > MAX_SIZE) {
      setError(t.errTooBig);
      return;
    }
    setError(null);
    setResult(null);
    setFile(picked);
    trackToolUseStart("pdf-encrypt");
    trackToolEvent("pdf_encrypt_start", "pdf-encrypt");
  };

  const onEncrypt = async () => {
    if (!file || !canEncrypt) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const blob = await encryptPdf(file, { password, restrict });
      const base = file.name.replace(/\.pdf$/i, "");
      setResult({ blob, url: URL.createObjectURL(blob), filename: `${base}-encrypted.pdf` });
      trackToolEvent("pdf_encrypt_complete", "pdf-encrypt");
    } catch (err) {
      const code = err instanceof PdfEncryptError ? err.code : "failed";
      setError(
        code === "already-encrypted" ? t.errEncrypted : code === "invalid-pdf" ? t.errInvalid : t.errFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  const onDownload = () => {
    if (!result) return;
    trackDownloadComplete("pdf-encrypt", 1);
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const onReset = () => {
    setFile(null);
    setPassword("");
    setConfirm("");
    setRestrict(false);
    setShowPw(false);
    setError(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang={lang} current="pdf-encrypt" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{t.h1}</h1>
        <PrivacyBanner lang={lang} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.uploadHeading}</h2>
              <UploadZone
                accept="application/pdf"
                onFiles={(files) => onPickFile(files[0])}
                title={t.uploadTitle}
                description={t.uploadDesc}
                buttonLabel={t.choose}
                ariaLabel={t.uploadAria}
                inputAriaLabel={t.inputAria}
                inputRef={fileInputRef}
              />
              {file && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0">
                    <CheckCircle className="text-green-600 w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium truncate">{file.name}</span>
                  </div>
                  <span className="text-xs text-gray-600 ml-2 shrink-0">{formatSize(file.size)}</span>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.pwHeading}</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="pdf-pw" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.pwLabel}
                  </label>
                  <div className="relative">
                    <input
                      id="pdf-pw"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setResult(null);
                      }}
                      autoComplete="new-password"
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                      aria-label={showPw ? t.hide : t.show}
                    >
                      {showPw ? (
                        <EyeOff className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t.pwHint}</p>
                </div>
                <div>
                  <label htmlFor="pdf-pw2" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.confirmLabel}
                  </label>
                  <input
                    id="pdf-pw2"
                    type={showPw ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      setResult(null);
                    }}
                    autoComplete="new-password"
                    className={inputClass}
                  />
                  {pwProblem && <p className="text-xs text-red-600 mt-1">{pwProblem}</p>}
                </div>
                <div>
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={restrict}
                      onChange={(e) => {
                        setRestrict(e.target.checked);
                        setResult(null);
                      }}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-800">{t.restrict}</span>
                  </label>
                  {restrict && <p className="text-xs text-gray-500 mt-1 ml-6">{t.restrictNote}</p>}
                </div>
                <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertTriangle className="text-amber-600 w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">{t.warnTitle}</p>
                    <p className="text-xs text-amber-800 mt-1">{t.warnBody}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <ActionButtons
                apply={{
                  onClick: onEncrypt,
                  disabled: !canEncrypt,
                  icon: <FileLock2 className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: busy ? t.applying : t.apply,
                }}
                download={{
                  onClick: onDownload,
                  disabled: !result,
                  icon: <Download className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: t.download,
                }}
                reset={{
                  onClick: onReset,
                  disabled: !file && !password && !confirm,
                  icon: <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />,
                  label: t.reset,
                }}
              />
            </Card>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            {result && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.resultHeading}</h2>
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <ShieldCheck className="text-green-600 w-5 h-5 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">{t.resultTitle}</p>
                    <p className="text-xs text-green-800 mt-1 break-all">
                      {t.resultMeta(result.filename, formatSize(result.blob.size))}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{t.resultHint}</p>
                <DownloadSuccess tool="pdf-encrypt" lang={lang} imageCount={1} className="mt-4" />
              </Card>
            )}
          </div>
        </div>

        {result && <ToolRecommendations current="pdf-encrypt" lang={lang} className="mt-12" />}

        <section className="mt-12">
          <h2 className="sr-only">{t.featuresHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Lock className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">{t.featLocal}</h3>
              <p className="text-sm text-gray-600">{t.featLocalDesc}</p>
            </Card>
            <Card className="p-6 text-center">
              <ShieldCheck className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">{t.featAes}</h3>
              <p className="text-sm text-gray-600">{t.featAesDesc}</p>
            </Card>
            <Card className="p-6 text-center">
              <FileLock2 className="text-primary w-8 h-8 mb-3 mx-auto" aria-hidden="true" />
              <h3 className="font-semibold text-gray-900 mb-2">{t.featCompat}</h3>
              <p className="text-sm text-gray-600">{t.featCompatDesc}</p>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.faqHeading}</h2>
          <div className="space-y-3">
            {t.faqs.map((f) => (
              <Card key={f.q} className="p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <ToolsShowcase lang={lang} exclude="pdf-encrypt" />
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
