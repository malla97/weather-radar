import React from "react";
import { formatDateString, formatTimeString } from "../utils/dateUtils";

const Current = ({ city }) => {
    const { name, weather, main, wind, rain } = city;

    const weatherDescription = weather[0].description;
    const weatherIconURL = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    const temperature = Math.round(main.temp); // Use a rounded temperature
    const humidity = main.humidity;
    const precipitation = rain ? rain["3h"] || 0 : 0 // If no rain in the response, then set it to 0
    const windSpeed = wind.speed;

    // Get and format the current date and time
    const date = new Date();
    console.log(date);
    const formattedDate = formatDateString(date);
    const formattedTime = formatTimeString(date);


    return (
        <div className="current-weather-container">
            <div className="city-container">
                <p>{name}</p>
                <p>{weatherDescription}</p>
            </div>
            <div className="temp-container">
                <img src={weatherIconURL} alt="Weather Icon" />
                <p>{`${temperature}°C`}</p>
            </div>
            <div className="date-container">
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
            <div className="wind-container">
                <p>{`Wind: ${windSpeed} m/s`}</p>
                <p>{`Humidity: ${humidity} %`}</p>
                <p>{`Precipitation (3 h): ${precipitation} mm`}</p>
            </div>
        </div>
    );
}

export default Current;