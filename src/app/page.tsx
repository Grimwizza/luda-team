import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { EventCard, type EventData } from "@/components/EventCard";

const UPCOMING: EventData[] = [
  {
    title:       "Spring League — Week 3",
    date:        "May 17, 2026",
    time:        "10:00 AM",
    location:    "Lakeville South Fields",
    address:     "Lakeville South High School, Lakeville, MN",
    tag:         "League",
    description: "Home field day — bring your friends and family!",
  },
  {
    title:       "Twin Cities Invitational",
    date:        "June 7–8, 2026",
    location:    "Veteran's Memorial Park",
    address:     "Veterans Memorial Park, Bloomington, MN",
    tag:         "Tournament",
    description: "Two-day tournament against teams from across the metro.",
  },
  {
    title:       "Tuesday Practice",
    date:        "May 14, 2026",
    time:        "5:30 PM",
    location:    "Ritter Farm Park",
    address:     "Ritter Farm Park, Lakeville, MN",
    tag:         "Practice",
  },
];

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

      {/* Upcoming Events */}
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {UPCOMING.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </section>

      {/* News teaser */}
      <section
        style={{ backgroundColor: "var(--bg-muted)", borderColor: "var(--border)" }}
        className="border-t py-16"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-3" style={{ color: "var(--fg)" }}>Latest News</h2>
          <p className="text-lg font-semibold mb-8" style={{ color: "var(--fg-muted)" }}>
            Updates, announcements, and stories from the team.
          </p>
          <Link
            href="/news"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            className="inline-block px-8 py-4 rounded-3xl font-black text-lg hover:opacity-90 transition-opacity"
          >
            Read the News
          </Link>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-5xl mb-4">📸</p>
        <h2 className="text-3xl font-black mb-3" style={{ color: "var(--fg)" }}>Follow Along</h2>
        <p className="font-semibold mb-8" style={{ color: "var(--fg-muted)" }}>
          Game highlights, team moments, and more on Instagram.
        </p>
        <a
          href="https://www.instagram.com/lakevillenorthultimate/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          className="inline-block px-8 py-4 rounded-3xl border-2 font-black text-lg hover:opacity-80 transition-opacity"
        >
          @lakevillenorthultimate on Instagram
        </a>
      </section>
    </>
  );
}
