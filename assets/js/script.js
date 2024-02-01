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
    
    $(window).on("load", function() {
    currentLocation();
    retrieveLocalStorage();
    });

    var searchButton = document.getElementById ("fetch-button");
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + q + "&appis=45321ce296030dae198763830cd900c8";
    var q = "name";
    

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
    });
