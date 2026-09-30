// 全站路由表。做成資料而不是 JSX，是因為 main.tsx 要在 React 掛載前就知道
// 目前網址對應哪個頁面，才能先 preload 那個 chunk（見 lib/lazyPage.tsx）。
// 順序即比對順序（第一個符合的勝出），與 wouter <Switch> 相同。
// 新增頁面：在下方宣告 lazyPage，再到 ROUTES 加一行。
import { lazyPage, type LazyPage } from "@/lib/lazyPage";
import { PAIRS } from "@/lib/convertPairs";

const WatermarkPage = lazyPage(() => import("@/pages/watermark"));
const WatermarkEnPage = lazyPage(() => import("@/pages/en/watermark"));
const WatermarkJaPage = lazyPage(() => import("@/pages/ja/watermark"));
const JaBlogIndex = lazyPage(() => import("@/pages/ja/blog/index"));
const JaIdCopyWatermark = lazyPage(() => import("@/pages/ja/blog/id-copy-watermark"));
const JaMyNumberCardCopySafe = lazyPage(() => import("@/pages/ja/blog/my-number-card-copy-safe"));
const JaDocumentWatermarkTool = lazyPage(() => import("@/pages/ja/blog/document-watermark-tool"));
const JaMyNumberCardWatermark = lazyPage(() => import("@/pages/ja/blog/my-number-card-watermark"));
const JaPassportCopyPrivacyGuide = lazyPage(() => import("@/pages/ja/blog/passport-copy-privacy-guide"));
const WatermarkPhotosOnlineEn = lazyPage(() => import("@/pages/en/blog/watermark-photos-online"));
const WatermarkIdDocumentsEn = lazyPage(() => import("@/pages/en/blog/watermark-id-documents"));
const WatermarkPhotosFreeEn = lazyPage(() => import("@/pages/en/blog/watermark-photos-free"));
const ProtectPhotosOnlineEn = lazyPage(() => import("@/pages/en/blog/protect-photos-online"));
const RentalScamPreventionEn = lazyPage(() => import("@/pages/en/blog/rental-scam-prevention"));
const BatchWatermarkImagesEn = lazyPage(() => import("@/pages/en/blog/batch-watermark-images"));
const RemoveExifDataEn = lazyPage(() => import("@/pages/en/blog/remove-exif-data"));
const WatermarkBestPracticesEn = lazyPage(() => import("@/pages/en/blog/watermark-best-practices"));
const DigitalIdentityProtectionEn = lazyPage(() => import("@/pages/en/blog/digital-identity-protection"));
const WatermarkIdBeforeSharingEn = lazyPage(() => import("@/pages/en/blog/watermark-id-before-sharing"));
const BestWatermarkGeneratorsEn = lazyPage(() => import("@/pages/en/blog/best-watermark-generators"));
const RemoveExifDataGuideEn = lazyPage(() => import("@/pages/en/blog/remove-exif-data-guide"));
const PdfWatermarkOnlineFreeEn = lazyPage(() => import("@/pages/en/blog/pdf-watermark-online-free"));
const WatermarkMyKadMalaysiaEn = lazyPage(() => import("@/pages/en/blog/watermark-mykad-malaysia"));
const WatermarkMyKadRentalEn = lazyPage(() => import("@/pages/en/blog/watermark-mykad-rental"));
const WatermarkIdBeforeKycUploadEn = lazyPage(() => import("@/pages/en/blog/watermark-id-before-kyc-upload"));
const WatermarkHkidCopy = lazyPage(() => import("@/pages/blog/watermark-hkid-copy"));
const CompressTo200kbEn = lazyPage(() => import("@/pages/en/compress-to-200kb"));
const CompressTo100kbEn = lazyPage(() => import("@/pages/en/compress-to-100kb"));
const ConvertHeicToJpgEn = lazyPage(() => import("@/pages/en/convert-heic-to-jpg"));
const ConvertPngToJpgEn = lazyPage(() => import("@/pages/en/convert-png-to-jpg"));
const ConvertWebpToJpgEn = lazyPage(() => import("@/pages/en/convert-webp-to-jpg"));
const ResizeJpgEn = lazyPage(() => import("@/pages/en/resize-jpg"));
const CropPhotoEn = lazyPage(() => import("@/pages/en/crop-photo"));
const BlurFaceEn = lazyPage(() => import("@/pages/en/blur-face"));
const WatermarkDriversLicenseUsaEn = lazyPage(() => import("@/pages/en/blog/watermark-drivers-license-usa"));
const WatermarkUkPassportCopyEn = lazyPage(() => import("@/pages/en/blog/watermark-uk-passport-copy"));
const WatermarkAustralianIdDocumentsEn = lazyPage(() => import("@/pages/en/blog/watermark-australian-id-documents"));
const WatermarkAadhaarCardIndiaEn = lazyPage(() => import("@/pages/en/blog/watermark-aadhaar-card-india"));
const RentingProtectIdDocumentsEn = lazyPage(() => import("@/pages/en/blog/renting-protect-id-documents"));
const BatchWatermarkPhotosEn = lazyPage(() => import("@/pages/en/blog/batch-watermark-photos"));
const ImageCompressionGuideEn = lazyPage(() => import("@/pages/en/blog/image-compression-guide"));
const WhatIsDigitalWatermarkEn = lazyPage(() => import("@/pages/en/blog/what-is-digital-watermark"));
const SocialMediaImageSizesEn = lazyPage(() => import("@/pages/en/blog/social-media-image-sizes"));
const EnBlogIndex = lazyPage(() => import("@/pages/en/blog/index"));
const WatermarkIdBeforeSendingKycEn = lazyPage(() => import("@/pages/en/blog/watermark-id-before-sending-kyc"));
const RealEstatePhotoWatermarkingEn = lazyPage(() => import("@/pages/en/blog/real-estate-photo-watermarking"));
const WatermarkEtsyProductPhotosEn = lazyPage(() => import("@/pages/en/blog/watermark-etsy-product-photos"));
const GdprCompliantWatermarkingEn = lazyPage(() => import("@/pages/en/blog/gdpr-compliant-watermarking"));
const IdCopyAnnotationTemplatesPage = lazyPage(() => import("@/pages/blog/id-copy-annotation-templates"));
const PassportWatermarkGuidePage = lazyPage(() => import("@/pages/blog/passport-watermark-guide"));
const PassportCopyGuidePage = lazyPage(() => import("@/pages/blog/passport-copy-guide"));
const IdPhotoGuidePage = lazyPage(() => import("@/pages/blog/id-photo-guide"));
const RealtorIdWatermarkPage = lazyPage(() => import("@/pages/blog/realtor-id-watermark"));
const HrOnboardingWatermarkSopPage = lazyPage(() => import("@/pages/blog/hr-onboarding-watermark-sop"));
const BusinessConfidentialWatermarkPage = lazyPage(() => import("@/pages/blog/business-confidential-watermark"));
const MobileWatermarkTutorialPage = lazyPage(() => import("@/pages/blog/mobile-watermark-tutorial"));
const OtherDocumentsWatermarkPage = lazyPage(() => import("@/pages/blog/other-documents-watermark"));
const PassportTravelAgencyWatermarkPage = lazyPage(() => import("@/pages/blog/passport-travel-agency-watermark"));
const ExifCleanPage = lazyPage(() => import("@/pages/exif-clean"));
const ExifCleanEnPage = lazyPage(() => import("@/pages/en/exif-clean"));
const BatchPage = lazyPage(() => import("@/pages/batch"));
const BatchEnPage = lazyPage(() => import("@/pages/en/batch"));
const CompressPage = lazyPage(() => import("@/pages/compress"));
const CompressEnPage = lazyPage(() => import("@/pages/en/compress"));
const ConvertPage = lazyPage(() => import("@/pages/convert"));
const ConvertEnPage = lazyPage(() => import("@/pages/en/convert"));
const ConvertPairPage = lazyPage(() => import("@/pages/convert-pair"));
const ConvertPairEnPage = lazyPage(() => import("@/pages/en/convert-pair"));
const ResizePage = lazyPage(() => import("@/pages/resize"));
const ResizeEnPage = lazyPage(() => import("@/pages/en/resize"));
const SocialCropPage = lazyPage(() => import("@/pages/social-crop"));
const SocialCropEnPage = lazyPage(() => import("@/pages/en/social-crop"));
const RemoveBgPage = lazyPage(() => import("@/pages/remove-bg"));
const RemoveBgEnPage = lazyPage(() => import("@/pages/en/remove-bg"));
const PdfWatermarkPage = lazyPage(() => import("@/pages/pdf-watermark"));
const PdfWatermarkEnPage = lazyPage(() => import("@/pages/en/pdf-watermark"));
const MosaicPage = lazyPage(() => import("@/pages/mosaic"));
const MosaicEnPage = lazyPage(() => import("@/pages/en/mosaic"));
const ExifCleanJaPage = lazyPage(() => import("@/pages/ja/exif-clean"));
const MosaicJaPage = lazyPage(() => import("@/pages/ja/mosaic"));
const IsIdWatermarkUsefulPage = lazyPage(() => import("@/pages/blog/is-id-watermark-useful"));
const TinypngIloveimgSquooshAlternatives = lazyPage(() => import("@/pages/blog/tinypng-iloveimg-squoosh-alternatives"));
const TinypngIloveimgSquooshAlternativesEn = lazyPage(() => import("@/pages/en/blog/tinypng-iloveimg-squoosh-alternatives"));
const BatchWatermarkMethodsPage = lazyPage(() => import("@/pages/blog/batch-watermark-methods"));
const AntiTheftPhotoWatermark = lazyPage(() => import("@/pages/blog/anti-theft-photo-watermark"));
const RentRequiredDocuments = lazyPage(() => import("@/pages/blog/rent-required-documents"));
const RentScamIdFraud = lazyPage(() => import("@/pages/blog/rent-scam-id-fraud"));
const LandlordAsksForId = lazyPage(() => import("@/pages/blog/landlord-asks-for-id"));
const BatchWatermarkGuide = lazyPage(() => import("@/pages/blog/batch-watermark-guide"));
const WhatIsExifData = lazyPage(() => import("@/pages/blog/what-is-exif-data"));
const RemoveExifOnline = lazyPage(() => import("@/pages/blog/remove-exif-online"));
const PrivacyProtectionToolkit = lazyPage(() => import("@/pages/blog/privacy-protection-toolkit"));
const PdfWatermarkOnline = lazyPage(() => import("@/pages/blog/pdf-watermark-online"));
const MosaicPhotoOnline = lazyPage(() => import("@/pages/blog/mosaic-photo-online"));
const WatermarkHkid = lazyPage(() => import("@/pages/blog/watermark-hkid"));
const ImageCompressionGuide = lazyPage(() => import("@/pages/blog/image-compression-guide"));
const IdCopyLeakedConsequences = lazyPage(() => import("@/pages/blog/id-copy-leaked-consequences"));
const RentBeforeGivingId3Things = lazyPage(() => import("@/pages/blog/rent-before-giving-id-3-things"));
const JobInterviewIdCopySafety = lazyPage(() => import("@/pages/blog/job-interview-id-copy-safety"));
const IdWatermarkCompleteGuide = lazyPage(() => import("@/pages/blog/id-watermark-complete-guide"));
const HkRentIdCopyWatermark = lazyPage(() => import("@/pages/blog/hk-rent-id-copy-watermark"));
const MalaysiaBankAccountIcWatermark = lazyPage(() => import("@/pages/blog/malaysia-bank-account-ic-watermark"));
const OverseasChinesePassportWatermark = lazyPage(() => import("@/pages/blog/overseas-chinese-passport-watermark"));
const WaitlistPage = lazyPage(() => import("@/pages/waitlist"));
export const NotFound = lazyPage(() => import("@/pages/not-found"));
const BlogIndex = lazyPage(() => import("@/pages/blog/index"));
const RentIdWatermark = lazyPage(() => import("@/pages/blog/rent-id-watermark"));
const WatermarkGeneratorsRecommendation = lazyPage(() => import("@/pages/blog/watermark-generators-recommendation"));

