"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

type Tone = "alpha" | "mod" | "amber" | "coral" | "paper";
type KeyDef = { code: string; label: string; w?: number; tone?: Tone };

const letters = (codes: string) => [...codes].map((char): KeyDef => ({ code: `Key${char}`, label: char }));
const rows: KeyDef[][] = [
  [{ code: "Escape", label: "esc", tone: "amber" }, ...[..."1234567890"].map((digit): KeyDef => ({ code: `Digit${digit}`, label: digit })), { code: "Minus", label: "-" }, { code: "Equal", label: "=" }, { code: "Backspace", label: "backspace", w: 2, tone: "mod" }],
  [{ code: "Tab", label: "tab", w: 1.5, tone: "mod" }, ...letters("QWERTYUIOP"), { code: "BracketLeft", label: "[" }, { code: "BracketRight", label: "]" }, { code: "Backslash", label: "\\", w: 1.5 }],
  [{ code: "CapsLock", label: "caps", w: 1.75, tone: "mod" }, ...letters("ASDFGHJKL"), { code: "Semicolon", label: ";" }, { code: "Quote", label: "'" }, { code: "Enter", label: "enter", w: 2.25, tone: "coral" }],
  [{ code: "ShiftLeft", label: "shift", w: 2.25, tone: "mod" }, ...letters("ZXCVBNM"), { code: "Comma", label: "," }, { code: "Period", label: "." }, { code: "Slash", label: "/" }, { code: "ShiftRight", label: "shift", w: 2.75, tone: "mod" }],
  [{ code: "ControlLeft", label: "ctrl", w: 1.25, tone: "mod" }, { code: "MetaLeft", label: "win", w: 1.25, tone: "mod" }, { code: "AltLeft", label: "alt", w: 1.25, tone: "mod" }, { code: "Space", label: "a04.dev", w: 6.25, tone: "paper" }, { code: "AltRight", label: "alt", w: 1.25, tone: "mod" }, { code: "Fn", label: "fn", w: 1.25, tone: "mod" }, { code: "ContextMenu", label: "menu", w: 1.25, tone: "mod" }, { code: "ControlRight", label: "ctrl", w: 1.25, tone: "mod" }],
];

const caps: Record<Tone, { cap: string; legend: string; flash: string }> = {
  alpha: { cap: "#17171b", legend: "#f2f1ec", flash: "#ffb547" },
  mod: { cap: "#26262c", legend: "#a6a5a0", flash: "#7cc4ff" },
  amber: { cap: "#ffb547", legend: "#050505", flash: "#ffb547" },
  coral: { cap: "#ff7a59", legend: "#050505", flash: "#ff7a59" },
  paper: { cap: "#e9e7df", legend: "#050505", flash: "#7cc4ff" },
};

const GAP = 0.12;
const CAP_HEIGHT = 0.42;
const REST_Y = 0.59;
const TRAVEL = 0.17;

function charToCodes(char: string) {
  if (/[a-z]/i.test(char)) return char === char.toUpperCase() ? ["ShiftLeft", `Key${char.toUpperCase()}`] : [`Key${char.toUpperCase()}`];
  if (char === " ") return ["Space"];
  return [];
}

