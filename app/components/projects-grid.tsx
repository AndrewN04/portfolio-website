"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { projects } from "../lib/projects";

const ITEMS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(projects.length / ITEMS_PER_PAGE);
const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -48, opacity: 0 }),
};

export function ProjectsGrid() {
  const reducedMotion = useReducedMotion();
  const [{ page, direction }, setSlide] = useState({ page: 0, direction: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const startIndex = page * ITEMS_PER_PAGE;
  const visibleProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const navigate = useCallback((step: 1 | -1) => {
    setSlide((current) => ({
      page: (current.page + step + TOTAL_PAGES) % TOTAL_PAGES,
      direction: Math.sign(step),
    }));
  }, []);

  const selectPage = (nextPage: number) => {
    setSlide((current) => nextPage === current.page ? current : {
      page: nextPage,
      direction: nextPage > current.page ? 1 : -1,
    });
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) >= 50) navigate(info.offset.x < 0 ? 1 : -1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let lastSwipeTime = -Infinity;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.max(30, Math.abs(event.deltaY))) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastSwipeTime < 450) return;
      lastSwipeTime = now;
      navigate(event.deltaX > 0 ? 1 : -1);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  return (
    <section className="py-10 sm:py-16 relative overflow-hidden" id="projects" tabIndex={-1} aria-label="Projects" aria-roledescription="carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5c07b]">&lt;Projects /&gt;</h2>
            <p className="text-slate-400 mt-3 font-mono text-sm"><span className="text-[#98c379]">$</span> ls projects/</p>
          </div>
          <a className="inline-flex items-center gap-1 min-h-11 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
            href="https://github.com/AndrewN04" target="_blank" rel="noopener noreferrer"
            aria-label="View GitHub profile (opens in new tab)">
            <span className="sm:hidden">GitHub</span><span className="hidden sm:inline">View GitHub</span> <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div ref={containerRef} className="relative h-[632px] lg:h-[472px]" tabIndex={0}
          aria-label="Project slides; use left and right arrow keys to browse"
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            navigate(event.key === "ArrowRight" ? 1 : -1);
          }}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div key={page} custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12}
              onDragEnd={handleDragEnd}
              style={{ touchAction: "pan-y" }}
              className="grid grid-rows-5 gap-2 h-full w-full cursor-grab active:cursor-grabbing">
              {visibleProjects.map((project, index) => {
                const ProjectElement = project.link ? "a" : "div";
                return (
                  <article key={project.title} className="group min-h-0 border border-white/20 bg-black hover:bg-white/5 hover:border-white/40 transition-colors">
                    <ProjectElement href={project.link || undefined}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      draggable={false}
                      className="flex items-center gap-3 md:gap-5 h-full px-3 md:px-5 py-3">
                      <span className="hidden sm:inline shrink-0 text-xs font-mono text-slate-400" aria-hidden="true">
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg md:text-xl leading-tight font-bold uppercase tracking-tight text-white line-clamp-2" title={project.title}>
                            {project.title}
                          </h3>
                          {!project.link && <span className="shrink-0 text-[10px] font-mono text-[#e5c07b]">Planned</span>}
                        </div>
                        <p className="text-sm lg:text-[13px] leading-[1.4] text-slate-400 font-mono line-clamp-2" title={project.description}>
                          {project.description}
                        </p>
                      </div>
                      {project.link
                        ? <ArrowUpRight className="shrink-0 h-4 w-4 text-slate-400 group-hover:text-white transition-colors" aria-hidden="true" />
                        : <Clock3 className="shrink-0 h-4 w-4 text-[#e5c07b]" aria-hidden="true" />}
                    </ProjectElement>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">Project set {page + 1} of {TOTAL_PAGES}</p>
        {TOTAL_PAGES > 1 && (
          <div className="flex items-center justify-center gap-3 mt-5" aria-label="Project carousel pagination">
            <button type="button" onClick={() => navigate(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/60"
              aria-label="View previous projects"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></button>
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_PAGES }, (_, index) => (
                <button key={index} type="button" onClick={() => selectPage(index)}
                  className="inline-flex h-11 min-w-11 items-center justify-center"
                  aria-label={`Go to project set ${index + 1}`} aria-current={index === page ? "page" : undefined}>
                  <span aria-hidden="true" className={`h-2 rounded-full transition-all ${index === page ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/60"}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => navigate(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/60"
              aria-label="View next projects"><ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </section>
  );
}
