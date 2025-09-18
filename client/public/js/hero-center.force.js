(() => {
  console.log('🎯 Hero centering script starting...');
  
  const doc = document;

  const executeCenter = () => {
    console.log('🎯 Executing hero center...');
    
    // 1) Locate your existing overlay container
    const overlay = doc.querySelector('.hero__overlay, .hero .overlay, .hero__content');
    console.log('🎯 Found overlay:', overlay ? overlay.className : 'NOT FOUND');
    
    const hero = overlay ? overlay.closest('.hero, .hero__media, .hero-video') : null;
    console.log('🎯 Found hero:', hero ? hero.className : 'NOT FOUND');
    
    if (!overlay || !hero) {
      console.log('🎯 No overlay or hero found, exiting');
      return false;
    }

    // 2) Create the hard-center wrapper
    const lock = doc.createElement('div');
    lock.id = 'hero-centroid-lock';
    console.log('🎯 Created centroid lock wrapper');

    // 3) Move ALL children of your overlay into the lock (logo, headings, buttons)
    const childCount = overlay.children.length;
    console.log('🎯 Moving', childCount, 'children from overlay to lock');
    
    while (overlay.firstChild) lock.appendChild(overlay.firstChild);

    // 4) Append the lock inside the hero (not inside overlay anymore)
    hero.appendChild(lock);
    console.log('🎯 Appended lock to hero');

    // 5) Remove empty overlay node to avoid stray styles
    overlay.remove();
    console.log('🎯 Removed original overlay');

    // 6) Defensive: recenter on font load/resize/orientation
    const recalc = () => {
      // no calculations needed—translate(-50%, -50%) handles all states,
      // but forcing a reflow after orientation changes keeps some mobile UAs honest
      void lock.offsetHeight;
    };
    ['load','resize','orientationchange'].forEach(ev =>
      window.addEventListener(ev, recalc, { passive: true })
    );

    console.log('🎯 Hero centering complete!');
    
    // Add unmistakable visual indicator
    document.body.style.setProperty('--centering-active', 'YES');
    lock.style.setProperty('border', '5px solid red', 'important');
    lock.style.setProperty('box-shadow', '0 0 20px yellow', 'important');
    
    return true;
  };

  // Try immediately
  if (executeCenter()) return;

  // If not found, wait for DOM and try again
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', () => {
      console.log('🎯 DOM loaded, trying again...');
      if (!executeCenter()) {
        // Still not ready, keep trying for React mounting
        setTimeout(executeCenter, 100);
        setTimeout(executeCenter, 300);
        setTimeout(executeCenter, 600);
        setTimeout(executeCenter, 1200);
        setTimeout(executeCenter, 2000);
      }
    });
  } else {
    // Already loaded, try after delays for React rendering
    console.log('🎯 DOM already ready, scheduling retries...');
    setTimeout(executeCenter, 100);
    setTimeout(executeCenter, 300);
    setTimeout(executeCenter, 600);
    setTimeout(executeCenter, 1200);
    setTimeout(executeCenter, 2000);
    setTimeout(executeCenter, 3000);
  }
})();