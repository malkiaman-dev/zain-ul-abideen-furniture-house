/* ==========================================================================
   Zain Ul Abideen Furniture House — interactions
   ========================================================================== */

/* -------- Business settings: change these -------- */
const CONFIG = {
  whatsapp: '923000000000',            // WhatsApp number, country code + number, no "+" or spaces
  whatsappGreeting: 'Assalam o Alaikum! I would like to know more about your furniture services.'
};

/* -------- Content -------- */
const ICONS = {
  almari: '<svg viewBox="0 0 48 48"><rect x="10" y="4" width="28" height="38" rx="1.5"/><path d="M24 4v38M21 21v6M27 21v6M12 42v3M36 42v3M10 10h28"/></svg>',
  wardrobe: '<svg viewBox="0 0 48 48"><rect x="5" y="5" width="38" height="37" rx="1.5"/><path d="M17.7 5v37M30.3 5v37M15 20v6M20.5 20v6M33 20v6M5 11h38M8 42v3M40 42v3"/></svg>',
  door: '<svg viewBox="0 0 48 48"><path d="M9 45V4h30v41M4 45h40"/><rect x="14" y="9" width="20" height="13" rx="1"/><rect x="14" y="26" width="20" height="14" rx="1"/><circle cx="31" cy="24" r="1.3"/></svg>',
  window: '<svg viewBox="0 0 48 48"><rect x="7" y="5" width="34" height="36" rx="1.5"/><path d="M24 5v36M7 23h34M4 41h40M12 10l7 7M29 10l7 7"/></svg>',
  kitchen: '<svg viewBox="0 0 48 48"><rect x="4" y="5" width="40" height="11" rx="1"/><rect x="4" y="24" width="40" height="18" rx="1"/><path d="M17 5v11M31 5v11M17 24v18M31 24v18M4 24h40M24 24v-6a3 3 0 0 1 6 0M14 29h-4M38 29h-4"/></svg>',
  table: '<svg viewBox="0 0 48 48"><path d="M3 17h42v5H3zM8 22v21M40 22v21M8 34h32M14 22l-2 12M34 22l2 12"/></svg>',
  bed: '<svg viewBox="0 0 48 48"><path d="M5 40V12M5 26h38v14M43 40v-6M5 34h38M9 26v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M23 26v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/></svg>',
  office: '<svg viewBox="0 0 48 48"><rect x="10" y="6" width="22" height="15" rx="1.5"/><path d="M21 21v5M15 26h12M3 30h42M7 30v14M41 30v14M29 30v9h12"/><path d="M33 34.5h4"/></svg>',
  sofa: '<svg viewBox="0 0 48 48"><path d="M9 22v-7a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v7"/><path d="M5 22a3 3 0 0 1 3 3v5h32v-5a3 3 0 0 1 6 0v11H2V25a3 3 0 0 1 3-3zM7 36v4M41 36v4M14 30v-4h20v4"/></svg>'
};

const SERVICES = [
  { icon: 'almari', title: 'Almari & Cupboards', urdu: 'الماری', tex: 'sheesham', desc: 'Built-in and free-standing almari with smart shelving, hanging space, drawers and secure locks.', tags: ['Built-in', 'Free-standing', 'Lockers'] },
  { icon: 'wardrobe', title: 'Wardrobes', urdu: 'وارڈروب', tex: 'walnut', desc: 'Sliding and hinged wardrobes, walk-in closets and dressing units with mirror, glass or high-gloss finishes.', tags: ['Sliding', 'Walk-in', 'Mirror'] },
  { icon: 'door', title: 'Doors', urdu: 'دروازے', tex: 'diyar', desc: 'Solid wood main doors with hand carving, panel and flush room doors — complete with chokhat & fitting.', tags: ['Main doors', 'Carved', 'Flush'] },
  { icon: 'window', title: 'Windows', urdu: 'کھڑکیاں', tex: 'kail', desc: 'Wooden khirkiyan, frames, shutters and jali work in seasoned timber made to resist heat and moisture.', tags: ['Frames', 'Shutters', 'Jali'] },
  { icon: 'kitchen', title: 'Kitchens', urdu: 'کچن', tex: 'oak', desc: 'Modular kitchens in solid wood or sheets — soft-close hardware, overhead cabinets, pantry pull-outs.', tags: ['Modular', 'Soft-close', 'Pantry'] },
  { icon: 'table', title: 'Tables', urdu: 'میز', tex: 'sheesham', desc: 'Dining, centre, study and office tables in solid wood with custom sizes, edges and top finishes.', tags: ['Dining', 'Centre', 'Study'] },
  { icon: 'bed', title: 'Bedrooms & Rooms', urdu: 'کمرے', tex: 'walnut', desc: 'Complete rooms: beds, side tables, dressing, wall paneling and storage — designed as one matching set.', tags: ['Bed sets', 'Paneling', 'Dressing'] },
  { icon: 'office', title: 'Office & Shops', urdu: 'دفتر', tex: 'oak', desc: 'Workstations, reception counters, display racks and shop fittings built for daily heavy use.', tags: ['Workstations', 'Counters', 'Racks'] }
];

