import React, { useEffect, useState } from "react";
import axios from 'axios';
import Current from "./Current";
import Forecast from "./Forecast";

const Weather = ({ cities }) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const URL = "https://api.openweathermap.org/data/2.5/";

    const [currentWeatherData, setCurrentWeatherData] = useState([]);
    const [forecastedWeatherData, setForecastedWeatherData] = useState([]);

    async function getCurrentWeather(latitude, longitude) {
        try {
            const response = await axios.get(`${URL}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            setCurrentWeatherData(prevData => [...prevData, response.data]);
        } catch (error) {
            console.log(error.data)
        }
    }

    async function getForecastWeather(latitude, longitude) {
        try {
            const response = await axios.get(`${URL}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            setForecastedWeatherData(prevData => [...prevData, response.data]);
        } catch (error) {
            console.log(error.data)
        }
    }

    useEffect(() => {
        for (const city of cities) {
            getCurrentWeather(city.lat, city.lon);
            getForecastWeather(city.lat, city.lon);
        }
    }, [])

    return (
        <div className="weather-container">
            <Current />
            <Forecast />
        </div>
    );
}

export default Weather;