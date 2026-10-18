import Image from "next/image";
import { Terminal } from "lucide-react";
import { skillCategories, skillsRegistry } from "../lib/skills";

export function SkillsSection() {
  return (
    <section className="py-12 sm:py-20" id="skills" tabIndex={-1} aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h2 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5c07b]">&lt;Skills /&gt;</h2>
          <p className="text-slate-400 mt-4 font-mono text-sm"><span className="text-[#98c379]">$</span> ls skills/</p>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">My current toolkit, alongside technologies I&apos;m exploring for upcoming web, AI, and IT projects.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {skillCategories.map((category, index) => (
            <article key={category.name} className="border border-white/15 p-4 sm:p-5 md:p-6" aria-labelledby={`skill-category-${index}`}>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 id={`skill-category-${index}`} className="text-lg font-semibold">{category.name}</h3>
                <Terminal size={16} className="text-slate-400" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-400 font-mono mb-5"><span className="text-[#98c379]">$</span> {category.command}</p>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((key) => {
                  const skill = skillsRegistry[key];
                  return (
                    <li key={key} className="inline-flex items-center gap-2 px-2.5 py-2.5 sm:py-2 border border-white/10 text-xs text-slate-300">
                      <Image src={skill.svg} alt="" width={20} height={20} className="h-5 w-5 shrink-0" />
                      <span>{skill.label}</span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
