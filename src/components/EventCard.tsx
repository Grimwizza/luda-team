import React from "react";

export interface EventData {
  title:        string;
  date:         string;
  time?:        string;
  location:     string;
  address?:     string;
  description?: string;
  tag?:         string;
}

export function EventCard({ event }: { event: EventData }) {
  const mapsHref = event.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`
    : undefined;

  const tagColors: Record<string, string> = {
    Tournament: "#D00000",
    Practice:   "#1A6B3C",
    League:     "#1A3C8B",
    Social:     "#7B2FAE",
  };
  const tagColor = event.tag ? (tagColors[event.tag] ?? "#555") : undefined;

  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor:     "var(--card-border)",
        color:           "var(--fg)",
      }}
      className="border rounded-3xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h3 className="font-black text-lg leading-snug">{event.title}</h3>
        {event.tag && (
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white shrink-0"
            style={{ backgroundColor: tagColor }}
          >
            {event.tag}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 text-sm" style={{ color: "var(--fg-muted)" }}>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
          <span className="font-semibold">
            {event.date}{event.time ? ` · ${event.time}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PinIcon className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
          {mapsHref ? (
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              {event.location}
            </a>
          ) : (
            <span className="font-semibold">{event.location}</span>
          )}
        </div>
      </div>

      {event.description && (
        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {event.description}
        </p>
      )}
    </div>
  );
}

function CalendarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
