const apikey="5cbaad0156b3480a9dbb2eaaec99514d";
const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){

    if(city === ""){
        return;
    }

    const response = await fetch(apiurl + city + ` &appid=${apikey}`);

    if(response.status == 404){
        const error = document.querySelector(".error");
        const searchBox = document.querySelector(".search");

        error.style.display = "block";
        document.querySelector(".weather").style.display = "none";

        searchBox.classList.add("shake");

        setTimeout(() => {
        searchBox.classList.remove("shake");
        }, 400);

        return;
    }
    
    else{

        var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp )+ "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";

    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/Rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }


    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    }
}

searchBtn = addEventListener("click" ,()=>{
    checkWeather(searchBox.value)
});

searchBox.addEventListener("keyup", (e) =>{
    if(e.key === "Enter"){
        checkWeather(searchBox.value)
    }
});

searchBox.addEventListener("input", () => {
  document.querySelector(".error").style.display = "none";
});

//checkWeather();