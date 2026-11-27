// Author: Wise Randriamialison
// Student number: n10035720

import STORAGE from "./storage.js";

const savedToolbar = document.getElementById("saved-toolbar");
const filterActivity = document.getElementById("filter-activity");
const filterVerdict = document.getElementById("filter-verdict");
const sortPlans = document.getElementById("sort-plans");
const savedNoMatch = document.getElementById("saved-no-match");
const summaryAverage = document.getElementById("summary-average");
const summaryTotal = document.getElementById("summary-total");
const savedEmpty = document.getElementById("saved-empty");
const planList = document.getElementById("plan-list");
const savedError = document.getElementById("saved-error");

function getVerdict(score) {
  if (score >= 70) {
    return { key: "go", label: "Go" };
  } else if (score >= 40) {
    return { key: "maybe", label: "Maybe" };
  } else {
    return { key: "nogo", label: "Stay home" };
  }
}

function showError(message) {
  savedError.textContent = message;
  savedError.hidden = false;
}

function createPlanCard(plan) {
  const verdict = getVerdict(plan.score);
  const date = new Date(`${plan.date}T00:00:00`).toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const li = document.createElement("li");
  li.className = "plan-card";
  li.dataset.id = plan.id;
  li.dataset.verdict = verdict.key;

  const score = document.createElement("div");
  score.className = "plan-card__score";
  score.textContent = plan.score;

  const body = document.createElement("div");
  body.className = "plan-card__body";

  const title = document.createElement("h2");
  title.className = "plan-card__title";
  title.textContent = `${plan.activityTitle} in ${plan.city}`;

  const details = document.createElement("p");
  details.className = "muted";
  details.textContent = `${date} · ${plan.weather.maxTemp}° / ${plan.weather.minTemp}°C · ${plan.weather.rainChance}% rain`;

  body.appendChild(title);
  body.appendChild(details);

  const badge = document.createElement("span");
  badge.className = `badge badge--${verdict.key}`;
  badge.textContent = verdict.label;

  const actions = document.createElement("div");
  actions.className = "plan-card__actions";

  const reopenButton = document.createElement("button");
  reopenButton.type = "button";
  reopenButton.className = "btn btn--ghost btn--sm";
  reopenButton.textContent = "Reopen";
  reopenButton.dataset.action = "reopen";
  reopenButton.dataset.id = plan.id;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "btn btn--danger btn--sm";
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.id = plan.id;

  actions.appendChild(reopenButton);
  actions.appendChild(deleteButton);

  li.appendChild(score);
  li.appendChild(body);
  li.appendChild(badge);
  li.appendChild(actions);
  return li;
}

function filterPlans(list) {
  return list.filter((plan) => {
    const matchesActivity = filterActivity.value === "all" || plan.activityId === filterActivity.value;
    const matchesVerdict = filterVerdict.value === "all" || getVerdict(plan.score).key === filterVerdict.value;
    return matchesActivity && matchesVerdict;
  });
}

function sortList(list) {
  // Copy with spread so sort() doesn't change the original array
  const sorted = [...list];

  switch (sortPlans.value) {
    case "date-asc":
      return sorted.sort((a, b) => a.date.localeCompare(b.date));
    case "date-desc":
      return sorted.sort((a, b) => b.date.localeCompare(a.date));
    case "score-desc":
      return sorted.sort((a, b) => b.score - a.score);
    case "score-asc":
      return sorted.sort((a, b) => a.score - b.score);
    default:
      // "saved-desc": latest saved first
      return sorted.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  }
}

// Draws the summary + the list. Called on load, after a delete and when a filter/sort changes.
function showPlans() {
  const shownPlans = sortList(filterPlans(plans));

  // Summary of the plans currently shown
  const totalScore = shownPlans.reduce((sum, plan) => sum + plan.score, 0);
  summaryTotal.textContent = shownPlans.length;
  summaryAverage.textContent = shownPlans.length > 0 ? Math.round(totalScore / shownPlans.length) : "–";

  // Empty states: nothing saved at all vs nothing matching the filters
  savedEmpty.hidden = plans.length > 0 || plansError !== null;
  savedNoMatch.hidden = plans.length === 0 || shownPlans.length > 0;

  // Plan cards
  planList.innerHTML = "";
  shownPlans.forEach((plan) => {
    planList.appendChild(createPlanCard(plan));
  });
}

const { activities, error: activitiesError } = await STORAGE.getActivities();
const { plans: savedPlans, error: plansError } = await STORAGE.getPlans();
let plans = savedPlans;

if (activitiesError || plansError) {
  showError(plansError || activitiesError);
}

// Activity filter options
activities.forEach((activity) => {
  const option = document.createElement("option");
  option.value = activity.id;
  option.textContent = activity.title;
  filterActivity.appendChild(option);
});

showPlans();

// Any filter or sort change redraws the list
savedToolbar.addEventListener("change", showPlans);

// One listener for every Reopen / Delete button (event delegation)
planList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const plan = plans.find((item) => item.id === button.dataset.id);

  if (!plan) {
    return;
  }

  if (button.dataset.action === "reopen") {
    const params = new URLSearchParams({ city: plan.city, activity: plan.activityId, date: plan.date });
    window.location.href = `index.html?${params.toString()}#results`;
  }

  if (button.dataset.action === "delete") {
    if (!confirm(`Delete "${plan.activityTitle} in ${plan.city}"?`)) {
      return;
    }

    const { plans: updatedPlans, error } = await STORAGE.deletePlan(plan.id);

    if (error) {
      showError(error);
      return;
    }

    plans = updatedPlans;
    showPlans();
  }
});
