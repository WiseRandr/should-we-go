// Author: Wise Randriamialison
// Student number: n10035720

const resultsEmpty = document.getElementById("results-empty");
const resultsContent = document.getElementById("results-content");
const resultsLocation = document.getElementById("results-location");
const resultsActivity = document.getElementById("results-activity");
const forecastList = document.getElementById("forecast-list");
const verdictCard = document.getElementById("verdict");
const scoreRing = document.getElementById("score-ring");
const scoreValue = document.getElementById("score-value");
const verdictBadge = document.getElementById("verdict-badge");
const verdictTitle = document.getElementById("verdict-title");
const verdictSummary = document.getElementById("verdict-summary");
const weatherStats = document.getElementById("weather-stats");
const warningsList = document.getElementById("warnings-list");
const adviceList = document.getElementById("advice-list");
const searchError = document.getElementById("search-error");

// Sample data until the API and scoring are connected
const forecast = [
  { date: "2026-11-26", maxTemp: 8, minTemp: 1, rainChance: 45, windSpeed: 24, uvIndex: 2, humidity: 72, score: 58 },
  { date: "2026-11-27", maxTemp: 12, minTemp: 4, rainChance: 10, windSpeed: 12, uvIndex: 3, humidity: 55, score: 81 },
  { date: "2026-11-28", maxTemp: 5, minTemp: -2, rainChance: 70, windSpeed: 31, uvIndex: 1, humidity: 88, score: 32 },
  { date: "2026-11-29", maxTemp: 9, minTemp: 2, rainChance: 30, windSpeed: 18, uvIndex: 2, humidity: 66, score: 64 },
  { date: "2026-11-30", maxTemp: 11, minTemp: 3, rainChance: 15, windSpeed: 16, uvIndex: 3, humidity: 60, score: 76 },
  { date: "2026-12-01", maxTemp: 7, minTemp: 0, rainChance: 40, windSpeed: 22, uvIndex: 2, humidity: 70, score: 51 },
  { date: "2026-12-02", maxTemp: 3, minTemp: -4, rainChance: 80, windSpeed: 35, uvIndex: 1, humidity: 90, score: 24 },
];

const warnings = [
  "Rain chance is above the ideal 20% for hiking.",
  "Wind gusts may make exposed trails uncomfortable.",
];

const advice = ["Waterproof jacket", "Warm layer and gloves", "Water and snacks"];

const params = new URLSearchParams(window.location.search);
const city = params.get("city");
const activityId = params.get("activity");
const dayIndex = Number(params.get("day")) || 0;

function getVerdict(score) {
  if (score >= 70) {
    return { key: "go", label: "Go", title: "Great day for it" };
  } else if (score >= 40) {
    return { key: "maybe", label: "Maybe", title: "Doable, but come prepared" };
  } else {
    return { key: "nogo", label: "Stay home", title: "Better pick another day" };
  }
}

function formatDate(date, options) {
  // Add a time so the date is read in local time, not UTC
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-CA", options);
}

async function loadActivities() {
  try {
    const response = await fetch("data/activities.json");

    if (!response.ok) {
      throw new Error("Could not load activities");
    }

    const data = await response.json();
    return data.activities;
  } catch (error) {
    console.log(error.message);
    searchError.textContent = "Could not load the activities. Please refresh the page.";
    searchError.hidden = false;
    return [];
  }
}

async function showForecast() {
  if (!city) {
    resultsEmpty.hidden = false;
    return;
  }

  const activities = await loadActivities();

  if (activities.length === 0) {
    return;
  }

  const activity = activities.find((item) => item.id === activityId) || activities[0];
  const selectedDay = forecast[dayIndex] || forecast[0];
  const verdict = getVerdict(selectedDay.score);

  // Header
  resultsLocation.textContent = city;
  resultsActivity.textContent = activity.title;

  // Forecast day cards
  forecast.forEach((day, index) => {
    const dayVerdict = getVerdict(day.score);

    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "forecast-card";
    button.dataset.day = index;

    if (index === dayIndex) {
      button.classList.add("is-selected");
    }

    const weekday = document.createElement("span");
    weekday.className = "forecast-card__day";
    weekday.textContent = formatDate(day.date, { weekday: "short" });

    const date = document.createElement("span");
    date.className = "forecast-card__date";
    date.textContent = formatDate(day.date, { month: "short", day: "numeric" });

    const temp = document.createElement("span");
    temp.className = "forecast-card__temp";
    temp.textContent = `${Math.round(day.maxTemp)}° / ${Math.round(day.minTemp)}°`;

    const badge = document.createElement("span");
    badge.className = `badge badge--${dayVerdict.key}`;
    badge.textContent = day.score;

    button.appendChild(weekday);
    button.appendChild(date);
    button.appendChild(temp);
    button.appendChild(badge);
    li.appendChild(button);
    forecastList.appendChild(li);
  });

  // Score + verdict
  verdictCard.dataset.verdict = verdict.key;
  scoreRing.style.setProperty("--score", selectedDay.score);
  scoreRing.setAttribute("aria-label", `Suitability score ${selectedDay.score} out of 100`);
  scoreValue.textContent = selectedDay.score;
  verdictBadge.className = `badge badge--${verdict.key}`;
  verdictBadge.textContent = verdict.label;
  verdictTitle.textContent = verdict.title;
  verdictSummary.textContent = `${activity.title} on ${formatDate(selectedDay.date, {
    weekday: "long",
    month: "short",
    day: "numeric",
  })}.`;

  // Weather details
  const stats = [
    { label: "Temperature", value: `${Math.round(selectedDay.maxTemp)}° / ${Math.round(selectedDay.minTemp)}°C` },
    { label: "Rain chance", value: `${selectedDay.rainChance}%` },
    { label: "Wind", value: `${Math.round(selectedDay.windSpeed)} km/h` },
    { label: "UV index", value: selectedDay.uvIndex },
    { label: "Humidity", value: `${selectedDay.humidity}%` },
  ];

  stats.forEach((stat) => {
    const div = document.createElement("div");
    div.className = "weather-stat";

    const dt = document.createElement("dt");
    dt.textContent = stat.label;

    const dd = document.createElement("dd");
    dd.textContent = stat.value;

    div.appendChild(dt);
    div.appendChild(dd);
    weatherStats.appendChild(div);
  });

  // Warnings
  warnings.forEach((warning) => {
    const li = document.createElement("li");
    li.textContent = warning;
    warningsList.appendChild(li);
  });

  // Packing advice
  advice.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    adviceList.appendChild(li);
  });

  resultsContent.hidden = false;
}

showForecast();
