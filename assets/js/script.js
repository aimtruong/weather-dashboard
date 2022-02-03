
// city search form containers
var cityFormEl = document.querySelector(".card-body");
var cityInputEl = document.querySelector(".city");

var displayWeather = document.querySelector(".display-weather");

// current weather containers
var currentWeatherEl = document.querySelector(".currentWeather");
var citySearchTerm = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");

// five days weather container to hold all days
var fiveDaysContainer = document.querySelector(".fiveDaysContainer");
var firstDayEl = document.querySelector("#firstDayEl");
var secondDayEl = document.querySelector("#secondDayEl");
var thirdDayEl = document.querySelector("#thirdDayEl");
var fourthDayEl = document.querySelector("#fourthDayEl");
var fifthDayEl = document.querySelector("#fifthDayEl");


var getWeather = function(city){
    // api to find city's lat and lon coords
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=c48becc83b15142c299e329c55a89278";
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            for(var i = 0; i < data.length; i++){
                // gets lat and lon
                var cityLat = data[i].lat;
                var cityLon = data[i].lon;

                // api to find city's weather
                var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=minutely,hourly,alerts&appid=c48becc83b15142c299e329c55a89278";
                fetch(apiUrl).then(function(response){
                    response.json().then(function(data){
                        // gets current and next 5 days weather
                        displayCurrentWeather(data, city);
                        displayFiveDays(data, city);
                    });
                });
            }
        });
    });
};

var formSubmitHandler = function(event){
    event.preventDefault();
    
    // get value from input
    var city = cityInputEl.value.trim();

    if(city){
        getWeather(city);
        cityInputEl.value = "";
    }
    else{
        alert("Please enter a US city");
    }
};

var displayCurrentWeather = function(weather, searchTerm){
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm + " (" + moment().format("MM[/]DD[/]YYYY") + ")";
    
    // easy format to find certain weather
    cityName = weather.current;

        // temp, wind, humidity, UV index
        var temp = document.createElement("p");
            temp.textContent = "Temp: " + cityName.temp + "°F";

        var wind = document.createElement("p");
            wind.textContent = "Wind: " + cityName.wind_speed + " MPH";

        var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + cityName.humidity + "%";

        var uvIndex = document.createElement("p");
            uvIndex.textContent = "UV Index: " + cityName.uvi;

    // append to container
    weatherContainerEl.appendChild(temp);
    weatherContainerEl.appendChild(wind);
    weatherContainerEl.appendChild(humidity);
    weatherContainerEl.append(uvIndex);

    // append container to the dom
    currentWeatherEl.appendChild(weatherContainerEl);
    currentWeatherEl.setAttribute("style", "border:1px solid black");

};

var displayFiveDays = function(weather, searchTerm){
    // element for easy access
    var fiveD = weather.daily;
    console.log(fiveD);

    // 5-day forecast element
    var forecast = document.createElement("p");
        forecast.innerHTML = "<br> <strong> 5-Day Forecast: <strong>";
        displayWeather.appendChild(forecast);

    // for five days additions
    var now = moment().format("MM[/]DD[/]YYYY");

    var temp = [];
    var wind = [];
    var humidity = [];
    var dayDate = [];

    for(var i = 0; i < fiveD.length; i++){
        // variables for weather types
        temp[i] = document.createElement("p");
        temp[i].textContent = "Temp: " + fiveD[i].temp.day + "°F";

        wind[i] = document.createElement("p");
        wind[i].textContent = "Wind: " + fiveD[i].wind_speed + " MPH";

        humidity[i] = document.createElement("p");
        humidity[i].textContent = "Humidity: " + fiveD[i].humidity + "%";

        // moments for each day
        dayDate[i] = document.createElement("p");
        dayDate[i].textContent = moment(now, "MM[/]DD[/]YYYY").add(i+1, "days").format("MM[/]DD[/]YYYY");
        dayDate[i].setAttribute("style", "font-weight: bold");

        // append each
        switch (i){
            case 0:
                firstDayEl.appendChild(dayDate[0]);
                firstDayEl.appendChild(temp[0]);
                firstDayEl.appendChild(wind[0]);
                firstDayEl.appendChild(humidity[0]);
                firstDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(firstDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 1:
                secondDayEl.appendChild(dayDate[1]);
                secondDayEl.appendChild(temp[1]);
                secondDayEl.appendChild(wind[1]);
                secondDayEl.appendChild(humidity[1]);
                secondDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(secondDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 2:
                thirdDayEl.appendChild(dayDate[2]);
                thirdDayEl.appendChild(temp[2]);
                thirdDayEl.appendChild(wind[2]);
                thirdDayEl.appendChild(humidity[2]);
                thirdDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(thirdDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 3:
                fourthDayEl.appendChild(dayDate[3]);
                fourthDayEl.appendChild(temp[3]);
                fourthDayEl.appendChild(wind[3]);
                fourthDayEl.appendChild(humidity[3]);
                fourthDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(fourthDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 4:
                fifthDayEl.appendChild(dayDate[4]);
                fifthDayEl.appendChild(temp[4]);
                fifthDayEl.appendChild(wind[4]);
                fifthDayEl.appendChild(humidity[4]);
                fifthDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(fifthDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
        }
    }
        
}


cityFormEl.addEventListener("submit", formSubmitHandler);