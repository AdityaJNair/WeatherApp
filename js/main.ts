/// <reference path="jquery.d.ts" />;
const subscriptionKey = "a5c73d2705c60263ede71ef16dee8137";
declare var alertify: any;

    $(document).ready(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(findPosition, fail);
    } else {
    }
    $(".se-pre-con").fadeOut(3000);
});

function setInfo(weatherInfo: WeatherInfo): void {
        $("#temperature").text(weatherInfo.temperature);
    $("#humidity").text(weatherInfo.humidity + " %");
    $("#wind").text(weatherInfo.wind);
    $("#directionofwind").text(weatherInfo.windDirection);
    $("#hightemp").text(weatherInfo.temp_max);
    $("#lowtemp").text(weatherInfo.temp_min);
    $("#country").text(weatherInfo.country);
    $("#pressure").text(weatherInfo.pressure);
    $("#sunrise").text(weatherInfo.sunrise + " am");
    $("#sunset").text(weatherInfo.sunset + " pm");
    $("#para").text("We are expecting " + weatherInfo.description + " today (" + getDayOfWeek(new Date().getDay()) + ", " + new Date().getDate() + " " + getMonthOfYear(new Date().getMonth()) + " " + new Date().getFullYear() + ")");
    $("#head").text("Hello " + toTitleCase(weatherInfo.place) + ". The forecast for today is " + weatherInfo.main.toLowerCase() + ".");
    $("#mainimage").attr("src", getIconURL(weatherInfo.icon));
    $("#latitude").text(weatherInfo.latitude);
    $("#longitude").text(weatherInfo.longitude);
}

function setDaysInfo(days: any): void {
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

function updateUsingCurrentPosition(latitude : string, longitude: string) : void{
    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + subscriptionKey,
        success: function (data) {
            var weatherInformation = new WeatherInfo(Math.round(data.main.temp_min) - 273 + "°C", Math.round(data.main.temp_max) - 273 + "°C","",
            "", data.weather[0].main, data.weather[0].description, data.weather[0].icon, data.main.humidity, Math.round(data.main.temp) - 273 + "°C"
            , toTitleCase(data.name), getPosition(data.wind.deg),  data.sys.country, data.main.pressure + " hpa", formatTime(data.sys.sunrise), formatTime(data.sys.sunset), data.wind.speed + " m/s", data.coord.lat, data.coord.lon);

            setInfo(weatherInformation);
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

            
            var weatherInfoD2 = new WeatherInfoMultiple(Math.round(data.list[8].main.temp_min) - 273 + "°C", Math.round(data.list[8].main.temp_max) - 273 + "°C",formatDate(data.list[8].dt_txt),
            formatHeaderTime(data.list[8].dt_txt), data.list[8].weather[0].main, data.list[8].weather[0].description, data.list[8].weather[0].icon);
            
            var weatherInfoD3 = new WeatherInfoMultiple(Math.round(data.list[16].main.temp_min) - 273 + "°C", Math.round(data.list[16].main.temp_max) - 273 + "°C",formatDate(data.list[16].dt_txt),
            formatHeaderTime(data.list[16].dt_txt), data.list[16].weather[0].main, data.list[16].weather[0].description, data.list[16].weather[0].icon);
            
            var weatherInfoD4 = new WeatherInfoMultiple(Math.round(data.list[24].main.temp_min) - 273 + "°C", Math.round(data.list[24].main.temp_max) - 273 + "°C",formatDate(data.list[24].dt_txt),
            formatHeaderTime(data.list[24].dt_txt), data.list[24].weather[0].main, data.list[24].weather[0].description, data.list[24].weather[0].icon);
           
            var weatherInfoD5 = new WeatherInfoMultiple(Math.round(data.list[32].main.temp_min) - 273 + "°C", Math.round(data.list[32].main.temp_max) - 273 + "°C",formatDate(data.list[32].dt_txt),
            formatHeaderTime(data.list[32].dt_txt), data.list[32].weather[0].main, data.list[32].weather[0].description, data.list[32].weather[0].icon);

            var days = [weatherInfoD2, weatherInfoD3, weatherInfoD4, weatherInfoD5];

            setDaysInfo(days);
        },
        error: function () {
            alertify.alert("Error in ajax query. Unable to get information.")
        }
    });

}

