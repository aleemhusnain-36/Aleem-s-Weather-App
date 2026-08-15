import{useSelector} from 'react-redux'
import './WeatherDetail.css'
import windicon from '../../assets/wind.svg'
import humidityicon from '../../assets/humidity.svg'
const WeatherDetail = () => {

  const { weather, loading, error } = useSelector((state) => state.weather);
  const currentWeather = weather?.data || weather || null;

  if (loading) {
    return (
      <div className="weather-detail">Loading...</div>
    )
  }
  if (error) {
    return (
      <div className="weather-detail">Error: {error}</div>
    )
  }
  if (!currentWeather) {
    return (
      <div className="weather-detail">No weatherDetail data available.</div>
    )
  }

  return (
    <div className="weather-detail">
      <div className="detail-item">
        <div className="detail-box">
          <img src={windicon} alt="Wind Icon" className="detail-icon" width="50" height="50" />
        </div>
        <div className="detail-info">
          <h3>{Math.round((currentWeather?.wind?.speed ?? 0) * 3.6)} km/h</h3>
          <p>Wind</p>
        </div>
      </div>
      <div className="detail-item">
        <div className="detail-box">
          <img src={humidityicon} alt="Humidity Icon" className="detail-icon"  width="50" height="50"/>
        </div>
        <div className="detail-info">
          <h3>{currentWeather?.main?.humidity ?? 0}%</h3>
          <p>Humidity</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetail