import IMAGE_SIZES from './imageSizes.json';

/* =========================================================================
   Business details — edit these first
   ========================================================================= */
export const CONFIG = {
  name: 'Zain Ul Abideen Furniture House',
  tagline: 'Crafting Comfort, Building Trust',
  phoneDisplay: '0315 9045185',
  phoneTel: '+923159045185',
  whatsapp: '923159045185', // country code + number, no "+" or spaces
  email: 'info@zainulabideenfurniture.com',
  address: 'KPK, Pakistan',
  hours: 'Mon - Fri · 9:00 am - 8:00 pm',
  instagram: { handle: '@zainulabideenfurniture', href: '#' },
  socials: [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'TikTok', href: '#' },
    { label: 'YouTube', href: '#' }
  ]
};

export const waLink = (text = 'Assalam o Alaikum! I would like a quote for custom furniture.') =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

/* Responsive image helper: every photo exists as name.webp (full) and name-sm.webp (half width) */
/* Intrinsic sizes (width, height) of every photo — lets lazy images reserve their space so the page never jumps */
export const imgSize = name => {
  const [width, height] = IMAGE_SIZES[name] || [1600, 1067];
  return { width, height };
};

export const photo = (name, fallback = 1600) => {
  // srcset widths come from the real file size, so swapping a photo never needs a code change
  const full = IMAGE_SIZES[name]?.[0] || fallback;
  return {
  ...imgSize(name),
  src: `/images/${name}.webp`,
  srcSet: `/images/${name}-sm.webp ${Math.round(full / 2)}w, /images/${name}.webp ${Math.round(full)}w`
  };
};

/* =========================================================================
   Content
   ========================================================================= */
export const HERO_SLIDES = [
  { img: 'hero-closet', title: 'Walk-in Wardrobes', note: 'Lit shelving · Soft-close drawers' },
  { img: 'hero-kitchen', title: 'Modular Kitchens', note: 'Wood-grain sheets · Granite tops' },
  { img: 'hero-living', title: 'TV & Wall Paneling', note: 'Feature walls · Display units' }
];

export const SERVICES = [
  { area: 'w', img: 'work-wardrobe-walnut', full: 992, title: 'Wardrobes & Almari', line: 'Sliding, hinged and walk-in — with mirrors, lofts and drawers.' },
  { area: 'k', img: 'work-kitchen-modern', full: 1260, title: 'Kitchens', line: 'Modular cabinets, overhead units and pantry pull-outs.' },
  { area: 'd', img: 'door-main', title: 'Doors', line: 'Solid wood main doors and room doors with frames.' },
  { area: 'n', img: 'window-carved', title: 'Windows', line: 'Wooden khirkiyan, frames and shutters.' },
  { area: 't', img: 'dining', title: 'Dining & Tables', line: 'Dining, centre, study and office tables.' },
  { area: 'l', img: 'tv-unit', title: 'TV & Paneling', line: 'Media walls, consoles and showcases.' },
  { area: 'o', img: 'study-corner', full: 958, title: 'Study & Office', line: 'Study tables, computer units, office desks and counters.' },
  { area: 'b', img: 'bedroom', title: 'Complete Bedrooms', line: 'Bed, side tables, dressing and wardrobe as one matching set.' }
];

export const GALLERY_FILTERS = ['All', 'Wardrobes', 'Kitchens', 'Office', 'Study Tables', 'Schools', 'Doors & Windows', 'Tables', 'Rooms'];

