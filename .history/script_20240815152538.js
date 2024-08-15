document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // API key
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
    })
    .catch((error) => {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  const { name, main, weather, wind } = data;

  weatherResult.innerHTML = `
        <h2 class="text-2xl font-bold mb-2">Weather in ${name}</h2>
        <p class="text-lg">Temperature: <span class="font-semibold">${main.temp}°C</span></p>
        <p class="text-lg">Weather: <span class="font-semibold">${weather[0].description}</span></p>
        <p class="text-lg">Humidity: <span class="font-semibold">${main.humidity}%</span></p>
        <p class="text-lg">Wind Speed: <span class="font-semibold">${wind.speed} m/s</span></p>
    `;
}
