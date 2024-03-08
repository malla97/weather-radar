import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import Current from '../../src/components/Current';

describe('Current', () => {
    const cityData = {
        weather: [{ description: 'Overcast clouds', icon: 'weather-icon' }],
        main: { temp: 18, humidity: 87 },
        wind: { speed: 5 },
        snow: { "3h": 1.3 }
    }

    const cityName = 'Tampere';

    // for testing the formatted date
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const getDayWithOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        }
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    it('renders city name and weather description', () => {
        render(<Current city={cityData} cityName={cityName} />);
        const cityNameElement = screen.getByText('Tampere');
        const weatherDescriptionElement = screen.getByText('Overcast clouds');
        expect(cityNameElement).toBeInTheDocument();
        expect(weatherDescriptionElement).toBeInTheDocument();
    });

    it('renders formatted date and time', () => {
        const currentTime = new Date();
        const month = months[currentTime.getMonth()];
        const dayWithSuffix = getDayWithOrdinalSuffix(currentTime.getDate());
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        const formattedDate = `${month} ${dayWithSuffix}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedHours = hours < 10 ? `0${hours}` : hours;

        render(<Current city={cityData} cityName={cityName} />);
        const dateElement = screen.getByText(formattedDate);
        const timeElement = screen.getByText(`${formattedHours}:${formattedMinutes}`);
        expect(dateElement).toBeInTheDocument();
        expect(timeElement).toBeInTheDocument();
    });

    it('renders wind speed, humidity, and precipitation', () => {
        render(<Current city={cityData} cityName={cityName} />);
        const windElement = screen.getByText('Wind: 5 m/s');
        const humidityElement = screen.getByText('Humidity: 87 %');
        const precipitationElement = screen.getByText('Precipitation (3 h): 1.3 mm');
        expect(windElement).toBeInTheDocument();
        expect(humidityElement).toBeInTheDocument();
        expect(precipitationElement).toBeInTheDocument();
    });

    it('renders precipitation where rain and snow are added together', () => {
        const cityDataWithRain = { ...cityData, rain: { "3h": 4 } };
        render(<Current city={cityDataWithRain} cityName={cityName} />);
        const totalAmount = cityDataWithRain.snow["3h"] + cityDataWithRain.rain["3h"];

        const precipitationElement = screen.getByText(`Precipitation (3 h): ${totalAmount} mm`);
        expect(precipitationElement).toBeInTheDocument();
    });

});