"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/team",     label: "Team"     },
  { href: "/schedule", label: "Schedule" },
  { href: "/gallery",  label: "Gallery"  },
  { href: "/news",     label: "News"     },
  { href: "/alumni",   label: "Alumni"   },
  { href: "/register", label: "Register" },
  { href: "/contact",  label: "Contact"  },
];

export function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleToggle = () => {
    if (spinning) return;
    setSpinning(true);
    toggleTheme();
    setTimeout(() => setSpinning(false), 450);
  };

  // Icon shows the jersey you are swapping TO
  const jerseyColor = theme === "white" ? "#D00000" : "#FFFFFF";
  const btnStyle: React.CSSProperties =
    theme === "white"
      ? { border: "2px solid #D00000", color: "#D00000", backgroundColor: "transparent" }
      : { border: "2px solid rgba(255,255,255,0.85)", color: "#FFFFFF", backgroundColor: "transparent" };

  return (
    <nav
      style={{ backgroundColor: "var(--nav-bg)", color: "var(--nav-fg)", borderBottomColor: "var(--nav-border)" }}
      className="fixed top-0 left-0 right-0 w-full z-50 border-b transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
          <Image src="/LUDA-lite.gif" alt="LUDA logo" width={36} height={36} unoptimized draggable={false} />
          <span className="text-sm font-bold opacity-60">The Crayons</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  backgroundColor: active ? "var(--accent)" : "transparent",
                  color: active ? "var(--accent-fg)" : "var(--nav-fg)",
                }}
                className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all hover:opacity-80"
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Jersey Swap + hamburger */}
        <div className="flex items-center gap-2">

          {/* Jersey Swap toggle */}
          <button
            onClick={handleToggle}
            aria-label="Jersey Swap"
            title="Jersey Swap"
            style={btnStyle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-bold transition-all hover:opacity-80 active:scale-95"
          >
            <JerseyIcon
              className={spinning ? "w-5 h-5 jersey-flip" : "w-5 h-5"}
              fill={jerseyColor}
            />
            <span className="hidden sm:inline">Jersey Swap</span>
          </button>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden p-2 rounded-xl"
            style={{ color: "var(--nav-fg)" }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{ backgroundColor: "var(--nav-bg)", borderTopColor: "var(--nav-border)" }}
          className="md:hidden border-t px-4 pb-4 flex flex-col gap-1"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  backgroundColor: active ? "var(--accent)" : "transparent",
                  color: active ? "var(--accent-fg)" : "var(--nav-fg)",
                }}
                className="px-4 py-2.5 rounded-2xl font-bold text-sm transition-all"
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

/* --- Inline SVG Icons ------------------------------------------------- */

function JerseyIcon({
  className,
  style,
  fill = "currentColor",
}: {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
}) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill={fill}>
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9h1.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.33-2.23z" />
    </svg>
  );
}

function MenuIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
