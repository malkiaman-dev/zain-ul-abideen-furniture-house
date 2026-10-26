import { useState } from 'react';
import { MATERIALS, photo } from '../data.js';
import { Arrow } from './Icons.jsx';

/* Expanding panels — hover (or tap) a wood to open it */
export default function Materials() {
  const [active, setActive] = useState(0);
  return (
    <section className="materials section" id="materials">
      <header className="section__head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot" />Materials</p>
          <h2 className="h2" data-reveal="1">Choose your <em className="gold">wood.</em></h2>
        </div>
        <p className="lead" data-reveal="2">Solid hardwood for furniture that lasts generations, or premium sheets for a sleek look at a smart price. We'll help you choose.</p>
      </header>

      <div className="woods" data-reveal>
        {MATERIALS.map((m, i) => {
          const p = photo(m.img, 1200);
          return (
            <button
              key={m.name}
              className={`wood${active === i ? ' is-active' : ''}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={active === i}
            >
              <img src={p.src} srcSet={p.srcSet} sizes="(max-width: 900px) 100vw, 50vw" alt={`${m.name} wood texture`} loading="lazy" />
              <span className="wood__label">{m.name}</span>
              <span className="wood__body">
                <small>{m.type}</small>
                <strong>{m.name}</strong>
                <span>{m.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      <a href="#/sheets" className="sheets-teaser" data-reveal data-cursor="Browse">
        <span className="sheets-teaser__swatches" aria-hidden="true">
          {['3008', '3010', '2033', '3007', '2032'].map(c => <img key={c} src={`/sheets/${c}.webp`} alt="" loading="lazy" />)}
        </span>
        <span className="sheets-teaser__text">
          <b>Prefer sheets? Browse 400+ chipboard, MDF &amp; UV designs</b>
          <span>Wood grains, marbles, solids and high-gloss — shortlist and send us the codes.</span>
        </span>
        <span className="sheets-teaser__go" aria-hidden="true"><Arrow /></span>
      </a>
    </section>
  );
}
