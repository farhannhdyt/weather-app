// Weather API
const API_URL = {
  key: "2a76f855fab1bc8b3006ec00e8295380",
  base: "https://api.openweathermap.org/data/2.5/",
};

// Searchbox action
const searchBox = document.querySelector(".location-input");
searchBox.addEventListener("keypress", setQuery);

// Set current date
let now = new Date();
const dateSection = document.querySelector(".header .date");
dateSection.innerText = dateBuilder(now);

// get weather
function setQuery(event) {
  if (event.keyCode === 13) {
    getResult(searchBox.value);
    searchBox.value = "";
  }
}

// Get result of the weather data
function getResult(query) {
  fetch(`${API_URL.base}weather?q=${query}&units=metric&APPID=${API_URL.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  console.log(weather);

  let setLocation = document.querySelector(".header .location");
  setLocation.innerText = `${weather.name}, ${weather.sys.country}`;

  let setWeatherTemperature = document.querySelector(".weather-section .temp");
  setWeatherTemperature.innerText = `${Math.round(weather.main.temp)}°`;

  let setWeatherMain = document.querySelector(".weather-section .weather");
  setWeatherMain.innerText = `${weather.weather[0].main}`;

  let setTempMinMax = document.querySelector(".weather-section .temp-min-max");
  setTempMinMax.innerText = `${Math.round(
    weather.main.temp_min
  )}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let getDay = days[date.getDay()];
  let getDate = date.getDate();
  let getMonth = months[date.getMonth()];
  let getYear = date.getFullYear();

  return `${getDay}, ${getMonth} ${getDate}, ${getYear}`;
}