const MATERIALS = [
  { key: 'sheesham', name: 'Sheesham', tag: 'Solid Hardwood', urdu: 'شیشم کی لکڑی', desc: 'The king of local hardwoods — dense, heavy and beautifully streaked. Ages gracefully and lasts for generations.', best: 'Beds, dining tables, almari, heirloom furniture', m: { Strength: .95, Durability: .95, Finish: .9, Budget: .45 } },
  { key: 'diyar', name: 'Diyar (Deodar)', tag: 'Solid Softwood', urdu: 'دیار کی لکڑی', desc: 'Aromatic cedar with natural oils that resist termites and moisture — the classic choice for doors and windows.', best: 'Main doors, windows, frames, outdoor work', m: { Strength: .8, Durability: .92, Finish: .8, Budget: .55 } },
  { key: 'kail', name: 'Kail (Pine)', tag: 'Solid Softwood', urdu: 'کیل کی لکڑی', desc: 'Light, warm-toned and easy to work. A smart, affordable solid-wood option for interiors.', best: 'Room doors, ceilings, shelving, interior frames', m: { Strength: .6, Durability: .65, Finish: .75, Budget: .78 } },
  { key: 'walnut', name: 'Walnut (Akhrot)', tag: 'Premium Hardwood', urdu: 'اخروٹ کی لکڑی', desc: 'Deep chocolate tones with a silky grain. The luxury pick for statement pieces and executive interiors.', best: 'Wardrobes, paneling, executive desks, consoles', m: { Strength: .85, Durability: .9, Finish: 1, Budget: .3 } },
  { key: 'oak', name: 'Oak / Ash', tag: 'Imported Hardwood', urdu: 'اوک / ایش', desc: 'Light, modern and very strong with a pronounced open grain. Perfect for contemporary Scandinavian looks.', best: 'Kitchens, modern tables, office furniture', m: { Strength: .9, Durability: .88, Finish: .92, Budget: .4 } },
  { key: 'mdf', name: 'MDF Board', tag: 'Engineered Sheet', urdu: 'ایم ڈی ایف شیٹ', desc: 'Perfectly smooth and stable — ideal for paint, lacquer, PU and routed designs without any grain showing.', best: 'Lacquered wardrobes, routed doors, TV consoles', m: { Strength: .55, Durability: .6, Finish: .95, Budget: .82 } },
  { key: 'chip', name: 'Lasani / Chipboard', tag: 'Engineered Sheet', urdu: 'لاثانی / چپ بورڈ', desc: 'Melamine-faced particle board in hundreds of woodgrain and solid colours. Clean, modern and very budget friendly.', best: 'Budget wardrobes, kitchens, office storage', m: { Strength: .5, Durability: .58, Finish: .75, Budget: .95 } },
  { key: 'gloss', name: 'HPL / UV High-Gloss', tag: 'Premium Sheet', urdu: 'ہائی گلوس شیٹ', desc: 'Scratch-resistant laminates and mirror-like UV gloss sheets for that ultra-modern, easy-to-clean look.', best: 'Modern kitchens, wardrobe shutters, shop fronts', m: { Strength: .65, Durability: .82, Finish: 1, Budget: .6 } }
];

const SPACES = [
  { tex: 'walnut', icon: 'bed' },
  { tex: 'oak', icon: 'kitchen' },
  { tex: 'sheesham', icon: 'sofa' },
  { tex: 'gloss', icon: 'office' },
  { tex: 'diyar', icon: 'door' }
];

