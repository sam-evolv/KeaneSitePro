// scroll-nav.js
(() => {
  const SELECTORS = {
    header: 'header, .site-header, .navbar, .topbar', // first match used for height
    mobileMenu: '.navbar-collapse, .mobile-nav, .offcanvas, .menu-drawer, .mobile-menu-overlay',
    menuToggle: '.navbar-toggler, .menu-toggle, input[type="checkbox"][id*="menu"], [data-testid="button-mobile-menu"]',
    navLinks: 'a[href^="#"]',
  };

  // Find first existing element for a list of selectors
  function first(selList) {
    const candidates = selList.split(',').map(s => s.trim());
    for (const s of candidates) {
      const el = document.querySelector(s);
      if (el) return el;
    }
    return null;
  }

  function getHeaderHeight() {
    const header = first(SELECTORS.header);
    if (!header) return 0;
    const rect = header.getBoundingClientRect();
    return rect.height || header.offsetHeight || 0;
  }

  function scrollToHash(hash, behavior = 'smooth') {
    if (!hash || hash === '#') return;
    const id = hash.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;

    // Compute offset top accounting for fixed header
    const headerH = getHeaderHeight();
    const rect = target.getBoundingClientRect();
    const absoluteY = window.pageYOffset + rect.top;
    const offsetY = Math.max(absoluteY - headerH - 8, 0); // small padding

    window.scrollTo({ top: offsetY, behavior });
  }

  function closeMobileMenu() {
    const menu = first(SELECTORS.mobileMenu);
    const toggle = first(SELECTORS.menuToggle);

    // Common frameworks: Bootstrap, custom drawers, checkbox toggles
    if (menu) {
      menu.classList.remove('show', 'open', 'active', 'menu-open');
      menu.setAttribute('aria-expanded', 'false');
      // For offcanvas
      document.body.classList.remove('offcanvas-open', 'modal-open');
    }
    if (toggle) {
      // Bootstrap toggler
      toggle.setAttribute('aria-expanded', 'false');
      // Checkbox pattern
      if (toggle.type === 'checkbox') toggle.checked = false;
      // Remove active classes on icon if any
      toggle.classList.remove('is-active', 'active');
    }
    
    // Also trigger any React state updates if needed
    const evt = new Event('closeMobileMenu');
    window.dispatchEvent(evt);
  }

  function handleNavClick(e) {
    console.log('🔍 Navigation click detected', e.target, e.currentTarget);
    const a = e.target.closest('a');
    console.log('🔍 Found anchor:', a);
    if (!a) return;
    const href = a.getAttribute('href');
    console.log('🔍 Href:', href);
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    console.log('🔍 Prevented default, scrolling to:', href);

    // If we aren't on the homepage, redirect with hash
    const isHome = location.pathname === '/' || location.pathname.endsWith('index.html');
    if (!isHome) {
      location.href = '/' + href;
      return;
    }

    closeMobileMenu();
    // Slight delay to let menu close and layout settle
    setTimeout(() => scrollToHash(href), 50);
  }

  function init() {
    console.log('🚀 Scroll nav init starting...');
    // Global smooth behavior as a baseline (safe if already present)
    try {
      document.documentElement.style.scrollBehavior = 'smooth';
    } catch(_) {}

    // Use document-level event delegation to handle all navigation clicks
    // This works even when React components are dynamically rendered
    document.addEventListener('click', (e) => {
      // Check if the clicked element is a navigation link
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      // Check if it's in a navigation area
      const isInNav = link.closest('.site-header, .mobile-menu-overlay, header, nav');
      if (!isInNav) return;
      
      console.log('🔍 Navigation link clicked:', link, link.href);
      handleNavClick(e);
    }, { passive: false });

    // On load with existing hash (deep link)
    if (location.hash && document.getElementById(location.hash.slice(1))) {
      // Wait for fonts/layout, then correct-offset scroll without animation
      window.addEventListener('load', () => {
        setTimeout(() => scrollToHash(location.hash, 'auto'), 50);
      });
    }

    // Recalculate on resize/orientation change for dynamic header height
    let rAF = null;
    function onResize() {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        if (location.hash) scrollToHash(location.hash, 'auto');
      });
    }
    window.addEventListener('orientationchange', onResize);
    window.addEventListener('resize', onResize);
    
    console.log('🚀 Scroll nav init complete - using document delegation');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();