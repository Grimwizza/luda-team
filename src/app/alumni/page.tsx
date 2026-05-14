import type { Metadata } from "next";
import { AlumniCard, type AlumniData } from "@/components/AlumniCard";

export const metadata: Metadata = {
  title: "Alumni | The Crayons LUDA",
  description:
    "Once a Crayon, always a Crayon. Meet the LUDA alumni who carry the spirit of the disc beyond high school.",
};

/* ─── Data ────────────────────────────────────────────────────────── */

const ALUMNI: AlumniData[] = [
  {
    name: "Jordan Mitchell",
    gradYear: 2022,
    college: "University of Minnesota",
    collegeUrl: "https://www.umn.edu",
    role: "Playing for Gopher Ultimate (D-I Club)",
    quote:
      "LUDA taught me how to read the field. Everything I know about disc started in Lakeville.",
    socialType: "instagram",
    socialUrl: "https://instagram.com",
  },
  {
    name: "Taylor Nguyen",
    gradYear: 2021,
    college: "Carleton College",
    collegeUrl: "https://www.carleton.edu",
    role: "College Team Captain — CANOE",
    quote:
      "Carleton was a dream, but nothing beat the Crayons camaraderie. This team shaped who I am.",
    socialType: "linkedin",
    socialUrl: "https://linkedin.com",
  },
  {
    name: "Casey Thompson",
    gradYear: 2020,
    college: "University of Wisconsin–Madison",
    collegeUrl: "https://www.wisc.edu",
    role: "Club Coach & Community Organizer",
    quote:
      "I came back to coach because someone did that for me. Pay it forward — that's the LUDA way.",
    socialType: "linkedin",
    socialUrl: "https://linkedin.com",
  },
  {
    name: "Riley Johnson",
    gradYear: 2023,
    college: "St. Olaf College",
    collegeUrl: "https://www.stolaf.edu",
    role: "Starter — Ole Ultimate",
    quote:
      "Freshman year of college I was the only one who already knew a force-middle stack. Thanks, Coach.",
  },
  {
    name: "Morgan Kim",
    gradYear: 2019,
    college: "Northwestern University",
    collegeUrl: "https://www.northwestern.edu",
    role: "Community Leader — Chicago Youth Disc",
    quote:
      "Started a youth program in Chicago. Every clinic I run, I'm channeling my LUDA coaches.",
    socialType: "instagram",
    socialUrl: "https://instagram.com",
  },
  {
    name: "Alex Rivera",
    gradYear: 2022,
    college: "University of St. Thomas",
    collegeUrl: "https://www.stthomas.edu",
    role: "Assistant Coach — LUDA (returning!)",
    quote:
      "I graduated, went to college, and came right back to help. Once you're in, you never really leave.",
    socialType: "linkedin",
    socialUrl: "https://linkedin.com",
  },
];

const MILESTONES = [
  {
    icon: "🏟️",
    label: "College Players",
    count: "30+",
    description:
      "LUDA alumni competing at D-I, D-III, and club levels across the country.",
  },
  {
    icon: "🎯",
    label: "Coaches & Mentors",
    count: "12",
    description:
      "Alumni who have returned to coach youth, high school, or club ultimate programs.",
  },
  {
    icon: "🌱",
    label: "Team Founders",
    count: "5",
    description:
      "Former Crayons who started their own ultimate programs in new cities.",
  },
  {
    icon: "🤝",
    label: "Community Leaders",
    count: "20+",
    description:
      "Alumni driving growth in local leagues, clinics, and disc advocacy efforts.",
  },
];

const FAMILIES = [
  { name: "The Mitchells", years: "2018–2024", players: 3 },
  { name: "The Nguyens",   years: "2017–2023", players: 2 },
  { name: "The Johnsons",  years: "2019–2026", players: 4 },
  { name: "The Riveras",   years: "2020–2025", players: 2 },
  { name: "The Kims",      years: "2016–2022", players: 3 },
];

/* ─── Page ────────────────────────────────────────────────────────── */

