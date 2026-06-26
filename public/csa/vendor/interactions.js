/* ============================================================
   CSA Design System — micro-interactions & motion engine (v2)
   ------------------------------------------------------------
   Data-attribute driven, idempotent, auto-running. Re-scan
   after dynamically rendering nodes with window.csaInit(root).

   Material:
     .csa-btn-fill            cursor-tracking matte sheen
     .csa-tilt                pointer 3D tilt + specular highlight
   Motion (data-attributes):
     [data-reveal]            scroll-reveal (up|down|left|right|scale|clip)
        [data-reveal-delay]   ms stagger
     [data-magnetic]          cursor-magnetic pull (data-magnetic="0.4")
     [data-parallax]          scroll parallax (data-parallax="0.2")
     [data-count]             animated counter to data-count value
        [data-count-suffix]   appended after the number (e.g. "+", "%")
     [data-scramble]          text scramble-in on view (+ on hover)
     .csa-marquee             pause-on-hover crawl (CSS-driven)
   Intro:
     window.csaIntro()        engineering boot wipe (auto on [data-csa-intro])

   NOTE: reveals/counters/scramble use a rect-based viewport scan
   (scroll + light polling), NOT IntersectionObserver — some
   embedded/sandboxed iframes never deliver IO callbacks, which
   would otherwise leave reveal content stuck hidden. Robust in
   all environments; honours prefers-reduced-motion.
   ============================================================ */
