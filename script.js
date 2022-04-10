//create variable for fetching and storing data

var apiKey = "019cb097ec31d6ff5a6b7d56b3297441";
var city = "seattle"
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"

//fetch info when a city name entered as input 

fetch(requestURL).then(function(response) {
    return response.json();
    
}).then(function(readableData) {
    console.log(readableData)
    var cityName = document.getElementById("city-name");
    cityName.textContent = readableData.name;
    var date = moment().format("M, D, YYYY");
    document.getElementById("currentDay").textContent = date;
    var cityHumidity = readableData.main.humidity;
    document.getElementById("humidity").textContent = "Humidity: " + cityHumidity + "%";
    var cityTemperature = readableData.main.temp;
    document.getElementById("temperature").textContent = "Temperature: " + cityTemperature + " F";
    var citywindSpeed = readableData.wind.speed;
    document.getElementById("wind").textContent = "Wind Speed: " + citywindSpeed + "MPH";
   
    }); 
 

    //provide city name, date, icon for weather condition as header on card 
    //provide temp, humidity, wind speed, UV index 
        //UV index shows a color represents favorable, moderate or severe
//add input to html to dispay
//show 5 day future conditions for the same city 
var requestURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial"

fetch(requestURLForecast).then(function(response) {
    return response.json();
    
}).then(function(readableDataForecast) {
    console.log(readableDataForecast)
    
})

//when a new city is searched, add last city to search history 
//when clicked on a city at search history, present same data as before 

