"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Mail,
  Sparkles,
} from "lucide-react";

const projects = [
  {
    title: "TMDB Explorer",
    description:
      "Movie discovery experience with curated collections, smart search, and personalized watchlists powered by TMDB.",
    link: "https://github.com/AndrewN04/tmdb-app",
    stats: ["Next.js", "TMDB API", "Edge Rendering"],
  },
  {
    title: "Service AI Agent",
    description:
      "Multi-agent research assistant built for CS4485 that evaluates prompts, plans tasks, and orchestrates LLM responses.",
    link: "https://github.com/AndrewN04/CS4485-AI-Agent",
    stats: ["Python", "LangChain", "Vector Search"],
  },
  {
    title: "Weather Dashboard",
    description:
      "Weather intelligence dashboard with live radar, geolocation alerts, and responsive offline-ready UI.",
    link: "https://github.com/AndrewN04/weather-app",
    stats: ["Progressive Web App", "Service Workers", "Mapbox"],
  },
  {
    title: "Human Pose Detection",
    description:
      "Real-time skeletal tracking prototype combining WebGL overlays with TensorFlow pose estimation.",
    link: "https://github.com/AndrewN04/human-pos-detection",
    stats: ["TensorFlow.js", "WebGL", "Computer Vision"],
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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_45%)]" />
      <div className="noise-mask" aria-hidden />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 sm:px-8 lg:px-12"
      >
        <motion.section
          variants={fadeIn}
          className="grid gap-10 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Sparkles className="h-4 w-4 text-teal-300" aria-hidden />
              Software Engineer · Web Developer
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Andrew Nguyen
            </h1>
            <p className="mt-6 text-lg text-slate-300">
                I develop full-stack experiences that balance functionality with great design, and I enjoy solving problems,
                learning new technologies, and building tools that make people’s lives easier.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-slate-900 transition hover:bg-white"
              >
                Peek at my projects
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
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
              <h2 className="text-3xl font-semibold text-white">Shipped with curiosity and polish.</h2>
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
                <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300">
                  {project.stats.map((stat) => (
                    <span key={stat} className="rounded-full border border-white/10 px-3 py-1">
                      {stat}
                    </span>
                  ))}
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

        <motion.section variants={fadeIn} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="fade-border rounded-[28px] bg-slate-900/60 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Ways I work</p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-lg font-medium text-white">Discovery → Delivery</p>
                <p className="mt-1 text-slate-300">
                  I partner closely with design and product to shape roadmaps, spike risky bets, and reduce scope without
                  losing the narrative.
                </p>
              </div>
              <div>
                <p className="text-lg font-medium text-white">Systems thinking</p>
                <p className="mt-1 text-slate-300">
                  Modular component systems, shared data contracts, and strong lint/test pipelines keep features stable as
                  they scale.
                </p>
              </div>
              <div>
                <p className="text-lg font-medium text-white">Mentorship & collaboration</p>
                <p className="mt-1 text-slate-300">
                  I enjoy pair programming, documenting decisions, and elevating the craft of the teams I join.
                </p>
              </div>
            </div>
          </div>

          <div className="fade-border flex flex-col justify-between rounded-[28px] bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-800/60 p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Availability</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Got a question? Send me a message.</h3>
              <p className="mt-3 text-slate-300">
                Remote-friendly, US time zones. I&apos;ll get back to you as soon as possible.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="mailto:hello@andrewnguyen.dev"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-100"
              >
                <Mail className="h-5 w-5" />
                Email Andrew
              </a>
              <a
                href="https://github.com/AndrewN04"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-white transition hover:border-white/40"
              >
                <Github className="h-5 w-5" />
                GitHub profile
              </a>
            </div>
          </div>
        </motion.section>

        <motion.footer variants={fadeIn} className="rounded-[24px] border border-white/10 bg-slate-900/60 px-6 py-4 text-center text-sm text-slate-400">
          Built with Next.js 16, Tailwind CSS, and Framer Motion.
        </motion.footer>
      </motion.div>
    </div>
  );
}
