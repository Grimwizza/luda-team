import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | The Crayons LUDA",
};

const STEPS = [
  {
    step:  "1",
    title: "Fill Out the Registration Form",
    body:  "Complete the online registration form linked below. You'll need your player's name, grade, school, and emergency contact info.",
  },
  {
    step:  "2",
    title: "Pay Registration Fee",
    body:  "Payment can be made via Venmo or check. See cost breakdown below.",
  },
  {
    step:  "3",
    title: "Sign the Waiver",
    body:  "A parent or guardian must sign the participation waiver. Link will be sent after registration.",
  },
  {
    step:  "4",
    title: "Join the Band App",
    body:  "All team communication happens on the Band app. You'll receive an invite link after registering.",
  },
];

const COSTS = [
  { item: "Season Registration",   amount: "$75" },
  { item: "Jersey (if needed)",    amount: "$30" },
  { item: "Tournament Entry Fees", amount: "Included" },
  { item: "Equipment",             amount: "Provided" },
];

export default function RegisterPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>Register</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        Join The Crayons for the 2026 season. Registration closes April 1st.
      </p>

      {/* Steps */}
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>How to Register</h2>
      <div className="flex flex-col gap-5 mb-14">
        {STEPS.map((s) => (
          <div
            key={s.step}
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="border rounded-3xl p-6 flex gap-5 items-start"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              {s.step}
            </div>
            <div>
              <p className="font-black text-lg mb-1" style={{ color: "var(--fg)" }}>{s.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cost breakdown */}
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>Cost Breakdown</h2>
      <div
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        className="border rounded-3xl overflow-hidden mb-12"
      >
        {COSTS.map((row, i) => (
          <div
            key={row.item}
            style={{
              borderTopColor: "var(--card-border)",
              backgroundColor: i % 2 === 0 ? "transparent" : "var(--bg-muted)",
            }}
            className={`flex justify-between px-6 py-4 ${i > 0 ? "border-t" : ""}`}
          >
            <span className="font-semibold text-sm" style={{ color: "var(--fg)" }}>{row.item}</span>
            <span className="font-black" style={{ color: "var(--accent)" }}>{row.amount}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="#"  // TODO: link to actual registration form
          style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
          className="flex-1 text-center px-8 py-4 rounded-3xl font-black text-lg hover:opacity-90 transition-opacity"
        >
          Register Now →
        </a>
        <Link
          href="/contact"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          className="flex-1 text-center px-8 py-4 rounded-3xl border-2 font-black text-lg hover:opacity-80 transition-opacity"
        >
          Questions? Contact Us
        </Link>
      </div>
    </div>
  );
}
