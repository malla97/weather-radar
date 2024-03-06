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

    }, []);


    // Sort alphabetically so the the cities match in both states by the index
    const sortedCurrentWeatherData = [...currentWeatherData].sort((city1, city2) => {
        return city1.name.localeCompare(city2.name);
    });


    const sortedForecastedWeatherData = [...forecastedWeatherData].sort((city1, city2) => {
        return city1.city.name.localeCompare(city2.city.name);
    });

    // Wait that the sorting has happened and the sorted data is the length of the cities data
    let WeatherElements;
    if (!selectedCity && sortedForecastedWeatherData.length === cities.length) {
        // No selected city, display every city's weather
        WeatherElements = sortedCurrentWeatherData.map((city, index) => (
            <React.Fragment key={city.id}>
                <Current key={`current-${city.id}`} city={city} cityName={city.name}/>
                <Forecast key={`forecast-${city.id}`} city={sortedForecastedWeatherData[index]} />
            </React.Fragment>
        ));
    } 
    console.log(selectedCity)
    console.log(currentWeatherData);
    if (selectedCity) {
        // Get the selected city
        const currentSelectedCity = currentWeatherData.find(city => (city.coord.lon === selectedCity.lon && city.coord.lat === selectedCity.lat));
        const forecastSelectedCity = forecastedWeatherData.find(city => (city.city.coord.lon === selectedCity.lon && city.city.coord.lat === selectedCity.lat));
        console.log(currentSelectedCity);
        WeatherElements = (
            <React.Fragment key={currentSelectedCity.id}>
                <Current key={`current-${currentSelectedCity.id}`} city={currentSelectedCity} cityName={selectedCity.name} />
                <Forecast key={`forecast-${forecastSelectedCity.id}`} city={forecastSelectedCity} />
            </React.Fragment>
        );
    }

    return (
        <div className="weather-container">
            {WeatherElements}
        </div>
    );

}

export default Weather;