"use client";

export function SkillsSection() {
  return (
    <section className="py-28 relative border-t border-[#282b39] bg-[#0c0e1a]" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Technical Proficiency</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I work with a wide variety of tools and frameworks, always choosing the right technology for the task at
            hand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skill Card 1 - Frontend */}
          <div className="bg-[#1a1d2d] p-6 rounded-xl border border-slate-800 hover:border-[#1337ec]/50 transition-colors group">
            <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <span className="material-symbols-outlined text-blue-400">code</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">React</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">TypeScript</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Tailwind</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Next.js</span>
            </div>
          </div>

          {/* Skill Card 2 - Backend */}
          <div className="bg-[#1a1d2d] p-6 rounded-xl border border-slate-800 hover:border-[#1337ec]/50 transition-colors group">
            <div className="size-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
              <span className="material-symbols-outlined text-green-400">dns</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Backend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Node.js</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Python</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">PostgreSQL</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">MongoDB</span>
            </div>
          </div>

          {/* Skill Card 3 - DevOps */}
          <div className="bg-[#1a1d2d] p-6 rounded-xl border border-slate-800 hover:border-[#1337ec]/50 transition-colors group">
            <div className="size-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <span className="material-symbols-outlined text-purple-400">cloud</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">DevOps</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Docker</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">CI/CD</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Linux</span>
            </div>
          </div>

          {/* Skill Card 4 - Tools */}
          <div className="bg-[#1a1d2d] p-6 rounded-xl border border-slate-800 hover:border-[#1337ec]/50 transition-colors group">
            <div className="size-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
              <span className="material-symbols-outlined text-orange-400">build</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Tools</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Prisma</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">FastAPI</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">LangChain</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Figma</span>
              <span className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded">Postman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

