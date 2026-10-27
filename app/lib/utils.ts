/**
 * Checks if the current device has a coarse pointer (touch device)
 * Safe to call during SSR - returns true as fallback (hides touch-specific features)
 */
export const getIsTouchDevice = (): boolean => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
};
