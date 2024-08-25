const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector("#city-input");

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            alert(`Error fetching weather data: ${error.message}`);
        }
    } else {
        alert("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiKey = 'dc5dc90b14fd07bd6196b424fe262e20'; // Move apiKey inside the function for scope safety
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    const cityDisplay = document.querySelector("#city-name");
    const temperatureDisplay = document.querySelector(".temp");
    const weatherIcon = document.querySelector(".weather-photo");
    const weatherInfo = document.querySelector(".description");

    cityDisplay.textContent = data.name;
    temperatureDisplay.textContent = `${(data.main.temp - 273.15).toFixed(1)} °C`; // Convert Kelvin to Celsius
    weatherInfo.textContent = data.weather[0].description;
    weatherIcon.textContent = getWeatherEmoji(data.weather[0].id); // Assuming you have a function to get emoji or icon
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return '⛈'; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
        return '🌧'; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return '🌦'; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return '❄'; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return '🌫'; // Atmosphere (fog, mist, etc.)
    } else if (weatherId === 800) {
        return '☀'; // Clear
    } else if (weatherId > 800 && weatherId < 900) {
        return '☁'; // Clouds
    } else {
        return '🌡'; // Default
    }
}
