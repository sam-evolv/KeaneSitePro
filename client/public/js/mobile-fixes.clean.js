(() => {
  const doc = document;
  const html = doc.documentElement;
  const body = doc.body;

  // Measure header height and expose as CSS var
  const header = doc.querySelector('.header, .navbar');
  const setHeaderH = () => {
    const h = header ? Math.round(header.getBoundingClientRect().height) : 0;
    doc.documentElement.style.setProperty('--header-h', h + 'px');
  };
  window.addEventListener('resize', setHeaderH);
  window.addEventListener('orientationchange', setHeaderH);
  setHeaderH();

  // Add scrolled class for header legibility
  const onScroll = () => {
    const scrolled = window.scrollY > 8;
    if (header) {
      header.classList.toggle('header--scrolled', scrolled);
      header.classList.toggle('navbar--scrolled', scrolled);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggles open/close; remove any separate "X"
  const toggle = doc.querySelector('.menu-toggle, .hamburger');
  const panel  = doc.querySelector('.mobile-nav, .nav__drawer, .nav-panel');
  const killClose = doc.querySelector('.nav-close, .menu-close, .close-btn');
  if (killClose) killClose.remove();

  const setMenu = (open) => {
    html.classList.toggle('menu-open', open);
    if (panel) panel.classList.toggle('is-open', open);
    body.style.overflow = open ? 'hidden' : '';
    body.style.touchAction = open ? 'none' : '';
  };

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      setMenu(!html.classList.contains('menu-open'));
    }, { passive: false });
  }

  // Close menu on link tap
  doc.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && html.classList.contains('menu-open')) setMenu(false);
  }, { passive: true });

  // Hero video: no controls, autoplay inline, loop
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

  // Defensive: remove default margins on the element after hero to avoid gaps
  const hero = doc.querySelector('.hero, .hero__media, .hero-video');
  if (hero) {
    const next = hero.nextElementSibling;
    if (next && getComputedStyle(next).marginTop !== '0px') {
      next.style.marginTop = '0px';
    }
  }
})();