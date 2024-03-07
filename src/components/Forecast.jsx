import React from "react";
import { formatDateString, formatTimeString } from "../utils/dateUtils";

const Forecast = ({ city }) => {

    // Skip the first element as we can see the data in the current weather compartment
    // only use the next 5 
    let ForecastElements
    ForecastElements = city.list.slice(1, 6).map((forecast, index) =>
        <div key={index} className="forecast-element" data-testid={`forecast-element-${index}`}>
            <div className="forecast-upper-element" data-testid="forecast-element">
                <p className="p-grey-13">{formatTimeString(new Date(forecast.dt_txt))}</p>
                <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Forecast Icon" />
                <p className="forecast-temp-text">{`${Math.round(forecast.main.temp)} °C`}</p>
            </div>
            <div className="forecast-bottom-element">
                <p>{`${forecast.wind.speed} m/s`}</p>
                <p>{`${forecast.main.humidity} %`}</p>
                <p>{`${forecast.rain ? forecast.rain["3h"] || 0 : 0 } mm`}</p>
            </div>
        </div>
    );

    return (
        <div className="forecast-weather-container">
            {ForecastElements}
        </div>
    );
}

export default Forecast;