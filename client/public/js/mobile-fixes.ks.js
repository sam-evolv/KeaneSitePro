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
  
  // D. Enhanced mobile menu behavior and scroll locking
  function setupMobileMenu() {
    const menuButton = document.querySelector('[data-testid="button-mobile-menu"]');
    const closeButton = document.querySelector('[data-testid="button-mobile-menu-close"]');
    const body = document.body;
    const html = document.documentElement;
    
    if (!menuButton) return;
    
    // Lock scroll when menu opens
    function lockScroll() {
      const scrollY = window.scrollY;
      body.classList.add('mobile-menu-open');
      body.style.top = `-${scrollY}px`;
    }
    
    // Restore scroll when menu closes
    function unlockScroll() {
      const scrollY = body.style.top;
      body.classList.remove('mobile-menu-open');
      body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Enhanced menu toggle behavior
    let menuOpen = false;
    
    menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!menuOpen) {
        lockScroll();
        menuOpen = true;
        console.log('🔧 Mobile menu opened with scroll lock');
      }
    }, { passive: false });
    
    // Close menu handler
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (menuOpen) {
          unlockScroll();
          menuOpen = false;
          console.log('🔧 Mobile menu closed with scroll unlock');
        }
      }, { passive: false });
    }
    
    // Close menu on navigation link tap
    document.addEventListener('click', (e) => {
      const navButton = e.target.closest('[data-testid^="nav-mobile-"]');
      const quoteButton = e.target.closest('[data-testid="button-request-quote-mobile"]');
      
      if (navButton || quoteButton) {
        if (menuOpen) {
          // Small delay to allow scroll animation
          setTimeout(() => {
            unlockScroll();
            menuOpen = false;
            console.log('🔧 Mobile menu closed after navigation');
          }, 100);
        }
      }
    }, { passive: true });
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
    setupMobileMenu();
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