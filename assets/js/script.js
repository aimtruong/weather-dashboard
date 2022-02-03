
var cityFormEl = document.querySelector(".card-body");
var cityInputEl = document.querySelector(".city");

var cityLat = 0;
var cityLon = 0;

var currentWeatherEl = document.querySelector(".currentWeather");
var citySearchTerm = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");

var getWeather = function(city){
    // api to find city's lat and lon coords
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=c48becc83b15142c299e329c55a89278";
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            for(var i = 0; i < data.length; i++){
                // gets lat and lon
                cityLat = data[i].lat;
                cityLon = data[i].lon;

                // api to find city's weather
                var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=minutely,hourly,alerts&appid=c48becc83b15142c299e329c55a89278";
                fetch(apiUrl).then(function(response){
                    response.json().then(function(data){
                        displayCurrentWeather(data, city);
                        console.log(data);
                        // gets current and next 5 days weather
                        console.log(data.current);
                        console.log(data.daily);
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

    // create a container for current weather
    var currentWeather = document.createElement("div");

        // temp, wind, humidity, UV index
        var temp = document.createElement("p");
            temp.textContent = "Temp: " + cityName.temp + "°F";

        var wind = document.createElement("p");
            wind.textContent = "Wind: " + cityName.wind_speed + " MPH";

        var humidty = document.createElement("p");
            humidty.textContent = "Humidity: " + cityName.humidity + "%";

        var uvIndex = document.createElement("p");
            uvIndex.textContent = "UV Index: " + cityName.uvi;

    // append to container
    currentWeather.appendChild(temp);
    currentWeather.appendChild(wind);
    currentWeather.appendChild(humidty);
    currentWeather.append(uvIndex);

    // append container to the dom
    weatherContainerEl.appendChild(currentWeather);

    // current weather element to append
    currentWeatherEl.setAttribute("style", "border:1px solid black");
    currentWeatherEl.appendChild(weatherContainerEl);

    displayFiveDays();

};


cityFormEl.addEventListener("submit", formSubmitHandler);