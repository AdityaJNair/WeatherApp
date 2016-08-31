var subscriptionKey = "a5c73d2705c60263ede71ef16dee8137";

$(document).ready(function () {
    if (navigator.geolocation) {
        console.log("in navigation");
        navigator.geolocation.getCurrentPosition(findPosition, fail);
    }
});

function setInfo(weatherInfo) {
    $("#temperature").text(weatherInfo.temperature);
    $("#location").text(weatherInfo.place);
    $("#humidity").text(weatherInfo.humidity);
    $("#wind").text(weatherInfo.windSpeed);
    $("#directionofwind").text(weatherInfo.windDirection);
    $("#hightemp").text(weatherInfo.temp_max);
    $("#lowtemp").text(weatherInfo.temp_min);
    $("#country").text(weatherInfo.country);
    $("#pressure").text(weatherInfo.pressure);
}

function updateUsingCurrentPosition(latitude, longitude) {
    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + subscriptionKey,
        success: function (data) {
            console.log("in success");
            console.log(data.main.humidity);
            console.log(data.main.temp);
            console.log(data.wind.speed);
            console.log(data.name);
            console.log(data.wind.deg);
            console.log(data.sys.country);
            console.log(data.main.temp_min);
            console.log(data.main.temp_max);
            console.log(data.main.pressure);

            var weatherInfo = {};
            weatherInfo.humidity = data.main.humidity;
            weatherInfo.temperature = Math.round(data.main.temp) - 273 + "°C";
            weatherInfo.windSpeed = data.wind.speed + " m/s";
            weatherInfo.place = data.name;
            weatherInfo.windDirection = data.wind.deg;
            weatherInfo.country = data.sys.country;
            weatherInfo.temp_min = Math.round(data.main.temp_min) - 273 + "°C";
            weatherInfo.temp_max = Math.round(data.main.temp_max) - 273 + "°C";
            weatherInfo.pressure = data.main.pressure + " hpa";
            setInfo(weatherInfo);
        },
        error: function () {
            alert("error");
        }
    });

}

function findPosition(pos) {
    var coordinates = pos.coords;
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
    updateUsingCurrentPosition(crd.latitude, crd.longitude);
}

function fail() {
    alert("failed to get geo");
}