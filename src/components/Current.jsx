import React from "react";
import { formatDateString, formatTimeString } from "../utils/dateUtils";

const Current = ({ city, cityName }) => {
    const { weather, main, wind, rain } = city;

    const description = weather[0].description;
    const weatherDescription = description.charAt(0).toUpperCase() + description.slice(1);
    const weatherIconURL = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    const temperature = Math.round(main.temp); // Use a rounded temperature
    const humidity = main.humidity;
    const precipitation = rain ? rain["3h"] || 0 : 0 // If no rain in the response, then set it to 0
    const windSpeed = wind.speed;

    // Get and format the current date and time
    const date = new Date();
    const formattedDate = formatDateString(date);
    const formattedTime = formatTimeString(date);


    return (
        <div className="current-weather-container">
            <div className="city-container">
                <p className="current-city-text">{cityName}</p>
                <p className="p-grey-13">{weatherDescription}</p>
            </div>
            <div className="temp-container">
                <img src={weatherIconURL} alt="Weather Icon" />
                <p>{`${temperature}°C`}</p>
            </div>
            <div className="date-container">
                <p className="current-date-text">{formattedDate}</p>
                <p className="p-grey-13">{formattedTime}</p>
            </div>
            <div className="wind-container">
                <p className="p-grey-13">{`Wind: ${windSpeed} m/s`}</p>
                <p className="p-grey-13">{`Humidity: ${humidity} %`}</p>
                <p className="p-grey-13">{`Precipitation (3 h): ${precipitation} mm`}</p>
            </div>
        </div>
    );
}

export default Current;