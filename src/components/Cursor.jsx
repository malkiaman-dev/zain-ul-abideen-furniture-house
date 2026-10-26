import { useEffect, useRef } from 'react';
import { mouse, lerp, finePointer, reducedMotion } from '../lib/motion.js';

/* Gold dot + trailing ring. Elements with data-cursor="Text" show a label. */
export default function Cursor() {
  const root = useRef(null);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    document.documentElement.classList.add('has-cursor');
    const el = root.current;
    const ring = el.querySelector('.cursor__ring');
    const dot = el.querySelector('.cursor__dot');
    const label = el.querySelector('.cursor__label');
    const pos = { x: mouse.x, y: mouse.y };
    let raf, last = performance.now();

    // frame-rate independent easing: same feel on 60 Hz and 144 Hz screens, no jumps after a slow frame
    const ease = (rate, dt) => 1 - Math.exp(-rate * dt);
    const tick = now => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // dot and ring share one smoothed position so they always stay centred together
      const k = ease(24, dt);
      pos.x = lerp(pos.x, mouse.x, k); pos.y = lerp(pos.y, mouse.y, k);
      // position via the standalone `translate` property: it is applied before `scale`,
      // so shrinking/growing the ring never shifts where it sits
      const t = `${pos.x.toFixed(2)}px ${pos.y.toFixed(2)}px`;
      dot.style.translate = t;
      ring.style.translate = t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const SEL = '[data-cursor], a, button, label, [role="button"]';
    const over = e => {
      const t = e.target.closest(SEL);
      if (!t) return;
      const text = t.getAttribute('data-cursor');
      if (text) { label.textContent = text; el.classList.add('is-label'); }
      else el.classList.add('is-hover');
    };
    const out = e => {
      const t = e.target.closest(SEL);
      if (!t || t.contains(e.relatedTarget)) return;
      el.classList.remove('is-hover', 'is-label');
    };
    const down = () => el.classList.add('is-down');
    const up = () => el.classList.remove('is-down');
    const hide = () => (el.style.opacity = 0);
    const show = () => (el.style.opacity = 1);

    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    document.documentElement.addEventListener('mouseleave', hide);
    document.documentElement.addEventListener('mouseenter', show);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('mouseleave', hide);
      document.documentElement.removeEventListener('mouseenter', show);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__ring"><span className="cursor__label" /></div>
      <div className="cursor__dot" />
    </div>
  );
}
