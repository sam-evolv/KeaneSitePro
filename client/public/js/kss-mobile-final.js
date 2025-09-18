(() => {
  const doc = document, html = doc.documentElement, body = doc.body;

  // Measure header height exactly (including safe-area) and expose it as a CSS var
  const header = doc.querySelector('.header, .navbar');
  const computeHeaderH = () => {
    const h = header ? Math.round(header.getBoundingClientRect().height) : 56;
    html.style.setProperty('--header-h', h + 'px');
  };
  window.addEventListener('load', computeHeaderH);
  window.addEventListener('resize', computeHeaderH);
  window.addEventListener('orientationchange', computeHeaderH);
  computeHeaderH();

  // Scroll state for header legibility
  const onScroll = () => {
    const scrolled = window.scrollY > 8;
    if (header) {
      header.classList.toggle('header--scrolled', scrolled);
      header.classList.toggle('navbar--scrolled', scrolled);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger as the only toggle; remove any dedicated "X"
  const toggle = doc.querySelector('.menu-toggle, .hamburger');
  const panel  = doc.querySelector('.mobile-nav, .nav__drawer, .nav-panel');
  ['.nav-close','.menu-close','.close-btn']
    .forEach(sel => (doc.querySelector(sel)?.remove()));

  const setMenu = (open) => {
    html.classList.toggle('menu-open', open);
    panel?.classList.toggle('is-open', open);
    body.style.overflow = open ? 'hidden' : '';
    body.style.touchAction = open ? 'none' : '';
  };
  toggle?.addEventListener('click', (e) => {
    e.preventDefault();
    setMenu(!html.classList.contains('menu-open'));
  }, { passive:false });

  // Close menu on link tap
  doc.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && html.classList.contains('menu-open')) setMenu(false);
  }, { passive:true });

  // Force hero video to autoplay inline without UI
  const vids = doc.querySelectorAll('.hero video, .hero__media video, .hero-video video');
  vids.forEach(v => {
    v.removeAttribute('controls');
    v.setAttribute('muted',''); v.setAttribute('playsinline',''); v.setAttribute('loop','');
    const tryPlay = () => v.play().catch(()=>{});
    doc.addEventListener('visibilitychange', tryPlay, { passive:true });
    tryPlay();
  });

  // Defensive: if any element after hero has a positive margin-top, remove it to avoid a black strip
  const hero = doc.querySelector('.hero, .hero__media, .hero-video');
  if (hero?.nextElementSibling) hero.nextElementSibling.style.marginTop = '0px';
})();