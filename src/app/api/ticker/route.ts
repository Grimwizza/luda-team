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
  dayName: string;  // e.g. "Saturday"
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

    // Game line: "8:00 Field#6" or "9:40 Field #7"
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

// Returns ordered YYYY-MM-DD strings from startISO (inclusive) to endISO (exclusive).
function buildDateRange(startISO: string, endISO: string): string[] {
  const dates: string[] = [];
  let cur = startISO;
  while (cur < endISO) {
    dates.push(cur);
    const d = new Date(cur + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + 1);
    cur = d.toISOString().slice(0, 10);
  }
  return dates;
}

function hourLabel(h: number, m: number): string {
  const ampm = h < 12 ? "AM" : "PM";
  const h12  = h % 12 || 12;
  return m === 0 ? `${h12} ${ampm}` : `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CalItem = Record<string, any>;

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
      maxResults:   "5",
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
    const now = new Date();

    // Walk calendar items (sorted by startTime) to find the first one that is
    // still worth showing. For tournament events past the 90-min cutoff on the
    // last game day, skip to the next calendar event instead of staying stuck.
    let item:             CalItem | null = null;
    let isAllDay          = false;
    let eventTz           = "America/Chicago";
    let startDate         = new Date();
    let relevantISO       = "";
    let selectedGameSlots: GameSlot[] = [];

    for (const ev of (calData.items ?? []) as CalItem[]) {
      const evIsAllDay = !ev.start?.dateTime;
      const evTz       = (ev.start?.timeZone as string | undefined) ?? "America/Chicago";

      const evStartDate = evIsAllDay
        ? new Date((ev.start.date as string) + "T12:00:00Z")
        : new Date(ev.start.dateTime as string);

      const evDateFmt    = new Intl.DateTimeFormat("en-CA", { timeZone: evTz });
      const evDayNameFmt = new Intl.DateTimeFormat("en-US", { timeZone: evTz, weekday: "long" });

      // For all-day events the calendar stores plain local date strings — use them
      // directly to avoid midnight-UTC boundary issues when comparing dates.
      const evStartISO  = evIsAllDay ? (ev.start.date as string) : evDateFmt.format(evStartDate);
      const evEndISO    = evIsAllDay ? (ev.end.date   as string) : evDateFmt.format(new Date(ev.end.dateTime as string));
      const todayInEvTz = evDateFmt.format(now);

      // Skip events whose end has already passed
      if (ev.end?.dateTime) {
        if (new Date(ev.end.dateTime as string) <= now) continue;
      } else {
        if ((ev.end?.date ?? "") <= todayInEvTz) continue;
      }

      // Default relevant date: today if within event range, else the first event day
      let evRelevantISO = (todayInEvTz >= evStartISO && todayInEvTz < evEndISO)
        ? todayInEvTz
        : evStartISO;

      // For tournament events with a game schedule, check the 90-min cutoff
      const evGameSlots = parseSchedule((ev.description as string | undefined) ?? "");
      let skipThisEvent = false;

      if (evRelevantISO === todayInEvTz && evGameSlots.length > 0) {
        const todayDayName = evDayNameFmt.format(new Date(todayInEvTz + "T12:00:00Z"));
        const todayGames   = evGameSlots.filter(
          (g) => g.dayName.toLowerCase() === todayDayName.toLowerCase()
        );

        if (todayGames.length > 0) {
          const last = todayGames[todayGames.length - 1];
          const nowParts = new Intl.DateTimeFormat("en-US", {
            timeZone: evTz, hour: "2-digit", minute: "2-digit", hour12: false,
          }).formatToParts(now);
          const nowMins  = parseInt(nowParts.find((p) => p.type === "hour")?.value   ?? "0") * 60
                         + parseInt(nowParts.find((p) => p.type === "minute")?.value ?? "0");
          const cutoff   = last.hour * 60 + last.minute + 90;

          if (nowMins >= cutoff) {
            // Try to advance within this event to the next event day
            const eventDates = buildDateRange(evStartISO, evEndISO);
            const idx = eventDates.indexOf(todayInEvTz);
            if (idx >= 0 && idx + 1 < eventDates.length) {
              evRelevantISO = eventDates[idx + 1]; // show next day of this event
            } else {
              skipThisEvent = true; // no more days here — fall through to next calendar event
            }
          }
        }
      }

      if (skipThisEvent) continue;

      // Found the event to display
      item             = ev;
      isAllDay         = evIsAllDay;
      eventTz          = evTz;
      startDate        = evStartDate;
      relevantISO      = evRelevantISO;
      selectedGameSlots = evGameSlots;
      break;
    }

    if (!item) return Response.json(null);

    // Date label reflects the relevant day (may differ from event start for multi-day tournaments)
    const dateLabel = new Date(relevantISO + "T12:00:00Z").toLocaleDateString("en-US", {
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
        const tzEncoded = encodeURIComponent(eventTz);
        const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=${tzEncoded}&start_date=${relevantISO}&end_date=${relevantISO}`;
        const wxRes = await fetch(wxUrl, { next: { revalidate: 900 } });
        const wx    = await wxRes.json();

        if (wx.hourly?.temperature_2m) {
          const getHourInTz = (date: Date) => {
            const parts = new Intl.DateTimeFormat("en-US", {
              timeZone: eventTz, hour: "2-digit", hour12: false,
            }).formatToParts(date);
            return Math.min(23, Math.max(0,
              parseInt(parts.find((p) => p.type === "hour")?.value ?? "12")
            ));
          };

          // Tournament mode: weather at each game's scheduled start time
          if (selectedGameSlots.length > 0) {
            const dayNameFmt   = new Intl.DateTimeFormat("en-US", { timeZone: eventTz, weekday: "long" });
            const relevantDay  = dayNameFmt.format(new Date(relevantISO + "T12:00:00Z"));
            const dayGames     = selectedGameSlots.filter(
              (g) => g.dayName.toLowerCase() === relevantDay.toLowerCase()
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

          // Fallback: single snapshot at event start time (practices, non-tournament events)
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
