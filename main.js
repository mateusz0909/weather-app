import "./style.css";
const appId = import.meta.env.VITE_APPID;

const button = document.getElementById("search-location");
const input = document.getElementById("location");
const output = document.getElementById("output");
const header = document.getElementById("header");
button.addEventListener("click", getCurrentWeather);

async function getCurrentWeather(e) {
  e.preventDefault();
  output.innerHTML = "";
  try {
    const url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${appId}`
    );
    header.style.display = "none";
    let response = await url.json();
    const cityNode = document.createElement("div");
    cityNode.innerHTML = `<h1 class="text-lg pt-16">Weather in ${
      response.name
    }</h1> 
  <dt class="font-medium text-gray-900">${Math.round(
    response.main.temp - 273.15
  )} °C ${response.weather[0].description} </dt>
          <dd class="mt-2 text-sm text-gray-500"><img src=https://openweathermap.org/img/wn/${
            response.weather[0].icon
          }@2x.png></dd>
`;
    output.appendChild(cityNode);
  } catch (error) {
    header.style.display = "block";
    header.textContent = "No such a location";
  } finally {
    input.value = "";
  }
}
