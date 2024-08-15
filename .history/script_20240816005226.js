document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  console.log(`City entered: ${city}`); // Debug log

  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // Your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log(`Fetching weather data from URL: ${url}`); // Debug log

  fetch(url)
    .then((response) => {
      console.log(`Response status: ${response.status}`); // Debug log
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found");
        } else {
          throw new Error("An error occurred while fetching the weather data");
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather data received:", data); // Debug log
      const { coord } = data;
      get5DayForecast(coord.lat, coord.lon);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}

function get5DayForecast(lat, lon) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // Your API key
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  console.log(`Fetching 5-day forecast from URL: ${url}`); // Debug log

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("5-day forecast data received:", data); // Debug log
      display5DayForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching 5-day forecast:", error);
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
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

  weatherResult.classList.add("flex", "space-x-4", "justify-center");

  filteredForecast.slice(0, 5).forEach((forecast) => {
    const date = new Date(forecast.dt_txt);
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "short" });
    const isToday = today === date.getDay(); // Check if the forecast is for today

    // Conditional class based on whether it's today or not
    const cardClass = isToday
      ? "bg-gradient-to-r from-blue-500 to-indigo-700 text-white"
      : "bg-gray-100 text-gray-800";

    weatherResult.innerHTML += `
      <div class="p-4 rounded-lg shadow-md flex-1 ${cardClass}">
        <h3 class="text-lg font-bold">${dayOfWeek}</h3>
        <p class="text-sm">Temp: ${forecast.main.temp}°C</p>
        <p class="text-sm">Weather: ${forecast.weather[0].description}</p>
        <p class="text-sm">Humidity: ${forecast.main.humidity}%</p>
        <p class="text-sm">Wind: ${forecast.wind.speed} m/s</p>
      </div>
    `;
  });
}
