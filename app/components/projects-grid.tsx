"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { projects, techRegistry } from "../lib/projects";

export function ProjectsGrid() {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateItems = () => {
      const next = window.innerWidth < 768 ? 2 : 4;
      setItemsPerPage((prev) => (prev === next ? prev : next));
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const pages = useMemo(() => Math.ceil(projects.length / itemsPerPage), [itemsPerPage]);
  const safePage = Math.min(currentPage, Math.max(0, pages - 1));
  const startIndex = safePage * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="projects" className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Selected projects</p>
          <h2 className="text-3xl font-semibold text-white">Built with curiosity.</h2>
        </div>
        <a
          href="https://github.com/AndrewN04"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
        >
          Browse GitHub
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={safePage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid gap-8 md:grid-cols-2"
        >
          {visibleProjects.map((project) => (
            <article
              key={project.title}
              className="fade-border group relative flex h-full flex-col justify-between rounded-[28px] bg-slate-900/60 p-6 sm:p-7 lg:p-8 transition hover:-translate-y-1"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 text-base text-slate-300">{project.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.tech.map((techKey) => {
                  const tech = techRegistry[techKey];
                  if (!tech) return null;
                  const Icon = tech.icon;
                  return (
                    <span
                      key={`${project.title}-${techKey}`}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10"
                      style={{ backgroundColor: tech.background }}
                      title={tech.label}
                    >
                      <Icon className="h-5 w-5" style={{ color: tech.color }} aria-hidden />
                      <span className="sr-only">{tech.label}</span>
                    </span>
                  );
                })}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-white"
              >
                Open repository
                <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3" aria-label="Project carousel pagination">
          <button
            type="button"
            onClick={() => setCurrentPage((safePage - 1 + pages) % pages)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/60"
            aria-label="View previous projects"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, index) => (
              <button
                key={`project-page-${index}`}
                type="button"
                onClick={() => setCurrentPage(index)}
                className={`h-2.5 rounded-full transition ${
                  index === safePage ? "w-8 bg-white" : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to project set ${index + 1}`}
                aria-current={index === safePage}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage((safePage + 1) % pages)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/60"
            aria-label="View next projects"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
