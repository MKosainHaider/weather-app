document.getElementById("getWeatherBtn").addEventListener("click", function () {
    const city = document.getElementById("cityInput").value;
    const apiKey = "397a3c1468c2cbe1a8784c7b6a3ba8e8"; // 

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
