import { useEffect, useMemo, useRef, useState } from 'react';
import CATALOG from '../sheets.json';
import { ROOMS } from '../studioRooms.js';
import { waLink } from '../data.js';
import { loadImage, prepareRoom, renderRoom } from '../lib/roomRender.js';
import { finePointer } from '../lib/motion.js';
import { WhatsApp } from './Icons.jsx';

// door-skin images are posters, not flat boards, so they can't be applied to a surface
const SHEETS = CATALOG.filter(s => s.series !== 'Door Skin');
const BY_CODE = Object.fromEntries(SHEETS.map(s => [s.code, s]));
const SERIES = ['All', ...new Set(SHEETS.map(s => s.series))];
const FINISHES = ['All', 'Wood Grain', 'Solid', 'Marble', 'Brushed Wood', 'Fabric', 'Stone'];
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
  const [series, setSeries] = useState('All');
  const [finish, setFinish] = useState('All');
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
      setRoomIdx(0);
      setSurfaceIdx(0);
      setChoices(c => ({ ...c, [ROOMS[0].id]: { ...c[ROOMS[0].id], [ROOMS[0].surfaces[0].id]: code } }));
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
      const img = await loadImage(`/images/${room.img}.webp`);
      await new Promise(r => requestAnimationFrame(r)); // let the spinner paint first
      if (cancelled) return;
      const p = prepareRoom(img, room);
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
    const entries = await Promise.all(Object.entries(choices[room.id]).map(async ([id, code]) => [id, await getSwatch(code)]));
    if (token !== drawToken.current || prepared.current !== p) return;
    renderRoom(canvasRef.current.getContext('2d'), p, Object.fromEntries(entries));
    setBusy(false);
  }

  const pick = code => setChoices(c => ({ ...c, [room.id]: { ...c[room.id], [surface.id]: code } }));
  const applyAll = () => setChoices(c => ({ ...c, [room.id]: Object.fromEntries(room.surfaces.map(s => [s.id, roomChoices[surface.id]])) }));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHEETS.filter(s =>
      (series === 'All' || s.series === series) &&
      (finish === 'All' || s.finish === finish) &&
      (!q || `${s.code} ${s.name} ${s.finish}`.toLowerCase().includes(q)));
  }, [query, series, finish]);
  useEffect(() => setShown(PAGE), [query, series, finish]);

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
      const sh = BY_CODE[roomChoices[s.id]];
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

  const current = BY_CODE[roomChoices[surface.id]];

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
              <button key={r.id} className={`room${i === roomIdx ? ' is-active' : ''}`} onClick={() => { setRoomIdx(i); setSurfaceIdx(0); setCompare(false); }} aria-pressed={i === roomIdx}>
                <img src={`/images/${r.img}-sm.webp`} alt="" loading="lazy" />
                <span><i>0{i + 1}</i>{r.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Preview */}
        <div className="studio__panel studio__preview">
          <div className="studio__bar">
            <div className="studio__parts" role="tablist" aria-label="Part to change">
              {room.surfaces.map((s, i) => (
                <button key={s.id} role="tab" aria-selected={s.id === surface.id} className={s.id === surface.id ? 'is-active' : ''} onClick={() => setSurfaceIdx(i)}>
                  <img src={swatchSrc(roomChoices[s.id])} alt="" />{s.name}
                </button>
              ))}
            </div>
            <div className="studio__actions">
              <button className={`studio__icon${compare ? ' is-on' : ''}`} onClick={() => setCompare(v => !v)} aria-pressed={compare} title="Before / after"><Compare /><span>Compare</span></button>
              <button className="studio__icon" onClick={download} disabled={busy} title="Download image"><Download /><span>Download</span></button>
            </div>
          </div>

          <div className={`studio__stage${compare ? ' is-compare' : ''}`} ref={stage} onPointerMove={onStageMove} onPointerDown={onStageMove} style={{ '--split': `${split}%`, aspectRatio: prepared.current ? `${prepared.current.W} / ${prepared.current.H}` : undefined }}>
            <canvas ref={canvasRef} aria-label={`${room.name} preview with ${current.code} ${current.name}`} role="img" />
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
          </div>

          <div className="studio__summary">
            <div className="studio__current">
              <img src={swatchSrc(current.code)} alt="" />
              <div>
                <small>{surface.name}</small>
                <b>{current.code} · {current.name}</b>
                <span>{current.series} · {current.finish}</span>
              </div>
            </div>
            <div className="studio__cta">
              {room.surfaces.length > 1 && <button className="btn btn--glass btn--sm" onClick={applyAll}><span>Use on all parts</span></button>}
              <a className="btn btn--wa btn--sm" href={waLink(message())} target="_blank" rel="noopener"><WhatsApp /><span>Get a quote for this</span></a>
            </div>
          </div>
        </div>

        {/* Materials */}
        <aside className="studio__panel studio__mats" aria-label="Sheets">
          <p className="studio__label">02 · Pick a sheet for <b>{surface.name}</b></p>
          <label className="sheets__search studio__search">
            <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Code or colour" aria-label="Search sheets" />
          </label>
          <div className="studio__chips">
            {SERIES.map(s => <button key={s} className={series === s ? 'is-active' : ''} onClick={() => setSeries(s)}>{s === 'All' ? 'All series' : s}</button>)}
          </div>
          <div className="studio__chips studio__chips--sm">
            {FINISHES.map(f => <button key={f} className={finish === f ? 'is-active' : ''} onClick={() => setFinish(f)}>{f === 'All' ? 'All finishes' : f}</button>)}
          </div>
          <div className="studio__swatches">
            {results.slice(0, shown).map(s => (
              <button key={s.code} className={`mat${s.code === current.code ? ' is-active' : ''}`} onClick={() => pick(s.code)} title={`${s.code} — ${s.name}`} aria-pressed={s.code === current.code}>
                <img src={`/sheets/${s.img}.webp`} alt={`${s.code} ${s.name}`} loading="lazy" decoding="async" />
                <span>{s.code}</span>
              </button>
            ))}
          </div>
          {results.length === 0 && <p className="studio__empty">No sheet matches “{query}”.</p>}
          {shown < results.length && (
            <button className="studio__more" onClick={() => setShown(n => n + PAGE)}>Show more ({results.length - shown})</button>
          )}
        </aside>
      </div>

      <p className="studio__note">Preview is a visual guide — real board colour and grain can differ slightly. We'll bring physical samples before production. Sheet designs: ZRK Group.</p>
    </section>
  );
}
