import { SERVICES, photo, waLink } from '../data.js';
import { finePointer } from '../lib/motion.js';
import { Arrow, ArrowUpRight } from './Icons.jsx';

export function tilt(e) {
  if (!finePointer()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  el.style.setProperty('--mx', `${x * 100}%`);
  el.style.setProperty('--my', `${y * 100}%`);
  el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
  el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
}
export function untilt(e) {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
}

export default function Services() {
  return (
    <section className="services section" id="services">
      <header className="section__head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot" />What We Make</p>
          <h2 className="h2" data-reveal="1">Everything wooden<br />your home <em className="gold">needs.</em></h2>
        </div>
        <p className="lead" data-reveal="2">Tap any service to get a quick quote on WhatsApp — share your size or a picture of what you like.</p>
      </header>

      <div className="bento">
        {SERVICES.map((s, i) => {
          const p = photo(s.img, s.full);
          return (
            <a
              key={s.title}
              href={waLink(`Assalam o Alaikum! I'm interested in ${s.title}. Please share details and price.`)}
              target="_blank" rel="noopener"
              className={`svc svc--${s.area}`}
              style={{ gridArea: s.area }}
              onPointerMove={tilt} onPointerLeave={untilt}
              data-cursor="Quote" data-reveal={i % 4}
            >
              <div className="svc__img">
                <img src={p.src} srcSet={p.srcSet} width={p.width} height={p.height} sizes="(max-width: 900px) 100vw, 50vw" alt={s.title} loading="lazy" decoding="async" />
              </div>
              <div className="svc__shine" aria-hidden="true" />
              <div className="svc__body">
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </div>
              <span className="svc__go" aria-hidden="true"><ArrowUpRight /></span>
            </a>
          );
        })}
        <div className="svc svc--cta" style={{ gridArea: 'c' }} data-reveal="2">
          <h3>Have your own design?</h3>
          <p>Send us a photo or sketch — our karigars will make it exactly to your size.</p>
          <a href={waLink('Assalam o Alaikum! I have a custom design in mind. Sending a picture.')} target="_blank" rel="noopener" className="btn btn--dark magnetic">
            <span>Send your design</span><Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
