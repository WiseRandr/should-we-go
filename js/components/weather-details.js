// "Weather details" card: temperature, rain, wind, UV, humidity.

import { createElement, replaceChildren } from "../utils/dom.js";
import { formatTemp, formatPercent, formatWind } from "../utils/format.js";

/** One stat tile: <div><dt>label</dt><dd>value</dd></div> */
export function createWeatherStat(label, value) {
  return createElement("div", { className: "weather-stat" }, [
    createElement("dt", { text: label }),
    createElement("dd", { text: value }),
  ]);
}

/**
 * @param {HTMLElement} container - #weather-details (a .card)
 * @param {object} day - normalized forecast day from api.js
 *   { maxTemp, minTemp, rainChance, windSpeed, uvIndex?, humidity? }
 *   uvIndex / humidity are only shown if the API provides them.
 */
export function renderWeatherDetails(container, day) {
  const stats = [
    createWeatherStat("Temperature", `${formatTemp(day.maxTemp)} / ${formatTemp(day.minTemp)}C`),
    createWeatherStat("Rain chance", formatPercent(day.rainChance)),
    createWeatherStat("Wind", formatWind(day.windSpeed)),
  ];

  if (day.uvIndex !== undefined) {
    stats.push(createWeatherStat("UV index", Math.round(day.uvIndex)));
  }

  if (day.humidity !== undefined) {
    stats.push(createWeatherStat("Humidity", formatPercent(day.humidity)));
  }

  replaceChildren(container, [
    createElement("h2", { className: "card__title", text: "Weather details" }),
    createElement("dl", { className: "weather-stats" }, stats),
  ]);
}
