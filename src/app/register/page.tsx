import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Register | The Crayons LUDA",
};

const STEPS = [
  {
    step:  "1",
    title: "Register with Lakeville North High School",
    body: (
      <>
        Go to the <a href="https://www.lnhspanthers.com/signup" target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>LNHS Athletics & Activities page</a>, click on the "Activity Registration" tab, and follow the instructions. You will need to log into Arbiter (or create an account). Ensure you choose "LNHS Activities & Club Registration" (not Athletic Registration). Pay the LNHS fee.
      </>
    ),
  },
  {
    step:  "2",
    title: "Join Minnesota Ultimate",
    body: (
      <>
        Minnesota Ultimate is our governing body. Go to the <a href="https://minnesotaultimate.org/" target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>MNU website</a> and sign in. Look for the "2026 High School Spring League" under Upcoming Events and select "Register Now". Pay the membership fee. Do not forget to sign the online medical waiver during this process!
      </>
    ),
  },
  {
    step:  "3",
    title: "Join Lakeville Ultimate Disc Association (LUDA)",
    body: (
      <div className="flex flex-col gap-2 mt-2">
        <p>Complete the final registration steps directly with LUDA:</p>
        <ul className="list-disc ml-5 flex flex-col gap-1">
          <li>Read the <a href="https://drive.google.com/file/d/1aG2Y3e9FGCoqCxS1g2iA4ofnu_j9mhJs/view?usp=sharing" target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>LUDA Code of Conduct and Expectations</a></li>
          <li>Print and complete the <a href="https://drive.google.com/file/d/1uAtD2-YPFWQAbSwe_hFbvkqbi-GSJFfO/view?usp=sharing" target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>Student/Parent Contract</a></li>
          <li>Print and complete the <a href="https://drive.google.com/file/d/1gQH94zi0zF-QqK4nRBmLhQ-iSABcQA_2/view?usp=sharing" target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>LUDA Medical Waiver</a></li>
          <li>Pay the LUDA fee via <a href="https://checkout.square.site/merchant/MLWCQKJHS97D7/checkout/3W4TACCVURA7Q5ERURRQTYTG" target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>Square Checkout</a></li>
        </ul>
        <p className="mt-2 text-xs italic">Give your completed forms to the Coach.</p>
      </div>
    ),
  },
];

const COSTS = [
  { item: "Lakeville North High School Fee", amount: "$30.00" },
  { item: "Minnesota Ultimate Membership",   amount: "$60.00" },
  { item: "LUDA Registration Fee",           amount: "$310.50" },
];

export default function RegisterPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>Register</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        Join The Crayons. You will need to register with 3 organizations: LNHS, MN Ultimate, and LUDA.
      </p>

      {/* Steps */}
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>What you&apos;ll need – 3 Steps to Register</h2>
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
              <div className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{s.body}</div>
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
