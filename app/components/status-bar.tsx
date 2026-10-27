"use client";

import { Pause } from "lucide-react";
import { vms } from "../lib/vms";
import { useVmRoute } from "../lib/hooks/use-vm-route";
import { setMotionPaused, useMotionPaused } from "../lib/motion-pref";
import { SocialLinks } from "./social-links";

export function StatusBar() {
  const route = useVmRoute();
  const paused = useMotionPaused();
  const vm = vms.find((item) => item.id === route);

  return (
    <footer className="status-bar">
      <p className="status-task" aria-hidden="true">
        <span className="status-led" />
        {vm ? `qm start ${vm.vmid} · ${vm.id} · OK` : `a04.dev · ${vms.length} VMs ready`}
      </p>
      <div className="status-end">
        <button type="button" className="status-toggle" aria-pressed={paused} onClick={() => setMotionPaused(!paused)}>
          <Pause size={14} aria-hidden="true" />
          <span>Pause motion</span>
        </button>
        <SocialLinks size={18} />
        <p className="status-copy">© {new Date().getFullYear()} Andrew Nguyen</p>
      </div>
    </footer>
  );
}