function isEditable(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

function legendTexture(def: KeyDef, tone: Tone, font: string) {
  const w = def.w ?? 1;
  const scale = 160;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(scale * w);
  canvas.height = scale;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = caps[tone].legend;
  const single = def.label.length === 1;
  ctx.font = `${single ? 600 : 500} ${single ? 54 : 30}px ${font}`;
  ctx.textBaseline = single ? "top" : "bottom";
  if (def.code === "Space") {
    ctx.textAlign = "center";
    ctx.fillText(def.label, canvas.width / 2, canvas.height - 26);
  } else ctx.fillText(def.label, 22, single ? 20 : canvas.height - 22);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export default function KeyboardScene({ typed, onFail }: { typed: string; onFail: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<(code: string, down: boolean) => void>(() => {});
  const typedRef = useRef(typed);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      onFail();
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    scene.environmentIntensity = 0.35;

    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    const viewDirection = new THREE.Vector3(0, 0.78, 0.62).normalize();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x080808, 0.5));
    const keyLight = new THREE.DirectionalLight(0xfff1de, 2.4);
    keyLight.position.set(-5, 11, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    Object.assign(keyLight.shadow.camera, { left: -10, right: 10, top: 6, bottom: -6 });
    keyLight.shadow.radius = 4;
    scene.add(keyLight);
    const rimSky = new THREE.DirectionalLight(0x7cc4ff, 1.4);
    rimSky.position.set(8, 3, -7);
    scene.add(rimSky);
    const rimAmber = new THREE.DirectionalLight(0xffb547, 0.9);
    rimAmber.position.set(-9, 2, -5);
    scene.add(rimAmber);

    const board = new THREE.Group();
    scene.add(board);

    const disposables: { dispose: () => void }[] = [pmrem, environment];
    const caseGeometry = new RoundedBoxGeometry(15.7, 0.6, 5.7, 4, 0.28);
    const caseMaterial = new THREE.MeshStandardMaterial({ color: 0x0c0c0e, metalness: 0.75, roughness: 0.32 });
    const keyboardCase = new THREE.Mesh(caseGeometry, caseMaterial);
    keyboardCase.receiveShadow = true;
    board.add(keyboardCase);
    disposables.push(caseGeometry, caseMaterial);

    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d")!;
    const gradient = shadowCtx.createRadialGradient(64, 64, 8, 64, 64, 64);
    gradient.addColorStop(0, "rgba(0,0,0,0.85)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const groundGeometry = new THREE.PlaneGeometry(22, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.45;
    board.add(ground);
    disposables.push(shadowTexture, groundGeometry, groundMaterial);

    type KeyState = { mesh: THREE.Group; cap: THREE.MeshStandardMaterial; flash: THREE.Color; down: number; target: number; glow: number };
    const keys = new Map<string, KeyState>();
    const pickables: THREE.Object3D[] = [];
    const capGeometries = new Map<number, RoundedBoxGeometry>();
    const fontFamily = getComputedStyle(document.body).getPropertyValue("--font-mono").trim() || "monospace";

    const buildKeys = () => {
      rows.forEach((row, rowIndex) => {
        let x = -7.5;
        row.forEach((def) => {
          const w = def.w ?? 1;
          const tone = def.tone ?? "alpha";
          let geometry = capGeometries.get(w);
          if (!geometry) {
            geometry = new RoundedBoxGeometry(w - GAP, CAP_HEIGHT, 1 - GAP, 3, 0.1);
            capGeometries.set(w, geometry);
            disposables.push(geometry);
          }
          const cap = new THREE.MeshStandardMaterial({ color: caps[tone].cap, roughness: 0.62, metalness: 0.02 });
          const capMesh = new THREE.Mesh(geometry, cap);
          capMesh.castShadow = true;
          capMesh.userData.code = def.code;
          const legendMap = legendTexture(def, tone, fontFamily);
          const legendGeometry = new THREE.PlaneGeometry(w - GAP - 0.1, 1 - GAP - 0.1);
          const legendMaterial = new THREE.MeshBasicMaterial({ map: legendMap, transparent: true, toneMapped: false });
          const legend = new THREE.Mesh(legendGeometry, legendMaterial);
          legend.rotation.x = -Math.PI / 2;
          legend.position.y = CAP_HEIGHT / 2 + 0.003;
          const key = new THREE.Group();
          key.add(capMesh, legend);
          key.position.set(x + w / 2, REST_Y, (rowIndex - 2) * 1.0);
          board.add(key);
          pickables.push(capMesh);
          keys.set(def.code, { mesh: key, cap, flash: new THREE.Color(caps[tone].flash), down: 0, target: 0, glow: 0 });
          disposables.push(cap, legendMap, legendGeometry, legendMaterial);
          x += w;
        });
      });
    };

    const pressed = new Set<string>();
    const press = (code: string, down: boolean) => {
      const key = keys.get(code);
      if (!key) return;
      key.target = down ? 1 : 0;
      if (down) key.glow = 1;
      if (down) pressed.add(code); else pressed.delete(code);
    };
    pressRef.current = press;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: string | null = null;
    let pointerDownCode: string | null = null;
    const tilt = { x: 0, y: 0 };
    const pick = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      return (hit?.object.userData.code as string | undefined) ?? null;
    };
    const onPointerMove = (event: PointerEvent) => {
      tilt.x = (event.clientX / window.innerWidth) * 2 - 1;
      tilt.y = (event.clientY / window.innerHeight) * 2 - 1;
      if (event.target !== renderer.domElement) return;
      hovered = pick(event);
      renderer.domElement.style.cursor = hovered ? "pointer" : "default";
    };
    const onPointerDown = (event: PointerEvent) => {
      pointerDownCode = pick(event);
      if (pointerDownCode) press(pointerDownCode, true);
    };
    const releasePointer = () => {
      if (pointerDownCode) press(pointerDownCode, false);
      pointerDownCode = null;
    };
    const onPointerLeave = () => {
      hovered = null;
      releasePointer();
    };
    // Mirror real typing, but never keystrokes inside form fields
    const onKeyDown = (event: KeyboardEvent) => { if (!isEditable(event.target)) press(event.code, true); };
    const onKeyUp = (event: KeyboardEvent) => press(event.code, false);
    const releaseAll = () => [...pressed].forEach((code) => press(code, false));

    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener("pointermove", onPointerMove, { passive: true, signal });
    renderer.domElement.addEventListener("pointerdown", onPointerDown, { signal });
    window.addEventListener("pointerup", releasePointer, { signal });
    renderer.domElement.addEventListener("pointerleave", onPointerLeave, { signal });
    window.addEventListener("keydown", onKeyDown, { signal });
    window.addEventListener("keyup", onKeyUp, { signal });
    window.addEventListener("blur", releaseAll, { signal });

    const fit = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
      const horizontal = Math.atan(Math.tan(halfFov) * camera.aspect);
      // narrow screens frame closer so caps stay tappable; the outer edges crop
      const halfWidth = camera.aspect < 1.6 ? 6.6 : 9.8;
      const distance = Math.max(halfWidth / Math.tan(horizontal), 4.2 / Math.tan(halfFov), 12);
      camera.position.copy(viewDirection).multiplyScalar(distance);
      camera.lookAt(0, 0, 0.35);
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(container);

    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibility.observe(container);

    const clock = new THREE.Clock();
    const hoverColor = new THREE.Color();
    let frame = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;
      const ease = 1 - Math.exp(-delta * 9);
      board.rotation.y += ((reducedMotion ? 0 : tilt.x * 0.16) - 0.12 - board.rotation.y) * ease;
      board.rotation.x += ((reducedMotion ? 0 : tilt.y * 0.06) - board.rotation.x) * ease;
      board.position.y = reducedMotion ? 0 : Math.sin(time * 0.9) * 0.06;
      const keyEase = 1 - Math.exp(-delta * 28);
      keys.forEach((key, code) => {
        key.down += (key.target - key.down) * keyEase;
        key.mesh.position.y = REST_Y - TRAVEL * key.down;
        key.glow = Math.max(0, key.glow - delta * 2.6);
        const hover = code === hovered && key.target === 0 ? 0.08 : 0;
        key.cap.emissive.copy(hoverColor.copy(key.flash)).multiplyScalar(Math.max(key.glow * 0.3, hover));
      });
      renderer.render(scene, camera);
    };

    let cancelled = false;
    document.fonts.load(`500 30px ${fontFamily}`).catch(() => undefined).finally(() => {
      if (cancelled) return;
      buildKeys();
      fit();
      loop();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      controller.abort();
      resizeObserver.disconnect();
      visibility.disconnect();
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onFail]);

  // Press the keys the hero typewriter is typing
  useEffect(() => {
    const previous = typedRef.current;
    typedRef.current = typed;
    const codes = typed.length > previous.length ? charToCodes(typed.at(-1) ?? "") : typed.length < previous.length ? ["Backspace"] : [];
    codes.forEach((code) => pressRef.current(code, true));
    const timer = window.setTimeout(() => codes.forEach((code) => pressRef.current(code, false)), 85);
    return () => {
      window.clearTimeout(timer);
      codes.forEach((code) => pressRef.current(code, false));
    };
  }, [typed]);

  return <div ref={containerRef} className="keyboard-canvas" />;
}
