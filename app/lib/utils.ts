/**
 * Smoothly scrolls to a section by ID without updating the browser URL
 */
export const scrollToSection = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Checks if the current device has a coarse pointer (touch device)
 * Safe to call during SSR - returns true as fallback (hides touch-specific features)
 */
export const getIsTouchDevice = (): boolean => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
};

