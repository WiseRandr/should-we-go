// Saved plans: summary tiles + plan cards.

import { createElement, replaceChildren } from "../utils/dom.js";
import { formatDayAndDate, formatTemp, formatPercent } from "../utils/format.js";
import { getVerdict } from "./verdict.js";

/**
 * Saved-plan object shape (what storage.js saves in localStorage):
 * {
 *   id: "plan-1732640000000",
 *   city: "Toronto",
 *   activityId: "cycling",
 *   activityTitle: "Cycling",
 *   dayIndex: 1,
 *   date: "2026-11-27",
 *   score: 81,
 *   weather: { maxTemp, minTemp, rainChance, windSpeed },
 *   savedAt: "2026-11-26T15:30:00.000Z"
 * }
 */

/** One summary tile: big number + small label. */
function createSummaryItem(value, label, id) {
  return createElement("div", { className: "summary__item" }, [
    createElement("span", { className: "summary__value", text: value, attrs: { id } }),
    createElement("span", { className: "summary__label", text: label }),
  ]);
}

/**
 * Average score + number of plans. The average is calculated with reduce.
 * @param {HTMLElement} container - #saved-summary
 * @param {Array<object>} plans - the plans currently shown
 */
export function renderSummary(container, plans) {
  const total = plans.length;
  const scoreSum = plans.reduce((sum, plan) => sum + plan.score, 0);
  const average = total > 0 ? Math.round(scoreSum / total) : "–";

  replaceChildren(container, [
    createSummaryItem(average, "Average score", "summary-average"),
    createSummaryItem(total, total === 1 ? "Plan" : "Plans", "summary-total"),
  ]);
}

/**
 * Build one saved-plan card. Buttons carry data-action + data-id so one
 * delegated click listener on #plan-list can handle every card.
 * @param {object} plan
 * @returns {HTMLLIElement}
 */
export function createPlanCard(plan) {
  const verdict = getVerdict(plan.score);
  const { maxTemp, minTemp, rainChance } = plan.weather;

  return createElement(
    "li",
    { className: "plan-card", dataset: { id: plan.id, verdict: verdict.key } },
    [
      createElement("div", { className: "plan-card__score", text: Math.round(plan.score) }),
      createElement("div", { className: "plan-card__body" }, [
        createElement("h2", { className: "plan-card__title", text: `${plan.activityTitle} in ${plan.city}` }),
        createElement("p", {
          className: "muted",
          text: `${formatDayAndDate(plan.date)} · ${formatTemp(maxTemp)} / ${formatTemp(minTemp)}C · ${formatPercent(rainChance)} rain`,
        }),
      ]),
      createElement("span", { className: `badge badge--${verdict.key}`, text: verdict.label }),
      createElement("div", { className: "plan-card__actions" }, [
        createElement("button", {
          className: "btn btn--ghost btn--sm",
          text: "Reopen",
          attrs: { type: "button", "aria-label": `Reopen ${plan.activityTitle} in ${plan.city}` },
          dataset: { action: "reopen", id: plan.id },
        }),
        createElement("button", {
          className: "btn btn--danger btn--sm",
          text: "Delete",
          attrs: { type: "button", "aria-label": `Delete ${plan.activityTitle} in ${plan.city}` },
          dataset: { action: "delete", id: plan.id },
        }),
      ]),
    ]
  );
}

/**
 * @param {HTMLElement} container - #plan-list (a <ul>)
 * @param {Array<object>} plans - already filtered + sorted
 */
export function renderPlanList(container, plans) {
  replaceChildren(container, plans.map(createPlanCard));
}
