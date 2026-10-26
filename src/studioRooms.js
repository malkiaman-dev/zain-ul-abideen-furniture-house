/* Rooms for the Design Studio.
   Points are 0–1 fractions of the photo: quads go top-left, top-right, bottom-right, bottom-left.
   "def" is the sheet code shown when the room first opens.
   "panels" lays the sheet out as that many full boards across with visible joints (wall cladding).
   "follows" + "solid": a surface painted in the plain average colour of another surface's sheet.
   "mask" names a pre-cut PNG in public/studio/ so furniture in front of a wall is left untouched. */
export const ROOMS = [
  {
    id: 'living',
    name: 'Modern Living Room',
    img: 'room-living',
    surfaces: [
      { id: 'wall', name: 'Back Wall', def: '8035', panels: 4, mask: 'room-living', quad: [[0.255, 0.297], [0.728, 0.297], [0.728, 0.712], [0.255, 0.712]] }
    ]
  },
  {
    id: 'bedroom',
    name: 'Calm Bedroom',
    img: 'room-bedroom',
    surfaces: [
      { id: 'wall', name: 'Back Wall', def: '5046', panels: 4, mask: 'room-bedroom', quad: [[0.184, 0.152], [0.958, 0.152], [0.958, 0.70], [0.184, 0.70]] },
      { id: 'headboard', name: 'Headboard Panel', def: '3005', mask: 'room-headboard', quad: [[0.181, 0.497], [0.962, 0.497], [0.962, 0.667], [0.181, 0.667]] }
    ]
  },
  {
    id: 'bedroom2',
    name: 'Sunlit Bedroom',
    img: 'room-bedroom2',
    surfaces: [
      { id: 'wall', name: 'Back Wall', def: '8202', panels: 4, mask: 'room-bedroom2', quad: [[0.19, 0], [0.99, 0], [0.99, 0.735], [0.19, 0.735]] }
    ]
  },
  {
    id: 'lounge',
    name: 'Gallery Lounge',
    img: 'room-lounge',
    surfaces: [
      { id: 'wall', name: 'Feature Wall', def: '5061', panels: 4, mask: 'room-lounge', quad: [[0, 0], [1, 0], [1, 0.873], [0, 0.873]] }
    ]
  },
  {
    id: 'wardrobe',
    name: 'Loft Wardrobe',
    img: 'wardrobe-sliding',
    surfaces: [
      {
        id: 'shutters', name: 'Wardrobe', def: '3008',
        quad: [[0.193, 0.072], [0.797, 0.072], [0.797, 0.803], [0.193, 0.803]],
        holes: [{ rect: [0.301, 0.221, 0.376, 0.617] }, { rect: [0.612, 0.221, 0.684, 0.617] }]
      }
    ]
  },
  {
    id: 'almari',
    name: 'Classic Almari',
    img: 'almari',
    surfaces: [
      {
        id: 'body', name: 'Almari', def: '3005', mask: 'almari',
        quad: [[0.349, 0.024], [0.757, 0.024], [0.757, 0.926], [0.35, 0.976]]
      },
      // the side panel takes the same sheet as a plain colour, like a real edge-banded side
      { id: 'side', follows: 'body', solid: true, mask: 'almari-side', quad: [[0.241, 0.056], [0.349, 0.024], [0.35, 0.976], [0.241, 0.913]] }
    ]
  },
  {
    id: 'island',
    name: 'Island Kitchen',
    img: 'hero-kitchen',
    surfaces: [
      {
        id: 'tall', name: 'Tall units', def: '3019', mask: 'kitchen-tall',
        parts: [
          { quad: [[0, 0.07], [0.232, 0.16], [0.232, 1.0], [0, 1.06]] },
          { quad: [[0.228, 0.16], [0.38, 0.218], [0.38, 0.385], [0.228, 0.36]] },
          { quad: [[0.228, 0.70], [0.38, 0.655], [0.38, 0.88], [0.228, 0.935]] }
        ]
      },
      {
        id: 'island', name: 'Island', def: '5061', mask: 'kitchen-island',
        parts: [
          { quad: [[0.405, 0.685], [0.634, 0.82], [0.634, 1.15], [0.405, 1.05]] },
          { quad: [[0.625, 0.83], [0.876, 0.61], [0.876, 0.95], [0.625, 1.15]] }
        ]
      },
      {
        id: 'back', name: 'Back cabinets', def: '3019', mask: 'kitchen-back',
        parts: [
          { quad: [[0.368, 0.35], [0.59, 0.395], [0.59, 0.47], [0.368, 0.45]] },
          { quad: [[0.368, 0.62], [0.622, 0.565], [0.622, 0.80], [0.368, 0.88]] }
        ]
      }
    ]
  },
  {
    id: 'modern',
    name: 'Modern Kitchen',
    img: 'kitchen-modern',
    surfaces: [
      {
        id: 'base', name: 'Base cabinets', def: '6026',
        quad: [[0, 0.755], [1, 0.755], [1, 1], [0, 1]]
      },
      {
        id: 'wall', name: 'Back wall', def: '5052',
        quad: [[0.12, 0.115], [1, 0.115], [1, 0.64], [0.12, 0.64]],
        // things standing in front of the wall: hood, pot, chopping board, bottles, plant
        holes: [
          { rect: [0.14, 0.09, 0.465, 0.14] },
          { rect: [0.317, 0.505, 0.428, 0.66] },
          { rect: [0.33, 0.476, 0.415, 0.505] },
          { ellipse: [0.566, 0.48, 0.08, 0.16] },
          { rect: [0.548, 0.17, 0.585, 0.34] },
          { rect: [0.624, 0.362, 0.668, 0.648] },
          { rect: [0.671, 0.362, 0.719, 0.648] },
          { ellipse: [0.775, 0.51, 0.042, 0.06] },
          { rect: [0.742, 0.54, 0.802, 0.648] }
        ]
      },
      {
        id: 'upper', name: 'Upper cabinets', def: '6026',
        quad: [[0.065, 0], [1, 0], [1, 0.09], [0.065, 0.09]]
      }
    ]
  }
];
