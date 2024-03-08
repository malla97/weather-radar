import React from "react";
import { formatTimeString } from "../utils/dateUtils";
import { getPrecipitationAmount } from "../utils/weatherUtils";

const Forecast = ({ city }) => {

    // Skip the first element as we can see the data in the current weather compartment
    // only use the next 5 
    let ForecastElements
    ForecastElements = city.list.slice(1, 6).map((forecast, index) => {
        const time = formatTimeString(new Date(forecast.dt_txt));
        const temp = Math.round(forecast.main.temp);
        const wind = forecast.wind.speed;
        const humidity = forecast.main.humidity
        const precipitationRain = forecast.rain ? forecast.rain["3h"] || 0 : 0
        const precipitationSnow = forecast.snow ? forecast.snow["3h"] || 0 : 0
        
        const precipitation = getPrecipitationAmount(precipitationRain, precipitationSnow);

        return (
            <div key={index} className="forecast-element" data-testid={`forecast-element-${index}`}>
                <div className="forecast-upper-element" data-testid="forecast-element">
                    <p className="p-grey-13">{time}</p>
                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Forecast Icon" />
                    <p className="forecast-temp-text">{`${temp} °C`}</p>
                </div>
                <div className="forecast-bottom-element">
                    <p>{`${wind} m/s`}</p>
                    <p>{`${humidity} %`}</p>
                    <p>{`${precipitation} mm`}</p>
                </div>
            </div>
        );
    });

    return (
        <div className="forecast-weather-container">
            {ForecastElements}
        </div>
    );
}

export default Forecast;