// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class Walking extends Activity {
  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Comfortable shoes");
    return advice;
  }
}

export default Walking;
