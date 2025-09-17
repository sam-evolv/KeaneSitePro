(() => {
  const doc = document;
  const html = doc.documentElement;
  const body = doc.body;

  // Measure header height and expose as CSS var
  const header = doc.querySelector('.site-header');
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
      header.classList.toggle('site-header--scrolled', scrolled);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Note: Menu management is handled by React state, removed conflicting vanilla JS

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