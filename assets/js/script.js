
// city search form container
var cityFormEl = document.querySelector(".card-body");
var cityInputEl = document.querySelector(".city");
var previousCityBtns = document.querySelector(".previous-cities");

// line between search button and previous city buttons
var lineBreak = document.createElement("hr");
    lineBreak.setAttribute("style", "height: 2px; background-color: gray; margin-right: 80px;");
    previousCityBtns.appendChild(lineBreak);

// to hold weather containers
var displayWeather = document.querySelector(".display-weather");

// current weather containers
var currentWeatherEl = document.querySelector(".currentWeather");
var citySearchTerm = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");

// subtitle for five-days weather
var forecast = document.createElement("p");

// for five days additions
var now = moment().format("MM[/]DD[/]YYYY");

var temp = [];
var wind = [];
var humidity = [];
var dayDate = [];
var weatherIcon = [];

// five days weather container to hold all days
var fiveDaysContainer = document.querySelector(".fiveDaysContainer");
var firstDayEl = document.querySelector("#firstDayEl");
var secondDayEl = document.querySelector("#secondDayEl");
var thirdDayEl = document.querySelector("#thirdDayEl");
var fourthDayEl = document.querySelector("#fourthDayEl");
var fifthDayEl = document.querySelector("#fifthDayEl");


// get city's weather info from api function
var getWeather = function(city){
    // api to find city's lat and lon coords
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=c48becc83b15142c299e329c55a89278";
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            for(var i = 0; i < data.length; i++){
                // gets lat and lon
                var cityLat = data[i].lat;
                var cityLon = data[i].lon;

                // api to find city's weather **include &&units=imperial for fahrenheit
                var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=minutely,hourly,alerts&appid=c48becc83b15142c299e329c55a89278&&units=imperial";
                fetch(apiUrl).then(function(response){
                    response.json().then(function(data){
                        // gets current and next 5 days weather
                        displayCurrentWeather(data, city);
                        displayFiveDays(data);
                        saveCity(data, city);
                    });
                });
            }
        });
    });
};

// reads input and goes through getWeather()
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

// display current weather
var displayCurrentWeather = function(weather, searchTerm){
    // easy format to find certain weather
    cityName = weather.current;
    var currentWeatherIcon = document.createElement("i");
    console.log(cityName.weather[0].main);
        // add class to turn weatherIcon into an img
        switch(cityName.weather[0].main){
            case "Clouds":
                currentWeatherIcon.classList = "bi bi-cloud-fill";
                break;
            case "Rain":
                currentWeatherIcon.classList = "bi bi-cloud-rain-fill";
                break;
            case "Snow":
                currentWeatherIcon.classList = "bi bi-cloud-snow-fill";
                break;
            case "Clear":
                currentWeatherIcon.classList = "bi bi-brightness-high-fill";
                break;
            case "Fog":
                currentWeatherIcon.classList = "bi bi-cloud-fog-fill";
                break;
            case "Mist":
                currentWeatherIcon.classList = "bi bi-cloud-haze2-fill";
                break;
        }

    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm + " (" + moment().format("MM[/]DD[/]YYYY") + ") ";
    
        // temp, wind, humidity, UV index
        var temp = document.createElement("p");
            temp.textContent = "Temp: " + cityName.temp + "°F";

        var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + cityName.humidity + "%";

        var wind = document.createElement("p");
            wind.textContent = "Wind: " + cityName.wind_speed + " MPH";

        var uvIndex = document.createElement("p");
            var UVI = document.createElement("p");
                UVI.textContent = cityName.uvi;

                // if-else to see if UV index number is favorable, moderate, or severe
                if(cityName.uvi >= 0 && cityName.uvi < 2){
                    UVI.style = "border-radius: 3px; margin-left: 5px; background-color: green; text-align: center; color: white; padding-left: 10px; padding-right: 10px";
                }
                else if(cityName.uvi >= 2 && cityName.uvi < 5){
                    UVI.style = "border-radius: 3px; margin-left: 5px; background-color: yellow; text-align: center; color: black; padding-left: 10px; padding-right: 10px";
                }
                else if(cityName.uvi >= 5){
                    UVI.style = "border-radius: 3px; margin-left: 5px; background-color: red; text-align: center; color: white; padding-left: 10px; padding-right: 10px";
                }

            uvIndex.textContent = "UV Index:";
            uvIndex.setAttribute("style", "display: flex");
            uvIndex.appendChild(UVI);

    // add padding for looks
    citySearchTerm.setAttribute("style", "padding: 10px");
    weatherContainerEl.setAttribute("style", "padding: 10px");

    // append to container
    citySearchTerm.appendChild(currentWeatherIcon);
    weatherContainerEl.appendChild(temp);
    weatherContainerEl.appendChild(humidity);
    weatherContainerEl.appendChild(wind);
    weatherContainerEl.append(uvIndex);

    // append container to the dom
    currentWeatherEl.appendChild(weatherContainerEl);
    currentWeatherEl.setAttribute("style", "border:1px solid black");

};

