// DOM helpers used by every component.
// Everything is built with document.createElement + textContent + appendChild
// (never innerHTML), so API text can't inject HTML.

/**
 * Create an element in one call.
 *
 * @param {string} tag - e.g. "div", "li", "button"
 * @param {object} [options]
 * @param {string} [options.className] - CSS classes, e.g. "card verdict"
 * @param {string|number} [options.text] - textContent
 * @param {object} [options.attrs] - attributes, e.g. { type: "button", "aria-label": "..." }
 * @param {object} [options.dataset] - data-* attributes, e.g. { id: "plan-1" } -> data-id="plan-1"
 * @param {object} [options.style] - CSS properties / variables, e.g. { "--score": 72 }
 * @param {Array<Node|string>} [children] - elements or strings to append inside
 * @returns {HTMLElement}
 *
 * @example
 * createElement("button", { className: "btn", text: "Save", attrs: { type: "button" } });
 */
export function createElement(tag, options = {}, children = []) {
  const element = document.createElement(tag);
  const { className, text, attrs, dataset, style } = options;

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null) {
    element.textContent = text;
  }

  if (attrs) {
    for (const [name, value] of Object.entries(attrs)) {
      element.setAttribute(name, value);
    }
  }

  if (dataset) {
    for (const [key, value] of Object.entries(dataset)) {
      element.dataset[key] = value;
    }
  }

  if (style) {
    for (const [property, value] of Object.entries(style)) {
      element.style.setProperty(property, value);
    }
  }

  appendChildren(element, children);
  return element;
}

/**
 * Append a list of children to a parent. Strings become text nodes,
 * null/undefined/false are skipped (handy for optional pieces).
 */
export function appendChildren(parent, children = []) {
  children.forEach((child) => {
    if (child === null || child === undefined || child === false) {
      return;
    }
    const node = typeof child === "string" || typeof child === "number"
      ? document.createTextNode(String(child))
      : child;
    parent.appendChild(node);
  });
  return parent;
}

/** Remove everything inside an element. */
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  return element;
}

/** Clear a container, then fill it with new children. */
export function replaceChildren(container, children = []) {
  clearElement(container);
  return appendChildren(container, children);
}

/** document.getElementById that throws a clear error if the placeholder is missing. */
export function getById(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Placeholder #${id} was not found in the HTML.`);
  }
  return element;
}
