import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Roster | The Crayons LUDA",
};

const COACHES = [
  { name: "Coach Name",  role: "Head Coach",       bio: "Bio coming soon." },
  { name: "Coach Name",  role: "Assistant Coach",   bio: "Bio coming soon." },
];

const PLAYERS = Array.from({ length: 12 }, (_, i) => ({
  number: i + 1,
  name:   "Player Name",
  grade:  ["9th", "10th", "11th", "12th"][i % 4],
  pos:    ["Handler", "Cutter", "Hybrid"][i % 3],
}));

export default function TeamPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Page header */}
      <h1 className="text-5xl font-black mb-1" style={{ color: "var(--fg)" }}>The Crayons</h1>
      <p className="text-lg font-semibold mb-1" style={{ color: "var(--fg-muted)" }}>2025–2026 Season</p>
      <p className="font-semibold mb-14" style={{ color: "var(--fg-muted)" }}>Lakeville Ultimate Disc Association</p>

      {/* History section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
          <h2 className="text-2xl font-black" style={{ color: "var(--fg)" }}>
            History of LUDA
          </h2>
        </div>
        <div
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          className="border rounded-3xl p-8 space-y-4"
        >
          <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Founded in 2009 as a club sport for both Lakeville North and South High Schools.
            Lakeville South branched out on their own in 2017. Lakeville Ultimate Disc Association
            (LUDA) formed a 501(c)3 non profit in 2016, and is home to the Lakeville North Varsity
            as well as our developmental teams.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Inspired by Roy G. Bivington Esq., Lakeville North is affectionately and colorfully
            nicknamed the <span className="font-bold" style={{ color: "var(--fg)" }}>Crayons</span>,
            who pride themselves on the spirit of fierce competition, joyful play, and strongly
            embrace the{" "}
            <span className="italic font-semibold" style={{ color: "var(--fg)" }}>
              &ldquo;Spirit of the Game&rdquo;
            </span>
            .
          </p>
          <div
            className="rounded-2xl px-6 py-4 mt-2"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
          >
            <p className="font-bold leading-relaxed text-sm">
              LUDA will remain committed to growing the game of Ultimate and accepts any person
              who wants to play, regardless of race, religion, gender, sexual orientation, or
              physical ability.
            </p>
          </div>
        </div>
      </section>

      {/* LUDA Today section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
          <h2 className="text-2xl font-black" style={{ color: "var(--fg)" }}>
            LUDA Today
          </h2>
        </div>
        <div
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          className="border rounded-3xl p-8 space-y-4"
        >
          <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Lakeville Ultimate Disc Association (LUDA) is open to students from{" "}
            <span className="font-semibold" style={{ color: "var(--fg)" }}>Lakeville North High School</span> and{" "}
            <span className="font-semibold" style={{ color: "var(--fg)" }}>Farmington High School</span>.
            We are co-ed, and welcome all skill levels. During the main season{" "}
            <span className="font-semibold" style={{ color: "var(--fg)" }}>(April–May)</span>, practices
            and games are Mon–Friday evenings, and we have a few weekend tournaments. During the
            off-season{" "}
            <span className="font-semibold" style={{ color: "var(--fg)" }}>(Sept–Oct and Jan–Mar)</span>,
            we have Captains&apos; practices, about 1/week.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            We welcome all students! Come and join this high energy, fun sport! Please reach out
            for more information.
          </p>
          <div className="pt-2">
            <a
              href="mailto:lakeville.ultimate@gmail.com"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              lakeville.ultimate@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Accomplishments section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
          <h2 className="text-2xl font-black" style={{ color: "var(--fg)" }}>Accomplishments</h2>
        </div>
        <div className="flex flex-col gap-5">

          {/* Division II State Tournament */}
          <div
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl p-6"
          >
            <p className="font-black text-base mb-4" style={{ color: "var(--fg)" }}>Division II State Tournament</p>
            <div className="flex flex-wrap gap-3">
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-black"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
              >
                🏆 2013 — State Champions
              </span>
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold border"
                style={{ borderColor: "var(--card-border)", color: "var(--fg)" }}
              >
                🥈 2025 — 2nd Place
              </span>
            </div>
          </div>

          {/* Classic South Conference Champions */}
          <div
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl p-6"
          >
            <p className="font-black text-base mb-4" style={{ color: "var(--fg)" }}>Classic South Conference Champions</p>
            <div className="flex flex-wrap gap-2">
              {[2016, 2017, 2018, 2019, 2021, 2024].map((yr) => (
                <span
                  key={yr}
                  className="px-4 py-2 rounded-2xl text-sm font-bold"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  {yr}
                </span>
              ))}
            </div>
          </div>

          {/* Top 10 Division I State Tournament */}
          <div
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl p-6"
          >
            <p className="font-black text-base mb-4" style={{ color: "var(--fg)" }}>Top 10 Finish — Division I State Tournament</p>
            <div className="flex flex-wrap gap-2">
              {[2015, 2016, 2017, 2018, 2019, 2021].map((yr) => (
                <span
                  key={yr}
                  className="px-4 py-2 rounded-2xl text-sm font-bold"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  {yr}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Team Roster section */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
          <h2 className="text-2xl font-black" style={{ color: "var(--fg)" }}>Team Roster</h2>
        </div>

        {/* Coaches */}
        <h3 className="text-xl font-black mb-6" style={{ color: "var(--fg)" }}>Coaches</h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {COACHES.map((c, i) => (
            <div
              key={i}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              className="border rounded-3xl p-6"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
              >
                🎯
              </div>
              <p className="font-black text-lg" style={{ color: "var(--fg)" }}>{c.name}</p>
              <p className="font-bold text-sm mb-2" style={{ color: "var(--accent)" }}>{c.role}</p>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{c.bio}</p>
            </div>
          ))}
        </div>

        {/* Players */}
        <h3 className="text-xl font-black mb-6" style={{ color: "var(--fg)" }}>Players</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAYERS.map((p) => (
            <div
              key={p.number}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              className="border rounded-2xl p-4 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
              >
                #{p.number}
              </div>
              <div>
                <p className="font-bold" style={{ color: "var(--fg)" }}>{p.name}</p>
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{p.grade} · {p.pos}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

