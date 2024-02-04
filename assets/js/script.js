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
        var currentDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +apiKey;
        
        fetch (currentDayUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("network response was not okay. Status Code: " +response.status);   
                }
            return response.json();
            })
            .then(function (data) {
                console.log (data);
                cityName = data.name;

                localStorage.setItem("cityName", cityName);
                document.querySelector("#search-storage p").textContent = cityName;
                var i = 1;
                var currentWeather = data;
                var tempKelvin = currentWeather.main.temp
                iconCode = currentWeather.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" +iconCode+ ".png";
                                    
                var currentDay = dayjs(currentWeather.dt*1000).format('MM/DD/YYYY dddd');

                document.getElementById("icon-" + i).src = iconUrl;
                document.getElementById("current-city").textContent = data.name;
                document.getElementById("current-temp-" + i).textContent = "Temperature: " + ((tempKelvin-273.15)*9/5+32).toFixed(0) + " °F";
                document.getElementById("current-humidity-" + i).textContent = "Humidity: " + currentWeather.main.humidity + "%";
                document.getElementById("current-wind-" + i).textContent = "Wind Speed: " + currentWeather.wind.speed + " m/s";
                
                document.getElementById("day-" + i).textContent = "Current Day: " + currentDay;
                console.log(data);
            })

        fetch(requestUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("network response was not okay. Status Code: " +response.status);
                }
                console.log()
            return response.json();
            })
            .then(function (data) {
                for ( var i = 2; i < 7; i++) {
                    var num = (i-2) *8;

                    var currentWeather = data.list[num];
                    var tempKelvin = currentWeather.main.temp
                    iconCode = currentWeather.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" +iconCode+ ".png";
                                        
                    var currentDay = dayjs(currentWeather.dt*1000).format('MM/DD/YYYY dddd');

                    document.getElementById("icon-" + i).src = iconUrl;
                    document.getElementById("current-city").textContent = data.city.name;
                    document.getElementById("current-temp-" + i).textContent = "Temperature: " + ((tempKelvin-273.15)*9/5+32).toFixed(0) + " °F";
                    document.getElementById("current-humidity-" + i).textContent = "Humidity: " + currentWeather.main.humidity + "%";
                    document.getElementById("current-wind-" + i).textContent = "Wind Speed: " + currentWeather.wind.speed + " m/s";
                    
                    document.getElementById("day-" + i).textContent = "Current Day: " + currentDay;
                    console.log(data);
                }
                // var locationArray = JSON.parse(localStorage.getItem("cityList")) || [];
                // locationArray.push (cityName)
                // localStorage.setItem('cityList', JSON.stringify(locationArray));

                // Update the text content of the <p> element
                
                // for (var i = 1; i < 6; i++) {
                //     document.querySelector('#search-storage' + i).textContent = locationArray[i];
                // }
                });
            })
            // .catch(function(error) {
            // console.error("Fetch error:", error);
        // })

   });
