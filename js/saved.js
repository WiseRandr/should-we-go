// Author: Wise Randriamialison
// Student number: n10035720

import STORAGE from "./storage.js";

const filterActivity = document.getElementById("filter-activity");
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

const { activities, error: activitiesError } = await STORAGE.getActivities();
const { plans, error: plansError } = await STORAGE.getPlans();

if (activitiesError || plansError) {
  savedError.textContent = plansError || activitiesError;
  savedError.hidden = false;
}

// Activity filter options
activities.forEach((activity) => {
  const option = document.createElement("option");
  option.value = activity.id;
  option.textContent = activity.title;
  filterActivity.appendChild(option);
});

// Summary
const totalScore = plans.reduce((sum, plan) => sum + plan.score, 0);
summaryTotal.textContent = plans.length;
summaryAverage.textContent = plans.length > 0 ? Math.round(totalScore / plans.length) : "–";

// Empty state
if (plans.length === 0 && !plansError) {
  savedEmpty.hidden = false;
}

// Plan cards
plans.forEach((plan) => {
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
  planList.appendChild(li);
});
