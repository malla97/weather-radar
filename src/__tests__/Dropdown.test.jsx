import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import Dropdown from '../../src/components/Dropdown';

describe('Dropdown', () => {
    const cities = [
        { id: 1, name: 'Tampere' },
        { id: 2, name: 'Pirkkala' },
        { id: 3, name: 'Nokia' }
    ];

    it('renders with default value and cities', () => {
        const setSelectedCity = vi.fn();
        render(<Dropdown cities={cities} setSelectedCity={setSelectedCity} />);
        
        const dropdownElement = screen.getByTestId("dropdown");
        const defaultOption = screen.getByText('Kaikki kaupungit');
        expect(dropdownElement).toBeInTheDocument();
        expect(defaultOption).toBeInTheDocument();

        cities.forEach(city => {
            const option = screen.getByText(city.name);
            expect(option).toBeInTheDocument();
        });
    });

    it('selects a city', () => {
        const setSelectedCity = vi.fn();
        render(<Dropdown cities={cities} setSelectedCity={setSelectedCity} />);

        const dropdown = screen.getByTestId('dropdown');
        fireEvent.change(dropdown, { target: { value: 2 } });

        expect(setSelectedCity).toHaveBeenCalledWith({ id: 2, name: 'Pirkkala' });
    });

    it('selects a default value after selecting a city', () => {
        const setSelectedCity = vi.fn();
        render(<Dropdown cities={cities} setSelectedCity={setSelectedCity} />);

        const dropdown = screen.getByTestId('dropdown');
        fireEvent.change(dropdown, { target: { value: 2 } });
        fireEvent.change(dropdown, { target: { value: 'Kaikki kaupungit' } });

        expect(setSelectedCity).toHaveBeenCalledWith(null);
    });
})