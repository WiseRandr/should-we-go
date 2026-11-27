// Author: Wise Randriamialison
// Student number: n10035720

import STORAGE from "./storage.js";

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
