import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";

const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/u/0/embed?src=lakeville.ultimate%40gmail.com&ctz=America%2FChicago";



const QUICK_LINKS = [
  { href: "/register", label: "Register Now",  emoji: "📋" },
  { href: "/schedule", label: "Full Schedule",  emoji: "📅" },
  { href: "/team",     label: "Meet the Team",  emoji: "👟" },
  { href: "/gallery",  label: "Photo Gallery",  emoji: "📸" },
  { href: "/contact",  label: "Get in Touch",   emoji: "✉️" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSlider />

      {/* Quick Links */}
      <section
        style={{ backgroundColor: "var(--bg-muted)", borderColor: "var(--border)" }}
        className="py-10 border-y"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_LINKS.map(({ href, label, emoji }) => (
              <Link
                key={href}
                href={href}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--fg)" }}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border font-bold text-sm hover:shadow-md transition-shadow"
              >
                <span>{emoji}</span> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events — live Google Calendar */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h2 className="text-3xl font-black" style={{ color: "var(--fg)" }}>
            Upcoming Events
          </h2>
          <Link
            href="/schedule"
            className="text-sm font-bold underline underline-offset-2 hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            View full schedule →
          </Link>
        </div>
        <div
          style={{ borderColor: "var(--card-border)" }}
          className="rounded-3xl overflow-hidden border"
        >
          <iframe
            src={GOOGLE_CALENDAR_EMBED_URL}
            style={{ border: 0, width: "100%", height: 480 }}
            title="LUDA Upcoming Events"
          />
        </div>
      </section>

    </>
  );
}
