import { useSyncExternalStore } from "react";
import { vmFromHash, type VmId } from "../vms";

const CHANGE = "vm-route";
// True while the open window has its own history entry, so closing can step back instead of stacking entries.
let pushed = false;

const subscribe = (onChange: () => void) => {
  const onPop = () => { pushed = false; onChange(); };
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onPop);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onPop);
    window.removeEventListener(CHANGE, onChange);
  };
};

export function useVmRoute(): VmId | null {
  return useSyncExternalStore(subscribe, () => vmFromHash(window.location.hash), () => null);
}

// Keeps the last window's content on screen while it animates closed.
let lastShown: VmId = "about";
const getShown = () => {
  const id = vmFromHash(window.location.hash);
  if (id) lastShown = id;
  return lastShown;
};

export function useShownVm(): VmId {
  return useSyncExternalStore(subscribe, getShown, () => "about" as VmId);
}

export function openVm(id: VmId) {
  const current = vmFromHash(window.location.hash);
  if (current === id) return;
  if (current) window.history.replaceState(window.history.state, "", `#${id}`);
  else {
    window.history.pushState(window.history.state, "", `#${id}`);
    pushed = true;
  }
  window.dispatchEvent(new Event(CHANGE));
}

export function closeVm() {
  if (!vmFromHash(window.location.hash)) return;
  if (pushed) {
    pushed = false;
    window.history.back();
    return;
  }
  window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  window.dispatchEvent(new Event(CHANGE));
}
