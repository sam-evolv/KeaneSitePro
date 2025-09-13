import { useLayoutEffect, useRef } from 'react';

/**
 * Custom hook that manages header scroll state using IntersectionObserver.
 * Uses a sentinel element to detect when user has scrolled past the top.
 * 
 * Returns a ref that should be attached to a sentinel div positioned at the top of the page.
 * When the sentinel is not intersecting (user has scrolled past it), adds 'scrolled' class to document.documentElement.
 * When the sentinel is intersecting (user is at the top), removes 'scrolled' class.
 */
export function useHeaderScrolled() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    
    // Unconditionally remove scrolled class first - before any checks
    // This ensures header always starts transparent, preventing FOUC
    root.classList.remove('scrolled');
    
    let raf = 0;
    let cleanup: (() => void) | null = null;
    
    const init = () => {
      const el = sentinelRef.current;
      if (!el) { 
        console.log('🔧 Sentinel not found, retrying with RAF...');
        // Retry with requestAnimationFrame until sentinel element is available
        raf = requestAnimationFrame(init); 
        return; 
      }
      
      console.log('🔧 Setting up IntersectionObserver on sentinel:', el);
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // At the top of page - remove scrolled state
            root.classList.remove('scrolled');
          } else {
            // Scrolled past sentinel - add scrolled state
            root.classList.add('scrolled');
          }
        },
        {
          // Trigger when sentinel crosses the top of the viewport
          rootMargin: '0px',
          threshold: 0
        }
      );
      
      observer.observe(el);
      console.log('🔧 Observer observing sentinel element');
      cleanup = () => observer.disconnect();
    };
    
    init();
    
    return () => { 
      console.log('🔧 useHeaderScrolled cleanup running');
      // Cancel any pending animation frames
      if (raf) cancelAnimationFrame(raf); 
      // Clean up observer
      cleanup?.(); 
      // Clean up the class when component unmounts
      root.classList.remove('scrolled'); 
    };
  }, []);

  return sentinelRef;
}