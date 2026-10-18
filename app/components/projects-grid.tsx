"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { projects } from "../lib/projects";

const ITEMS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(projects.length / ITEMS_PER_PAGE);
const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction * 28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -28, opacity: 0 }),
};

export function ProjectsGrid() {
  const reducedMotion = useReducedMotion();
  const [{ page, direction }, setSlide] = useState({ page: 0, direction: 1 });
  const startIndex = page * ITEMS_PER_PAGE;
  const visibleProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const navigate = useCallback((step: 1 | -1) => {
    setSlide((current) => ({
      page: (current.page + step + TOTAL_PAGES) % TOTAL_PAGES,
      direction: step,
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

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let lastSwipeTime = -Infinity;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.max(30, Math.abs(event.deltaY))) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastSwipeTime < 450) return;
      lastSwipeTime = now;
      navigate(event.deltaX > 0 ? 1 : -1);
    };
    carousel.addEventListener("wheel", handleWheel, { passive: false });
    return () => carousel.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  return (
    <section id="projects" tabIndex={-1} aria-label="Projects" aria-roledescription="carousel" className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="section-heading">
          <span className="section-index">02</span>
          <div>
            <h2 className="section-title">Projects</h2>
            <p className="section-command"><span className="syntax-green">$</span> ls projects/</p>
          </div>
          <a className="button-secondary ml-auto" href="https://github.com/AndrewN04" target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div
          ref={carouselRef}
          className="relative"
          tabIndex={0}
          aria-label="Project slides; use left and right arrow keys to browse"
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            navigate(event.key === "ArrowRight" ? 1 : -1);
          }}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              style={{ touchAction: "pan-y" }}
              className="flex flex-col gap-2"
            >
              {visibleProjects.map((project, index) => {
                const ProjectElement = project.link ? "a" : "div";
                return (
                  <article key={project.title} className="project-row group">
                    <ProjectElement
                      href={project.link || undefined}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      draggable={false}
                      className="flex min-h-[88px] items-center gap-3 px-3 py-3 sm:gap-5 sm:px-5"
                    >
                      <span className="hidden shrink-0 font-mono text-xs text-[var(--text-dim)] sm:inline" aria-hidden="true">
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-base font-semibold leading-snug text-[var(--text)] sm:text-lg" title={project.title}>{project.title}</h3>
                          {!project.link && <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#efc875]"><Clock3 size={12} aria-hidden="true" /> {project.status ?? "Planned"}</span>}
                        </div>
                        <p className="text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">{project.description}</p>
                      </div>
                      {project.link && <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--blue)]" aria-hidden="true" />}
                    </ProjectElement>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">Project set {page + 1} of {TOTAL_PAGES}</p>
        {TOTAL_PAGES > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3" aria-label="Project carousel pagination">
            <button type="button" onClick={() => navigate(-1)} className="carousel-button" aria-label="View previous projects"><ArrowLeft size={16} aria-hidden="true" /></button>
            <div className="flex items-center gap-1">
              {Array.from({ length: TOTAL_PAGES }, (_, index) => (
                <button key={index} type="button" onClick={() => selectPage(index)} className="inline-flex h-11 min-w-11 items-center justify-center" aria-label={`Go to project set ${index + 1}`} aria-current={index === page ? "page" : undefined}>
                  <span aria-hidden="true" className={`h-2 rounded-full transition-all ${index === page ? "w-7 bg-[var(--blue)]" : "w-2 bg-white/35 hover:bg-white/70"}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => navigate(1)} className="carousel-button" aria-label="View next projects"><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </section>
  );
}
