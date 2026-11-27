// Author: Wise Randriamialison
// Student number: n10035720

import STORAGE from "./storage.js";

const cityInput = document.getElementById("city-input");
const activitySelect = document.getElementById("activity-select");
const daySelect = document.getElementById("day-select");
const searchError = document.getElementById("search-error");

const totalDays = 7;

const { activities, error } = await STORAGE.getActivities();

if (error) {
  searchError.textContent = error;
  searchError.hidden = false;
}

activities.forEach((activity) => {
  const option = document.createElement("option");
  option.value = activity.id;
  option.textContent = activity.title;
  activitySelect.appendChild(option);
});

for (let i = 0; i < totalDays; i++) {
  const option = document.createElement("option");
  option.value = i;

  if (i === 0) {
    option.textContent = "Today";
  } else if (i === 1) {
    option.textContent = "Tomorrow";
  } else {
    option.textContent = `In ${i} days`;
  }

  daySelect.appendChild(option);
}

// Keep the last search in the form (the page reloads with ?city=...&activity=...&day=...)
const params = new URLSearchParams(window.location.search);

if (params.get("city")) {
  cityInput.value = params.get("city");
}

if (params.get("activity")) {
  activitySelect.value = params.get("activity");
}

if (params.get("date")) {
  // A reopened plan sends a date: turn it into "in X days" from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const planDate = new Date(`${params.get("date")}T00:00:00`);
  const daysAway = Math.round((planDate - today) / (1000 * 60 * 60 * 24));

  if (daysAway >= 0 && daysAway < totalDays) {
    daySelect.value = daysAway;
  }
} else if (params.get("day")) {
  daySelect.value = params.get("day");
}
