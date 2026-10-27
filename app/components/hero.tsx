"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const KeyboardScene = dynamic(() => import("./keyboard-scene"), { ssr: false });

const roles = ["Developer", "Designer", "Innovator"] as const;

function useTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    const complete = !deleting && length === role.length;
    const empty = deleting && length === 0;
    const delay = complete ? 1500 : empty ? 140 : deleting ? 55 : 110;
    const timer = window.setTimeout(() => {
      if (complete) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else setLength((count) => count + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, length, roleIndex]);

  return roles[roleIndex].slice(0, length);
}

export function HeroSection() {
  const role = useTypewriter();
  const [webgl, setWebgl] = useState(true);
  const handleFail = useCallback(() => setWebgl(false), []);

  return (
    <section id="about" className="hero">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-14">
        <h1 className="hero-title" aria-label="Andrew Nguyen — Full Stack Developer">
          <span className="hero-role" aria-hidden="true"><span className="hero-gradient">{role}</span><span className="typing-cursor" /></span>
          <span className="hero-name">Andrew Nguyen</span>
        </h1>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="hero-intro">
            Hello, I&apos;m Andrew Nguyen, a Full Stack Developer. Working on projects when I can.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="keycap keycap-paper">
              View Projects <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="keycap">
              Contact Me <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {webgl && (
        <div className="keyboard-stage">
          <KeyboardScene typed={role} onFail={handleFail} />
          <p className="keyboard-hint" aria-hidden="true">
            <span className="hint-pointer">Click the keys, or just start typing.</span>
            <span className="hint-touch">Tap the keys.</span>
          </p>
        </div>
      )}
    </section>
  );
}
