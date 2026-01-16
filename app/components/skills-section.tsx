"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { skillsRegistry } from "../lib/skills";

const skillCategories = [
  {
    id: 1,
    name: "Frontend",
    command: "./list_frontend.sh",
    icon: "terminal",
    skills: [
      "html",
      "css",
      "javascript",
      "typescript",
      "react",
      "nextjs",
      "tailwind",
    ],
  },
  {
    id: 2,
    name: "Backend",
    command: "python3 inspect_backend.py",
    icon: "dns",
    skills: [
      "nodejs",
      "python",
      "cplusplus",
      "postgres",
      "mongodb",
      "supabase",
      "convex",
      "firebase",
    ],
  },
  {
    id: 3,
    name: "DevOps",
    command: "docker ps",
    icon: "cloud",
    skills: ["docker", "linux", "git", "github", "aws"],
  },
  {
    id: 4,
    name: "Tools",
    command: "ls tools/",
    icon: "design_services",
    skills: ["prisma", "figma", "postman", "langchain", "vite", "playwright"],
  },
];

function SkillIconWithTooltip({
  skill,
}: {
  skill: { label: string; svg: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded border border-white/20 hover:border-white/40 transition-all hover:scale-110">
        <Image
          src={skill.svg}
          alt={skill.label}
          width={24}
          height={24}
          className="h-6 w-6"
          aria-hidden="true"
        />
        <span className="sr-only">{skill.label}</span>
      </div>

      {/* Custom Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          >
            <div className="relative bg-black border border-white/30 rounded-md px-3 py-1.5 shadow-lg shadow-black/50">
              <span className="text-[#61afef] text-xs font-mono font-medium whitespace-nowrap">
                {skill.label}
              </span>
              {/* Tooltip arrow pointing down */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                <div className="w-2 h-2 bg-black border-r border-b border-white/30 rotate-45"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              <span className="text-[#e5c07b]">&lt;</span>
              <span className="text-[#e5c07b] relative">
                Skills
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e5c07b] opacity-50"></span>
              </span>
              <span className="text-[#e5c07b]">/&gt;</span>
            </h2>
            <p className="text-slate-400 mt-4 font-mono text-sm">
              <span className="text-[#98c379]">$</span>{" "}
              <span className="text-white">ls</span>{" "}
              <span className="text-white">skills/</span>
            </p>
          </div>
        </div>

        {/* Stacked Box Grid */}
        <div className="space-y-2">
          {skillCategories.map((category) => (
            <motion.article
              key={category.id}
              className="group relative border border-white/20 bg-black hover:bg-white/5 hover:border-white/30 transition-all"
            >
              <div className="px-6 py-4 md:py-5">
                <div className="flex items-start gap-4">
                  {/* Main content area */}
                  <div className="flex-1 min-w-0">
                    {/* Terminal Header - spans full width above both */}
                    <div className="text-xs text-slate-500 mb-2 pb-1.5 border-b border-slate-800/50 flex justify-between items-center gap-2 min-w-0 font-mono">
                      <span className="truncate min-w-0">
                        <span className="text-[#61afef]">system@portfolio</span>
                        <span className="text-slate-400">:</span>
                        <span className="text-[#98c379]">~/skills</span>
                      </span>
                      <span
                        className="material-symbols-outlined text-xs shrink-0 text-slate-400"
                        aria-hidden="true"
                      >
                        {category.icon}
                      </span>
                    </div>

                    {/* Command and Icons - responsive layout */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                      {/* Command */}
                      <div className="shrink-0 font-mono">
                        <span className="text-[#98c379] text-sm">➜</span>{" "}
                        <span className="text-slate-300 text-sm">
                          {category.command}
                        </span>
                      </div>

                      {/* Vertical divider (wall) - hidden on mobile */}
                      <div className="hidden md:block h-12 w-px bg-white/20 shrink-0"></div>

                      {/* Skills Icons - horizontal flex */}
                      <div className="flex items-center gap-4 flex-wrap flex-1">
                        {category.skills.map((skillKey) => {
                          const skill =
                            skillsRegistry[
                              skillKey as keyof typeof skillsRegistry
                            ];
                          if (!skill) return null;
                          return (
                            <SkillIconWithTooltip
                              key={skillKey}
                              skill={skill}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