function updateUsingGivenPosition(str : string) : void{
    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + str + "&appid=" + subscriptionKey,
        success: function (data) {
            var weatherInformation = new WeatherInfo(Math.round(data.main.temp_min) - 273 + "°C", Math.round(data.main.temp_max) - 273 + "°C","",
            "", data.weather[0].main, data.weather[0].description, data.weather[0].icon, data.main.humidity, Math.round(data.main.temp) - 273 + "°C"
            , toTitleCase(data.name), getPosition(data.wind.deg),  data.sys.country, data.main.pressure + " hpa", formatTime(data.sys.sunrise), formatTime(data.sys.sunset), data.wind.speed + " m/s", data.coord.lat, data.coord.lon);

            setInfo(weatherInformation);
        },
        error: function () {
            alertify.alert("Error in ajax query. Unable to get information.")
        }
    });

    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + str + "&appid=" + subscriptionKey,
        success: function (data) {

            
            var weatherInfoD2 = new WeatherInfoMultiple(Math.round(data.list[8].main.temp_min) - 273 + "°C", Math.round(data.list[8].main.temp_max) - 273 + "°C",formatDate(data.list[8].dt_txt),
            formatHeaderTime(data.list[8].dt_txt), data.list[8].weather[0].main, data.list[8].weather[0].description, data.list[8].weather[0].icon);
            
            var weatherInfoD3 = new WeatherInfoMultiple(Math.round(data.list[16].main.temp_min) - 273 + "°C", Math.round(data.list[16].main.temp_max) - 273 + "°C",formatDate(data.list[16].dt_txt),
            formatHeaderTime(data.list[16].dt_txt), data.list[16].weather[0].main, data.list[16].weather[0].description, data.list[16].weather[0].icon);
            
            var weatherInfoD4 = new WeatherInfoMultiple(Math.round(data.list[24].main.temp_min) - 273 + "°C", Math.round(data.list[24].main.temp_max) - 273 + "°C",formatDate(data.list[24].dt_txt),
            formatHeaderTime(data.list[24].dt_txt), data.list[24].weather[0].main, data.list[24].weather[0].description, data.list[24].weather[0].icon);
           
            var weatherInfoD5 = new WeatherInfoMultiple(Math.round(data.list[32].main.temp_min) - 273 + "°C", Math.round(data.list[32].main.temp_max) - 273 + "°C",formatDate(data.list[32].dt_txt),
            formatHeaderTime(data.list[32].dt_txt), data.list[32].weather[0].main, data.list[32].weather[0].description, data.list[32].weather[0].icon);

            var days = [weatherInfoD2, weatherInfoD3, weatherInfoD4, weatherInfoD5];

            setDaysInfo(days);
        },
        error: function () {
            alertify.alert("Error in ajax query. Unable to get information.")
        }
    });

}


function findPosition(pos : any) : void{
    var coordinates = pos.coords;
    var crd = pos.coords;
    $("#latitude").text(crd.latitude);
    $("#longitude").text(crd.longitude);
    updateUsingCurrentPosition(crd.latitude, crd.longitude);
}

function fail() : void{
    alertify.prompt("Your GPS is disabled, please enable it or enter in your city, country", function (e, str) {
        if (e) {
            updateUsingGivenPosition(str);
        } else {
            alertify.error("Thanks for visiting. To view again, refresh your webpage.");
        }
    }, "Auckland");
}

function toTitleCase(str: string) : string{
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

function getIconURL(icon: string) : string{
    return "http://openweathermap.org/img/w/" + icon + ".png";
}

function getPosition(degree: number) : string{
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

var formatTime = function (unixTimestamp: number) : string{
    var milliseconds : number = unixTimestamp * 1000;
    var date = new Date(milliseconds);
    var hours : number = date.getHours();
    if (hours > 12) {
        var hoursRemaining : number = hoursRemaining = 24 - hours;
        hours = 12 - hoursRemaining;
    }
    var minutes : number = date.getMinutes();
    var minString: string = minutes.toString();
    if (minString.length < 2) {
        minutes = 0 + minutes;
    }
    var time : string = hours + ':' + minutes;
    return time;
}

function formatDate(date: any) {
    var newDate = new Date(date.replace(/-/g, "/"));
    return getDayOfWeek(newDate.getDay()) + ", " + newDate.getDate() + " " + getMonthOfYear(newDate.getMonth()) + " " + newDate.getFullYear();
}

function formatHeaderTime(date: any) {
    var newDate = new Date(date.replace(/-/g, "/"));
    return formatDateTime(newDate.getHours(), newDate.getMinutes());
}

function getDayOfWeek(day: number) : string{
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

function getMonthOfYear(month: number) : string{
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

function formatDateTime(hour : number, minute: number) : string{
    var timeset : string = "";
    if (hour < 12) {
        timeset = "am";
    } else if (hour == 12) {
        timeset = "pm"
    } else {
        timeset = "pm";
        hour = hour - 12;
    }

    return hour + ":" + ("0" + minute).slice(-2) + " " + timeset;
}

class WeatherInfo{
    temp_min :string;
    temp_max : string;
    date: string;
    time : string;
    main : string;
    description : string;
    icon : string;    
    humidity : string;
    temperature : string;
    place : string;
    windDirection: string;
    country: string;
    pressure: string;
    sunrise: string;
    sunset: string;
    wind: string;
    latitude: string;
    longitude: string;


    constructor(tempmin: string, tempmax: string, date: string, time: string, maindescription: string, description: string, icon: string, humidity: string, temperature: string
    , place:string, windDirection: string, country: string, pressure: string, sunrise: string, sunset: string, wind: string, latitude: string, longitude: string){
            this.temp_min = tempmin;
            this.temp_max = tempmax;
            this.date = date;
            this.time = time;
            this.main = maindescription;
            this.description = description;
            this.icon = icon;
            this.humidity = humidity;
            this.temperature = temperature;
            this.place = place;
            this.windDirection = windDirection;
            this.country = country;
            this.pressure = pressure;
            this.sunrise = sunrise;
            this.sunset =  sunset;
            this.wind = wind;
            this.latitude = latitude;
            this.longitude = longitude;
    }   
}

class WeatherInfoMultiple extends WeatherInfo{
    temp_min :string;
    temp_max : string;
    date: string;
    time : string;
    main : string;
    description : string;
    icon : string;    

    constructor(tempmin: string, tempmax: string, date: string, time: string, maindescription: string, description: string, icon: string){
        super(tempmin, tempmax, date, time, maindescription, description, icon, "", "", "", "","","","","","","","");
    }

}
