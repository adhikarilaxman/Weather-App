import { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    // Clear previous weather while loading
    setWeatherData(null);
    setError('');
    setLoading(true);

    try {
      const res = await axios.get(`https://wttr.in/${city}?format=j1`);
      setWeatherData(res.data);
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setWeatherData(null); // Clear previous data as user types new city
    setError('');
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Weather App</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading && <p className="loading-message">Loading...</p>}

      {weatherData && (
        <div className="weather-card">
          <h2 className="city-name">{city}</h2>
          <p className="temperature">
            <strong>Temperature:</strong> {weatherData.current_condition[0].temp_C}°C
          </p>
          <p className="condition">
            <strong>Condition:</strong> {weatherData.current_condition[0].weatherDesc[0].value}
          </p>
          <img
            src={"809-rain-sunny.gif"}
            alt="Weather icon"
            className="weather-icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;