const apikey = "5cbaad0156b3480a9dbb2eaaec99514d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBox = document.querySelector(".weather");
const errorBox = document.querySelector(".error");
const card = document.querySelector(".card");

window.addEventListener("load", () => {
    searchBox.focus();
});

function changeBackground(weather) {
    switch (weather) {
        case "Clear":
            document.body.style.background =
                "linear-gradient(135deg, #f7971e, #ffd200)";
            break;

        case "Clouds":
            document.body.style.background =
                "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            break;

        case "Rain":
        case "Drizzle":
            document.body.style.background =
                "linear-gradient(135deg, #2c3e50, #4ca1af)";
            break;

        case "Thunderstorm":
            document.body.style.background =
                "linear-gradient(135deg, #141e30, #243b55)";
            break;

        case "Snow":
            document.body.style.background =
                "linear-gradient(135deg, #e6dada, #274046)";
            break;

        case "Mist":
        case "Haze":
        case "Fog":
            document.body.style.background =
                "linear-gradient(135deg, #606c88, #3f4c6b)";
            break;

        default:
            document.body.style.background =
                "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    }
}

async function checkWeather(city) {

    if (city === "") return;

    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);

        if (response.status === 404) {
            errorBox.style.display = "block";
            weatherBox.style.display = "none";

            card.classList.add("shake");
            setTimeout(() => card.classList.remove("shake"), 400);
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML =
            data.wind.speed + " km/h";

        const weatherMain = data.weather[0].main;

        if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherMain === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else {
            weatherIcon.src = "images/clouds.png";
        }

        changeBackground(weatherMain);

        weatherBox.style.display = "block";
        errorBox.style.display = "none";

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});

searchBox.addEventListener("input", () => {
    errorBox.style.display = "none";
});
