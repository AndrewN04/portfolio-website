import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, techRegistry } from "../lib/projects";

export function ProjectsGrid() {
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

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="fade-border group relative flex h-full flex-col justify-between rounded-[28px] bg-slate-900/60 p-6 sm:p-7 lg:p-8 transition hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <ArrowUpRight className="h-6 w-6 text-slate-400 transition group-hover:text-white" />
              </div>
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
      </div>
    </section>
  );
}
