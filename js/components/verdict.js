// Suitability score ring + verdict text.

import { createElement, replaceChildren } from "../utils/dom.js";

// Score thresholds -> verdict. key matches the CSS: badge--go, data-verdict="go", etc.
const VERDICTS = [
  { min: 70, key: "go", label: "Go", headline: "Great day for it" },
  { min: 40, key: "maybe", label: "Maybe", headline: "Doable, but come prepared" },
  { min: 0, key: "nogo", label: "Stay home", headline: "Better pick another day" },
];

/**
 * @param {number} score - 0 to 100
 * @returns {{key: string, label: string, headline: string}}
 */
export function getVerdict(score) {
  return VERDICTS.find((verdict) => score >= verdict.min) ?? VERDICTS[VERDICTS.length - 1];
}

/** The circular score graphic. The ring fill comes from the --score CSS variable. */
export function createScoreRing(score) {
  const rounded = Math.round(score);

  return createElement(
    "div",
    {
      className: "score-ring",
      style: { "--score": rounded },
      attrs: { role: "img", "aria-label": `Suitability score ${rounded} out of 100` },
    },
    [
      createElement("span", { className: "score-ring__value", text: rounded }),
      createElement("span", { className: "score-ring__max", text: "/ 100" }),
    ]
  );
}

/**
 * Render the verdict card.
 *
 * @param {HTMLElement} container - #verdict (has class "card verdict")
 * @param {object} data
 * @param {number} data.score - 0 to 100
 * @param {string} data.summary - one-sentence explanation
 * @param {string} [data.headline] - overrides the default headline for the verdict
 * @param {boolean} [data.showSaveButton=true]
 */
export function renderVerdict(container, { score, summary, headline, showSaveButton = true }) {
  const verdict = getVerdict(score);

  // Drives the colors in main.css (.verdict[data-verdict="go"] ...)
  container.dataset.verdict = verdict.key;

  const text = createElement("div", { className: "verdict__text" }, [
    createElement("span", { className: `badge badge--${verdict.key}`, text: verdict.label }),
    createElement("h2", { className: "verdict__title", text: headline ?? verdict.headline }),
    createElement("p", { className: "muted", text: summary }),
    showSaveButton
      ? createElement("button", {
          className: "btn btn--primary",
          text: "Save this plan",
          attrs: { type: "button", id: "save-plan-btn" },
        })
      : null,
  ]);

  replaceChildren(container, [createScoreRing(score), text]);
}
