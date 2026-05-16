"use client";

import { useEffect, useState } from "react";

interface TickerData {
  event: {
    title:    string;
    date:     string;
    time:     string | null;
    location: string | null;
  };
  weather: {
    temp:  number;
    label: string;
    emoji: string;
  } | null;
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

  let text = "";
  if (data) {
    const eventParts = [
      `⚡ Next Up: ${data.event.title}`,
      data.event.date,
      data.event.time,
      data.event.location,
    ].filter(Boolean).join("  ·  ");

    const weatherPart = data.weather
      ? `${data.weather.emoji} Game time forecast: ${data.weather.temp}°F  ·  ${data.weather.label}`
      : null;

    text = [eventParts, weatherPart].filter(Boolean).join("          ");
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
        style={{ backgroundColor: "#D00000" }}
        aria-label="Upcoming event ticker"
      >
        {data === undefined ? (
          <div className="h-2.5 w-48 rounded-full bg-white/20 mx-auto animate-pulse" />
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
                className="whitespace-nowrap text-white text-xs font-bold tracking-wide shrink-0 px-16"
              >
                {text}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
