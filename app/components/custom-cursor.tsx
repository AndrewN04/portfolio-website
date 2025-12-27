"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getIsTouchDevice } from "../lib/utils";

// Subscribe to touch device state (static - doesn't change)
const subscribe = () => () => {};
const getSnapshot = () => getIsTouchDevice();
const getServerSnapshot = () => true; // Assume touch on server to skip rendering

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  // useSyncExternalStore properly handles SSR hydration mismatch
  const isTouchDevice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Use motion values for instant tracking (no React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring for smooth but fast following
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const controller = new AbortController();
    const { signal } = controller;

    const updatePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition, {
      passive: true,
      signal,
    });
    document.addEventListener("mouseleave", handleMouseLeave, { signal });
    document.addEventListener("mouseenter", handleMouseEnter, { signal });

    return () => controller.abort();
  }, [mouseX, mouseY, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-9999"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.15 } }}
      aria-hidden="true"
    >
      {/* Hollow circle cursor */}
      <div className="w-6 h-6 rounded-full border-2 border-white/60" />
    </motion.div>
  );
}