// SAMPLE reviews — replace with real client feedback before going live
const VOICES = [
  { q: 'They made our complete bedroom set in sheesham. Finishing is outstanding and everything fit perfectly.', n: 'Ahmed R.', c: 'Bedroom set' },
  { q: 'Our modular kitchen came out better than the design. Very professional team, on-time delivery.', n: 'Sana K.', c: 'Kitchen' },
  { q: 'Main door in diyar with carving — every guest asks who made it. Highly recommended.', n: 'Bilal M.', c: 'Main door' },
  { q: 'Built-in almari in three rooms. Measurements were exact and the installation was clean.', n: 'Fatima Z.', c: 'Almari' },
  { q: 'Got all our office workstations and reception counter made. Solid quality at a fair price.', n: 'Usman T.', c: 'Office' },
  { q: 'Sliding wardrobe with mirror shutters looks premium. Great advice on choosing materials.', n: 'Ayesha N.', c: 'Wardrobe' },
  { q: 'Replaced all our windows with seasoned wood frames. No warping even after the monsoon.', n: 'Hamza A.', c: 'Windows' },
  { q: 'Dining table for 8 in solid wood — heavy, beautiful and exactly the finish we wanted.', n: 'Rabia S.', c: 'Dining table' }
];

/* ==========================================================================
   Procedural wood textures (SVG turbulence -> banded colour ramp)
   ========================================================================== */
const PALETTES = {
  sheesham: { c: ['#2a160b', '#5a3118', '#7a4521', '#3e2210'], f: '0.0018 0.016', o: 3, s: 3, bands: 5 },
  diyar:    { c: ['#8a5a2e', '#b07a41', '#c99456', '#9c6838'], f: '0.0022 0.02', o: 3, s: 11, bands: 4 },
  kail:     { c: ['#c79a62', '#dfb57c', '#e9c690', '#d1a46b'], f: '0.0016 0.014', o: 3, s: 7, bands: 4 },
  walnut:   { c: ['#1c110b', '#3b2416', '#563521', '#2c1a10'], f: '0.002 0.018', o: 4, s: 21, bands: 5 },
  oak:      { c: ['#a98352', '#c9a36d', '#dcbc87', '#b8915c'], f: '0.0012 0.024', o: 3, s: 5, bands: 6 },
  mdf:      { c: ['#8a6a48', '#9a7853', '#8f6f4c', '#a07f5a'], f: '0.6 0.6', o: 2, s: 2, bands: 2 },
  chip:     { c: ['#6d4a2c', '#a07448', '#c49a68', '#7e5734'], f: '0.25 0.25', o: 2, s: 9, bands: 3 },
  gloss:    { c: ['#1a1310', '#2a1f19', '#3b2d24', '#221914'], f: '0.002 0.02', o: 2, s: 4, bands: 2, gloss: true }
};
const texCache = {};

function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }

function woodTexture(key, vertical = true) {
  const id = key + (vertical ? 'v' : 'h');
  if (texCache[id]) return texCache[id];
  const p = PALETTES[key];
  const rgb = p.c.map(hexToRgb);
  const ramp = ch => { const v = []; for (let i = 0; i < p.bands; i++) rgb.forEach(c => v.push(c[ch].toFixed(3))); return v.join(' '); };
  const S = 600;
  const rot = vertical ? `transform='rotate(90 ${S / 2} ${S / 2})'` : '';
  const gloss = p.gloss
    ? `<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#fff' stop-opacity='.16'/><stop offset='.45' stop-color='#fff' stop-opacity='0'/><stop offset='.55' stop-color='#fff' stop-opacity='.07'/><stop offset='1' stop-color='#000' stop-opacity='.2'/></linearGradient><rect width='100%' height='100%' fill='url(#g)'/>`
    : `<rect width='100%' height='100%' filter='url(#fib)' opacity='.35' ${rot}/>`;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${S}' height='${S}' viewBox='0 0 ${S} ${S}'>` +
    `<filter id='w' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='${p.f}' numOctaves='${p.o}' seed='${p.s}'/>` +
    `<feColorMatrix values='1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1'/>` +
    `<feComponentTransfer><feFuncR type='table' tableValues='${ramp(0)}'/><feFuncG type='table' tableValues='${ramp(1)}'/><feFuncB type='table' tableValues='${ramp(2)}'/><feFuncA type='table' tableValues='1 1'/></feComponentTransfer></filter>` +
    `<filter id='fib' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='0.003 0.45' numOctaves='2' seed='${p.s + 3}'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.1'/></filter>` +
    `<rect width='100%' height='100%' filter='url(#w)' ${rot}/>` + gloss + `</svg>`;
  // single-quoted url() with %27-escaped quotes so it is safe inside style="" attributes
  return (texCache[id] = `url('data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27')}')`);
}

