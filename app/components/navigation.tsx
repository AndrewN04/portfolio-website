"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "../lib/utils";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-nav-pale rounded-2xl border border-[#3d4259]/50 shadow-lg shadow-black/20 w-[90%] md:w-110 lg:w-130">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-white">
              a04.dev
            </span>
          </Link>

          {/* Separator */}
          <div className="hidden lg:block h-6 w-px bg-white/15" />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6">
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Contact
            </button>
            <a
              href="/Andrew-CV.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Download Resume (PDF, opens in new tab)"
              className="bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Resume</span>
              <span
                className="material-symbols-outlined text-[16px]"
                aria-hidden="true"
              >
                download
              </span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            {...(mobileMenuOpen
              ? { "aria-expanded": "true", "aria-controls": "mobile-menu" }
              : { "aria-expanded": "false" })}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden mt-4 pb-4 space-y-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={() => handleNavClick("skills")}
                className="block text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => handleNavClick("projects")}
                className="block text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="block text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </button>
              <a
                href="/Andrew-CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="block bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors w-fit"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
