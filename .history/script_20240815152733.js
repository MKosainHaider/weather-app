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
      getForecast(coord.lat, coord.lon);
    })
    .catch((error) => {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}

function getForecast(lat, lon) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // Your API key
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data.daily);
    })
    .catch((error) => {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}

function displayForecast(daily) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = "";

  daily.forEach((day, index) => {
    if (index === 0) return; // Skip the current day if needed
    const date = new Date(day.dt * 1000);
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'long' });
    
    weatherResult.innerHTML += `
        <div class="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
            <h3 class="text-xl font-bold">${dayOfWeek}</h3>
            <p>Temperature: ${day.temp.day}°C</p>
            <p>Weather: ${day.weather[0].description}</p>
            <p>Humidity: ${day.humidity}%</p>
            <p>Wind Speed: ${day.wind_speed} m/s</p>
        </div>
    `;
  });
}
