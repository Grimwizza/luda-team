import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | The Crayons LUDA",
};

const CONTACTS = [
  {
    label: "Head Coach",
    name:  "Coach Name",
    email: "coach@luda.team",
    emoji: "🏃",
  },
  {
    label: "Team Admin",
    name:  "Admin Name",
    email: "info@luda.team",
    emoji: "📋",
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@ludafrisbee",
    href:   "https://www.instagram.com/lakevillenorthultimate/",
    emoji:  "📸",
  },
  {
    label: "Band App (Team Chat)",
    handle: "Join the group",
    href:   "#",  // TODO: Band app invite link
    emoji:  "💬",
  },
  {
    label: "Google Photos Album",
    handle: "View all photos",
    href:   "#",  // TODO: Google Photos link
    emoji:  "🖼️",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>Contact</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        Questions about the team, registration, or schedules? Reach out.
      </p>

      {/* Contact cards */}
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>Get in Touch</h2>
      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        {CONTACTS.map((c) => (
          <div
            key={c.email}
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl p-6"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              {c.emoji}
            </div>
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--fg-muted)" }}>
              {c.label}
            </p>
            <p className="font-black text-lg mb-1" style={{ color: "var(--fg)" }}>{c.name}</p>
            <a
              href={`mailto:${c.email}`}
              className="text-sm font-bold underline underline-offset-2 hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              {c.email}
            </a>
          </div>
        ))}
      </div>

      {/* Social links */}
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>Follow & Connect</h2>
      <div className="flex flex-col gap-4">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl px-6 py-4 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">{s.emoji}</span>
            <div>
              <p className="font-black text-sm" style={{ color: "var(--fg)" }}>{s.label}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{s.handle}</p>
            </div>
            <span className="ml-auto text-sm font-bold" style={{ color: "var(--fg-muted)" }}>→</span>
          </a>
        ))}
      </div>

      {/* Location */}
      <div
        style={{ backgroundColor: "var(--bg-muted)", borderColor: "var(--card-border)" }}
        className="mt-12 border rounded-3xl p-6 text-center"
      >
        <p className="text-2xl mb-2">📍</p>
        <p className="font-black" style={{ color: "var(--fg)" }}>Based in Lakeville, MN</p>
        <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
          We play at fields across the South Metro area.
        </p>
      </div>
    </div>
  );
}
