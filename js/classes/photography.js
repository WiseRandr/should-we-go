// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class Photography extends Activity {
  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Charged batteries", "Memory card");
    if (day.rainChance >= 30) {
      advice.push("Rain cover for the camera");
    }
    return advice;
  }
}

export default Photography;
