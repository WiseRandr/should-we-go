// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class BeachDay extends Activity {
  // Too cold for the beach means a low score, whatever the other conditions are
  calculateScore(day) {
    const score = super.calculateScore(day);
    if (day.maxTemp <= this.preferredWeather.temperature.acceptableMin) {
      return Math.min(score, 20);
    }
    return score;
  }

  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Towel", "Swimsuit", "Beach umbrella");
    return advice;
  }
}

export default BeachDay;
