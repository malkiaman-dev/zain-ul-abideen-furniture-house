import { useEffect, useMemo, useRef, useState } from 'react';
import CATALOG from '../sheets.json';
import { waLink } from '../data.js';
import { gsap, lockScroll, reducedMotion } from '../lib/motion.js';
import { Arrow, Check, Close, WhatsApp } from './Icons.jsx';

const PAGE = 48;
const STORE = 'zuafh-sheet-shortlist';

const SERIES_INFO = {
  'UV Lux': 'Mirror-like UV coated boards',
  'Lamination Series': 'Melamine-faced chipboard & MDF',
  'Textured Laminates': 'Leather, fabric & stone textures',
  'High Gloss Elite': 'Deep high-gloss finishes',
  'Swiss Ultra UV Lux': 'Premium Swiss-grade UV boards',
  'Syncron Line': 'Grain-matched synchronised texture',
  'Door Skin': 'Moulded skins for panel doors'
};

// plain board swatches first, door-skin posters last
const ORDER = Object.keys(SERIES_INFO);
const SHEETS = [...CATALOG].sort((a, b) => ORDER.indexOf(a.series) - ORDER.indexOf(b.series));

const count = (list, key) => list.reduce((m, s) => ((m[s[key]] = (m[s[key]] || 0) + 1), m), {});
const img = s => `/sheets/${s.img}.webp`;

function loadShortlist() {
  try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch { return []; }
}

