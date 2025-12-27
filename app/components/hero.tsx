"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { scrollToSection } from "../lib/utils";

const heroRoles = ["Developer", "Designer", "Innovator"] as const;

const useTypewriter = (
  words: readonly string[],
  typingSpeed = 120,
  pauseDuration = 1500,
) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const currentWord = words[index];
    const isCompleted = direction === "forward" && subIndex === currentWord.length;
    const isEmpty = direction === "backward" && subIndex === 0;

    let timeout: ReturnType<typeof setTimeout>;

    if (isCompleted) {
      timeout = setTimeout(() => setDirection("backward"), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isEmpty) {
      timeout = setTimeout(() => {
        setDirection("forward");
        setIndex((prev) => (prev + 1) % words.length);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (direction === "forward" ? 1 : -1));
    }, direction === "forward" ? typingSpeed : typingSpeed / 2);

    return () => clearTimeout(timeout);
  }, [words, index, subIndex, direction, typingSpeed, pauseDuration]);

  return words[index].slice(0, subIndex);
};

export function HeroSection() {
  const typedRole = useTypewriter(heroRoles);

  return (
    <section className="relative z-10 min-h-[calc(100vh-72px)] flex items-center" id="about">
      <div className="max-w-7xl mx-auto px-6 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Personal Pitch */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                {/* min-w prevents CLS by reserving space for longest word "Innovator" */}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400 inline-block min-w-[5ch]">
                  {typedRole}
                  <span className="typing-cursor"></span>
                </span>
              </h1>
              <p className="text-slate-400 text-lg lg:text-xl max-w-xl leading-relaxed pt-4">
                Hello, I&apos;m <span className="text-white font-medium">Andrew Nguyen</span>—a Full Stack Developer based in Texas. Working on projects when I can.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-primary hover:bg-primary-hover text-white h-12 px-8 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>View Projects</span>
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-surface-dark border border-slate-700 hover:border-slate-500 text-white h-12 px-8 rounded-lg font-bold transition-all flex items-center gap-2"
              >
                <span>Contact Me</span>
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Code Editor Aesthetic */}
          <div className="w-full">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-code-bg border border-[#282b39] transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#15151e] border-b border-[#282b39]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 select-none">developer_profile.tsx</div>
                <div className="w-10"></div>
              </div>

              {/* Editor Body */}
              <div className="p-6 font-mono text-sm sm:text-base overflow-x-auto custom-scrollbar">
                <div className="flex">
                  <div className="flex flex-col text-right pr-4 text-slate-600 select-none border-r border-slate-700/50 mr-4" aria-hidden="true">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span>15</span>
                    <span>16</span>
                  </div>
                  <div className="text-slate-300 whitespace-pre">
                    <span className="code-syntax-keyword">const</span>{" "}
                    <span className="code-syntax-func">Developer</span> = () =&gt; {"{"}
                    {"\n  "}
                    <span className="code-syntax-keyword">const</span>{" "}
                    <span className="code-syntax-prop">profile</span> = {"{"}
                    {"\n    "}
                    <span className="code-syntax-prop">name</span>:{" "}
                    <span className="code-syntax-string">&quot;Andrew Nguyen&quot;</span>,
                    {"\n    "}
                    <span className="code-syntax-prop">role</span>:{" "}
                    <span className="code-syntax-string">&quot;</span>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#61afef] to-[#c678dd]">
                      {typedRole}
                    </span>
                    <span className="typing-cursor"></span>
                    <span className="code-syntax-string">&quot;</span>,
                    {"\n    "}
                    <span className="code-syntax-prop">caffeine</span>:{" "}
                    <span className="code-syntax-string">&quot;High&quot;</span>,
                    {"\n  "}
                    {"}"};
                    {"\n\n  "}
                    <span className="code-syntax-keyword">return</span> (
                    {"\n    "}
                    <span className="code-syntax-var">&lt;Portfolio&gt;</span>
                    {"\n      "}
                    <span className="code-syntax-var">&lt;Skills </span>
                    <span className="code-syntax-prop">stack</span>=
                    <span className="code-syntax-string">{"{"}fullStack{"}"}</span>
                    <span className="code-syntax-var"> /&gt;</span>
                    {"\n      "}
                    <span className="code-syntax-var">&lt;Projects </span>
                    <span className="code-syntax-prop">passion</span>=
                    <span className="code-syntax-string">{"{"}true{"}"}</span>
                    <span className="code-syntax-var"> /&gt;</span>
                    {"\n    "}
                    <span className="code-syntax-var">&lt;/Portfolio&gt;</span>
                    {"\n  "}
                    );
                    {"\n"}
                    {"}"};
                    <span className="typing-cursor"></span>
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="px-4 py-1.5 bg-primary text-white text-[10px] font-mono flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]" aria-hidden="true">account_tree</span> main
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]" aria-hidden="true">close</span> 0 errors
                  </span>
                </div>
                <div>TypeScript React</div>
              </div>
            </div>

            {/* Decorative blur orbs */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