export const GALLERY = [
  { img: 'work-wardrobe-walnut', cat: 'Wardrobes', title: 'Full-wall wooden wardrobe with mirror' },
  { img: 'work-kitchen-modern', cat: 'Kitchens', title: 'Walnut & charcoal island kitchen' },
  { img: 'office-executive', cat: 'Office', title: 'Executive table with side return' },
  { img: 'work-wardrobe-laminate', cat: 'Wardrobes', title: 'Stone-finish almari' },
  { img: 'work-kitchen-red', cat: 'Kitchens', title: 'Red & grey modular kitchen' },
  { img: 'study-corner', cat: 'Study Tables', title: 'Study corner with wall shelves' },
  { img: 'work-wardrobe-mirror', cat: 'Wardrobes', title: 'Built-in wardrobe with TV unit' },
  { img: 'office-workstations', cat: 'Office', title: 'Team workstations' },
  { img: 'work-kitchen-gloss', cat: 'Kitchens', title: 'High-gloss kitchen with display unit' },
  { img: 'school-classroom', cat: 'Schools', title: 'Colourful classroom desks & benches' },
  { img: 'work-wardrobe-dressing', cat: 'Wardrobes', title: 'Dark wood wardrobe with side shelves' },
  { img: 'office-cubicle', cat: 'Office', title: 'Reception & corner cubicle' },
  { img: 'study-desk-wood', cat: 'Study Tables', title: 'Oak writing desk with shelves' },
  { img: 'work-kitchen-cream', cat: 'Kitchens', title: 'Beige modular kitchen' },
  { img: 'office-round-station', cat: 'Office', title: '4-seater workstation with partitions' },
  { img: 'school-kids-table', cat: 'Schools', title: 'Group tables for kids' },
  { img: 'door-main', cat: 'Doors & Windows', title: 'Solid wood entrance door' },
  { img: 'dining', cat: 'Tables', title: 'Live-edge dining table with bench' },
  { img: 'office-desk-dark', cat: 'Office', title: 'Wood-panelled office' },
  { img: 'podium-mic', cat: 'Schools', title: 'Rostrum with mic stand' },
  { img: 'study-desk-modern', cat: 'Study Tables', title: 'Compact modern study desk' },
  { img: 'desi-carved-door', cat: 'Doors & Windows', title: 'Carved double door' },
  { img: 'dining-2', cat: 'Tables', title: 'Solid wood dining table' },
  { img: 'podium-wood', cat: 'Schools', title: 'Wood & acrylic lectern' },
  { img: 'window-shutter', cat: 'Doors & Windows', title: 'Window with wooden shutters' },
  { img: 'table-joinery', cat: 'Tables', title: 'Hand-finished table joinery' },
  { img: 'podium-white', cat: 'Schools', title: 'White lacquer lectern' },
  { img: 'hero-living', cat: 'Rooms', title: 'TV wall & feature door' },
  { img: 'bedroom-2', cat: 'Rooms', title: 'Bedroom with wood paneling' }
];

export const SCHOOLS = {
  id: 'schools',
  eyebrow: 'Schools · Colleges · Academies',
  title: 'Furniture built for',
  accent: 'classrooms.',
  intro: 'Desks, benches, kids tables and rostrums — made in bulk, to your sizes and colours, strong enough for years of daily use.',
  points: ['Bulk orders', 'Custom sizes & colours', 'Steel + wood frames'],
  items: [
    { area: 'a', img: 'school-classroom', title: 'Classroom Desks & Benches', line: 'Single and double desks with sturdy steel frames, in any colour.' },
    { area: 'b', img: 'school-kids-table', title: 'Montessori & Kids Tables', line: 'Rounded, child-safe tables in bright colours.' },
    { area: 'c', img: 'podium-mic', contain: true, title: 'Rostrums & Podiums', line: 'For assembly halls, auditoriums and events.' },
    { area: 'd', img: 'podium-wood', contain: true, title: 'Acrylic Lecterns', line: 'Wood and frosted acrylic for a modern stage.' },
    { area: 'e', img: 'podium-white', title: 'White Lecterns', line: 'Clean lacquer finish for halls and offices.' }
  ],
  cta: {
    title: 'Furnishing a whole school?',
    text: "Share the number of rooms and students — we'll send a complete bulk quotation.",
    button: 'Get bulk quote',
    message: 'Assalam o Alaikum! We need furniture for our school / institution. Please share a bulk quotation.'
  }
};

export const OFFICES = {
  id: 'offices',
  eyebrow: 'Offices · Banks · Showrooms',
  title: 'Workspaces that',
  accent: 'mean business.',
  intro: 'Executive tables, staff workstations and cubicles — planned around your floor space, with wire management and storage built in.',
  points: ['Free office layout', 'Wire management', 'Bulk & corporate orders'],
  items: [
    { area: 'a', img: 'office-executive', full: 1024, title: 'Executive Tables', line: 'L-shaped boss tables with side return, drawers and cabinets.' },
    { area: 'b', img: 'office-workstations', full: 1356, title: 'Staff Workstations', line: 'Linear and cluster desks with partitions for teams of any size.' },
    { area: 'c', img: 'office-cubicle', full: 1108, title: 'Cubicles', line: 'Private corner desks with storage and overhead shelves.' },
    { area: 'd', img: 'office-round-station', full: 880, title: '4-Seater Round Stations', line: 'Space-saving clusters with softboard partitions.' },
    { area: 'e', img: 'office-desk-dark', title: 'Complete Office Interiors', line: 'Wood panelling, desks and storage designed as one space.' }
  ],
  cta: {
    title: 'Setting up a new office?',
    text: "Send us your floor plan or number of staff — we'll plan the layout and quote the complete setup.",
    button: 'Plan my office',
    message: 'Assalam o Alaikum! We are setting up an office. Please help with layout and quotation for office furniture.'
  }
};

