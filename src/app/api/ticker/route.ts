const CALENDAR_ID = "lakeville.ultimate@gmail.com";
const FALLBACK = { lat: 44.6547, lng: -93.2427 }; // Lakeville, MN

const WMO: Record<number, { label: string; emoji: string }> = {
  0:  { label: "Clear",         emoji: "☀️"  },
  1:  { label: "Mainly Clear",  emoji: "🌤️" },
  2:  { label: "Partly Cloudy", emoji: "⛅"  },
  3:  { label: "Overcast",      emoji: "☁️"  },
  45: { label: "Foggy",         emoji: "🌫️" },
  48: { label: "Foggy",         emoji: "🌫️" },
  51: { label: "Drizzle",       emoji: "🌦️" },
  53: { label: "Drizzle",       emoji: "🌦️" },
  55: { label: "Drizzle",       emoji: "🌦️" },
  61: { label: "Rain",          emoji: "🌧️" },
  63: { label: "Rain",          emoji: "🌧️" },
  65: { label: "Heavy Rain",    emoji: "🌧️" },
  71: { label: "Snow",          emoji: "❄️"  },
  73: { label: "Snow",          emoji: "❄️"  },
  75: { label: "Heavy Snow",    emoji: "❄️"  },
  80: { label: "Showers",       emoji: "🌦️" },
  81: { label: "Showers",       emoji: "🌦️" },
  82: { label: "Heavy Showers", emoji: "🌧️" },
  85: { label: "Snow Showers",  emoji: "🌨️" },
  86: { label: "Heavy Snow",    emoji: "❄️"  },
  95: { label: "Thunderstorms", emoji: "⛈️" },
  96: { label: "Severe Storms", emoji: "⛈️" },
  99: { label: "Severe Storms", emoji: "⛈️" },
};

function wmoInfo(code: number) {
  if (WMO[code]) return WMO[code];
  const keys = Object.keys(WMO).map(Number).sort((a, b) => b - a);
  const k = keys.find((key) => key <= code);
  return k != null ? WMO[k] : { label: "Unknown", emoji: "🌡️" };
}

interface GameSlot {
  dayName: string;  // "Saturday"
  hour:    number;  // 0-23
  minute:  number;
  field:   string | null;
}

// Parse lines like "Saturday:\n8:00 Field#6\n9:40 Field#7" from a calendar description.
// Handles HTML that Google Calendar sometimes injects.
function parseSchedule(description: string): GameSlot[] {
  const text = description
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

  const slots: GameSlot[] = [];
  let currentDay = "";

  for (const rawLine of text.split(/[\n\r]+/)) {
    const line = rawLine.trim();
    if (!line) continue;

    // Day header: "Saturday:" / "Saturday" / "Saturday -"
    const dayMatch = line.match(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)[:\s-]*$/i);
    if (dayMatch) {
      currentDay = dayMatch[1][0].toUpperCase() + dayMatch[1].slice(1).toLowerCase();
      continue;
    }

    // Game line: "8:00 Field#6" or "9:40 Field #7" or "11:20 Field#8"
    const gameMatch = line.match(/^(\d{1,2}):(\d{2})\s+Field\s*#?(\w+)/i);
    if (gameMatch && currentDay) {
      slots.push({
        dayName: currentDay,
        hour:    parseInt(gameMatch[1]),
        minute:  parseInt(gameMatch[2]),
        field:   `Field #${gameMatch[3]}`,
      });
    }
  }

  return slots;
}