/* ==========================================================================
   Build dynamic sections
   ========================================================================== */
function buildServices() {
  const track = document.getElementById('servicesTrack');
  track.innerHTML = SERVICES.map((s, i) => `
    <article class="card" data-hover="Explore">
      <div class="card__tex" style="background-image:${woodTexture(s.tex)}"></div>
      <div class="card__border"></div>
      <div class="card__inner">
        <div class="card__top">
          <span class="card__num">${String(i + 1).padStart(2, '0')} / ${String(SERVICES.length).padStart(2, '0')}</span>
          <div class="card__icon">${ICONS[s.icon]}</div>
        </div>
        <div class="card__body">
          <p class="card__urdu" lang="ur" dir="rtl">${s.urdu}</p>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <div class="card__tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
        </div>
      </div>
    </article>`).join('') + `
    <article class="card card--cta">
      <h3>Something custom in mind?</h3>
      <p>If it can be made from wood or sheets, our karigars can build it — exactly to your size and style.</p>
      <a href="#contact" class="btn magnetic" data-hover><span>Discuss your idea</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </article>`;
}

function buildVoices() {
  const wrap = document.getElementById('voicesRows');
  const card = v => `
    <figure class="quote-card">
      <div class="quote-card__stars" aria-label="5 stars">★★★★★</div>
      <p>“${v.q}”</p>
      <footer><span class="quote-card__av">${v.n[0]}</span><span><b>${v.n}</b>${v.c}</span></footer>
    </figure>`;
  const half = Math.ceil(VOICES.length / 2);
  const rows = [VOICES.slice(0, half), VOICES.slice(half)];
  wrap.innerHTML = rows.map((r, i) => {
    const html = r.map(card).join('');
    return `<div class="voices__row${i ? ' voices__row--rev' : ''}">${html}${html}</div>`;
  }).join('');
}

function buildSpacesPreview() {
  document.getElementById('spacesPreviewInner').innerHTML = SPACES.map((s, i) =>
    `<div class="spaces__slide" style="top:${i * 100}%;background-image:${woodTexture(s.tex)}">${ICONS[s.icon]}</div>`).join('');
}

buildServices();
buildVoices();
buildSpacesPreview();
document.getElementById('year').textContent = new Date().getFullYear();

/* ==========================================================================
   Environment
   ========================================================================== */
const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const lerp = (a, b, t) => a + (b - a) * t;

if (hasGSAP) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('js-anim');
}

/* -------- Smooth scroll -------- */
let lenis = null;
if (typeof window.Lenis !== 'undefined' && !reduced) {
  lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  if (hasGSAP) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}

function scrollToTarget(sel) {
  const el = sel === '#top' ? 0 : document.querySelector(sel);
  if (el === null) return;
  if (lenis) lenis.scrollTo(el, { offset: el === 0 ? 0 : -70, duration: 1.6 });
  else if (el === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  else el.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href.length < 2) return;
  e.preventDefault();
  closeMenu();
  scrollToTarget(href);
});

/* ==========================================================================
   Preloader + hero intro
   ========================================================================== */
const heroTitle = document.getElementById('heroTitle');
const heroChars = [];
heroTitle.querySelectorAll('.word').forEach(w => {
  const text = w.textContent;
  w.textContent = '';
  for (const ch of text) {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch;
    s.setAttribute('aria-hidden', 'true');
    w.appendChild(s);
    heroChars.push(s);
  }
});

