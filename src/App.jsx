import React, { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import Weather from "./components/Weather";
import cityData from "./data"

function App() {
  const cities = cityData;

  const [selectedCity, setSelectedCity] = useState(null);


  return (
    <>
      <header>Säätutka</header>
      <Dropdown />
      <Weather cities={cities}/>
    </>
  );
}

export default App;
