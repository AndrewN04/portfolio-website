"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Mail,
  Sparkles,
} from "lucide-react";
import { type IconType } from "react-icons";
import {
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiOpencv,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

const heroRoles = ["Developer", "Designer", "Innovator"] as const;

const LangChainIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9.5 7.5a3 3 0 0 1 4.243 0l2.757 2.757a3 3 0 0 1 0 4.243l-1.061 1.061"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <path
      d="M14.5 16.5a3 3 0 0 1-4.243 0L7.5 13.743a3 3 0 0 1 0-4.243L8.56 8.44"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </svg>
);

type TechKey =
  | "nextjs"
  | "postgres"
  | "prisma"
  | "python"
  | "opencv"
  | "langchain"
  | "mongodb"
  | "tailwind";

const techRegistry: Record<
  TechKey,
  { label: string; icon: IconType; color: string; background: string }
> = {
  nextjs: {
    label: "Next.js",
    icon: SiNextdotjs,
    color: "#F1F5F9",
    background: "rgba(248,250,252,0.08)",
  },
  postgres: {
    label: "PostgreSQL",
    icon: SiPostgresql,
    color: "#48A9DC",
    background: "rgba(14,165,233,0.12)",
  },
  prisma: {
    label: "Prisma",
    icon: SiPrisma,
    color: "#0C344B",
    background: "rgba(148,163,184,0.12)",
  },
  python: {
    label: "Python",
    icon: SiPython,
    color: "#FACC15",
    background: "rgba(250,204,21,0.1)",
  },
  opencv: {
    label: "OpenCV",
    icon: SiOpencv,
    color: "#4ADE80",
    background: "rgba(74,222,128,0.12)",
  },
  langchain: {
    label: "LangChain",
    icon: LangChainIcon,
    color: "#22D3EE",
    background: "rgba(45,212,191,0.12)",
  },
  mongodb: {
    label: "MongoDB",
    icon: SiMongodb,
    color: "#34D399",
    background: "rgba(52,211,153,0.12)",
  },
  tailwind: {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#38BDF8",
    background: "rgba(56,189,248,0.12)",
  },
};

type Project = {
  title: string;
  description: string;
  link: string;
  tech: TechKey[];
};

const projects: Project[] = [
  {
    title: "TMDB Explorer",
    description:
      "Movie discovery experience with curated collections, smart search, and personalized watchlists powered by TMDB.",
    link: "https://github.com/AndrewN04/tmdb-app",
    tech: ["nextjs", "postgres", "prisma"],
  },
  {
    title: "Service AI Agent",
    description:
      "Multi-agent research assistant built for CS4485 that evaluates prompts, plans tasks, and orchestrates LLM responses.",
    link: "https://github.com/AndrewN04/CS4485-AI-Agent",
    tech: ["python", "langchain", "mongodb"],
  },
  {
    title: "Weather Dashboard",
    description:
      "Weather intelligence dashboard with live radar, geolocation alerts, and responsive offline-ready UI.",
    link: "https://github.com/AndrewN04/weather-app",
    tech: ["nextjs", "tailwind"],
  },
  {
    title: "Human Pose Detection",
    description:
      "Real-time skeletal tracking prototype combining WebGL overlays with TensorFlow pose estimation.",
    link: "https://github.com/AndrewN04/human-pos-detection",
    tech: ["python", "opencv"],
  },
];

const toolbelt = [
  "Next.js 16",
  "TypeScript",
  "Node.js",
  "HTML & CSS",
  "PostgreSQL",
  "React",
  "Tailwind CSS",
  "Python",
  "C++",
  "Docker",
];

const focusAreas = [
  {
    title: "Product-minded engineering",
    copy:
      "Pairing strong UX instincts with platform knowledge to ship experiences that feel fast, polished, and purposeful.",
  },
  {
    title: "Performance-first web",
    copy:
      "Designing resilient architectures that lean on streaming, caching, and edge compute when scale matters.",
  },
];

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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const typedRole = useTypewriter(heroRoles);
  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_45%)]" />
      <div className="noise-mask" aria-hidden />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 sm:px-8 lg:px-12"
      >
        <motion.section
          variants={fadeIn}
          className="grid gap-10 rounded-4xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Sparkles className="h-4 w-4 text-teal-300" aria-hidden />
              Software Engineer · Web Developer
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Andrew Nguyen
            </h1>
            <p className="mt-3 text-xl font-medium text-slate-200 md:text-2xl" aria-live="polite">
              <span className="text-slate-400">— </span>
              <span className="text-white/90">{typedRole}</span>
              <span className="caret align-middle" aria-hidden />
            </p>
            <p className="mt-6 text-lg text-slate-300">
                I develop full-stack experiences that balance functionality with great design, and I enjoy solving problems,
                learning new technologies, and building tools that make people’s lives easier.
            </p>
            <div className="mt-8 flex flex-col gap-4">
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

          <div className="fade-border rounded-[28px] bg-slate-900/60 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Focus</p>
            <ul className="mt-5 space-y-4 text-base text-slate-200">
              {focusAreas.map((item) => (
                <li key={item.title} className="border-l border-white/15 pl-4">
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.copy}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
              {toolbelt.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-center"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" variants={fadeIn} className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Selected projects</p>
              <h2 className="text-3xl font-semibold text-white">Built with curiosity.</h2>
            </div>
            <a
              href="https://github.com/AndrewN04"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
            >
              Browse GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="fade-border group relative flex h-full flex-col justify-between rounded-[28px] bg-slate-900/60 p-8 transition hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    <ArrowUpRight className="h-6 w-6 text-slate-400 transition group-hover:text-white" />
                  </div>
                  <p className="mt-4 text-base text-slate-300">{project.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.tech.map((techKey) => {
                    const tech = techRegistry[techKey];
                    if (!tech) return null;
                    const Icon = tech.icon;
                    return (
                      <span
                        key={`${project.title}-${techKey}`}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10"
                        style={{ backgroundColor: tech.background }}
                        title={tech.label}
                      >
                        <Icon className="h-5 w-5" style={{ color: tech.color }} aria-hidden />
                        <span className="sr-only">{tech.label}</span>
                      </span>
                    );
                  })}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-white"
                >
                  Open repository
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeIn}>
          <div className="fade-border grid gap-10 rounded-4xl bg-linear-to-br from-slate-900/80 via-slate-900/40 to-slate-800/60 p-8 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Availability</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">Contact me through my form or by email.</h3>
                <p className="mt-3 text-slate-300">
                  Remote-friendly from the US. I&apos;d love to hear from you. Share a few details and I&apos;ll follow up within one business day.
                </p>
              </div>
              <a
                href="mailto:anbusiness04@gmail.com"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-100"
              >
                <Mail className="h-5 w-5" />
                Email Andrew
              </a>
            </div>

            <form className="rounded-[28px] border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-200">
              <p className="text-base font-medium text-white">Contact Form</p>
              <p className="mt-1 text-xs text-slate-400">
                Temporary form — let me know the best way to reach you and I&apos;ll reply manually.
              </p>
              <div className="mt-5 grid gap-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="email@address.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">
                    Message details
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Type here..."
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-white/40"
                  />
                </div>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-3 font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
                >
                  Send message (coming soon)
                </button>
              </div>
            </form>
          </div>
        </motion.section>

        <motion.footer variants={fadeIn} className="rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-4 text-center text-sm text-slate-400">
          Built with Next.js 16, Tailwind CSS, and Framer Motion.
        </motion.footer>
      </motion.div>
    </div>
  );
}
