"use client";

import { useEffect, useRef } from "react";
import { Power, Server } from "lucide-react";
import { vms, vmFromHash, type VmId } from "../lib/vms";
import { closeVm, openVm, useShownVm, useVmRoute } from "../lib/hooks/use-vm-route";
import { getMotionPaused } from "../lib/motion-pref";
import { AboutPanel } from "./about-panel";
import { SkillsSection } from "./skills-section";
import { ProjectsGrid } from "./projects-grid";
import { ContactSection } from "./contact-section";

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN = "cubic-bezier(0.7, 0, 0.84, 0)";

// Matches the rack: a server pulls out (~0.3s) and fades (0.18s) before its window pops up.
const PULL_AND_FADE_MS = 470;

const panels: Record<VmId, React.ReactNode> = {
  about: <AboutPanel />,
  skills: <SkillsSection />,
  projects: <ProjectsGrid />,
  contact: <ContactSection />,
};

export function VmWindow() {
  const route = useVmRoute();
  const shown = useShownVm();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const vm = vms.find((item) => item.id === shown) ?? vms[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // The site's Pause motion toggle, not the OS setting, turns these transitions off (owner's call).
    const reduce = getMotionPaused();
    const body = dialog.querySelector<HTMLElement>(".vm-body");
    if (route && !dialog.open) {
      const show = () => {
        dialog.classList.remove("closing");
        dialog.showModal();
        dialog.querySelector<HTMLElement>(`#vm-heading-${route}`)?.focus();
        dialog.animate(
          reduce
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [{ opacity: 0, transform: "scale(0.9)" }, { opacity: 1, transform: "scale(1.012)", offset: 0.65 }, { opacity: 1, transform: "none" }],
          { duration: reduce ? 160 : 420, easing: EASE_OUT },
        );
        if (!reduce) body?.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 380, delay: 140, easing: EASE_OUT, fill: "backwards" });
      };
      // Give the 3D server time to slide out and fade before the window appears.
      if (reduce || !document.querySelector('.rack[data-mode="3d"]')) { show(); return; }
      const timer = window.setTimeout(show, PULL_AND_FADE_MS);
      return () => window.clearTimeout(timer);
    }
    if (route && dialog.open) {
      // Reopened mid-close, or switched windows: stay open.
      dialog.getAnimations().forEach((animation) => animation.cancel());
      dialog.classList.remove("closing");
      body?.scrollTo({ top: 0 });
      if (!reduce) body?.animate([{ opacity: 0, transform: "translateX(10px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: EASE_OUT });
      return;
    }
    if (!route && dialog.open) {
      dialog.classList.add("closing");
      const exit = dialog.animate(
        reduce ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(0.94)" }],
        { duration: reduce ? 120 : 220, easing: EASE_IN },
      );
      const finish = () => { if (!vmFromHash(window.location.hash)) dialog.close(); dialog.classList.remove("closing"); };
      exit.onfinish = finish;
      exit.oncancel = finish;
      // Background tabs can stall animations; the window still has to close.
      const timer = window.setTimeout(finish, (reduce ? 120 : 220) + 150);
      return () => window.clearTimeout(timer);
    }
  }, [route]);

  return (
    <dialog
      ref={dialogRef}
      className="vm-window"
      aria-labelledby={`vm-heading-${vm.id}`}
      style={{ "--accent": vm.accent } as React.CSSProperties}
      onCancel={(event) => { event.preventDefault(); closeVm(); }}
      onClose={() => { if (vmFromHash(window.location.hash)) closeVm(); }}
      onClick={(event) => { if (event.target === event.currentTarget) closeVm(); }}
    >
      <div className="vm-frame">
        <header className="vm-titlebar">
          <span className="vm-status" aria-hidden="true" />
          <p className="vm-title"><span>VM {vm.vmid}</span><span className="vm-title-name">{vm.id}</span><span className="vm-title-state">running</span></p>
          <button type="button" className="vm-close" onClick={closeVm}>
            <Power size={15} aria-hidden="true" />
            <span>Shut down</span>
            <kbd aria-hidden="true">Esc</kbd>
          </button>
        </header>
        <div className="vm-layout">
          <nav className="vm-tree" aria-label="Windows">
            <p className="vm-node"><Server size={14} aria-hidden="true" /> a04.dev</p>
            <ul>
              {vms.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={item.id === vm.id ? "page" : undefined}
                    style={{ "--accent": item.accent } as React.CSSProperties}
                    onClick={(event) => { event.preventDefault(); openVm(item.id); }}
                  >
                    <span className="vm-tree-dot" aria-hidden="true" />
                    <span className="vm-tree-id" aria-hidden="true">{item.vmid}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="vm-body">
            {vms.map((item) => (
              <div key={item.id} className="vm-panel" hidden={item.id !== vm.id}>{panels[item.id]}</div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
