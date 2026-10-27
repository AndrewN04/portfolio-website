import Image from "next/image";
import { skillCategories, skillsRegistry } from "../lib/skills";

export function SkillsSection() {
  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-heading" className="section-shell" style={{ "--layer": "var(--z1)" } as React.CSSProperties}>
      <div className="settle mx-auto max-w-7xl px-4 sm:px-6">
        <div className="section-head">
          <h2 id="skills-heading" className="section-title"><span className="mask"><span>Skills</span></span></h2>
          <span className="layer-tag" aria-hidden="true">&lt;Skills /&gt;</span>
        </div>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">My current toolkit, alongside technologies I&apos;m exploring for upcoming web, AI, and IT projects.</p>

        <div className="divide-y divide-[var(--edge)] border-y border-[var(--edge)]">
          {skillCategories.map((category, index) => (
            <section key={category.name} className="skill-row grid gap-4 px-1 py-5 md:grid-cols-[minmax(12rem,0.75fr)_2fr] md:gap-8 md:px-3 md:py-6" aria-labelledby={`skill-category-${index}`}>
              <div>
                <h3 id={`skill-category-${index}`} className="text-lg font-bold">{category.name}</h3>
                <p className="mono mt-1 break-all text-xs text-[var(--text-dim)]">{category.command}</p>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-3">
                {category.skills.map((key) => {
                  const skill = skillsRegistry[key];
                  return (
                    <li key={key} className="skill-chip inline-flex min-h-9 items-center gap-2 text-sm text-[var(--text-muted)]">
                      <Image src={skill.svg} alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
                      <span>{skill.label}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
