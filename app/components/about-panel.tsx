"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { openVm } from "../lib/hooks/use-vm-route";
import { useTouchDevice } from "../lib/hooks/use-touch-device";
import { SocialLinks } from "./social-links";

function SpotlightWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const isTouchDevice = useTouchDevice();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const clipPath = useMotionTemplate`circle(56px at ${x}px ${y}px)`;

  return (
    <div
      ref={ref}
      className="wordmark"
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => { x.set(-200); y.set(-200); }}
    >
      <p className="wordmark-text">a04.dev</p>
      {!isTouchDevice && <motion.p style={{ clipPath }} aria-hidden="true" className="wordmark-text wordmark-lit">a04.dev</motion.p>}
    </div>
  );
}

export function AboutPanel() {
  return (
    <article className="about" aria-labelledby="vm-heading-about">
      <h2 id="vm-heading-about" tabIndex={-1} className="vm-heading">About me</h2>
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-lede">I&apos;m Andrew Nguyen, a Full Stack Developer working on various web development, AI, and IT projects.</p>
          <p>Most of my work moves between Next.js apps, Python and AI tools, and the Proxmox homelab I run. I work on projects when I can; right now that&apos;s A04 Agent, an IT support copilot that&apos;s still in development.</p>
          <div className="about-actions">
            <a href="#projects" className="btn btn-primary" onClick={(event) => { event.preventDefault(); openVm("projects"); }}>
              See projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn" onClick={(event) => { event.preventDefault(); openVm("contact"); }}>
              Get in touch <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <dl className="about-facts">
          <div><dt>Role</dt><dd>Full Stack Developer</dd></div>
          <div><dt>Focus</dt><dd>Web development, AI, IT</dd></div>
          <div><dt>Building</dt><dd>A04 Agent <span className="status-chip">In development</span></dd></div>
          <div><dt>Status</dt><dd>Open for opportunities</dd></div>
          <div><dt>Elsewhere</dt><dd><SocialLinks size={18} labels /></dd></div>
        </dl>
      </div>
      <SpotlightWordmark />
    </article>
  );
}
