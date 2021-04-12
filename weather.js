const weather = document.querySelector(".js-weather");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSpan = document.querySelector(".weather-span");
const API_KEY = "17c72ec2605d52a993a093f10e330443";
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const data = json;
            const temp = data.main.temp;
            const weathers = data.weather[data.weather.length -1];
            weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
            weatherSpan.innerHTML = `${temp}&#176;C ${weathers.main}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
    setTimeout(function() {
        weatherIcon.style.opacity = '1';
    }, 200);
    
}

init();