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
    $("#humidity").text(weatherInfo.humidity+" %");
    $("#wind").text(weatherInfo.windSpeed);
    $("#directionofwind").text(weatherInfo.windDirection);
    $("#hightemp").text(weatherInfo.temp_max);
    $("#lowtemp").text(weatherInfo.temp_min);
    $("#country").text(weatherInfo.country);
    $("#pressure").text(weatherInfo.pressure);
    $("#sunrise").text(weatherInfo.sunrise + " am");
    $("#sunset").text(weatherInfo.sunset + " pm");
    $("#para").text("We are expecting " + weatherInfo.description + " today");
    $("#head").text("The weather in " + toTitleCase(weatherInfo.place) + " is " + weatherInfo.main.toLowerCase());
    $("#mainimage").attr("src", getIconURL(weatherInfo.icon));
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
            console.log(data.weather[0].icon);

            var weatherInfo = {};
            weatherInfo.humidity = data.main.humidity;
            weatherInfo.temperature = Math.round(data.main.temp) - 273 + "°C";
            weatherInfo.windSpeed = data.wind.speed + " m/s";
            weatherInfo.place = toTitleCase(data.name);
            weatherInfo.windDirection = getPosition(data.wind.deg);
            weatherInfo.country = data.sys.country;
            weatherInfo.temp_min = Math.round(data.main.temp_min) - 273 + "°C";
            weatherInfo.temp_max = Math.round(data.main.temp_max) - 273 + "°C";
            weatherInfo.pressure = data.main.pressure + " hpa";
            weatherInfo.icon = data.weather[0].icon;
            weatherInfo.sunrise = formatTime(data.sys.sunrise);
            weatherInfo.sunset = formatTime(data.sys.sunset);
            weatherInfo.main = data.weather[0].main;
            weatherInfo.description = data.weather[0].description;
            setInfo(weatherInfo);
        },
        error: function () {
            alert("error");
        }
    });

    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + subscriptionKey,
        success: function (data) {
            console.log(data.list[0].dt_txt);
            console.log(data.list[8].dt_txt);
            console.log(data.list[16].dt_txt);
            console.log(data.list[24].dt_txt);
            console.log(data.list[32].dt_txt);

            /*
                        var weatherInfo = {};
                        weatherInfo.humidity = data.main.humidity;
                        weatherInfo.temperature = Math.round(data.main.temp) - 273 + "°C";
                        weatherInfo.windSpeed = data.wind.speed + " m/s";
                        weatherInfo.place = toTitleCase(data.name);
                        weatherInfo.windDirection = getPosition(data.wind.deg);
                        weatherInfo.country = data.sys.country;
                        weatherInfo.temp_min = Math.round(data.main.temp_min) - 273 + "°C";
                        weatherInfo.temp_max = Math.round(data.main.temp_max) - 273 + "°C";
                        weatherInfo.pressure = data.main.pressure + " hpa";
                        weatherInfo.icon = data.weather[0].icon;
                        setInfo(weatherInfo);*/
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

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

function getIconURL(icon) {
    return "http://openweathermap.org/img/w/" + icon + ".png";
}

function getPosition(degree) {
    if (degree == 0) {
        return "North";
    } else if (degree > 0 && degree < 90) {
        return "North East";
    } else if (degree == 90) {
        return "East";
    } else if (degree > 90 && degree < 180) {
        return "South East";
    } else if (degree == 180) {
        return "South";
    } else if (degree > 180 && degree < 270) {
        return "South West";
    } else if (degree == 270) {
        return "West";
    } else {
        return "North West";
    }
}

var formatTime = function (unixTimestamp) {
    var milliseconds = unixTimestamp * 1000;
    var date = new Date(milliseconds);
    var hours = date.getHours();
    if (hours > 12) {
        hoursRemaining = 24 - hours;
        hours = 12 - hoursRemaining;
    }
    var minutes = date.getMinutes();
    minutes = minutes.toString();
    if (minutes.length < 2) {
        minutes = 0 + minutes;
    }
    var time = hours + ':' + minutes;
    return time;
}

