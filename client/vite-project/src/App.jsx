import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      console.log(city);
      const response = await fetch(`http://localhost:3000/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setWeather(null);
      setError('Failed to fetch weather data');
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p><strong>Temperature:</strong> {Math.round(weather.main.temp)}°C</p>
          <p><strong>Weather:</strong> {weather.weather[0].main}</p>
          <p><strong>Description:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;