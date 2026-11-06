// PDF 加密碼：整個流程在瀏覽器內完成，檔案與密碼都不會離開裝置。
//
// 用 @cantoo/pdf-lib（pdf-lib 的分支）而不是原本的 pdf-lib，因為原版沒有加密功能。
// 預設演算法是 AES-256（PDF 2.0 / R6），Acrobat、Chrome、Edge、Preview、
// 手機內建閱讀器都能開。套件很大，所以用動態載入，只有這個工具頁會下載。

export interface PdfEncryptOptions {
  /** 開啟文件時要輸入的密碼 */
  password: string;
  /** 另外禁止列印、複製文字與編輯 */
  restrict: boolean;
}

export type PdfEncryptErrorCode = "already-encrypted" | "invalid-pdf" | "failed";

export class PdfEncryptError extends Error {
  constructor(public code: PdfEncryptErrorCode) {
    super(code);
  }
}

const ALLOW_ALL = {
  printing: "highResolution",
  modifying: true,
  copying: true,
  annotating: true,
  fillingForms: true,
  contentAccessibility: true,
  documentAssembly: true,
} as const;

const RESTRICTED = {
  printing: false,
  modifying: false,
  copying: false,
  annotating: false,
  fillingForms: false,
  contentAccessibility: true, // 螢幕閱讀器需要，保留
  documentAssembly: false,
} as const;

// 密碼學等級的隨機字串，給「限制權限」用的擁有者密碼——使用者不需要知道它。
function randomOwnerPassword(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function encryptPdf(file: File, opts: PdfEncryptOptions): Promise<Blob> {
  const { PDFDocument } = await import("@cantoo/pdf-lib");

  let doc;
  try {
    doc = await PDFDocument.load(await file.arrayBuffer());
  } catch (err) {
    const name = err instanceof Error ? err.constructor.name : "";
    throw new PdfEncryptError(name === "EncryptedPDFError" ? "already-encrypted" : "invalid-pdf");
  }

  try {
    doc.encrypt({
      userPassword: opts.password,
      // 不限制權限時，擁有者密碼與開啟密碼相同：知道密碼的人就是完整權限。
      ownerPassword: opts.restrict ? randomOwnerPassword() : opts.password,
      // 函式庫在沒傳 permissions 時預設「全部禁止」（P = 0xfffff0c0），
      // 所以不限制時必須明確寫成全部允許，否則有些閱讀器即使輸入密碼也不給列印。
      permissions: opts.restrict ? RESTRICTED : ALLOW_ALL,
    });
    const bytes = await doc.save();
    return new Blob([bytes], { type: "application/pdf" });
  } catch {
    throw new PdfEncryptError("failed");
  }
}
