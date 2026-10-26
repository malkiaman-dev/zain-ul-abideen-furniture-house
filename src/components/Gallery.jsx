import { useEffect, useRef, useState } from 'react';
import { GALLERY, GALLERY_FILTERS, photo, waLink } from '../data.js';
import { gsap, ScrollTrigger, lockScroll, reducedMotion } from '../lib/motion.js';
import { Arrow, Chevron, Close } from './Icons.jsx';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(-1);
  const grid = useRef(null);
  const items = filter === 'All' ? GALLERY : GALLERY.filter(g => g.cat === filter);

  // animate items in whenever the filter changes
  useEffect(() => {
    ScrollTrigger.refresh();
    if (reducedMotion()) return;
    const els = grid.current.querySelectorAll('.shot');
    gsap.fromTo(els, { autoAlpha: 0, y: 40, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out', stagger: 0.05, overwrite: true });
  }, [filter]);

  // lightbox keyboard + scroll lock
  useEffect(() => {
    if (open < 0) return;
    lockScroll(true);
    const key = e => {
      if (e.key === 'Escape') setOpen(-1);
      if (e.key === 'ArrowRight') setOpen(i => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setOpen(i => (i - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', key);
    return () => { lockScroll(false); document.removeEventListener('keydown', key); };
  }, [open, items.length]);

  const touch = useRef(0);
  const cur = open >= 0 ? items[open] : null;

  return (
    <section className="gallery section" id="work">
      <header className="section__head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot" />Design Ideas</p>
          <h2 className="h2" data-reveal="1">Designs we can<br /><em className="gold">build for you.</em></h2>
        </div>
        <p className="lead" data-reveal="2">Like something? Open it and send it to us — we'll make it in your size, wood and colour.</p>
      </header>

      <div className="filters" role="tablist" aria-label="Filter designs" data-reveal>
        {GALLERY_FILTERS.map(f => (
          <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? 'is-active' : ''} onClick={() => setFilter(f)}>
            {f}
            <small>{f === 'All' ? GALLERY.length : GALLERY.filter(g => g.cat === f).length}</small>
          </button>
        ))}
      </div>

      <div className="masonry" ref={grid}>
        {items.map((g, i) => {
          const p = photo(g.img, g.full || 1600);
          return (
            <button className="shot" key={g.img} onClick={() => setOpen(i)} data-cursor="Open">
              <img src={p.src} srcSet={p.srcSet} width={p.width} height={p.height} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" alt={g.title} loading="lazy" decoding="async" />
              <span className="shot__info"><b>{g.title}</b><i>{g.cat}</i></span>
            </button>
          );
        })}
      </div>

      {cur && (
        <div
          className="lightbox" role="dialog" aria-modal="true" aria-label={cur.title}
          onClick={e => e.target === e.currentTarget && setOpen(-1)}
          onTouchStart={e => (touch.current = e.touches[0].clientX)}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) setOpen(i => (i + (dx < 0 ? 1 : -1) + items.length) % items.length);
          }}
        >
          <button className="lightbox__close" onClick={() => setOpen(-1)} aria-label="Close"><Close /></button>
          <button className="lightbox__nav lightbox__nav--prev" onClick={() => setOpen(i => (i - 1 + items.length) % items.length)} aria-label="Previous"><Chevron dir="left" /></button>
          <figure className="lightbox__fig" key={cur.img}>
            <img src={photo(cur.img, cur.full || 1600).src} alt={cur.title} />
            <figcaption>
              <div><b>{cur.title}</b><span>{cur.cat} · {open + 1} / {items.length}</span></div>
              <a className="btn btn--gold btn--sm" target="_blank" rel="noopener"
                 href={waLink(`Assalam o Alaikum! I like this design: "${cur.title}". Can you make something similar? Please share price.`)}>
                <span>Get this made</span><Arrow />
              </a>
            </figcaption>
          </figure>
          <button className="lightbox__nav lightbox__nav--next" onClick={() => setOpen(i => (i + 1) % items.length)} aria-label="Next"><Chevron /></button>
        </div>
      )}
    </section>
  );
}
