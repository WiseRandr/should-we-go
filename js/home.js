// Author: Wise Randriamialison
// Student number: n10035720

const activitySelect = document.getElementById("activity-select");
const daySelect = document.getElementById("day-select");
const searchError = document.getElementById("search-error");

const totalDays = 7;

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

async function showActivities() {
  const activities = await loadActivities();

  activities.forEach((activity) => {
    const option = document.createElement("option");
    option.value = activity.id;
    option.textContent = activity.title;
    activitySelect.appendChild(option);
  });
}

showActivities();

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
