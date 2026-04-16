import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WatermarkPage from "@/pages/watermark";
import BlogIndexPage from "@/pages/blog/index";
import RentIdWatermarkPage from "@/pages/blog/rent-id-watermark";
import WatermarkGeneratorsRecommendationPage from "@/pages/blog/watermark-generators-recommendation";
import WatermarkTemplatesGuidePage from "@/pages/blog/watermark-templates-guide";
import NotFound from "@/pages/not-found";
import BlogIndex from "@/pages/blog/index";
import RentIdWatermark from "@/pages/blog/rent-id-watermark";
import WatermarkGeneratorsRecommendation from "@/pages/blog/watermark-generators-recommendation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WatermarkPage} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/rent-id-watermark" component={RentIdWatermark} />
      <Route path="/blog/watermark-generators-recommendation" component={WatermarkGeneratorsRecommendation} />
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
