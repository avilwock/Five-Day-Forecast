//This waits for the HTML to be fully loaded before executing JS code with the callback function
document.addEventListener("DOMContentLoaded", function () {
    //This line retrieves HTML element for the id query, and names it cityNameInput
    var cityNameInput = document.getElementById("query");
    //This line assigns the fetch-button to the variable fetchButton
    var fetchButton = document.getElementById("fetch-button");
    //This line uses the query selector to assign search-storage id to the container
    //It is where the search history buttons will be displayed    
    var searchStorageContainer = document.querySelector("#search-storage");
    //This line gets the cityList from local storage and adds it to the list as an array
    var storedCityList = JSON.parse(localStorage.getItem("cityList")) || [];
        //this checks the length to see if it is greater than 10 entries, and if it is,
        //it keeps only the last ten entries using slice
        if (storedCityList.length > 10) {
            storedCityList = storedCityList.slice(-10);
        }
   //this creates the addCityButton that creates the button giving it the cityName entered
   //when the button is clicked
   function addCityButton(cityName) {
    //this creates a new button element
    var cityButton = document.createElement("button");
        //this ensures the cityName is added to the button that's created
        cityButton.textContent = cityName;
        //this adds an event listener
        cityButton.addEventListener("click", function () {
            //this is sets the cityNameInput to the cityName when clicked
            cityNameInput.value = cityName;
            //This triggers the fetchButton for the cityName button clicked
            fetchButton.click();
        });
        //this appends the city button to the list in the document
        searchStorageContainer.appendChild(cityButton);
        //This separates the buttons onto multiple lines instead of adjacently
        searchStorageContainer.appendChild(document.createElement("br"));
    }
    function updateStoredCitiesDisplay() {
        //This clears the contents of the searchStorage
        searchStorageContainer.innerHTML = "";
        //Thsi starts a loop over reversedList of each element
        var reversedList = storedCityList.slice().reverse();
        //this creates a reversed copy of the city list to display most recent on top
        reversedList.forEach(function (cityName) {
        //this adds a city button for each cityName
        addCityButton(cityName);  
        });
   }
   //This adds a click event to handle clicks on the cityName buttons
   searchStorageContainer.addEventListener("click", function (event) {
    //this checks to make sure the tag name has the element button
        if (event.target.tagName === "BUTTON") {
            //if the clicked element is a button, it sets the value of cityNameInput
            //to the cityName on the button
            cityNameInput.value = event.target.textContent;
            //this triggers a click on the fetch button
            fetchButton.click();
        }
    });
    //This calls on the update storagecitiesdisplay to start the displayed buttons
    updateStoredCitiesDisplay();
    //This adds the listener fetch button. It prevents default and start the search
    //for the weather.
    fetchButton.addEventListener("click", function(event) {
        event.preventDefault();
        //This sets the cityName to have proper conventions when displayed with an upper
        //case first letter at the beginning and after white space, and lower-case letters 
        //following
        var cityName=cityNameInput.value.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());;
        //gets the storedCityList from local storage, or array stays empty
        var storedCityList = JSON.parse(localStorage.getItem("cityList")) || [];
        //checks to see if the cityName is already stored or not
        if (storedCityList.indexOf(cityName) === -1) {
            //if it's not there, then it's added to the list
            storedCityList.push(cityName);
            //keeps the last 10 entries in storedCityList
            storedCityList = storedCityList.slice(-10);
            //updates the City list in local storage with the modified list
            localStorage.setItem("cityList", JSON.stringify(storedCityList));
        }
        //reverse the storedCityList for display so that the last entry is at the top
        storedCityList.reverse();
        //updates the buttons to have the new entry
        updateStoredCitiesDisplay();       
        //This declares the apiKey which is uniquely assigned
        var apiKey = "45321ce296030dae198763830cd900c8";
        //This creates the url for the api to retrieve city Name and apiKey
        var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
        //This creates the url for the api to retrieve the current day information
        var currentDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +apiKey;
        //This starts the request fo rthe currentDayUrl, checks for an error 
        fetch (currentDayUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("network response was not okay. Status Code: " +response.status);   
                }
            return response.json();
            })
            //if the response is okay, the fetch is run
            .then(function (data) {
                console.log (data);
                cityName = data.name;
                //This clears the existing content from the search
                var searchStorageContainer = document.querySelector("#search-storage");
                searchStorageContainer.innerHTML = ""; // Clear existing content
                storedCityList.forEach(function (cityName) {
                    var cityParagraph = document.createElement("button");
                    cityParagraph.textContent = cityName;
                    searchStorageContainer.appendChild(cityParagraph);
                });
                //This section retrieves the weather such as temperatrue, icon, humidity, and wind
                //speed.
                var i = 1;
                var currentWeather = data;
                var tempKelvin = currentWeather.main.temp
                iconCode = currentWeather.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" +iconCode+ ".png";
                //This uses dayJs to format the time response                                    
                var currentDay = dayjs(currentWeather.dt*1000).format('MM/DD/YYYY dddd');
                //these lines update the icon, current city, temp, humidity, and wind
                //temperature was converted from kelvin to C, the wind speed was converted from
                //m/s to mph
                document.getElementById("icon-" + i).src = iconUrl;
                document.getElementById("current-city").textContent = data.name;
                document.getElementById("current-temp-" + i).textContent = "Temperature: " + ((tempKelvin-273.15)*9/5+32).toFixed(0) + " °F";
                document.getElementById("current-humidity-" + i).textContent = "Humidity: " + currentWeather.main.humidity + "%";
                document.getElementById("current-wind-" + i).textContent = "Wind Speed: " + (currentWeather.wind.speed*2.2369).toFixed(0) + " mph";
                //This makes sure the day data is correct for the days displayed
                document.getElementById("day-" + i).textContent =currentDay;
                console.log(data);
            })
            //This catches the error and logs it if there is one
            .catch(function (error) {
                console.error("Error fetching current weather:", error);
            });
        //initiates a new fetch request for the five days
        fetch(requestUrl)
            //checks the response
            .then(function(response) {
                //if it is not a 200 response, it gives an error
                if (!response.ok) {
                    throw new Error("network response was not okay. Status Code: " +response.status);
                }

            //if okay, it converts the response to json
            return response.json();
            })
            //processes the returned data
            .then(function (data) {
                //this iterates a loop of i = 2 to i = 6 to properly show the five day data
                for ( var i = 2; i < 7; i++) {
                    //this access the forecast for each day, where the information provided is for
                    //every three hours
                    var num = (i-2) *8;
                    //retrieves weather for the speficied day, for date, icon, temp, humidity, wind
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
   });
