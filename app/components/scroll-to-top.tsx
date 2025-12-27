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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-50 inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-900/80 p-3 text-white shadow-2xl backdrop-blur transition hover:border-white/40 hover:text-teal-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