export default function AlumniPage() {
  return (
    <div>

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
      >
        {/* Background disc watermark */}
        <DiscWatermark />

        <div className="relative max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-black tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            LUDA Alumni
          </span>
          <h1 className="text-5xl sm:text-6xl font-black leading-none mb-4 tracking-tight">
            Once a Crayon,
            <br />
            always a Crayon.
          </h1>
          <p className="text-lg font-semibold leading-relaxed max-w-xl mx-auto opacity-90">
            The disc doesn&apos;t stop flying after graduation. Our alumni are playing college
            ultimate, coaching the next generation, and building disc communities across the
            country. This page is yours.
          </p>
        </div>
      </section>

      {/* ── 2. Alumni Spotlight Grid ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-black mb-1" style={{ color: "var(--fg)" }}>
              Alumni Spotlight
            </h2>
            <p className="font-semibold" style={{ color: "var(--fg-muted)" }}>
              A few Crayons making waves out there.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALUMNI.map((a) => (
            <AlumniCard key={a.name + a.gradYear} alumni={a} />
          ))}
        </div>

        {/* Submit CTA */}
        <div
          className="mt-12 rounded-3xl p-8 text-center"
          style={{ backgroundColor: "var(--bg-muted)", borderColor: "var(--border)" }}
        >
          <p className="font-black text-xl mb-2" style={{ color: "var(--fg)" }}>
            Are you a LUDA alum not featured here?
          </p>
          <p className="text-sm font-semibold mb-5" style={{ color: "var(--fg-muted)" }}>
            We&apos;d love to add you to the Spotlight. Takes 2 minutes.
          </p>
          <a
            href="https://tally.so/r/placeholder-alumni-story"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-black px-8 py-3 rounded-2xl text-sm transition-all hover:opacity-85 active:scale-95"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
          >
            Submit Your Story →
          </a>
        </div>
      </section>

      {/* ── 3. Hall of Recognition ───────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--bg-muted)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-2" style={{ color: "var(--fg)" }}>
            Hall of Recognition
          </h2>
          <p className="font-semibold mb-10" style={{ color: "var(--fg-muted)" }}>
            By the numbers — the LUDA legacy in the wild.
          </p>

          {/* Horizontally scrollable on mobile, grid on desktop */}
          <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {MILESTONES.map((m) => (
              <div
                key={m.label}
                className="shrink-0 w-64 lg:w-auto rounded-3xl p-6 border"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  {m.icon}
                </div>
                <p className="text-3xl font-black leading-none mb-1" style={{ color: "var(--fg)" }}>
                  {m.count}
                </p>
                <p className="font-black text-sm mb-2" style={{ color: "var(--accent)" }}>
                  {m.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Stay Involved ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black mb-2" style={{ color: "var(--fg)" }}>
          Stay Involved
        </h2>
        <p className="font-semibold mb-10" style={{ color: "var(--fg-muted)" }}>
          The team needs you — even after graduation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Alumni Fund */}
          <div
            className="rounded-3xl p-7 border flex flex-col"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              💸
            </div>
            <h3 className="font-black text-xl mb-2" style={{ color: "var(--fg)" }}>
              Alumni Fund
            </h3>
            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "var(--fg-muted)" }}>
              Help current Crayons get on the field. Your donation directly funds jerseys,
              tournament entry fees, and disc equipment for players who need it most. Every dollar
              stays local.
            </p>
            <a
              href="https://donate.stripe.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-black px-6 py-3 rounded-2xl text-sm transition-all hover:opacity-85 active:scale-95"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              Donate to LUDA 🙌
            </a>
          </div>

          {/* Alumni Game */}
          <div
            className="rounded-3xl p-7 border flex flex-col"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              🥏
            </div>
            <h3 className="font-black text-xl mb-2" style={{ color: "var(--fg)" }}>
              Alumni Game
            </h3>
            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "var(--fg-muted)" }}>
              Every summer we run an alumni vs. current team game on the home field. It&apos;s part
              reunion, part throwdown, all Crayons. Legendary trash talk. Genuinely competitive.
              Absolutely required attendance.
            </p>
            <a
              href="https://tally.so/r/placeholder-alumni-game"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-black px-6 py-3 rounded-2xl text-sm transition-all hover:opacity-85 active:scale-95"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              Sign Up for the Game →
            </a>
          </div>

          {/* Mentorship */}
          <div
            className="rounded-3xl p-7 border flex flex-col"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              🌟
            </div>
            <h3 className="font-black text-xl mb-2" style={{ color: "var(--fg)" }}>
              Mentorship Program
            </h3>
            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "var(--fg-muted)" }}>
              Got 30 minutes a month? You could be the reason a current player sticks with the sport.
              Alumni mentors share advice on college recruiting, team culture, and life after high
              school ultimate. No experience required — just a good attitude.
            </p>
            <a
              href="https://tally.so/r/placeholder-mentorship"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-black px-6 py-3 rounded-2xl text-sm transition-all hover:opacity-85 active:scale-95"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              Become a Mentor →
            </a>
          </div>

        </div>
      </section>

      {/* ── 5. Crayon Families ───────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--bg-muted)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-2" style={{ color: "var(--fg)" }}>
            Crayon Families
          </h2>
          <p className="font-semibold mb-10" style={{ color: "var(--fg-muted)" }}>
            Some families just run deep. These households have sent multiple players through the
            program — and we&apos;re forever grateful.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FAMILIES.map((f) => (
              <div
                key={f.name}
                className="rounded-3xl p-6 border text-center"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mx-auto mb-3"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  👨‍👩‍👧‍👦
                </div>
                <p className="font-black text-base mb-0.5" style={{ color: "var(--fg)" }}>
                  {f.name}
                </p>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--fg-muted)" }}>
                  {f.years}
                </p>
                <span
                  className="text-xs font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  {f.players} players
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Footer CTA ────────────────────────────────────────── */}
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-4xl font-black mb-3 leading-tight">
            Are you a LUDA alum?
          </p>
          <p className="text-lg font-semibold mb-8 opacity-90">
            We&apos;d love to hear from you — where the disc has taken you, who you&apos;ve
            become, and how you&apos;re giving back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://tally.so/r/placeholder-alumni-story"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black px-8 py-3.5 rounded-2xl text-sm transition-all hover:opacity-85 active:scale-95"
              style={{ backgroundColor: "var(--accent-fg)", color: "var(--accent)" }}
            >
              Share Your Story →
            </a>
            <a
              href="mailto:alumni@luda.org"
              className="font-bold text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
            >
              alumni@luda.org
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── Background watermark disc ───────────────────────────────────── */
function DiscWatermark() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 800 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Large faint disc top-right */}
      <circle cx="720" cy="-20" r="200" stroke="white" strokeWidth="2" opacity="0.08" />
      <circle cx="720" cy="-20" r="60"  stroke="white" strokeWidth="2" opacity="0.08" />
      {/* Small faint disc bottom-left */}
      <circle cx="80"  cy="320" r="120" stroke="white" strokeWidth="2" opacity="0.07" />
      <circle cx="80"  cy="320" r="36"  stroke="white" strokeWidth="2" opacity="0.07" />
    </svg>
  );
}
