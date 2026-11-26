// Author: Wise Randriamialison
// Student number: n10035720

// Runs in the <head> before the page is drawn, so there is no flash of the wrong theme
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

let theme = savedTheme || (prefersDark ? "dark" : "light");
document.documentElement.dataset.theme = theme;

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  themeToggle.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  });

  updateToggle();
});
