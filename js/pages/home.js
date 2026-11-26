// index.html — search page.
// The form submits with GET to forecast.html?city=...&activity=...&day=...

import { getById } from "../utils/dom.js";
import { renderHeader, renderFooter } from "../components/layout.js";
import { renderActivityOptions, renderDayOptions } from "../components/form.js";
import { SAMPLE_ACTIVITIES, SAMPLE_PLANS } from "../sample-data.js";

// TODO: replace sample data with data/activities.json and the saved plans from storage.js
const activities = SAMPLE_ACTIVITIES;
const savedPlans = SAMPLE_PLANS;

renderHeader(getById("site-header"), { activePage: "plan", savedCount: savedPlans.length });
renderFooter(getById("site-footer"));

renderActivityOptions(getById("activity-select"), activities);
renderDayOptions(getById("day-select"));
