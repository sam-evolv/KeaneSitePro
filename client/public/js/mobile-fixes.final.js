(() => {
  const doc = document;
  const html = doc.documentElement;
  const body = doc.body;

  // Resolve real header height for calc()
  const header = doc.querySelector('.site-header');
  const setHeaderH = () => {
    const h = header ? Math.round(header.getBoundingClientRect().height) : 0;
    doc.documentElement.style.setProperty('--header-h', h + 'px');
  };
  window.addEventListener('resize', setHeaderH);
  window.addEventListener('orientationchange', setHeaderH);
  setHeaderH();

  // iOS viewport fix – set vh unit via CSS var (used implicitly by dvh/svh fallbacks if you add it later)
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    doc.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  setVH();

  // Header scrolled state for legibility
  const onScroll = () => {
    const scrolled = window.scrollY > 8;
    if (header) {
      header.classList.toggle('header--scrolled', scrolled);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // React handles menu state - remove conflicting vanilla JS menu management
  // Menu toggle and close are handled by React onClick events
  // Just ensure close button is accessible via data-testid but React controls visibility

  // Ensure hero video is autoplaying silently and never shows controls
  const vids = doc.querySelectorAll('.hero video, .hero__media video, .hero-video video');
  vids.forEach(v => {
    v.removeAttribute('controls');
    v.setAttribute('muted','');
    v.setAttribute('playsinline','');
    v.setAttribute('loop','');
    const tryPlay = () => v.play().catch(()=>{});
    doc.addEventListener('visibilitychange', tryPlay, { passive: true });
    tryPlay();
  });
})();