import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../../Api/ApiCalls';
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const loadWeather = async () => {
      if (!city) return; 
      try {
        const response = await fetchWeather(city);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };
    loadWeather();
  }, [city]);

  return (
    <div className="mt-7 flex flex-col justify-center items-center mb-20 bg-blue-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weather Information</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
      />

      {weather && city ? ( // Show weather only if city is not empty
        <div className="text-center mt-4 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Current Weather in {weather.name}:</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{(weather.main.temp - 273.15).toFixed(1)}°C</p>
          <p className="text-gray-600 capitalize mt-1">Weather: {weather.weather[0].description}</p>
          <p className="text-gray-600 mt-1">Humidity: {weather.main.humidity}%</p>
          <p className="text-gray-600 mt-1">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        city === '' ? <p className="text-gray-500">Enter a city to get weather information.</p> : null
      )}
    </div>
  );
};

export default Weather;
