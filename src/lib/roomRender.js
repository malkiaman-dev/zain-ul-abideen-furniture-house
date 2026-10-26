/* ==========================================================================
   Room visualiser — paints a sheet texture onto surfaces of a room photo.

   Each surface is one or more "parts": a 4-point quad (TL, TR, BR, BL in
   0–1 photo coordinates) that the texture is perspective-mapped onto, an
   optional clip polygon, and optional holes (mirrors, objects in front).
   The photo's own light and shadow is extracted once per surface and
   multiplied back over the new texture so the result keeps real shading.
   ========================================================================== */

const MAX_PIXELS = 2.2e6;

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const canvas = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
};

/* Homography from the unit square to quad [p0,p1,p2,p3] (Heckbert) */
function squareToQuad([[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
  let g = 0, h = 0;
  if (Math.abs(sx) > 1e-9 || Math.abs(sy) > 1e-9) {
    const den = dx1 * dy2 - dx2 * dy1;
    g = (sx * dy2 - dx2 * sy) / den;
    h = (dx1 * sy - sx * dy1) / den;
  }
  const a = x1 - x0 + g * x1, b = x3 - x0 + h * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
  const map = (u, v) => {
    const w = g * u + h * v + 1;
    return [(a * u + b * v + x0) / w, (d * u + e * v + y0) / w];
  };
  map.isAffine = Math.abs(g) < 1e-4 && Math.abs(h) < 1e-4;
  return map;
}

/* Draws the source triangle s of img onto destination triangle d */
function drawTriangle(ctx, img, s, d) {
  const [[sx0, sy0], [sx1, sy1], [sx2, sy2]] = s;
  const [[dx0, dy0], [dx1, dy1], [dx2, dy2]] = d;
  const u1x = sx1 - sx0, u1y = sy1 - sy0, u2x = sx2 - sx0, u2y = sy2 - sy0;
  const v1x = dx1 - dx0, v1y = dy1 - dy0, v2x = dx2 - dx0, v2y = dy2 - dy0;
  const det = u1x * u2y - u2x * u1y;
  if (Math.abs(det) < 1e-9) return;
  const a = (v1x * u2y - v2x * u1y) / det, c = (v2x * u1x - v1x * u2x) / det;
  const b = (v1y * u2y - v2y * u1y) / det, dd = (v2y * u1x - v1y * u2x) / det;
  const e = dx0 - a * sx0 - c * sy0, f = dy0 - b * sx0 - dd * sy0;

  // grow the clip triangle by ~1px so neighbouring triangles don't leave seams
  const cx = (dx0 + dx1 + dx2) / 3, cy = (dy0 + dy1 + dy2) / 3;
  const grow = ([x, y]) => { const l = Math.hypot(x - cx, y - cy) || 1; return [x + (x - cx) / l, y + (y - cy) / l]; };

  ctx.save();
  ctx.beginPath();
  d.map(grow).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, dd, e, f);
  const minX = Math.max(0, Math.floor(Math.min(sx0, sx1, sx2)) - 2), minY = Math.max(0, Math.floor(Math.min(sy0, sy1, sy2)) - 2);
  const maxX = Math.min(img.width, Math.ceil(Math.max(sx0, sx1, sx2)) + 2), maxY = Math.min(img.height, Math.ceil(Math.max(sy0, sy1, sy2)) + 2);
  if (maxX > minX && maxY > minY) ctx.drawImage(img, minX, minY, maxX - minX, maxY - minY, minX, minY, maxX - minX, maxY - minY);
  ctx.restore();
}

/* Swatch laid out as boards: each tile is stretched to a tall board (grain runs long),
   alternate rows are flipped so the grain flows across joins, and each column is
   shifted so joins don't line up into a grid */
const BOARD = 2; // board height : width
function tileTexture(swatch, ru, rv, size) {
  const h = size * BOARD;
  const nu = Math.ceil(ru), nv = Math.ceil(rv);
  const c = canvas(nu * size, nv * h);
  const ctx = c.getContext('2d');
  for (let i = 0; i < nu; i++) {
    const shift = ((i * 0.618) % 1) * h;
    for (let j = -1; j < nv; j++) {
      const y = j * h + shift;
      ctx.save();
      if (j % 2) { ctx.translate(0, y + h); ctx.scale(1, -1); ctx.drawImage(swatch, i * size, 0, size, h); }
      else ctx.drawImage(swatch, i * size, y, size, h);
      ctx.restore();
    }
  }
  return c;
}

const toPx = (pts, W, H) => pts.map(([x, y]) => [x * W, y * H]);

function tracePath(ctx, pts) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
}

function drawHole(ctx, hole, W, H) {
  ctx.beginPath();
  if (hole.rect) {
    const [x0, y0, x1, y1] = hole.rect;
    ctx.rect(x0 * W, y0 * H, (x1 - x0) * W, (y1 - y0) * H);
  } else if (hole.ellipse) {
    const [cx, cy, rx, ry] = hole.ellipse;
    ctx.ellipse(cx * W, cy * H, rx * W, ry * H, 0, 0, Math.PI * 2);
  }
  ctx.fill();
}

