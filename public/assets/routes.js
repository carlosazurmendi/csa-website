/* ============================================================
   CSA — Global route model (single source of truth)
   Used by nav.jsx and footer.jsx so the primary nav and the
   footer share one section structure. Derived from the sitemap
   (roadmap PDF, pp. 2–3).

   Routes point to canonical file paths even where the page is
   not built yet — links resolve to the right place the moment
   each page lands. Spaces in paths are intentional and match the
   project's existing file-naming convention (e.g. "Case Studies.html").
   ============================================================ */
(function () {
  // Primary navigation tree. `cta:true` items render as a button
  // inside the dropdown (used for the deferred "Training Schedule"
  // slot, replaced per copy guide p.25).
  const NAV = [
    { label: 'Home', href: 'Home.html' },
    {
      label: 'Consulting',
      href: 'Consulting/Overview.html',
      children: [
        { label: 'Overview', href: 'Consulting/Overview.html' },
        { label: 'Rail', href: 'Consulting/Rail.html' },
        { label: 'Robotics', href: 'Consulting/Robotics.html' },
        { label: 'Machinery', href: 'Consulting/Machinery.html' },
        { label: 'Physical AI', href: 'Consulting/Physical AI.html' },
        { label: 'Construction & Mining Equipment', href: 'Consulting/Construction - Mining Equipment.html' },
        { label: 'Automotive', href: 'Consulting/Automotive.html' },
        { label: 'Defense', href: 'Consulting/Defense.html' },
        { label: 'Process', href: 'Consulting/Process.html' },
      ],
    },
    {
      label: 'Training & Templates',
      href: 'Training - Templates/Overview.html',
      children: [
        { label: 'Overview', href: 'Training - Templates/Overview.html' },
        { label: 'Course Catalog', href: 'Training - Templates/Course Catalog.html' },
        { label: 'Purchase Templates', href: 'Training - Templates/Purchase Templates.html' },
        // "Training Schedule" page is deferred — slot replaced with a CTA (copy guide p.25).
        { label: 'Request a Private Course', href: 'Training - Templates/Request a Private Course.html', cta: true },
      ],
    },
    {
      label: 'Company',
      href: 'Company/Overview.html',
      children: [
        { label: 'Overview', href: 'Company/Overview.html' },
        { label: 'Experience', href: 'Company/Experience.html' },
        { label: 'Services', href: 'Company/Services.html' },
        { label: 'Careers', href: 'Company/Careers.html' },
      ],
    },
    {
      label: 'Resources',
      href: 'Resources/Overview.html',
      children: [
        { label: 'Overview', href: 'Resources/Overview.html' },
        { label: 'Standards Identifier', href: 'Resources/Standards Identifier.html' },
        { label: 'Safety Chat', href: 'Resources/Safety Chat.html' },
        { label: 'Downloadable Resources', href: 'Resources/Downloadable Resources.html' },
        { label: 'Articles', href: 'Resources/Articles.html' },
        { label: 'Events & Webinars', href: 'Resources/Events - Webinars.html' },
        { label: 'Free Trainings', href: 'Resources/Free Trainings.html' },
      ],
    },
  ];

  // Utility routes (placeholders per scope, p.5).
  const UTIL = {
    consultation: { label: 'Book a Consultation', href: 'Book a Consultation.html' },
    login: { label: 'Login', href: 'Login.html' },
    cart: { label: 'Cart', href: 'Cart.html' },
  };

  // Standard legal / trust links (scope: Terms, Privacy, Digital Refund Policy).
  const LEGAL = [
    { label: 'Terms of Service', href: 'Legal/Terms of Service.html' },
    { label: 'Privacy Policy', href: 'Legal/Privacy Policy.html' },
    { label: 'Digital Refund Policy', href: 'Legal/Digital Refund Policy.html' },
  ];

  // Resolve a route's depth so a page nested in a subfolder can prepend "../".
  // Pages at the project root pass prefix "" (default); nested pages set
  // window.CSA_BASE = "../" before this script loads.
  const BASE = (typeof window !== 'undefined' && window.CSA_BASE) || '';
  function href(h) { return BASE + h; }

  // Mark the current page active when the route is a path-suffix of the current
  // URL. Requiring the folder segment(s) to match means same-named pages in
  // different folders (e.g. several "Overview.html") don't all light up.
  function isActive(h) {
    if (typeof location === 'undefined') return false;
    const loc = decodeURIComponent(location.pathname).split('/').filter(Boolean);
    const tgt = h.split('/').filter(Boolean);
    if (tgt.length === 0 || tgt.length > loc.length) return false;
    for (let i = 1; i <= tgt.length; i++) {
      if (loc[loc.length - i] !== tgt[tgt.length - i]) return false;
    }
    return true;
  }

  window.CSA_NAV = NAV;
  window.CSA_UTIL = UTIL;
  window.CSA_LEGAL = LEGAL;
  window.csaHref = href;
  window.csaIsActive = isActive;
})();
