"use client";

import { motion } from "framer-motion";
import { HeroSection } from "./components/hero";
import { FocusPanel } from "./components/focus-panel";
import { ProjectsGrid } from "./components/projects-grid";
import { ContactSection } from "./components/contact-section";
import { ScrollToTopButton } from "./components/scroll-to-top";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
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
          className="grid gap-10 rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          <HeroSection />
          <FocusPanel />
        </motion.section>

        <motion.div variants={fadeIn}>
          <ProjectsGrid />
        </motion.div>

        <motion.div variants={fadeIn}>
          <ContactSection />
        </motion.div>

        <motion.footer variants={fadeIn} className="rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-4 text-center text-sm text-slate-400">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </motion.footer>
      </motion.div>
      <ScrollToTopButton />
    </div>
  );
}
