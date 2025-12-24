"use client";

import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-[#282b39]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-white">a04.dev</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#about">
              About
            </a>
            <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#projects">
              Projects
            </a>
            <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#skills">
              Skills
            </a>
            <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#contact">
              Contact
            </a>
            <a
              href="/Andrew-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="bg-[#1337ec] hover:bg-[#0f2cb8] text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Resume</span>
              <span className="material-symbols-outlined text-[16px]">download</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a
              className="block text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              className="block text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              className="block text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a
              className="block text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="/Andrew-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="block bg-[#1337ec] hover:bg-[#0f2cb8] text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors w-fit"
            >
              Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

