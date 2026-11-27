// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class Hiking extends Activity {
  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Hiking boots", "Snacks", "Trail map");
    return advice;
  }
}

export default Hiking;
