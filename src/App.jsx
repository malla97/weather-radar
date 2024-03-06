import React, { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import Weather from "./components/Weather";
import cityData from "./data"

function App() {
  const cities = cityData;

  const [selectedCityName, setSelectedCityName] = useState(null);


  return (
    <>
      <header>Säätutka</header>
      <Dropdown cities={cities} setSelectedCityName={setSelectedCityName}/>
      <Weather cities={cities} selectedCityName={selectedCityName}/>
    </>
  );
}

export default App;
