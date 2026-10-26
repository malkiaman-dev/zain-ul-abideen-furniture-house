import { useEffect, useRef, useState } from 'react';
import { gsap, lockScroll } from '../lib/motion.js';

/* Waits for fonts + the first hero photo, then wipes away */
export default function Loader({ onDone }) {
  const root = useRef(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    lockScroll(true);
    const prog = { v: 0 };
    const fill = gsap.to(prog, { v: 90, duration: 1.6, ease: 'power2.out', onUpdate: () => setCount(Math.round(prog.v)) });

    const heroImg = new Promise(res => {
      const img = new Image();
      img.onload = img.onerror = res;
      img.src = window.innerWidth > 1000 ? '/images/hero-closet.webp' : '/images/hero-closet-sm.webp';
    });
    const ready = Promise.race([
      Promise.all([document.fonts?.ready, heroImg]),
      new Promise(r => setTimeout(r, 4000))
    ]);

    let tl, dead = false;
    ready.then(() => {
      if (dead) return;
      fill.kill();
      tl = gsap.timeline()
        .to(prog, { v: 100, duration: 0.35, onUpdate: () => setCount(Math.round(prog.v)) })
        .to(root.current.querySelector('.loader__inner'), { autoAlpha: 0, y: -16, duration: 0.45, ease: 'power2.in' })
        .add(() => onDone())
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' })
        .add(() => { lockScroll(false); setGone(true); });
    });
    return () => { dead = true; fill.kill(); tl?.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__inner">
        <img src="/brand/logo-mark.webp" alt="" className="loader__logo" />
        <div className="loader__bar"><span style={{ transform: `scaleX(${count / 100})` }} /></div>
        <div className="loader__count">{count}%</div>
      </div>
    </div>
  );
}
