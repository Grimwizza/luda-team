import type { Metadata } from "next";
import { EventCard, type EventData } from "@/components/EventCard";

export const metadata: Metadata = {
  title: "Schedule | The Crayons LUDA",
};

// Replace GOOGLE_CALENDAR_EMBED_URL with your actual calendar embed src
const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=America%2FChicago";

const EVENTS: EventData[] = [
  {
    title:       "Spring League — Week 1",
    date:        "May 3, 2026",
    time:        "10:00 AM",
    location:    "Lakeville South Fields",
    address:     "Lakeville South High School, Lakeville, MN",
    tag:         "League",
  },
  {
    title:       "Tuesday Practice",
    date:        "May 7, 2026",
    time:        "5:30 PM",
    location:    "Ritter Farm Park",
    address:     "Ritter Farm Park, Lakeville, MN",
    tag:         "Practice",
  },
  {
    title:       "Spring League — Week 2",
    date:        "May 10, 2026",
    time:        "10:00 AM",
    location:    "Lakeville North Fields",
    address:     "Lakeville North High School, Lakeville, MN",
    tag:         "League",
  },
  {
    title:       "Spring League — Week 3",
    date:        "May 17, 2026",
    time:        "10:00 AM",
    location:    "Lakeville South Fields",
    address:     "Lakeville South High School, Lakeville, MN",
    tag:         "League",
  },
  {
    title:       "Twin Cities Invitational",
    date:        "June 7–8, 2026",
    location:    "Veteran's Memorial Park, Bloomington",
    address:     "Veterans Memorial Park, Bloomington, MN",
    tag:         "Tournament",
    description: "Two-day tournament. Arrive by 8:00 AM both days.",
  },
  {
    title:       "End-of-Season Social",
    date:        "June 20, 2026",
    time:        "6:00 PM",
    location:    "TBD",
    tag:         "Social",
    description: "Celebrate the season with the whole team!",
  },
];

export default function SchedulePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2" style={{ color: "var(--fg)" }}>Schedule</h1>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        All times Central. Click any location for a Google Maps link.
      </p>

      {/* Google Calendar embed */}
      <div
        style={{ borderColor: "var(--card-border)" }}
        className="rounded-3xl overflow-hidden border mb-14"
      >
        <iframe
          src={GOOGLE_CALENDAR_EMBED_URL}
          style={{ border: 0, width: "100%", height: 480 }}
          title="LUDA Team Calendar"
        />
      </div>

      {/* Events list */}
      <h2 className="text-2xl font-black mb-6" style={{ color: "var(--fg)" }}>All Events</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {EVENTS.map((event) => (
          <EventCard key={`${event.title}-${event.date}`} event={event} />
        ))}
      </div>
    </div>
  );
}