export default function SheetsPage() {
  const [query, setQuery] = useState('');
  const [series, setSeries] = useState('All');
  const [finish, setFinish] = useState('All');
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const [picked, setPicked] = useState(loadShortlist);
  const grid = useRef(null);
  const sentinel = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(STORE, JSON.stringify(picked)); } catch { /* storage unavailable */ }
  }, [picked]);

  const seriesCounts = useMemo(() => count(SHEETS, 'series'), []);
  const inSeries = useMemo(() => (series === 'All' ? SHEETS : SHEETS.filter(s => s.series === series)), [series]);
  const finishCounts = useMemo(() => count(inSeries, 'finish'), [inSeries]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inSeries.filter(s =>
      (finish === 'All' || s.finish === finish) &&
      (!q || `${s.code} ${s.name} ${s.finish} ${s.series}`.toLowerCase().includes(q))
    );
  }, [inSeries, finish, query]);

  // reset paging (and invalid finish) when filters change
  useEffect(() => { setShown(PAGE); }, [series, finish, query]);
  useEffect(() => { if (finish !== 'All' && !finishCounts[finish]) setFinish('All'); }, [finishCounts, finish]);

  // infinite scroll
  useEffect(() => {
    const io = new IntersectionObserver(([en]) => en.isIntersecting && setShown(n => n + PAGE), { rootMargin: '800px' });
    if (sentinel.current) io.observe(sentinel.current);
    return () => io.disconnect();
  }, [results]);

  // entrance animation for newly rendered swatches
  useEffect(() => {
    if (reducedMotion()) return;
    const fresh = grid.current.querySelectorAll('.sw:not(.is-in)');
    fresh.forEach(el => el.classList.add('is-in'));
    gsap.fromTo(fresh, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.015 });
  }, [results, shown]);

  // modal: keyboard + scroll lock
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const key = e => {
      if (e.key === 'Escape') setOpen(null);
      const i = results.findIndex(s => s.code === open.code);
      if (e.key === 'ArrowRight' && i > -1) setOpen(results[(i + 1) % results.length]);
      if (e.key === 'ArrowLeft' && i > -1) setOpen(results[(i - 1 + results.length) % results.length]);
    };
    document.addEventListener('keydown', key);
    return () => { lockScroll(false); document.removeEventListener('keydown', key); };
  }, [open, results]);

  const toggle = code => setPicked(p => (p.includes(code) ? p.filter(c => c !== code) : [...p, code]));
  const isPicked = code => picked.includes(code);

  const shortlistMsg = () => {
    const lines = picked.map(c => {
      const s = SHEETS.find(x => x.code === c);
      return s ? `• ${s.code} — ${s.name} (${s.series}, ${s.finish})` : `• ${c}`;
    });
    return `Assalam o Alaikum! I like these sheet designs:\n${lines.join('\n')}\n\nPlease share price and availability.`;
  };

  const sheen = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section className="sheets" id="sheets-top">
      <header className="sheets__hero">
        <div className="sheets__hero-bg" aria-hidden="true">
          {SHEETS.filter((_, i) => i % 17 === 3).slice(0, 18).map(s => <img key={s.code} src={img(s)} alt="" />)}
        </div>
        <div className="sheets__hero-inner">
          <p className="eyebrow"><span className="dot" />Sheet Catalogue · ZRK Boards</p>
          <h1 className="h2 sheets__title">{SHEETS.length} sheet designs.<br /><em className="gold">Pick yours.</em></h1>
          <p className="lead">Chipboard, MDF, UV, high-gloss and textured sheets for your wardrobes, kitchens and office furniture. Tap a design to see it bigger, add your favourites to the shortlist and send them to us on WhatsApp.</p>
        </div>
      </header>

      <div className="sheets__tools">
        <label className="sheets__search">
          <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            type="search" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search code or colour — e.g. 3008, walnut, white, marble"
            aria-label="Search sheet designs"
          />
        </label>

        <div className="sheets__series" role="tablist" aria-label="Series">
          {['All', ...Object.keys(SERIES_INFO).filter(k => seriesCounts[k])].map(k => (
            <button key={k} role="tab" aria-selected={series === k} className={series === k ? 'is-active' : ''} onClick={() => setSeries(k)}>
              <span>{k === 'All' ? 'All Series' : k}</span>
              <small>{k === 'All' ? SHEETS.length : seriesCounts[k]}</small>
            </button>
          ))}
        </div>
        {series !== 'All' && <p className="sheets__series-note">{SERIES_INFO[series]}</p>}

        <div className="sheets__finish" aria-label="Finish">
          {['All', ...Object.keys(finishCounts).sort((a, b) => finishCounts[b] - finishCounts[a])].map(f => (
            <button key={f} className={finish === f ? 'is-active' : ''} onClick={() => setFinish(f)}>
              {f === 'All' ? 'All finishes' : f}{f !== 'All' && <small>{finishCounts[f]}</small>}
            </button>
          ))}
        </div>
      </div>

      <p className="sheets__count" role="status">{results.length} design{results.length === 1 ? '' : 's'}</p>

      <div className="sheets__grid" ref={grid}>
        {results.slice(0, shown).map(s => (
          <article className={`sw${isPicked(s.code) ? ' is-picked' : ''}`} key={s.code}>
            <button className="sw__img" onClick={() => setOpen(s)} onPointerMove={sheen} data-cursor="View" aria-label={`View ${s.code} ${s.name}`}>
              <img src={img(s)} alt={`${s.code} ${s.name}`} loading="lazy" decoding="async" width="420" height="420" />
              <span className="sw__sheen" aria-hidden="true" />
              <span className="sw__finish">{s.finish}</span>
            </button>
            <div className="sw__meta">
              <div>
                <b>{s.code}</b>
                <span>{s.name}</span>
              </div>
              <button className="sw__pick" onClick={() => toggle(s.code)} aria-pressed={isPicked(s.code)} aria-label={isPicked(s.code) ? `Remove ${s.code} from shortlist` : `Add ${s.code} to shortlist`}>
                {isPicked(s.code) ? <Check /> : <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>}
              </button>
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="sheets__empty">
          <p>No design matches “{query}”.</p>
          <button className="btn btn--glass btn--sm" onClick={() => { setQuery(''); setSeries('All'); setFinish('All'); }}><span>Clear filters</span></button>
        </div>
      )}
      {shown < results.length && <div ref={sentinel} className="sheets__sentinel" aria-hidden="true" />}

      <p className="sheets__credit">
        Sheet designs and images: ZRK Group — MDF &amp; Particleboard. Colours on screen can differ slightly from the actual board; we'll show you the real sample before production.
      </p>

      {picked.length > 0 && (
        <div className="shortlist" role="region" aria-label="Your shortlist">
          <div className="shortlist__thumbs">
            {picked.slice(-5).map(c => {
              const s = SHEETS.find(x => x.code === c);
              return s && <img key={c} src={img(s)} alt={c} />;
            })}
          </div>
          <span className="shortlist__label"><b>{picked.length}</b> selected</span>
          <button className="shortlist__clear" onClick={() => setPicked([])}>Clear</button>
          <a className="btn btn--wa btn--sm" href={waLink(shortlistMsg())} target="_blank" rel="noopener">
            <WhatsApp /><span>Send to us</span>
          </a>
        </div>
      )}

      {open && (
        <div className="sheetbox" role="dialog" aria-modal="true" aria-label={`${open.code} ${open.name}`} onClick={e => e.target === e.currentTarget && setOpen(null)}>
          <div className="sheetbox__card" key={open.code}>
            <button className="lightbox__close" onClick={() => setOpen(null)} aria-label="Close"><Close /></button>
            <div className="sheetbox__img" onPointerMove={sheen}>
              <img src={img(open)} alt={`${open.code} ${open.name}`} />
              <span className="sw__sheen" aria-hidden="true" />
            </div>
            <div className="sheetbox__info">
              <p className="eyebrow"><span className="dot" />{open.series}</p>
              <h2>{open.code}</h2>
              <p className="sheetbox__name">{open.name}</p>
              <dl>
                <div><dt>Finish</dt><dd>{open.finish}</dd></div>
                <div><dt>Series</dt><dd>{open.series}</dd></div>
                <div><dt>Best for</dt><dd>{bestFor(open)}</dd></div>
              </dl>
              <div className="sheetbox__btns">
                <button className={`btn btn--sm ${isPicked(open.code) ? 'btn--gold' : 'btn--glass'}`} onClick={() => toggle(open.code)}>
                  {isPicked(open.code) ? <><Check /><span>In shortlist</span></> : <span>Add to shortlist</span>}
                </button>
                <a className="btn btn--wa btn--sm" target="_blank" rel="noopener"
                   href={waLink(`Assalam o Alaikum! I'm interested in sheet ${open.code} (${open.name}, ${open.series}). Please share price and availability.`)}>
                  <WhatsApp /><span>Ask about this</span>
                </a>
              </div>
              <a href="#contact" className="sheetbox__link">Need a full quote for furniture in this sheet? <Arrow /></a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function bestFor(s) {
  if (s.series === 'Door Skin') return 'Panel doors';
  if (s.series === 'High Gloss Elite' || /UV/.test(s.series)) return 'Kitchens, wardrobe shutters, TV units';
  if (s.finish === 'Marble' || s.finish === 'Stone') return 'Feature walls, counters, TV panels';
  if (s.finish === 'Solid') return 'Kitchens, kids rooms, office storage';
  if (/Wood|Pine|Oak/.test(s.finish)) return 'Wardrobes, beds, office tables';
  return 'Wardrobes, kitchens, office furniture';
}
