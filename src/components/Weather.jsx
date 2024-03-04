import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Current from "./Current";
import Forecast from "./Forecast";

const Weather = ({ cities, selectedCityName }) => {
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
    if (!selectedCityName) {
        // No selected city, display every city's weather
        CurrentWeatherElements = currentWeatherData.map((city) =>
            <Current
                key={city.id}
                city={city}
            />
        );
    } else {
        // Get the selected city
        const selectedCity = currentWeatherData.find(city => city.name === selectedCityName);
        <Current
            key={selectedCity.id}
            city={currentCity}
        />
    }

    return (
        <div className="weather-container">
            {CurrentWeatherElements}
            <Forecast />
        </div>
    );
}

export default Weather;