(function () {
  var force = document.documentElement.hasAttribute('data-csa-motion') || window.CSA_FORCE_MOTION;
  var reduce = !force && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function inView(el, frac) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.height === 0 && r.width === 0) return false;
    var margin = vh * (frac || 0.12);
    return r.top < vh - margin && r.bottom > margin;
  }

  /* ---- cursor-tracking sheen on solid metal buttons -------- */
  function wireButtons(root) {
    $$('.csa-btn-fill', root).forEach(function (b) {
      if (b.__csaWired) return; b.__csaWired = true;
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        b.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ---- pointer 3D tilt + specular on glass cards -----------
     Tracks the pointer at the DOCUMENT level (gated by the card's bounding box)
     rather than via the card's own mousemove/mouseleave. Binding to the card
     jitters near the edges: the card rotates so the hovered edge recedes under
     the cursor, a false `mouseleave` fires, the card snaps flat, the cursor is
     back over it, it re-tilts — a flicker loop. Document-level tracking resets
     only on a genuine box exit, so there is no flicker. Cards carrying
     [data-tilt-managed] are driven by React (see _components/tilt.ts) and skipped
     here to avoid double-binding. */
  function wireTilt(root) {
    if (reduce) return;
    $$('.csa-tilt', root).forEach(function (c) {
      if (c.__csaWired) return;
      if (c.hasAttribute('data-tilt-managed')) return;
      c.__csaWired = true;
      var MAX = 7, active = false;
      function box(x, y) {
        var r = c.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        if (x < r.left || x > r.right || y < r.top || y > r.bottom) return null;
        return { px: (x - r.left) / r.width, py: (y - r.top) / r.height };
      }
      function stop() {
        if (!active) return;
        active = false;
        document.removeEventListener('mousemove', docMove, true);
        c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg');
      }
      function docMove(e) {
        var p = box(e.clientX, e.clientY);
        if (!p) { stop(); return; }
        c.style.setProperty('--rx', ((p.px - 0.5) * 2 * MAX).toFixed(2) + 'deg');
        c.style.setProperty('--ry', (-(p.py - 0.5) * 2 * MAX).toFixed(2) + 'deg');
        c.style.setProperty('--mx', (p.px * 100).toFixed(1) + '%');
        c.style.setProperty('--my', (p.py * 100).toFixed(1) + '%');
      }
      c.addEventListener('mouseenter', function (e) {
        if (active || !box(e.clientX, e.clientY)) return;
        active = true;
        document.addEventListener('mousemove', docMove, true);
      });
    });
  }

  /* ---- scan-driven queues (no IntersectionObserver) -------- */
  var revealQ = [], countQ = [], scrambleQ = [];

  function wireReveal(root) {
    $$('[data-reveal]', root).forEach(function (el) {
      if (el.__csaReveal) return; el.__csaReveal = true;
      if (reduce) { el.classList.add('is-in'); return; }
      revealQ.push(el);
    });
  }
  function showReveal(el) {
    var d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
    var commit = function () {
      el.classList.add('is-in');
      /* Safety net: in non-painting / forced-motion embeds (print, PDF
         export, offscreen iframes) a CSS opacity transition can stall at its
         start value and strand content hidden — the same class of failure the
         engine avoids for IntersectionObserver. After the transition window,
         drop the transition so the .is-in end-state commits unconditionally.
         A no-op in normal browsers where the transition already finished. */
      setTimeout(function () { el.style.transition = 'none'; }, 900);
    };
    if (d) setTimeout(commit, d);
    else commit();
  }

  function wireCounters(root) {
    $$('[data-count]', root).forEach(function (el) {
      if (el.__csaCount) return; el.__csaCount = true;
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-count-suffix') || '';
      var decimals = (String(el.getAttribute('data-count')).split('.')[1] || '').length;
      el.__csaCountCfg = { target: target, suffix: suffix, decimals: decimals };
      if (reduce) { el.textContent = target.toFixed(decimals) + suffix; return; }
      el.textContent = (0).toFixed(decimals) + suffix;
      countQ.push(el);
    });
  }
  function runCounter(el) {
    var c = el.__csaCountCfg;
    var dur = parseInt(el.getAttribute('data-count-dur') || '1600', 10);
    var t0 = null;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (c.target * eased).toFixed(c.decimals) + c.suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = c.target.toFixed(c.decimals) + c.suffix;
    };
    requestAnimationFrame(step);
  }

  var GLYPHS = '/\\|<>{}[]#%*+=-_·:01';
  function scramble(el, dur) {
    if (reduce) return;
    var final = el.getAttribute('data-scramble-text') || el.textContent;
    el.setAttribute('data-scramble-text', final);
    var start = performance.now();
    var revealAt = final.split('').map(function (_, i) { return (i / final.length) * dur * 0.6 + Math.random() * dur * 0.4; });
    function frame(now) {
      var t = now - start, out = '', done = true;
      for (var i = 0; i < final.length; i++) {
        if (final[i] === ' ') { out += ' '; continue; }
        if (t >= revealAt[i]) { out += final[i]; }
        else { out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; done = false; }
      }
      el.textContent = out;
      if (!done) requestAnimationFrame(frame); else el.textContent = final;
    }
    requestAnimationFrame(frame);
  }
  function wireScramble(root) {
    $$('[data-scramble]', root).forEach(function (el) {
      if (el.__csaScr) return; el.__csaScr = true;
      el.setAttribute('data-scramble-text', el.textContent);
      el.addEventListener('mouseenter', function () { scramble(el, 600); });
      if (!reduce) scrambleQ.push(el);
    });
  }

  /* shared scan — triggers anything that has scrolled into view */
  function scan() {
    for (var i = revealQ.length - 1; i >= 0; i--) {
      if (inView(revealQ[i], 0.08)) { showReveal(revealQ[i]); revealQ.splice(i, 1); }
    }
    for (var j = countQ.length - 1; j >= 0; j--) {
      if (inView(countQ[j], 0.2)) { runCounter(countQ[j]); countQ.splice(j, 1); }
    }
    for (var k = scrambleQ.length - 1; k >= 0; k--) {
      if (inView(scrambleQ[k], 0.25)) { scramble(scrambleQ[k], 900); scrambleQ.splice(k, 1); }
    }
  }

  /* ---- magnetic pull --------------------------------------- */
  function wireMagnetic(root) {
    if (reduce) return;
    $$('[data-magnetic]', root).forEach(function (el) {
      if (el.__csaMag) return; el.__csaMag = true;
      var strength = parseFloat(el.getAttribute('data-magnetic')) || 0.35;
      var radius = parseFloat(el.getAttribute('data-magnetic-radius')) || 90;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = e.clientX - cx, dy = e.clientY - cy;
        var pull = Math.max(0, 1 - Math.hypot(dx, dy) / (Math.max(r.width, r.height) / 2 + radius));
        el.style.transform = 'translate(' + (dx * strength * pull).toFixed(1) + 'px,' + (dy * strength * pull).toFixed(1) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = 'translate(0,0)'; });
    });
  }

  /* ---- parallax on scroll ---------------------------------- */
  var parallaxEls = [];
  function wireParallax(root) {
    if (reduce) return;
    $$('[data-parallax]', root).forEach(function (el) {
      if (el.__csaPar) return; el.__csaPar = true; parallaxEls.push(el);
    });
  }
  function runParallax() {
    if (reduce || !parallaxEls.length) return;
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
      var off = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
    });
  }

  /* ---- intro boot wipe ------------------------------------- */
  function csaIntro(opts) {
    opts = opts || {};
    if (reduce) { document.documentElement.classList.add('csa-intro-done'); return; }
    if (document.getElementById('csa-intro')) return;
    var ov = document.createElement('div');
    ov.id = 'csa-intro';
    ov.setAttribute('aria-hidden', 'true');
    ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:var(--bg-ink,#05070B);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:18px;transition:opacity .5s var(--ease-out,ease),clip-path .7s var(--ease-out,ease);';
    var label = opts.label || 'CRITICAL SYSTEMS ANALYSIS';
    ov.innerHTML =
      '<div style="font-family:var(--font-mono,monospace);font-size:11px;letter-spacing:.34em;color:var(--gold-500,#C6A256);text-transform:uppercase">' + label + '</div>' +
      '<div style="width:min(360px,60vw);height:2px;background:rgba(255,255,255,.1);overflow:hidden;position:relative"><i id="csa-intro-bar" style="position:absolute;inset:0;width:0;background:var(--gold-500,#C6A256);box-shadow:0 0 18px rgba(198,162,86,.6)"></i></div>' +
      '<div id="csa-intro-pct" style="font-family:var(--font-mono,monospace);font-size:11px;letter-spacing:.2em;color:var(--fg-3,#6E7682)">INITIALIZING · 000</div>';
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    var bar = ov.querySelector('#csa-intro-bar'), pct = ov.querySelector('#csa-intro-pct');
    var p = 0;
    var iv = setInterval(function () {
      p = Math.min(100, p + Math.random() * 16 + 6);
      bar.style.width = p + '%';
      pct.textContent = (p < 100 ? 'INITIALIZING · ' : 'VALIDATED · ') + String(Math.round(p)).padStart(3, '0');
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(function () {
          ov.style.clipPath = 'inset(0 0 100% 0)';
          ov.style.opacity = '0';
          document.body.style.overflow = '';
          document.documentElement.classList.add('csa-intro-done');
          setTimeout(function () { ov.remove(); }, 700);
        }, 260);
      }
    }, 150);
  }

  function init(root) {
    wireButtons(root); wireTilt(root); wireReveal(root); wireMagnetic(root);
    wireParallax(root); wireCounters(root); wireScramble(root);
    scan();
  }

  window.csaMetalButtons = wireButtons;
  window.csaTiltCards = wireTilt;
  window.csaReveal = wireReveal;
  window.csaCounters = wireCounters;
  window.csaScan = scan;
  window.csaIntro = csaIntro;
  window.csaInit = init;

  /* drive the scan: scroll (rAF-throttled), resize, + safety poll */
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { scan(); runParallax(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { scan(); runParallax(); });
  setInterval(scan, 260); // fail-safe for environments where scroll/IO don't deliver

  /* ---- auto-wire dynamically rendered nodes (React, etc.) ---
     Most CSA pages render their content with React AFTER this engine
     boots, so the initial init() finds nothing to wire. A debounced
     MutationObserver re-runs init() (idempotent) whenever new nodes are
     added, so [data-reveal]/[data-count]/[data-scramble]/.csa-* added by
     any framework get wired without a manual window.csaInit() call. This
     also guarantees content tagged with [data-reveal] (opacity:0 until
     wired) never gets stranded invisible on a data-csa-motion page. */
  var reinitT = null;
  function scheduleReinit() {
    if (reinitT) return;
    reinitT = setTimeout(function () { reinitT = null; init(); }, 60);
  }
  function watch() {
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes && muts[i].addedNodes.length) { scheduleReinit(); return; }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  function boot() {
    init();
    runParallax();
    watch();
    requestAnimationFrame(scan);
    setTimeout(scan, 120);
    /* bounded re-init burst — covers async framework mounts even if the
       observer is throttled in a sandboxed embed */
    [200, 500, 1000, 2000].forEach(function (t) { setTimeout(init, t); });
    var introHost = document.querySelector('[data-csa-intro]');
    if (introHost) csaIntro({ label: introHost.getAttribute('data-csa-intro') || undefined });
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
