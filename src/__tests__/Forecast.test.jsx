import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import Forecast from '../../src/components/Forecast';

describe("Forecast Component", () => {
    const cityData = {
        list: [
            {
                dt_txt: "2024-03-05 12:00:00",
                weather: [{ icon: "01d" }],
                main: { temp: 20, humidity: 89 },
                wind: { speed: 3 },
                rain: { "3h": 5 },
            },
            {
                dt_txt: "2024-03-05 15:00:00",
                weather: [{ icon: "02d" }],
                main: { temp: 22, humidity: 97 },
                wind: { speed: 4 },
                rain: { "3h": 7 },
            },
            {
                dt_txt: "2024-03-05 18:00:00",
                weather: [{ icon: "02d" }],
                main: { temp: 18, humidity: 70 },
                wind: { speed: 4 },
                rain: { "3h": 0 },
            },
            {
                dt_txt: "2024-03-05 21:00:00",
                weather: [{ icon: "02d" }],
                main: { temp: 15, humidity: 74 },
                wind: { speed: 2 },
                rain: { "3h": 0 },
            },
            {
                dt_txt: "2024-03-06 00:00:00",
                weather: [{ icon: "01d" }],
                main: { temp: 10, humidity: 75 },
                wind: { speed: 1 },
                rain: { "3h": 0 },
            },
            {
                dt_txt: "2024-03-06 03:00:00",
                weather: [{ icon: "01d" }],
                main: { temp: 8, humidity: 75 },
                wind: { speed: 2 },
                rain: { "3h": 0 },
            }
        ],
    };

    it("renders correct number of forecast elements", () => {
        render(<Forecast city={cityData} />);
        const forecastElements = screen.getAllByTestId("forecast-element");
        expect(forecastElements).toHaveLength(5); 
    });

    it("renders forecast elements with correct data for the first element", () => {
        render(<Forecast city={cityData} />);
        const forecastElement = screen.getByTestId("forecast-element-0");
        expect(forecastElement).toBeInTheDocument();

        expect(forecastElement).toHaveTextContent("15:00");
        expect(forecastElement).toHaveTextContent("22 °C");
        expect(forecastElement).toHaveTextContent("4 m/s");
        expect(forecastElement).toHaveTextContent("97 %");
        expect(forecastElement).toHaveTextContent("7 mm");
    });

    it("renders forecast elements with correct data for the last element", () => {
        render(<Forecast city={cityData} />);
        const forecastElement = screen.getByTestId("forecast-element-4");
        expect(forecastElement).toBeInTheDocument();

        expect(forecastElement).toHaveTextContent("03:00");
        expect(forecastElement).toHaveTextContent("8 °C");
        expect(forecastElement).toHaveTextContent("2 m/s");
        expect(forecastElement).toHaveTextContent("75 %");
        expect(forecastElement).toHaveTextContent("0 mm");
    });
})