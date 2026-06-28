import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WatermarkPage from "@/pages/watermark";
import WatermarkEnPage from "@/pages/en/watermark";
import WatermarkPhotosOnlineEn from "@/pages/en/blog/watermark-photos-online";
import WatermarkIdDocumentsEn from "@/pages/en/blog/watermark-id-documents";
import WatermarkPhotosFreeEn from "@/pages/en/blog/watermark-photos-free";
import ProtectPhotosOnlineEn from "@/pages/en/blog/protect-photos-online";
import RentalScamPreventionEn from "@/pages/en/blog/rental-scam-prevention";
import BatchWatermarkImagesEn from "@/pages/en/blog/batch-watermark-images";
import RemoveExifDataEn from "@/pages/en/blog/remove-exif-data";
import WatermarkBestPracticesEn from "@/pages/en/blog/watermark-best-practices";
import DigitalIdentityProtectionEn from "@/pages/en/blog/digital-identity-protection";
import BlogIndexPage from "@/pages/blog/index";
import RentIdWatermarkPage from "@/pages/blog/rent-id-watermark";
import WatermarkGeneratorsRecommendationPage from "@/pages/blog/watermark-generators-recommendation";
import WatermarkTemplatesGuidePage from "@/pages/blog/watermark-templates-guide";
import PassportWatermarkGuidePage from "@/pages/blog/passport-watermark-guide";
import MobileWatermarkTutorialPage from "@/pages/blog/mobile-watermark-tutorial";
import OtherDocumentsWatermarkPage from "@/pages/blog/other-documents-watermark";
import ExifCleanPage from "@/pages/exif-clean";
import BatchPage from "@/pages/batch";
import IsIdWatermarkUsefulPage from "@/pages/blog/is-id-watermark-useful";
import BatchWatermarkMethodsPage from "@/pages/blog/batch-watermark-methods";
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
      <Route path="/en/blog/watermark-photos-online" component={WatermarkPhotosOnlineEn} />
      <Route path="/en/blog/watermark-id-documents" component={WatermarkIdDocumentsEn} />
      <Route path="/en/blog/watermark-photos-free" component={WatermarkPhotosFreeEn} />
      <Route path="/en/blog/protect-photos-online" component={ProtectPhotosOnlineEn} />
      <Route path="/en/blog/rental-scam-prevention" component={RentalScamPreventionEn} />
      <Route path="/en/blog/batch-watermark-images" component={BatchWatermarkImagesEn} />
      <Route path="/en/blog/remove-exif-data" component={RemoveExifDataEn} />
      <Route path="/en/blog/watermark-best-practices" component={WatermarkBestPracticesEn} />
      <Route path="/en/blog/digital-identity-protection" component={DigitalIdentityProtectionEn} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/rent-id-watermark" component={RentIdWatermark} />
      <Route path="/blog/watermark-generators-recommendation" component={WatermarkGeneratorsRecommendation} />
      <Route path="/blog/watermark-templates-guide" component={WatermarkTemplatesGuidePage} />
      <Route path="/blog/passport-watermark-guide" component={PassportWatermarkGuidePage} />
      <Route path="/blog/mobile-watermark-tutorial" component={MobileWatermarkTutorialPage} />
      <Route path="/blog/other-documents-watermark" component={OtherDocumentsWatermarkPage} />
      <Route path="/exif-clean" component={ExifCleanPage} />
      <Route path="/batch" component={BatchPage} />
      <Route path="/blog/is-id-watermark-useful" component={IsIdWatermarkUsefulPage} />
      <Route path="/blog/batch-watermark-methods" component={BatchWatermarkMethodsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
