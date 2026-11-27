// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class Cycling extends Activity {
  // Strong wind makes cycling unsafe, whatever the other conditions are
  calculateScore(day) {
    const score = super.calculateScore(day);
    if (day.windSpeed >= this.preferredWeather.windSpeed.acceptableMax) {
      return Math.min(score, 30);
    }
    return score;
  }

  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Helmet", "Bike lights", "Repair kit");
    return advice;
  }
}

export default Cycling;
