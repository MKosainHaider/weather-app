document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const apiKey = "a9d27ccc3fe972fcf34bebe28d9f5b49"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}

function displayCurrentWeather(weatherData) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = "";

  const city = weatherData.name;
  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;

  weatherResult.innerHTML = `
      <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold">${city}</h2>
          <p class="text-lg">Temperature: ${temperature}°C</p>
          <p class="text-lg">Weather: ${description}</p>
          <p class="text-lg">Humidity: ${humidity}%</p>
          <p class="text-lg">Wind Speed: ${windSpeed} m/s</p>
      </div>
  `;
}
