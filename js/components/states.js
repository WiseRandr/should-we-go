// Loading, empty and error states.

import { createElement, replaceChildren, clearElement } from "../utils/dom.js";

/** Show a spinner + message inside a container. */
export function renderLoading(container, message = "Checking the sky…") {
  replaceChildren(container, [
    createElement("div", { className: "state state--loading" }, [
      createElement("span", { className: "spinner", attrs: { "aria-hidden": "true" } }),
      createElement("p", { text: message }),
    ]),
  ]);
  container.hidden = false;
}

/**
 * Show an empty-state message.
 * @param {HTMLElement} container
 * @param {object} options
 * @param {string} options.message
 * @param {string} [options.icon] - an emoji
 * @param {{label: string, href: string}} [options.action] - optional link button
 */
export function renderEmpty(container, { message, icon = "🌤", action } = {}) {
  const children = [
    createElement("p", { className: "state__icon", text: icon, attrs: { "aria-hidden": "true" } }),
    createElement("p", { text: message }),
  ];

  if (action) {
    children.push(createElement("a", { className: "btn btn--primary", text: action.label, attrs: { href: action.href } }));
  }

  replaceChildren(container, [createElement("div", { className: "state" }, children)]);
  container.hidden = false;
}

/** Hide and empty a state container. */
export function clearState(container) {
  clearElement(container);
  container.hidden = true;
}

/**
 * Show the visible error message (required by the proposal for API failures).
 * The element should have role="alert" in the HTML so screen readers announce it.
 */
export function showError(element, message) {
  element.textContent = message;
  element.hidden = false;
}

export function hideError(element) {
  element.textContent = "";
  element.hidden = true;
}
