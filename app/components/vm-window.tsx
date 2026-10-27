"use client";

import { useEffect, useRef } from "react";
import { Power, Server } from "lucide-react";
import { vms, vmFromHash, type VmId } from "../lib/vms";
import { closeVm, openVm, useShownVm, useVmRoute } from "../lib/hooks/use-vm-route";
import { AboutPanel } from "./about-panel";
import { SkillsSection } from "./skills-section";
import { ProjectsGrid } from "./projects-grid";
import { ContactSection } from "./contact-section";

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN = "cubic-bezier(0.7, 0, 0.84, 0)";

// The window grows out of (and shrinks back into) the server that opened it.
function fromServer(dialog: HTMLElement, id: VmId) {
  const to = dialog.getBoundingClientRect();
  const from = document.querySelector(`[data-vm-link="${id}"]`)?.getBoundingClientRect();
  if (!from?.width || !to.width) return "translateY(24px) scale(0.96)";
  return `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const body = dialog.querySelector<HTMLElement>(".vm-body");
    if (route && !dialog.open) {
      dialog.classList.remove("closing");
      dialog.showModal();
      dialog.querySelector<HTMLElement>(`#vm-heading-${route}`)?.focus();
      dialog.animate(
        reduce ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: fromServer(dialog, route), opacity: 0.5 }, { transform: "none", opacity: 1 }],
        { duration: reduce ? 160 : 560, easing: EASE_OUT },
      );
      if (!reduce) body?.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 420, delay: 220, easing: EASE_OUT, fill: "backwards" });
    } else if (route && dialog.open) {
      // Reopened mid-close: stop shrinking and stay open.
      dialog.getAnimations().forEach((animation) => animation.cancel());
      dialog.classList.remove("closing");
      body?.scrollTo({ top: 0 });
      if (!reduce) body?.animate([{ opacity: 0, transform: "translateX(10px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: EASE_OUT });
    } else if (!route && dialog.open) {
      dialog.classList.add("closing");
      const exit = dialog.animate(
        reduce ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: "none", opacity: 1 }, { transform: fromServer(dialog, shown), opacity: 0 }],
        { duration: reduce ? 120 : 360, easing: EASE_IN },
      );
      const finish = () => { if (!vmFromHash(window.location.hash)) dialog.close(); dialog.classList.remove("closing"); };
      exit.onfinish = finish;
      exit.oncancel = finish;
      // Background tabs can stall animations; the window still has to close.
      const timer = window.setTimeout(finish, (reduce ? 120 : 360) + 150);
      return () => window.clearTimeout(timer);
    }
    // `shown` only matters for the closing frame, which reads it at that moment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
