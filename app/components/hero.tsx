"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";

const heroRoles = ["Developer", "Designer", "Innovator"] as const;

const useTypewriter = (
  words: readonly string[],
  typingSpeed = 120,
  pauseDuration = 1500,
) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const currentWord = words[index];
    const isCompleted = direction === "forward" && subIndex === currentWord.length;
    const isEmpty = direction === "backward" && subIndex === 0;

    let timeout: ReturnType<typeof setTimeout>;

    if (isCompleted) {
      timeout = setTimeout(() => setDirection("backward"), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isEmpty) {
      timeout = setTimeout(() => {
        setDirection("forward");
        setIndex((prev) => (prev + 1) % words.length);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (direction === "forward" ? 1 : -1));
    }, direction === "forward" ? typingSpeed : typingSpeed / 2);

    return () => clearTimeout(timeout);
  }, [words, index, subIndex, direction, typingSpeed, pauseDuration]);

  return words[index].slice(0, subIndex);
};

export function HeroSection() {
  const typedRole = useTypewriter(heroRoles);

  return (
    <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
        <Sparkles className="h-4 w-4 text-teal-300" aria-hidden />
        Software Engineer · Web Developer
      </div>
      <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">Andrew Nguyen</h1>
      <p className="mt-3 text-xl font-medium text-slate-200 md:text-2xl" aria-live="polite">
        <span className="text-slate-400">— </span>
        <span className="text-white/90">{typedRole}</span>
        <span className="caret align-middle" aria-hidden />
      </p>
      <p className="mt-6 text-lg text-slate-300">
        I develop full-stack experiences that balance functionality with great design. I enjoy solving problems,
        learning new technologies, and building tools that makes things easier for everyone.
      </p>
      <div className="mt-8 flex flex-col gap-8">
        <Link
          href="#projects"
          className="group inline-flex w-fit items-center gap-2 self-start rounded-full bg-slate-100 px-6 py-3 text-slate-900 transition hover:bg-white"
        >
          Peek at my projects
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hello@andrewnguyen.dev"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-white/40"
          >
            <Mail className="h-5 w-5" />
            Contact me
          </a>
          <a
            href="https://github.com/AndrewN04"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-white/40"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
