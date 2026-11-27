// Author: Wise Randriamialison
// Student number: n10035720

import STORAGE from "./storage.js";
import { searchCity, getForecast } from "./api.js";
import createActivity from "./classes/create-activity.js";

const resultsEmpty = document.getElementById("results-empty");
const resultsLoading = document.getElementById("results-loading");
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

function showError(message) {
  resultsLoading.hidden = true;
  searchError.textContent = message;
  searchError.hidden = false;
}

async function showForecast() {
  if (!city) {
    resultsEmpty.hidden = false;
    return;
  }

  resultsLoading.hidden = false;

  const { activities, error } = await STORAGE.getActivities();

  if (error) {
    showError(error);
    return;
  }

  // City name -> coordinates -> 7-day forecast
  let place;
  let forecast;

  try {
    place = await searchCity(city);
    forecast = await getForecast(place.latitude, place.longitude);
  } catch (error) {
    if (error.message === "City not found") {
      showError(`We couldn't find "${city}". Check the spelling and try again.`);
    } else {
      showError("Could not load the forecast. Please try again later.");
    }
    return;
  }

  resultsLoading.hidden = true;

  const activityData = activities.find((item) => item.id === activityId) || activities[0];
  const activity = createActivity(activityData);

  // Add a score to every day
  const days = forecast.map((day) => ({ ...day, score: activity.calculateScore(day) }));

  const selectedDay = days[dayIndex] || days[0];
  const verdict = getVerdict(selectedDay.score);
  const warnings = activity.getWarnings(selectedDay);
  const advice = activity.getAdvice(selectedDay);

  // Header
  // e.g. "Toronto, Ontario, Canada" (filter removes parts the API didn't send)
  resultsLocation.textContent = [place.name, place.admin1, place.country].filter((part) => part).join(", ");
  resultsActivity.textContent = activity.title;

  // Forecast day cards
  days.forEach((day, index) => {
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
  ];

  // Only shown when the API sends them
  if (selectedDay.uvIndex !== undefined) {
    stats.push({ label: "UV index", value: Math.round(selectedDay.uvIndex) });
  }
  if (selectedDay.humidity !== undefined) {
    stats.push({ label: "Humidity", value: `${Math.round(selectedDay.humidity)}%` });
  }

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

  // Warnings (shown as a green "all good" line when there are none)
  if (warnings.length === 0) {
    warningsList.className = "note-list note-list--advice";
    warnings.push("No warnings, conditions look good.");
  }

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
