import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { vms, type Vm, type VmId } from "../lib/vms";

export type Quad = [number, number][];
export type RackOptions = {
  displayFont: string;
  monoFont: string;
  paused: boolean;
  onLayout: (quads: Record<VmId, Quad>) => void;
  onReady: () => void;
};
export type RackHandle = {
  setHover(id: VmId | null): void;
  setOpen(id: VmId | null): void;
  setPaused(paused: boolean): void;
  dispose(): void;
};

// Real 19-inch proportions: 1U = 44.45 mm, panel = 482.6 mm, scaled 1:100.
const U = 0.4445;
const FACE_W = 4.826;
const OUT_W = FACE_W + 0.62;
const DEPTH = 3.4;
const TOTAL_U = 14;
const PLINTH = 0.3;
const OPEN_BOTTOM = PLINTH + 0.16;
const OPEN_TOP = OPEN_BOTTOM + TOTAL_U * U;
const HEIGHT = OPEN_TOP + 0.28;
const FRAME_Z = DEPTH / 2;
const FACE_Z = FRAME_Z - 0.03;
const TEX_W = 2048;
const EAR = 96;

type Kind = "server" | "patch" | "switch" | "brush" | "gap" | "ups";
const units: { kind: Kind; u: number; vm?: Vm }[] = [
  { kind: "patch", u: 1 },
  { kind: "switch", u: 1 },
  { kind: "brush", u: 1 },
  ...vms.map((vm) => ({ kind: "server" as const, u: 2, vm })),
  { kind: "gap", u: 1 },
  { kind: "ups", u: 2 },
];

type Led = { mesh: THREE.Object3D; seed: number; rate: number };
type Server = {
  vm: Vm;
  group: THREE.Group;
  baseZ: number;
  slide: number;
  corners: THREE.Vector3[];
  outline: THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  face: THREE.MeshStandardMaterial;
  power: THREE.Sprite;
  activity: Led[];
  bootAt: number;
  fade: number;
  shell: THREE.MeshStandardMaterial[];
};

const css = (hex: number, alpha = 1) => `rgba(${(hex >> 16) & 255}, ${(hex >> 8) & 255}, ${hex & 255}, ${alpha})`;

