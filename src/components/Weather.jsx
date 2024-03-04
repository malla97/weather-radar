import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Current from "./Current";
import Forecast from "./Forecast";

const Weather = ({ cities, selectedCity }) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const URL = "https://api.openweathermap.org/data/2.5/";

    const [currentWeatherData, setCurrentWeatherData] = useState([]);
    const [forecastedWeatherData, setForecastedWeatherData] = useState([]);
    const initialized = useRef(false); // Use this because of strict mode, so no duplicates even on development mode

    useEffect(() => {
        // Fetch data for cities only if not initialized
        if (!initialized.current) {
            initialized.current = true;
            const fetchWeatherData = async (latitude, longitude) => {
                try {
                    // Fetch current weather
                    const currentResponse = await axios.get(`${URL}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
                    setCurrentWeatherData(prevData => [...prevData, currentResponse.data]);

                    // Fetch forecasted weather
                    const forecastResponse = await axios.get(`${URL}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
                    setForecastedWeatherData(prevData => [...prevData, forecastResponse.data]);
                } catch (error) {
                    console.log(error);
                }
            };
        
            for (const city of cities) {
                fetchWeatherData(city.lat, city.lon);
            }
        }

    }, [cities]);


    let CurrentWeatherElements;
    if (!selectedCity) {
        CurrentWeatherElements = currentWeatherData.map((city) =>
            <Current 
                key={city.id} 
                name={city.name}
                weather={city.weather[0].description}
                weatherIcon={city.weather[0].icon}
                temperature={city.main.temp}
                wind={city.wind.speed}
                humidity={city.main.humidity}
                precipitation={city.rain ? city.rain["3h"] || 0 : 0}
                date={city.dt}
            />
        );
    } else {
        // Selected city
    }

    return (
        <div className="weather-container">
            {CurrentWeatherElements}
            <Forecast />
        </div>
    );
}

export default Weather;