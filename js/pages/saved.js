// saved.html — saved plans with summary, filters and sort.

import { getById } from "../utils/dom.js";
import { renderHeader, renderFooter } from "../components/layout.js";
import { renderActivityOptions } from "../components/form.js";
import { renderEmpty, clearState } from "../components/states.js";
import { renderSummary, renderPlanList } from "../components/saved-plans.js";
import { SAMPLE_ACTIVITIES, SAMPLE_PLANS } from "../sample-data.js";

// TODO: replace sample data with data/activities.json and storage.js
const activities = SAMPLE_ACTIVITIES;
const plans = SAMPLE_PLANS;

renderHeader(getById("site-header"), { activePage: "saved", savedCount: plans.length });
renderFooter(getById("site-footer"));

renderActivityOptions(getById("filter-activity"), activities, { allLabel: "All activities" });
renderSummary(getById("saved-summary"), plans);
renderPlanList(getById("plan-list"), plans);

if (plans.length === 0) {
  renderEmpty(getById("saved-state"), {
    icon: "🎒",
    message: "No saved plans yet. Check the weather and save a plan to compare it later.",
    action: { label: "Plan an activity", href: "index.html" },
  });
} else {
  clearState(getById("saved-state"));
}
