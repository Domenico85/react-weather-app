import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "3af3185a1f5e00c1b4d3a627b091a7c5";
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found!");
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="mb-3">Weather App</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={fetchWeather}>
        Get Weather
      </button>

      {weather && (
        <div className="card p-4">
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <h4>{weather.main.temp}°C</h4>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
