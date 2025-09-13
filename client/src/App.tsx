import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import SiteClearOuts from "@/pages/SiteClearOuts";
import WasteRemoval from "@/pages/WasteRemoval";
import GroundPreparation from "@/pages/GroundPreparation";
import HaulageSupport from "@/pages/HaulageSupport";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/#:section" component={Home} />
      <Route path="/services/site-clear-outs" component={SiteClearOuts} />
      <Route path="/services/waste-removal" component={WasteRemoval} />
      <Route path="/services/ground-preparation" component={GroundPreparation} />
      <Route path="/services/haulage-support" component={HaulageSupport} />
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
