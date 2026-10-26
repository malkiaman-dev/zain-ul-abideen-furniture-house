/* ==========================================================================
   Hero WebGL — procedural walnut grain lit by a warm "torch" that follows
   the cursor. Moving the mouse bends the grain; clicking sends a ripple.
   ========================================================================== */
(function () {
  const canvas = document.getElementById('heroGL');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
  if (!gl) return; // CSS gradient fallback stays visible

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;

  const vert = `
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `;

  const frag = `
    precision highp float;
    uniform vec2  uRes;
    uniform vec2  uMouse;
    uniform vec2  uVel;
    uniform float uTime;
    uniform float uLight;
    uniform vec3  uRipple;   // xy = position, z = start time

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
                 mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
      return v;
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 p = (frag - 0.5 * uRes) / uRes.y;
      vec2 m = (uMouse - 0.5 * uRes) / uRes.y;

      vec2 d = p - m;
      float r = length(d);

      // cursor bends the grain + drags it with mouse velocity
      float infl = exp(-r * r * 9.0);
      p -= normalize(d + 1e-5) * infl * 0.055;
      p -= uVel * infl * 0.6;

      // click ripple
      float rt = uTime - uRipple.z;
      if (rt > 0.0 && rt < 2.5) {
        vec2 rp = (uRipple.xy - 0.5 * uRes) / uRes.y;
        float rd = length(p - rp);
        float wave = sin(rd * 40.0 - rt * 9.0) * exp(-rd * 3.0) * exp(-rt * 1.6);
        p += normalize(p - rp + 1e-5) * wave * 0.02;
      }

      float t = uTime * 0.025;

      // wood: stretched domain, rings bent by fbm (like a plank cut through the log)
      vec2 q = vec2(p.x * 0.55 + t, p.y * 2.6);
      float warp = fbm(q * 1.3 + vec2(0.0, t * 0.5));
      float g = q.y + warp * 2.2 + fbm(q * vec2(0.6, 3.0) + 4.0) * 0.35;
      float rings = 0.5 + 0.5 * sin(g * 22.0);
      rings = pow(rings, 2.2);

      // fine fibres & pores
      float fib = noise(vec2(q.x * 3.0, g * 90.0));
      float pores = smoothstep(0.78, 1.0, noise(vec2(q.x * 60.0, g * 260.0)));

      vec3 dark   = vec3(0.045, 0.028, 0.018);
      vec3 walnut = vec3(0.24, 0.135, 0.065);
      vec3 honey  = vec3(0.52, 0.32, 0.14);
      vec3 gold   = vec3(1.0, 0.80, 0.45);

      vec3 col = mix(dark, walnut, rings * 0.85 + fib * 0.25);
      col = mix(col, honey, smoothstep(0.55, 1.0, warp) * 0.35);
      col *= 1.0 - pores * 0.35;

      // torch light following the cursor
      float spot = exp(-r * r * 3.2) * uLight;
      float halo = exp(-r * r * 0.6) * 0.35;
      float ambient = 0.22 + halo;
      col *= ambient + spot * 1.9;

      // satin varnish highlight that rides the ring edges
      float edge = pow(0.5 + 0.5 * sin(g * 22.0 + 1.2), 14.0);
      col += gold * edge * spot * 0.55;
      col += gold * pow(spot, 3.0) * 0.12;

      // vignette + film grain
      vec2 uv = frag / uRes;
      col *= smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.25, 1.0)));
      col += (hash(frag + fract(uTime) * 100.0) - 0.5) * 0.025;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function shader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  const vs = shader(gl.VERTEX_SHADER, vert);
  const fs = shader(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = {};
  ['uRes', 'uMouse', 'uVel', 'uTime', 'uLight', 'uRipple'].forEach(n => U[n] = gl.getUniformLocation(prog, n));

  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.25 : 1.6);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  // mouse state (pixels, GL coords => y flipped)
  const target = { x: W * 0.62, y: H * 0.45 };
  const pos = { x: target.x, y: target.y };
  const vel = { x: 0, y: 0 };
  let light = 0, lightTarget = 1;
  let ripple = [0, 0, -10];
  let lastMove = 0;

  const hero = canvas.parentElement;
  hero.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    target.x = e.clientX - r.left; target.y = e.clientY - r.top;
    lastMove = performance.now();
  });
  hero.addEventListener('pointerleave', () => { lightTarget = 0.55; });
  hero.addEventListener('pointerenter', () => { lightTarget = 1; });
  hero.addEventListener('pointerdown', e => {
    const r = canvas.getBoundingClientRect();
    ripple = [(e.clientX - r.left) * dpr, (r.height - (e.clientY - r.top)) * dpr, (performance.now() - start) / 1000];
  });

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(loop); }).observe(canvas);

  const start = performance.now();
  function loop(now) {
    if (!visible) return;
    const time = (now - start) / 1000;

    // idle / touch: let the light wander on its own
    if (touch || now - lastMove > 4000) {
      target.x = W * (0.6 + Math.sin(time * 0.35) * 0.25);
      target.y = H * (0.45 + Math.sin(time * 0.5 + 1.3) * 0.2);
    }

    const px = pos.x, py = pos.y;
    pos.x += (target.x - pos.x) * 0.08;
    pos.y += (target.y - pos.y) * 0.08;
    vel.x += ((pos.x - px) / Math.max(H, 1) - vel.x) * 0.2;
    vel.y += (-(pos.y - py) / Math.max(H, 1) - vel.y) * 0.2;
    light += (lightTarget - light) * 0.04;

    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform2f(U.uMouse, pos.x * dpr, (H - pos.y) * dpr);
    gl.uniform2f(U.uVel, vel.x, vel.y);
    gl.uniform1f(U.uTime, reduced ? 0 : time);
    gl.uniform1f(U.uLight, light);
    gl.uniform3f(U.uRipple, ripple[0], ripple[1], ripple[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