function runLoader() {
  const loader = document.getElementById('loader');
  const count = document.getElementById('loaderCount');
  const bar = loader.querySelector('.loader__bar span');
  document.body.classList.add('is-loading');
  if (lenis) lenis.stop();

  if (!hasGSAP) {
    loader.remove();
    document.body.classList.remove('is-loading');
    if (lenis) lenis.start();
    return;
  }

  const ready = Promise.race([
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(r => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })))
    ]),
    new Promise(r => setTimeout(r, 3500))
  ]);

  const prog = { v: 0 };
  const fill = gsap.to(prog, {
    v: 90, duration: 1.4, ease: 'power2.out',
    onUpdate: () => { count.textContent = Math.round(prog.v); bar.style.transform = `scaleX(${prog.v / 100})`; }
  });

  gsap.set(heroChars, { yPercent: 120, rotate: 6 });
  gsap.set(['.hero__eyebrow', '.hero__sub', '.hero__ctas > *', '.hero__meta > *', '.nav'], { autoAlpha: 0, y: 24 });
  gsap.set('.hero__emblem', { autoAlpha: 0, scale: .8, rotate: -8 });

  ready.then(() => {
    fill.kill();
    gsap.timeline()
      .to(prog, { v: 100, duration: .4, ease: 'power1.out', onUpdate: () => { count.textContent = Math.round(prog.v); bar.style.transform = `scaleX(${prog.v / 100})`; } })
      .to('.loader__inner', { autoAlpha: 0, y: -20, duration: .5, ease: 'power2.in' })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=.1')
      .add(() => { loader.remove(); document.body.classList.remove('is-loading'); if (lenis) lenis.start(); })
      .to('.nav', { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out' }, '-=.5')
      .to('.hero__eyebrow', { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out' }, '-=.7')
      .to(heroChars, { yPercent: 0, rotate: 0, duration: 1.3, ease: 'expo.out', stagger: .022 }, '-=.75')
      .to('.hero__emblem', { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.8, ease: 'expo.out' }, '-=1.3')
      .to(['.hero__sub', '.hero__ctas > *'], { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .08 }, '-=1.4')
      .to('.hero__meta > *', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .08 }, '-=1');
  });
}
runLoader();

/* ==========================================================================
   Custom cursor
   ========================================================================== */
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
window.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

if (finePointer && !reduced) {
  document.documentElement.classList.add('has-cursor');
  const cursor = document.querySelector('.cursor');
  const ring = cursor.querySelector('.cursor__ring');
  const dot = cursor.querySelector('.cursor__dot');
  const label = cursor.querySelector('.cursor__label');
  const ringPos = { x: mouse.x, y: mouse.y };

  (function tick() {
    ringPos.x = lerp(ringPos.x, mouse.x, .18);
    ringPos.y = lerp(ringPos.y, mouse.y, .18);
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    requestAnimationFrame(tick);
  })();

  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-hover], a, button, label');
    if (!t) return;
    const text = t.getAttribute('data-hover');
    if (text) { label.textContent = text; cursor.classList.add('is-label'); }
    else cursor.classList.add('is-hover');
  });
  document.addEventListener('pointerout', e => {
    const t = e.target.closest('[data-hover], a, button, label');
    if (!t || t.contains(e.relatedTarget)) return;
    cursor.classList.remove('is-hover', 'is-label');
  });
  document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  document.addEventListener('mouseleave', () => (cursor.style.opacity = 0));
  document.addEventListener('mouseenter', () => (cursor.style.opacity = 1));
}

/* ==========================================================================
   Magnetic buttons + glow position
   ========================================================================== */
