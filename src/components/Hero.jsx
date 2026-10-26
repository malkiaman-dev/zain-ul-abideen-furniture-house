import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDES, photo, imgSize, waLink } from '../data.js';
import { gsap, lerp, reducedMotion, finePointer } from '../lib/motion.js';
import { Arrow, Check } from './Icons.jsx';

const SLIDE_MS = 6500;

/* Splits a string into per-letter spans for the intro reveal */
const Letters = ({ text }) =>
  text.split(' ').map((word, wi, arr) => (
    <span className="word" key={wi}>
      {[...word].map((ch, i) => <span className="char" key={i}>{ch}</span>)}
      {wi < arr.length - 1 && ' '}
    </span>
  ));

export default function Hero({ ready }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(-1);
  const root = useRef(null);
  const media = useRef(null);
  const content = useRef(null);

  const go = i => {
    if (i === index) return;
    setPrev(index);
    setIndex((i + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // autoplay
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => go(index + 1), SLIDE_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ready]);

  // mouse: photo drifts with depth, warm light follows the cursor
  useEffect(() => {
    const el = root.current;
    if (reducedMotion()) return;
    const fine = finePointer();
    const t = { x: 0, y: 0, lx: 0.68, ly: 0.42 };
    const c = { ...t };
    let raf, inView = true, start = performance.now();

    const move = e => {
      const r = el.getBoundingClientRect();
      t.lx = (e.clientX - r.left) / r.width;
      t.ly = (e.clientY - r.top) / r.height;
      t.x = t.lx - 0.5;
      t.y = t.ly - 0.5;
    };
    const io = new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      if (inView) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    });
    io.observe(el);

    function loop(now) {
      if (!inView) return;
      if (!fine) { // touch: gentle automatic drift
        const s = (now - start) / 1000;
        t.x = Math.sin(s * 0.3) * 0.3; t.y = Math.cos(s * 0.25) * 0.2;
        t.lx = 0.5 + t.x; t.ly = 0.45 + t.y;
      }
      for (const k in c) c[k] = lerp(c[k], t[k], 0.06);
      media.current.style.transform = `translate3d(${-c.x * 34}px, ${-c.y * 24}px, 0) scale(1.07)`;
      content.current.style.transform = `translate3d(${c.x * 10}px, ${c.y * 8}px, 0)`;
      el.style.setProperty('--lx', `${c.lx * 100}%`);
      el.style.setProperty('--ly', `${c.ly * 100}%`);
      raf = requestAnimationFrame(loop);
    }
    el.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); el.removeEventListener('pointermove', move); };
  }, []);

  // intro after the loader
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      gsap.timeline({ delay: 0.15 })
        .from('.hero__eyebrow', { autoAlpha: 0, y: 20, duration: 1, ease: 'expo.out' })
        .from('.hero__title .char', { yPercent: 115, rotate: 5, duration: 1.3, ease: 'expo.out', stagger: 0.018 }, '-=.8')
        .from('.hero__sub, .hero__ctas > *, .hero__trust li', { autoAlpha: 0, y: 26, duration: 1, ease: 'expo.out', stagger: 0.06 }, '-=1')
        .from('.hero__panel', { autoAlpha: 0, x: 40, duration: 1.2, ease: 'expo.out' }, '-=1');
      gsap.to('.hero__inner', {
        yPercent: -14, autoAlpha: 0.15, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const slide = HERO_SLIDES[index];

  return (
    <section className="hero" ref={root} aria-label="Introduction">
      <div className="hero__media" ref={media}>
        {HERO_SLIDES.map((s, i) => {
          const p = photo(s.img, 2400);
          const cls = i === index ? 'is-active' : i === prev ? 'is-prev' : '';
          return (
            <div className={`hero__slide ${cls}`} key={s.img} aria-hidden={i !== index}>
              <img src={p.src} srcSet={p.srcSet} sizes="100vw" alt={s.title} fetchpriority={i === 0 ? 'high' : 'low'} decoding="async" />
            </div>
          );
        })}
      </div>
      <div className="hero__light" aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__inner" ref={content}>
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow"><span className="dot" />Custom Furniture & Woodwork</p>
          <h1 className="hero__title" aria-label="Custom furniture, crafted for your home.">
            <span className="line" aria-hidden="true"><Letters text="Custom furniture," /></span>
            <span className="line" aria-hidden="true"><em className="gold"><Letters text="crafted" /></em>{' '}<Letters text="for" /></span>
            <span className="line" aria-hidden="true"><Letters text="your home." /></span>
          </h1>
          <p className="hero__sub">
            Wardrobes, kitchens, doors, windows and complete rooms — made to your exact measurements in solid wood and premium sheets.
          </p>
          <div className="hero__ctas">
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn--gold magnetic">
              <span>Get a Free Quote</span><Arrow />
            </a>
            <a href="#work" className="btn btn--glass magnetic"><span>See Designs</span></a>
          </div>
          <ul className="hero__trust">
            <li><Check />Free home measurement</li>
            <li><Check />Solid wood &amp; sheets</li>
            <li><Check />Delivery &amp; fitting</li>
          </ul>
        </div>

        <aside className="hero__panel" aria-label="Featured work">
          <div className="hero__caption" key={index}>
            <span className="hero__count">0{index + 1} <i>/ 0{HERO_SLIDES.length}</i></span>
            <strong>{slide.title}</strong>
            <span>{slide.note}</span>
          </div>
          <div className="hero__thumbs">
            {HERO_SLIDES.map((s, i) => (
              <button key={s.img} className={`hero__thumb${i === index ? ' is-active' : ''}`} onClick={() => go(i)} aria-label={`Show ${s.title}`} data-cursor="View">
                <img src={`/images/${s.img}-sm.webp`} alt="" loading="lazy" {...imgSize(s.img)} />
                <span className="hero__bar"><i key={`${index}-${ready}`} style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: ready ? 'running' : 'paused' }} /></span>
              </button>
            ))}
          </div>
        </aside>
      </div>

    </section>
  );
}
