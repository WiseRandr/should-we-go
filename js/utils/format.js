// Formatting helpers for dates and weather values.

// Open-Meteo returns dates like "2026-11-26". new Date("2026-11-26") is read as
// UTC midnight, which shows the previous day in Toronto, so force local time.
function toLocalDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`);
}

/** "2026-11-26" -> "Thu" */
export function formatWeekday(isoDate) {
  return toLocalDate(isoDate).toLocaleDateString("en-CA", { weekday: "short" });
}

/** "2026-11-26" -> "Nov 26" */
export function formatShortDate(isoDate) {
  return toLocalDate(isoDate).toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

/** "2026-11-26" -> "Thu, Nov 26" */
export function formatDayAndDate(isoDate) {
  return `${formatWeekday(isoDate)}, ${formatShortDate(isoDate)}`;
}

/** 7.6 -> "8°" */
export function formatTemp(value) {
  return `${Math.round(value)}°`;
}

/** 45 -> "45%" */
export function formatPercent(value) {
  return `${Math.round(value)}%`;
}

/** 23.8 -> "24 km/h" */
export function formatWind(value) {
  return `${Math.round(value)} km/h`;
}
