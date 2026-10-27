"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTouchDevice } from "../lib/hooks/use-touch-device";
import { useMotionPaused } from "../lib/motion-pref";
import { useVmRoute } from "../lib/hooks/use-vm-route";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useTouchDevice();
  // Follows the site's Pause motion toggle like the rest of the motion (owner's call).
  const paused = useMotionPaused();
  // An open window sits in the browser's top layer, above any z-index, so the cursor steps aside.
  const windowOpen = useVmRoute() !== null;
  const off = isTouchDevice || paused;

  // Use motion values for instant tracking (no React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring for smooth but fast following
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (off) return;

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
  }, [mouseX, mouseY, off]);

  // Don't render on touch devices or while motion is paused
  if (off) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: isVisible && !windowOpen ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.15 } }}
      aria-hidden="true"
    >
      {/* Hollow diamond cursor */}
      <div className="w-5 h-5 rotate-45 rounded-[2px] border-[1.5px] border-[var(--z1)]" />
    </motion.div>
  );
}
