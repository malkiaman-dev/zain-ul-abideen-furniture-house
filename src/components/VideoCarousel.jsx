import { useCallback, useEffect, useRef, useState } from 'react';
import { CONFIG, REELS, waLink } from '../data.js';
import { lockScroll, reducedMotion } from '../lib/motion.js';
import { Close, WhatsApp } from './Icons.jsx';

const AUTOPLAY_MS = 3800;
const SIDE = 2; // cards shown either side of the centre

const Insta = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
);
const Play = () => (
  <svg viewBox="0 0 24 24" className="ico ico--fill" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
);

/* signed distance of card i from the centre card, wrapping around the loop */
const offsetOf = (i, index, n) => {
  let o = (i - index) % n;
  if (o > n / 2) o -= n;
  if (o < -n / 2) o += n;
  return o;
};

/* Curved reel carousel: centre card small and flat, side cards larger and turned toward
   the viewer, so the row reads like a concave screen. Clips autoplay muted while visible. */
export default function VideoCarousel() {
  const n = REELS.length;
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(-1);
  const root = useRef(null);
  const videos = useRef([]);
  const drag = useRef(null);

  const go = useCallback(i => setIndex(((i % n) + n) % n), [n]);

  // only spend bandwidth / CPU while the section is on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '150px' });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // play the visible clips, pause the rest
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      const visible = Math.abs(offsetOf(i, index, n)) <= SIDE;
      if (inView && visible && open < 0) v.play().catch(() => {});
      else v.pause();
    });
  }, [index, inView, open, n]);

  // autoplay advance
  useEffect(() => {
    if (!inView || paused || open >= 0 || reducedMotion()) return;
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, inView, paused, open, go]);

  // lightbox: lock page scroll, close on Esc, arrows step through reels
  useEffect(() => {
    if (open < 0) return;
    lockScroll(true);
    const key = e => {
      if (e.key === 'Escape') setOpen(-1);
      if (e.key === 'ArrowRight') setOpen(o => (o + 1) % n);
      if (e.key === 'ArrowLeft') setOpen(o => (o - 1 + n) % n);
    };
    document.addEventListener('keydown', key);
    return () => { lockScroll(false); document.removeEventListener('keydown', key); };
  }, [open, n]);

  // swipe / drag to move
  const onDown = e => { drag.current = { x: e.clientX, moved: false }; };
  const onMove = e => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 50) { go(index + (dx < 0 ? 1 : -1)); drag.current = { x: e.clientX, moved: true }; }
  };
  const onUp = () => { setTimeout(() => (drag.current = null), 0); };

  const clickCard = (i, o) => {
    if (drag.current?.moved) return;
    if (o === 0) setOpen(i);
    else go(i);
  };

  const reel = open >= 0 ? REELS[open] : null;

  return (
    <section className="reels section" id="reels" ref={root} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <header className="reels__head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot" />Straight From The Workshop</p>
          <h2 className="h2" data-reveal="1">Made @ <em className="gold">Zain Ul Abideen</em></h2>
        </div>
        <a className="reels__insta" href={CONFIG.instagram.href} target="_blank" rel="noopener" data-reveal="2">
          {CONFIG.instagram.handle}<Insta />
        </a>
      </header>

      <div
        className="reels__stage"
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp}
        role="region" aria-roledescription="carousel" aria-label="Workshop videos"
      >
        {REELS.map((r, i) => {
          const o = offsetOf(i, index, n);
          const a = Math.abs(o);
          return (
            <button
              key={r.name}
              className={`reel${o === 0 ? ' is-center' : ''}`}
              style={{ '--o': o, '--a': a, zIndex: 10 - a, opacity: a > SIDE ? 0 : 1, pointerEvents: a > SIDE ? 'none' : undefined }}
              onClick={() => clickCard(i, o)}
              aria-label={o === 0 ? `Play ${r.title}` : `Show ${r.title}`}
              aria-hidden={a > SIDE}
              tabIndex={a > SIDE ? -1 : 0}
              data-cursor={o === 0 ? 'Play' : 'View'}
            >
              <video
                ref={el => (videos.current[i] = el)}
                src={`/videos/${r.name}.mp4`} poster={`/videos/${r.name}.webp`}
                muted loop playsInline preload={a <= SIDE ? 'metadata' : 'none'}
                width="540" height="960"
              />
              <span className="reel__shade" aria-hidden="true" />
              <span className="reel__cap">
                <small>{r.tag}</small>
                <b>{r.title}</b>
              </span>
              {o === 0 && <span className="reel__play" aria-hidden="true"><Play /></span>}
            </button>
          );
        })}
      </div>

      <div className="reels__dots" role="tablist" aria-label="Choose video">
        {REELS.map((r, i) => (
          <button key={r.name} role="tab" aria-selected={i === index} aria-label={r.title} className={i === index ? 'is-active' : ''} onClick={() => go(i)} />
        ))}
      </div>

      {reel && (
        <div className="reelbox" role="dialog" aria-modal="true" aria-label={reel.title} onClick={e => e.target === e.currentTarget && setOpen(-1)}>
          <button className="lightbox__close" onClick={() => setOpen(-1)} aria-label="Close"><Close /></button>
          <figure className="reelbox__fig" key={reel.name}>
            <video src={`/videos/${reel.name}.mp4`} poster={`/videos/${reel.name}.webp`} autoPlay loop playsInline controls width="540" height="960" />
            <figcaption>
              <div><small>{reel.tag}</small><b>{reel.title}</b></div>
              <a className="btn btn--wa btn--sm" href={waLink('Assalam o Alaikum! I saw your workshop video and would like a quote.')} target="_blank" rel="noopener">
                <WhatsApp /><span>Get a quote</span>
              </a>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
