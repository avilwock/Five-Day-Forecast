# Five-Day-Forecast

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Description and Future Implementations

This project was created to pull the weather data from the Open Weather api when a city name was entered into a search box, and populate a page with the city name, the date spanning six days, an icon of the weather, the temperature, the humidity, and the wind speed.

The first date is displayed more prominently than the others on the top of the page, with the others in a row of five underneath it.

The search box on the left is where you enter the data, and the data is pulled from local storage to generate buttons that are interactive.

This project had room for improvements, including:
* pulling data from an api that updates more frequently
* having the last search stay on the page upon close so that it appears when the document is opened
* adding more visual objects such as background photos

## Access

To access this site, please visit: https://avilwock.github.io/Five-Day-Forecast/

## Usage

To use this document, type the city name into the search box on the left, and press enter. The five day forecast will be generated for the location that you enter. The city name will be stored below the search button on a button of its own that you can also click to call the weather data for that city. As more location names are added, more buttons are generated, leaving up to ten locations saved in storage.

![alt text](<assets/images/Five Day Forecast Img.jpeg>)

## Credits

With thanks to:

https://pagedart.com/blog/how-to-add-a-search-bar-in-html/

https://fonts.google.com/specimen/Alfa+Slab+One?preview.size=92&classification=Display

https://www.w3schools.com/css/css_margin.asp

Andrew Hardemon, Central Tutor Support

Xpert Learning Assistant

Logan Garland, Coding Bootcamp, University of Irvine California

## License

MIT License