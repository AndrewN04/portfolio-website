import * as THREE from "three";

export type ParticleOptions = {
  slot: HTMLElement;
  font: string;
  words: readonly string[];
  word: string;
  paused: boolean;
  onReady: () => void;
};
export type ParticleHandle = {
  setWord(word: string): void;
  setPaused(paused: boolean): void;
  setSuspended(suspended: boolean): void;
  scatter(strength: number): void;
  dispose(): void;
};

const FOV = 40;
const DISTANCE = 16;

export function createParticles(canvas: HTMLCanvasElement, options: ParticleOptions): ParticleHandle {
  const count = window.innerWidth < 768 ? 3600 : 6500;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.z = DISTANCE;
  const halfHeight = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * DISTANCE;

  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const aspect = window.innerWidth / window.innerHeight;
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * halfHeight * 2 * aspect;
    pos[i * 3 + 1] = (Math.random() - 0.5) * halfHeight * 2;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    seed[i] = Math.random();
  }
  target.set(pos);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
  // The same pastel RGB gradient the hero has always carried, now moving through the particles.
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uRatio: { value: renderer.getPixelRatio() } },
    vertexShader: `
      attribute float seed; uniform float uTime, uRatio; varying vec3 vColor; varying float vSeed;
      vec3 stop(float t) {
        vec3 c[6]; c[0]=vec3(1.,.57,.65); c[1]=vec3(.95,.78,.55); c[2]=vec3(.66,.84,.61); c[3]=vec3(.57,.85,.85); c[4]=vec3(.61,.71,.96); c[5]=vec3(.78,.64,.91);
        float x = fract(t) * 6.; int i = int(floor(x)); float f = fract(x);
        vec3 a = c[0], b = c[1];
        for (int k = 0; k < 6; k++) { if (k == i) { a = c[k]; b = c[k == 5 ? 0 : k + 1]; } }
        return mix(a, b, smoothstep(0., 1., f));
      }
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.);
        vColor = stop(position.x * .045 - uTime * .125 + seed * .03);
        vSeed = seed;
        gl_PointSize = (2. + seed * 2.4) * uRatio * (16. / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 vColor; varying float vSeed;
      void main() { float d = length(gl_PointCoord - .5); if (d > .5) discard; gl_FragColor = vec4(vColor, smoothstep(.5, .1, d) * (.6 + vSeed * .4)); }`,
  });
  scene.add(new THREE.Points(geometry, material));

  const sampler = document.createElement("canvas");
  const ctx = sampler.getContext("2d", { willReadFrequently: true })!;
  let word = options.word;
  let width = 1, height = 1;

  function fontSize(slotWidth: number, slotHeight: number) {
    ctx.fontStretch = "extra-expanded";
    ctx.font = `800 100px ${options.font}`;
    const widest = Math.max(...options.words.map((item) => ctx.measureText(item).width));
    return Math.min((slotWidth * 0.98 * 100) / widest, slotHeight * 0.92);
  }

  function sample() {
    const rect = options.slot.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    sampler.width = w;
    sampler.height = h;
    const size = fontSize(w, h);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fontStretch = "extra-expanded";
    ctx.font = `800 ${size}px ${options.font}`;
    ctx.fillText(word, 0, h / 2);
    const data = ctx.getImageData(0, 0, w, h).data;
    const step = Math.max(2, Math.round(size / 42));
    const points: number[] = [];
    for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (data[(y * w + x) * 4 + 3] > 128) points.push(x, y);
    if (!points.length) return;
    const unit = (halfHeight * 2) / height;
    const left = (rect.left - width / 2) * unit;
    const middle = -(rect.top + h / 2 - height / 2) * unit;
    const pairs = points.length / 2;
    for (let i = 0; i < count; i++) {
      const p = (Math.floor((i / count) * pairs + seed[i] * 5) % pairs) * 2;
      target[i * 3] = left + points[p] * unit + (Math.random() - 0.5) * unit * step;
      target[i * 3 + 1] = middle - (points[p + 1] - h / 2) * unit + (Math.random() - 0.5) * unit * step;
      target[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
  }

  function scatter(strength: number) {
    for (let i = 0; i < count * 3; i++) vel[i] += (Math.random() - 0.5) * 0.9 * strength;
  }

  const mouse = { x: 999, y: 999 };
  const onPointer = (event: PointerEvent) => {
    mouse.x = ((event.clientX / width) * 2 - 1) * halfHeight * camera.aspect;
    mouse.y = -((event.clientY / height) * 2 - 1) * halfHeight;
  };
  const onLeave = () => { mouse.x = mouse.y = 999; };
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("pointerleave", onLeave);

  let ready = false;
  let paused = options.paused;
  let suspended = false;
  let needsFrame = true;
  let time = 0;

  function fit() {
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (ready) sample();
    needsFrame = true;
  }
  const observer = new ResizeObserver(fit);
  observer.observe(canvas);
  observer.observe(options.slot);
  fit();

  let last = performance.now();
  renderer.setAnimationLoop((now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (suspended || (paused && !needsFrame)) return;
    needsFrame = false;
    if (!paused) {
      time += dt;
      material.uniforms.uTime.value = time;
      for (let i = 0; i < count; i++) {
        const ix = i * 3, iy = ix + 1, iz = ix + 2;
        const dx = pos[ix] - mouse.x, dy = pos[iy] - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 2.2) {
          const force = (2.2 - d2) * 0.045;
          vel[ix] += dx * force;
          vel[iy] += dy * force;
          vel[iz] += force * 0.6;
        }
        vel[ix] += (target[ix] - pos[ix]) * 0.022 + Math.sin(time * 1.3 + seed[i] * 40) * 0.0012;
        vel[iy] += (target[iy] - pos[iy]) * 0.022 + Math.cos(time * 1.1 + seed[i] * 30) * 0.0012;
        vel[iz] += (target[iz] - pos[iz]) * 0.022;
        vel[ix] *= 0.86; vel[iy] *= 0.86; vel[iz] *= 0.86;
        pos[ix] += vel[ix]; pos[iy] += vel[iy]; pos[iz] += vel[iz];
      }
      geometry.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
  });

  document.fonts.load(`800 100px ${options.font}`).catch(() => undefined).then(() => {
    ready = true;
    sample();
    options.onReady();
  });

  return {
    setWord(next) {
      if (next === word) return;
      word = next;
      if (!ready) return;
      if (!paused) scatter(0.3);
      sample();
      needsFrame = true;
    },
    setPaused(value) { paused = value; needsFrame = true; },
    setSuspended(value) { suspended = value; needsFrame = true; },
    scatter(strength) { scatter(strength); needsFrame = true; },
    dispose() {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
