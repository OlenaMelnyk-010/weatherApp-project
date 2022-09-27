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

function formatDay(timesTemp) {
  let date = new Date(timesTemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[day];

}

function displayForecast(responce){
  let forecast = responce.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row d-flex justify-content-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {

    
  
    forecastHTML = forecastHTML + `
  
    <div class="col-lg-2 col-md-6  forecast-day">
      <div class="weather-forecast-date">
        ${formatDay(forecastDay.dt)}
      </div>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            width="75"
      >
    <div class="weather-forecast-temperature">
        <ul class="forecast-temperature">
          <li class="weather-forecast-temperature-max"><i class="fa-solid fa-temperature-three-quarters"></i><span> ${Math.round(forecastDay.temp.min)}  ̊C</span></li>
          <li class="weather-forecast-temperature-min"><i class="fa-solid fa-temperature-three-quarters"></i><strong> ${Math.round(forecastDay.temp.max)}  ̊C</strong></li>
        </ul>
      </div>                  
    </div>
   
`;
    }
  })
  

forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;
  
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

function getForecast(coordinates) {
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

}

function displayTemperature(responce) {
  celsiusTemperature = responce.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
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
  
getForecast(responce.data.coord);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

search("Kyiv");
