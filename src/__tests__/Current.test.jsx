import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Current from '../../src/components/Current';

describe('Current', () => {
    const cityData = {
        name: 'Tampere',
        weather: [{ description: 'Overcast clouds', icon: 'weather-icon' }],
        main: { temp: 18, humidity: 87 },
        wind: { speed: 5 },
        rain: { "3h": 0 }
    }

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
        render(<Current city={cityData} />);
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

        render(<Current city={cityData} />);
        const dateElement = screen.getByText(formattedDate);
        const timeElement = screen.getByText(`${formattedHours}:${formattedMinutes}`);
        expect(dateElement).toBeInTheDocument();
        expect(timeElement).toBeInTheDocument();
    });

    it('renders wind speed, humidity, and precipitation', () => {
        render(<Current city={cityData} />);
        const windElement = screen.getByText('Wind: 5 m/s');
        const humidityElement = screen.getByText('Humidity: 87 %');
        const precipitationElement = screen.getByText('Precipitation (3 h): 0 mm');
        expect(windElement).toBeInTheDocument();
        expect(humidityElement).toBeInTheDocument();
        expect(precipitationElement).toBeInTheDocument();
    });

});