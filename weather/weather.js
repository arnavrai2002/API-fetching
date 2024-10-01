const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = ""; //Your API key

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            if (weatherData) {
                displayWeatherInfo(weatherData);
            } else {
                displayError("City not found, please try again.");
            }
        } catch (error) {
            displayError("Unable to fetch data. Please try again.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

function displayWeatherInfo(data) {
    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = data.name;
    cityDisplay.classList.add("cityDisplay");

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    tempDisplay.classList.add("tempDisplay");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");

    const descDisplay = document.createElement("p");
    descDisplay.textContent = data.weather[0].description;
    descDisplay.classList.add("descDisplay");

    const weatherEmoji = document.createElement("p");
    weatherEmoji.innerHTML = getWeatherEmoji(data.weather[0].id);
    weatherEmoji.classList.add("weatherEmoji");

    // Clear previous content and display the new one
    card.textContent = "";
    card.style.display = "block";
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
        return "🌦"; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧"; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫"; // Atmosphere (Fog, Mist, etc.)
    } else if (weatherId === 800) {
        return "☀️"; // Clear
    } else if (weatherId > 800 && weatherId < 900) {
        return "☁️"; // Clouds
    } else {
        return "🌍"; // Default icon
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "block";
    card.appendChild(errorDisplay);
}
