// Shared page chrome: header + footer.
// Each HTML page has <div id="site-header"></div> and <div id="site-footer"></div>.

import { createElement, replaceChildren } from "../utils/dom.js";

const NAV_LINKS = [
  { page: "plan", label: "Plan", href: "index.html" },
  { page: "saved", label: "Saved plans", href: "saved.html" },
];

/**
 * @param {HTMLElement} container - #site-header
 * @param {object} options
 * @param {"plan"|"saved"} options.activePage - highlights the current nav link
 * @param {number} [options.savedCount] - badge next to "Saved plans"
 */
export function renderHeader(container, { activePage, savedCount = 0 } = {}) {
  const brand = createElement("a", { className: "brand", attrs: { href: "index.html" } }, [
    createElement("span", { className: "brand__mark", text: "⛰", attrs: { "aria-hidden": "true" } }),
    createElement("span", { className: "brand__name", text: "Should We Go?" }),
  ]);

  const navItems = NAV_LINKS.map((link) => {
    const anchor = createElement("a", { className: "nav__link", text: link.label, attrs: { href: link.href } });

    if (link.page === activePage) {
      anchor.setAttribute("aria-current", "page");
    }

    if (link.page === "saved") {
      anchor.appendChild(
        createElement("span", { className: "nav__count", text: savedCount, attrs: { id: "saved-count" } })
      );
    }

    return createElement("li", {}, [anchor]);
  });

  const nav = createElement("nav", { attrs: { "aria-label": "Main" } }, [
    createElement("ul", { className: "nav", attrs: { role: "list" } }, navItems),
  ]);

  const header = createElement("header", { className: "site-header" }, [
    createElement("div", { className: "container site-header__inner" }, [brand, nav]),
  ]);

  replaceChildren(container, [
    createElement("a", { className: "skip-link", text: "Skip to content", attrs: { href: "#main" } }),
    header,
  ]);
}

/** Update only the saved-plans badge (e.g. after saving or deleting). */
export function updateSavedCount(count) {
  const badge = document.getElementById("saved-count");
  if (badge) {
    badge.textContent = count;
  }
}

/** @param {HTMLElement} container - #site-footer */
export function renderFooter(container) {
  const footer = createElement("footer", { className: "site-footer" }, [
    createElement("div", { className: "container" }, [
      createElement("p", {}, [
        "Should We Go? · CPAN 113 Group 5 · Weather data by ",
        createElement("a", { text: "Open-Meteo", attrs: { href: "https://open-meteo.com/" } }),
      ]),
    ]),
  ]);

  replaceChildren(container, [footer]);
}
