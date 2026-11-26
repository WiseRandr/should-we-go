// TEMPORARY sample data so the pages show something while the real modules
// (api.js, activity.js scoring, storage.js) are being connected.
// Delete this file once every page uses real data.

// Same id/title as data/activities.json
export const SAMPLE_ACTIVITIES = [
  { id: "hiking", title: "Hiking" },
  { id: "cycling", title: "Cycling" },
  { id: "picnic", title: "Picnic" },
  { id: "outdoor-photography", title: "Outdoor Photography" },
  { id: "running", title: "Running" },
  { id: "camping", title: "Camping" },
  { id: "beach-day", title: "Beach Day" },
  { id: "walking", title: "Walking" },
];

// Same shape as getForecast() in api.js, plus a score from the scoring module
export const SAMPLE_FORECAST = [
  { date: "2026-11-26", maxTemp: 8, minTemp: 1, rainChance: 45, windSpeed: 24, uvIndex: 2, humidity: 72, score: 58 },
  { date: "2026-11-27", maxTemp: 12, minTemp: 4, rainChance: 10, windSpeed: 12, uvIndex: 3, humidity: 55, score: 81 },
  { date: "2026-11-28", maxTemp: 5, minTemp: -2, rainChance: 70, windSpeed: 31, uvIndex: 1, humidity: 88, score: 32 },
  { date: "2026-11-29", maxTemp: 9, minTemp: 2, rainChance: 30, windSpeed: 18, uvIndex: 2, humidity: 66, score: 64 },
  { date: "2026-11-30", maxTemp: 11, minTemp: 3, rainChance: 15, windSpeed: 16, uvIndex: 3, humidity: 60, score: 76 },
  { date: "2026-12-01", maxTemp: 7, minTemp: 0, rainChance: 40, windSpeed: 22, uvIndex: 2, humidity: 70, score: 51 },
  { date: "2026-12-02", maxTemp: 3, minTemp: -4, rainChance: 80, windSpeed: 35, uvIndex: 1, humidity: 90, score: 24 },
];

export const SAMPLE_WARNINGS = [
  "Rain chance is above the ideal 20% for hiking.",
  "Wind gusts may make exposed trails uncomfortable.",
];

export const SAMPLE_ADVICE = ["Waterproof jacket", "Warm layer and gloves", "Water and snacks"];

export const SAMPLE_PLANS = [
  {
    id: "plan-1",
    city: "Toronto",
    activityId: "cycling",
    activityTitle: "Cycling",
    dayIndex: 1,
    date: "2026-11-27",
    score: 81,
    weather: { maxTemp: 12, minTemp: 4, rainChance: 10, windSpeed: 12 },
    savedAt: "2026-11-26T15:30:00.000Z",
  },
  {
    id: "plan-2",
    city: "Toronto",
    activityId: "hiking",
    activityTitle: "Hiking",
    dayIndex: 0,
    date: "2026-11-26",
    score: 58,
    weather: { maxTemp: 8, minTemp: 1, rainChance: 45, windSpeed: 24 },
    savedAt: "2026-11-26T15:10:00.000Z",
  },
  {
    id: "plan-3",
    city: "Hamilton",
    activityId: "picnic",
    activityTitle: "Picnic",
    dayIndex: 2,
    date: "2026-11-28",
    score: 32,
    weather: { maxTemp: 5, minTemp: -2, rainChance: 70, windSpeed: 31 },
    savedAt: "2026-11-26T14:45:00.000Z",
  },
];
