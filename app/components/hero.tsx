"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, GitBranch } from "lucide-react";

const roles = ["Developer", "Designer", "Innovator"] as const;

function useTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    const complete = !deleting && length === role.length;
    const empty = deleting && length === 0;
    const delay = complete ? 1500 : empty ? 140 : deleting ? 55 : 110;
    const timer = window.setTimeout(() => {
      if (complete) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else setLength((count) => count + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, length, roleIndex]);

  return roles[roleIndex].slice(0, length);
}

export function HeroSection() {
  const role = useTypewriter();

  return (
    <section id="about" className="hero-section">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
        <div className="min-w-0">
          <p className="eyebrow mb-5"><span className="syntax-green">$</span> whoami</p>
          <h1 className="hero-title" aria-label="Andrew Nguyen — Full Stack Developer">
            <span className="hero-role" aria-hidden="true"><span className="hero-gradient">{role}</span><span className="typing-cursor" /></span>
            <span className="block text-[var(--text)]">Andrew Nguyen<span className="syntax-blue">.</span></span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl">
            Hello, I&apos;m Andrew Nguyen, a Full Stack Developer based in Texas. Working on projects when I can.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="button-primary">
              View Projects <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="button-secondary">
              Contact Me <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="profile-panel" aria-label="Developer profile code sample">
          <div className="panel-chrome">
            <div className="flex gap-2" aria-hidden="true">
              <span className="window-dot bg-[#ff6b66]" /><span className="window-dot bg-[#f4c76a]" /><span className="window-dot bg-[#82c98b]" />
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)]">developer_profile.tsx</span>
            <span className="w-10" aria-hidden="true" />
          </div>
          <div className="profile-code">
            <div className="code-line"><span className="line-number">01</span><span><span className="code-blue">const</span> <span className="code-green">Developer</span> = () =&gt; {'{'}</span></div>
            <div className="code-line"><span className="line-number">02</span><span>  <span className="code-blue">const</span> profile = {'{'}</span></div>
            <div className="code-line"><span className="line-number">03</span><span>    name: <span className="code-string">&quot;Andrew Nguyen&quot;</span>,</span></div>
            <div className="code-line"><span className="line-number">04</span><span>    role: <span className="code-string">&quot;Full Stack Developer&quot;</span>,</span></div>
            <div className="code-line"><span className="line-number">05</span><span>    caffeine: <span className="code-string">&quot;High&quot;</span></span></div>
            <div className="code-line"><span className="line-number">06</span><span>  {'}'};</span></div>
            <div className="code-line"><span className="line-number">07</span><span>  <span className="code-blue">return</span> (</span></div>
            <div className="code-line"><span className="line-number">08</span><span>    &lt;Portfolio&gt;&lt;Skills stack={'{'}fullStack{'}'} /&gt;</span></div>
            <div className="code-line"><span className="line-number">09</span><span>      &lt;Projects passion={'{'}true{'}'} /&gt;</span></div>
            <div className="code-line"><span className="line-number">10</span><span>      &lt;Contact status={'{'}&quot;Open for opportunities&quot;{'}'} /&gt;</span></div>
            <div className="code-line"><span className="line-number">11</span><span>    &lt;/Portfolio&gt;</span></div>
            <div className="code-line"><span className="line-number">12</span><span>  );</span></div>
            <div className="code-line"><span className="line-number">13</span><span>{'}'};</span></div>
            <div className="mt-5 border-t border-[var(--rule)] pt-4 text-xs text-[var(--text-muted)]"><GitBranch size={13} className="mr-1 inline" aria-hidden="true" /> main <span className="mx-2 text-[var(--text-dim)]">·</span> TypeScript React</div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-dim)] sm:px-6">
        <span className="h-px w-8 bg-[var(--text-dim)]" /> Scroll to explore
      </div>
    </section>
  );
}
