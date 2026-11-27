  // Get the HTML elements
  const weatherForm = document.getElementById("weatherForm");
  const cityInput = document.getElementById("city");
  const activityInput = document.getElementById("activity");
  const dayInput = document.getElementById("day");
  const results = document.getElementById("results");

  // Listen for the form submission
  weatherForm.addEventListener("submit", function (event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Get the user's information
    const city = cityInput.value.trim();
    const activity = activityInput.value;
    const day = dayInput.value;

    // Check if the city is empty
    if (city == "") {
      results.textContent = "Please enter a city!";
      return;
    }
    // Display a sample forecast
    displayForcast(city, activity, day);

    // MAKE the flipping sample forecast
    function displayForcast(city, activity, day) {
      // Clear previous results – Removes the previous weather results from the page.
      results.textContent = "";
      // Create the main card – Creates the main container for the weather forecast.
      const main = document.createElement("div");
      main.classList.add("main-card");
      // Create the header – Creates the header section of the weather card.
      const header = document.createElement("div");
      header.classList.add("header-card");

      const cityHeader = document.createElement("h3");
      cityHeader.textContent = city;

      const status = document.createElement("span");
      status.textContent = "Good to go!";

      header.append(cityHeader, status);

      // Create the main weather section – Creates the section containing the main weather information.
      const weatherMain = document.createElement("div");
      weatherMain.classList.add("weather-card");

      const weatherIcon = document.createElement("span");
          weatherIcon.classList.add("weather-icon");
          weatherIcon.textContent = "🌤️";

        const weatherInfo = document.createElement("div");

          const temperature = document.createElement("p");
          temperature.classList.add("temperature");
          temperature.textContent = "22*C";

          const description = document.createElement("p");
          description.classList.add("weather-description");
          description.textContent = "Partly Cloudy";

        weatherInfo.append(temperature, description);

        // Create suitability score – Creates the score showing how suitable the weather is for the activity.
        const score = document.createElement("div");
        score.classList.add("score");

          const scoreNumber = document.createElement("h3");
          score.textContent = "85/100";

          const scoreLabel = document.createElement("p");
          scoreLabel.textContent = "Sustainability";

        score.append(scoreNumber,scoreLabel)
      
      weatherMain.append(weatherIcon, weatherInfo, score)
      // Create weather details – Creates the section displaying wind, rain chance, and temperature.
      const details = document.createElement("div")
      details.classList.add("weather-details")

        const wind = createDetail("💨", "10 km/h", "Wind")
        const rain = createDetail("🌧️", "10%", "Rain chance")
        const temp = createDetail("🌡️", "22°C", "Tempereture")
      
      details.append(wind,rain,temp)
      // Create packing advice – Creates the section containing recommendations for what to bring.
      const advice = document.createElement("div")
      advice.classList.add("weather-advice")

        const adviceHeading = document.createElement("h4")
        adviceHeading.textContent = "🎒 Packing Advice"

        const adviceText = document.createElement("p")
        adviceText.textContent = "Bring water, sunscreen and stuff gang"

      advice.append(adviceHeading, adviceText)

      // Put everything inside the card – Adds all the sections into the main weather card.
      main.append(header,weatherMain,details,advice);

      // Display the card – Adds the completed weather card to the webpage.
      results.appendChild(main);

      // Function to create weather detail boxes – Creates individual weather detail boxes using an icon, value, and label.
    }

    function createDetail(icon, value, label){
      const detail = document.createElement("div");
      detail.classList.add("detail");

        const detailIcon = document.createElement("p");
        detailIcon.textContent = icon;

        const detailValue = document.createElement("p");
        detailValue.textContent = value;

        const detailLabel = document.createElement("p");
        detailLabel.textContent = label;

      detail.append(detailIcon, detailValue, detailLabel);

      return detail;
    }
  });
