/* ===========================================================================
   AML Dealcheck — cookie consent + gated analytics
   ---------------------------------------------------------------------------
   Analytics are OFF until the visitor opts in. Nothing that sets a tracking
   cookie or sends data to a third party may run outside loadAnalytics().

   The only thing stored before consent is the consent choice itself
   ('amlc-consent' in localStorage), which is "strictly necessary" and does
   not itself require consent under PECR / UK GDPR.

   >>> TO ENABLE ANALYTICS:
       1. Set CONFIG.measurementId below (e.g. a GA4 ID "G-XXXXXXXXXX",
          or swap loadAnalytics() for your Plausible / Fathom / Matomo snippet).
       2. That's it — the script only loads after the visitor clicks "Accept".
   =========================================================================== */
(function () {
  'use strict';

  var CONFIG = {
    storageKey: 'amlc-consent',
    measurementId: ''   // <-- e.g. 'G-XXXXXXXXXX'. Empty = analytics disabled.
  };

  function getConsent() {
    try { return localStorage.getItem(CONFIG.storageKey); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(CONFIG.storageKey, v); } catch (e) {}
  }

  /* ---- Gated analytics loader (runs ONLY on granted consent) ---- */
  function loadAnalytics() {
    if (!CONFIG.measurementId) return;          // nothing configured yet
    if (window.__amlcAnalyticsLoaded) return;   // load once
    window.__amlcAnalyticsLoaded = true;

    /* --- Google Analytics 4 scaffold (uncomment-ready) ---
       Replace with your own provider if not using GA4. */
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.measurementId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', CONFIG.measurementId, { anonymize_ip: true });
  }

  /* ---- Banner UI ---- */
  function buildBanner() {
    var bar = document.createElement('div');
    bar.className = 'cookie-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<div class="cookie-inner">' +
        '<div class="cookie-text">' +
          '<strong>We value your privacy</strong>' +
          '<p>We use cookies only to measure how the site is used, and only with your consent. ' +
          'Essential functions never use tracking cookies. See our cookie choices any time via "Cookie settings".</p>' +
        '</div>' +
        '<div class="cookie-actions">' +
          '<button type="button" class="btn btn-sm cookie-decline" id="cookieDecline">Decline</button>' +
          '<button type="button" class="btn btn-teal btn-sm" id="cookieAccept">Accept analytics</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      setConsent('granted'); hide(bar); loadAnalytics();
    });
    document.getElementById('cookieDecline').addEventListener('click', function () {
      setConsent('denied'); hide(bar);
    });
    return bar;
  }

  function show(bar) { bar.classList.add('show'); }
  function hide(bar) { bar.classList.remove('show'); }

  /* ---- Init ---- */
  var consent = getConsent();
  if (consent === 'granted') loadAnalytics();

  var bar = buildBanner();
  if (!consent) {
    // small delay so it animates in after first paint
    setTimeout(function () { show(bar); }, 400);
  }

  // "Cookie settings" link in the footer reopens the banner
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'cookieSettings') {
      e.preventDefault();
      show(bar);
    }
  });
})();
