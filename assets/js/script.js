

var city = "sacramento";

// function to get city's lat and long
var getCity = function(){
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=c48becc83b15142c299e329c55a89278";

    console.log(apiUrl);
    fetch(apiUrl).then(function(response){
            response.json().then(function(data){
                console.log(data);
            });
        });


};

getCity();

