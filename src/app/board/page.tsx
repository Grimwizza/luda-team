import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board of Directors | The Crayons LUDA",
};

const BOARD = [
  { name: "Dani Genz",       role: "President"        },
  { name: "Erick Cavada",    role: "Vice President"   },
  { name: "Angie Wood",      role: "Treasurer"        },
  { name: "Alison Skelly",   role: "Secretary"        },
  { name: "Jennifer Hebig",  role: "Member At Large"  },
];

export default function BoardPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>Board of Directors</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        LUDA is a 501(c)3 non-profit organization governed by a volunteer board of dedicated community members.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {BOARD.map(({ name, role }) => (
          <div
            key={name}
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl p-6 flex items-center gap-5"
          >
            <div className="w-20 h-20 rounded-2xl shrink-0 overflow-hidden flex items-center justify-center" style={{ backgroundColor: "var(--card-bg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/LUDA-lite.gif" alt="LUDA" className="w-20 h-20 object-contain" />
            </div>
            <div>
              <p className="font-black text-lg leading-tight" style={{ color: "var(--fg)" }}>{name}</p>
              <p className="font-bold text-sm mt-0.5" style={{ color: "var(--accent)" }}>{role}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        className="border rounded-3xl p-8"
      >
        <h2 className="text-xl font-black mb-2" style={{ color: "var(--fg)" }}>Contact the Board</h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
          Questions about the organization, finances, or governance? Reach out to the board directly.
        </p>
        <a
          href="mailto:lakeville.ultimate@gmail.com"
          className="font-bold text-sm hover:opacity-80 transition-opacity"
          style={{ color: "var(--accent)" }}
        >
          lakeville.ultimate@gmail.com
        </a>
      </div>
    </div>
  );
}
