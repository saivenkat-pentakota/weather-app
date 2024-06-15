import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Main component of the application
const App = () => {
  // State variables to store city input, weather data, dark mode status, and error messages
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch weather data from OpenWeatherMap API
  const fetchWeatherData = useCallback(async () => {
    try {
      setError(''); // Clear any existing errors
      if (!city) return; // If city is empty, do nothing
      const apiKey = '36b05202ae83c3a5d2fbeceda92d6e46';
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error('City not found'); // Handle non-OK response
      }
      const data = await response.json(); // Parse JSON response
      setWeatherData(data); // Update weather data state
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message); // Set error message state
      setWeatherData(null); // Clear weather data
    }
  }, [city]); // Dependency array for useCallback

  // input field change
  const handleCityChange = (e) => {
    setCity(e.target.value); // Update city state with input value
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchWeatherData(); // Fetch weather data for the input city
  };

  //toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); 
  };

  //clear weather data when city changes
  useEffect(() => {
    setWeatherData(null);
  }, [city]);

  // Render the component
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="weather-card">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            className='input-area'
            type="text"
            placeholder="Enter city name or pincode"
            value={city}
            onChange={handleCityChange}
          />
          <button className="submit-button" type="submit">Get Details</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        {weatherData && !error && (
          <div>
            <h2>{weatherData.name}</h2>
            <div className="weather-details">
              <p>{weatherData.main.temp} °C</p>
              <p>{new Date().toLocaleDateString()}</p>
              <p>{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mode-toggle">
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
            <p>{isDarkMode ? 'Click for Light Mode' : ' Click for Dark Mode'}</p>
          </label>
        </div>
    </div>
  );
};

export default App;
