document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city)
      .then((coord) => get5DayForecast(coord.lat, coord.lon))
      .then((forecastList) => display5DayForecast(forecastList))
      .catch((error) => displayError(error.message));
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  return fetch(weatherUrl)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error("City not found"));
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather data received:", data); // Debug log
      return data.coord; // Return the coordinates (lat, lon)
    });
}

function get5DayForecast(lat, lon) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8";
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  return fetch(forecastUrl)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error("Failed to fetch 5-day forecast"));
      }
      return response.json();
    })
    .then((data) => {
      console.log("5-day forecast data received:", data); // Debug log
      return data.list; // Return the forecast list
    });
}

function display5DayForecast(forecastList) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = ""; // Clear previous results

  const today = new Date().getDay(); // Get today's day of the week (0-6)

  // Filter to only show forecasts for 12:00 PM
  const filteredForecast = forecastList.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  filteredForecast.slice(0, 5).forEach((forecast) => {
    const date = new Date(forecast.dt_txt);
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "short" });
    const isToday = today === date.getDay(); // Check if the forecast is for today

    // Create weather card
    const weatherCard = document.createElement("div");
    weatherCard.className = `p-4 rounded-lg shadow-md flex-1 max-w-xs ${
      isToday
        ? "bg-gradient-to-r from-blue-500 to-indigo-700 text-white"
        : "bg-gray-100 text-gray-800"
    }`;

    const dayElement = document.createElement("h3");
    dayElement.className = "text-lg font-bold";
    dayElement.textContent = dayOfWeek;

    const tempElement = document.createElement("p");
    tempElement.className = "text-sm";
    tempElement.textContent = `Temp: ${forecast.main.temp}°C`;

    const weatherElement = document.createElement("p");
    weatherElement.className = "text-sm";
    weatherElement.textContent = `Weather: ${forecast.weather[0].description}`;

    const humidityElement = document.createElement("p");
    humidityElement.className = "text-sm";
    humidityElement.textContent = `Humidity: ${forecast.main.humidity}%`;

    const windElement = document.createElement("p");
    windElement.className = "text-sm";
    windElement.textContent = `Wind: ${forecast.wind.speed} m/s`;

    // Append all elements to the weather card
    weatherCard.appendChild(dayElement);
    weatherCard.appendChild(tempElement);
    weatherCard.appendChild(weatherElement);
    weatherCard.appendChild(humidityElement);
    weatherCard.appendChild(windElement);

    // Append the weather card to the result container
    weatherResult.appendChild(weatherCard);
  });
}

function displayError(message) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = `<p class="text-red-500">${message}</p>`;
}
