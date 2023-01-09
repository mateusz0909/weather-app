import "./style.css";
const appId = import.meta.env.VITE_APPID;

const button = document.getElementById("search-location");
const input = document.getElementById("location");
const output = document.getElementById("output");
button.addEventListener("click", getCurrentWeather);

async function getCurrentWeather(e) {
  e.preventDefault();
  output.innerHTML = "";

  const url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${appId}`
  );
  const weather = await url.json();
  console.log(weather);
  const cityNode = document.createElement("div");
  cityNode.innerHTML = `<h1 class="text-lg">Weather in the ${weather.name}</h1> 
  <dt class="font-medium text-gray-900">Temperature</dt>
          <dd class="mt-2 text-sm text-gray-500">${Math.round(
            weather.main.temp - 273.15
          )} °C</dd>
`;
  output.appendChild(cityNode);
  input.value = "";
}
