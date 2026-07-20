/* ===========================================================================
   AML Dealcheck — shared chrome (header + footer)
   Defined once here and injected into every page, so there is no duplication.
   Each page declares which nav item is active via <body data-page="...">.
   This script must load BEFORE js/app.js (app.js wires the injected nav).
   =========================================================================== */
(function () {
  'use strict';

  var page = document.body.getAttribute('data-page') || '';

  function active(name) { return page === name ? ' active' : ''; }

  var HEADER =
    '<header class="site-nav">' +
      '<div class="wrap row">' +
        '<a class="brand" href="index.html"><img src="assets/aml-dealcheck-logo.jpg" alt="AML Dealcheck"></a>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '<nav class="nav-links" id="navLinks">' +
          '<a class="nav-link' + active('home') + '" href="index.html">Home</a>' +
          '<a class="nav-link' + active('product') + '" href="aml-dealcheck.html">AML Dealcheck</a>' +
          '<a class="nav-link' + active('about') + '" href="about.html">About us</a>' +
          '<a class="nav-link' + active('pricing') + '" href="pricing.html">Pricing</a>' +
          '<a class="btn btn-outline btn-sm" href="#">Customer login</a>' +
          '<a class="btn btn-teal btn-sm" href="contact.html">Request a demo</a>' +
        '</nav>' +
      '</div>' +
    '</header>';

  var FOOTER =
    '<footer class="site-footer">' +
      '<div class="wrap row">' +
        '<div class="fbrand"><span class="chip-logo"><img src="assets/aml-dealcheck-logo.jpg" alt="AML Dealcheck"></span><span>A Compliance On Demand product</span></div>' +
        '<nav class="flinks">' +
          '<a href="index.html">Home</a>' +
          '<a href="aml-dealcheck.html">AML Dealcheck</a>' +
          '<a href="about.html">About us</a>' +
          '<a href="pricing.html">Pricing</a>' +
          '<a href="contact.html">Request a demo</a>' +
        '</nav>' +
      '</div>' +
      '<div class="legal"><div class="wrap legalrow">' +
        '<div class="lcopy">© 2026 Compliance On Demand. AML Dealcheck is hosted on the Microsoft Azure Southern England secure platform.</div>' +
        '<nav class="llinks">' +
          '<a href="legal.html">Legal &amp; Privacy Policy</a>' +
          '<a href="legal.html#msa">Master Service Agreement</a>' +
          '<button type="button" class="flink-btn" id="cookieSettings">Cookie settings</button>' +
        '</nav>' +
      '</div></div>' +
    '</footer>';

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) h.outerHTML = HEADER;
  if (f) f.outerHTML = FOOTER;
})();
