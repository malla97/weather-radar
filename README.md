# weather-radar
This is a web application that fetches weather data from OpenWeatherMap service. The application shows current weather, as well as forecasted weather data to four pre determined cities in Finland. The user can choose to display the weather data for all of the cities at the same time, or choose one of the cities to display the weather data for.

### How to install the project
  1. Clone this project to a folder of your choosing and move to the root of the project (cd weather-radar).
  2. In terminal run *npm install* or *npm i* to install dependencies.
  3. To the root of the project create a *.env* file.
  4. In the .env file input VITE_API_KEY=<YOUR_API_KEY>, using your own API-key to OpenWeatherMap, without the <>-marks.

### How to run the program
In the terminal at the root of the project run a command *npm run frontend*, which should automatically open the program in your browser.
If not, the program runs at *http://localhost:5500/*.
Stop the program with *ctrl + C*.

I would suggest using Firefox as a browser and selecting iPhone 12/13 Pro Max as the device to inspect the mobile version,
as that's what was used to do the styling for mobile.

### Testing
To run unit tests run a command *npm run test* in the terminal.

This repository contains a CI-pipeline made with GitHub actions.
