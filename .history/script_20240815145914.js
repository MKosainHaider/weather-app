document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // Replace with your OpenWeatherMap API key

  if (city) {
    getWeather(city, apiKey);
  } else {
    alert("Please enter a city name.");
  }
});

function getWeather(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
      getHourlyForecast(data.coord.lat, data.coord.lon, apiKey);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function getHourlyForecast(lat, lon, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching hourly forecast");
      }
      return response.json();
    })
    .then((data) => {
      displayHourlyForecast(data);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${data.name}, ${data.sys.country}</h2>
        <p class="text-lg">${data.weather[0].description}</p>
        <p class="text-4xl font-bold">${data.main.temp}°C</p>
        <p class="text-sm">Humidity: ${data.main.humidity}%</p>
        <p class="text-sm">Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayHourlyForecast(data) {
  const weatherResult = document.getElementById("weatherResult");

  // Clear the previous hourly forecast, if any
  const hourlyContainer = document.createElement("div");
  hourlyContainer.className = "mt-4";

  const heading = document.createElement("h3");
  heading.textContent = "Hourly Forecast:";
  heading.className = "text-lg font-bold mb-2";
  hourlyContainer.appendChild(heading);

  // Loop through the first 5 time periods (next 15 hours at 3-hour intervals)
  for (let i = 0; i < 5; i++) {
    const forecast = data.list[i];
    const date = new Date(forecast.dt_txt);
    const hours = date.getHours();

    const forecastElement = document.createElement("p");
    forecastElement.className = "text-sm";
    forecastElement.innerHTML = `
        ${hours}:00 - ${forecast.main.temp}°C, ${forecast.weather[0].description}
    `;
    hourlyContainer.appendChild(forecastElement);
  }

  // Append the hourly forecast to the weather result
  weatherResult.appendChild(hourlyContainer);
}
