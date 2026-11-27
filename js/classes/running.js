// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class Running extends Activity {
  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Running shoes", "Light, breathable clothes");
    return advice;
  }
}

export default Running;
