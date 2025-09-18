(() => {
  const doc = document;

  // 1) Find the hero
  const hero = doc.querySelector('.hero, .hero__media, .hero-video');
  if (!hero) return;

  // 2) Find the existing logo element inside the hero overlay
  // Adjust selectors if your logo uses a different class/tag
  const logo =
    hero.querySelector('.hero__logo') ||
    hero.querySelector('.logo') ||
    hero.querySelector('img[alt*="KEANE" i]') ||
    hero.querySelector('img[alt*="Keane" i]') ||
    hero.querySelector('.hero-logo');

  if (!logo) return;

  // 3) If we've already centered it before, exit
  if (doc.getElementById('hero-logo-lock')) return;

  // 4) Create the lock wrapper and move the logo into it
  const lock = doc.createElement('div');
  lock.id = 'hero-logo-lock';

  // Move the logo node into the lock
  logo.parentNode.insertBefore(lock, logo);
  lock.appendChild(logo);

  // 5) Defensive: keep it centered across resizes/orientation
  const reflow = () => { void lock.offsetHeight; };
  ['load', 'resize', 'orientationchange'].forEach(ev =>
    window.addEventListener(ev, reflow, { passive: true })
  );
})();