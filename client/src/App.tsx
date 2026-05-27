import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WatermarkPage from "@/pages/watermark";
import ExifCleanPage from "@/pages/exif-clean";
import BlogIndexPage from "@/pages/blog/index";
import RentIdWatermarkPage from "@/pages/blog/rent-id-watermark";
import WatermarkGeneratorsRecommendationPage from "@/pages/blog/watermark-generators-recommendation";
import WatermarkTemplatesGuidePage from "@/pages/blog/watermark-templates-guide";
import PassportWatermarkGuidePage from "@/pages/blog/passport-watermark-guide";
import MobileWatermarkTutorialPage from "@/pages/blog/mobile-watermark-tutorial";
import NotFound from "@/pages/not-found";
import BlogIndex from "@/pages/blog/index";
import RentIdWatermark from "@/pages/blog/rent-id-watermark";
import WatermarkGeneratorsRecommendation from "@/pages/blog/watermark-generators-recommendation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WatermarkPage} />
      <Route path="/exif-clean" component={ExifCleanPage} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/rent-id-watermark" component={RentIdWatermark} />
      <Route path="/blog/watermark-generators-recommendation" component={WatermarkGeneratorsRecommendation} />
      <Route path="/blog/watermark-templates-guide" component={WatermarkTemplatesGuidePage} />
      <Route path="/blog/passport-watermark-guide" component={PassportWatermarkGuidePage} />
      <Route path="/blog/mobile-watermark-tutorial" component={MobileWatermarkTutorialPage} />
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
