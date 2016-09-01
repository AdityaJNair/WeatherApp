var subscriptionKey = "a5c73d2705c60263ede71ef16dee8137";

$(document).ready(function () {
               
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(findPosition, fail);
    } else {
           $("#head").text("Please enable geolocation for this application to work");
           alertify.alert("You need geolocation to be enabled for this application to work");
    }
    $(".se-pre-con").fadeOut(3000);
});

function setInfo(weatherInfo) {
    $("#temperature").text(weatherInfo.temperature);
    $("#humidity").text(weatherInfo.humidity + " %");
    $("#wind").text(weatherInfo.windSpeed);
    $("#directionofwind").text(weatherInfo.windDirection);
    $("#hightemp").text(weatherInfo.temp_max);
    $("#lowtemp").text(weatherInfo.temp_min);
    $("#country").text(weatherInfo.country);
    $("#pressure").text(weatherInfo.pressure);
    $("#sunrise").text(weatherInfo.sunrise + " am");
    $("#sunset").text(weatherInfo.sunset + " pm");
    $("#para").text("We are expecting " + weatherInfo.description + " today ("+ getDayOfWeek(new Date().getDay()) + ", " + new Date().getDate() + " " + getMonthOfYear(new Date().getMonth()) + " " + new Date().getFullYear() + ")");
    $("#head").text("The time in " + toTitleCase(weatherInfo.place)+ " is " + formatDateTime(new Date().getHours(), new Date().getMinutes()) + ". The forecast for today is " + weatherInfo.main.toLowerCase() + ".");
    $("#mainimage").attr("src", getIconURL(weatherInfo.icon));
}

function setDaysInfo(days) {
    $("#imageday2").attr("src", getIconURL(days[0].icon));
    $("#dateday2").text(days[0].date);
    $("#datetimeday2").text(days[0].time);
    $("#datedsecribeday2").text(days[0].main + " : " + days[0].description);
    $("#maxtempday2").text(days[0].temp_max)
    $("#mintempday2").text(days[0].temp_min);

    $("#imageday3").attr("src", getIconURL(days[1].icon));
    $("#dateday3").text(days[1].date);
    $("#datetimeday3").text(days[1].time);
    $("#datedsecribeday3").text(days[1].main + " : " + days[1].description);
    $("#maxtempday3").text(days[1].temp_max)
    $("#mintempday3").text(days[1].temp_min);

    $("#imageday4").attr("src", getIconURL(days[2].icon));
    $("#dateday4").text(days[2].date);
    $("#datetimeday4").text(days[2].time);
    $("#datedsecribeday4").text(days[2].main + " : " + days[2].description);
    $("#maxtempday4").text(days[2].temp_max)
    $("#mintempday4").text(days[2].temp_min);

    $("#imageday5").attr("src", getIconURL(days[3].icon));
    $("#dateday5").text(days[3].date);
    $("#datetimeday5").text(days[3].time);
    $("#datedsecribeday5").text(days[3].main + " : " + days[3].description);
    $("#maxtempday5").text(days[3].temp_max)
    $("#mintempday5").text(days[3].temp_min);
}

