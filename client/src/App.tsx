import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectionNotice } from "@/components/ProtectionNotice";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import WatermarkPage from "@/pages/watermark";
import WatermarkEnPage from "@/pages/en/watermark";
import WatermarkJaPage from "@/pages/ja/watermark";
import JaBlogIndex from "@/pages/ja/blog/index";
import JaIdCopyWatermark from "@/pages/ja/blog/id-copy-watermark";
import JaMyNumberCardCopySafe from "@/pages/ja/blog/my-number-card-copy-safe";
import JaDocumentWatermarkTool from "@/pages/ja/blog/document-watermark-tool";
import WatermarkPhotosOnlineEn from "@/pages/en/blog/watermark-photos-online";
import WatermarkIdDocumentsEn from "@/pages/en/blog/watermark-id-documents";
import WatermarkPhotosFreeEn from "@/pages/en/blog/watermark-photos-free";
import ProtectPhotosOnlineEn from "@/pages/en/blog/protect-photos-online";
import RentalScamPreventionEn from "@/pages/en/blog/rental-scam-prevention";
import BatchWatermarkImagesEn from "@/pages/en/blog/batch-watermark-images";
import RemoveExifDataEn from "@/pages/en/blog/remove-exif-data";
import WatermarkBestPracticesEn from "@/pages/en/blog/watermark-best-practices";
import DigitalIdentityProtectionEn from "@/pages/en/blog/digital-identity-protection";
import WatermarkIdBeforeSharingEn from "@/pages/en/blog/watermark-id-before-sharing";
import BestWatermarkGeneratorsEn from "@/pages/en/blog/best-watermark-generators";
import RemoveExifDataGuideEn from "@/pages/en/blog/remove-exif-data-guide";
import RentingProtectIdDocumentsEn from "@/pages/en/blog/renting-protect-id-documents";
import BatchWatermarkPhotosEn from "@/pages/en/blog/batch-watermark-photos";
import ImageCompressionGuideEn from "@/pages/en/blog/image-compression-guide";
import WhatIsDigitalWatermarkEn from "@/pages/en/blog/what-is-digital-watermark";
import SocialMediaImageSizesEn from "@/pages/en/blog/social-media-image-sizes";
import EnBlogIndex from "@/pages/en/blog/index";
import WatermarkIdBeforeSendingKycEn from "@/pages/en/blog/watermark-id-before-sending-kyc";
import WatermarkTemplatesGuidePage from "@/pages/blog/watermark-templates-guide";
import PassportWatermarkGuidePage from "@/pages/blog/passport-watermark-guide";
import PassportCopyGuidePage from "@/pages/blog/passport-copy-guide";
import IdPhotoGuidePage from "@/pages/blog/id-photo-guide";
import MobileWatermarkTutorialPage from "@/pages/blog/mobile-watermark-tutorial";
import OtherDocumentsWatermarkPage from "@/pages/blog/other-documents-watermark";
import PassportTravelAgencyWatermarkPage from "@/pages/blog/passport-travel-agency-watermark";
import ExifCleanPage from "@/pages/exif-clean";
import ExifCleanEnPage from "@/pages/en/exif-clean";
import BatchPage from "@/pages/batch";
import BatchEnPage from "@/pages/en/batch";
import CompressPage from "@/pages/compress";
import CompressEnPage from "@/pages/en/compress";
import ConvertPage from "@/pages/convert";
import ConvertEnPage from "@/pages/en/convert";
import ConvertPairPage from "@/pages/convert-pair";
import ConvertPairEnPage from "@/pages/en/convert-pair";
import { PAIRS } from "@/lib/convertPairs";
import ResizePage from "@/pages/resize";
import ResizeEnPage from "@/pages/en/resize";
import SocialCropPage from "@/pages/social-crop";
import SocialCropEnPage from "@/pages/en/social-crop";
import RemoveBgPage from "@/pages/remove-bg";
import RemoveBgEnPage from "@/pages/en/remove-bg";
import PdfWatermarkPage from "@/pages/pdf-watermark";
import PdfWatermarkEnPage from "@/pages/en/pdf-watermark";
import MosaicPage from "@/pages/mosaic";
import MosaicEnPage from "@/pages/en/mosaic";
import IsIdWatermarkUsefulPage from "@/pages/blog/is-id-watermark-useful";
import TinypngIloveimgSquooshAlternatives from "@/pages/blog/tinypng-iloveimg-squoosh-alternatives";
import TinypngIloveimgSquooshAlternativesEn from "@/pages/en/blog/tinypng-iloveimg-squoosh-alternatives";
import BatchWatermarkMethodsPage from "@/pages/blog/batch-watermark-methods";
import AntiTheftPhotoWatermark from "@/pages/blog/anti-theft-photo-watermark";
import RentRequiredDocuments from "@/pages/blog/rent-required-documents";
import RentScamIdFraud from "@/pages/blog/rent-scam-id-fraud";
import LandlordAsksForId from "@/pages/blog/landlord-asks-for-id";
import BatchWatermarkGuide from "@/pages/blog/batch-watermark-guide";
import WhatIsExifData from "@/pages/blog/what-is-exif-data";
import ImageCompressionGuide from "@/pages/blog/image-compression-guide";
import IdCopyLeakedConsequences from "@/pages/blog/id-copy-leaked-consequences";
import RentBeforeGivingId3Things from "@/pages/blog/rent-before-giving-id-3-things";
import JobInterviewIdCopySafety from "@/pages/blog/job-interview-id-copy-safety";
import IdWatermarkCompleteGuide from "@/pages/blog/id-watermark-complete-guide";
import HkRentIdCopyWatermark from "@/pages/blog/hk-rent-id-copy-watermark";
import MalaysiaBankAccountIcWatermark from "@/pages/blog/malaysia-bank-account-ic-watermark";
import OverseasChinesePassportWatermark from "@/pages/blog/overseas-chinese-passport-watermark";
import WaitlistPage from "@/pages/waitlist";
import NotFound from "@/pages/not-found";
import BlogIndex from "@/pages/blog/index";
import RentIdWatermark from "@/pages/blog/rent-id-watermark";
import WatermarkGeneratorsRecommendation from "@/pages/blog/watermark-generators-recommendation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WatermarkPage} />
      <Route path="/en" component={WatermarkEnPage} />
      <Route path="/en/" component={WatermarkEnPage} />
      <Route path="/ja" component={WatermarkJaPage} />
      <Route path="/ja/" component={WatermarkJaPage} />
      <Route path="/ja/blog" component={JaBlogIndex} />
      <Route path="/ja/blog/id-copy-watermark" component={JaIdCopyWatermark} />
      <Route path="/ja/blog/my-number-card-copy-safe" component={JaMyNumberCardCopySafe} />
      <Route path="/ja/blog/document-watermark-tool" component={JaDocumentWatermarkTool} />
      <Route path="/en/blog" component={EnBlogIndex} />
      <Route path="/en/blog/watermark-photos-online" component={WatermarkPhotosOnlineEn} />
      <Route path="/en/blog/watermark-id-documents" component={WatermarkIdDocumentsEn} />
      <Route path="/en/blog/watermark-photos-free" component={WatermarkPhotosFreeEn} />
      <Route path="/en/blog/protect-photos-online" component={ProtectPhotosOnlineEn} />
      <Route path="/en/blog/rental-scam-prevention" component={RentalScamPreventionEn} />
      <Route path="/en/blog/batch-watermark-images" component={BatchWatermarkImagesEn} />
      <Route path="/en/blog/remove-exif-data" component={RemoveExifDataEn} />
      <Route path="/en/blog/watermark-best-practices" component={WatermarkBestPracticesEn} />
      <Route path="/en/blog/digital-identity-protection" component={DigitalIdentityProtectionEn} />
      <Route path="/en/blog/watermark-id-before-sharing" component={WatermarkIdBeforeSharingEn} />
      <Route path="/en/blog/best-watermark-generators" component={BestWatermarkGeneratorsEn} />
      <Route path="/en/blog/remove-exif-data-guide" component={RemoveExifDataGuideEn} />
      <Route path="/en/blog/renting-protect-id-documents" component={RentingProtectIdDocumentsEn} />
      <Route path="/en/blog/batch-watermark-photos" component={BatchWatermarkPhotosEn} />
      <Route path="/en/blog/image-compression-guide" component={ImageCompressionGuideEn} />
      <Route path="/en/blog/what-is-digital-watermark" component={WhatIsDigitalWatermarkEn} />
      <Route path="/en/blog/social-media-image-sizes" component={SocialMediaImageSizesEn} />
      <Route path="/en/blog/watermark-id-before-sending-kyc" component={WatermarkIdBeforeSendingKycEn} />
      {/* Pro 候補名單（各工具下載完成後的 CTA 目的地） */}
      <Route path="/waitlist">
        <WaitlistPage lang="zh" />
      </Route>
      <Route path="/en/waitlist">
        <WaitlistPage lang="en" />
      </Route>
      <Route path="/ja/waitlist">
        <WaitlistPage lang="ja" />
      </Route>
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/rent-id-watermark" component={RentIdWatermark} />
      <Route path="/blog/watermark-generators-recommendation" component={WatermarkGeneratorsRecommendation} />
      <Route path="/blog/watermark-templates-guide" component={WatermarkTemplatesGuidePage} />
      <Route path="/blog/passport-watermark-guide" component={PassportWatermarkGuidePage} />
      <Route path="/blog/passport-copy-guide" component={PassportCopyGuidePage} />
      <Route path="/blog/id-photo-guide" component={IdPhotoGuidePage} />
      <Route path="/blog/mobile-watermark-tutorial" component={MobileWatermarkTutorialPage} />
      <Route path="/blog/other-documents-watermark" component={OtherDocumentsWatermarkPage} />
      <Route path="/blog/passport-travel-agency-watermark" component={PassportTravelAgencyWatermarkPage} />
      <Route path="/exif-clean" component={ExifCleanPage} />
      <Route path="/en/exif-clean" component={ExifCleanEnPage} />
      <Route path="/batch" component={BatchPage} />
      <Route path="/en/batch" component={BatchEnPage} />
      <Route path="/compress" component={CompressPage} />
      <Route path="/en/compress" component={CompressEnPage} />
      <Route path="/convert" component={ConvertPage} />
      <Route path="/en/convert" component={ConvertEnPage} />
      {/* 格式對長尾頁：/convert/<slug> 與 /en/convert/<slug>（不影響上方精確路由） */}
      {PAIRS.map((pair) => (
        <Route key={`convert-${pair.slug}`} path={`/convert/${pair.slug}`}>
          <ConvertPairPage pair={pair} />
        </Route>
      ))}
      {PAIRS.map((pair) => (
        <Route key={`en-convert-${pair.slug}`} path={`/en/convert/${pair.slug}`}>
          <ConvertPairEnPage pair={pair} />
        </Route>
      ))}
      <Route path="/resize" component={ResizePage} />
      <Route path="/en/resize" component={ResizeEnPage} />
      <Route path="/social-crop" component={SocialCropPage} />
      <Route path="/en/social-crop" component={SocialCropEnPage} />
      <Route path="/remove-bg" component={RemoveBgPage} />
      <Route path="/en/remove-bg" component={RemoveBgEnPage} />
      <Route path="/pdf-watermark" component={PdfWatermarkPage} />
      <Route path="/en/pdf-watermark" component={PdfWatermarkEnPage} />
      <Route path="/mosaic" component={MosaicPage} />
      <Route path="/en/mosaic" component={MosaicEnPage} />
      <Route path="/blog/is-id-watermark-useful" component={IsIdWatermarkUsefulPage} />
      <Route path="/blog/batch-watermark-methods" component={BatchWatermarkMethodsPage} />
      <Route path="/blog/tinypng-iloveimg-squoosh-alternatives" component={TinypngIloveimgSquooshAlternatives} />
      <Route path="/blog/anti-theft-photo-watermark" component={AntiTheftPhotoWatermark} />
      <Route path="/blog/rent-required-documents" component={RentRequiredDocuments} />
      <Route path="/blog/rent-scam-id-fraud" component={RentScamIdFraud} />
      <Route path="/blog/landlord-asks-for-id" component={LandlordAsksForId} />
      <Route path="/blog/batch-watermark-guide" component={BatchWatermarkGuide} />
      <Route path="/blog/what-is-exif-data" component={WhatIsExifData} />
      <Route path="/blog/image-compression-guide" component={ImageCompressionGuide} />
      <Route path="/blog/id-copy-leaked-consequences" component={IdCopyLeakedConsequences} />
      <Route path="/blog/rent-before-giving-id-3-things" component={RentBeforeGivingId3Things} />
      <Route path="/blog/job-interview-id-copy-safety" component={JobInterviewIdCopySafety} />
      <Route path="/blog/id-watermark-complete-guide" component={IdWatermarkCompleteGuide} />
      <Route path="/blog/hk-rent-id-copy-watermark" component={HkRentIdCopyWatermark} />
      <Route path="/blog/malaysia-bank-account-ic-watermark" component={MalaysiaBankAccountIcWatermark} />
      <Route path="/blog/overseas-chinese-passport-watermark" component={OverseasChinesePassportWatermark} />
      <Route path="/en/blog/tinypng-iloveimg-squoosh-alternatives" component={TinypngIloveimgSquooshAlternativesEn} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* 全站輕度防護提醒：Electron／非官方來源／機器人（一般瀏覽器 render 為 null） */}
        <ProtectionNotice />
        {/* 手機版 PWA 安裝提示（桌面版／已安裝／關閉過皆 render 為 null） */}
        <PwaInstallPrompt />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
