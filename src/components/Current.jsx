import React from "react";

const Current = ({ city }) => {
    const { name, weather, weatherIcon, temperature, wind, humidity, precipitation, date } = city;

    return (
        <div>Current weather</div>
    );
}

export default Current;