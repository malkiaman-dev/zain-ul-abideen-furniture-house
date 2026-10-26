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
    let raf;

    const tick = () => {
      pos.x = lerp(pos.x, mouse.x, 0.18);
      pos.y = lerp(pos.y, mouse.y, 0.18);
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

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