export const MATERIALS = [
  {
    img: 'wood-sheesham', name: 'Shisham / Tali', aka: 'North Indian Rosewood', type: 'Premium local hardwood',
    text: 'Grown across the KP plains, including Swabi. Dense, stable and highly termite-resistant — the gold standard for wedding furniture and main doors.',
    best: 'Wedding furniture, beds, dining sets, main doors'
  },
  {
    img: 'wood-diyar', name: 'Diyar', aka: 'Deodar · Himalayan Cedar', type: 'Premium softwood',
    text: 'From the northern forests of Swat and Dir. Pleasant aroma and natural oils that make it highly resistant to rot.',
    best: 'Door frames (choukats), window frames, roofing'
  },
  {
    img: 'wood-walnut', name: 'Akhrot', aka: 'Walnut', type: 'Luxury hardwood',
    text: 'A dark luxury hardwood brought down from the mountains, prized for high-end carving and decorative work.',
    best: 'Carving, decorative panels, premium flooring'
  },
  {
    img: 'wood-kail', name: 'Kail', aka: 'Blue Pine', type: 'Mid-range softwood',
    text: 'From the northern hills — lighter and easier to work than Shisham. We season it properly so it doesn\'t warp.',
    best: 'Room doors, window frames, household furniture'
  },
  {
    img: 'wood-oak', name: 'Oak / Ash', aka: 'Imported hardwood', type: 'Imported hardwood',
    text: 'Light, modern and very strong with an open grain — perfect for contemporary looks.',
    best: 'Modern kitchens, tables, office furniture'
  },
  {
    img: 'wood-laminate', name: 'MDF & Lamination', aka: 'UV · High-gloss · ZRK sheets', type: 'Engineered boards',
    text: 'Pre-laminated and UV sheets that cut the cost of solid wood — easy to clean, in hundreds of wood-grain, marble and gloss finishes.',
    best: 'Kitchens, wardrobes, TV consoles, office storage'
  }
];

/* Wood guide — "use" says how it relates to furniture so customers aren't misled */
export const WOOD_GUIDE = [
  {
    group: 'Premium',
    title: 'Premium woods for fine furniture & door frames',
    intro: 'Highly sought after for durability, beautiful grain and resistance to termites.',
    woods: [
      { name: 'Shisham / Tali', aka: 'North Indian Rosewood', from: 'KP plains, incl. Swabi', use: 'top', text: 'Incredibly dense, stable and termite-resistant — the gold standard for wedding furniture and main doors.', for: ['Wedding furniture', 'Main doors', 'Beds & dining'] },
      { name: 'Diyar', aka: 'Deodar · Himalayan Cedar', from: 'Swat & Dir forests', use: 'top', text: 'Premium softwood with a pleasant aroma and natural oils that make it highly rot-resistant.', for: ['Choukats', 'Window frames', 'Roofing rafters'] },
      { name: 'Akhrot', aka: 'Walnut', from: 'Northern mountains', use: 'top', text: 'Luxury dark hardwood prized for high-end carving and decorative work.', for: ['Carving', 'Decorative panels', 'Premium flooring'] }
    ]
  },
  {
    group: 'Construction',
    title: 'General construction & mid-range carpentry',
    intro: 'A balance of strength and affordability — the everyday choices for building work.',
    woods: [
      { name: 'Kail', aka: 'Blue Pine', from: 'Northern hills', use: 'good', text: 'Lighter and easier to work than Shisham. Needs proper seasoning to avoid warping.', for: ['Room doors', 'Window frames', 'Household furniture'] },
      { name: 'Partal', aka: 'Silver Fir / Spruce', from: 'Northern forests', use: 'build', text: 'Budget-friendly, lightweight softwood used mainly for structural work.', for: ['Roofing', 'Framing', 'Shuttering'] },
      { name: 'Kikar', aka: 'Babul', from: 'Local', use: 'build', text: 'Tough, coarse hardwood. Hard to polish finely, so rarely used for fine furniture.', for: ['Heavy-duty frames', 'Supports', 'Tools'] }
    ]
  },
  {
    group: 'Farmland',
    title: 'Commercial farmland & industrial woods',
    intro: 'Fast-growing trees farmed across Mardan and Swabi that drive the local timber trade.',
    woods: [
      { name: 'Poplar', aka: 'Lachi / Bhan', from: 'Mardan & Swabi farms', use: 'ply', text: 'The backbone of the commercial timber trade — processed into affordable plywood sheets and crates.', for: ['Plywood', 'Packing crates'] },
      { name: 'Safeda', aka: 'Eucalyptus', from: 'Farm boundaries', use: 'no', text: 'Grown as a cash crop for poles, scaffolding and fuel wood.', for: ['Roofing poles', 'Scaffolding'] },
      { name: 'Sumbal', aka: 'Silk Cotton Tree', from: 'Local farms', use: 'no', text: 'Very soft and light — used for match splints, light boxes and inner plyboard layers.', for: ['Plyboard cores', 'Light boxes'] }
    ]
  },
  {
    group: 'Engineered',
    title: 'Modern engineered materials',
    intro: 'Man-made boards for modern interiors — sleek finishes at a smaller cost than solid wood.',
    woods: [
      { name: 'MDF & UV Sheets', aka: 'High-gloss & matte', from: 'Factory made', use: 'top', text: 'Medium-density fibreboard with gloss or matte faces for a clean, modern look.', for: ['Kitchens', 'Wardrobes', 'TV consoles'], link: true },
      { name: 'Lamination & Shutter Boards', aka: 'e.g. ZRK laminations', from: 'Factory made', use: 'good', text: 'Pre-laminated sheets that cut the cost of traditional solid-wood carpentry.', for: ['Wardrobes', 'Office furniture', 'Shutters'], link: true }
    ]
  }
];

