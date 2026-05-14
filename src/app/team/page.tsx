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
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>The Crayons Roster</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        2025–2026 Season · Lakeville Ultimate Disc Association
      </p>

      {/* Coaches */}
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>Coaches</h2>
      <div className="grid sm:grid-cols-2 gap-5 mb-16">
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
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>Players</h2>
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
    </div>
  );
}
