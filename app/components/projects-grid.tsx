"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { projects } from "../lib/projects";

const ITEMS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(projects.length / ITEMS_PER_PAGE);
const pageVariants: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const rowVariants: Variants = {
  enter: (direction: number) => ({ rotateX: -75, y: direction * 18, opacity: 0 }),
  center: { rotateX: 0, y: 0, opacity: 1 },
  exit: (direction: number) => ({ rotateX: 75, y: direction * -18, opacity: 0 }),
};

function repoPath(link: string) {
  return link.replace("https://github.com/", "");
}

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
    <section id="projects" tabIndex={-1} aria-label="Projects" aria-roledescription="carousel" className="section-shell" style={{ "--layer": "var(--z2)" } as React.CSSProperties}>
      <div className="settle mx-auto max-w-7xl px-4 sm:px-6">
        <div className="section-head">
          <h2 className="section-title"><span className="mask"><span>Projects</span></span></h2>
          <a className="keycap" href="https://github.com/AndrewN04" target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div
          ref={carouselRef}
          className="carousel-stage relative"
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
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              style={{ touchAction: "pan-y" }}
              className="flex flex-col gap-2"
            >
              {visibleProjects.map((project) => {
                const ProjectElement = project.link ? "a" : "div";
                return (
                  <motion.article
                    key={project.title}
                    custom={direction}
                    variants={rowVariants}
                    transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="project-row"
                  >
                    <ProjectElement
                      href={project.link || undefined}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      draggable={false}
                      className="project-link flex min-h-[92px] items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3 className="text-lg font-bold leading-snug sm:text-xl" title={project.title}>{project.title}</h3>
                          {project.link
                            ? <span className="mono text-[11px] text-[var(--text-dim)]">{repoPath(project.link)}</span>
                            : <span className="mono inline-flex items-center gap-1.5 text-[11px] text-[var(--z1)]"><Clock3 size={12} aria-hidden="true" /> {project.status ?? "Planned"}</span>}
                        </div>
                        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>
                      </div>
                      {project.link && <span className="project-open" aria-hidden="true">Repo <ArrowUpRight size={14} /></span>}
                    </ProjectElement>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">Project set {page + 1} of {TOTAL_PAGES}</p>
        {TOTAL_PAGES > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3" aria-label="Project carousel pagination">
            <button type="button" onClick={() => navigate(-1)} className="keycap keycap-square" aria-label="View previous projects"><ArrowLeft size={16} aria-hidden="true" /></button>
            <div className="flex items-center gap-1">
              {Array.from({ length: TOTAL_PAGES }, (_, index) => (
                <button key={index} type="button" onClick={() => selectPage(index)} className="inline-flex h-11 min-w-11 items-center justify-center" aria-label={`Go to project set ${index + 1}`} aria-current={index === page ? "page" : undefined}>
                  <span aria-hidden="true" className={`h-2 rounded-[1px] transition-all duration-500 ${index === page ? "w-8 bg-[var(--z2)]" : "w-2 bg-white/35 hover:bg-white/70"}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => navigate(1)} className="keycap keycap-square" aria-label="View next projects"><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </section>
  );
}