function bindMagnetic(root = document) {
  if (!finePointer) return;
  root.querySelectorAll('.magnetic').forEach(el => {
    if (el._mag) return;
    el._mag = true;
    const strength = el.classList.contains('wa') ? .45 : .3;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
      el.style.transform = `translate(${(x - r.width / 2) * strength}px, ${(y - r.height / 2) * strength}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}
bindMagnetic();

/* ==========================================================================
   Hero: proximity-weighted headline + 3D emblem
   ========================================================================== */
(function heroInteractions() {
  const hero = document.getElementById('hero');
  const emblem = document.getElementById('heroEmblem');
  const img = emblem.querySelector('.hero__emblem-img');
  let inHero = true, rects = [];
  // char centres in page coordinates (layout-only, ignores intro transforms once settled)
  const measure = () => {
    rects = heroChars.map(c => {
      const r = c.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY };
    });
  };
  window.addEventListener('resize', measure);
  setTimeout(measure, 3200);
  document.fonts && document.fonts.ready.then(() => setTimeout(measure, 3200));

  new IntersectionObserver(([en]) => (inHero = en.isIntersecting)).observe(hero);

  const tilt = { x: 0, y: 0 };
  const weights = heroChars.map(() => 300);

  (function frame() {
    if (inHero && !reduced) {
      // characters near the cursor get heavier — "living" type
      if (finePointer && rects.length) {
        heroChars.forEach((c, i) => {
          const dx = mouse.x - rects[i].x, dy = mouse.y - (rects[i].y - window.scrollY);
          const d = Math.sqrt(dx * dx + dy * dy);
          const target = 300 + 500 * Math.max(0, 1 - d / 260);
          weights[i] = lerp(weights[i], target, .12);
          c.style.fontVariationSettings = `"wght" ${weights[i].toFixed(0)}, "opsz" 144`;
        });
      }
      // emblem 3D tilt toward the cursor
      const nx = mouse.x / innerWidth - .5, ny = mouse.y / innerHeight - .5;
      tilt.x = lerp(tilt.x, nx, .06); tilt.y = lerp(tilt.y, ny, .06);
      img.style.transform = `translateZ(60px) rotateY(${tilt.x * 28}deg) rotateX(${-tilt.y * 22}deg) translate(${tilt.x * 20}px, ${tilt.y * 20}px)`;
      emblem.style.setProperty('--sx', (50 + tilt.x * 80) + '%');
      emblem.style.setProperty('--sy', (30 + tilt.y * 80) + '%');
    }
    requestAnimationFrame(frame);
  })();
})();

/* ==========================================================================
   Nav: hide on scroll down, active link
   ========================================================================== */
(function nav() {
  const nav = document.getElementById('nav');
  let last = 0;
  const onScroll = y => {
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > last && y > 500 && !document.body.classList.contains('menu-open'));
    last = y;
  };
  if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

  const links = [...document.querySelectorAll('.nav__links a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href')));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const i = sections.indexOf(en.target);
      links.forEach((l, j) => l.classList.toggle('is-active', i === j));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => s && io.observe(s));
})();

/* -------- Mobile menu -------- */
const burger = document.getElementById('burger');
function closeMenu() {
  if (!document.body.classList.contains('menu-open')) return;
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  document.getElementById('menu').setAttribute('aria-hidden', 'true');
  if (lenis) lenis.start();
}
burger.addEventListener('click', () => {
  const open = !document.body.classList.contains('menu-open');
  if (!open) return closeMenu();
  document.body.classList.add('menu-open');
  burger.setAttribute('aria-expanded', 'true');
  document.getElementById('menu').setAttribute('aria-hidden', 'false');
  if (lenis) lenis.stop();
  if (hasGSAP) gsap.fromTo('.menu nav a', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: .06, duration: .9, ease: 'expo.out', delay: .2 });
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

/* ==========================================================================
   Card tilt + spotlight
   ========================================================================== */
function bindTilt() {
  if (!finePointer) return;
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--mx', x * 100 + '%');
      card.style.setProperty('--my', y * 100 + '%');
      card.style.setProperty('--rx', ((.5 - y) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--ry', ((x - .5) * 12).toFixed(2) + 'deg');
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}
bindTilt();
bindMagnetic(document.getElementById('servicesTrack'));

/* ==========================================================================
   Materials explorer
   ========================================================================== */
(function materials() {
  const tabs = document.getElementById('materialTabs');
  const tex = document.getElementById('swatchTex');
  const swatch = document.getElementById('swatch');
  const info = document.querySelector('.materials__info');
  const $ = id => document.getElementById(id);

  tabs.innerHTML = MATERIALS.map((m, i) =>
    `<button class="mtab" role="tab" aria-selected="${i === 0}" data-i="${i}" data-hover><i style="background-image:${woodTexture(m.key, false)}"></i>${m.name}<small>${m.tag.split(' ')[0]}</small></button>`).join('');

  function select(i, animate = true) {
    const m = MATERIALS[i];
    tabs.querySelectorAll('.mtab').forEach((b, j) => b.setAttribute('aria-selected', i === j));
    const apply = () => {
      tex.style.backgroundImage = woodTexture(m.key);
      $('swatchTag').textContent = m.tag;
      $('matName').textContent = m.name;
      $('matUrdu').textContent = m.urdu;
      $('matDesc').textContent = m.desc;
      $('matBest').textContent = m.best;
      $('matMeters').innerHTML = Object.entries(m.m).map(([k, v]) => `<li>${k}<b style="--v:0" data-v="${v}"></b></li>`).join('');
      requestAnimationFrame(() => requestAnimationFrame(() =>
        $('matMeters').querySelectorAll('b').forEach(b => b.style.setProperty('--v', b.dataset.v))));
      info.classList.remove('is-swapping'); void info.offsetWidth; info.classList.add('is-swapping');
    };
    if (animate && hasGSAP) {
      gsap.timeline()
        .to(swatch, { clipPath: 'inset(0 0 0 100% round 28px)', duration: .45, ease: 'power3.in' })
        .add(apply)
        .fromTo(swatch, { clipPath: 'inset(0 100% 0 0 round 28px)' }, { clipPath: 'inset(0 0% 0 0% round 28px)', duration: .7, ease: 'expo.out' });
    } else apply();
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('.mtab'); if (b) select(+b.dataset.i); });
  tabs.addEventListener('keydown', e => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const btns = [...tabs.querySelectorAll('.mtab')];
    const cur = btns.findIndex(b => b.getAttribute('aria-selected') === 'true');
    const next = (cur + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length;
    btns[next].focus(); select(next);
  });
  select(0, false);

  // swatch reacts to the cursor like light raking across a polished plank
  swatch.addEventListener('pointermove', e => {
    const r = swatch.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    swatch.style.setProperty('--lx', x * 100 + '%');
    swatch.style.setProperty('--ly', y * 100 + '%');
    tex.style.transform = `translate(${(x - .5) * -18}px, ${(y - .5) * -18}px) scale(1.02)`;
  });
  swatch.addEventListener('pointerleave', () => { tex.style.transform = ''; });
})();

/* ==========================================================================
   Spaces — floating preview that follows the cursor
   ========================================================================== */
(function spaces() {
  const list = document.getElementById('spacesList');
  const prev = document.getElementById('spacesPreview');
  const inner = document.getElementById('spacesPreviewInner');
  if (!finePointer) return;
  const p = { x: mouse.x, y: mouse.y };
  let active = false, rot = 0;
  list.addEventListener('pointerenter', () => { active = true; prev.classList.add('is-on'); });
  list.addEventListener('pointerleave', () => { active = false; prev.classList.remove('is-on'); });
  list.querySelectorAll('li').forEach(li => li.addEventListener('pointerenter', () => {
    inner.style.transform = `translateY(${-li.dataset.space * 100}%)`;
  }));
  (function tick() {
    const px = p.x;
    p.x = lerp(p.x, mouse.x, .12); p.y = lerp(p.y, mouse.y, .12);
    rot = lerp(rot, (p.x - px) * .6, .1);
    if (active || prev.classList.contains('is-on')) prev.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${Math.max(-12, Math.min(12, rot))}deg)`;
    requestAnimationFrame(tick);
  })();
})();

