// Warnings + packing advice cards (same list layout, different style).

import { createElement, replaceChildren } from "../utils/dom.js";

/**
 * @param {HTMLElement} container - a .card placeholder (#warnings or #advice)
 * @param {object} data
 * @param {string} data.title - card heading
 * @param {string[]} data.items - one string per line
 * @param {"warning"|"advice"} data.variant - picks the icon + color
 * @param {string} [data.emptyText] - shown when items is empty
 */
export function renderNoteCard(container, { title, items, variant, emptyText = "Nothing to note." }) {
  const content = items.length > 0
    ? createElement(
        "ul",
        { className: `note-list note-list--${variant}`, attrs: { role: "list" } },
        items.map((item) => createElement("li", { text: item }))
      )
    : createElement("p", { className: "muted", text: emptyText });

  replaceChildren(container, [
    createElement("h2", { className: "card__title", text: title }),
    content,
  ]);
}

/** Shortcut for the warnings card. */
export function renderWarnings(container, warnings) {
  renderNoteCard(container, {
    title: "Warnings",
    items: warnings,
    variant: "warning",
    emptyText: "No warnings. Conditions look fine.",
  });
}

/** Shortcut for the packing advice card. */
export function renderAdvice(container, advice) {
  renderNoteCard(container, {
    title: "Packing advice",
    items: advice,
    variant: "advice",
    emptyText: "Nothing special to pack.",
  });
}
