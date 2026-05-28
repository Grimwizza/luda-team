"use client";

import React, { useEffect, useState } from "react";

interface TickerData {
  event: {
    title:    string;
    date:     string;
    time:     string | null;
    location: string | null;
  };
  weather: {
    time:  string;
    field: string | null;
    temp:  number;
    label: string;
    emoji: string;
  }[] | null;
}

export function TickerBar() {
  const [data, setData] = useState<TickerData | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/ticker")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  // null = no upcoming event → render nothing
  if (data === null) return null;

  let nodes: React.ReactNode = null;
  if (data) {
    const sep = "  ·  ";
    const parts: React.ReactNode[] = [
      `⚡ Next Up: ${data.event.title}${sep}${data.event.date}`,
    ];
    if (data.event.time) parts.push(`${sep}${data.event.time}`);
    if (data.event.location) {
      const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(data.event.location)}`;
      parts.push(sep);
      parts.push(
        <a
          key="loc"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecorationLine: "underline", textUnderlineOffset: "3px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {data.event.location}
        </a>
      );
    }
    if (data.weather?.length) {
      const wx = data.weather
        .map((w) => [w.field, w.time, `${w.emoji} ${w.temp}°`].filter(Boolean).join(" "))
        .join(sep);
      parts.push(`          🌡 ${wx}`);
    }
    nodes = parts;
  }

  return (
    <>
      <style>{`
        @keyframes ludaTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
      <div
        className="fixed bottom-0 left-0 right-0 z-30 h-9 overflow-hidden flex items-center"
        style={{ backgroundColor: "var(--accent)" }}
        aria-label="Upcoming event ticker"
      >
        {data === undefined ? (
          <div
            className="h-2.5 w-48 rounded-full mx-auto animate-pulse"
            style={{ backgroundColor: "var(--accent-fg)", opacity: 0.2 }}
          />
        ) : (
          <div
            className="flex items-center"
            style={{ animation: "ludaTicker 35s linear infinite" }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
          >
            {[0, 1, 2].map((n) => (
              <span
                key={n}
                className="whitespace-nowrap text-xs font-bold tracking-wide shrink-0 px-16"
                style={{ color: "var(--accent-fg)" }}
              >
                {nodes}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
