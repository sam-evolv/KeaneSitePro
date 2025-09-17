/**
 * Mobile-Only JavaScript Fixes for Keane Site Services
 * Handles mobile-specific behaviors while preserving desktop experience
 */

(function() {
  'use strict';
  
  // Only run on mobile devices
  const isMobile = window.innerWidth <= 768;
  
  if (!isMobile) {
    console.log('🔧 Mobile fixes skipped - desktop device detected');
    return;
  }
  
  console.log('🔧 Mobile fixes initializing...');
  
  // A. Dynamic header height calculation for perfect viewport fill
  function updateHeaderHeight() {
    const header = document.querySelector('.site-header');
    const root = document.documentElement;
    
    if (header) {
      const headerHeight = header.getBoundingClientRect().height;
      root.style.setProperty('--header-h', `${headerHeight}px`);
      console.log(`🔧 Header height updated: ${headerHeight}px`);
    }
  }
  
  // B. Enhanced scroll state management for mobile
  function setupScrollHandler() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let ticking = false;
    
    function updateScrollState() {
      if (window.scrollY > 8) {
        document.documentElement.classList.add('scrolled');
      } else {
        document.documentElement.classList.remove('scrolled');
      }
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState(); // Initial state
  }
  
  // C. Video autoplay enforcement and control removal
  function setupVideoFixes() {
    const heroVideos = document.querySelectorAll('.hero video, .hero__media video, .hero-video');
    
    heroVideos.forEach(video => {
      // Remove any controls attributes
      video.removeAttribute('controls');
      
      // Ensure proper mobile video attributes
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('loop', '');
      video.setAttribute('autoplay', '');
      
      // Attempt to play video (handle autoplay policies)
      const tryPlay = () => {
        video.play().catch(() => {
          console.log('🔧 Video autoplay blocked by browser policy');
        });
      };
      
      // Try play on visibility change
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          tryPlay();
        }
      }, { passive: true });
      
      // Initial play attempt
      tryPlay();
    });
  }
  
  // D. Smart scroll locking based on DOM state (React-friendly)
  function setupMobileMenuScrollLock() {
    const body = document.body;
    let scrollPosition = 0;
    let isLocked = false;
    
    // Lock scroll when menu overlay is present
    function lockScroll() {
      if (isLocked) return;
      
      scrollPosition = window.scrollY;
      body.classList.add('mobile-menu-open');
      body.style.position = 'fixed';
      body.style.top = `-${scrollPosition}px`;
      body.style.width = '100%';
      isLocked = true;
      console.log('🔧 Scroll locked - mobile menu opened');
    }
    
    // Restore scroll when menu overlay is removed
    function unlockScroll() {
      if (!isLocked) return;
      
      body.classList.remove('mobile-menu-open');
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, scrollPosition);
      isLocked = false;
      console.log('🔧 Scroll unlocked - mobile menu closed');
    }
    
    // Observe DOM changes to detect React mobile menu overlay
    const observer = new MutationObserver((mutations) => {
      // Check if mobile menu overlay exists in DOM
      const mobileMenuOverlay = document.querySelector('.lg\\:hidden.fixed.inset-0.bg-charcoal');
      
      if (mobileMenuOverlay && !isLocked) {
        // Menu just opened - lock scroll
        lockScroll();
      } else if (!mobileMenuOverlay && isLocked) {
        // Menu just closed - unlock scroll
        unlockScroll();
      }
    });
    
    // Start observing DOM changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    // Periodic check as backup (in case MutationObserver misses something)
    let checkInterval = setInterval(() => {
      const mobileMenuOverlay = document.querySelector('.lg\\:hidden.fixed.inset-0.bg-charcoal');
      
      if (mobileMenuOverlay && !isLocked) {
        lockScroll();
      } else if (!mobileMenuOverlay && isLocked) {
        unlockScroll();
      }
    }, 100);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      observer.disconnect();
      clearInterval(checkInterval);
      if (isLocked) {
        unlockScroll();
      }
    });
    
    console.log('🔧 Smart mobile menu scroll lock initialized (React-friendly)');
  }
  
  // E. Orientation change handling
  function setupOrientationHandler() {
    function handleOrientationChange() {
      // Small delay to allow viewport to adjust
      setTimeout(() => {
        updateHeaderHeight();
        console.log('🔧 Orientation changed - recalculating dimensions');
      }, 100);
    }
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', updateHeaderHeight);
  }
  
  // Initialize all fixes when DOM is ready
  function initialize() {
    updateHeaderHeight();
    setupScrollHandler();
    setupVideoFixes();
    setupMobileMenuScrollLock();
    setupOrientationHandler();
    
    console.log('🔧 All mobile fixes initialized successfully');
  }
  
  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
})();