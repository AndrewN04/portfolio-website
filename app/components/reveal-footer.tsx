"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getIsTouchDevice } from "../lib/utils";

// Subscribe to touch device state (static - doesn't change)
const subscribe = () => () => {};
const getSnapshot = () => getIsTouchDevice();
const getServerSnapshot = () => true; // Assume touch on server to skip rendering

export function RevealFooter() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const blackTextRef = useRef<HTMLDivElement>(null);
  // useSyncExternalStore properly handles SSR hydration mismatch
  const isTouchDevice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (isTouchDevice) return;

    const controller = new AbortController();
    let animationFrameId: number;

    const updateClipPath = (e: MouseEvent) => {
      if (textContainerRef.current && blackTextRef.current) {
        // Get position relative to the text container, not the footer
        const rect = textContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Cancel previous frame and schedule new one for smooth 60fps updates
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          blackTextRef.current?.style.setProperty("clip-path", `circle(40px at ${x}px ${y}px)`);
        });
      }
    };

    window.addEventListener("mousemove", updateClipPath, { 
      passive: true, 
      signal: controller.signal 
    });
    
    return () => {
      controller.abort();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[400px] bg-surface-dark flex flex-col justify-center items-center -z-10 overflow-hidden">
      {/* Text Container - Relative positioning for layers */}
      <div ref={textContainerRef} className="relative">
        {/* Base Text Layer - Semi-transparent muted */}
        <div
          id="footer-brand-text"
          className="text-[15vw] md:text-[12vw] font-bold text-[#3D4559]/50 select-none tracking-tight leading-none cursor-default footer-brand-text"
        >
          a04.dev
        </div>

        {/* Reveal Text Layer - Clipped by cursor circle (white for dark bg) */}
        {!isTouchDevice && (
          <div
            ref={blackTextRef}
            className="absolute inset-0 text-[15vw] md:text-[12vw] font-bold text-white select-none tracking-tight leading-none cursor-default transition-[clip-path] duration-75 ease-out footer-brand-text clip-circle-hidden"
          >
            a04.dev
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-sm">
          {/* Left: Copyright */}
          <p className="text-[#8891A5]/70 text-center md:text-left">
            © {new Date().getFullYear()} Andrew Nguyen
          </p>

          {/* Center: Tech Stack */}
          <p className="text-[#8891A5]/70 text-center">
            Built with{" "}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C5CBD8] transition-colors">Next.js</a>,{" "}
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C5CBD8] transition-colors">React</a>,{" "}
            <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C5CBD8] transition-colors">TypeScript</a>,{" "}
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C5CBD8] transition-colors">Tailwind</a>, and{" "}
            <a href="https://motion.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C5CBD8] transition-colors">Motion.dev</a>.
          </p>

          {/* Right: Socials */}
          <div className="flex items-center gap-6 justify-center md:justify-end">
            <a
              className="text-[#8891A5]/70 hover:text-[#C5CBD8] transition-colors"
              href="https://github.com/AndrewN04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile (opens in new tab)"
            >
              <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fillRule="evenodd"
                />
              </svg>
            </a>
            <a
              className="text-[#8891A5]/70 hover:text-[#C5CBD8] transition-colors"
              href="https://www.linkedin.com/in/adn2004/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile (opens in new tab)"
            >
              <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
