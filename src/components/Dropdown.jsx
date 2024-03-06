import React, { useState } from "react";

const Dropdown = ({ cities, setSelectedCityName }) => {
    const DEFAULT = "Kaikki kaupungit";
    const [value, setValue] = useState(DEFAULT);

    const handleChange = (event) => {
        setValue(event.target.value);
        if (event.target.value === DEFAULT) {
            setSelectedCityName(null);
        } else {
            setSelectedCityName(event.target.value);
        }
        
    };


    return (
        <div>
            <label>
                <select value={value} onChange={handleChange}>
                    <option value={DEFAULT}>{DEFAULT}</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Dropdown;