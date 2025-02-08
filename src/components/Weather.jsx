import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const API_KEY = '3af3185a1f5e00c1b4d3a627b091a7c5'; 
  
  // Fetch weather by city name
  const fetchWeather = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setForecast(forecastResponse.data.list.filter((_, index) => index % 8 === 0)); // Get daily forecast
    } catch (error) {
      alert('City not found!');
    }
  };

  // Fetch weather using user's current location
  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          setWeather(weatherResponse.data);

          const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          setForecast(forecastResponse.data.list.filter((_, index) => index % 8 === 0)); // Get daily forecast
        } catch (error) {
          alert('Could not fetch weather for your location.');
        }
      });
    } else {
      alert('Geolocation is not supported by your browser.');
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
      <button className="btn btn-secondary mb-3 ms-2" onClick={fetchWeatherByLocation}>
        Use My Location
      </button>

      {/* Weather Details */}
      {weather && (
        <div className="card p-4">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <h4>{weather.main.temp}°C</h4>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div className="mt-4">
          <h4>5-Day Forecast</h4>
          <div className="d-flex justify-content-between">
            {forecast.map((day, index) => (
              <div key={index} className="card p-3 text-center">
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />
                <h5>{day.main.temp}°C</h5>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
