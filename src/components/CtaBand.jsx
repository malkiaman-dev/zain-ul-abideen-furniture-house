import { CONFIG, photo, waLink } from '../data.js';
import { Phone, WhatsApp } from './Icons.jsx';

export default function CtaBand() {
  const p = photo('craft-dust', 2000);
  return (
    <section className="ctaband" aria-label="Contact us">
      <div className="ctaband__img">
        <img src={p.src} srcSet={p.srcSet} sizes="100vw" alt="Karigar cutting wood in the workshop" loading="lazy" data-parallax="10" />
      </div>
      <div className="ctaband__inner">
        <h2 className="h2" data-reveal>Your dream wardrobe, kitchen<br />or door is <em className="gold">one message away.</em></h2>
        <div className="ctaband__btns" data-reveal="1">
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn--wa magnetic"><WhatsApp /><span>Chat on WhatsApp</span></a>
          <a href={`tel:${CONFIG.phoneTel}`} className="btn btn--glass magnetic"><Phone /><span>Call {CONFIG.phoneDisplay}</span></a>
        </div>
      </div>
    </section>
  );
}
