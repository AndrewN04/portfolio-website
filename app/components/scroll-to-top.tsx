"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const handleScroll = () => {
      setIsVisible(window.scrollY > 240);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-20 right-4 sm:right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/85 backdrop-blur-sm shadow-lg border border-white/30 text-white transition hover:border-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
