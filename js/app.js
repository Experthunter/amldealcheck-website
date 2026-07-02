/* ===========================================================================
   AML Dealcheck — static site behaviour
   Vanilla JS, no dependencies. Sets no cookies and no storage.
   =========================================================================== */
(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  /* ---------- Hero video (click-to-load, privacy-friendly) ---------- */
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo && heroVideo.getAttribute('data-yt')) {
    var loadVideo = function () {
      var id = heroVideo.getAttribute('data-yt');
      if (!id || heroVideo.querySelector('iframe')) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + id + '?rel=0&modestbranding=1&playsinline=1';
      iframe.title = 'AML Dealcheck overview';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      heroVideo.innerHTML = '';
      heroVideo.appendChild(iframe);
      heroVideo.style.cursor = 'default';
    };
    heroVideo.addEventListener('click', loadVideo);
    heroVideo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadVideo(); }
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // close all
        faqList.querySelectorAll('.faq-item').forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---------- Dashboard stepper ---------- */
  var stepper = document.getElementById('stepper');
  if (stepper) {
    var STEPS = [
      { title: 'Transaction Details', desc: 'Capture the deal — a sale, purchase or letting — with its values, dates and parties involved.' },
      { title: 'Property Info', desc: 'Where the matter involves real estate, record the property, its title and its tenure.' },
      { title: 'Client / Counterparty DD', desc: 'Verify identity and run due-diligence checks on every client and transaction counterparty.' },
      { title: 'Corporate Structure', desc: 'Map ownership all the way down to the ultimate beneficial owners of any corporate party.' },
      { title: 'Management Structure', desc: 'Identify the directors, officers and controllers standing behind each entity.' },
      { title: 'Risk Assessment', desc: "AML Dealcheck's AI logic scores the money-laundering risk across the whole matter, and will advise if a source of funds and source of wealth check needs to be completed." },
      { title: 'Final Review', desc: 'Based on the information provided, the system decides whether Simplified, Standard or Enhanced due diligence is applied — then your MLRO signs off, with a complete audit trail behind every decision.' },
      { title: 'Final Reports', desc: 'Generate the compliant report pack — ready to file, share and defend to the regulator.' }
    ];
    var total = STEPS.length;
    var current = 0;
    var autoplay = true;
    var timer;

    var elNum = document.getElementById('stepNum');
    var elOf = document.getElementById('stepOf');
    var elTitle = document.getElementById('stepTitle');
    var elDesc = document.getElementById('stepDesc');
    var elBar = document.getElementById('progressBar');
    var elPanel = document.querySelector('.panel');

    // Lock the panel to the tallest step so the layout below never jumps.
    function sizePanel() {
      if (!elPanel) return;
      elPanel.style.minHeight = '';
      var savedTitle = elTitle.textContent, savedDesc = elDesc.textContent, savedAnim = elTitle.style.animation;
      elTitle.style.animation = 'none';
      var max = 0;
      STEPS.forEach(function (s) {
        elTitle.textContent = s.title;
        elDesc.textContent = s.desc;
        if (elPanel.offsetHeight > max) max = elPanel.offsetHeight;
      });
      elTitle.textContent = savedTitle;
      elDesc.textContent = savedDesc;
      elTitle.style.animation = savedAnim;
      elPanel.style.minHeight = max + 'px';
    }

    // build chips
    var chips = [];
    STEPS.forEach(function (s, i) {
      var b = document.createElement('button');
      b.className = 'step-chip';
      b.innerHTML = '<span class="n">' + (i + 1) + '</span>' + s.title;
      b.addEventListener('click', function () { autoplay = false; render(i); });
      stepper.appendChild(b);
      chips.push(b);
    });

    function render(i) {
      current = i;
      var s = STEPS[i];
      elNum.textContent = i + 1;
      elOf.textContent = 'Step ' + (i + 1) + ' of ' + total;
      elTitle.textContent = s.title;
      elDesc.textContent = s.desc;
      // restart fade animation
      elTitle.style.animation = 'none'; void elTitle.offsetWidth; elTitle.style.animation = '';
      elBar.style.width = Math.round(((i + 1) / total) * 100) + '%';
      chips.forEach(function (c, ci) { c.classList.toggle('active', ci === i); });
    }

    function tick() {
      if (autoplay) render((current + 1) % total);
    }
    timer = setInterval(tick, 3400);

    render(0);
    sizePanel();
    var sizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(sizeTimer);
      sizeTimer = setTimeout(sizePanel, 150);
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('demoForm');
  var success = document.getElementById('formSuccess');
  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // basic required check
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = '#e0726a'; }
        else { f.style.borderColor = ''; }
      });
      if (!ok) return;
      form.classList.add('hidden');
      success.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var reset = document.getElementById('resetForm');
    if (reset) {
      reset.addEventListener('click', function () {
        form.reset();
        success.classList.add('hidden');
        form.classList.remove('hidden');
      });
    }
  }
})();
