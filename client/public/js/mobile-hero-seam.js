(() => {
  // iOS still misreports viewport on address-bar show/hide. Provide a robust fallback.
  const doc = document;
  const root = doc.documentElement;

  const setVhVar = () => {
    // Use innerHeight to get the true visual viewport; translate to a CSS var.
    const vh = window.innerHeight * 0.01;
    root.style.setProperty('--vh', `${vh}px`);
  };

  // Apply var-based height if needed (older browsers)
  const applyLegacyHeight = () => {
    const hero = doc.querySelector('.hero, .hero__media, .hero-video');
    if (!hero) return;
    // If lvh/dvh unsupported or we detect a gap, force height using --vh
    const supportsLVH = CSS.supports('height', '100lvh');
    const supportsDVH = CSS.supports('height', '100dvh');
    if (!supportsLVH && !supportsDVH) {
      hero.style.height = 'calc(var(--vh, 1vh) * 100)';
    }
  };

  const repairGapIfAny = () => {
    const hero = doc.querySelector('.hero, .hero__media, .hero-video');
    const next = hero ? hero.nextElementSibling : null;
    if (!hero || !next) return;
    // If there is a visible 1–3 px seam, pull the next section up slightly.
    const rectHero = hero.getBoundingClientRect();
    const rectNext = next.getBoundingClientRect();
    const gap = Math.round(rectNext.top - rectHero.bottom);
    if (gap > 0 && gap <= 4) {
      next.style.marginTop = `${-gap}px`;   // close the seam precisely
    }
  };

  const onResize = () => {
    setVhVar();
    applyLegacyHeight();
    requestAnimationFrame(repairGapIfAny);
  };

  ['load', 'resize', 'orientationchange'].forEach(ev =>
    window.addEventListener(ev, onResize, { passive: true })
  );

  // initial run
  onResize();
})();