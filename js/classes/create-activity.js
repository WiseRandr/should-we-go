// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";
import Hiking from "./hiking.js";
import Cycling from "./cycling.js";
import Picnic from "./picnic.js";
import Photography from "./photography.js";
import Running from "./running.js";
import Camping from "./camping.js";
import BeachDay from "./beach-day.js";
import Walking from "./walking.js";

// Builds the right class for an activity from data/activities.json
function createActivity(data) {
  switch (data.id) {
    case "hiking":
      return new Hiking(data);
    case "cycling":
      return new Cycling(data);
    case "picnic":
      return new Picnic(data);
    case "outdoor-photography":
      return new Photography(data);
    case "running":
      return new Running(data);
    case "camping":
      return new Camping(data);
    case "beach-day":
      return new BeachDay(data);
    case "walking":
      return new Walking(data);
    default:
      return new Activity(data);
  }
}

export default createActivity;
