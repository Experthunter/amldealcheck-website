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
      { title: 'Transaction Details', desc: 'Capture the deal — a sale, a purchase or a letting — with its values, dates and the parties involved.', docs: ['Letter of instruction', 'Terms of business', 'Source of the transaction'] },
      { title: 'Property Info', desc: 'Where the matter involves real estate, record the property, its title and its tenure.', docs: ['Title register / deeds', 'Tenure & lease details', 'EPC reference'] },
      { title: 'Client / Counterparty DD', desc: 'Verify identity and run due-diligence checks on every customer and transaction counterparty.', docs: ['Photo ID', 'Proof of address', 'Counterparty confirmation'] },
      { title: 'Corporate Structure', desc: 'Map ownership all the way down to the ultimate beneficial owners of any corporate party.', docs: ['Certificate of incorporation', 'Shareholder register', 'Beneficial-owner declaration'] },
      { title: 'Management Structure', desc: 'Identify the directors, officers and controllers standing behind each entity.', docs: ['Register of directors', 'Authorised signatory list', 'Board / org structure'] },
      { title: 'Risk Assessment', desc: "AML Dealcheck's AI logic scores the money-laundering risk across the whole matter.", docs: ['PEP & sanctions screening', 'Source of funds', 'Source of wealth'] },
      { title: 'Final Review', desc: 'Your Money Laundering Reporting Officer signs off, with a complete audit trail behind every decision.', docs: ['Reviewer notes', 'MLRO approval', 'Audit trail'] },
      { title: 'Final Reports', desc: 'Generate the compliant report pack — ready to file, share and defend to the regulator.', docs: ['AML due-diligence report', 'Risk-assessment summary', 'Document checklist'] }
    ];
    var total = STEPS.length;
    var current = 0;
    var autoplay = true;
    var timer;

    var elNum = document.getElementById('stepNum');
    var elOf = document.getElementById('stepOf');
    var elTitle = document.getElementById('stepTitle');
    var elDesc = document.getElementById('stepDesc');
    var elDocs = document.getElementById('stepDocs');
    var elBar = document.getElementById('progressBar');

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
      var docsHtml = '';
      s.docs.forEach(function (d) {
        docsHtml += '<div class="doc"><span class="di">&#8615;</span><span>' + d + '</span></div>';
      });
      elDocs.className = 'docs fade-up';
      void elDocs.offsetWidth;
      elDocs.innerHTML = docsHtml;
      elBar.style.width = Math.round(((i + 1) / total) * 100) + '%';
      chips.forEach(function (c, ci) { c.classList.toggle('active', ci === i); });
    }

    function tick() {
      if (autoplay) render((current + 1) % total);
    }
    timer = setInterval(tick, 3400);

    render(0);
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
