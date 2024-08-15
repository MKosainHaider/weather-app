document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // Your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const { coord } = data;
      get5DayForecast(coord.lat, coord.lon);
    })
    .catch((error) => {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}

function get5DayForecast(lat, lon) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // Your API key
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      display5DayForecast(data.list);
    })
    .catch((error) => {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}

function display5DayForecast(forecastList) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = "";

  const filteredForecast = forecastList.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  filteredForecast.slice(0, 5).forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "short" });

    weatherResult.innerHTML += `
        <div class="bg-gray-100 p-4 rounded-lg shadow-md flex-1">
            <h3 class="text-lg font-bold">${dayOfWeek}</h3>
            <p class="text-sm">Temp: ${forecast.main.temp}°C</p>
            <p class="text-sm">Weather: ${forecast.weather[0].description}</p>
            <p class="text-sm">Humidity: ${forecast.main.humidity}%</p>
            <p class="text-sm">Wind: ${forecast.wind.speed} m/s</p>
        </div>
    `;
  });
}
