"use client";

import React from "react";

/* ─── Types ───────────────────────────────────────────────────────── */
export interface AlumniData {
  name: string;
  gradYear: number;
  college: string;
  collegeUrl?: string;
  role: string;
  quote: string;
  socialUrl?: string;
  socialType?: "linkedin" | "instagram";
}

/* ─── Component ───────────────────────────────────────────────────── */
export function AlumniCard({ alumni }: { alumni: AlumniData }) {
  return (
    <div
      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      className="border rounded-3xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200"
    >
      {/* Photo placeholder — gray gradient + disc icon */}
      <div
        className="relative h-48 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, var(--bg-muted) 0%, var(--border) 60%, var(--bg-muted) 100%)",
        }}
      >
        <DiscPlaceholderIcon
          className="w-20 h-20"
          style={{ color: "var(--fg)", opacity: 0.15 }}
        />
        {/* Grad year badge */}
        <span
          className="absolute top-3 right-3 text-xs font-black px-3 py-1 rounded-full tracking-wide"
          style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
        >
          Class of {alumni.gradYear}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        <p className="font-black text-lg leading-tight" style={{ color: "var(--fg)" }}>
          {alumni.name}
        </p>

        {/* College */}
        <div className="mt-1 mb-2">
          {alumni.collegeUrl ? (
            <a
              href={alumni.collegeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold hover:opacity-70 underline underline-offset-2 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              {alumni.college}
            </a>
          ) : (
            <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
              {alumni.college}
            </span>
          )}
        </div>

        {/* Role pill */}
        <span
          className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3"
          style={{ backgroundColor: "var(--bg-muted)", color: "var(--fg-muted)" }}
        >
          {alumni.role}
        </span>

        {/* Quote */}
        <p className="text-sm leading-relaxed italic" style={{ color: "var(--fg-muted)" }}>
          &ldquo;{alumni.quote}&rdquo;
        </p>

        {/* Social link */}
        {alumni.socialUrl && (
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <a
              href={alumni.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold hover:opacity-70 transition-opacity"
              style={{ color: "var(--fg-muted)" }}
            >
              {alumni.socialType === "instagram" ? (
                <InstagramIcon className="w-4 h-4" />
              ) : (
                <LinkedInIcon className="w-4 h-4" />
              )}
              {alumni.socialType === "instagram" ? "Instagram" : "LinkedIn"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Inline SVG icons ────────────────────────────────────────────── */
function DiscPlaceholderIcon({
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
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2 Q17 7 17 12 Q17 17 12 22" />
      <path d="M12 2 Q7 7 7 12 Q7 17 12 22" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