/* One-off per room: scale the photo and extract every surface's mask and shading */
export function prepareRoom(img, room) {
  const scale = Math.min(1, Math.sqrt(MAX_PIXELS / (img.naturalWidth * img.naturalHeight)));
  const W = Math.round(img.naturalWidth * scale), H = Math.round(img.naturalHeight * scale);

  const base = canvas(W, H);
  base.getContext('2d').drawImage(img, 0, 0, W, H);
  const sharp = base.getContext('2d').getImageData(0, 0, W, H).data;

  // blurred copy: keeps the room's lighting but drops the old wood grain
  const soft = canvas(W, H);
  const sctx = soft.getContext('2d');
  sctx.filter = `blur(${Math.max(2, Math.round(W / 260))}px)`;
  sctx.drawImage(base, 0, 0);
  const blurred = sctx.getImageData(0, 0, W, H).data;

  const tilePx = Math.max(W, H) * 0.13;

  const surfaces = room.surfaces.map(surface => {
    const parts = (surface.parts || [surface]).map(part => {
      const quad = toPx(part.quad, W, H);
      const top = Math.hypot(quad[1][0] - quad[0][0], quad[1][1] - quad[0][1]);
      const bottom = Math.hypot(quad[2][0] - quad[3][0], quad[2][1] - quad[3][1]);
      const left = Math.hypot(quad[3][0] - quad[0][0], quad[3][1] - quad[0][1]);
      const right = Math.hypot(quad[2][0] - quad[1][0], quad[2][1] - quad[1][1]);
      return {
        quad,
        map: squareToQuad(quad),
        ru: Math.max(0.6, (top + bottom) / 2 / tilePx),
        rv: Math.max(0.6, (left + right) / 2 / (tilePx * BOARD))
      };
    });

    // mask = union of parts (clip polygon or quad) minus holes
    const mask = canvas(W, H);
    const mctx = mask.getContext('2d');
    mctx.fillStyle = '#fff';
    (surface.parts || [surface]).forEach(part => { tracePath(mctx, toPx(part.clip || part.quad, W, H)); mctx.fill(); });
    mctx.globalCompositeOperation = 'destination-out';
    (surface.parts || [surface]).forEach(part => (part.holes || []).forEach(h => drawHole(mctx, h, W, H)));
    (surface.holes || []).forEach(h => drawHole(mctx, h, W, H));
    const m = mctx.getImageData(0, 0, W, H).data;

    // average brightness of the surface, then a dark (multiply) and light (screen) map
    let sum = 0, n = 0;
    const L = new Float32Array(W * H);
    for (let i = 0, p = 0; p < L.length; i += 4, p++) {
      if (m[i + 3] < 128) continue;
      const ls = 0.2126 * sharp[i] + 0.7152 * sharp[i + 1] + 0.0722 * sharp[i + 2];
      const lb = 0.2126 * blurred[i] + 0.7152 * blurred[i + 1] + 0.0722 * blurred[i + 2];
      L[p] = lb * 0.72 + ls * 0.28;
      sum += L[p]; n++;
    }
    const mean = n ? sum / n : 128;
    const contrast = surface.contrast ?? 0.9;

    const dark = canvas(W, H), light = canvas(W, H);
    const dctx = dark.getContext('2d'), lctx = light.getContext('2d');
    const dImg = dctx.createImageData(W, H), lImg = lctx.createImageData(W, H);
    const dd = dImg.data, ld = lImg.data;
    for (let i = 0, p = 0; p < L.length; i += 4, p++) {
      let dv = 255, lv = 0;
      if (m[i + 3] >= 8) {
        const s = 1 + (L[p] / mean - 1) * contrast;
        dv = Math.max(0, Math.min(1, s)) * 255;
        lv = Math.max(0, Math.min(1, (s - 1) * 0.55)) * 255;
      }
      dd[i] = dd[i + 1] = dd[i + 2] = dv; dd[i + 3] = 255;
      ld[i] = ld[i + 1] = ld[i + 2] = lv; ld[i + 3] = 255;
    }
    dctx.putImageData(dImg, 0, 0);
    lctx.putImageData(lImg, 0, 0);

    return { id: surface.id, parts, mask, dark, light };
  });

  return { W, H, base, surfaces, work: canvas(W, H) };
}

/* Repaints the room with the chosen swatch image per surface id */
export function renderRoom(ctx, prepared, swatches) {
  const { W, H, base, surfaces, work } = prepared;
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(base, 0, 0);
  const wctx = work.getContext('2d');
  const TILE = 360;

  surfaces.forEach(s => {
    const swatch = swatches[s.id];
    if (!swatch) return;
    wctx.globalCompositeOperation = 'source-over';
    wctx.clearRect(0, 0, W, H);

    s.parts.forEach(part => {
      const tex = tileTexture(swatch, part.ru, part.rv, TILE);
      const sw = part.ru * TILE, sh = part.rv * TILE * BOARD;
      const N = part.map.isAffine ? 1 : 14;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const u0 = i / N, u1 = (i + 1) / N, v0 = j / N, v1 = (j + 1) / N;
          const d00 = part.map(u0, v0), d10 = part.map(u1, v0), d11 = part.map(u1, v1), d01 = part.map(u0, v1);
          const s00 = [u0 * sw, v0 * sh], s10 = [u1 * sw, v0 * sh], s11 = [u1 * sw, v1 * sh], s01 = [u0 * sw, v1 * sh];
          drawTriangle(wctx, tex, [s00, s10, s11], [d00, d10, d11]);
          drawTriangle(wctx, tex, [s00, s11, s01], [d00, d11, d01]);
        }
      }
    });

    wctx.globalCompositeOperation = 'multiply';
    wctx.drawImage(s.dark, 0, 0);
    wctx.globalCompositeOperation = 'screen';
    wctx.drawImage(s.light, 0, 0);
    wctx.globalCompositeOperation = 'destination-in';
    wctx.drawImage(s.mask, 0, 0);
    ctx.drawImage(work, 0, 0);
  });
  wctx.globalCompositeOperation = 'source-over';
}
