// Author: Wise Randriamialison
// Student number: n10035720

const FACTOR_LABELS = {
  temperature: { label: "Temperature", unit: "°C" },
  precipitationProbability: { label: "Rain chance", unit: "%" },
  windSpeed: { label: "Wind", unit: " km/h" },
  uvIndex: { label: "UV index", unit: "" },
  humidity: { label: "Humidity", unit: "%" },
};

class Activity {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.preferredWeather = data.preferredWeather;
  }

  // Match the forecast day from api.js to the factor names in activities.json
  getWeatherValues(day) {
    return {
      temperature: day.maxTemp,
      precipitationProbability: day.rainChance,
      windSpeed: day.windSpeed,
      uvIndex: day.uvIndex,
      humidity: day.humidity,
    };
  }

  // 1 = ideal, 0 = outside the acceptable range, between 0 and 1 = in between
  scoreFactor(value, rule) {
    if (rule.idealMin !== undefined && value < rule.idealMin) {
      if (value <= rule.acceptableMin) {
        return 0;
      }
      return (value - rule.acceptableMin) / (rule.idealMin - rule.acceptableMin);
    }

    if (rule.idealMax !== undefined && value > rule.idealMax) {
      if (value >= rule.acceptableMax) {
        return 0;
      }
      return (rule.acceptableMax - value) / (rule.acceptableMax - rule.idealMax);
    }

    return 1;
  }

  // Only the factors the forecast has a value for (the API can leave some out)
  getAvailableFactors(day) {
    const values = this.getWeatherValues(day);
    return Object.keys(this.preferredWeather).filter(
      (name) => values[name] !== undefined && values[name] !== null
    );
  }

  calculateScore(day) {
    const values = this.getWeatherValues(day);
    const factors = this.getAvailableFactors(day);

    const totals = factors.reduce(
      (sum, name) => {
        const rule = this.preferredWeather[name];
        return {
          points: sum.points + this.scoreFactor(values[name], rule) * rule.weight,
          weight: sum.weight + rule.weight,
        };
      },
      { points: 0, weight: 0 }
    );

    if (totals.weight === 0) {
      return 0;
    }

    // Divide by the weight used so the score stays out of 100 when a factor is missing
    return Math.round((totals.points / totals.weight) * 100);
  }

  getWarnings(day) {
    const values = this.getWeatherValues(day);
    const warnings = [];

    this.getAvailableFactors(day).forEach((name) => {
      const rule = this.preferredWeather[name];
      const value = values[name];
      const { label, unit } = FACTOR_LABELS[name];
      const shown = `${Math.round(value)}${unit}`;
      const activityName = this.title.toLowerCase();

      if (this.scoreFactor(value, rule) === 0) {
        warnings.push(`${label} (${shown}) is outside the acceptable range for ${activityName}.`);
      } else if (rule.idealMax !== undefined && value > rule.idealMax) {
        warnings.push(`${label} (${shown}) is above the ideal ${rule.idealMax}${unit} for ${activityName}.`);
      } else if (rule.idealMin !== undefined && value < rule.idealMin) {
        warnings.push(`${label} (${shown}) is below the ideal ${rule.idealMin}${unit} for ${activityName}.`);
      }
    });

    return warnings;
  }

  getAdvice(day) {
    const advice = ["Water"];

    if (day.rainChance >= 40) {
      advice.push("Rain jacket or umbrella");
    }
    if (day.maxTemp <= 5) {
      advice.push("Warm layers, hat and gloves");
    } else if (day.maxTemp <= 12) {
      advice.push("A warm layer");
    }
    if (day.maxTemp >= 25) {
      advice.push("Extra water and a hat");
    }
    if (day.uvIndex >= 6) {
      advice.push("Sunscreen and sunglasses");
    }
    if (day.windSpeed >= 30) {
      advice.push("Windproof jacket");
    }

    return advice;
  }
}

export default Activity;
