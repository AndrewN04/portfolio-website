"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1337ec] to-purple-400">
                  {typedRole}
                </span>
                <span className="typing-cursor"></span>
              </h1>
              <p className="text-slate-400 text-lg lg:text-xl max-w-xl leading-relaxed pt-4">
                Hello, I&apos;m <span className="text-white font-medium">Andrew Nguyen</span>. A Full Stack Developer
                crafting clean, efficient code to solve complex problems and deliver beautiful user interfaces.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#projects"
                className="bg-[#1337ec] hover:bg-[#0f2cb8] text-white h-12 px-8 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#1337ec]/25 flex items-center gap-2"
              >
                <span>View Projects</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                href="#contact"
                className="bg-[#1a1d2d] border border-slate-700 hover:border-slate-500 text-white h-12 px-8 rounded-lg font-bold transition-all flex items-center gap-2"
              >
                <span>Contact Me</span>
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Code Editor Aesthetic */}
          <div className="w-full">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#1e1e2e] border border-[#282b39] transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#15151e] border-b border-[#282b39]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 select-none">developer_profile.ts</div>
                <div className="w-10"></div>
              </div>

              {/* Editor Body */}
              <div className="p-6 font-mono text-sm sm:text-base overflow-x-auto custom-scrollbar">
                <div className="flex">
                  <div className="flex flex-col text-right pr-4 text-slate-600 select-none border-r border-slate-700/50 mr-4">
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
                    <span>17</span>
                    <span>18</span>
                    <span>19</span>
                  </div>
                  <div className="text-slate-300 whitespace-pre">
                    <span className="code-syntax-comment">// Welcome to my creative space!</span>
                    {"\n"}
                    <span className="code-syntax-keyword">import</span>{" "}
                    {"{"} <span className="code-syntax-var">Engineer</span>,{" "}
                    <span className="code-syntax-var">Creator</span> {"}"}{" "}
                    <span className="code-syntax-keyword">from</span>{" "}
                    <span className="code-syntax-string">&apos;./universe&apos;</span>;
                    {"\n"}
                    <span className="code-syntax-keyword">class</span>{" "}
                    <span className="code-syntax-var">Portfolio</span>{" "}
                    <span className="code-syntax-keyword">extends</span>{" "}
                    <span className="code-syntax-var">Engineer</span> {"{"}
                    {"\n  "}
                    <span className="code-syntax-keyword">constructor</span>() {"{"}
                    {"\n    "}
                    <span className="code-syntax-keyword">super</span>();
                    {"\n    "}
                    <span className="code-syntax-keyword">this</span>.
                    <span className="code-syntax-prop">name</span> ={" "}
                    <span className="code-syntax-string">&quot;Andrew Nguyen&quot;</span>;
                    {"\n    "}
                    <span className="code-syntax-keyword">this</span>.
                    <span className="code-syntax-prop">traits</span> = [
                    <span className="code-syntax-string">&quot;</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61afef] to-[#c678dd]">
                      {typedRole}
                    </span>
                    <span className="typing-cursor"></span>
                    <span className="code-syntax-string">&quot;</span>];
                    {"\n    "}
                    <span className="code-syntax-keyword">this</span>.
                    <span className="code-syntax-prop">coffeeLevel</span> ={" "}
                    <span className="code-syntax-string">&quot;High&quot;</span>;
                    {"\n  "}
                    {"}"}
                    {"\n  "}
                    <span className="code-syntax-keyword">async</span>{" "}
                    <span className="code-syntax-func">createMagic</span>() {"{"}
                    {"\n    "}
                    <span className="code-syntax-keyword">while</span> (
                    <span className="code-syntax-keyword">true</span>) {"{"}
                    {"\n      "}
                    <span className="code-syntax-keyword">await</span>{" "}
                    <span className="code-syntax-keyword">this</span>.
                    <span className="code-syntax-func">writeCode</span>();
                    {"\n      "}
                    <span className="code-syntax-keyword">await</span>{" "}
                    <span className="code-syntax-keyword">this</span>.
                    <span className="code-syntax-func">debug</span>();
                    {"\n      "}
                    <span className="code-syntax-comment">// The cycle of innovation</span>
                    {"\n    "}
                    {"}"}
                    {"\n  "}
                    {"}"}
                    {"\n"}
                    {"}"}
                    <span className="typing-cursor"></span>
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="px-4 py-1.5 bg-[#1337ec] text-white text-[10px] font-mono flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">account_tree</span> main
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">close</span> 0 errors
                  </span>
                </div>
                <div>TypeScript React</div>
              </div>
            </div>

            {/* Floating Tech Stack Badges around the editor */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-[#1337ec]/20 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
