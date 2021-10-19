//Form Variables
var searchButton = document.getElementById("searchButton");
var priorCityContainer = document.getElementById("priorCityContainer");
var cityTextArea = document.getElementById("cityTextArea");

//API Variables
var requestURL = "api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "&appid=e7ddda053e014bb0464681d224273dcf";

//City Search Function and API Pull Function
searchButton.addEventListener("click", function () {

    //City Search and Prior History Append
    var cityTextContent = cityTextArea.value;
    var listItemEl = document.createElement("button");
    listItemEl.className = "priorCity col-8";
    listItemEl.textContent = cityTextContent;
    priorCityContainer.appendChild(listItemEl);

    //API URL
    var fullRequestURL = requestURL + cityTextContent + apiKey
    console.log(fullRequestURL)

    //API Fetch
    fetch(fullRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
});

