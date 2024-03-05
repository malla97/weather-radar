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

    it('renders city name and weather description', () => {
        render(<Current city={cityData} />);
        const cityNameElement = screen.getByText('Tampere');
        const weatherDescriptionElement = screen.getByText('Overcast clouds');
        expect(cityNameElement).toBeInTheDocument();
        expect(weatherDescriptionElement).toBeInTheDocument();
    });

    it('renders formatted date and time', () => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        
        render(<Current city={cityData} />);
        const dateElement = screen.getByText('March 5th');
        const timeElement = screen.getByText(`${hours}:${minutes}`);
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