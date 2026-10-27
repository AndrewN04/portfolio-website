import Image from "next/image";
import { skillCategories, skillsRegistry } from "../lib/skills";

export function SkillsSection() {
  return (
    <section aria-labelledby="vm-heading-skills">
      <h2 id="vm-heading-skills" tabIndex={-1} className="vm-heading">Skills</h2>
      <p className="vm-lede">My current toolkit, alongside technologies I&apos;m exploring for upcoming web, AI, and IT projects.</p>

      <div className="hw-table">
        {skillCategories.map((category, index) => (
          <section key={category.name} className="hw-row" aria-labelledby={`skill-category-${index}`}>
            <div className="hw-key">
              <h3 id={`skill-category-${index}`}>{category.name}</h3>
              <p className="mono">{category.skills.length} tools</p>
            </div>
            <ul className="chips">
              {category.skills.map((key) => {
                const skill = skillsRegistry[key];
                return (
                  <li key={key} className="chip">
                    <Image src={skill.svg} alt="" width={18} height={18} />
                    <span>{skill.label}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