function updateUsingCurrentPosition(latitude, longitude) {
    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + subscriptionKey,
        success: function (data) {
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
            alertify.alert("Error in ajax query. Unable to get information.")
        }
    });

    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + subscriptionKey,
        success: function (data) {
            var weatherInfoD2 = {};
            var weatherInfoD3 = {};
            var weatherInfoD4 = {};
            var weatherInfoD5 = {};
            var days = [weatherInfoD2, weatherInfoD3, weatherInfoD4, weatherInfoD5];

            //day two
            weatherInfoD2.temp_min = Math.round(data.list[8].main.temp_min) - 273 + "°C";
            weatherInfoD2.temp_max = Math.round(data.list[8].main.temp_max) - 273 + "°C";
            weatherInfoD2.date = formatDate(data.list[8].dt_txt);
            weatherInfoD2.time = formatHeaderTime(data.list[8].dt_txt);
            weatherInfoD2.main = data.list[8].weather[0].main;
            weatherInfoD2.description = data.list[8].weather[0].description;
            weatherInfoD2.icon = data.list[8].weather[0].icon;
            //day three
            weatherInfoD3.temp_min = Math.round(data.list[16].main.temp_min) - 273 + "°C";
            weatherInfoD3.temp_max = Math.round(data.list[16].main.temp_max) - 273 + "°C";
            weatherInfoD3.date = formatDate(data.list[16].dt_txt);
            weatherInfoD3.time = formatHeaderTime(data.list[16].dt_txt);
            weatherInfoD3.main = data.list[16].weather[0].main;
            weatherInfoD3.description = data.list[16].weather[0].description;
            weatherInfoD3.icon = data.list[16].weather[0].icon;
            //day four
            weatherInfoD4.temp_min = Math.round(data.list[24].main.temp_min) - 273 + "°C";
            weatherInfoD4.temp_max = Math.round(data.list[24].main.temp_max) - 273 + "°C";
            weatherInfoD4.date = formatDate(data.list[24].dt_txt);
            weatherInfoD4.time = formatHeaderTime(data.list[24].dt_txt);
            weatherInfoD4.main = data.list[24].weather[0].main;
            weatherInfoD4.description = data.list[24].weather[0].description;
            weatherInfoD4.icon = data.list[24].weather[0].icon;
            //day five
            weatherInfoD5.temp_min = Math.round(data.list[32].main.temp_min) - 273 + "°C";
            weatherInfoD5.temp_max = Math.round(data.list[32].main.temp_max) - 273 + "°C";
            weatherInfoD5.date = formatDate(data.list[32].dt_txt);
            weatherInfoD5.time = formatHeaderTime(data.list[32].dt_txt);
            weatherInfoD5.main = data.list[32].weather[0].main;
            weatherInfoD5.description = data.list[32].weather[0].description;
            weatherInfoD5.icon = data.list[32].weather[0].icon;
            setDaysInfo(days);
        },
        error: function () {
            alertify.alert("Error in ajax query. Unable to get information.")
        }
    });

}

function findPosition(pos) {
    var coordinates = pos.coords;
    var crd = pos.coords;
    $("#latitude").text(crd.latitude);
    $("#longitude").text(crd.longitude); 
    updateUsingCurrentPosition(crd.latitude, crd.longitude);
}

function fail() {
    alertify.alert("Unable to get your current position. Try a different browser (not chrome) or maybe try again in a few minutes or in another location?");
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

function formatDate(date) {
    var newDate = new Date(date.replace(/-/g, "/"));
    return getDayOfWeek(newDate.getDay()) + ", " + newDate.getDate() + " " + getMonthOfYear(newDate.getMonth()) + " " + newDate.getFullYear();
}

function formatHeaderTime(date) {
    var newDate = new Date(date.replace(/-/g, "/"));
    return formatDateTime(newDate.getHours(), newDate.getMinutes());
}

function getDayOfWeek(day) {
    if (day == 0) {
        return "Sunday";
    } else if (day == 1) {
        return "Monday";
    } else if (day == 2) {
        return "Tuesday";
    } else if (day == 3) {
        return "Wednesday";
    } else if (day == 4) {
        return "Thursday";
    } else if (day == 5) {
        return "Friday";
    } else {
        return "Saturday";
    }
}

function getMonthOfYear(month) {
    if (month == 0) {
        return "January";
    } else if (month == 1) {
        return "February";
    } else if (month == 2) {
        return "March";
    } else if (month == 3) {
        return "April";
    } else if (month == 4) {
        return "May";
    } else if (month == 5) {
        return "June";
    } else if (month == 6) {
        return "July";
    } else if (month == 7) {
        return "August";
    } else if (month == 8) {
        return "September";
    } else if (month == 9) {
        return "October";
    } else if (month == 10) {
        return "November";
    } else {
        return "December";
    }
}

function formatDateTime(hour,minute) {
    var timeset = "";
    if (hour < 12) {
        timeset = "am";
    } else if (hour == 12) {
        timeset = "pm"
    } else {
        timeset = "pm";
        hour = hour - 12;
    }

    return hour + ":"+ ("0" + minute).slice(-2)+" " + timeset;
}