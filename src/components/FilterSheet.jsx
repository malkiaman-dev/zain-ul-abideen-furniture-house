import { useEffect } from 'react';
import { Close } from './Icons.jsx';

export const PALETTE = {
  Beige: '#d8c3a0', Black: '#151515', Blue: '#2f5d9e', Brown: '#7a4b2a', Charcoal: '#3a3a3c', Copper: '#b06a3b',
  Cyan: '#3fb6c6', Gold: '#c9a13e', Green: '#4d8a4a', Grey: '#8c8c8c', Maroon: '#6b1f2a', Multicolored: 'conic-gradient(#e44,#fc3,#4c8,#39f,#a4e,#e44)',
  'Off-White': '#efe8da', Olive: '#7a7a3a', Orange: '#e07a2e', Pink: '#e79bb0', Purple: '#7b4fa0', Red: '#c8352f',
  Silver: '#c4c7cc', Teal: '#2a8a86', White: '#ffffff', Yellow: '#f0cf3f'
};

export const FilterIcon = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
);

function Group({ title, options, value, onChange, swatches }) {
  return (
    <section className="fs__group">
      <h4>{title}</h4>
      <div className="fs__opts">
        {['All', ...options].map(o => (
          <button key={o} className={value === o ? 'is-active' : ''} onClick={() => onChange(o)} aria-pressed={value === o}>
            {swatches && o !== 'All' && <i style={{ background: PALETTE[o] }} />}
            {o}
          </button>
        ))}
      </div>
    </section>
  );
}

/* Bottom sheet with category / surface / colour filters — slides up over the material list */
export default function FilterSheet({ open, onClose, filters, setFilters, options, count }) {
  useEffect(() => {
    if (!open) return;
    const key = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open, onClose]);

  const set = k => v => setFilters(f => ({ ...f, [k]: v }));

  return (
    <div className={`fs${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="fs__scrim" onClick={onClose} />
      <div className="fs__sheet" role="dialog" aria-modal="true" aria-label="Filter panels">
        <span className="fs__grip" aria-hidden="true" />
        <header className="fs__head">
          <h3><FilterIcon />Filter Panels</h3>
          <button className="fs__close" onClick={onClose} aria-label="Close filters"><Close /></button>
        </header>
        <div className="fs__body" data-lenis-prevent>
          <Group title="Category" options={options.series} value={filters.series} onChange={set('series')} />
          <Group title="Surface" options={options.finish} value={filters.finish} onChange={set('finish')} />
          <Group title="Color Palette" options={options.color} value={filters.color} onChange={set('color')} swatches />
        </div>
        <button className="fs__apply" onClick={onClose} disabled={!count}>
          {count ? `Show ${filters.series === 'All' && filters.finish === 'All' && filters.color === 'All' ? 'all ' : ''}${count} panels` : 'No panels match'}
        </button>
      </div>
    </div>
  );
}
