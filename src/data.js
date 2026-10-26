import IMAGE_SIZES from './imageSizes.json';

/* =========================================================================
   Business details — edit these first
   ========================================================================= */
export const CONFIG = {
  name: 'Zain Ul Abideen Furniture House',
  tagline: 'Crafting Comfort, Building Trust',
  phoneDisplay: '+92 300 0000000',
  phoneTel: '+923000000000',
  whatsapp: '923000000000', // country code + number, no "+" or spaces
  email: 'info@zainulabideenfurniture.com',
  address: 'Main Bazaar, Your City, Pakistan',
  hours: 'Mon – Sat · 9:00 am – 8:00 pm',
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

export const photo = (name, full = 1600) => ({
  ...imgSize(name),
  src: `/images/${name}.webp`,
  srcSet: `/images/${name}-sm.webp ${Math.round(full / 2)}w, /images/${name}.webp ${Math.round(full)}w`
});

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
  { img: 'work-kitchen-gloss', cat: 'Kitchens', title: 'High-gloss kitchen with display unit', full: 830 },
  { img: 'work-wardrobe-mirror', cat: 'Wardrobes', title: 'Wardrobe with lofts & mirror', full: 720 },
  { img: 'work-kitchen-modern', cat: 'Kitchens', title: 'Modern kitchen with island', full: 1260 },
  { img: 'work-wardrobe-laminate', cat: 'Wardrobes', title: 'Laminated almari, wood frame', full: 576 },
  { img: 'work-kitchen-red', cat: 'Kitchens', title: 'Two-tone kitchen with tall unit', full: 774 },
  { img: 'work-wardrobe-dressing', cat: 'Wardrobes', title: 'Wardrobe with dressing & TV unit', full: 720 },
  { img: 'work-wardrobe-walnut', cat: 'Wardrobes', title: 'Walnut wardrobe with side shelves', full: 992 },
  { img: 'work-kitchen-cream', cat: 'Kitchens', title: 'Cream high-gloss kitchen', full: 518 },
  { img: 'office-executive', cat: 'Office', title: 'Executive L-shaped table', full: 1024 },
  { img: 'office-workstations', cat: 'Office', title: 'Team workstations with partitions', full: 1356 },
  { img: 'office-cubicle', cat: 'Office', title: 'Corner cubicle with storage', full: 1108 },
  { img: 'office-round-station', cat: 'Office', title: '4-seater round workstation', full: 880 },
  { img: 'office-desk-glass', cat: 'Office', title: 'Walnut desk with glass top', full: 675 },
  { img: 'office-desk-dark', cat: 'Office', title: 'Two-tone manager desk', full: 675 },
  { img: 'study-desk-wood', cat: 'Study Tables', title: 'Solid wood study desk & chair', full: 1156 },
  { img: 'study-corner', cat: 'Study Tables', title: 'Study corner with wall cabinets', full: 958 },
  { img: 'study-computer-unit', cat: 'Study Tables', title: 'Computer table with cupboard', full: 894 },
  { img: 'study-desk-hutch', cat: 'Study Tables', title: 'Study desk with shelf hutch', full: 1108 },
  { img: 'study-desk-modern', cat: 'Study Tables', title: 'Compact modern study table', full: 894 },
  { img: 'school-classroom', cat: 'Schools', title: 'Classroom desks & chairs', full: 1448 },
  { img: 'podium-wood', cat: 'Schools', title: 'Wood & acrylic rostrum', full: 732 },
  { img: 'school-benches', cat: 'Schools', title: 'Colourful student benches', full: 894 },
  { img: 'podium-white', cat: 'Schools', title: 'White lacquer podium', full: 800 },
  { img: 'school-group-tables', cat: 'Schools', title: 'Group activity tables', full: 1324 },
  { img: 'podium-mic', cat: 'Schools', title: 'Rostrum with mic stand', full: 600 },
  { img: 'door-carved', cat: 'Doors & Windows', title: 'Panelled double door' },
  { img: 'dining-2', cat: 'Tables', title: 'Live-edge dining table' },
  { img: 'bedroom-2', cat: 'Rooms', title: 'Bedroom with wood paneling' },
  { img: 'door-room', cat: 'Doors & Windows', title: 'Solid wood entrance door' },
  { img: 'table-joinery', cat: 'Tables', title: 'Hand-finished joinery' },
  { img: 'hero-living', cat: 'Rooms', title: 'TV wall & feature door', full: 2400 },
  { img: 'window-shutter', cat: 'Doors & Windows', title: 'Window with shutters' },
  { img: 'office-2', cat: 'Rooms', title: 'Office with wooden ceiling' },
  { img: 'table-dark', cat: 'Tables', title: 'Dark-polish dining table' }
];

export const SCHOOLS = {
  id: 'schools',
  eyebrow: 'Schools · Colleges · Academies',
  title: 'Furniture built for',
  accent: 'classrooms.',
  intro: 'Desks, benches, kids tables and rostrums — made in bulk, to your sizes and colours, strong enough for years of daily use.',
  points: ['Bulk orders', 'Custom sizes & colours', 'Steel + wood frames'],
  items: [
    { area: 'a', img: 'school-classroom', full: 1448, title: 'Classroom Desks & Chairs', line: 'Single and double desks with sturdy steel or wooden frames.' },
    { area: 'b', img: 'school-kids-table', full: 894, title: 'Montessori & Kids Tables', line: 'Rounded, child-safe tables in bright colours.' },
    { area: 'c', img: 'school-group-tables', full: 1324, title: 'Group Activity Tables', line: 'Modular shapes that join together for group work.' },
    { area: 'd', img: 'school-benches', full: 894, title: 'Student Benches', line: 'Two and three-seater benches built for daily use.' },
    { area: 'e', img: 'podium-wood', full: 732, contain: true, title: 'Rostrums & Podiums', line: 'For assembly halls, auditoriums, offices and events.' }
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
    { area: 'e', img: 'office-desk-dark', full: 675, title: 'Manager Desks', line: 'Premium two-tone finishes for cabins and meeting rooms.' }
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

/* Workshop reels for the video carousel (public/videos/<name>.mp4 + <name>.webp poster).
   Replace these stock clips with your own phone videos of real projects — vertical 9:16 works best. */
export const REELS = [
  { name: 'reel-chisel', title: 'Hand-cut joinery', tag: 'Craft' },
  { name: 'reel-saw', title: 'Precision cutting', tag: 'Workshop' },
  { name: 'reel-plane', title: 'Smooth, true edges', tag: 'Finishing' },
  { name: 'reel-drill', title: 'Strong fittings', tag: 'Assembly' },
  { name: 'reel-measure', title: 'Seasoned timber', tag: 'Material' },
  { name: 'reel-router', title: 'Clean profiles', tag: 'Detailing' },
  { name: 'reel-sheets', title: 'Premium sheets in stock', tag: 'Sheets' },
  { name: 'reel-workshop', title: 'Inside the workshop', tag: 'Workshop' }
];
