import Image from "next/image";
import { skillCategories, skillsRegistry } from "../lib/skills";

export function SkillsSection() {
  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-heading" className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="section-heading">
          <span className="section-index">01</span>
          <div>
            <h2 id="skills-heading" className="section-title">Skills</h2>
            <p className="section-command"><span className="syntax-green">$</span> ls skills/</p>
          </div>
        </div>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">My current toolkit, alongside technologies I&apos;m exploring for upcoming web, AI, and IT projects.</p>

        <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {skillCategories.map((category, index) => (
            <section key={category.name} className="grid gap-4 py-5 md:grid-cols-[minmax(11rem,0.75fr)_2fr] md:gap-8 md:py-6" aria-labelledby={`skill-category-${index}`}>
              <div>
                <h3 id={`skill-category-${index}`} className="font-semibold text-[var(--text)]">{category.name}</h3>
                <p className="mt-1 break-all font-mono text-xs text-[var(--text-muted)]"><span className="syntax-green">$</span> {category.command}</p>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-3">
                {category.skills.map((key) => {
                  const skill = skillsRegistry[key];
                  return (
                    <li key={key} className="inline-flex min-h-9 items-center gap-2 text-sm text-[var(--text-muted)]">
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
