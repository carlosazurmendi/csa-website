/* ============================================================
   CSA Design System — Paper Shaders integration
   ------------------------------------------------------------
   Wraps @paper-design/shaders-react as framework-agnostic
   custom elements so both vanilla HTML and the consuming
   website (React) can drop them in with plain markup:

     <csa-grain>             full-bleed grain-gradient atmosphere
     <csa-liquid-metal ring> liquid-metal fill OR a masked metal ring
     <csa-pulsing-border>    animated glowing border (Paper shader)

   All elements size to their host box (set width/height in CSS),
   read brand-tuned defaults (override via attributes), freeze
   under prefers-reduced-motion, and degrade to a CSS fallback
   if WebGL / the CDN module fails.

   Load with:  <script type="module" src="csa-shaders.js"></script>

   IMPLEMENTATION NOTES
   - All CDN imports are DYNAMIC and live inside an async IIFE
     (no static `import` / no top-level `await`) so the design
     system's in-browser bundler/transform never chokes on this
     file and never tries to resolve react/react-dom from npm.
   - Paper's ShaderMount sizes its <canvas> from a ResizeObserver.
     Some embedded/sandboxed iframes never deliver RO callbacks,
     leaving every shader 0x0. We install a hybrid RO (immediate
     measure on observe + light polling, delegating to native RO
     when it works) BEFORE importing Paper so shaders always size.
     Harmless in normal browsers.
   ============================================================ */
