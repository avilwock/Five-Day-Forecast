// var cityName= document.getElementById("text").value;
document.addEventListener("DOMContentLoaded", function () {
    cityNameInput = document.getElementById("query");
    // var cityName = cityName = cityNameInput.value;
    var fetchButton = document.getElementById("fetch-button");
    
    var storedCityName = localStorage.getItem("cityName");
    if (storedCityName) {
        document.querySelector("#search-storage p").textContent = storedCityName;
    }

    fetchButton.addEventListener("click", function() {
        event.preventDefault();
        var cityName=cityNameInput.value;

        if (!localStorage.getItem("cityName")) {
            localStorage.setItem("cityName", cityName);
            document.querySelector("#search-storage p").textContent = cityName;
        }

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
                iconCode = currentWeather.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" +iconCode+ ".png";
                
                var currentDay = dayjs().format('MM/DD/YYYY');

                document.getElementById("icon").src = iconUrl;
                document.getElementById("current-city").textContent = data.city.name;
                document.getElementById("current-temp").textContent = "Temperature: " + ((tempKelvin-273.15)*9/5+32).toFixed(0) + " °F";
                document.getElementById("current-humidity").textContent = "Humidity: " + currentWeather.main.humidity + "%";
                document.getElementById("current-wind").textContent = "Wind Speed: " + currentWeather.wind.speed + " m/s";
                
                document.getElementById("current-day").textContent = "Current Day: " + currentDay;
                console.log(data);

                localStorage.setItem('cityName', cityName);
                // Update the text content of the <p> element
                document.querySelector('#search-storage p').textContent = cityName;
                });
            })
            // .catch(function(error) {
            // console.error("Fetch error:", error);
        // })

   });
