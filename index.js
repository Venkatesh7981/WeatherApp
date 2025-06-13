const inputtag = document.getElementById("inputtag");
const form = document.getElementById("form");
const tempc = document.querySelector("tempc");
const climate = document.querySelector("climate");
const weather = document.getElementById("weather");
const button = document.getElementById("getbutton");
const weathericon = document.getElementById("weathericon");
const cityheading = document.getElementById("cityname");

let temperature;
let description;
let cityname = "delhi";
let data;
let url;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  cityname = inputtag.value;
  cityheading.innerHTML = "Loading...";
  url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=2c63ed7e7a6245eb454ba8992bd2b23b`;
  data = getdata();
  data.then((response) => {
    showweather(response);
    // temperature = response.main.temp;
    // description = response.weather[0].description;
    // tempc.innerHTML = temperature;
    // console.log(response);
  });
});

function showweather(response) {
  console.log(response);
  if (response.cod == 404) {
    cityheading.innerHTML = " NOT FOUND";
    weather.innerHTML = `
    <img src="" alt="" />
        <h1 class="tempc">${0} c</h1>
        <h2 class="climate">${"-"}</h2>
    `;

    weathericon.src =
      "https://tse1.mm.bing.net/th?id=OIP.dwuAXVyZx5MTZsLoTojyUQHaHa&pid=Api&P=0";
    // " https://tse1.mm.bing.net/th?id=OIP.w2F9kIXs4nYVr-tdPvEUyAHaE3&pid=Api&P=0";
  } else {
    cityheading.innerHTML = inputtag.value;
    weather.innerHTML = `
      <img src="" alt="" />
      <h1 class="tempc">${response.main.temp} c</h1>
      <h2 class="climate">${response.weather[0].description}</h2>
      `;

    weathericon.src =
      // " https://tse1.mm.bing.net/th?id=OIP.w2F9kIXs4nYVr-tdPvEUyAHaE3&pid=Api&P=0";
      "http://openweathermap.org/img/w/" +
      `${response.weather[0].icon}` +
      ".png";
  }
}
getdata = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};