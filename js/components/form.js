// Form helpers: fill <select> options from data.

import { createElement, replaceChildren } from "../utils/dom.js";

/**
 * Fill a <select> with one <option> per activity.
 *
 * @param {HTMLSelectElement} select
 * @param {Array<{id: string, title: string}>} activities - from data/activities.json
 * @param {object} [options]
 * @param {string} [options.selectedId] - activity to pre-select
 * @param {string} [options.allLabel] - adds a first "all" option (used by the saved-plans filter)
 */
export function renderActivityOptions(select, activities, { selectedId, allLabel } = {}) {
  const options = activities.map((activity) =>
    createElement("option", { text: activity.title, attrs: { value: activity.id } })
  );

  if (allLabel) {
    options.unshift(createElement("option", { text: allLabel, attrs: { value: "all" } }));
  }

  replaceChildren(select, options);

  if (selectedId) {
    select.value = selectedId;
  }
}

/**
 * Fill the day <select>: Today, Tomorrow, In 2 days, ...
 *
 * @param {HTMLSelectElement} select
 * @param {number} [totalDays=7] - Open-Meteo returns 7 days by default
 * @param {number} [selectedDay=0]
 */
export function renderDayOptions(select, totalDays = 7, selectedDay = 0) {
  const options = [];

  for (let day = 0; day < totalDays; day++) {
    let label = `In ${day} days`;
    if (day === 0) label = "Today";
    if (day === 1) label = "Tomorrow";

    options.push(createElement("option", { text: label, attrs: { value: day } }));
  }

  replaceChildren(select, options);
  select.value = String(selectedDay);
}
