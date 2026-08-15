import { useSelector } from 'react-redux';
import './Weather.css'
import WeatherDetail from '../Detailed/WeatherDetail'
const Weather = () => {
  const { weather, loading, error } = useSelector((state) => state.weather);
  const currentWeather = weather?.data || weather || null;

  if (loading) {
    return (
      <div className='weather-card'>Loading...</div>
    )
  }
  if (error) {
    return (
      <div className='weather-card'>Error: {error}</div>
    )
  }
  if (!currentWeather || !currentWeather?.name || !currentWeather?.main || !currentWeather?.weather?.length) {
    return (
      <div className='weather-card'>No weather data available.</div>
    )
  }
  const now = Math.round(new Date().getTime() / 1000);
  const weatherInfo = currentWeather?.weather?.[0];
  const isDay =
    now >= currentWeather?.sys?.sunrise &&
    now < currentWeather?.sys?.sunset;
  const timeOfDay = isDay ? 'day' : 'night';
  const iconCode = weatherInfo?.icon;

  return (
    <div className='weather-card'>
      <div className="weather-icon font-size-50">
        <img
          src={iconCode ? `http://openweathermap.org/img/wn/${iconCode}@2x.png` : null}
          alt="WeatherIcon"
        />
      </div>
      <div className="weather-info">
        <div className="city-section">
          <h2>📍{currentWeather?.name}, {currentWeather?.sys?.country}</h2>
        </div>
        <h1>🌡{Math.round(currentWeather?.main?.temp)}°C</h1>
        <div className="day-detail-section">
          <p>{weatherInfo?.description || 'Weather'}</p>
          <span>|</span>
          <span className="day-night-indicator">
            {isDay ? '☀' : '☾'}
            <span>{timeOfDay}</span>
          </span>
        </div>
      </div>
      <div className="weather-detail-wrapper">
        <WeatherDetail />
      </div>
    </div>
  )
}

export default Weather