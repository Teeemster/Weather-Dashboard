//Form Variables
var searchButton = document.getElementById("searchButton");
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


//Pull Prior Cities
var cityArray = JSON.parse(localStorage.getItem('Cities')) || [];
for (let i = 0; i < cityArray.length; i++) {
    var priorCityButton = document.createElement("button");
    priorCityButton.className = "priorCity col - 12";
    priorCityButton.textContent = cityArray[i];
    priorCityContainer.appendChild(priorCityButton)
}

//City Search Function and API Pull Function
searchButton.addEventListener("click", function () {

    //Clear Prior Data
    currDayList.textContent = ""
    fiveDayList.textContent = ""

    //City Search and Prior History Append
    var cityTextContent = cityTextArea.value;
    var listItemEl = document.createElement("button");
    listItemEl.className = "priorCity col-12";
    listItemEl.textContent = cityTextContent;
    priorCityContainer.appendChild(listItemEl);

    //Store Cities
    var newData = cityTextContent


    if (localStorage.getItem("Cities") == null) {
        localStorage.setItem("Cities", "[]");
    }

    var oldData = JSON.parse(localStorage.getItem("Cities"))

    oldData.push(newData)

    localStorage.setItem("Cities", JSON.stringify(oldData))


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
                var tempInfo = data.list[i].main.temp;
                tempInfo = tempInfo - 273.15;
                tempInfo = tempInfo * 1.8 + 32;
                tempInfo = Math.round(tempInfo);
                var windInfo = data.list[i].wind.speed;
                var humidityInfo = data.list[i].main.humidity;
                var cloudInfo = data.list[i].weather[0].main;
                console.log(cloudInfo);

                if (cloudInfo == "Thunderstorm") {

                    var weatherInfo = " 🌩 " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);

                }

                else if (cloudInfo == "Clouds") {

                    var weatherInfo = " ⛅ " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);
                }

                else if (cloudInfo == "Mist" || cloudInfo == "Rain") {

                    var weatherInfo = " 🌧 " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);
                }

                else {

                    var weatherInfo = " 🌞 " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);

                }

            }
        });

    //API Current Fetch
    fetch(currFullRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var currentDate = new Date(data.dt * 1000);
            var cityName = data.name;
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
            var cloudCurrent = data.weather[0].main;
            console.log(cloudCurrent);

            //Cloud Icon
            if (cloudCurrent == "Thunderstorm") {

                var currWeatherInfo = " 🌩 " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }

            else if (cloudCurrent == "Clouds") {

                var currWeatherInfo = " ⛅ " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }

            else if (cloudCurrent == "Mist" || cloudCurrent == "Rain") {

                var currWeatherInfo = " 🌧 " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }

            else {

                var currWeatherInfo = " 🌞 " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }


            //UV Index Pull
            fetch(fullUVRequestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var currUVItem = document.createElement("li");
                    if (data.current.uvi <= 2) {
                        currUVItem.textContent = "UV Index: " + data.current.uvi + " 🟢​ "
                    }

                    else if (data.current.uvi <= 5) {
                        currUVItem.textContent = "UV Index: " + data.current.uvi + " 🟡​ "
                    }

                    else {
                        currUVItem.textContent = "UV Index: " + data.current.uvi + " ​🔴​ "
                    }
                    currDayList.appendChild(currUVItem);
                })
        })
    
});

//Pull Prior City Button
var priorButton = document.getElementsByClassName("priorCity");

for (let i = 0; i < priorButton.length; i++) {
    priorButton[i].addEventListener('click', priorFunction, false);
}

//City Search Function and API Pull Function
function priorFunction() {

    cityTextContent = this.textContent
    console.log(cityTextContent)

    //Clear Prior Data
    currDayList.textContent = ""
    fiveDayList.textContent = ""

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
                var tempInfo = data.list[i].main.temp;
                tempInfo = tempInfo - 273.15;
                tempInfo = tempInfo * 1.8 + 32;
                tempInfo = Math.round(tempInfo);
                var windInfo = data.list[i].wind.speed;
                var humidityInfo = data.list[i].main.humidity;
                var cloudInfo = data.list[i].weather[0].main;
                console.log(cloudInfo);

                if (cloudInfo == "Thunderstorm") {

                    var weatherInfo = " 🌩 " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);

                }

                else if (cloudInfo == "Clouds") {

                    var weatherInfo = " ⛅ " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);
                }

                else if (cloudInfo == "Mist" || cloudInfo == "Rain") {

                    var weatherInfo = " 🌧 " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);
                }

                else {

                    var weatherInfo = " 🌞 " + "  Date: " + dateInfo + " | Temp: " + tempInfo + " °F " + " | Wind: " + windInfo + " MPH " + " | Humidity: " + humidityInfo + " %";
                    var tempItem = document.createElement("li");
                    tempItem.textContent = weatherInfo;
                    fiveDayList.appendChild(tempItem);
                }

            }
        })

    //API Current URL
    fetch(currFullRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var currentDate = new Date(data.dt * 1000);
            var cityName = data.name;
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
            var cloudCurrent = data.weather[0].main;
            console.log(cloudCurrent);

            if (cloudCurrent == "Thunderstorm") {

                var currWeatherInfo = " 🌩 " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }

            else if (cloudCurrent == "Clouds") {

                var currWeatherInfo = " ⛅ " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }

            else if (cloudCurrent == "Mist" || cloudCurrent == "Rain") {

                var currWeatherInfo = " 🌧 " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }

            else {

                var currWeatherInfo = " 🌞 " + cityName + " | " + currentDate + " | Temp: " + currTempInfo + " °F " + " | Wind: " + currWindInfo + " MPH " + " | Humidity: " + currHumidityInfo + " %";
                var currTempItem = document.createElement("li");
                currTempItem.textContent = currWeatherInfo;
                currDayList.appendChild(currTempItem);

            }

            //UV Index Pull
            fetch(fullUVRequestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var currUVItem = document.createElement("li");
                    if (data.current.uvi <= 2) {
                        currUVItem.textContent = "UV Index: " + data.current.uvi + " 🟢​ "
                    }

                    else if (data.current.uvi <= 5) {
                        currUVItem.textContent = "UV Index: " + data.current.uvi + " 🟡​ "
                    }

                    else {
                        currUVItem.textContent = "UV Index: " + data.current.uvi + " ​🔴​ "
                    }
                    currDayList.appendChild(currUVItem);
                })
        })

};
