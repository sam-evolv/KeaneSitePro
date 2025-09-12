(function(){
  const root   = document.documentElement;
  const header = document.querySelector('.site-header');

  // 1) Header state: transparent → black
  const applyScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) root.classList.add('scrolled');
    else root.classList.remove('scrolled');
  };
  applyScroll();
  window.addEventListener('scroll', applyScroll, { passive: true });

  // 2) Always land at top on page load/navigation
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('pageshow', () => { window.scrollTo(0,0); });

  // 3) CTAs
  // Request a Quote → scroll to #contact (or open form section) reliably
  const quoteLinks = document.querySelectorAll('a[href*="quote"], a.btn--primary, button.btn--primary, [data-testid*="quote"]');
  const contact    = document.querySelector('#contact') || document.querySelector('[data-contact]') || document.querySelector('[data-section="contact"]');
  quoteLinks.forEach(a => {
    if (!contact) return;
    a.addEventListener('click', (e) => {
      const isSamePage = a.getAttribute('href')?.startsWith('#') || a.getAttribute('href') === '#contact';
      if (isSamePage || !a.getAttribute('href')) e.preventDefault();
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Call Now → open modal with number pulled from footer
  const footerPhone = document.querySelector('footer a[href^="tel:"]') || document.querySelector('footer [data-phone]');
  const callNowBtns = document.querySelectorAll('a[href*="tel-now"], a.btn--ghost[href="#call"], a[data-call-now], [data-testid*="call-now"]');
  if (footerPhone && callNowBtns.length){
    let phone = footerPhone.getAttribute('href')?.replace('tel:', '') || footerPhone.textContent.trim();

    // Build modal once
    const modal = document.createElement('div');
    modal.id = 'callNowModal';
    modal.innerHTML = `
      <div class="cn-overlay" role="presentation"></div>
      <div class="cn-dialog" role="dialog" aria-modal="true" aria-label="Call Now">
        <h3>Call Now</h3>
        <p><a class="cn-number" href="tel:${phone}">${phone}</a></p>
        <div class="cn-actions">
          <a class="btn btn--primary" href="tel:${phone}">Call ${phone}</a>
          <button class="btn btn--ghost" type="button" data-close>Close</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    const open  = () => modal.classList.add('open');
    const close = () => modal.classList.remove('open');
    modal.addEventListener('click', (e)=>{ if(e.target.classList.contains('cn-overlay') || e.target.hasAttribute('data-close')) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });

    callNowBtns.forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); open(); });
    });
  }
})();