// 各頁 props 型別不同（多數沒有 props，少數帶 lang／pair），路由表統一用 any。
type AnyPage = LazyPage<any>;

export interface RouteDef {
  path: string;
  page: AnyPage;
  props?: Record<string, unknown>;
}

export const ROUTES: RouteDef[] = [
  { path: "/", page: WatermarkPage },
  { path: "/en", page: WatermarkEnPage },
  { path: "/en/", page: WatermarkEnPage },
  { path: "/ja", page: WatermarkJaPage },
  { path: "/ja/", page: WatermarkJaPage },
  { path: "/ja/blog", page: JaBlogIndex },
  { path: "/ja/blog/id-copy-watermark", page: JaIdCopyWatermark },
  { path: "/ja/blog/my-number-card-copy-safe", page: JaMyNumberCardCopySafe },
  { path: "/ja/blog/document-watermark-tool", page: JaDocumentWatermarkTool },
  { path: "/ja/blog/my-number-card-watermark", page: JaMyNumberCardWatermark },
  { path: "/ja/blog/passport-copy-privacy-guide", page: JaPassportCopyPrivacyGuide },
  { path: "/en/blog", page: EnBlogIndex },
  { path: "/en/blog/watermark-photos-online", page: WatermarkPhotosOnlineEn },
  { path: "/en/blog/watermark-id-documents", page: WatermarkIdDocumentsEn },
  { path: "/en/blog/watermark-photos-free", page: WatermarkPhotosFreeEn },
  { path: "/en/blog/protect-photos-online", page: ProtectPhotosOnlineEn },
  { path: "/en/blog/rental-scam-prevention", page: RentalScamPreventionEn },
  { path: "/en/blog/batch-watermark-images", page: BatchWatermarkImagesEn },
  { path: "/en/blog/remove-exif-data", page: RemoveExifDataEn },
  { path: "/en/blog/watermark-best-practices", page: WatermarkBestPracticesEn },
  { path: "/en/blog/digital-identity-protection", page: DigitalIdentityProtectionEn },
  { path: "/en/blog/watermark-id-before-sharing", page: WatermarkIdBeforeSharingEn },
  { path: "/en/blog/best-watermark-generators", page: BestWatermarkGeneratorsEn },
  { path: "/en/blog/remove-exif-data-guide", page: RemoveExifDataGuideEn },
  { path: "/en/blog/renting-protect-id-documents", page: RentingProtectIdDocumentsEn },
  { path: "/en/blog/batch-watermark-photos", page: BatchWatermarkPhotosEn },
  { path: "/en/blog/image-compression-guide", page: ImageCompressionGuideEn },
  { path: "/en/blog/what-is-digital-watermark", page: WhatIsDigitalWatermarkEn },
  { path: "/en/blog/social-media-image-sizes", page: SocialMediaImageSizesEn },
  { path: "/en/blog/watermark-id-before-sending-kyc", page: WatermarkIdBeforeSendingKycEn },
  { path: "/en/blog/real-estate-photo-watermarking", page: RealEstatePhotoWatermarkingEn },
  { path: "/en/blog/watermark-etsy-product-photos", page: WatermarkEtsyProductPhotosEn },
  { path: "/en/blog/gdpr-compliant-watermarking", page: GdprCompliantWatermarkingEn },
  { path: "/en/blog/pdf-watermark-online-free", page: PdfWatermarkOnlineFreeEn },
  { path: "/en/blog/watermark-mykad-malaysia", page: WatermarkMyKadMalaysiaEn },
  { path: "/en/blog/watermark-mykad-rental", page: WatermarkMyKadRentalEn },
  { path: "/en/blog/watermark-id-before-kyc-upload", page: WatermarkIdBeforeKycUploadEn },
  { path: "/en/blog/watermark-aadhaar-card-india", page: WatermarkAadhaarCardIndiaEn },
  { path: "/en/blog/watermark-drivers-license-usa", page: WatermarkDriversLicenseUsaEn },
  { path: "/en/blog/watermark-uk-passport-copy", page: WatermarkUkPassportCopyEn },
  { path: "/en/blog/watermark-australian-id-documents", page: WatermarkAustralianIdDocumentsEn },
  // Pro 候補名單（各工具下載完成後的 CTA 目的地）
  { path: "/waitlist", page: WaitlistPage, props: { lang: "zh" } },
  { path: "/en/waitlist", page: WaitlistPage, props: { lang: "en" } },
  { path: "/ja/waitlist", page: WaitlistPage, props: { lang: "ja" } },
  { path: "/blog", page: BlogIndex },
  { path: "/blog/rent-id-watermark", page: RentIdWatermark },
  { path: "/blog/watermark-generators-recommendation", page: WatermarkGeneratorsRecommendation },
  { path: "/blog/id-copy-annotation-templates", page: IdCopyAnnotationTemplatesPage },
  { path: "/blog/passport-watermark-guide", page: PassportWatermarkGuidePage },
  { path: "/blog/passport-copy-guide", page: PassportCopyGuidePage },
  { path: "/blog/id-photo-guide", page: IdPhotoGuidePage },
  { path: "/blog/realtor-id-watermark", page: RealtorIdWatermarkPage },
  { path: "/blog/hr-onboarding-watermark-sop", page: HrOnboardingWatermarkSopPage },
  { path: "/blog/business-confidential-watermark", page: BusinessConfidentialWatermarkPage },
  { path: "/blog/mobile-watermark-tutorial", page: MobileWatermarkTutorialPage },
  { path: "/blog/other-documents-watermark", page: OtherDocumentsWatermarkPage },
  { path: "/blog/passport-travel-agency-watermark", page: PassportTravelAgencyWatermarkPage },
  { path: "/exif-clean", page: ExifCleanPage },
  { path: "/en/exif-clean", page: ExifCleanEnPage },
  { path: "/ja/exif-clean", page: ExifCleanJaPage },
  { path: "/batch", page: BatchPage },
  { path: "/en/batch", page: BatchEnPage },
  { path: "/compress", page: CompressPage },
  { path: "/en/compress", page: CompressEnPage },
  { path: "/convert", page: ConvertPage },
  { path: "/en/convert", page: ConvertEnPage },
  // 格式對長尾頁：/convert/<slug> 與 /en/convert/<slug>（不影響上方精確路由）
  ...PAIRS.map((pair) => ({ path: `/convert/${pair.slug}`, page: ConvertPairPage, props: { pair } })),
  ...PAIRS.map((pair) => ({ path: `/en/convert/${pair.slug}`, page: ConvertPairEnPage, props: { pair } })),
  { path: "/resize", page: ResizePage },
  { path: "/en/resize", page: ResizeEnPage },
  { path: "/social-crop", page: SocialCropPage },
  { path: "/en/social-crop", page: SocialCropEnPage },
  { path: "/remove-bg", page: RemoveBgPage },
  { path: "/en/remove-bg", page: RemoveBgEnPage },
  { path: "/pdf-watermark", page: PdfWatermarkPage },
  { path: "/en/pdf-watermark", page: PdfWatermarkEnPage },
  { path: "/mosaic", page: MosaicPage },
  { path: "/en/mosaic", page: MosaicEnPage },
  { path: "/ja/mosaic", page: MosaicJaPage },
  // Programmatic SEO landing pages: long-tail queries funnel into the existing tools rather than duplicating tool logic.
  { path: "/en/compress-to-200kb", page: CompressTo200kbEn },
  { path: "/en/compress-to-100kb", page: CompressTo100kbEn },
  { path: "/en/convert-heic-to-jpg", page: ConvertHeicToJpgEn },
  { path: "/en/convert-png-to-jpg", page: ConvertPngToJpgEn },
  { path: "/en/convert-webp-to-jpg", page: ConvertWebpToJpgEn },
  { path: "/en/resize-jpg", page: ResizeJpgEn },
  { path: "/en/crop-photo", page: CropPhotoEn },
  { path: "/en/blur-face", page: BlurFaceEn },
  { path: "/blog/is-id-watermark-useful", page: IsIdWatermarkUsefulPage },
  { path: "/blog/batch-watermark-methods", page: BatchWatermarkMethodsPage },
  { path: "/blog/tinypng-iloveimg-squoosh-alternatives", page: TinypngIloveimgSquooshAlternatives },
  { path: "/blog/anti-theft-photo-watermark", page: AntiTheftPhotoWatermark },
  { path: "/blog/rent-required-documents", page: RentRequiredDocuments },
  { path: "/blog/rent-scam-id-fraud", page: RentScamIdFraud },
  { path: "/blog/landlord-asks-for-id", page: LandlordAsksForId },
  { path: "/blog/batch-watermark-guide", page: BatchWatermarkGuide },
  { path: "/blog/what-is-exif-data", page: WhatIsExifData },
  { path: "/blog/remove-exif-online", page: RemoveExifOnline },
  { path: "/blog/privacy-protection-toolkit", page: PrivacyProtectionToolkit },
  { path: "/blog/pdf-watermark-online", page: PdfWatermarkOnline },
  { path: "/blog/mosaic-photo-online", page: MosaicPhotoOnline },
  { path: "/blog/watermark-hkid", page: WatermarkHkid },
  { path: "/blog/watermark-hkid-copy", page: WatermarkHkidCopy },
  { path: "/blog/image-compression-guide", page: ImageCompressionGuide },
  { path: "/blog/id-copy-leaked-consequences", page: IdCopyLeakedConsequences },
  { path: "/blog/rent-before-giving-id-3-things", page: RentBeforeGivingId3Things },
  { path: "/blog/job-interview-id-copy-safety", page: JobInterviewIdCopySafety },
  { path: "/blog/id-watermark-complete-guide", page: IdWatermarkCompleteGuide },
  { path: "/blog/hk-rent-id-copy-watermark", page: HkRentIdCopyWatermark },
  { path: "/blog/malaysia-bank-account-ic-watermark", page: MalaysiaBankAccountIcWatermark },
  { path: "/blog/overseas-chinese-passport-watermark", page: OverseasChinesePassportWatermark },
  { path: "/en/blog/tinypng-iloveimg-squoosh-alternatives", page: TinypngIloveimgSquooshAlternativesEn },
];

/** 與 wouter 預設 parser（regexparam）相同的比對：不分大小寫、結尾斜線可有可無。 */
function normalize(path: string): string {
  return path.replace(/\/+$/, "").toLowerCase() || "/";
}

/** 找出 pathname 對應的頁面（沒有就是 404 頁）。 */
export function pageFor(pathname: string): AnyPage {
  let decoded = pathname;
  try {
    decoded = decodeURI(pathname);
  } catch {
    /* 保留原字串 */
  }
  const target = normalize(decoded);
  return ROUTES.find((r) => normalize(r.path) === target)?.page ?? NotFound;
}
