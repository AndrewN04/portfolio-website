"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { projects, type TechKey } from "../lib/projects";
import { skillsRegistry, type SkillKey } from "../lib/skills";
import { useMotionPaused } from "../lib/motion-pref";

const extraLabels: Partial<Record<TechKey, string>> = { opencv: "OpenCV", tensorflow: "TensorFlow", sqlite: "SQLite", neon: "Neon" };
const registered = (key: TechKey): key is TechKey & SkillKey => key in skillsRegistry;
const steps: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

function repoPath(link: string) {
  return link.replace("https://github.com/", "");
}

export function ProjectsGrid() {
  const paused = useMotionPaused();
  const [{ index, direction }, setSelection] = useState({ index: 0, direction: 1 });
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const toggle = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const project = projects[index];

  // Small screens show the list as a menu; closing it hands focus back to its button.
  const closeMenu = () => {
    setMenuOpen(false);
    if (toggle.current?.offsetParent) toggle.current.focus();
  };

  // Safari doesn't focus a tapped button, so focus events alone can't tell when a tap lands outside the menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!toggle.current?.contains(target) && !list.current?.contains(target)) setMenuOpen(false);
    };
    // Escape reaches the window as a cancel request; while the menu is open it closes the menu instead.
    const dialog = toggle.current?.closest("dialog");
    const onCancel = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      setMenuOpen(false);
      if (toggle.current?.offsetParent) toggle.current.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    dialog?.addEventListener("cancel", onCancel, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      dialog?.removeEventListener("cancel", onCancel, true);
    };
  }, [menuOpen]);

  const select = (next: number, focus = false) => {
    const target = (next + projects.length) % projects.length;
    setSelection((current) => ({ index: target, direction: next >= current.index ? 1 : -1 }));
    if (focus) tabs.current[target]?.focus();
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) >= 50) select(index + (info.offset.x < 0 ? 1 : -1));
  };

  return (
    <section aria-labelledby="vm-heading-projects">
      <div className="vm-head">
        <h2 id="vm-heading-projects" tabIndex={-1} className="vm-heading">Projects</h2>
        <a className="btn btn-quiet" href="https://github.com/AndrewN04" target="_blank" rel="noopener noreferrer">
          GitHub <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      <div
        className="guests"
        data-menu={menuOpen ? "open" : "closed"}
        onBlur={(event) => {
          const next = event.relatedTarget;
          if (menuOpen && next && !toggle.current?.contains(next) && !list.current?.contains(next)) setMenuOpen(false);
        }}
      >
        <button
          ref={toggle}
          type="button"
          className="guest-toggle"
          aria-expanded={menuOpen}
          aria-controls="guest-list"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          <span className="guest-toggle-label"><span className="sr-only">Projects menu: </span>{project.title}</span>
          <span className="mono" aria-hidden="true">{index + 1} / {projects.length}</span>
        </button>
        <div
          ref={list}
          role="tablist"
          id="guest-list"
          aria-orientation="vertical"
          aria-label="Projects"
          className="guest-list"
          onKeyDown={(event) => {
            if (event.key in steps) select(index + steps[event.key], true);
            else if (event.key === "Home") select(0, true);
            else if (event.key === "End") select(projects.length - 1, true);
            else return;
            event.preventDefault();
          }}
        >
          {projects.map((item, i) => (
            <button
              key={item.title}
              ref={(element) => { tabs.current[i] = element; }}
              type="button"
              role="tab"
              id={`guest-tab-${i}`}
              aria-selected={i === index}
              aria-controls="guest-panel"
              tabIndex={i === index ? 0 : -1}
              className="guest"
              onClick={() => { select(i); if (menuOpen) closeMenu(); }}
            >
              <span className="guest-dot" data-dev={Boolean(item.status)} aria-hidden="true" />
              <span className="guest-name">{item.title}</span>
              <span className="guest-meta">{item.link ? repoPath(item.link) : item.status}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" id="guest-panel" aria-labelledby={`guest-tab-${index}`} className="guest-panel">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.article
              key={index}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: paused ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              style={{ touchAction: "pan-y" }}
              className="guest-detail"
            >
              <h3>{project.title}</h3>
              <p className="guest-repo">
                {project.link ? repoPath(project.link) : <span className="status-chip">{project.status ?? "Planned"}</span>}
              </p>
              <p className="guest-description">{project.description}</p>
              <ul className="chips" aria-label="Built with">
                {project.tech.map((key) => (
                  <li key={key} className="chip">
                    {registered(key) && <Image src={skillsRegistry[key].svg} alt="" width={16} height={16} />}
                    <span>{registered(key) ? skillsRegistry[key].label : extraLabels[key] ?? key}</span>
                  </li>
                ))}
              </ul>
              {project.link && (
                <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer" draggable={false}>
                  Open repo <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </motion.article>
          </AnimatePresence>
          <div className="guest-pager">
            <button type="button" className="icon-btn" onClick={() => select(index - 1)} aria-label="Previous project"><ArrowLeft size={16} aria-hidden="true" /></button>
            <span className="mono" aria-hidden="true">{index + 1} / {projects.length}</span>
            <button type="button" className="icon-btn" onClick={() => select(index + 1)} aria-label="Next project"><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
