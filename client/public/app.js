// Force scroll to top immediately - before React even loads
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;
window.scrollTo(0, 0);

// Wait for React to mount before initializing  
window.addEventListener('load', function() {
  // 1) Always land at top on page load/navigation
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('pageshow', () => { 
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0,0); 
  });

  // 3) Event delegation for CTAs - works with dynamically mounted React elements
  let modal = null;

  document.addEventListener('click', function(e) {
    const target = e.target.closest('button, a');
    if (!target) return;

    // Request a Quote → scroll to contact
    if (target.matches('[data-testid*="quote"], .btn--primary, button.btn--primary') && 
        target.textContent.toLowerCase().includes('quote')) {
      e.preventDefault();
      const contact = document.querySelector('#contact') || document.querySelector('[data-contact]');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Call Now → open modal
    if (target.matches('[data-testid*="call"], .btn--ghost') && 
        target.textContent.toLowerCase().includes('call')) {
      e.preventDefault();
      
      // Build modal on first use
      if (!modal) {
        const footerPhone = document.querySelector('footer a[href^="tel:"]');
        if (footerPhone) {
          const phone = footerPhone.getAttribute('href')?.replace('tel:', '') || footerPhone.textContent.trim();
          
          modal = document.createElement('div');
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

          // Modal event handlers
          modal.addEventListener('click', (e)=>{ 
            if(e.target.classList.contains('cn-overlay') || e.target.hasAttribute('data-close')) {
              modal.classList.remove('open');
            }
          });
          document.addEventListener('keydown', (e)=>{ 
            if(e.key === 'Escape') modal.classList.remove('open');
          });
        }
      }
      
      // Open modal
      if (modal) {
        modal.classList.add('open');
      }
    }
  });
});