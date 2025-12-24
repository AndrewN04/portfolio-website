"use client";

import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero";
import { SkillsSection } from "./components/skills-section";
import { ProjectsGrid } from "./components/projects-grid";
import { ContactSection } from "./components/contact-section";
import { ScrollToTopButton } from "./components/scroll-to-top";

export default function Home() {
  return (
    <div className="bg-[#101322] text-white overflow-x-hidden flex flex-col min-h-screen">
      <Navigation />

      {/* Main Content Wrapper */}
      <main className="flex-grow pt-[72px] relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none z-0"></div>

        {/* Hero Section */}
        <HeroSection />

        {/* Technical Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsGrid />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-[#101322] border-t border-[#282b39] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">Built with Next.js, Tailwind CSS, and Framer Motion.</p>
          <div className="flex items-center gap-6">
            <a
              className="text-slate-500 hover:text-white transition-colors"
              href="https://github.com/AndrewN04"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <span className="sr-only">GitHub</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              className="text-slate-500 hover:text-white transition-colors"
              href="https://www.linkedin.com/in/adn2004/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <span className="sr-only">LinkedIn</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <ScrollToTopButton />
    </div>
  );
}
