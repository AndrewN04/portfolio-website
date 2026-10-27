import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero";
import { SkillsSection } from "./components/skills-section";
import { ProjectsGrid } from "./components/projects-grid";
import { ContactSection } from "./components/contact-section";
import { ScrollToTopButton } from "./components/scroll-to-top";
import { RevealFooter } from "./components/reveal-footer";
import { CustomCursor } from "./components/custom-cursor";
import { SmoothScroll } from "./components/smooth-scroll";
import { skillsRegistry } from "./lib/skills";

const marqueeLabels = Object.values(skillsRegistry).map((skill) => skill.label);

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <div className="relative z-10 mb-[320px] flex min-h-screen flex-col bg-[var(--canvas)] text-[var(--text)] sm:mb-[360px]">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navigation />
        <main id="main-content" className="grow" tabIndex={-1}>
          <HeroSection />
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[...marqueeLabels, ...marqueeLabels].map((label, index) => <span key={index}>{label}</span>)}
            </div>
          </div>
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