export const WOOD_USE = {
  top: 'We use it for furniture',
  good: 'Good value for furniture',
  build: 'Construction use',
  ply: 'Used inside plywood',
  no: 'Not for furniture'
};

export const WHY = [
  { title: 'Free home measurement', text: 'We visit, measure precisely and suggest what fits your space and budget.' },
  { title: 'Seasoned, treated wood', text: 'Properly dried and termite-treated timber so it doesn\'t warp or crack.' },
  { title: 'Skilled karigars', text: 'Every joint, edge and polish is done by experienced hands in our workshop.' },
  { title: 'Delivery & fitting', text: 'We deliver, install and level everything on-site — clean and on time.' }
];

export const PROCESS = [
  { n: '01', title: 'Visit & measure', text: 'Share your idea on WhatsApp or call. We visit and take exact measurements.' },
  { n: '02', title: 'Design & quote', text: 'You choose design, wood or sheet and finish. You get a clear, fixed quotation.' },
  { n: '03', title: 'Crafted in workshop', text: 'Cutting, joinery, sanding and polish — with quality checks at every stage.' },
  { n: '04', title: 'Delivered & fitted', text: 'Installed at your home, adjusted perfectly and ready to use.' }
];

/* Add real customer reviews here — the section stays hidden while this list is empty.
   Example: { text: 'Our kitchen came out exactly as designed.', name: 'Ahmed R.', work: 'Kitchen' } */
export const REVIEWS = [];

/* Our own project videos for the reel carousel (public/videos/<name>.mp4 + <name>.webp poster).
   Originals are in /videos; new clips should be vertical 9:16. */
export const REELS = [
  { name: 'reel-gold-wardrobe', title: 'Wardrobe with gold inlay', tag: 'Wardrobe' },
  { name: 'reel-glass-wardrobe', title: 'Black glass wardrobe', tag: 'Wardrobe' },
  { name: 'reel-corner-kitchen', title: 'Kitchen with corner carousel', tag: 'Kitchen' },
  { name: 'reel-burl-wardrobe', title: 'Burl-wood almari', tag: 'Almari' },
  { name: 'reel-grey-wardrobe', title: 'Wardrobe with dressing unit', tag: 'Wardrobe' },
  { name: 'reel-marble-kitchen', title: 'Marble-finish kitchen', tag: 'Kitchen' },
  { name: 'reel-loft-wardrobe', title: 'Full-wall wardrobe with lofts', tag: 'Wardrobe' },
  { name: 'reel-almari-delivery', title: 'Almari ready for delivery', tag: 'Workshop' },
  { name: 'reel-folding-table', title: 'Folding wooden table', tag: 'Workshop' }
];
