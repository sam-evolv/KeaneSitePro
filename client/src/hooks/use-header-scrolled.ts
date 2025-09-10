import { useEffect, useRef } from 'react';

/**
 * Custom hook that manages header scroll state using IntersectionObserver.
 * Uses a sentinel element to detect when user has scrolled past 8px.
 * 
 * Returns a ref that should be attached to a sentinel div positioned at the top of the page.
 * When the sentinel is not intersecting (user has scrolled past it), adds 'scrolled' class to document.documentElement.
 * When the sentinel is intersecting (user is at the top), removes 'scrolled' class.
 */
export function useHeaderScrolled() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const root = document.documentElement;
    
    // Set initial state based on current scroll position
    const initialScrollY = window.scrollY;
    if (initialScrollY > 8) {
      root.classList.add('scrolled');
      console.log('🔍 Initial scroll state: scrolled (scrollY:', initialScrollY, ')');
    } else {
      root.classList.remove('scrolled');
      console.log('🔍 Initial scroll state: not scrolled (scrollY:', initialScrollY, ')');
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const currentScrollY = window.scrollY;
        
        if (entry.isIntersecting) {
          // At the top of page - remove scrolled state
          root.classList.remove('scrolled');
          console.log('🔍 Observer: at top - removed scrolled class (scrollY:', currentScrollY, ')');
        } else {
          // Scrolled past threshold - add scrolled state
          root.classList.add('scrolled');
          console.log('🔍 Observer: scrolled past threshold - added scrolled class (scrollY:', currentScrollY, ')');
        }
      },
      {
        // Trigger when element moves 8px from the top
        rootMargin: '-8px 0px 0px 0px',
        threshold: 0
      }
    );

    // Fallback scroll listener in case IntersectionObserver fails
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 8;
      const isCurrentlyScrolled = root.classList.contains('scrolled');
      
      if (shouldBeScrolled && !isCurrentlyScrolled) {
        root.classList.add('scrolled');
        console.log('🔍 Fallback scroll: added scrolled class (scrollY:', scrollY, ')');
      } else if (!shouldBeScrolled && isCurrentlyScrolled) {
        root.classList.remove('scrolled');
        console.log('🔍 Fallback scroll: removed scrolled class (scrollY:', scrollY, ')');
      }
    };

    observer.observe(sentinel);
    
    // Add passive scroll listener as fallback
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      // Clean up the class when component unmounts
      root.classList.remove('scrolled');
      console.log('🔍 Cleanup: removed scrolled class');
    };
  }, []);

  return sentinelRef;
}