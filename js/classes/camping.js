// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class Camping extends Activity {
  // Camping lasts all night, so the low temperature matters too
  calculateScore(day) {
    const score = super.calculateScore(day);
    if (day.minTemp <= this.preferredWeather.temperature.acceptableMin) {
      return Math.min(score, 30);
    }
    return score;
  }

  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Tent", "Sleeping bag", "Flashlight");
    return advice;
  }
}

export default Camping;
