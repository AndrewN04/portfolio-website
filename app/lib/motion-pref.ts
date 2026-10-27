import { useSyncExternalStore } from "react";

const KEY = "a04-motion-paused";
const listeners = new Set<() => void>();
let paused: boolean | null = null;

export function getMotionPaused() {
  if (paused === null) {
    try { paused = window.localStorage.getItem(KEY) === "1"; } catch { paused = false; }
  }
  return paused;
}

export function setMotionPaused(value: boolean) {
  paused = value;
  try { window.localStorage.setItem(KEY, value ? "1" : "0"); } catch { /* storage blocked: keep it for this visit */ }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useMotionPaused() {
  return useSyncExternalStore(subscribe, getMotionPaused, () => false);
}
