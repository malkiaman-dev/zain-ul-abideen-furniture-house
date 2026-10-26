import { photo, waLink } from '../data.js';
import { tilt, untilt } from './Services.jsx';
import { Arrow, ArrowUpRight, Check } from './Icons.jsx';

/* Photo grid for a customer segment (schools, offices…) — one big card, four small, one CTA */
export default function Showcase({ data }) {
  const { id, eyebrow, title, accent, intro, points, items, cta } = data;
  return (
    <section className="showcase section" id={id}>
      <header className="section__head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot" />{eyebrow}</p>
          <h2 className="h2" data-reveal="1">{title}<br /><em className="gold">{accent}</em></h2>
        </div>
        <div className="showcase__intro" data-reveal="2">
          <p className="lead">{intro}</p>
          <ul className="showcase__points">
            {points.map(p => <li key={p}><Check />{p}</li>)}
          </ul>
        </div>
      </header>

      <div className="showcase__grid">
        {items.map((s, i) => {
          const p = photo(s.img, s.full);
          return (
            <a
              key={s.title}
              href={waLink(`Assalam o Alaikum! I need ${s.title}. Please share details and price.`)}
              target="_blank" rel="noopener"
              className={`svc showcase__card showcase__card--${s.area}${s.contain ? ' showcase__card--contain' : ''}`}
              style={{ gridArea: s.area }}
              onPointerMove={tilt} onPointerLeave={untilt}
              data-cursor="Quote" data-reveal={i % 3}
            >
              <div className="svc__img">
                <img src={p.src} srcSet={p.srcSet} sizes="(max-width: 900px) 100vw, 40vw" alt={s.title} loading="lazy" decoding="async" />
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
        <div className="svc svc--cta" style={{ gridArea: 'f' }} data-reveal="2">
          <h3>{cta.title}</h3>
          <p>{cta.text}</p>
          <a href={waLink(cta.message)} target="_blank" rel="noopener" className="btn btn--dark magnetic">
            <span>{cta.button}</span><Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
