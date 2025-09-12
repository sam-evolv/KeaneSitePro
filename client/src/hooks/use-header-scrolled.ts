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
  const currentStateRef = useRef<boolean>(false); // Track current scrolled state
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    console.log('🔍 INIT: Hook started, sentinel element:', sentinel);
    
    if (!sentinel) {
      console.error('🔍 ERROR: Sentinel element not found!');
      return;
    }
    
    // Debug sentinel positioning
    const sentinelRect = sentinel.getBoundingClientRect();
    console.log('🔍 INIT: Sentinel position:', {
      top: sentinelRect.top,
      height: sentinelRect.height,
      width: sentinelRect.width,
      visible: sentinelRect.height > 0 && sentinelRect.width > 0
    });

    const root = document.documentElement;
    
    // Helper function to update scrolled state with defensive checks
    const updateScrollState = (shouldBeScrolled: boolean, reason: string) => {
      const currentScrollY = window.scrollY;
      
      // Defensive check: if we're at the very top, never add scrolled class
      if (currentScrollY <= 8 && shouldBeScrolled) {
        console.log('🔍 DEFENSIVE: Prevented scrolled class at top (scrollY:', currentScrollY, ')');
        shouldBeScrolled = false;
      }
      
      // Only update if state actually changed
      if (currentStateRef.current !== shouldBeScrolled) {
        currentStateRef.current = shouldBeScrolled;
        
        if (shouldBeScrolled) {
          root.classList.add('scrolled');
          console.log('🔍', reason, ': Added scrolled class (scrollY:', currentScrollY, ')');
        } else {
          root.classList.remove('scrolled');
          console.log('🔍', reason, ': Removed scrolled class (scrollY:', currentScrollY, ')');
        }
      } else {
        console.log('🔍', reason, ': No state change needed (scrollY:', currentScrollY, ', shouldBeScrolled:', shouldBeScrolled, ')');
      }
    };

    // Set initial state based on current scroll position
    const initialScrollY = window.scrollY;
    const initialShouldBeScrolled = initialScrollY > 8;
    currentStateRef.current = initialShouldBeScrolled;
    
    if (initialShouldBeScrolled) {
      root.classList.add('scrolled');
      console.log('🔍 Initial: Set scrolled state (scrollY:', initialScrollY, ')');
    } else {
      root.classList.remove('scrolled');
      console.log('🔍 Initial: Set transparent state (scrollY:', initialScrollY, ')');
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('🔍 OBSERVER: Callback fired, entries:', entries.length);
        
        // Clear any pending debounced updates
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        
        // Debounce the observer callback to prevent race conditions
        debounceTimeoutRef.current = setTimeout(() => {
          const entry = entries[0];
          const currentScrollY = window.scrollY;
          
          console.log('🔍 OBSERVER: Processing entry:', {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
            scrollY: currentScrollY
          });
          
          if (entry.isIntersecting) {
            // At the top of page - remove scrolled state
            updateScrollState(false, 'Observer(intersecting)');
          } else {
            // Scrolled past threshold - add scrolled state
            // But only if we're actually scrolled down
            updateScrollState(currentScrollY > 8, 'Observer(not-intersecting)');
          }
        }, 16); // ~1 frame delay to prevent race conditions
      },
      {
        // Use a slightly larger margin to prevent edge cases
        rootMargin: '-12px 0px 0px 0px',
        threshold: 0
      }
    );
    
    observerRef.current = observer;
    console.log('🔍 INIT: IntersectionObserver created with config:', {
      rootMargin: '-12px 0px 0px 0px',
      threshold: 0
    });

    // Backup scroll listener for additional safety
    const handleScrollBackup = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 8;
      
      // Only intervene if there's a mismatch between scroll position and class state
      const hasScrolledClass = root.classList.contains('scrolled');
      
      if (shouldBeScrolled !== hasScrolledClass) {
        console.log('🔍 BACKUP: Detected state mismatch, correcting...');
        updateScrollState(shouldBeScrolled, 'Backup-Scroll');
      }
    };

    observer.observe(sentinel);
    console.log('🔍 INIT: Started observing sentinel element');
    
    // Test immediate intersection state
    setTimeout(() => {
      const rect = sentinel.getBoundingClientRect();
      console.log('🔍 INIT: Post-observe sentinel check:', {
        rect,
        scrollY: window.scrollY,
        isVisible: rect.top < window.innerHeight && rect.bottom > 0
      });
    }, 100);
    
    // Add a throttled backup scroll listener
    let scrollTimeout: NodeJS.Timeout | null = null;
    const throttledScrollBackup = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollBackup, 100);
    };
    
    window.addEventListener('scroll', throttledScrollBackup, { passive: true });

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      window.removeEventListener('scroll', throttledScrollBackup);
      
      // Clean up the class when component unmounts
      root.classList.remove('scrolled');
      currentStateRef.current = false;
      console.log('🔍 Cleanup: Removed scrolled class and reset state');
    };
  }, []);

  return sentinelRef;
}