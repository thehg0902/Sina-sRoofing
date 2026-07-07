// Shared init, nav, cross-page interactions.
(function () {
  document.documentElement.classList.replace('no-js', 'js');

  // Analytics: no GA4/Plausible on file (see state/QUESTIONS.md) - placeholder
  // mode (analytics skill rule 6). Drop a real tool into this wrapper later
  // (e.g. gtag('event', name, data) or plausible(name, {props: data})) -
  // every conversion event already flows through track(), no other changes.
  function track(name, data) {
    console.debug('[analytics:placeholder]', name, data || {});
  }

  document.addEventListener('click', function (e) {
    var telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) track('tel_click', { href: telLink.href });
  });

  var header = document.querySelector('.header');
  var toggle = document.querySelector('[data-nav-toggle]');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('header--open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var animatedEls = document.querySelectorAll('[data-animate]');
  if (!reduced && animatedEls.length && 'IntersectionObserver' in window) {
    document.body.classList.add('anim-ready');
    var counters = new Map();
    animatedEls.forEach(function (el) {
      var i = counters.get(el.parentElement) || 0;
      el.style.setProperty('--stagger-i', i);
      counters.set(el.parentElement, i + 1);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    animatedEls.forEach(function (el) { io.observe(el); });
  }

  var mapLoadBtn = document.querySelector('[data-map-load]');
  var mapContainer = document.querySelector('[data-map-embed]');
  if (mapLoadBtn && mapContainer) {
    mapLoadBtn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=41+Crosby+Ave%2C+Richmond+Hill%2C+ON+L4C+0B2&output=embed';
      iframe.title = "Map showing Sina's Roofing & Repair location";
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      mapContainer.innerHTML = '';
      mapContainer.appendChild(iframe);
    });
  }

  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    if (form.dataset.provider !== '') return; // real provider: let it submit normally
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('[data-form-status]');
      if (!status) return;
      status.hidden = false;
      status.textContent = 'Online submissions are being set up. For the fastest response, please call (647) 769-2769 — we\'re ready to help.';
      track('form_submit_placeholder', { formId: form.id || null });
      form.reset();
    });
  });
})();
