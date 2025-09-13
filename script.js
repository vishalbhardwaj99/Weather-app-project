document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-meassage");

    const API_KEY = "d1383e656370ba488a0ef96d91aef4a2"; //env variable

    getWeatherBtn.addEventListener("click", async() => {
        const city = cityInput.value.trim()
        if (!city) return;

        //it may throw an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayweatherData(weatherData);
        }
        catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city) {
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url)
        console.log(typeof response);
        console.log("response", response);

        if (!response.ok) {
            throw new Error("City not found")
        }
        const data = await response.json();
        return data;
    }

    function displayweatherData(data) {
        console.log(data);
        const { name, main, weather } = data
        cityNameDisplay.textContent = name
        temperatureDisplay.textContent = `temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        
        //unlock the display
        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
    }

    function showError() {
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.remove("hidden")
    }
})