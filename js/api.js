// Author: ME

async function searchCity(city){ // receives city name, async allows us to use await

    try{ // attempts to run the city search

const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`; // API address with the city name

console.log(url); // prints the API address

const response = await fetch(url); // sends a request and waits for the response

if (!response.ok){ // checks if the HTTP request failed
    throw new Error("City search failed"); // triggers an error
}

const data = await response.json(); // converts JSON into JavaScript data

if (!data.results){ // checks if the results property is missing
    throw new Error("City not found"); // triggers an error if city results are missing
}

return data.results[0]; // returns the first city result

    } catch (error){ // catches errors from the try block
        console.log(error.message); // prints the error message
        throw error; // passes the error to the calling function
    }
}


async function getForecast(latitude, longitude){ // receives latitude and longitude

    try{ // attempts to retrieve weather data

const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto`; // requests daily weather forecasts

const response = await fetch(url); // sends a request to the weather API

    if (!response.ok){ // checks if the HTTP request failed
        throw new Error("Forecast request failed"); // triggers an error
    }

const data = await response.json(); // converts JSON into JavaScript data

console.log("----- weather forecast -----");
console.log(data.daily); // prints the daily weather data

// normalizing the weather data for each forecast day
const weather = data.daily.time.map((day,i)=>({
    date: day, // stores the date
    maxTemp: data.daily.temperature_2m_max[i], // highest temperature
    minTemp: data.daily.temperature_2m_min[i], // lowest temperature
    rainChance: data.daily.precipitation_probability_max[i], // chance of precipitation
    windSpeed: data.daily.wind_speed_10m_max[i] // highest wind speed
}));

console.log("----- normalized data -----");
console.log(weather); // prints the normalized weather data
return weather; // returns the forecasts so other functions can use them

    } catch (error){ // catches errors from the forecast request
        console.log(error.message); // prints the error message
        throw error; // passes the error to the calling function
    }
}

console.log("----- city search -----");
/*
const cityData = await searchCity("Toronto"); // waits for and stores the returned city data

console.log("City:",cityData.name); // prints city name
console.log("Latitude:",cityData.latitude); // prints latitude
console.log("Longitude:",cityData.longitude); // prints longitude

await getForecast(cityData.latitude,cityData.longitude); // passes the coordinates to the forecast function
*/
export {searchCity, getForecast}; // allows other modules to import both functions