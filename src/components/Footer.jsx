import { CONFIG, SERVICES } from '../data.js';

export default function Footer() {
  const glow = e => {
    const el = e.currentTarget.querySelector('.footer__mega');
    const r = el.getBoundingClientRect();
    el.style.setProperty('--fx', `${e.clientX - r.left}px`);
    el.style.setProperty('--fy', `${e.clientY - r.top}px`);
  };
  return (
    <footer className="footer" onPointerMove={glow}>
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/brand/logo-stacked.webp" alt={CONFIG.name} loading="lazy" width="820" height="681" />
        </div>
        <div className="footer__cols">
          <div>
            <h4>Services</h4>
            {SERVICES.slice(0, 5).map(s => <a key={s.title} href="#services">{s.title}</a>)}
            <a href="#/sheets">Sheet Catalogue</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`tel:${CONFIG.phoneTel}`}>{CONFIG.phoneDisplay}</a>
            <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
            <p>{CONFIG.address}</p>
            <p>{CONFIG.hours}</p>
          </div>
          <div>
            <h4>Follow</h4>
            {CONFIG.socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener">{s.label}</a>)}
          </div>
        </div>
      </div>
      <div className="footer__mega" aria-hidden="true">ZAIN UL ABIDEEN</div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {CONFIG.name}</span>
        <span>{CONFIG.tagline}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
