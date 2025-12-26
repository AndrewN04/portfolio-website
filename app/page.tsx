import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero";
import { SkillsSection } from "./components/skills-section";
import { ProjectsGrid } from "./components/projects-grid";
import { ContactSection } from "./components/contact-section";
import { ScrollToTopButton } from "./components/scroll-to-top";
import { RevealFooter } from "./components/reveal-footer";
import { CustomCursor } from "./components/custom-cursor";

export default function Home() {
  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Reveal Footer - Fixed behind content */}
      <RevealFooter />

      {/* Main Page Content */}
      <div className="relative z-10 bg-background-dark text-white overflow-x-hidden flex flex-col min-h-screen mb-[400px]">
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
        >
          Skip to main content
        </a>
        <Navigation />

        {/* Main Content Wrapper */}
        <main id="main-content" className="grow pt-[72px] relative" tabIndex={-1}>
          {/* Background Grid - Decorative */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none z-0" aria-hidden="true" />

          {/* Hero Section */}
          <HeroSection />

          {/* Technical Skills Section */}
          <SkillsSection />

          {/* Projects Section */}
          <ProjectsGrid />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Bottom edge with shadow for depth effect */}
        <div className="h-8 bg-linear-to-b from-background-dark to-[#0a0c15] shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
      </div>

      <ScrollToTopButton />
    </>
  );
}
