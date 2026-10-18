"use client";

import { useEffect, useState } from "react";
import { ArrowRight, GitBranch, Mail, X } from "lucide-react";

const heroRoles = ["Developer", "Designer", "Innovator"] as const;

const useTypewriter = (
  words: readonly string[],
  typingSpeed = 120,
  pauseDuration = 1500
) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(words[0].length);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const currentWord = words[index];
    const isCompleted =
      direction === "forward" && subIndex === currentWord.length;
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

    timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (direction === "forward" ? 1 : -1));
      },
      direction === "forward" ? typingSpeed : typingSpeed / 2
    );

    return () => clearTimeout(timeout);
  }, [words, index, subIndex, direction, typingSpeed, pauseDuration]);

  const currentWord = words[index];
  const isTyping = direction === "forward" && subIndex < currentWord.length;

  return { text: words[index].slice(0, subIndex), isTyping };
};

export function HeroSection() {
  const { text: typedRole, isTyping } = useTypewriter(heroRoles);
  return (
    <section
      className="relative z-10 min-h-[calc(100svh-76px)] lg:min-h-[calc(100vh-80px)] flex items-center pt-8 lg:pt-20"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-8 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left Column: Personal Pitch */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 aria-label="Andrew Nguyen — Full Stack Developer" className="text-[clamp(2.25rem,11vw,3rem)] lg:text-7xl font-bold tracking-tight leading-[1.1] relative">
                <span aria-hidden="true" className="inline-block min-w-[9ch] relative">
                  <span className="hero-gradient">{typedRole}</span>
                  <span aria-hidden="true" className={`typing-cursor ${isTyping ? "typing" : ""}`} />

                </span>
              </h1>
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed pt-4">
                Hello, I&apos;m{" "}
                <span className="text-white font-medium">Andrew Nguyen</span>, a
                Full Stack Developer based in Texas. Working on projects when I
                can.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="#projects"
                className="bg-white text-black hover:bg-gray-200 h-12 px-3 sm:px-8 text-sm sm:text-base justify-center rounded-lg font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-white/20 hover:shadow-white/30 flex items-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </a>
              <a
                href="#contact"
                className="bg-black border border-white/20 hover:border-white/40 text-white h-12 px-3 sm:px-8 text-sm sm:text-base justify-center rounded-lg font-bold transition-all flex items-center gap-2 relative group hover:bg-gray-900 backdrop-blur-sm"
              >
                <span className="relative z-10">Contact Me</span>
                <Mail className="h-5 w-5 relative z-10 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Right Column: Code Editor Aesthetic */}
          <div className="w-full min-w-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black border border-white/20 transform lg:hover:scale-105 transition-transform duration-500">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 select-none">
                  developer_profile.tsx
                </div>
                <div className="w-10"></div>
              </div>

              {/* Editor Body */}
              <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-base overflow-x-auto custom-scrollbar">
                <div className="flex">
                  <div
                    className="hidden sm:flex flex-col text-right pr-4 text-slate-600 select-none border-r border-slate-700/50 mr-4"
                    aria-hidden="true"
                  >
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
                    <span className="code-syntax-func">Developer</span> = ()
                    =&gt; {"{"}
                    {"\n  "}
                    <span className="code-syntax-keyword">const</span>{" "}
                    <span className="code-syntax-prop">profile</span> = {"{"}
                    {"\n    "}
                    <span className="code-syntax-prop">name</span>:{" "}
                    <span className="code-syntax-string">
                      &quot;Andrew Nguyen&quot;
                    </span>
                    ,{"\n    "}
                    <span className="code-syntax-prop">role</span>:{" "}
                    <span className="code-syntax-string">&quot;</span>
                    <span className="hero-gradient">{typedRole}</span>
                  <span aria-hidden="true" className={`typing-cursor ${isTyping ? "typing" : ""}`} />

                    <span className="code-syntax-string">&quot;</span>,
                    {"\n    "}
                    <span className="code-syntax-prop">caffeine</span>:{" "}
                    <span className="code-syntax-string">&quot;High&quot;</span>
                    ,{"\n  "}
                    {"}"};{"\n\n  "}
                    <span className="code-syntax-keyword">return</span> (
                    {"\n    "}
                    <span className="code-syntax-var">&lt;Portfolio&gt;</span>
                    {"\n      "}
                    <span className="code-syntax-var">&lt;Skills </span>
                    <span className="code-syntax-prop">stack</span>=
                    <span className="code-syntax-string">
                      {"{"}fullStack{"}"}
                    </span>
                    <span className="code-syntax-var"> /&gt;</span>
                    {"\n      "}
                    <span className="code-syntax-var">&lt;Projects </span>
                    <span className="code-syntax-prop">passion</span>=
                    <span className="code-syntax-string">
                      {"{"}true{"}"}
                    </span>
                    <span className="code-syntax-var"> /&gt;</span>
                    {"\n      "}
                    <span className="code-syntax-var">&lt;Contact </span>
                    <span className="code-syntax-prop">status</span>=
                    <span className="code-syntax-string">
                      {"{"}&quot;Open for opportunities&quot;{"}"}
                    </span>
                    <span className="code-syntax-var"> /&gt;</span>
                    {"\n    "}
                    <span className="code-syntax-var">&lt;/Portfolio&gt;</span>
                    {"\n  "}
                    );
                    {"\n"}
                    {"}"};<span className="typing-cursor"></span>
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="px-4 py-1.5 bg-black border-t border-white/10 text-white text-[10px] font-mono flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <GitBranch aria-hidden="true" className="h-3 w-3" />{" "}
                    main
                  </span>
                  <span className="flex items-center gap-1">
                    <X aria-hidden="true" className="h-3 w-3" />{" "}
                    0 errors
                  </span>
                </div>
                <div>TypeScript React</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
