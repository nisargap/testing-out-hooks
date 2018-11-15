import React, {useState, useEffect} from "react";
import {config} from "./config";
// Just testing out a simple input component
function SimpleInput() {
  const [state, setName] = useState({name: ""});
  useEffect(() => {
    console.log("Running an effect!");
  });
  return (
    <div>
      <h1>Simple Input Component</h1>
      <input type="text" value={state.name} onChange={(event) => setName({name: event.target.value})} />
      <h1>{state.name}</h1>
    </div>
  )
}

// custom hook for weather
function useWeather(location, units) {
  const [currentWeather, setWeatherData] = useState(null);
  useEffect(async () => {
    try {
      let response = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+ encodeURI(location) + "&APPID=" + encodeURI(config.APP_ID) + "&units=" + encodeURI(units));
      if (!response.ok) {
        throw new Error("Failed with response status: " + response.status);
      }
      let responseJson = await response.json();
      setWeatherData(responseJson);
    } catch(error) {
      console.log(error.message);
    }
  }, [location, units]);
  return currentWeather;
}

function GetWeather({ location, units }) {
  let currentWeather = useWeather(location, units);
  let weatherComps = null;
  if (currentWeather && currentWeather.hasOwnProperty("weather")) {
    weatherComps = currentWeather.weather.map((obj, index) => {
      return (
        <div key={index}>
          <h2>{obj.main}</h2>
          <h3>{obj.description}</h3>
        </div>
      )
  });
  }
  return (
    <div>
      {currentWeather && currentWeather.hasOwnProperty("main") && currentWeather.hasOwnProperty("name") ? (<div>
      <h1>{currentWeather.name}</h1>
      {weatherComps}
      <h3>{currentWeather.main.temp}</h3>
      <h3>{currentWeather.main.humidity}%</h3>
      <h3>{currentWeather.main.temp_min}</h3>
      <h3>{currentWeather.main.temp_max}</h3></div>) : ""}
    </div>
  )
}

export default function App() {
  return <div>
    <GetWeather location="San Francisco" units="imperial" />
  </div>
}