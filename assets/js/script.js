// var cityName= document.getElementById("text").value;
document.addEventListener("DOMContentLoaded", function () {
    var cityNameInput = document.getElementById("query");
    // var cityName = cityName = cityNameInput.value;
    var fetchButton = document.getElementById("fetch-button");
        
    var searchStorageContainer = document.querySelector("#search-storage");
    
    var storedCityList = JSON.parse(localStorage.getItem("cityList")) || [];
        if (storedCityList.length > 10) {
            storedCityList = storedCityList.slice(-10);
    }
    //document.querySelector("#search-storage p").textContent = storedCityList.join(", ");
   function addCityButton(cityName) {
    var cityButton = document.createElement("button");
        cityButton.textContent = cityName;
        cityButton.addEventListener("click", function () {
            cityNameInput.value = cityName;
            fetchButton.click();
        });
        
        searchStorageContainer.appendChild(cityButton);
        searchStorageContainer.appendChild(document.createElement("br"));
    }

    function updateStoredCitiesDisplay() {
        searchStorageContainer.innerHTML = "";
        var reversedList = storedCityList.slice().reverse();
        reversedList.forEach(function (cityName) {
        addCityButton(cityName);  
            });
   }

   searchStorageContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        cityNameInput.value = event.target.textContent;
        fetchButton.click();
    }
});

    updateStoredCitiesDisplay();

    fetchButton.addEventListener("click", function(event) {
        event.preventDefault();
        var cityName=cityNameInput.value.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());;
        var storedCityList = JSON.parse(localStorage.getItem("cityList")) || [];
   
        if (storedCityList.indexOf(cityName) === -1) {
            storedCityList.push(cityName);

            storedCityList = storedCityList.slice(-10);
            localStorage.setItem("cityList", JSON.stringify(storedCityList));
           
        }
        storedCityList.reverse();
        updateStoredCitiesDisplay();       
    
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
            
                var searchStorageContainer = document.querySelector("#search-storage");
                searchStorageContainer.innerHTML = ""; // Clear existing content
                storedCityList.forEach(function (cityName) {
                    var cityParagraph = document.createElement("button");
                    cityParagraph.textContent = cityName;
                    searchStorageContainer.appendChild(cityParagraph);
                });

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
                document.getElementById("current-wind-" + i).textContent = "Wind Speed: " + (currentWeather.wind.speed*2.2369).toFixed(0) + " mph";
                
                document.getElementById("day-" + i).textContent =currentDay;
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
                    document.getElementById("current-wind-" + i).textContent = "Wind Speed: " + (currentWeather.wind.speed*2.2369).toFixed(0) + " mph";
                    
                    document.getElementById("day-" + i).textContent = currentDay;
                    console.log(data);
                }
               
                });
            })
    return false;       
   });