export function createRack(canvas: HTMLCanvasElement, options: RackOptions): RackHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x0a0a0a, 0.35));
  const key = new THREE.DirectionalLight(0xfff1de, 2.1);
  key.position.set(-5, 8, 8);
  const front = new THREE.DirectionalLight(0xffffff, 0.55);
  front.position.set(0, 2, 10);
  const rim = new THREE.DirectionalLight(0x7cc4ff, 1.7);
  rim.position.set(7, 5, -6);
  const warm = new THREE.DirectionalLight(0xffb547, 0.6);
  warm.position.set(-8, 1, -4);
  scene.add(key, front, rim, warm);

  const rack = new THREE.Group();
  scene.add(rack);
  const textures: THREE.Texture[] = [];
  const track = <T extends THREE.Texture>(texture: T) => { textures.push(texture); return texture; };
  const canvasTexture = (source: HTMLCanvasElement) => {
    const texture = track(new THREE.CanvasTexture(source));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
  };

  const powder = new THREE.MeshStandardMaterial({ color: 0x131317, metalness: 0.55, roughness: 0.42 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x19191e, metalness: 0.6, roughness: 0.36 });
  const chassis = new THREE.MeshStandardMaterial({ color: 0x1b1b20, metalness: 0.7, roughness: 0.38 });
  const aluminium = new THREE.MeshStandardMaterial({ color: 0xb4b5ba, metalness: 1, roughness: 0.3 });
  const interior = new THREE.MeshStandardMaterial({ color: 0x070708, roughness: 0.9 });

  // Glow sprite shared by every LED.
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 64;
  const glowCtx = glowCanvas.getContext("2d")!;
  const glowGradient = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  glowGradient.addColorStop(0, "rgba(255,255,255,1)");
  glowGradient.addColorStop(0.25, "rgba(255,255,255,.45)");
  glowGradient.addColorStop(1, "rgba(255,255,255,0)");
  glowCtx.fillStyle = glowGradient;
  glowCtx.fillRect(0, 0, 64, 64);
  const glowTexture = track(new THREE.CanvasTexture(glowCanvas));
  const glow = (color: number, size: number) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    sprite.scale.setScalar(size);
    return sprite;
  };
  const dot = (color: number, radius: number) => new THREE.Mesh(new THREE.CircleGeometry(radius, 12), new THREE.MeshBasicMaterial({ color, toneMapped: false }));

  // ---- Cabinet ----
  const sideCanvas = document.createElement("canvas");
  sideCanvas.width = 512;
  sideCanvas.height = 1024;
  const sideCtx = sideCanvas.getContext("2d")!;
  sideCtx.fillStyle = "#16161a";
  sideCtx.fillRect(0, 0, 512, 1024);
  sideCtx.fillStyle = "#08080a";
  for (const y0 of [70, 860]) for (let row = 0; row < 4; row++) for (let col = 0; col < 9; col++) sideCtx.fillRect(48 + col * 48, y0 + row * 26, 30, 9);
  const sideMat = new THREE.MeshStandardMaterial({ map: canvasTexture(sideCanvas), metalness: 0.55, roughness: 0.45 });
  const sideHeight = HEIGHT - PLINTH;
  [-1, 1].forEach((side) => {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.08, sideHeight, DEPTH), [sideMat, sideMat, powder, powder, powder, powder]);
    panel.position.set(side * (OUT_W / 2 - 0.04), PLINTH + sideHeight / 2, 0);
    rack.add(panel);
  });
  const top = new THREE.Mesh(new RoundedBoxGeometry(OUT_W + 0.06, 0.09, DEPTH + 0.06, 2, 0.03), frameMat);
  top.position.set(0, HEIGHT + 0.045, 0);
  rack.add(top);
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(OUT_W - 0.12, PLINTH - 0.08, DEPTH - 0.12), powder);
  plinth.position.set(0, (PLINTH - 0.08) / 2 + 0.08, 0);
  rack.add(plinth);
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([x, z]) => {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.08, 18), aluminium);
    foot.position.set(x * (OUT_W / 2 - 0.25), 0.04, z * (DEPTH / 2 - 0.25));
    rack.add(foot);
  });
  // Front frame around the opening.
  const stile = OUT_W / 2 - FACE_W / 2 - 0.02;
  [-1, 1].forEach((side) => {
    const post = new THREE.Mesh(new RoundedBoxGeometry(stile, sideHeight, 0.12, 2, 0.02), frameMat);
    post.position.set(side * (OUT_W / 2 - stile / 2), PLINTH + sideHeight / 2, FRAME_Z);
    rack.add(post);
  });
  const header = new THREE.Mesh(new RoundedBoxGeometry(OUT_W, HEIGHT - OPEN_TOP, 0.12, 2, 0.02), frameMat);
  header.position.set(0, (HEIGHT + OPEN_TOP) / 2, FRAME_Z);
  const sill = new THREE.Mesh(new RoundedBoxGeometry(OUT_W, OPEN_BOTTOM - PLINTH, 0.12, 2, 0.02), frameMat);
  sill.position.set(0, (OPEN_BOTTOM + PLINTH) / 2, FRAME_Z);
  rack.add(header, sill);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(OUT_W - 0.16, sideHeight), interior);
  back.position.set(0, PLINTH + sideHeight / 2, -DEPTH / 2 + 0.05);
  rack.add(back);

  // Mounting rails with square holes and U numbers, visible in the empty slot.
  const railCanvas = document.createElement("canvas");
  railCanvas.width = 64;
  railCanvas.height = 2048;
  const railCtx = railCanvas.getContext("2d")!;
  const perU = 2048 / TOTAL_U;
  railCtx.fillStyle = "#1a1a1f";
  railCtx.fillRect(0, 0, 64, 2048);
  railCtx.fillStyle = "#020203";
  for (let u = 0; u < TOTAL_U; u++) for (const f of [0.17, 0.5, 0.83]) railCtx.fillRect(34, u * perU + f * perU - 8, 16, 16);
  railCtx.fillStyle = "#5a5a62";
  railCtx.font = "600 18px ui-monospace, monospace";
  for (let u = 0; u < TOTAL_U; u++) railCtx.fillText(String(TOTAL_U - u), 4, u * perU + perU / 2 + 6);
  const railTexture = canvasTexture(railCanvas);
  [-1, 1].forEach((side) => {
    const rail = new THREE.Mesh(new THREE.PlaneGeometry(0.2, TOTAL_U * U), new THREE.MeshStandardMaterial({ map: railTexture, metalness: 0.6, roughness: 0.45, side: THREE.DoubleSide }));
    rail.position.set(side * (FACE_W / 2 - 0.12), (OPEN_BOTTOM + OPEN_TOP) / 2, FACE_Z - 0.075);
    if (side > 0) rail.scale.x = -1;
    rack.add(rail);
  });

  // Soft contact shadow.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const shadowCtx = shadowCanvas.getContext("2d")!;
  const shadowGradient = shadowCtx.createRadialGradient(64, 64, 8, 64, 64, 64);
  shadowGradient.addColorStop(0, "rgba(0,0,0,.85)");
  shadowGradient.addColorStop(1, "rgba(0,0,0,0)");
  shadowCtx.fillStyle = shadowGradient;
  shadowCtx.fillRect(0, 0, 128, 128);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(OUT_W * 2, DEPTH * 2.2), new THREE.MeshBasicMaterial({ map: track(new THREE.CanvasTexture(shadowCanvas)), transparent: true, depthWrite: false }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.002;
  rack.add(floor);

  const servers: Server[] = [];
  const ambientLeds: Led[] = [];
  let ready = false;

  // ---- Faces, drawn once fonts are available ----
  const fontFace = { display: options.displayFont, mono: options.monoFont };

  function panel(u: number) {
    const height = Math.round((TEX_W * u * U) / FACE_W);
    const map = document.createElement("canvas");
    const glowMap = document.createElement("canvas");
    map.width = glowMap.width = TEX_W;
    map.height = glowMap.height = height;
    const g = map.getContext("2d")!;
    const e = glowMap.getContext("2d")!;
    e.fillStyle = "#000";
    e.fillRect(0, 0, TEX_W, height);
    const metal = g.createLinearGradient(0, 0, 0, height);
    metal.addColorStop(0, "#222228");
    metal.addColorStop(0.5, "#18181c");
    metal.addColorStop(1, "#111114");
    g.fillStyle = metal;
    g.fillRect(0, 0, TEX_W, height);
    g.globalAlpha = 0.045;
    for (let i = 0; i < 220; i++) {
      g.fillStyle = i % 2 ? "#fff" : "#000";
      g.fillRect(0, Math.random() * height, TEX_W, 1);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(255,255,255,.1)";
    g.fillRect(0, 0, TEX_W, 2);
    g.fillStyle = "rgba(0,0,0,.65)";
    g.fillRect(0, height - 3, TEX_W, 3);
    for (const x of [0, TEX_W - EAR]) {
      g.fillStyle = "#26262c";
      g.fillRect(x, 0, EAR, height);
      g.fillStyle = "rgba(0,0,0,.55)";
      g.fillRect(x === 0 ? EAR - 2 : x, 0, 2, height);
      for (let k = 0; k < u; k++) screw(g, x + EAR / 2, ((k + 0.5) * height) / u);
    }
    return { map, glowMap, g, e, height };
  }

  function screw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.beginPath();
    g.arc(x, y, 12, 0, Math.PI * 2);
    g.fillStyle = "#0c0c0e";
    g.fill();
    g.strokeStyle = "#45454d";
    g.lineWidth = 2;
    g.stroke();
    g.beginPath();
    g.moveTo(x - 6, y);
    g.lineTo(x + 6, y);
    g.moveTo(x, y - 6);
    g.lineTo(x, y + 6);
    g.strokeStyle = "#34343b";
    g.stroke();
  }

  function honeycomb(g: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) {
    g.save();
    g.beginPath();
    g.roundRect(x0, y0, x1 - x0, y1 - y0, 10);
    g.fillStyle = "#0d0d10";
    g.fill();
    g.clip();
    const r = 11;
    const dx = r * Math.sqrt(3);
    for (let row = 0, y = y0 + 4; y < y1 + r; row++, y += r * 1.5) {
      for (let x = x0 + (row % 2 ? dx / 2 : 0); x < x1 + dx; x += dx) {
        hex(g, x, y - 1, r - 2, "#34343c");
        hex(g, x, y, r - 2.5, "#020203");
      }
    }
    g.restore();
    g.strokeStyle = "#2e2e35";
    g.lineWidth = 3;
    g.beginPath();
    g.roundRect(x0, y0, x1 - x0, y1 - y0, 10);
    g.stroke();
  }

  function hex(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, fill: string) {
    g.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      if (i) g.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      else g.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    g.closePath();
    g.fillStyle = fill;
    g.fill();
  }

  // Label-maker tape, the way homelab gear gets named.
  function tape(g: CanvasRenderingContext2D, text: string, x: number, cy: number, size: number) {
    g.font = `700 ${size}px ${fontFace.mono}`;
    g.letterSpacing = `${Math.round(size * 0.14)}px`;
    const width = g.measureText(text).width + size * 1.2;
    const height = size * 1.8;
    g.save();
    g.translate(x, cy);
    g.rotate(-0.01);
    g.shadowColor = "rgba(0,0,0,.6)";
    g.shadowBlur = 6;
    g.shadowOffsetY = 3;
    g.fillStyle = "#ece6d6";
    g.fillRect(0, -height / 2, width, height);
    g.shadowColor = "transparent";
    g.fillStyle = "#121212";
    g.textBaseline = "middle";
    g.fillText(text, size * 0.6, size * 0.06);
    g.restore();
    g.letterSpacing = "0px";
  }

  const toLocal = (x: number, y: number, height: number, faceHeight: number) =>
    new THREE.Vector3((x / TEX_W - 0.5) * FACE_W, (0.5 - y / height) * faceHeight, 0.031);

  function faceMesh(u: number, map: HTMLCanvasElement, glowMap: HTMLCanvasElement, sides = chassis) {
    const faceHeight = u * U - 0.012;
    const face = new THREE.MeshStandardMaterial({ map: canvasTexture(map), emissive: 0xffffff, emissiveMap: canvasTexture(glowMap), emissiveIntensity: 0, metalness: 0.45, roughness: 0.5 });
    const plate = new THREE.Mesh(new THREE.BoxGeometry(FACE_W, faceHeight, 0.06), [sides, sides, sides, sides, face, sides]);
    return { plate, face, faceHeight };
  }

  function handle(faceHeight: number, side: number, material = aluminium) {
    const radius = faceHeight * 0.3;
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.022, 10, 28, Math.PI), material);
    mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)));
    mesh.position.set(side * (FACE_W / 2 - 0.115), 0, 0.03);
    return mesh;
  }

  function build() {
    let slot = OPEN_TOP;
    units.forEach((unit, index) => {
      slot -= unit.u * U;
      const y = slot + (unit.u * U) / 2;
      if (unit.kind === "gap") return;
      const group = new THREE.Group();
      group.position.set(0, y, FACE_Z - 0.03);
      rack.add(group);
      const { map, glowMap, g, e, height } = panel(unit.u);

      if (unit.kind === "server" && unit.vm) {
        const vm = unit.vm;
        honeycomb(g, 128, 30, 1170, height - 30);
        tape(g, vm.label.toUpperCase(), 176, height / 2, 60);
        const lx = 1232, ly = height / 2 - 64, lw = 430, lh = 128;
        g.fillStyle = "#050506";
        g.beginPath();
        g.roundRect(lx - 10, ly - 10, lw + 20, lh + 20, 12);
        g.fill();
        g.fillStyle = "#0a0d10";
        g.fillRect(lx, ly, lw, lh);
        e.fillStyle = css(vm.hex, 0.08);
        e.fillRect(lx, ly, lw, lh);
        e.fillStyle = css(vm.hex);
        e.font = `500 42px ${fontFace.mono}`;
        e.fillText(`VM ${vm.vmid}`, lx + 28, ly + 58);
        e.fillStyle = css(vm.hex, 0.7);
        e.font = `400 26px ${fontFace.mono}`;
        e.fillText(`${vm.id} · running`, lx + 28, ly + 102);
        const px = 1734, py = height / 2;
        g.beginPath();
        g.arc(px, py, 36, 0, Math.PI * 2);
        g.fillStyle = "#0c0c0e";
        g.fill();
        g.strokeStyle = "#34343b";
        g.lineWidth = 4;
        g.stroke();
        e.strokeStyle = css(vm.hex);
        e.lineWidth = 6;
        e.beginPath();
        e.arc(px, py, 27, 0, Math.PI * 2);
        e.stroke();
        e.lineWidth = 5;
        e.beginPath();
        e.arc(px, py + 2, 12, -Math.PI / 2 + 0.7, -Math.PI / 2 - 0.7 + Math.PI * 2);
        e.moveTo(px, py - 14);
        e.lineTo(px, py - 2);
        e.stroke();
        const bays = [1806, 1874];
        bays.forEach((bx) => {
          g.fillStyle = "#0a0a0c";
          g.fillRect(bx, 30, 58, height - 60);
          g.fillStyle = "#24242a";
          for (let k = 0; k < 9; k++) g.fillRect(bx + 10, 84 + k * 26, 38, 6);
          g.fillStyle = "#2f2f36";
          g.fillRect(bx + 6, height - 58, 46, 16);
        });
        // Each server owns its materials so it can fade out on its own when its window opens.
        const ownChassis = chassis.clone();
        const ownMetal = aluminium.clone();
        const { plate, face, faceHeight } = faceMesh(unit.u, map, glowMap, ownChassis);
        const shell = [face, ownChassis, ownMetal];
        shell.forEach((material) => { material.transparent = true; });
        group.add(plate, handle(faceHeight, -1, ownMetal), handle(faceHeight, 1, ownMetal));
        const body = new THREE.Mesh(new THREE.BoxGeometry(FACE_W - 0.52, faceHeight - 0.02, 2.7), ownChassis);
        body.position.z = -1.38;
        group.add(body);
        const power = glow(vm.hex, 0.42);
        power.position.copy(toLocal(px, py, height, faceHeight));
        power.position.z += 0.02;
        group.add(power);
        const activity = bays.map((bx, i) => {
          const led = dot(0x7cc4ff, 0.016);
          led.position.copy(toLocal(bx + 29, 48, height, faceHeight));
          group.add(led);
          return { mesh: led, seed: index * 7 + i * 3.1, rate: 11 + i * 4 };
        });
        const outline = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-FACE_W / 2 - 0.02, faceHeight / 2 + 0.02, 0.035),
            new THREE.Vector3(FACE_W / 2 + 0.02, faceHeight / 2 + 0.02, 0.035),
            new THREE.Vector3(FACE_W / 2 + 0.02, -faceHeight / 2 - 0.02, 0.035),
            new THREE.Vector3(-FACE_W / 2 - 0.02, -faceHeight / 2 - 0.02, 0.035),
          ]),
          new THREE.LineBasicMaterial({ color: vm.hex, transparent: true, opacity: 0, toneMapped: false }),
        );
        group.add(outline);
        const corners = [
          new THREE.Vector3(-FACE_W / 2, faceHeight / 2, 0.03),
          new THREE.Vector3(FACE_W / 2, faceHeight / 2, 0.03),
          new THREE.Vector3(FACE_W / 2, -faceHeight / 2, 0.03),
          new THREE.Vector3(-FACE_W / 2, -faceHeight / 2, 0.03),
        ];
        servers.push({ vm, group, baseZ: group.position.z, slide: 0, corners, outline, face, power, activity, bootAt: 0.25 + servers.length * 0.18, fade: 1, shell });
        return;
      }

      if (unit.kind === "patch") {
        tape(g, "PATCH", 132, height / 2, 26);
        for (let i = 0; i < 24; i++) {
          const x = 380 + i * 62;
          g.fillStyle = "#cfcabb";
          g.fillRect(x, 56, 46, 78);
          g.fillStyle = "#121214";
          g.fillRect(x + 9, 74, 28, 34);
        }
      } else if (unit.kind === "switch") {
        tape(g, "SW-01", 132, height / 2, 26);
        for (let i = 0; i < 24; i++) {
          const px = 380 + (i % 12) * 74, py = 26 + Math.floor(i / 12) * 74;
          g.fillStyle = "#050506";
          g.fillRect(px, py, 58, 58);
          g.fillStyle = "#26262c";
          g.fillRect(px + 8, py + 6, 42, 6);
          const led = dot(i % 5 === 0 ? 0xffb547 : 0x7cc4ff, 0.012);
          led.position.copy(toLocal(px + 64, py + 10, height, U - 0.012));
          group.add(led);
          ambientLeds.push({ mesh: led, seed: i * 1.7, rate: 6 + (i % 7) });
        }
        for (let i = 0; i < 4; i++) {
          g.fillStyle = "#0a0a0c";
          g.fillRect(1340 + i * 96, 50, 78, 88);
          g.fillStyle = "#3a3a42";
          g.fillRect(1348 + i * 96, 58, 62, 4);
        }
      } else if (unit.kind === "brush") {
        g.fillStyle = "#050506";
        g.fillRect(150, 62, TEX_W - 300, height - 124);
        for (let x = 150; x < TEX_W - 150; x += 3) {
          g.fillStyle = x % 2 ? "#17171b" : "#0b0b0d";
          g.fillRect(x, 62, 2, height - 124);
        }
      } else if (unit.kind === "ups") {
        tape(g, "UPS", 150, height / 2, 40);
        for (let k = 0; k < 9; k++) {
          g.fillStyle = "#08080a";
          g.fillRect(420, 46 + k * 32, 640, 14);
        }
        const lx = 1200, ly = height / 2 - 60;
        g.fillStyle = "#0a0d10";
        g.fillRect(lx, ly, 400, 120);
        e.fillStyle = css(0x7cc4ff, 0.08);
        e.fillRect(lx, ly, 400, 120);
        e.fillStyle = css(0x7cc4ff);
        e.font = `500 38px ${fontFace.mono}`;
        e.fillText("ONLINE", lx + 28, ly + 54);
        for (let k = 0; k < 4; k++) e.fillRect(lx + 28 + k * 40, ly + 78, 30, 18);
        for (let k = 0; k < 3; k++) {
          g.beginPath();
          g.arc(1700 + k * 80, height / 2, 22, 0, Math.PI * 2);
          g.fillStyle = "#0c0c0e";
          g.fill();
          g.strokeStyle = "#3a3a42";
          g.lineWidth = 3;
          g.stroke();
        }
      }

      const { plate, face, faceHeight } = faceMesh(unit.u, map, glowMap);
      face.emissiveIntensity = 1;
      group.add(plate);
      if (unit.kind !== "brush") group.add(handle(faceHeight, -1), handle(faceHeight, 1));
    });
  }

  // ---- Framing: the rack stays at one fixed angle; only the camera distance adapts ----
  const target = new THREE.Vector3(0, HEIGHT / 2, 0);
  const elevation = 0.17;
  const toCamera = new THREE.Vector3(0, Math.sin(elevation), Math.cos(elevation));
  const right = new THREE.Vector3(1, 0, 0);
  const up = new THREE.Vector3(0, Math.cos(elevation), -Math.sin(elevation));
  const bounds = [-1, 1].flatMap((x) => [0, HEIGHT].flatMap((y) => [-DEPTH / 2, FACE_Z + 0.35].map((z) => new THREE.Vector3(x * OUT_W / 2, y, z))));
  // Leave room for a server pulled all the way out.
  bounds.push(new THREE.Vector3(-FACE_W / 2, OPEN_TOP - 3 * U, FACE_Z + 1.5), new THREE.Vector3(FACE_W / 2, OPEN_BOTTOM + 3 * U, FACE_Z + 1.5));
  let width = 1, height = 1;
  const corner = new THREE.Vector3();

  function fit() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    rack.rotation.y = camera.aspect < 0.85 ? -0.3 : -0.44;
    rack.updateMatrixWorld(true);
    const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.94;
    const tanX = tanY * camera.aspect;
    let distance = 0;
    for (const point of bounds) {
      corner.copy(point).applyMatrix4(rack.matrixWorld).sub(target);
      const along = corner.dot(toCamera);
      distance = Math.max(distance, along + Math.abs(corner.dot(right)) / tanX, along + Math.abs(corner.dot(up)) / tanY);
    }
    camera.position.copy(target).addScaledVector(toCamera, distance);
    camera.lookAt(target);
    camera.far = distance + 30;
    camera.updateProjectionMatrix();
    dirty = true;
  }

  const projected = new THREE.Vector3();
  function layout() {
    const quads = {} as Record<VmId, Quad>;
    for (const server of servers) {
      server.group.updateMatrixWorld(true);
      quads[server.vm.id] = server.corners.map((point) => {
        projected.copy(point);
        server.group.localToWorld(projected).project(camera);
        return [((projected.x + 1) / 2) * width, ((1 - projected.y) / 2) * height] as [number, number];
      });
    }
    options.onLayout(quads);
  }

  // ---- State and loop ----
  let hover: VmId | null = null;
  let open: VmId | null = null;
  let paused = options.paused;
  let dirty = true;
  let clock = 0;
  let holdUntil = 0;
  const nudge = options.paused ? -1 : 1.6;
  const PULLED = 1.15;

  function tick(dt: number) {
    if (!ready) return;
    clock += dt;
    let moving = false;
    for (const server of servers) {
      // Opening: pull all the way out, then fade away. Closing: fade back in where it was, then slide home.
      const opening = server.vm.id === open;
      const fadeTarget = opening ? (server.slide > PULLED - 0.07 || paused ? 0 : 1) : clock < holdUntil ? server.fade : 1;
      const fadeNext = paused ? fadeTarget : server.fade + Math.sign(fadeTarget - server.fade) * Math.min(Math.abs(fadeTarget - server.fade), dt / 0.18);
      if (fadeNext !== fadeTarget) moving = true;
      server.fade = fadeNext;
      const out = opening ? PULLED : server.fade < 1 ? server.slide : server.vm.id === hover ? 0.32 : nudge > 0 && clock > nudge && clock < nudge + 0.55 && server === servers[0] ? 0.32 : 0;
      const next = paused ? out : server.slide + (out - server.slide) * (1 - Math.exp(-dt * 11));
      if (Math.abs(next - out) < 0.002) server.slide = out;
      else { server.slide = next; moving = true; }
      server.group.position.z = server.baseZ + server.slide;
      const lit = paused ? 1 : THREE.MathUtils.clamp((clock - server.bootAt) / 0.35, 0, 1);
      if (lit < 1) moving = true;
      const focus = Math.min(1, server.slide / 0.32);
      server.group.visible = server.fade > 0.01;
      server.shell.forEach((material) => { material.opacity = server.fade; });
      server.face.emissiveIntensity = lit * (0.85 + focus * 0.5);
      server.power.material.opacity = lit * (0.7 + focus * 0.3) * server.fade;
      server.outline.material.opacity = (server.vm.id === hover || opening ? focus : 0) * server.fade;
      for (const led of server.activity) led.mesh.visible = lit > 0 && server.fade > 0.5 && (paused || Math.sin(clock * led.rate + led.seed) > -0.2 || Math.sin(clock * 3.1 + led.seed) > 0.7);
    }
    if (nudge > 0 && clock < nudge + 1) moving = true;
    for (const led of ambientLeds) led.mesh.visible = paused || Math.sin(clock * led.rate + led.seed * 3) > -0.4;
    const animate = !paused && !open;
    if (!moving && !animate && !dirty) return;
    if (moving || dirty) layout();
    dirty = false;
    renderer.render(scene, camera);
  }

  let last = performance.now();
  renderer.setAnimationLoop((now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    tick(dt);
  });

  const observer = new ResizeObserver(fit);
  observer.observe(canvas);
  fit();

  Promise.all([
    document.fonts.load(`700 46px ${fontFace.mono}`),
    document.fonts.load(`500 42px ${fontFace.mono}`),
  ]).catch(() => undefined).then(() => {
    build();
    ready = true;
    dirty = true;
    tick(0);
    options.onReady();
  });

  return {
    setHover(id) { hover = id; dirty = true; },
    setOpen(id) {
      // Let the window finish closing before the server fades back in.
      if (!id && open) holdUntil = clock + (paused ? 0 : 0.22);
      open = id;
      dirty = true;
    },
    setPaused(value) { paused = value; dirty = true; },
    dispose() {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material;
        (Array.isArray(material) ? material : material ? [material] : []).forEach((item) => item.dispose());
      });
      textures.forEach((texture) => texture.dispose());
      envTarget.dispose();
      renderer.dispose();
    },
  };
}
