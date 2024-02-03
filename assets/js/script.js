$(document).ready(function() {
    var timeElement = document.getElementById('currentDay');
    //This function is used to update the time
    function updateTime() {
    /*this creates the current day variable, and gets the current month, day, year,
    hours, minute, and second using dayjs*/
    var currentDate = dayjs().format("MMM DD, YYYY [at] hh:mm:ss");
    //This updates the text content of the HTML current day element with the current date
    timeElement.textContent = currentDate;
    }
    //This sets up an interval to repeat every 1 second to update the display time and date
    setInterval(updateTime, 1000);
})

    // var cityName= document.getElementById("text").value;
    cityNameInput = document.getElementById("query");
    // var cityName = cityName = cityNameInput.value;
    var fetchButton = document.getElementById("fetch-button");

    fetchButton.addEventListener("click", function() {
        var cityName=cityNameInput.value;
        
        var apiKey = "45321ce296030dae198763830cd900c8";
        var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

        fetch(requestUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("network response was not okay. Status Code: " +response.status);
                }
                console.log()
            return response.json();
            })
            .then(function (data) {
                var currentWeather = data.list[0];
                var tempKelvin = currentWeather.main.temp
                var latitude = data.city.coord.lat;
                var longitude = data.city.coord.lon;

                console.log(latitude);
                console.log(longitude);

                document.getElementById("current-city").textContent = data.city.name;
                document.getElementById("current-temp").textContent = ((tempKelvin-273.15)*9/5+32).toFixed(0) + " °F";
                document.getElementById("current-humidity").textContent = currentWeather.main.humidity + "%";
                document.getElementById("current-wind").textContent = currentWeather.wind.speed + " m/s";
                document.getElementById("current-UV").textContent = currentWeather.uvi;
                console.log(data);
           
                var coordUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;          
                return fetch(coordUrl);
            })
        
        
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Network response was not okay. Status Code: " + response.status);
                }
                return response.json();
            })

            .then(function(data) {
                document.getElementById("currentUV").textContent = currentWeather.uvi;   
                console.log(data);
            })
            .catch(function(error) {
            console.error("Fetch error:", error);
            });
})