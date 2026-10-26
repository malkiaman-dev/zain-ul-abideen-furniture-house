import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const lerp = (a, b, t) => a + (b - a) * t;

/* Shared live mouse position (viewport px) */
export const mouse = { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: 300 };
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
}

let lenis = null;

export function startSmoothScroll() {
  if (lenis || reducedMotion()) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const getLenis = () => lenis;
export const lockScroll = on => { if (lenis) (on ? lenis.stop() : lenis.start()); document.documentElement.style.overflow = on ? 'hidden' : ''; };

export function scrollToHash(hash) {
  const target = hash === '#top' ? 0 : document.querySelector(hash);
  if (target === null) return;
  if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -60, duration: 1.5 });
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  else target.scrollIntoView({ behavior: 'smooth' });
}

export { gsap, ScrollTrigger };