// display five days weather
var displayFiveDays = function(weather){
    
    // element for easy access
    var fiveD = weather.daily;

    // remove previous city weathers
    if(fiveDaysContainer.children.length > 0){
        firstDayEl.textContent = "";
        secondDayEl.textContent = "";
        thirdDayEl.textContent = "";
        fourthDayEl.textContent = "";
        fifthDayEl.textContent = "";
    };


    // 5-day forecast element
    forecast.innerHTML = "<br> <strong> 5-Day Forecast: <strong>";
    displayWeather.appendChild(forecast);
    
    for(var i = 0; i < 6; i++){
        
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

        // weather icons
        weatherIcon[i] = document.createElement("i");
        switch(fiveD[i].weather[0].main){
            case "Clouds":
                weatherIcon[i].classList = "bi bi-cloud-fill";
                break;
            case "Rain":
                weatherIcon[i].classList = "bi bi-cloud-rain-fill";
                break;
            case "Snow":
                weatherIcon[i].classList = "bi bi-cloud-snow-fill";
                break;
            case "Clear":
                weatherIcon[i].classList = "bi bi-brightness-high-fill";
                break;
            case "Fog":
                weatherIcon[i].classList = "bi bi-cloud-fog-fill";
                break;
            case "Mist":
                weatherIcon[i].classList = "bi bi-cloud-haze2-fill";
        }

        // append each
        switch (i){
            case 0:
                firstDayEl.append(dayDate[0], weatherIcon[0]);
                firstDayEl.appendChild(temp[0]);
                firstDayEl.appendChild(wind[0]);
                firstDayEl.appendChild(humidity[0]);
                firstDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(firstDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 1:
                secondDayEl.append(dayDate[1], weatherIcon[1]);
                secondDayEl.appendChild(temp[1]);
                secondDayEl.appendChild(wind[1]);
                secondDayEl.appendChild(humidity[1]);
                secondDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(secondDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 2:
                thirdDayEl.append(dayDate[2], weatherIcon[2]);
                thirdDayEl.appendChild(temp[2]);
                thirdDayEl.appendChild(wind[2]);
                thirdDayEl.appendChild(humidity[2]);
                thirdDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(thirdDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 3:
                fourthDayEl.append(dayDate[3], weatherIcon[3]);
                fourthDayEl.appendChild(temp[3]);
                fourthDayEl.appendChild(wind[3]);
                fourthDayEl.appendChild(humidity[3]);
                fourthDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(fourthDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
            case 4:
                fifthDayEl.append(dayDate[4], weatherIcon[4]);
                fifthDayEl.appendChild(temp[4]);
                fifthDayEl.appendChild(wind[4]);
                fifthDayEl.appendChild(humidity[4]);
                fifthDayEl.setAttribute("style", "background-color: rgb(31, 31, 51)");
                fiveDaysContainer.appendChild(fifthDayEl);
                displayWeather.appendChild(fiveDaysContainer);
                break;
        }
    }
        
};

// save city after displaying
var saveCity = function(data, city){
    var previousCity = city;
    var previousData = data;
    
    // store city into local storage
    localStorage.setItem(previousCity, JSON.stringify(previousData));
    JSON.parse(localStorage.getItem(previousCity));
    
    // create button for each saved city
    var cityBtn = document.createElement("button");
    cityBtn.classList.add("cityBtn");
    cityBtn.textContent = city;

    // append each button
    previousCityBtns.appendChild(cityBtn);
    
    // when city button is clicked, it displays it again
    var savedCityBtn = function(){
        // checks if city is already a button
        if(previousCity === city){
            // removes if there is one but still goes through
            previousCityBtns.removeChild(cityBtn);
            getWeather(previousCity);
        }
        else{
            getWeather(previousCity);
        }
    }
    
    cityBtn.addEventListener("click", savedCityBtn);

};


cityFormEl.addEventListener("submit", formSubmitHandler);
