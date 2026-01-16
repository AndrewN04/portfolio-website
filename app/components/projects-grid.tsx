"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "../lib/projects";

const slideVariants: Variants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function ProjectsGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const itemsPerPage = 4;

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));
  const startIndex = safePage * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    setDirection("right");
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection("left");
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextPage();
    } else if (info.offset.x > swipeThreshold) {
      prevPage();
    }
  };

  // Two-finger trackpad swipe support
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSwipeTime = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll (two-finger swipe)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
        const now = Date.now();
        // Debounce to prevent multiple triggers
        if (now - lastSwipeTime.current > 400) {
          lastSwipeTime.current = now;
          if (e.deltaX > 0) {
            setDirection("right");
            setCurrentPage((prev) => (prev + 1) % totalPages);
          } else {
            setDirection("left");
            setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
          }
        }
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [totalPages]);

  return (
    <section className="py-20 relative overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              <span className="text-[#e5c07b]">&lt;</span>
              <span className="text-[#e5c07b] relative">
                Projects
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e5c07b] opacity-50"></span>
              </span>
              <span className="text-[#e5c07b]">/&gt;</span>
            </h2>
            <p className="text-slate-400 mt-4 font-mono text-sm">
              <span className="text-[#98c379]">$</span>{" "}
              <span className="text-white">ls</span>{" "}
              <span className="text-white">projects/</span>
            </p>
          </div>
          <a
            className="hidden md:flex items-center gap-1 text-white font-medium hover:text-gray-300 transition-colors"
            href="https://github.com/AndrewN04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub profile (opens in new tab)"
          >
            View Github{" "}
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              open_in_new
            </span>
          </a>
        </div>

        {/* Stacked box grid container */}
        <div ref={containerRef} className="relative overflow-visible py-2">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={safePage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "tween",
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="space-y-2 cursor-grab active:cursor-grabbing"
            >
              {visibleProjects.map((project, index) => {
                const globalIndex = startIndex + index;
                return (
                  <motion.article
                    key={project.title}
                    className="group relative border border-white/20 bg-black hover:bg-white/5 hover:border-white/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <a
                      href={project.link || "#"}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between px-6 py-8 md:py-10"
                    >
                      <div className="flex items-center gap-6 flex-1 min-w-0">
                        {/* Project number */}
                        <span className="text-sm font-mono text-white/40">
                          {String(globalIndex + 1).padStart(2, "0")}
                        </span>

                        <div className="flex-1 min-w-0">
                          {/* Project title */}
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-2 text-white">
                            {project.title}
                          </h3>

                          {/* Project description */}
                          <p className="text-sm md:text-base text-white/60 font-mono">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Arrow icon */}
                      <div className="shrink-0 ml-6 text-white/60 group-hover:text-white transition-all group-hover:translate-x-1">
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                    </a>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div
            className="flex items-center justify-center gap-3 mt-8"
            aria-label="Project carousel pagination"
          >
            <button
              type="button"
              onClick={prevPage}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/60"
              aria-label="View previous projects"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={`project-page-${index}`}
                  type="button"
                  onClick={() => setCurrentPage(index)}
                  className={`h-2.5 rounded-full transition ${
                    index === safePage
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to project set ${index + 1}`}
                  aria-current={index === safePage}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextPage}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/60"
              aria-label="View next projects"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <a
            className="inline-flex items-center gap-1 text-white font-medium hover:text-gray-300 transition-colors"
            href="https://github.com/AndrewN04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub profile (opens in new tab)"
          >
            View Github{" "}
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              open_in_new
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
