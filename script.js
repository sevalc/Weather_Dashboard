//create variable for fetching and storing data

var apiKey = "019cb097ec31d6ff5a6b7d56b3297441";
var cityInputError = false;

//fetch info when a city name entered as input
function cityFetch(city) {
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";

  //provide city name, date, icon for weather condition as header on card
  //provide temp, humidity, wind speed, UV index

  fetch(requestURL)
    .then(function (response) {
      if (response.status !== 200) {
        alert("Please enter a valid city name.");
        cityInputError = true;
      } else {
        cityInputError = false;
      }
      return response.json();
    })
    .then(function (readableData) {
      if (cityInputError) {
        return;
      }
      var cityName = document.getElementById("city-name");
      cityName.textContent = readableData.name;
      var date = moment().format("(" + "M, D, YYYY" + ")");
      document.getElementById("currentDay").textContent = date;
      var cityHumidity = readableData.main.humidity;
      document.getElementById("humidity").textContent =
        "Humidity: " + cityHumidity + " %";
      var cityTemperature = readableData.main.temp;
      document.getElementById("temperature").textContent =
        "Temperature: " + cityTemperature + " F";
      var citywindSpeed = readableData.wind.speed;
      document.getElementById("wind").textContent =
        "Wind Speed: " + citywindSpeed + " MPH";
    });

  //add input to html to dispay
  //show 5 day future conditions for the same city
  var requestURLForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestURLForecast)
    .then(function (response) {
      if (response.status !== 200) {
        cityInputError = true;
      } else {
        cityInputError = false;
      }
      return response.json();
    })
    .then(function (readableDataForecast) {
      if (cityInputError) {
        return;
      }

      for (var writeIndex = 0; writeIndex < 5; writeIndex++) {
        var readIndex = writeIndex * 8;

        var forecastAtTimePoint = readableDataForecast.list[readIndex];

        document.getElementById("currentDayCard" + writeIndex).textContent =
          forecastAtTimePoint.dt_txt;

        var cityHumidity1 = forecastAtTimePoint.main.humidity;
        document.getElementById("humidityCard" + writeIndex).textContent =
          "Humidity: " + cityHumidity1 + " %";

        var cityTemperature1 = forecastAtTimePoint.main.temp;
        document.getElementById("temperatureCard" + writeIndex).textContent =
          "Temperature: " + cityTemperature1 + " F";

        var citywindSpeed1 = forecastAtTimePoint.wind.speed;
        document.getElementById("windCard" + writeIndex).textContent =
          "Wind Spd: " + citywindSpeed1 + " MPH";
      }
    });
}

cityFetch("Seattle");

document.getElementById("searchBtn").addEventListener("click", function () {
  var cityInput = document.getElementById("textarea1").value;
  if (cityInput === "") {
    return;
  }
  cityFetch(cityInput);
  cityHistoryArray.unshift(cityInput);
  if (cityHistoryArray.length > 10) {
    cityHistoryArray.pop();
  }
  renderHistoryHTML();
});

;

var cityHistoryArray = [];

function renderHistoryHTML() {
  var collectionUlEl = document.getElementById("collectionList");
  collectionUlEl.innerHTML = "";
  for (var i = 0; i < cityHistoryArray.length; i++) {
    var li = document.createElement("li");
    li.textContent = cityHistoryArray[i];
    collectionUlEl.appendChild(li);
  }
}

function cityClicked(event) {
  cityFetch(event.target.textContent);
}

document.getElementById("collectionList").addEventListener("click", cityClicked)