function hourLabel(h: number, m: number): string {
  const ampm = h < 12 ? "AM" : "PM";
  const h12  = h % 12 || 12;
  return m === 0 ? `${h12} ${ampm}` : `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) return Response.json(null);

  try {
    // Step 1: Next calendar event
    // Round to the nearest 15-min boundary so the fetch cache key is stable
    const timeMin = new Date();
    timeMin.setMinutes(Math.floor(timeMin.getMinutes() / 15) * 15, 0, 0);

    // Build URL via template literal — new URL() would decode %40 → @ in the path,
    // which the Calendar API rejects. URLSearchParams handles query encoding separately.
    const calParams = new URLSearchParams({
      key:          apiKey,
      timeMin:      timeMin.toISOString(),
      maxResults:   "5", // fetch a small batch so we can skip events that already started
      singleEvents: "true",
      orderBy:      "startTime",
    });
    const calUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${calParams}`;

    const calRes = await fetch(calUrl, { next: { revalidate: 900 } });
    if (!calRes.ok) {
      console.error("[ticker] Calendar API error:", calRes.status, await calRes.text());
      return Response.json(null);
    }

    const calData = await calRes.json();

    // Show the next event whose end time hasn't passed yet — so ongoing events
    // remain visible but disappear from the ticker once they're over.
    // All-day end.date is exclusive (day after last day), so use strict >.
    const now = new Date();
    const todayStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Chicago",
    }).format(now);

    const item = (calData.items ?? []).find((ev: { end?: { dateTime?: string; date?: string } }) => {
      if (ev.end?.dateTime) return new Date(ev.end.dateTime) > now;
      return (ev.end?.date ?? "") > todayStr;
    });

    if (!item) return Response.json(null);

    const isAllDay = !item.start?.dateTime;
    const eventTz  = (item.start?.timeZone as string | undefined) ?? "America/Chicago";

    // All-day events: anchor to noon UTC so TZ formatting lands on the correct date
    const startDate = isAllDay
      ? new Date(item.start.date + "T12:00:00Z")
      : new Date(item.start.dateTime);

    // End date used for day-range calculations (exclusive for all-day)
    const endDateExclusive = isAllDay
      ? new Date(item.end.date + "T00:00:00Z")
      : new Date(item.end.dateTime);

    const dateLabel = startDate.toLocaleDateString("en-US", {
      weekday: "short",
      month:   "short",
      day:     "numeric",
      timeZone: eventTz,
    });
    const timeLabel = isAllDay
      ? null
      : startDate.toLocaleTimeString("en-US", {
          hour:     "numeric",
          minute:   "2-digit",
          timeZone: eventTz,
        });

    const location = item.location as string | undefined;

    // Step 2: Geocode location → lat/lng
    let lat = FALLBACK.lat;
    let lng = FALLBACK.lng;
    if (location) {
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
          { headers: { "User-Agent": "luda.team" }, next: { revalidate: 900 } }
        );
        const geo = await geoRes.json();
        if (geo[0]) {
          lat = parseFloat(geo[0].lat);
          lng = parseFloat(geo[0].lon);
        }
      } catch { /* fall back to Lakeville */ }
    }

    // Step 3: Weather from Open-Meteo (free, no key, up to 16 days)
    type WeatherEntry = { time: string; field: string | null; temp: number; label: string; emoji: string };
    let weather: WeatherEntry[] | null = null;

    const daysUntil = (startDate.getTime() - Date.now()) / 86_400_000;
    if (daysUntil <= 14) {
      try {
        const dateFormatter   = new Intl.DateTimeFormat("en-CA", { timeZone: eventTz });
        const dayNameFormatter = new Intl.DateTimeFormat("en-US", { timeZone: eventTz, weekday: "long" });

        // Which date to fetch weather for:
        // today if the event is already underway, otherwise the first day of the event.
        const eventStartISO = dateFormatter.format(startDate);
        const todayISO      = dateFormatter.format(now);
        const eventEndISO   = dateFormatter.format(endDateExclusive);
        const relevantISO   = (todayISO >= eventStartISO && todayISO < eventEndISO)
          ? todayISO
          : eventStartISO;

        const tzEncoded = encodeURIComponent(eventTz);
        const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=${tzEncoded}&start_date=${relevantISO}&end_date=${relevantISO}`;
        const wxRes = await fetch(wxUrl, { next: { revalidate: 900 } });
        const wx    = await wxRes.json();

        if (wx.hourly?.temperature_2m) {
          const getHourInTz = (date: Date) => {
            const parts = new Intl.DateTimeFormat("en-US", {
              timeZone: eventTz,
              hour:     "2-digit",
              hour12:   false,
            }).formatToParts(date);
            return Math.min(23, Math.max(0,
              parseInt(parts.find((p) => p.type === "hour")?.value ?? "12")
            ));
          };

          // Tournament mode: parse game start times from the description
          const gameSlots = parseSchedule((item.description as string | undefined) ?? "");
          if (gameSlots.length > 0) {
            // Map the relevant date back to a day name ("Saturday") to filter slots
            // Use noon UTC on that date to avoid DST/midnight boundary issues
            const relevantDayName = dayNameFormatter.format(new Date(relevantISO + "T12:00:00Z"));
            const dayGames = gameSlots.filter(
              (g) => g.dayName.toLowerCase() === relevantDayName.toLowerCase()
            );

            if (dayGames.length > 0) {
              weather = dayGames.map((g) => ({
                time:  hourLabel(g.hour, g.minute),
                field: g.field,
                temp:  Math.round(wx.hourly.temperature_2m[Math.min(23, g.hour)]),
                ...wmoInfo(wx.hourly.weathercode[Math.min(23, g.hour)]),
              }));
            }
          }

          // Fallback: single weather snapshot at event start time
          if (!weather) {
            const startHour = isAllDay ? 12 : getHourInTz(startDate);
            weather = [{
              time:  timeLabel ?? hourLabel(startHour, 0),
              field: null,
              temp:  Math.round(wx.hourly.temperature_2m[startHour]),
              ...wmoInfo(wx.hourly.weathercode[startHour]),
            }];
          }
        }
      } catch { /* weather unavailable, still show event */ }
    }

    return Response.json({
      event: {
        title:    item.summary as string,
        date:     dateLabel,
        time:     timeLabel,
        location: location ?? null,
      },
      weather,
    });
  } catch {
    return Response.json(null);
  }
}
