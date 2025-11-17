import { focusAreas, toolbelt } from "../lib/projects";

export function FocusPanel() {
  return (
    <div className="fade-border rounded-[28px] bg-slate-900/60 p-6 sm:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Focus</p>
      <ul className="mt-5 space-y-4 text-base text-slate-200">
        {focusAreas.map((item) => (
          <li key={item.title} className="border-l border-white/15 pl-4">
            <p className="font-medium text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-400">{item.copy}</p>
          </li>
        ))}
      </ul>
      <div className="focus-skills mt-6 grid grid-cols-2 gap-2.5 text-sm text-slate-300 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:gap-3">
        {toolbelt.map((tool) => (
          <span key={tool} className="rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-center">
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
