function displayTemperature(responce) {
  document.querySelector("#temperature").innerHTML = Math.round(responce.data.main.temp);
  document.querySelector("#city").innerHTML = responce.data.name;
  document.querySelector("#dissription-weather").innerHTML = responce.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity; 
  document.querySelector("#wind").innerHTML = Math.round(responce.data.wind.speed); 
  document.querySelector("#feels-temperature").innerHTML = Math.round(responce.data.main.feels_like);

}

let apiKey = "c3717712699a76ea2802ba838ac61fc8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);