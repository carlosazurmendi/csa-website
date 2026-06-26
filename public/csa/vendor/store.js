/* ============================================================
   CSA — Client-side commerce + auth store (DESIGN MOCK)
   ------------------------------------------------------------
   A tiny localStorage-backed state layer used by the global nav
   (account menu + mini-cart drawer) and the commerce pages. This
   is a DESIGN STUB only — real auth/session comes from Supabase
   and real cart/orders from the commerce backend (Stripe). The
   field shapes below mirror what those services will provide so
   the UI binds cleanly when the live data lands.

   ── Auth user (Supabase `auth.users` + a `profiles` row) ──
     id        string   Supabase user id (uuid)
     email     string   account email
     fullName  string   profiles.full_name
     company   string   profiles.company
     initials  string   derived from full_name (avatar fallback)
     plan      string   profiles.plan label  (e.g. "Customer")

   ── Cart line item (commerce cart → Stripe line items) ──
     id        string   product / Stripe price id
     name      string   product name        (Templates/Courses CMS)
     meta      string   short variant line   (standard · format)
     kind      string   "TEMPLATE" | "BUNDLE" | "COURSE"
     fmt       string   "DOCX" | "XLSX" | "BUNDLE" | "COURSE"  (thumb)
     price     number   unit price in CENTS  (Stripe amount)
     qty       number   quantity
   ============================================================ */
(function () {
  'use strict';

  var AUTH_KEY = 'csa_auth_user';
  var CART_KEY = 'csa_cart';
  var EVT = 'csa:store';

  // ---- Mock catalog used by the demo cart presets -------------
  var CATALOG = {
    bundle: {
      id: 'bnd_fs_lifecycle_core',
      name: 'Functional Safety Lifecycle Core Bundle',
      meta: 'IEC 61508 · 4 documents',
      kind: 'BUNDLE', fmt: 'BUNDLE', price: 89900, qty: 1,
    },
    hara: {
      id: 'tpl_hara_61508',
      name: 'Hazard Analysis & Risk Assessment (HARA)',
      meta: 'IEC 61508 · Word', kind: 'TEMPLATE', fmt: 'DOCX',
      price: 24900, qty: 1,
    },
    fmea: {
      id: 'tpl_fmea_13849',
      name: 'Failure Mode & Effects Analysis (FMEA)',
      meta: 'ISO 13849 · Excel', kind: 'TEMPLATE', fmt: 'XLSX',
      price: 19900, qty: 1,
    },
    ifsp: {
      id: 'crs_ifsp_61508',
      name: 'IEC 61508 IFSP Training — On-Demand',
      meta: 'Course · 12 modules', kind: 'COURSE', fmt: 'COURSE',
      price: 149000, qty: 1,
    },
  };

  // A representative signed-in user for the logged-in header state.
  var DEMO_USER = {
    id: 'usr_demo_0001',
    email: 'a.reyes@northstar-robotics.com',
    fullName: 'Alex Reyes',
    company: 'Northstar Robotics',
    initials: 'AR',
    plan: 'Customer',
  };

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch (e) { return null; }
  }
  function write(key, val) {
    try {
      if (val == null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { /* ignore (private mode) */ }
    emit();
  }
  function emit() {
    try { window.dispatchEvent(new CustomEvent(EVT)); } catch (e) {}
  }

  var Store = {
    DEMO_USER: DEMO_USER,
    CATALOG: CATALOG,

    /* ---------- Auth ---------- */
    getAuth: function () { return read(AUTH_KEY); },
    login: function (user) { write(AUTH_KEY, user || DEMO_USER); },
    logout: function () { write(AUTH_KEY, null); },

    /* ---------- Cart ---------- */
    getCart: function () { return read(CART_KEY) || []; },
    setCart: function (items) { write(CART_KEY, items || []); },
    cartCount: function () {
      return this.getCart().reduce(function (n, i) { return n + (i.qty || 1); }, 0);
    },
    subtotal: function () {
      return this.getCart().reduce(function (n, i) { return n + i.price * (i.qty || 1); }, 0);
    },
    removeItem: function (id) {
      this.setCart(this.getCart().filter(function (i) { return i.id !== id; }));
    },
    clearCart: function () { this.setCart([]); },

    /* Demo presets so reviewers can flip empty ↔ filled cart. */
    setCartPreset: function (name) {
      if (name === 'empty') return this.setCart([]);
      // filled
      this.setCart([
        Object.assign({}, CATALOG.bundle),
        Object.assign({}, CATALOG.hara),
        Object.assign({}, CATALOG.fmea),
      ]);
    },

    /* ---------- Helpers ---------- */
    formatMoney: function (cents) {
      return '$' + (cents / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
      });
    },
    subscribe: function (fn) {
      window.addEventListener(EVT, fn);
      window.addEventListener('storage', fn); // cross-tab
      return function () {
        window.removeEventListener(EVT, fn);
        window.removeEventListener('storage', fn);
      };
    },
  };

  window.CSAStore = Store;
})();
