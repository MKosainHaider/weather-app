document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("city").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function getWeather(city) {
  const apiKey = "7068d2aa184698e8a91ada2afb094069"; // API key
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
      ).innerHTML = `<p>${error.message}</p>`;
    });
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  const { name, main, weather } = data;

  weatherResult.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
///----------------------------------------------------------------------------------------

// Imports Required Modules:
// readline: For reading input from the command line.
// https: For making HTTP requests to fetch weather data.
// const readline = require("readline");
// const https = require("https");

//Set Up Readline Interface:
// Creates an interface for reading from stdin (user input) and writing to stdout (output to the command line).
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// Function to Fetch Weather Data:
// function getWeather(city) {
//   const apiKey = "7068d2aa184698e8a91ada2afb094069"; // Replace with your OpenWeather API key
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   return new Promise((resolve, reject) => {
//     https
//       .get(url, (response) => {
//         let data = "";

//         response.on("data", (chunk) => {
//           data += chunk;
//         });

//         response.on("end", () => {
//           try {
//             const weatherData = JSON.parse(data);
//             if (response.statusCode === 200) {
//               resolve(weatherData);
//             } else {
//               reject(
//                 new Error(weatherData.message || "Failed to fetch weather data")
//               );
//             }
//           } catch (error) {
//             reject(new Error("Failed to parse weather data"));
//           }
//         });
//       })
//       .on("error", (error) => {
//         reject(error);
//       });
//   });
// }

// function to display weather data
// function displayWeather(data) {
//   const { name, main, weather, wind } = data;
//   console.log(`Weather in ${name}`);
//   console.log(`Temperature: ${main.temp}°C`);
//   console.log(`Weather: ${weather[0].description}`);
//   console.log(`Humidity: ${main.humidity}%`);
//   console.log(`Wind Speed: ${wind.speed} m/s`);
// }

// prompt user for input
// rl.question("Enter a city name: ", (city) => {
//   if (city) {
//     getWeather(city)
//       .then((data) => {
//         displayWeather(data);
//       })
//       .catch((error) => {
//         console.error("Error:", error.message);
//       })
//       .finally(() => {
//         rl.close();
//       });
//   } else {
//     console.log("Please enter a city name");
//     rl.close();
//   }
// });
