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
      maxResults:   "1",
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
    const item = calData.items?.[0];
    if (!item) return Response.json(null);

    const isAllDay = !item.start?.dateTime;
    // All-day events: anchor to noon UTC so Chicago TZ formatting lands on the correct date
    const startDate = isAllDay
      ? new Date(item.start.date + "T12:00:00Z")
      : new Date(item.start.dateTime);

    const dateLabel = startDate.toLocaleDateString("en-US", {
      weekday: "short",
      month:   "short",
      day:     "numeric",
      timeZone: "America/Chicago",
    });
    const timeLabel = isAllDay
      ? null
      : startDate.toLocaleTimeString("en-US", {
          hour:     "numeric",
          minute:   "2-digit",
          timeZone: "America/Chicago",
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

    // Step 3: Hourly weather from Open-Meteo (free, no key, up to 16 days)
    let weather = null;
    const daysUntil = (startDate.getTime() - Date.now()) / 86_400_000;
    if (daysUntil <= 14) {
      try {
        const eventDate = new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Chicago",
        }).format(startDate);

        const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=America%2FChicago&start_date=${eventDate}&end_date=${eventDate}`;
        const wxRes = await fetch(wxUrl, { next: { revalidate: 900 } });
        const wx = await wxRes.json();

        if (wx.hourly?.temperature_2m) {
          const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Chicago",
            hour:     "2-digit",
            hour12:   false,
          }).formatToParts(startDate);
          const hour = Math.min(23, Math.max(0,
            parseInt(parts.find((p) => p.type === "hour")?.value ?? "12")
          ));
          weather = {
            temp: Math.round(wx.hourly.temperature_2m[hour]),
            ...wmoInfo(wx.hourly.weathercode[hour]),
          };
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
