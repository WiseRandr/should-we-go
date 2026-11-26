// Results header + the row of forecast day cards.

import { createElement, replaceChildren } from "../utils/dom.js";
import { formatWeekday, formatShortDate, formatTemp } from "../utils/format.js";
import { getVerdict } from "./verdict.js";

/**
 * "Forecast for Toronto, Ontario, Canada" + "Activity: Hiking"
 * @param {HTMLElement} container - #results-header
 * @param {{location: string, activityTitle: string}} data
 */
export function renderResultsHeader(container, { location, activityTitle }) {
  replaceChildren(container, [
    createElement("div", {}, [
      createElement("p", { className: "eyebrow", text: "Forecast for" }),
      createElement("h1", { className: "results__title", text: location }),
    ]),
    createElement("p", { className: "muted" }, [
      "Activity: ",
      createElement("strong", { text: activityTitle }),
    ]),
  ]);
}

/**
 * Build one day card.
 * @param {object} day - normalized forecast day from api.js
 *   { date, maxTemp, minTemp, rainChance, windSpeed } + score (0–100) from the scoring module
 * @param {number} index - position in the forecast (0 = today); stored in data-day
 * @param {boolean} isSelected
 * @returns {HTMLLIElement}
 */
export function createForecastCard(day, index, isSelected = false) {
  const verdict = getVerdict(day.score);

  const button = createElement(
    "button",
    {
      className: isSelected ? "forecast-card is-selected" : "forecast-card",
      attrs: { type: "button", "aria-pressed": String(isSelected) },
      dataset: { day: index },
    },
    [
      createElement("span", { className: "forecast-card__day", text: formatWeekday(day.date) }),
      createElement("span", { className: "forecast-card__date", text: formatShortDate(day.date) }),
      createElement("span", { className: "forecast-card__temp" }, [
        formatTemp(day.maxTemp),
        " ",
        createElement("span", { className: "muted", text: `/ ${formatTemp(day.minTemp)}` }),
      ]),
      createElement("span", { className: `badge badge--${verdict.key}`, text: Math.round(day.score) }),
    ]
  );

  return createElement("li", {}, [button]);
}

/**
 * Render all day cards. Clicks can be handled with one delegated listener on the
 * container: event.target.closest("[data-day]").dataset.day
 *
 * @param {HTMLElement} container - #forecast-list (a <ul>)
 * @param {Array<object>} days
 * @param {number} [selectedIndex=0]
 */
export function renderForecastList(container, days, selectedIndex = 0) {
  const cards = days.map((day, index) => createForecastCard(day, index, index === selectedIndex));
  replaceChildren(container, cards);
}
