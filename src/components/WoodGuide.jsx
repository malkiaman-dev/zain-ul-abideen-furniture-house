import { useEffect, useRef, useState } from 'react';
import { WOOD_GUIDE, WOOD_USE } from '../data.js';
import { gsap, reducedMotion } from '../lib/motion.js';
import { Arrow } from './Icons.jsx';

const Pin = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);

/* Tabbed guide to every wood we get asked about, grouped like the local timber market */
export default function WoodGuide() {
  const [tab, setTab] = useState(0);
  const list = useRef(null);
  const group = WOOD_GUIDE[tab];

  useEffect(() => {
    if (reducedMotion()) return;
    gsap.fromTo(list.current.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06, overwrite: true });
  }, [tab]);

  const onKey = e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (tab + (e.key === 'ArrowRight' ? 1 : -1) + WOOD_GUIDE.length) % WOOD_GUIDE.length;
    setTab(next);
    e.currentTarget.querySelectorAll('[role="tab"]')[next].focus();
  };

  return (
    <div className="guide" data-reveal>
      <div className="guide__head">
        <h3>Wood guide <em>— know what you're paying for</em></h3>
        <div className="guide__tabs" role="tablist" aria-label="Wood categories" onKeyDown={onKey}>
          {WOOD_GUIDE.map((g, i) => (
            <button
              key={g.group} role="tab" id={`guide-tab-${i}`}
              aria-selected={tab === i} aria-controls="guide-panel" tabIndex={tab === i ? 0 : -1}
              className={tab === i ? 'is-active' : ''} onClick={() => setTab(i)}
            >
              <span className="guide__tab-n">0{i + 1}</span>{g.group}
            </button>
          ))}
        </div>
      </div>

      <div id="guide-panel" role="tabpanel" aria-labelledby={`guide-tab-${tab}`}>
        <p className="guide__intro"><b>{group.title}.</b> {group.intro}</p>
        <div className="guide__list" ref={list}>
          {group.woods.map(w => (
            <article className={`gw gw--${w.use}`} key={w.name}>
              <span className="gw__use">{WOOD_USE[w.use]}</span>
              <h4>{w.name}</h4>
              <p className="gw__aka">{w.aka}</p>
              <p className="gw__from"><Pin />{w.from}</p>
              <p className="gw__text">{w.text}</p>
              <ul className="gw__for">{w.for.map(f => <li key={f}>{f}</li>)}</ul>
              {w.link && <a className="gw__link" href="#/sheets">Browse 400+ sheet designs <Arrow /></a>}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