/* ==========================================================================
   Scroll animations (GSAP)
   ========================================================================== */
if (hasGSAP && !reduced) {
  // Statement: words light up as you read
  const st = document.getElementById('statement');
  st.innerHTML = st.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  const words = st.querySelectorAll('.w');
  ScrollTrigger.create({
    trigger: st, start: 'top 80%', end: 'bottom 45%', scrub: true,
    onUpdate: self => {
      const n = Math.round(self.progress * words.length);
      words.forEach((w, i) => (w.style.color = i < n ? 'var(--text)' : ''));
    }
  });

  // Generic reveals
  gsap.utils.toArray('.section .eyebrow, .section .h2, .section .lead, .pill, .services__head > *, .spaces__list li, .quote, .contact__info li, .footer__cols > div, .materials__body').forEach(el => {
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // Stats count-up
  document.querySelectorAll('.stat__num').forEach(el => {
    const o = { v: 0 }, to = +el.dataset.count, suf = el.dataset.suffix || '';
    gsap.to(o, {
      v: to, duration: 2.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString() + suf)
    });
  });
  gsap.from('.stat', { y: 60, autoAlpha: 0, stagger: .1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 80%' } });

  // Marquee speeds up / skews with scroll velocity
  const mq = document.querySelector('.marquee__track');
  ScrollTrigger.create({
    onUpdate: self => {
      const v = gsap.utils.clamp(-12, 12, self.getVelocity() / 300);
      gsap.to(mq, { skewX: -v, duration: .4, ease: 'power2.out', overwrite: true });
    }
  });

  // Hero parallax out
  gsap.to('.hero__content', { yPercent: -18, autoAlpha: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__emblem', { yPercent: 22, scale: .9, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Horizontal services (desktop only)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const track = document.getElementById('servicesTrack');
    const bar = document.getElementById('servicesProgress');
    const dist = () => track.scrollWidth - window.innerWidth;
    const tw = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '.services', pin: '.services__pin', start: 'top top',
        end: () => '+=' + dist(), scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: self => (bar.style.transform = `scaleX(${self.progress})`)
      }
    });
    gsap.from('.card', {
      y: 120, rotate: 4, autoAlpha: 0, stagger: .08, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: '.services', start: 'top 70%' }
    });
    // subtle per-card parallax of the wood texture while sliding
    gsap.utils.toArray('.card__tex').forEach(t => {
      gsap.fromTo(t, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: t.parentElement, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
    });
  });

  // Process line + active steps
  gsap.to('.process__line line', {
    strokeDashoffset: 0, ease: 'none',
    scrollTrigger: { trigger: '.process__list', start: 'top 60%', end: 'bottom 60%', scrub: true }
  });
  document.querySelectorAll('.step').forEach(step => {
    ScrollTrigger.create({ trigger: step, start: 'top 60%', onToggle: self => step.classList.toggle('is-active', self.isActive || self.progress === 1), end: 'max' });
    gsap.from(step, { x: 40, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: step, start: 'top 85%' } });
  });

  // Footer mega type rises
  gsap.from('.footer__mega', { yPercent: 40, autoAlpha: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.footer__mega', start: 'top 95%' } });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ==========================================================================
   Footer + form glow follow
   ========================================================================== */
(function glows() {
  const mega = document.querySelector('.footer__mega');
  mega.parentElement.addEventListener('pointermove', e => {
    const r = mega.getBoundingClientRect();
    mega.style.setProperty('--fx', e.clientX - r.left + 'px');
    mega.style.setProperty('--fy', e.clientY - r.top + 'px');
  });
  const form = document.getElementById('quoteForm');
  form.addEventListener('pointermove', e => {
    const r = form.getBoundingClientRect();
    form.style.setProperty('--mx', e.clientX - r.left + 'px');
    form.style.setProperty('--my', e.clientY - r.top + 'px');
  });
})();

/* ==========================================================================
   Quote form -> WhatsApp
   ========================================================================== */
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
document.getElementById('waFloat').href = waLink(CONFIG.whatsappGreeting);

document.getElementById('quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const note = document.getElementById('quoteNote');
  const name = f.name.value.trim();
  const phone = f.phone.value.trim();
  const needs = [...f.querySelectorAll('input[name="need"]:checked')].map(i => i.value);
  const msg = f.message.value.trim();

  f.querySelectorAll('.field').forEach(x => x.classList.remove('is-error'));
  const bad = [];
  if (name.length < 2) bad.push(f.name);
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) bad.push(f.phone);
  if (bad.length) {
    bad.forEach(i => i.closest('.field').classList.add('is-error'));
    note.textContent = 'Please enter your name and a valid phone number.';
    note.classList.add('is-error');
    bad[0].focus();
    if (hasGSAP) gsap.fromTo(f, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1, .3)' });
    return;
  }
  note.classList.remove('is-error');
  const text = [
    'Assalam o Alaikum, Zain Ul Abideen Furniture House!',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    needs.length ? `Interested in: ${needs.join(', ')}` : '',
    msg ? `Details: ${msg}` : ''
  ].filter(Boolean).join('\n');
  window.open(waLink(text), '_blank', 'noopener');
  note.textContent = 'Opening WhatsApp… shukriya! We will get back to you soon.';
});
