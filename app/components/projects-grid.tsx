"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, techRegistry } from "../lib/projects";

const slideVariants: Variants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? "-100%" : "100%",
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
    <section className="py-20 bg-background-dark" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">Selected Projects</h2>
            <p className="text-slate-400 mt-2">
              A showcase of my recent development work.
            </p>
          </div>
          <a
            className="hidden md:flex items-center gap-1 text-primary font-medium hover:text-primary-hover transition-colors"
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

        {/* Rounded container box for projects */}
        <div
          ref={containerRef}
          className="rounded-2xl border border-slate-700/50 bg-[#0c0e1a] p-4 md:p-6"
        >
          <div className="relative overflow-hidden min-h-105">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={safePage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-grab active:cursor-grabbing"
              >
                {visibleProjects.map((project) => (
                  <article
                    key={project.title}
                    className="group bg-surface-dark rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                      <div className="absolute inset-0 bg-linear-to-br from-slate-700 to-slate-900 group-hover:scale-105 transition-transform duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black text-sm font-bold py-2 px-4 rounded-full hover:bg-slate-100 transition-colors"
                            aria-label={`View ${project.title} repository (opens in new tab)`}
                          >
                            View Repository
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-500 hover:text-white cursor-pointer transition-colors"
                              aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                            >
                              <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                              >
                                code
                              </span>
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Language Icons - Preserved from original */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((techKey) => {
                          const tech = techRegistry[techKey];
                          if (!tech) return null;
                          const Icon = tech.icon;
                          return (
                            <span
                              key={`${project.title}-${techKey}`}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 tech-badge-${techKey}`}
                              title={tech.label}
                            >
                              <Icon className="h-4 w-4 tech-icon" aria-hidden />
                              <span className="sr-only">{tech.label}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
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
            className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary-hover transition-colors"
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
