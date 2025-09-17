(() => {
  const doc = document;
  const html = doc.documentElement;
  const body = doc.body;

  // Resolve real header height for calc()
  const header = doc.querySelector('.header, .navbar');
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
      header.classList.toggle('navbar--scrolled', scrolled);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger acts as open/close toggle. Remove any separate X if present.
  const toggle = doc.querySelector('.menu-toggle, .hamburger');
  const menuPanel = doc.querySelector('.mobile-nav, .nav__drawer, .nav-panel');
  const killClose = doc.querySelector('.nav-close, .menu-close, .close-btn');
  if (killClose) killClose.remove();

  const setMenu = (open) => {
    html.classList.toggle('menu-open', open);
    if (menuPanel) menuPanel.classList.toggle('is-open', open);
    body.style.overflow = open ? 'hidden' : '';
    body.style.touchAction = open ? 'none' : '';
  };

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      setMenu(!html.classList.contains('menu-open'));
    }, { passive: false });
  }

  // Close menu on nav link tap
  doc.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && html.classList.contains('menu-open')) setMenu(false);
  }, { passive: true });

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