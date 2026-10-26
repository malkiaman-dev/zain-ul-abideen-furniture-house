import { useEffect, useRef, useState } from 'react';
import { CONFIG, waLink } from '../data.js';
import { getLenis, lockScroll } from '../lib/motion.js';
import { Arrow } from './Icons.jsx';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#offices', label: 'Offices' },
  { href: '#schools', label: 'Schools' },
  { href: '#work', label: 'Designs' },
  { href: '#/sheets', label: 'Sheets', badge: 'New' },
  { href: '#contact', label: 'Contact' }
];
const isRoute = href => href.startsWith('#/');

export default function Nav({ ready, page }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    let last = 0;
    const onScroll = y => {
      setScrolled(y > 40);
      setHidden(y > last && y > 600);
      last = y;
    };
    const lenis = getLenis();
    const handler = () => onScroll(window.scrollY);
    const off = lenis ? lenis.on('scroll', ({ scroll }) => onScroll(scroll)) : null;
    if (!lenis) window.addEventListener('scroll', handler, { passive: true });

    setActive(page === 'home' ? '' : `#/${page}`);
    const sections = page === 'home' ? LINKS.filter(l => !isRoute(l.href)).map(l => document.querySelector(l.href)).filter(Boolean) : [];
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => en.isIntersecting && setActive('#' + en.target.id));
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
    return () => { off?.(); window.removeEventListener('scroll', handler); io.disconnect(); };
  }, [page]);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open || wasOpen.current) lockScroll(open);
    wasOpen.current = open;
    const esc = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  const cls = ['nav', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', ready && 'is-ready', open && 'is-open'].filter(Boolean).join(' ');

  return (
    <>
      <header className={cls}>
        <a href="#top" className="nav__brand" aria-label={`${CONFIG.name} — home`}>
          <img src="/brand/logo-full.webp" alt={CONFIG.name} width="900" height="292" />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className={active === l.href ? 'is-active' : ''} aria-current={active === l.href && isRoute(l.href) ? 'page' : undefined}>
              {l.label}{l.badge && <sup className="nav__badge">{l.badge}</sup>}
            </a>
          ))}
        </nav>
        <a href={`tel:${CONFIG.phoneTel}`} className="nav__phone">{CONFIG.phoneDisplay}</a>
        <a href={waLink()} target="_blank" rel="noopener" className="btn btn--gold btn--sm magnetic nav__cta">
          <span>Free Quote</span><Arrow />
        </a>
        <button className="nav__burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span /><span />
        </button>
      </header>

      <div className={`menu${open ? ' is-open' : ''}`} aria-hidden={!open} onClick={e => e.target.closest('a') && setOpen(false)}>
        <nav>
          {LINKS.map((l, i) => <a key={l.href} href={l.href} style={{ transitionDelay: open ? `${0.15 + i * 0.05}s` : '0s' }}>{l.label}</a>)}
        </nav>
        <div className="menu__foot">
          <a href={`tel:${CONFIG.phoneTel}`}>{CONFIG.phoneDisplay}</a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn--gold"><span>WhatsApp us</span><Arrow /></a>
        </div>
      </div>
    </>
  );
}
