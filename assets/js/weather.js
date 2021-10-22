//Form Variables
var searchButton = document.getElementById("searchButton");
var priorCity = document.getElementsByClassName("priorCity");
var priorCityContainer = document.getElementById("priorCityContainer");
var cityTextArea = document.getElementById("cityTextArea");
var currentDayForecast = document.getElementById("currentDayForecast");
var fiveDayForecast = document.getElementById("fiveDayForecast");
var fiveDayList = document.getElementById("fiveDayList");
var currDayList = document.getElementById("currDayList");

//API Variables
var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "&appid=e7ddda053e014bb0464681d224273dcf";
var currRequestURL = "https://api.openweathermap.org/data/2.5/weather?q="
var uvRequestURL = "https://api.openweathermap.org/data/2.5/onecall?"

//City Search Function and API Pull Function
searchButton.addEventListener("click", function () {
    //City Search and Prior History Append
    var cityTextContent = cityTextArea.value;
    var listItemEl = document.createElement("button");
    listItemEl.className = "priorCity col-8";
    listItemEl.id = cityTextContent;
    listItemEl.textContent = cityTextContent;
    priorCityContainer.appendChild(listItemEl);

    //API Current URL
    var currFullRequestURL = currRequestURL + cityTextContent + apiKey
    console.log(currFullRequestURL)

    //API Forecast URL
    var fullRequestURL = requestURL + cityTextContent + apiKey
    console.log(fullRequestURL)

    //API Forecast Fetch
    fetch(fullRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Temp
            for (var i = 0; i < 40; i = i + 8) {
                var dateInfo = data.list[i].dt_txt;
                console.log(dateInfo);
                var tempInfo = data.list[i].main.temp;
                tempInfo = tempInfo - 273.15;
                tempInfo = tempInfo * 1.8 + 32;
                tempInfo = Math.round(tempInfo);
                var windInfo = data.list[i].wind.speed;
                var humidityInfo = data.list[i].main.humidity;
                var weatherInfo = "Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                var tempItem = document.createElement("li");
                tempItem.textContent = weatherInfo;
                fiveDayList.appendChild(tempItem);
            }

            //Store Five Day Forecast
            localStorage.setItem(cityTextContent, JSON.stringify(weatherInfo));

        })

    //API Current URL
    fetch(currFullRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var currTempInfo = data.main.temp;
            var currWindInfo = data.wind.speed;
            var currHumidityInfo = data.main.humidity;
            var latInfo = data.coord.lat;
            var longInfo = data.coord.lon;
            var fullUVRequestURL = uvRequestURL + "lat=" + latInfo + "&lon=" + longInfo + "&exclude=hourly,daily&appid=e7ddda053e014bb0464681d224273dcf"
            console.log(fullUVRequestURL);
            currTempInfo = currTempInfo - 273.15;
            currTempInfo = currTempInfo * 1.8 + 32;
            currTempInfo = Math.round(currTempInfo);
            var currWeatherInfo = "Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
            var currTempItem = document.createElement("li");
            currTempItem.textContent = currWeatherInfo;
            currDayList.appendChild(currTempItem);

            //Store Current Day Weather
            var currWeatherStore = cityTextContent + " current"
            localStorage.setItem(currWeatherStore, JSON.stringify(currWeatherInfo))

            //UV Index Pull
            fetch(fullUVRequestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var currUVItem = document.createElement("li");
                    currUVItem.textContent = "UV Index: " + data.current.uvi;
                    currDayList.appendChild(currUVItem);

                    //Store Current UV
                    var currUVStore = cityTextContent + " current UV"
                    localStorage.setItem(currUVStore, JSON.stringify(data.current.uvi))
                })
        })

});


console.log(typeof priorCity);
console.log(typeof searchButton);

//City Prior Search
priorCity.addEventListener("click", function () {
    console.log("hello world")
    currentDayForecast.textContent = "";
    fiveDayForecast.textContent = "";
    fiveDayList.textContent = "";
    currDayList.textContent = "";
});