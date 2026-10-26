import { useState } from 'react';
import { MATERIALS, photo } from '../data.js';

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
    </section>
  );
}
