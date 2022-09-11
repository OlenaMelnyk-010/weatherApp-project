function formatDate(dateUpdate) {
  let date = new Date(dateUpdate);
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  let data = date.getDate();
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
  let currentMonth = months[date.getMonth()];

  return `${day}, ${data} ${currentMonth}` 
}

function formatTime(timeUpdate) {
  let time = new Date(timeUpdate);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } 
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } 

  return `${hours}:${minutes}`
}

function displayTemperature(responce) {
  document.querySelector("#temperature").innerHTML = Math.round(responce.data.main.temp);
  document.querySelector("#city").innerHTML = responce.data.name;
  document.querySelector("#dissription-weather").innerHTML = responce.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity; 
  document.querySelector("#wind").innerHTML = Math.round(responce.data.wind.speed); 
  document.querySelector("#feels-temperature").innerHTML = Math.round(responce.data.main.feels_like);
  document.querySelector("#date").innerHTML = formatDate(responce.data.dt * 1000);
  document.querySelector("#current-time").innerHTML = formatTime(responce.data.dt * 1000);
  document.querySelector("#icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  ); 
  document.querySelector("#icon").setAttribute("alt", responce.data.weather[0].description)
  }

function search(city) {
  let apiKey = "c3717712699a76ea2802ba838ac61fc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);