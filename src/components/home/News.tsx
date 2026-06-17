'use client'

import { useEffect, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'csa-grain': any
    }
  }
}

export type NewsArticle = { category: string; date: string; title: string; href: string }
export type NewsProps = {
  eyebrow?: string | null; title?: string | null; lead?: string | null
  ctaLabel?: string | null; ctaHref?: string | null
  articles: NewsArticle[]
}

// Mount a GOLD liquid-metal shader ring as the arrow's edge while hovered
// (replacing the old gold-foil FILL). Hover-only so each ring's WebGL context
// is released between hovers — same budget discipline as the card glow below.
// Degrades to the CSS gold edge (.nw-card:hover .nw-card__arrow) if the
// shader element isn't defined (WebGL/CDN unavailable).
function mountArrowMetal(card: any) {
  const arrow = card && card.querySelector('.nw-card__arrow');
  if (!arrow || arrow.__metalRing) return;
  if (!window.customElements || !customElements.get('csa-liquid-metal')) return;
  const ring = document.createElement('csa-liquid-metal');
  ring.setAttribute('ring', '');
  ring.setAttribute('thickness', '2px');
  ring.setAttribute('contour', '0.92');
  ring.setAttribute('repetition', '3');
  ring.setAttribute('tint', '#F4D585');
  ring.setAttribute('color-back', '#7A5E2A');
  ring.setAttribute('distortion', '0.15');
  ring.setAttribute('data-no-lazy', '');
  ring.setAttribute('aria-hidden', 'true');
  ring.style.cssText = 'position:absolute;inset:0;border-radius:inherit;z-index:0;pointer-events:none;';
  arrow.insertBefore(ring, arrow.firstChild);
  arrow.__metalRing = ring;
}
function unmountArrowMetal(card: any) {
  const arrow = card && card.querySelector('.nw-card__arrow');
  if (!arrow || !arrow.__metalRing) return;
  arrow.__metalRing.remove();
  arrow.__metalRing = null;
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: any) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = ((px - 0.5) * 2 * 4).toFixed(2) + 'deg'; // → rotateY
    const ry = (-(py - 0.5) * 2 * 4).toFixed(2) + 'deg'; // → rotateX
    el.style.setProperty('--rx', rx);
    el.style.setProperty('--ry', ry);
    el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    // Tilt the pulsing-border glow (injected as the card's prev sibling) in
    // lockstep so the neon border follows the card in 3D, not flat behind it.
    const glow = el.previousElementSibling as any;
    if (glow && glow.tagName && glow.tagName.toLowerCase() === 'csa-pulsing-border') {
      glow.style.transform = 'rotateX(' + ry + ') rotateY(' + rx + ')';
    }
  };
  const onEnter = () => {
    const el = ref.current;
    if (!el) return;
    // Gold liquid-metal ring on the arrow (replaces the old gold-foil fill).
    mountArrowMetal(el);
    // Lazily mount the pulsing-border glow ONLY while hovered. It's a hover-only
    // affordance, so holding one WebGL context per card at rest would waste the
    // scarce (~16) context budget and make metal edges elsewhere flicker.
    const prev = el.previousElementSibling as any;
    if ((el as any).__glow || prev && prev.tagName && prev.tagName.toLowerCase() === 'csa-pulsing-border') return;
    el.setAttribute('data-glow', '');
    el.setAttribute('data-glow-bleed', '40');
    if ((window as any).CSAShaders && (window as any).CSAShaders.wireGlow) (window as any).CSAShaders.wireGlow(el.parentElement);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    // Tear the glow back down so its WebGL context is released between hovers.
    const glow = el.previousElementSibling as any;
    if (glow && glow.tagName && glow.tagName.toLowerCase() === 'csa-pulsing-border') glow.remove();
    (el as any).__glow = false;
    el.removeAttribute('data-glow');
    // Release the arrow's metal ring context between hovers.
    unmountArrowMetal(el);
  };
  return (
    <a
      className="nw-card csa-glass"
      href={article.href}
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}>

    <div className="nw-card__body">
      <p className="nw-card__meta">
        <span className="nw-card__cat">{article.category}</span>
        <span className="nw-card__sep" />
        <span className="nw-card__date">{article.date}</span>
      </p>
      <h3 className="nw-card__title">{article.title}</h3>
    </div>
    <span className="nw-card__arrow"><i data-lucide="arrow-up-right"></i></span>
  </a>);

}

export function News({
  eyebrow, title, lead,
  ctaLabel, ctaHref,
  articles,
}: NewsProps) {
  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons();
  });

  return (
    <section className="nw" data-screen-label="Latest News">
    <div className="nw__haze" />
    {/* grain-gradient background removed per client request */}
    <div className="nw__inner" data-comment-anchor="3c5dacf081-div-81-7">
      <div className="nw__intro">
        <p className="csa-eyebrow" data-reveal="up" data-scramble>{eyebrow}</p>
        <h2 className="csa-h2 nw__title" data-reveal="up" data-reveal-delay="80">{title}</h2>
        <p className="nw__lead" data-reveal="up" data-reveal-delay="160">{lead}</p>
        <a className="btn btn--lg nw__cta rv-glass-btn" data-metal="gold" data-reveal="up" data-reveal-delay="240" href={ctaHref || '#'} data-comment-anchor="632fde949d-button-111-11">
          {ctaLabel} <i data-lucide="arrow-right"></i>
        </a>
      </div>

      <div className="nw__list">
        {articles.map((a, i) => <NewsCard key={i} article={a} index={i} />)}
      </div>
    </div>
  </section>);

}
