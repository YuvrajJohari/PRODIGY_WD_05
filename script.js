const apiKey = '31b11d154c0f348a376ebafb653aa068'; // Replace with your actual API key
const weatherInfoDiv = document.getElementById('weather-info');

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(lat, lon);
        }, showError);
    } else {
        weatherInfoDiv.innerHTML = "Geolocation is not supported by this browser.";
    }
}

async function getWeatherByInput() {
    const location = document.getElementById('location-input').value;
    if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherInfoDiv.innerHTML = "Location not found.";
            }
        } catch (error) {
            weatherInfoDiv.innerHTML = "Unable to fetch weather data.";
        }
    } else {
        weatherInfoDiv.innerHTML = "Please enter a location.";
    }
}

async function fetchWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoDiv.innerHTML = "Unable to fetch weather data.";
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const weatherCondition = weather[0].main.toLowerCase();

    document.querySelector('#weather-info h2').innerText = `Weather in ${name}`;
    document.getElementById('temperature').innerText = `Temperature: ${main.temp} °C`;
    document.getElementById('description').innerText = `Weather: ${weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${wind.speed} m/s`;

    weatherInfoDiv.style.display = 'block';

    let backgroundImage = '';
    if (weatherCondition.includes('clear')) {
        backgroundImage = 'url("clear.jpg")';
    } else if (weatherCondition.includes('cloud')) {
        backgroundImage = 'url("cloudy.jpg")';
    } else if (weatherCondition.includes('rain')) {
        backgroundImage = 'url("rain.webp")';
    } else if (weatherCondition.includes('snow')) {
        backgroundImage = 'url("snow.jpeg")';
    } else {
        backgroundImage = 'url("clear.jpg")';
    }

    document.body.style.backgroundImage = backgroundImage;
}
