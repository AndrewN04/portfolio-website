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
      <CustomCursor />
      <div className="relative z-10 mb-[320px] flex min-h-screen flex-col bg-[var(--canvas)] text-[var(--text)] sm:mb-[360px]">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navigation />
        <main id="main-content" className="grow" tabIndex={-1}>
          <HeroSection />
          <SkillsSection />
          <ProjectsGrid />
          <ContactSection />
        </main>
        <div className="h-6 bg-[var(--canvas)]" aria-hidden="true" />
      </div>
      <RevealFooter />
      <ScrollToTopButton />
    </>
  );
}
