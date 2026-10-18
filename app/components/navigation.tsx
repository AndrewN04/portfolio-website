"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "../lib/utils";

export function Navigation() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav onKeyDown={(event) => { if (event.key === "Escape" && mobileMenuOpen) { setMobileMenuOpen(false); menuButtonRef.current?.focus(); } }} aria-label="Main navigation" className="static top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-lg font-mono tracking-tight relative">
              <span className="text-[#61afef]">./</span>
              <span className="text-white">a04</span>
              <span className="text-[#98c379]">.dev</span>
              <span className="absolute inset-0 bg-linear-to-r from-white via-white to-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm font-mono text-slate-400 hover:text-[#61afef] transition-all relative group/nav"
            >
              <span className="text-[#5c6370]">#</span>
              <span className="relative z-10 ml-1">skills</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61afef] group-hover/nav:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-mono text-slate-400 hover:text-[#61afef] transition-all relative group/nav"
            >
              <span className="text-[#5c6370]">#</span>
              <span className="relative z-10 ml-1">projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61afef] group-hover/nav:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-mono text-slate-400 hover:text-[#61afef] transition-all relative group/nav"
            >
              <span className="text-[#5c6370]">#</span>
              <span className="relative z-10 ml-1">contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61afef] group-hover/nav:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            ref={menuButtonRef}
            className="lg:hidden text-white p-2 min-h-11 min-w-11"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            {...(mobileMenuOpen
              ? { "aria-expanded": "true", "aria-controls": "mobile-menu" }
              : { "aria-expanded": "false" })}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}

          {mobileMenuOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-3 pb-1 space-y-1">
                <button
                  onClick={() => handleNavClick("skills")}
                  className="block w-full text-left min-h-12 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-[#5c6370]">#</span>
                  <span className="relative z-10 ml-1">skills</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61afef] group-hover/nav:w-full transition-all duration-300"></span>
                </button>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="block w-full text-left min-h-12 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-[#5c6370]">#</span>
                  <span className="relative z-10 ml-1">projects</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61afef] group-hover/nav:w-full transition-all duration-300"></span>
                </button>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="block w-full text-left min-h-12 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-[#5c6370]">#</span>
                  <span className="relative z-10 ml-1">contact</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61afef] group-hover/nav:w-full transition-all duration-300"></span>
                </button>
              </div>
            </div>
          )}

      </div>
    </nav>
  );
}
