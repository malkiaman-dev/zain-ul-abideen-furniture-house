import { useEffect, useMemo, useRef, useState } from 'react';
import CATALOG from '../sheets.json';
import { ROOMS } from '../studioRooms.js';
import { waLink, imgSize } from '../data.js';
import { loadImage, prepareRoom, renderRoom } from '../lib/roomRender.js';
import { finePointer } from '../lib/motion.js';
import { WhatsApp } from './Icons.jsx';
import FilterSheet, { FilterIcon, PALETTE } from './FilterSheet.jsx';

// door-skin images are posters, not flat boards, so they can't be applied to a surface
const SHEETS = CATALOG.filter(s => s.series !== 'Door Skin');
const BY_CODE = Object.fromEntries(SHEETS.map(s => [s.code, s]));
const byCount = list => Object.entries(list.reduce((m, k) => ((m[k] = (m[k] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]).map(([k]) => k);
const OPTIONS = {
  series: byCount(SHEETS.map(s => s.series)),
  finish: byCount(SHEETS.map(s => s.finish)),
  color: Object.keys(PALETTE).filter(c => SHEETS.some(s => s.colors.includes(c)))
};
const NO_FILTERS = { series: 'All', finish: 'All', color: 'All' };
const PAGE = 60;

const swatchSrc = code => `/sheets/${BY_CODE[code].img}.webp`;
const sheetFromHash = () => {
  const m = window.location.hash.match(/[?&]sheet=([^&]+)/);
  const code = m && decodeURIComponent(m[1]);
  return code && BY_CODE[code] ? code : null;
};
const initialChoices = () =>
  Object.fromEntries(ROOMS.map(r => [r.id, Object.fromEntries(r.surfaces.map(s => [s.id, s.def]))]));

const Download = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
const Reset = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" /></svg>
);
const Expand = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
);
const Eye = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
);
const Compare = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M12 3v18M8 7l-4 5 4 5M16 7l4 5-4 5" /></svg>
);

