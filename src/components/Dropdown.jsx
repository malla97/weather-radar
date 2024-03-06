import React, { useState } from "react";

const Dropdown = ({ cities, setSelectedCity }) => {
    const DEFAULT = "Kaikki kaupungit";
    const [value, setValue] = useState(DEFAULT);

    const handleChange = (event) => {
        setValue(event.target.value);
        if (event.target.value === DEFAULT) {
            setSelectedCity(null);
        } else {
            const selectedCity = cities.find(city => city.id === parseInt(event.target.value));
            console.log(selectedCity);
            setSelectedCity(selectedCity);
        }
        
    };

    return (
        <div>
            <label>
                <select value={value} onChange={handleChange}>
                    <option value={DEFAULT}>{DEFAULT}</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Dropdown;