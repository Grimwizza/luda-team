import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule | The Crayons LUDA",
};

const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/u/0/embed?src=lakeville.ultimate%40gmail.com&ctz=America%2FChicago";



export default function SchedulePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>Schedule</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        All times Central. Powered by the live LUDA Google Calendar.
      </p>

      {/* Google Calendar embed */}
      <div
        style={{ borderColor: "var(--card-border)" }}
        className="rounded-3xl overflow-hidden border"
      >
        <iframe
          src={GOOGLE_CALENDAR_EMBED_URL}
          style={{ border: 0, width: "100%", height: 600 }}
          title="LUDA Team Calendar"
        />
      </div>
    </div>
  );
}
