"use client";

import { useEffect, useRef, useState } from "react";
import { getMotionPaused } from "../lib/motion-pref";
import type { ParticleHandle } from "./particle-scene";

/** Particles spell the current role word; the same word shows as gradient text until WebGL is ready or if it fails. */
export function ParticleWord({ word, words, paused, suspended }: { word: string; words: readonly string[]; paused: boolean; suspended: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<ParticleHandle | null>(null);
  const wordRef = useRef(word);
  const [live, setLive] = useState(false);

  useEffect(() => {
    wordRef.current = word;
    handleRef.current?.setWord(word);
  }, [word]);
  useEffect(() => { handleRef.current?.setPaused(paused); }, [paused, live]);
  useEffect(() => { handleRef.current?.setSuspended(suspended); }, [suspended, live]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const slot = slotRef.current;
    if (!canvas || !slot) return;
    let disposed = false;
    import("./particle-scene").then(({ createParticles }) => {
      if (disposed) return;
      try {
        handleRef.current = createParticles(canvas, {
          slot,
          font: getComputedStyle(slot).fontFamily,
          words,
          word: wordRef.current,
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          paused: getMotionPaused(),
          onReady: () => { if (!disposed) setLive(true); },
        });
      } catch {
        // No WebGL: the gradient text stays.
      }
    }).catch(() => undefined);
    return () => {
      disposed = true;
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, [words]);

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      <div ref={slotRef} className="role-slot" data-live={live} aria-hidden="true" onPointerDown={() => handleRef.current?.scatter(1.2)}>
        <span className="role-text">{word}</span>
      </div>
    </>
  );
}
