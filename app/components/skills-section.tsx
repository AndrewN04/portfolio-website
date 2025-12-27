export function SkillsSection() {
  return (
    <section
      className="py-28 relative border-t border-[#282b39] bg-[#0c0e1a]"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Technical Proficiency
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm">
            <span className="text-emerald-400">system@portfolio:~$</span>{" "}
            neofetch --skills
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Frontend Card */}
          <div className="group h-full rounded-lg border border-slate-800 bg-[#15151e] hover:border-slate-600 transition-all hover:shadow-[0_0_20px_rgba(19,55,236,0.1)] font-mono flex flex-col relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div className="p-6 flex flex-col h-full">
              {/* Terminal Header */}
              <div className="text-xs text-slate-500 mb-4 pb-2 border-b border-slate-800/50 flex justify-between items-center">
                <span>
                  <span className="text-emerald-400">system@portfolio</span>
                  :~/skills
                </span>
                <span
                  className="material-symbols-outlined text-xs"
                  aria-hidden="true"
                >
                  terminal
                </span>
              </div>
              {/* Command */}
              <div className="mb-4">
                <span className="text-green-400">➜</span>{" "}
                <span className="text-slate-300">./list_frontend.sh</span>
              </div>
              {/* Skills List */}
              <div className="space-y-3 pl-2 border-l-2 border-slate-800 text-slate-300 text-sm flex-1">
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-green-500 text-xs">✓</span> React
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-green-500 text-xs">✓</span> TypeScript
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-green-500 text-xs">✓</span> Tailwind
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-green-500 text-xs">✓</span> Next.js
                </div>
              </div>
            </div>
          </div>

          {/* Backend Card */}
          <div className="group h-full rounded-lg border border-slate-800 bg-[#15151e] hover:border-slate-600 transition-all hover:shadow-[0_0_20px_rgba(19,55,236,0.1)] font-mono flex flex-col relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div className="p-6 flex flex-col h-full">
              {/* Terminal Header */}
              <div className="text-xs text-slate-500 mb-4 pb-2 border-b border-slate-800/50 flex justify-between items-center">
                <span>
                  <span className="text-emerald-400">system@portfolio</span>
                  :~/skills
                </span>
                <span
                  className="material-symbols-outlined text-xs"
                  aria-hidden="true"
                >
                  dns
                </span>
              </div>
              {/* Command */}
              <div className="mb-4">
                <span className="text-green-400">➜</span>{" "}
                <span className="text-slate-300">
                  python3 inspect_backend.py
                </span>
              </div>
              {/* Skills List */}
              <div className="space-y-3 pl-2 border-l-2 border-slate-800 text-slate-300 text-sm flex-1">
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-purple-400 text-xs">def</span> Node.js
                  <span className="text-slate-500">():</span>
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-purple-400 text-xs">def</span> Python
                  <span className="text-slate-500">():</span>
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-purple-400 text-xs">def</span>{" "}
                  PostgreSQL<span className="text-slate-500">():</span>
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-purple-400 text-xs">def</span> MongoDB
                  <span className="text-slate-500">():</span>
                </div>
              </div>
            </div>
          </div>

          {/* DevOps Card */}
          <div className="group h-full rounded-lg border border-slate-800 bg-[#15151e] hover:border-slate-600 transition-all hover:shadow-[0_0_20px_rgba(19,55,236,0.1)] font-mono flex flex-col relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div className="p-6 flex flex-col h-full">
              {/* Terminal Header */}
              <div className="text-xs text-slate-500 mb-4 pb-2 border-b border-slate-800/50 flex justify-between items-center">
                <span>
                  <span className="text-emerald-400">system@portfolio</span>
                  :~/skills
                </span>
                <span
                  className="material-symbols-outlined text-xs"
                  aria-hidden="true"
                >
                  cloud
                </span>
              </div>
              {/* Command */}
              <div className="mb-4">
                <span className="text-green-400">➜</span>{" "}
                <span className="text-slate-300">kubectl get services</span>
              </div>
              {/* Skills List */}
              <div className="space-y-3 pl-2 border-l-2 border-slate-800 text-slate-300 text-sm flex-1">
                <div className="flex items-center justify-between hover:bg-white/5 rounded px-1 transition-colors">
                  <span>Docker</span>
                  <span className="text-green-400 text-[10px]">Running</span>
                </div>
                <div className="flex items-center justify-between hover:bg-white/5 rounded px-1 transition-colors">
                  <span>CI/CD</span>
                  <span className="text-green-400 text-[10px]">Active</span>
                </div>
                <div className="flex items-center justify-between hover:bg-white/5 rounded px-1 transition-colors">
                  <span>Linux</span>
                  <span className="text-green-400 text-[10px]">Stable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Card */}
          <div className="group h-full rounded-lg border border-slate-800 bg-[#15151e] hover:border-slate-600 transition-all hover:shadow-[0_0_20px_rgba(19,55,236,0.1)] font-mono flex flex-col relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div className="p-6 flex flex-col h-full">
              {/* Terminal Header */}
              <div className="text-xs text-slate-500 mb-4 pb-2 border-b border-slate-800/50 flex justify-between items-center">
                <span>
                  <span className="text-emerald-400">system@portfolio</span>
                  :~/skills
                </span>
                <span
                  className="material-symbols-outlined text-xs"
                  aria-hidden="true"
                >
                  design_services
                </span>
              </div>
              {/* Command */}
              <div className="mb-4">
                <span className="text-green-400">➜</span>{" "}
                <span className="text-slate-300">
                  grep &quot;tools&quot; design.txt
                </span>
              </div>
              {/* Skills List */}
              <div className="space-y-3 pl-2 border-l-2 border-slate-800 text-slate-300 text-sm flex-1">
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-orange-400">#</span> Figma
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-orange-400">#</span> Postman
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-orange-400">#</span> Prisma
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-orange-400">#</span> LangChain
                </div>
                {/* Blinking cursor */}
                <div className="mt-auto pt-2">
                  <span className="text-green-400">➜</span>{" "}
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
