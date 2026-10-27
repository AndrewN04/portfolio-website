"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointerClick } from "lucide-react";
import { vms, type VmId } from "../lib/vms";
import { openVm, useVmRoute } from "../lib/hooks/use-vm-route";
import { getMotionPaused, useMotionPaused } from "../lib/motion-pref";
import type { Quad, RackHandle } from "./rack-scene";

/**
 * The four servers are real links. With WebGL they sit invisibly over each server face
 * and drive the 3D highlight; without it they render as a flat CSS rack.
 */
export function Rack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<RackHandle | null>(null);
  const [mode, setMode] = useState<"pending" | "3d" | "flat">("pending");
  const [hover, setHover] = useState<VmId | null>(null);
  const open = useVmRoute();
  const paused = useMotionPaused();

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    let disposed = false;
    const fallback = window.setTimeout(() => setMode((current) => (current === "pending" ? "flat" : current)), 8000);
    const place = (quads: Record<VmId, Quad>) => {
      for (const vm of vms) {
        const link = stage.querySelector<HTMLElement>(`[data-vm-link="${vm.id}"]`);
        const quad = quads[vm.id];
        if (!link || !quad) continue;
        const xs = quad.map((point) => point[0]);
        const ys = quad.map((point) => point[1]);
        const left = Math.min(...xs), top = Math.min(...ys);
        link.style.setProperty("--x", `${left}px`);
        link.style.setProperty("--y", `${top}px`);
        link.style.setProperty("--w", `${Math.max(...xs) - left}px`);
        link.style.setProperty("--h", `${Math.max(...ys) - top}px`);
        link.style.setProperty("--clip", `polygon(${quad.map(([x, y]) => `${x - left}px ${y - top}px`).join(", ")})`);
      }
    };
    import("./rack-scene").then(({ createRack }) => {
      if (disposed) return;
      const fonts = getComputedStyle(document.body);
      try {
        handleRef.current = createRack(canvas, {
          displayFont: fonts.getPropertyValue("--font-display"),
          monoFont: fonts.getPropertyValue("--font-mono"),
          paused: getMotionPaused(),
          onLayout: place,
          onReady: () => { if (!disposed) setMode("3d"); },
        });
      } catch {
        setMode("flat");
      }
    }).catch(() => setMode("flat"));
    return () => {
      disposed = true;
      window.clearTimeout(fallback);
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, []);

  useEffect(() => { handleRef.current?.setOpen(open); }, [open, mode]);
  useEffect(() => { handleRef.current?.setPaused(paused); }, [paused, mode]);
  useEffect(() => { handleRef.current?.setHover(hover); }, [hover, mode]);

  const hovered = vms.find((vm) => vm.id === hover);

  return (
    <div className="rack" data-mode={mode}>
      <nav ref={stageRef} className="rack-stage" aria-label="Servers">
        <canvas ref={canvasRef} className="rack-canvas" aria-hidden="true" />
        <ul className="rack-units">
          {vms.map((vm) => (
            <li key={vm.id}>
              <a
                href={`#${vm.id}`}
                data-vm-link={vm.id}
                className="server-link"
                style={{ "--accent": vm.accent } as React.CSSProperties}
                aria-label={`Open ${vm.label}, VM ${vm.vmid}`}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  openVm(vm.id);
                }}
                onPointerEnter={() => setHover(vm.id)}
                onPointerLeave={() => setHover((current) => (current === vm.id ? null : current))}
                onFocus={() => setHover(vm.id)}
                onBlur={() => setHover((current) => (current === vm.id ? null : current))}
              >
                <span className="server-tape">{vm.label}</span>
                <span className="server-lcd">VM {vm.vmid}</span>
                <span className="server-led" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="rack-hint" aria-hidden="true">
        <MousePointerClick size={15} />
        {hovered ? <span>Open <b>{hovered.label}</b> · VM {hovered.vmid}</span> : <span><span className="hint-pointer">Select</span><span className="hint-touch">Tap</span> a server to open it</span>}
      </p>
    </div>
  );
}