export default function Studio() {
  const [roomIdx, setRoomIdx] = useState(0);
  const [surfaceIdx, setSurfaceIdx] = useState(0);
  const [choices, setChoices] = useState(initialChoices);
  const [busy, setBusy] = useState(true);
  const [compare, setCompare] = useState(false);
  const [split, setSplit] = useState(50);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(NO_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const canvasRef = useRef(null);
  const stage = useRef(null);
  const prepared = useRef(null);
  const swatchCache = useRef({});
  const drawToken = useRef(0);

  const room = ROOMS[roomIdx];
  const surface = room.surfaces[Math.min(surfaceIdx, room.surfaces.length - 1)];
  const roomChoices = choices[room.id];

  // apply a sheet passed in the link (#/studio?sheet=3008) to the current surface
  useEffect(() => {
    const apply = () => {
      const code = sheetFromHash();
      if (!code) return;
      // sheet links open the wardrobe room (first furniture room), where any sheet reads naturally
      const idx = Math.max(0, ROOMS.findIndex(r => r.id === 'wardrobe'));
      setRoomIdx(idx);
      setSurfaceIdx(0);
      setChoices(c => ({ ...c, [ROOMS[idx].id]: { ...c[ROOMS[idx].id], [ROOMS[idx].surfaces[0].id]: code } }));
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const getSwatch = code => {
    if (!swatchCache.current[code]) swatchCache.current[code] = loadImage(swatchSrc(code));
    return swatchCache.current[code];
  };

  // load + analyse the room photo whenever the room changes
  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    prepared.current = null;
    (async () => {
      const withMask = room.surfaces.filter(s => s.mask);
      const [img, ...maskImgs] = await Promise.all([
        loadImage(`/images/${room.img}.webp`),
        ...withMask.map(s => loadImage(`/studio/mask-${s.mask}.png`))
      ]);
      await new Promise(r => requestAnimationFrame(r)); // let the spinner paint first
      if (cancelled) return;
      const p = prepareRoom(img, room, Object.fromEntries(withMask.map((s, i) => [s.id, maskImgs[i]])));
      if (cancelled) return;
      prepared.current = p;
      const c = canvasRef.current;
      c.width = p.W; c.height = p.H;
      await draw();
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomIdx]);

  // redraw when a material changes
  useEffect(() => { if (prepared.current) draw(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [choices]);

  async function draw() {
    const token = ++drawToken.current;
    const p = prepared.current;
    if (!p) return;
    setBusy(true);
    const entries = await Promise.all(Object.entries(choices[room.id]).filter(([, code]) => code).map(async ([id, code]) => [id, await getSwatch(code)]));
    if (token !== drawToken.current || prepared.current !== p) return;
    renderRoom(canvasRef.current.getContext('2d'), p, Object.fromEntries(entries));
    setBusy(false);
  }

  const pick = code => setChoices(c => ({ ...c, [room.id]: { ...c[room.id], [surface.id]: code } }));
  const reset = () => setChoices(c => ({
    ...c,
    [room.id]: Object.fromEntries(room.surfaces.map(s => [s.id, null]))
  }));
  const goRoom = i => { setRoomIdx((i + ROOMS.length) % ROOMS.length); setSurfaceIdx(0); setCompare(false); };
  const preview = useRef(null);
  const fullscreen = () => {
    const el = stage.current; // only the picture goes full screen, no toolbars
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.();
  };
  const applyAll = () => {
    const code = roomChoices[surface.id];
    if (!code) return;
    setChoices(c => ({ ...c, [room.id]: Object.fromEntries(room.surfaces.map(s => [s.id, code])) }));
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHEETS.filter(s =>
      (filters.series === 'All' || s.series === filters.series) &&
      (filters.finish === 'All' || s.finish === filters.finish) &&
      (filters.color === 'All' || s.colors.includes(filters.color)) &&
      (!q || `${s.code} ${s.name} ${s.finish}`.toLowerCase().includes(q)));
  }, [query, filters]);
  useEffect(() => setShown(PAGE), [query, filters]);
  const activeFilters = Object.values(filters).filter(v => v !== 'All').length;
  const clearAll = () => { setFilters(NO_FILTERS); setQuery(''); };

  const download = () => {
    canvasRef.current.toBlob(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `zain-ul-abideen-${room.id}-design.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  };

  const message = () => {
    const lines = room.surfaces.map(s => {
      const code = roomChoices[s.id];
      if (!code) return `${s.name}: original image, no sheet applied`;
      const sh = BY_CODE[code];
      return `• ${s.name}: ${sh.code} — ${sh.name} (${sh.series})`;
    });
    return `Assalam o Alaikum! I designed a ${room.name} in your Design Studio:\n${lines.join('\n')}\n\nPlease share price and details.`;
  };

  // drag anywhere on the preview to move the before/after divider
  // (mouse: follows hover; touch/pen: follows the drag)
  const onStageMove = e => {
    if (!compare) return;
    if (!(e.pointerType === 'mouse' && finePointer()) && !e.buttons) return;
    const r = stage.current.getBoundingClientRect();
    setSplit(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  const current = roomChoices[surface.id] ? BY_CODE[roomChoices[surface.id]] : null;

  return (
    <section className="studio">
      <header className="studio__head">
        <div>
          <p className="eyebrow"><span className="dot" />Virtual Design Studio</p>
          <h1 className="h2 studio__title">See it before <em className="gold">we build it.</em></h1>
        </div>
        <p className="lead">Pick a room, choose a part, then tap any sheet to see it applied with real lighting. Download your design or send it to us on WhatsApp.</p>
      </header>

      <div className="studio__grid">
        {/* Rooms */}
        <aside className="studio__panel studio__rooms" aria-label="Rooms">
          <p className="studio__label">01 · Choose a room</p>
          <div className="studio__room-list">
            {ROOMS.map((r, i) => (
              <button key={r.id} className={`room${i === roomIdx ? ' is-active' : ''}`} onClick={() => goRoom(i)} aria-pressed={i === roomIdx}>
                <img src={`/images/${r.img}-sm.webp`} alt="" loading="lazy" {...imgSize(r.img)} />
                <span><i>0{i + 1}</i>{r.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Preview */}
        <div className="studio__panel studio__preview" ref={preview}>
          <div className="studio__top">
            <p className="studio__live"><Eye />Live Preview</p>
            <div className="studio__chips-row">
              <span className="studio__chip">{room.name}</span>
              <span className="studio__chip studio__chip--code">{current?.code || 'Original'}</span>
              <button className="studio__dl" onClick={download} disabled={busy}><Download /><span>Download</span></button>
              <button className="studio__tool" onClick={reset} title="Reset image to original"><Reset /><span>Reset</span></button>
              <button className="studio__tool studio__tool--sq" onClick={fullscreen} title="Full screen" aria-label="Full screen"><Expand /></button>
            </div>
          </div>
          <div className="studio__bar">
            <div className="studio__parts" role="tablist" aria-label="Part to change">
              {room.surfaces.map((s, i) => (
                <button key={s.id} role="tab" aria-selected={s.id === surface.id} className={s.id === surface.id ? 'is-active' : ''} onClick={() => setSurfaceIdx(i)}>
                  <img src={roomChoices[s.id] ? swatchSrc(roomChoices[s.id]) : `/images/${room.img}-sm.webp`} alt="" />{s.name}
                </button>
              ))}
            </div>
            <div className="studio__actions">
              <button className={`studio__icon${compare ? ' is-on' : ''}`} onClick={() => setCompare(v => !v)} aria-pressed={compare} title="Before / after"><Compare /><span>Compare</span></button>
            </div>
          </div>

          <div className={`studio__stage${compare ? ' is-compare' : ''}`} ref={stage} onPointerMove={onStageMove} onPointerDown={onStageMove} onDoubleClick={() => document.fullscreenElement && document.exitFullscreen()} style={{ '--split': `${split}%`, aspectRatio: prepared.current ? `${prepared.current.W} / ${prepared.current.H}` : undefined }}>
            <canvas ref={canvasRef} aria-label={current ? `${room.name} preview with ${current.code} ${current.name}` : `${room.name}, original image`} role="img" />
            {compare && (
              <>
                <img className="studio__before" src={`/images/${room.img}.webp`} alt="Original room" />
                <div className="studio__divider" aria-hidden="true"><span><Compare /></span></div>
                <span className="studio__tag studio__tag--l">Before</span>
                <span className="studio__tag studio__tag--r">After</span>
                <input className="studio__range" type="range" min="0" max="100" value={split} onChange={e => setSplit(+e.target.value)} aria-label="Before and after divider" />
              </>
            )}
            <div className={`studio__busy${busy ? ' is-on' : ''}`} aria-hidden="true"><span /></div>
            <button className="studio__arrow studio__arrow--l" onClick={() => goRoom(roomIdx - 1)} aria-label="Previous room">‹</button>
            <button className="studio__arrow studio__arrow--r" onClick={() => goRoom(roomIdx + 1)} aria-label="Next room">›</button>
          </div>

          <div className="studio__summary">
            <div className="studio__current">
              <img src={current ? swatchSrc(current.code) : `/images/${room.img}-sm.webp`} alt="" />
              <div>
                <small>{surface.name}</small>
                <b>{current ? `${current.code} · ${current.name}` : 'Original image'}</b>
                <span>{current ? `${current.series} · ${current.finish}` : 'No sheet applied'}</span>
              </div>
            </div>
            <div className="studio__cta">
              {room.surfaces.length > 1 && <button className="btn btn--glass btn--sm" onClick={applyAll} disabled={!current}><span>Use on all parts</span></button>}
              <a className="btn btn--wa btn--sm" href={waLink(message())} target="_blank" rel="noopener"><WhatsApp /><span>Get a quote for this</span></a>
            </div>
          </div>
        </div>

        {/* Materials */}
        <aside className="studio__panel studio__mats" aria-label="Sheets">
          <div className="studio__mats-head">
            <p className="studio__live">
              <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6" /></svg>Select Material
            </p>
            <div className="studio__mats-tools">
              {(activeFilters > 0 || query) && <button className="studio__clear" onClick={clearAll}>× Clear</button>}
              <button className={`studio__filter${activeFilters ? ' is-on' : ''}`} onClick={() => setFilterOpen(true)}>
                <FilterIcon />Filter{activeFilters > 0 && <b>{activeFilters}</b>}
              </button>
            </div>
          </div>
          <p className="studio__label">For <b>{surface.name}</b> · {results.length} panels</p>
          <label className="sheets__search studio__search">
            <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Code or colour" aria-label="Search sheets" />
          </label>
          {activeFilters > 0 && (
            <div className="studio__active">
              {Object.entries(filters).filter(([, v]) => v !== 'All').map(([k, v]) => (
                <button key={k} onClick={() => setFilters(f => ({ ...f, [k]: 'All' }))} aria-label={`Remove ${v} filter`}>
                  {k === 'color' && <i style={{ background: PALETTE[v] }} />}{v} ×
                </button>
              ))}
            </div>
          )}
          <div className="studio__swatches" data-lenis-prevent>
            {results.slice(0, shown).map(s => (
              <button key={s.code} className={`mat${s.code === current?.code ? ' is-active' : ''}`} onClick={() => pick(s.code)} title={`${s.code} — ${s.name}`} aria-pressed={s.code === current?.code}>
                <img src={`/sheets/${s.img}.webp`} alt={`${s.code} ${s.name}`} loading="lazy" decoding="async" width="420" height="420" />
                <span>{s.code}</span>
              </button>
            ))}
          </div>
          {results.length === 0 && <p className="studio__empty">No panel matches these filters. <button onClick={clearAll}>Clear all</button></p>}
          {shown < results.length && (
            <button className="studio__more" onClick={() => setShown(n => n + PAGE)}>Show more ({results.length - shown})</button>
          )}
          <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} options={OPTIONS} count={results.length} />
        </aside>
      </div>

      <p className="studio__note">Preview is a visual guide — real board colour and grain can differ slightly. We'll bring physical samples before production. Sheet designs: ZRK Group.</p>
    </section>
  );
}
