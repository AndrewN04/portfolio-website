"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { id: "skills", label: "Skills", layer: "var(--z1)" },
  { id: "projects", label: "Projects", layer: "var(--z2)" },
  { id: "contact", label: "Contact", layer: "var(--z3)" },
] as const;

export function Navigation() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
      className="site-nav sticky top-0 z-50 border-b border-[var(--edge)]"
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="brand-mark" aria-label="a04.dev home">
          <span className="brand-cap" aria-hidden="true">A04</span>a04.dev
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {items.map(({ id, label, layer }) => (
            <a key={id} href={`#${id}`} className="nav-link" style={{ "--dot": layer } as React.CSSProperties}>
              {label}
            </a>
          ))}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-white focus-visible:outline md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-[var(--edge)] px-4 py-2 md:hidden">
          {items.map(({ id, label, layer }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link flex min-h-12 items-center gap-2"
              style={{ "--dot": layer } as React.CSSProperties}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
