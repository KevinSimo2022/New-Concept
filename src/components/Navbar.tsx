"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Research", href: "#research" },
  { label: "Pricing", href: "#pricing" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "API", href: "#api" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-border/50 bg-surface transition-all duration-200 ${
        isScrolled ? "backdrop-blur-md bg-surface/90" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
        <a href="/" className="text-sm font-medium tracking-[0.3em] text-white">
          PNGD™
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#get-started"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          Get started
        </a>
      </div>
    </nav>
  );
}
