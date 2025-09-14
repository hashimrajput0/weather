const KEY = "8c54bde1d073e233a618d108d8b16a5e";
const input = document.querySelector(".city");
const btn = document.querySelector(".search-btn");
const img = document.querySelector(".WeatherICON");
const temp = document.querySelector(".tempDIV");
const weatherInfo = document.querySelector(".weatherinfo");


const buttonpressed = () => {
    let city = input.value;
    weather(city);
    forecast(city);
}


async function weather(city) {
    try {
        let URLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;

        let response = await fetch(URLWeather);

        if (!response.ok) {
            throw new Error("City not found ❌");
        }

        let weatherDATA = await response.json();
        console.log(weatherDATA);
        displayWeather(weatherDATA);
    } catch(error) {
        console.error(error);
        weatherInfo.innerHTML = "⚠️ Could not fetch weather. Please check city name.";
        temp.innerHTML = "";
        img.style.display = "none";
    }
}



function displayWeather(weatherDATA) {
    temp.innerHTML = "";
    weatherInfo.innerHTML = "";

    weatherInfo.innerHTML = `${weatherDATA.name} , ${weatherDATA.sys.country} <br> ${weatherDATA.weather[0].description} `;
    let iconCode = weatherDATA.weather[0].icon;
    img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    img.style.display = "block";
    temp.innerHTML = `<b>Current Temperature:</b>&nbsp;&nbsp;${weatherDATA.main.temp}&nbsp;°C<br><b>Feels Like:</b>&nbsp;&nbsp;${weatherDATA.main.feels_like}&nbsp;°C <br> <b>Humidity:</b> ${weatherDATA.main.humidity}`;


}


btn.addEventListener("click", buttonpressed);