(function () {
  /* ---- hybrid ResizeObserver (must precede the Paper import) -- */
  (function installHybridRO() {
    var Native = window.ResizeObserver;
    var dpr = function () { return window.devicePixelRatio || 1; };
    function entry(el) {
      // Measure the LAYOUT box (offsetWidth/Height) not getBoundingClientRect:
      // rects are foreshortened by 3D transforms (tilt), which would shrink the
      // shader canvas mid-tilt and crop effects like the liquid-metal ring.
      var w = el.offsetWidth || el.getBoundingClientRect().width;
      var h = el.offsetHeight || el.getBoundingClientRect().height;
      var box = [{ inlineSize: w, blockSize: h }];
      var dbox = [{ inlineSize: Math.round(w * dpr()), blockSize: Math.round(h * dpr()) }];
      var cr = { width: w, height: h, top: 0, left: 0, right: w, bottom: h, x: 0, y: 0 };
      return { target: el, contentRect: cr, contentBoxSize: box, borderBoxSize: box, devicePixelContentBoxSize: dbox };
    }
    function HybridRO(cb) {
      this._cb = cb;
      this._els = new Set();
      this._last = new WeakMap();
      this._native = Native ? new Native(function (entries) { try { cb(entries, this); } catch (e) {} }) : null;
      var self = this;
      this._timer = setInterval(function () { self._els.forEach(function (el) { self._emit(el); }); }, 300);
    }
    HybridRO.prototype._emit = function (el) {
      // Use the transform-independent layout box so a tilting (3D-transformed)
      // host doesn't read as a continuous resize and keep re-cropping its shader.
      var w = el.offsetWidth || el.getBoundingClientRect().width;
      var h = el.offsetHeight || el.getBoundingClientRect().height;
      var p = this._last.get(el);
      if (p && p.w === w && p.h === h) return;
      this._last.set(el, { w: w, h: h });
      if (w || h) { try { this._cb([entry(el)], this); } catch (e) {} }
    };
    HybridRO.prototype.observe = function (el, opts) {
      this._els.add(el);
      if (this._native) { try { this._native.observe(el, opts); } catch (e) {} }
      var self = this;
      requestAnimationFrame(function () { self._emit(el); });
      setTimeout(function () { self._emit(el); }, 60);
    };
    HybridRO.prototype.unobserve = function (el) { this._els.delete(el); if (this._native) try { this._native.unobserve(el); } catch (e) {} };
    HybridRO.prototype.disconnect = function () { this._els.clear(); if (this._native) try { this._native.disconnect(); } catch (e) {} clearInterval(this._timer); };
    window.ResizeObserver = HybridRO;
  })();

  var force = document.documentElement.hasAttribute('data-csa-motion') || window.CSA_FORCE_MOTION;
  var REDUCE = !force && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GOLD = ['#7E6330', '#C6A256', '#F4E4A6', '#A8853F'];
  /* neon palette for the high-tech pulsing border (AI / chat / live controls) */
  var NEON = ['#2D6CFF', '#13E0FF', '#9B5CFF', '#FF3DBE'];

  function colors(attr, fallback) {
    if (!attr) return fallback;
    return attr.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function num(v, d) { var n = parseFloat(v); return isFinite(n) ? n : d; }

  (async function loadShaders() {
    var React, createRoot, Paper, h;

    // PRIMARY source: a self-hosted bundle (React 18 + Paper shaders) served
    // from our own origin — see scripts/shader-bundle/. Loading the shaders no
    // longer depends on a third-party CDN being up/fast on every visit, which
    // was the only non-deterministic link in the chain (the "shaders don't
    // consistently load" symptom). The CDN groups below remain as a fallback so
    // a missing/corrupt local bundle still degrades gracefully rather than to
    // bare CSS. Each source yields one React instance (own roots), so there is
    // no clash with the host app's React.
    var LOCAL_URL = '/csa/vendor/paper-shaders.bundle.js';
    async function tryLocal() {
      var m = await import(LOCAL_URL);
      if (!(m && m.React && m.createRoot && m.Paper)) throw new Error('local bundle missing exports');
      return { React: m.React, createRoot: m.createRoot, Paper: m.Paper };
    }

    // Each CDN group imports react + react-dom/client + Paper from the SAME
    // origin so there's only one React instance. We try a whole group, retry
    // it once (transient "Failed to fetch dynamically imported module" hiccups
    // are common), then fall back to the next CDN. Only if EVERY source fails
    // do we drop to the CSS fallback — a single flaky fetch must not wipe out
    // all liquid metal on the page.
    var CDN_GROUPS = [
      {
        react: 'https://esm.sh/react@18.3.1',
        dom:   'https://esm.sh/react-dom@18.3.1/client',
        paper: 'https://esm.sh/@paper-design/shaders-react?deps=react@18.3.1,react-dom@18.3.1'
      },
      {
        react: 'https://cdn.jsdelivr.net/npm/react@18.3.1/+esm',
        dom:   'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/client/+esm',
        paper: 'https://cdn.jsdelivr.net/npm/@paper-design/shaders-react@latest/+esm'
      }
    ];
    function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    async function tryGroup(g) {
      var reactMod = await import(g.react);
      var domMod = await import(g.dom);
      var paperMod = await import(g.paper);
      return {
        React: reactMod.default || reactMod,
        createRoot: domMod.createRoot || (domMod.default && domMod.default.createRoot),
        Paper: paperMod
      };
    }
    // Try the local bundle first, then each CDN group, each with one retry.
    var sources = [tryLocal];
    CDN_GROUPS.forEach(function (g) { sources.push(function () { return tryGroup(g); }); });
    var loaded = null, lastErr = null;
    for (var si = 0; si < sources.length && !loaded; si++) {
      for (var attempt = 0; attempt < 2 && !loaded; attempt++) {
        try {
          if (attempt) await delay(350);
          loaded = await sources[si]();
        } catch (e) { lastErr = e; }
      }
    }
    if (loaded && loaded.React && loaded.createRoot && loaded.Paper) {
      React = loaded.React;
      createRoot = loaded.createRoot;
      Paper = loaded.Paper;
      h = React.createElement;
    } else {
      // Every CDN failed — leave a CSS fallback on every shader host
      document.querySelectorAll('csa-grain,csa-liquid-metal,csa-pulsing-border').forEach(function (el) {
        el.style.background = 'linear-gradient(135deg, var(--haze-blue,#243246), var(--bg-base,#0A0E14))';
      });
      window.CSAShaders = { ok: false, error: String(lastErr) };
      return;
    }

    function baseSetup(el) {
      var cs = getComputedStyle(el);
      if (cs.position === 'static') el.style.position = 'relative';
      if (cs.display === 'inline') el.style.display = 'block';
      if (!el.style.overflow) el.style.overflow = 'hidden';
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
      el.appendChild(wrap);
      return wrap;
    }
    function speed(el, d) { return REDUCE ? 0 : num(el.getAttribute('speed'), d); }

    /* ---- <csa-grain> ---- */
    class GrainEl extends HTMLElement {
      connectedCallback() {
        if (this._m) return; this._m = true; this._suspended = false;
        this._wrap = baseSetup(this);
        this._mountShader();
      }
      suspend() { if (this._suspended) return; this._suspended = true; if (this._root) { try { this._root.unmount(); } catch (e) {} this._root = null; } }
      resume() { if (!this._suspended) return; this._suspended = false; if (this._wrap) this._mountShader(); }
      _mountShader() {
        this._root = createRoot(this._wrap);
        this._root.render(h(Paper.GrainGradient, {
          style: { width: '100%', height: '100%', display: 'block' },
          colors: colors(this.getAttribute('colors'), ['#243246', '#34465E', '#C6A256']),
          colorBack: this.getAttribute('color-back') || '#0A0E14',
          softness: num(this.getAttribute('softness'), 0.85),
          intensity: num(this.getAttribute('intensity'), 0.3),
          noise: num(this.getAttribute('noise'), 0.45),
          shape: this.getAttribute('shape') || 'corners',
          scale: num(this.getAttribute('scale'), 1),
          speed: speed(this, 0.5),
        }));
      }
      disconnectedCallback() { if (this._root) try { this._root.unmount(); } catch (e) {} this._m = false; }
    }

    /* ---- <csa-liquid-metal> (fill, or ring outline) ----
       LiquidMetal renders a centered metal SHAPE on colorBack — it does
       not fill a rectangle on its own. We render it into an oversized,
       centered SQUARE (1.5x the host's longest side) so the host only ever
       sees the solid metal CORE of the shape — no empty shape edges/corners.
       That makes it fill any element: a logo glyph (masked), a full panel,
       or a ring band (masked to the border). */
    class MetalEl extends HTMLElement {
      connectedCallback() {
        if (this._m) return; this._m = true; this._suspended = false;
        var cs = getComputedStyle(this);
        if (cs.position === 'static') this.style.position = 'relative';
        if (cs.display === 'inline') this.style.display = 'block';
        this.style.overflow = 'hidden';

        var frame = document.createElement('div');
        frame.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;';
        if (this.hasAttribute('ring')) {
          var t = this.getAttribute('thickness') || '2px';
          // Cap liquid-metal border width at 2px max (system rule).
          var tn = parseFloat(t);
          if (!isNaN(tn) && tn > 2) t = '2px';
          frame.style.padding = t; frame.style.boxSizing = 'border-box';
          frame.style.webkitMask = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';
          frame.style.webkitMaskComposite = 'xor';
          frame.style.mask = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';
          frame.style.maskComposite = 'exclude';
          frame.style.borderRadius = 'inherit';
        }
        var sq = document.createElement('div');
        sq.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);';
        frame.appendChild(sq);
        this.appendChild(frame);

        var self = this;
        this._sizeSq = function () {
          // layout box, not the tilt-foreshortened rect, so the metal core always
          // covers the host's true bounds (ring never crops while the card tilts)
          var w = self.offsetWidth || self.getBoundingClientRect().width;
          var hh = self.offsetHeight || self.getBoundingClientRect().height;
          var side = Math.max(w, hh, 1) * 2;
          sq.style.width = side + 'px'; sq.style.height = side + 'px';
        };
        this._sizeSq();
        try { this._ro = new ResizeObserver(this._sizeSq); this._ro.observe(this); } catch (e) {}

        this._sq = sq;
        this._mountShader();
      }
      suspend() { if (this._suspended) return; this._suspended = true; if (this._root) { try { this._root.unmount(); } catch (e) {} this._root = null; } }
      resume() { if (!this._suspended) return; this._suspended = false; if (this._sq) this._mountShader(); }
      _mountShader() {
        this._root = createRoot(this._sq);
        this._root.render(h(Paper.LiquidMetal, {
          style: { width: '100%', height: '100%', display: 'block' },
          colorBack: this.getAttribute('color-back') || '#0A0E14',
          colorTint: this.getAttribute('tint') || '#C6A256',
          repetition: num(this.getAttribute('repetition'), 3),
          softness: num(this.getAttribute('softness'), 0.3),
          shiftRed: num(this.getAttribute('shift-red'), 0.3),
          shiftBlue: num(this.getAttribute('shift-blue'), 0.3),
          distortion: num(this.getAttribute('distortion'), 0.1),
          contour: num(this.getAttribute('contour'), 0.9),
          scale: num(this.getAttribute('scale'), 1),
          speed: speed(this, 0.5),
        }));
      }
      disconnectedCallback() {
        if (this._ro) try { this._ro.disconnect(); } catch (e) {}
        if (this._root) try { this._root.unmount(); } catch (e) {}
        this._m = false;
      }
    }

    /* ---- <csa-pulsing-border> ----
       Re-renders when its driving attributes change so the glow can be
       re-anchored at runtime (e.g. after data-glow measures the host). */
    class PulseEl extends HTMLElement {
      static get observedAttributes() {
        return ['roundness', 'colors', 'thickness', 'softness', 'intensity', 'bloom',
          'margin-left', 'margin-right', 'margin-top', 'margin-bottom'];
      }
      connectedCallback() {
        if (this._m) return; this._m = true; this._suspended = false;
        this.style.overflow = 'visible';
        this._wrap = baseSetup(this);
        this._root = createRoot(this._wrap);
        this._render();
      }
      suspend() { if (this._suspended) return; this._suspended = true; if (this._root) { try { this._root.unmount(); } catch (e) {} this._root = null; } }
      resume() { if (!this._suspended) return; this._suspended = false; this._root = createRoot(this._wrap); this._render(); }
      attributeChangedCallback() { if (this._m && this._root) this._render(); }
      _render() {
        this._root.render(h(Paper.PulsingBorder, {
          style: { width: '100%', height: '100%', display: 'block' },
          colors: colors(this.getAttribute('colors'), NEON),
          colorBack: this.getAttribute('color-back') || '#00000000',
          roundness: num(this.getAttribute('roundness'), 0.5),
          thickness: num(this.getAttribute('thickness'), 0.04),
          softness: num(this.getAttribute('softness'), 1),
          intensity: num(this.getAttribute('intensity'), 1),
          bloom: num(this.getAttribute('bloom'), 1),
          spots: num(this.getAttribute('spots'), 4),
          spotSize: num(this.getAttribute('spot-size'), 0.25),
          pulse: num(this.getAttribute('pulse'), 0.2),
          smoke: num(this.getAttribute('smoke'), 0.5),
          smokeSize: num(this.getAttribute('smoke-size'), 0.6),
          marginLeft: num(this.getAttribute('margin-left'), 0),
          marginRight: num(this.getAttribute('margin-right'), 0),
          marginTop: num(this.getAttribute('margin-top'), 0),
          marginBottom: num(this.getAttribute('margin-bottom'), 0),
          scale: num(this.getAttribute('scale'), 1),
          speed: speed(this, 1.3),
        }));
      }
      disconnectedCallback() { if (this._root) try { this._root.unmount(); } catch (e) {} this._m = false; }
    }

    if (!customElements.get('csa-grain')) customElements.define('csa-grain', GrainEl);
    if (!customElements.get('csa-liquid-metal')) customElements.define('csa-liquid-metal', MetalEl);
    if (!customElements.get('csa-pulsing-border')) customElements.define('csa-pulsing-border', PulseEl);

    /* ---- data-metal : inject a live liquid-metal ring as an element's edge ----
       The CSS foil edge is the no-WebGL FALLBACK: it stays visible and is only
       hidden (via the .csa-metal-on class) once the metal canvas actually
       paints, so a failed/over-budget context degrades to foil instead of a
       blank edge. Opt out per element with data-metal="none". */
    /* ============================================================
       VIEWPORT LAZY-LOADER for WebGL shader contexts.
       Each liquid-metal ring / grain / pulsing-border is one WebGL context
       (~16 per page in most browsers). Instead of capping how many edges
       exist, we keep a context live ONLY while its element is on (or near)
       screen and SUSPEND it (release the context) once it scrolls away,
       resuming just before it returns. Every authored edge gets real liquid
       metal in view, and the simultaneous count never exceeds the budget (the
       over-subscription that caused force-eviction flicker). data-metal rings
       are injected ON DEMAND the first time their host enters view, so a fresh
       load never spikes dozens of contexts at once. Rect-based (no
       IntersectionObserver) so it also works in IO-less embeds. */
    var metalHosts = [];
    function lazyMargin() { return Math.max(420, (window.innerHeight || 800) * 0.6); }
    /* Effective visibility: an element is NOT in view if it (or any ancestor) is
       display:none, visibility:hidden, or faded to opacity:0. This is what makes
       the loader skip OFF-STAGE carousel cards — their CTA buttons sit at the
       carousel centre (so their rect overlaps the viewport) but their card body
       is opacity:0, so without this walk they'd each spin up a WebGL ring while
       invisible and force-evict on-screen shaders (the grain flicker). We walk
       opacity manually because checkVisibility()'s opacityProperty isn't
       supported everywhere. */
    function effectivelyVisible(el) {
      var node = el;
      while (node && node.nodeType === 1) {
        var cs = getComputedStyle(node);
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
        if (parseFloat(cs.opacity) === 0) return false;
        // aria-hidden fires synchronously (e.g. a carousel marking its off-stage
        // cards) BEFORE any opacity fade completes, so we release the context
        // immediately on exit instead of waiting out the transition.
        if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') return false;
        node = node.parentElement;
      }
      return true;
    }
    function elOnScreen(rectEl, visEl) {
      var r = rectEl.getBoundingClientRect();
      var m = lazyMargin(), vh = window.innerHeight || 0, vw = window.innerWidth || 0;
      if (!(r.width || r.height)) return false;
      if (!(r.bottom > -m && r.top < vh + m && r.right > -m && r.left < vw + m)) return false;
      if (visEl.checkVisibility) {
        try { if (!visEl.checkVisibility({ visibilityProperty: true, contentVisibilityAuto: true, opacityProperty: true })) return false; } catch (e) {}
      }
      return effectivelyVisible(visEl);
    }
    function ensureMetalRing(el) {
      if (el.__ring && el.__ring.isConnected) return el.__ring;
      var kind = el.__metalKind || 'gold';
      var ring = document.createElement('csa-liquid-metal');
      ring.setAttribute('ring', ''); ring.setAttribute('thickness', el.__metalThick || '2px');
      ring.setAttribute('contour', '0.92'); ring.setAttribute('repetition', '3');
      if (kind === 'silver') { ring.setAttribute('tint', '#EAF0F8'); ring.setAttribute('color-back', '#46505F'); }
      else { ring.setAttribute('tint', '#F4D585'); ring.setAttribute('color-back', '#7A5E2A'); ring.setAttribute('distortion', '0.15'); }
      ring.style.cssText = 'position:absolute;inset:0;border-radius:inherit;z-index:0;pointer-events:none;';
      el.insertBefore(ring, el.firstChild);
      el.__ring = ring;
      return ring;
    }
    function revealMetalRing(ring, host) {
      host = host || ring.parentElement; if (!host) return;
      var t = 0;
      (function poll() {
        if (ring._suspended || !ring.isConnected) return;
        var cv = ring.querySelector('canvas');
        if (cv && cv.width > 0) { host.classList.add('csa-metal-on'); return; }
        if (t++ < 60) setTimeout(poll, 80);
      })();
    }
    function syncLazyShaders() {
      // (A) data-metal hosts — inject the ring on first entry, suspend on exit
      for (var i = 0; i < metalHosts.length; i++) {
        var host = metalHosts[i];
        if (!host || !host.isConnected) continue;
        var want = elOnScreen(host, host);
        if (want && !host.__ringActive) {
          host.__ringActive = true;
          var ring = ensureMetalRing(host);
          if (ring._suspended && typeof ring.resume === 'function') ring.resume();
          revealMetalRing(ring, host);
        } else if (!want && host.__ringActive) {
          host.__ringActive = false;
          if (host.__ring && typeof host.__ring.suspend === 'function') host.__ring.suspend();
          host.classList.remove('csa-metal-on');
        }
      }
      // (B) standalone shader elements — grains, glows, JSX-authored metal rings
      document.querySelectorAll('csa-grain,csa-pulsing-border,csa-liquid-metal').forEach(function (el) {
        if (typeof el.suspend !== 'function') return;
        if (el.hasAttribute && el.hasAttribute('data-no-lazy')) return; // React-owned, kept always-mounted to avoid reconciliation races
        if (el.parentElement && el.parentElement.__ring === el) return; // host-managed in (A)
        var visEl = el.parentElement || el;
        var want = elOnScreen(el, visEl);
        var isMetal = el.tagName.toLowerCase() === 'csa-liquid-metal';
        if (want) {
          if (el._suspended) { el.resume(); }
          // Mark the host as metal-on so its foil hairline (kind-aware ::before)
          // shows. revealMetalRing polls for the painted canvas then adds the
          // class; call it whenever the ring is on-screen and not yet marked —
          // not only when resuming — so JSX-mounted rings (which mount
          // un-suspended) get the class too. Guarded so it runs once.
          if (isMetal && el.parentElement && !el.parentElement.classList.contains('csa-metal-on')) revealMetalRing(el, el.parentElement);
        }
        else if (!el._suspended) { el.suspend(); if (isMetal && el.parentElement) el.parentElement.classList.remove('csa-metal-on'); }
      });
    }

    /* ---- data-metal : register a host for a lazily-loaded liquid-metal ring.
       The CSS foil edge is the no-WebGL FALLBACK; the live ring is injected by
       the lazy-loader once the host scrolls into view and suspended when it
       leaves. Opt out per element with data-metal="none". */
    function wireMetal(root) {
      (root || document).querySelectorAll('[data-metal]').forEach(function (el) {
        if (el.__metal) return;
        var kind = (el.getAttribute('data-metal') || 'gold').toLowerCase();
        if (kind === 'none') return;
        el.__metal = true;
        el.__metalKind = kind;
        // Cap the metal band at 2px so the ring stays a tight hairline on its host.
        var mt = el.getAttribute('data-metal-thickness') || '2px';
        var mtn = parseFloat(mt);
        if (!isNaN(mtn) && mtn > 2) mt = '2px';
        el.__metalThick = mt;
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        metalHosts.push(el);
      });
      syncLazyShaders();
    }

    /* The system's metallic OUTLINES default to live liquid metal: gold for
       buttons / gold rings. (Fills & text keep the CSS foil.)
       Existing data-metal wins; data-metal="none" opts an element out.

       SITE NOTE: each live metal edge is one WebGL context (~16 budget). To
       stay safe across this 40-page site we auto-wire ONLY buttons (few per
       page, and exactly the gold outline the brand wants) and CAP the count.
       The numerous frosted .csa-glass cards intentionally keep their reliable
       CSS silver-foil edge — give a specific one a live edge with an explicit
       data-metal="silver" in the markup (still honoured below). */
    // Auto-wire a bounded number of gold buttons to live liquid metal (the rest
    // keep the CSS gold-foil fallback). The viewport lazy-loader keeps only
    // ON-SCREEN edges holding a WebGL context, so many edges can be authored
    // without ever exceeding the ~16-context budget.
    var AUTO_METAL_MAX = 10;
    // The set of buttons WE auto-wired. The budget caps how many are LIVE at once,
    // NOT how many we ever wired: on client-side (SPA) navigation the previous
    // page's buttons are removed from the DOM, so we prune them here and free
    // their budget. A plain monotonic counter would exhaust after a few route
    // changes and leave later pages' gold buttons on bare CSS foil — the
    // "shaders don't load on page switching" bug. The viewport lazy-loader still
    // caps how many hold a live WebGL context, so this only governs authoring.
    var autoMetalEls = new Set();
    function wireMetalDefaults(root) {
      // Drop buttons removed by a route change so the budget reflects only live ones.
      autoMetalEls.forEach(function (el) { if (!el.isConnected) autoMetalEls.delete(el); });
      // Prune disconnected hosts so metalHosts doesn't grow unbounded across navs.
      metalHosts = metalHosts.filter(function (h) { return h && h.isConnected; });
      var node = root || document;
      node.querySelectorAll('.csa-btn-pill,.csa-btn-fill,.csa-gold-ring,.btn--gold-pill').forEach(function (el) {
        if (el.__metal || el.hasAttribute('data-metal')) return;
        if (autoMetalEls.size >= AUTO_METAL_MAX) return; // beyond budget: keep CSS foil
        el.setAttribute('data-metal', 'gold');
        autoMetalEls.add(el);
      });
      wireMetal(node); // applies to all [data-metal] incl. explicit silver/gold in markup
    }
    wireMetalDefaults();

    /* ---- data-glow : anchor a neon pulsing-border glow to an element's
       ACTUAL border-radius. The glow <canvas> is inflated by a "bleed" margin
       on every side so the bloom has room to spread (never cropped), while the
       shader's margin* props push the glowing RING inward so it lands exactly
       on the element's real edge — i.e. the element's border glows, rather than
       a larger frame floating around it. roundness is derived from the element's
       measured corner radius so the ring matches its true shape (pill / rounded
       / sharp). Re-measures on resize.

         <button data-glow>…</button>                  // auto, 18px bleed
         <button data-glow data-glow-bleed="28">…</button>
         <button data-glow data-glow-colors="#13E0FF,#2D6CFF">…</button>
    */
    function cornerRadiusPx(cs, w, h) {
      var br = cs.borderTopLeftRadius || '0px';
      var minSide = Math.min(w, h) || 1;
      var r = br.indexOf('%') >= 0 ? (parseFloat(br) || 0) / 100 * minSide : (parseFloat(br) || 0);
      return Math.min(r, minSide / 2); // clamp to a perfect pill
    }
    function wireGlow(root) {
      // Sweep glows whose owner element was removed by a React re-render (e.g.
      // the hero HUD card swaps on a changing key) so they don't accumulate —
      // one live WebGL context per data-glow target, not one per render.
      document.querySelectorAll('csa-pulsing-border').forEach(function (g) {
        if (g.__owner && !g.__owner.isConnected) {
          if (typeof g.suspend === 'function') { try { g.suspend(); } catch (e) {} }
          g.remove();
        }
      });
      (root || document).querySelectorAll('[data-glow]').forEach(function (el) {
        if (el.__glow && el.__glowNode && el.__glowNode.isConnected) return;
        el.__glow = true;
        var bleed = num(el.getAttribute('data-glow-bleed'), 18);
        var host = el.parentElement;
        if (!host) return;
        if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
        host.style.overflow = 'visible';
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        if (!el.style.zIndex) el.style.zIndex = '1';

        var glow = document.createElement('csa-pulsing-border');
        glow.__owner = el;
        el.__glowNode = glow;
        if (el.getAttribute('data-glow-colors')) glow.setAttribute('colors', el.getAttribute('data-glow-colors'));
        glow.style.cssText = 'position:absolute;z-index:0;pointer-events:none;';

        function place() {
          var w = el.offsetWidth, h = el.offsetHeight;
          if (!w || !h) return;
          var cw = w + bleed * 2, ch = h + bleed * 2;
          glow.style.left = (el.offsetLeft - bleed) + 'px';
          glow.style.top = (el.offsetTop - bleed) + 'px';
          glow.style.width = cw + 'px';
          glow.style.height = ch + 'px';
          // Push the glowing ring inward by 'bleed' on every side so it lands on
          // the element's real edge (margins are a 0..1 fraction of each side).
          glow.setAttribute('margin-left', (bleed / cw).toFixed(4));
          glow.setAttribute('margin-right', (bleed / cw).toFixed(4));
          glow.setAttribute('margin-top', (bleed / ch).toFixed(4));
          glow.setAttribute('margin-bottom', (bleed / ch).toFixed(4));
          // roundness is relative to the inset ring rect (= the element box)
          var rPx = cornerRadiusPx(getComputedStyle(el), w, h);
          glow.setAttribute('roundness', Math.max(0, Math.min(1, (2 * rPx) / Math.min(w, h))).toFixed(3));
        }
        place();
        host.insertBefore(glow, el);
        try { var ro = new ResizeObserver(place); ro.observe(el); } catch (e) {}
      });
    }
    wireGlow();

    /* keep metal & glow applied as the DOM changes (React mounts, dynamic
       lists) so liquid-metal outlines appear everywhere, not just on first
       paint. Debounced; wiring is idempotent (guarded by el.__metal/__glow). */
    var _rescan = null;
    try {
      new MutationObserver(function () {
        if (_rescan) return;
        _rescan = setTimeout(function () { _rescan = null; wireMetalDefaults(); wireGlow(); }, 150);
      }).observe(document.body || document.documentElement, { childList: true, subtree: true });
    } catch (e) {}

    var _lazyRAF = false;
    function requestLazySync() { if (_lazyRAF) return; _lazyRAF = true; requestAnimationFrame(function () { _lazyRAF = false; syncLazyShaders(); }); }
    window.addEventListener('scroll', requestLazySync, { passive: true });
    window.addEventListener('resize', requestLazySync);
    // periodic catch-all for programmatic changes (carousel switches, scroll
    // reveals, route swaps) that don't emit scroll/resize events.
    setInterval(syncLazyShaders, 500);
    setTimeout(syncLazyShaders, 300);

    window.CSAShaders = { Paper: Paper, ok: !!(Paper && Paper.GrainGradient), wireMetal: wireMetal, wireMetalDefaults: wireMetalDefaults, wireGlow: wireGlow, syncLazy: syncLazyShaders };
  })();
})();
