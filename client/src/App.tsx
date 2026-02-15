import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";

// Import all pages
import Home from "@/pages/home";
import SiteClearOuts from "@/pages/SiteClearOuts";
import DelapodationWork from "@/pages/DelapodationWork";
import GroundPreparation from "@/pages/GroundPreparation";
import HaulageSupport from "@/pages/HaulageSupport";
import Construction from "@/pages/Construction";
import NotFound from "@/pages/not-found";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

console.log('📱 Full App component is mounting...');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Switch>
          {/* Home page */}
          <Route path="/" component={Home} />
          
          {/* Service pages */}
          <Route path="/services/site-clear-outs" component={SiteClearOuts} />
          <Route path="/services/delapodation-work" component={DelapodationWork} />
          <Route path="/services/ground-preparation" component={GroundPreparation} />
          <Route path="/services/haulage-support" component={HaulageSupport} />
          <Route path="/services/construction" component={Construction} />

          {/* 404 page */}
          <Route component={NotFound} />
        </Switch>
      </Router>
      
      {/* Toast notifications */}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;