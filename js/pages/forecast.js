// forecast.html — results for one city + activity.
// Reads ?city=...&activity=...&day=... from the URL (sent by the form on index.html).

import { getById } from "../utils/dom.js";
import { formatDayAndDate } from "../utils/format.js";
import { renderHeader, renderFooter } from "../components/layout.js";
import { renderEmpty } from "../components/states.js";
import { renderResultsHeader, renderForecastList } from "../components/forecast-cards.js";
import { renderVerdict } from "../components/verdict.js";
import { renderWeatherDetails } from "../components/weather-details.js";
import { renderWarnings, renderAdvice } from "../components/notes.js";
import {
  SAMPLE_ACTIVITIES,
  SAMPLE_FORECAST,
  SAMPLE_WARNINGS,
  SAMPLE_ADVICE,
  SAMPLE_PLANS,
} from "../sample-data.js";

const params = new URLSearchParams(window.location.search);
const city = params.get("city")?.trim() ?? "";
const activityId = params.get("activity") ?? "hiking";
const dayIndex = Number(params.get("day") ?? 0);

renderHeader(getById("site-header"), { activePage: "plan", savedCount: SAMPLE_PLANS.length });
renderFooter(getById("site-footer"));

if (city === "") {
  // Opened without a search -> send the user back to the form
  renderEmpty(getById("results-state"), {
    message: "Search for a city to see your forecast.",
    action: { label: "Start a search", href: "index.html" },
  });
} else {
  // TODO: replace sample data with searchCity()/getForecast() from api.js
  //       and the scoring/warnings/advice from activity.js
  const activity = SAMPLE_ACTIVITIES.find((item) => item.id === activityId) ?? SAMPLE_ACTIVITIES[0];
  const forecast = SAMPLE_FORECAST;
  const selectedDay = forecast[dayIndex] ?? forecast[0];

  renderResultsHeader(getById("results-header"), { location: city, activityTitle: activity.title });
  renderForecastList(getById("forecast-list"), forecast, dayIndex);
  renderVerdict(getById("verdict"), {
    score: selectedDay.score,
    summary: `${activity.title} on ${formatDayAndDate(selectedDay.date)}.`,
  });
  renderWeatherDetails(getById("weather-details"), selectedDay);
  renderWarnings(getById("warnings"), SAMPLE_WARNINGS);
  renderAdvice(getById("advice"), SAMPLE_ADVICE);

  getById("results-content").hidden = false;
}
