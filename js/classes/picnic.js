// Author: Wise Randriamialison
// Student number: n10035720

import Activity from "./activity.js";

class Picnic extends Activity {
  // Likely rain ruins a picnic, whatever the other conditions are
  calculateScore(day) {
    const score = super.calculateScore(day);
    if (day.rainChance >= this.preferredWeather.precipitationProbability.acceptableMax) {
      return Math.min(score, 30);
    }
    return score;
  }

  getAdvice(day) {
    const advice = super.getAdvice(day);
    advice.push("Blanket", "Food and drinks", "Garbage bag");
    return advice;
  }
}

export default Picnic;
