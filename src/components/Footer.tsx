import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--bg-muted)", color: "var(--fg-muted)", borderTopColor: "var(--border)" }}
      className="border-t mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/LUDA-lite.gif"
              alt="Lakeville Ultimate Disc Association"
              width={80}
              height={80}
              unoptimized
              draggable={false}
              className="mb-3"
            />
            <p className="font-black text-sm" style={{ color: "var(--fg)" }}>The Crayons</p>
            <p className="text-sm mt-0.5">High School Ultimate Frisbee</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--fg)" }}>
              Quick Links
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              {([
                ["/team",     "Team Roster"],
                ["/schedule", "Schedule"],
                ["/gallery",  "Gallery"],
                ["/register", "Register"],
                ["/contact",  "Contact"],
              ] as [string, string][]).map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:opacity-80 transition-opacity w-fit"
                  style={{ color: "var(--accent)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--fg)" }}>
              Follow Us
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://www.instagram.com/lakevillenorthultimate/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: "var(--fg)" }}
              >
                <InstagramIcon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                @lakevillenorthultimate
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: "var(--fg)" }}
              >
                <BandIcon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                Band App — Team Chat
              </a>
            </div>
          </div>
        </div>

        <div
          style={{ borderTopColor: "var(--border)" }}
          className="border-t mt-8 pt-6 text-xs text-center"
        >
          {"©"} {new Date().getFullYear()} LUDA.team {"·"} The Crayons {"·"} Lakeville Ultimate Disc Association
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BandIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
  );
}
