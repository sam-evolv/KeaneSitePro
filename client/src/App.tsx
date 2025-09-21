import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";

// Import all pages
import Home from "@/pages/home";
import SiteClearOuts from "@/pages/SiteClearOuts";
import WasteRemoval from "@/pages/WasteRemoval";
import GroundPreparation from "@/pages/GroundPreparation";
import HaulageSupport from "@/pages/HaulageSupport";
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
  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Get header height for proper offset
          const header = document.querySelector('.site-header') as HTMLElement;
          const headerHeight = header ? header.offsetHeight : 126;
          const elementPosition = element.offsetTop - headerHeight - 20;
          
          setTimeout(() => {
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    // Handle hash on initial load
    handleHashNavigation();
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Switch>
          {/* Home page */}
          <Route path="/" component={Home} />
          
          {/* Service pages */}
          <Route path="/services/site-clear-outs" component={SiteClearOuts} />
          <Route path="/services/waste-removal" component={WasteRemoval} />
          <Route path="/services/ground-preparation" component={GroundPreparation} />
          <Route path="/services/haulage-support" component={HaulageSupport} />
          
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