"use client";

import { useEffect, useState } from "react";
import { ParticleWord } from "./particle-word";
import { useMotionPaused } from "../lib/motion-pref";
import { useVmRoute } from "../lib/hooks/use-vm-route";

const words = ["A04", "Developer", "Designer", "Innovator"] as const;

function useWordCycle(stopped: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (stopped) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1 >= words.length ? 1 : current + 1)), index === 0 ? 1800 : 3400);
    return () => window.clearTimeout(timer);
  }, [index, stopped]);
  return words[index];
}

export function HeroSection() {
  const paused = useMotionPaused();
  const open = useVmRoute() !== null;
  const word = useWordCycle(paused || open);

  return (
    <section className="desk-intro" aria-labelledby="hero-name">
      <ParticleWord word={word} words={words} paused={paused} suspended={open} />
      <h1 id="hero-name" className="desk-name">Andrew Nguyen</h1>
      <p className="sr-only">Developer, designer and innovator.</p>
      <p className="desk-line">Full Stack Developer working on web development, AI, and IT projects.</p>
    </section>
  );
}
