import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Current from "./Current";
import Forecast from "./Forecast";

const Weather = ({ cities, selectedCity }) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const URL = "https://api.openweathermap.org/data/2.5/";

    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorBody, setErrorBody] = useState(null);
    const initialized = useRef(false); // Use this because of strict mode, so no duplicates even on development mode

    useEffect(() => {
        // Fetch data for cities only if not initialized
        if (!initialized.current) {
            initialized.current = true;
            const fetchWeatherData = async (name, latitude, longitude) => {
                try {
                    // Fetch current weather
                    const currentResponse = await axios
                        .get(`${URL}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);

                    // Fetch forecasted weather
                    const forecastResponse = await axios
                        .get(`${URL}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);

                    setWeatherData(prevData => [...prevData, 
                        {
                            "id": currentResponse.data.id,
                            "name": name,
                            "currentData": currentResponse,
                            "forecastData": forecastResponse
                        }
                    ]);

                    setLoading(false);

                } catch (error) {
                    setError(true);
                    setErrorBody({"code": error.response.status, "message": error.response.statusText});
                }
            };

            for (const city of cities) {
                fetchWeatherData(city.name, city.lat, city.lon);
            }
        }

    }, []);


    let WeatherElements;
    if (!selectedCity) {
        // No selected city, display every city's weather
        WeatherElements = weatherData.map((city) => {
            return (
                <div key={city.id} className="weather-multiple-container">
                    <Current key={`current-${city.id}`} 
                        city={city.currentData.data} 
                        cityName={city.name} 
                    />
                    <Forecast key={`forecast-${city.id}`} 
                        city={city.forecastData.data} 
                    />
                </div>
            );
        });
    }

    if (selectedCity) {
        // Get the selected city
        const selected = weatherData.find(city => city.name === selectedCity.name);

        WeatherElements = (
            <div key={selected.currentData.data.id} className="weather-single-container">
                <Current key={`current-${selected.id}`} 
                    city={selected.currentData.data} 
                    cityName={selected.name} 
                />
                <Forecast key={`forecast-${selected.id}`} 
                    city={selected.forecastData.data} 
                />
            </div>
        );
    }

    // Loading indicator, in case the loading takes some time
    // used a ready made from this website https://css-loaders.com/classic/
    if (loading) {
        return (
            <div className="loader"></div>
        )
    }

    if (error) {
        return (
            <div className="error">
                <p>{`Oh no there was an error fetching the data! :(`}</p>
                <p>{`${errorBody.code}: ${errorBody.message}`}</p>
            </div>
        )
    }

    return (
        <div className="weather-container">
            {WeatherElements}
        </div>
    );

}

export default Weather;