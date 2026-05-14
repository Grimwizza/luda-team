import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | The Crayons LUDA",
};

const CONTACTS = [
  {
    label: "Team Secretary",
    name:  "Alison Skelly",
    href:  "mailto:lakeville.ultimate@gmail.com",
    cta:   "lakeville.ultimate@gmail.com",
    emoji: "📋",
  },
];

const SOCIALS = [
  {
    label:      "Instagram",
    handle:     "@lakevillenorthultimate",
    href:       "https://www.instagram.com/lakevillenorthultimate/",
    emoji:      null,
    icon:       "/instagram-icon.png",
    badge:      null,
  },
  {
    label:      "Band App – Team Chat",
    handle:     "Join the group",
    href:       "https://www.band.us/band/101047291/",
    emoji:      null,
    icon:       "/band-icon.png",
    badge:      "Invite Only",
  },
  {
    label:      "Google Photos Album",
    handle:     "View all photos",
    href:       "https://photos.app.goo.gl/BQm2qTJqvwRpShR99",
    emoji:      null,
    icon:       "/google-photos-icon.png",
    badge:      null,
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
            key={c.name}
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
              href={c.href}
              className="text-sm font-bold underline underline-offset-2 hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              {c.cta}
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
            {"icon" in s && s.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.icon} alt={s.label} className="w-8 h-8 rounded-lg" />
            ) : (
              <span className="text-2xl">{s.emoji}</span>
            )}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-black text-sm" style={{ color: "var(--fg)" }}>{s.label}</p>
                {s.badge && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                  >
                    {s.badge}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{s.handle}</p>
            </div>
            <span className="ml-auto text-sm font-bold" style={{ color: "var(--fg-muted)" }}>→</span>
          </a>
        ))}
      </div>

      {/* Location */}
      <div
        style={{ borderColor: "var(--card-border)" }}
        className="mt-12 border rounded-3xl overflow-hidden"
      >
        <a
          href="https://maps.google.com/?q=Lakeville+North+High+School,+19600+Ipava+Ave,+Lakeville,+MN+55044"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label="Open Lakeville North High School in Google Maps"
        >
          <iframe
            src="https://maps.google.com/maps?q=Lakeville+North+High+School,+19600+Ipava+Ave,+Lakeville,+MN+55044&output=embed&z=15"
            width="100%"
            height="300"
            style={{ border: 0, display: "block", pointerEvents: "none" }}
            loading="lazy"
            title="Lakeville North High School"
          />
        </a>
        <div
          style={{ backgroundColor: "var(--card-bg)", borderTopColor: "var(--card-border)" }}
          className="border-t px-6 py-4 flex items-center justify-between"
        >
          <div>
            <p className="font-black text-sm" style={{ color: "var(--fg)" }}>Lakeville North High School</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>19600 Ipava Ave, Lakeville, MN 55044</p>
          </div>
          <a
            href="https://maps.google.com/?q=Lakeville+North+High+School,+19600+Ipava+Ave,+Lakeville,+MN+55044"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold px-4 py-2 rounded-2xl hover:opacity-80 transition-opacity shrink-0"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
          >
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  );
}
