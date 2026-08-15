import { useSelector } from 'react-redux'
import './HourlyCast.css'
const HourlyCast = () => {

  const { hourlyCast, loading, error } = useSelector((state) => state.weather);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>

      <div className="hourlycast-card">
        <div className="hourlycast-list">
          <h2>Hourly Forecast</h2>
          {hourlyCast?.slice(0, 8).map((hour) => {
            const date = new Date(hour.dt * 1000);
            const time = date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });
            return (
              <div className="hourlycast-item" key={hour.dt}>
                <p>{time}</p>
                <img src={`http://openweathermap.org/img/wn/${hour.weather[0]?.icon}.png`} alt="Cloud Icon" />
                <h3>{Math.round(hour.main?.temp)}°C</h3>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HourlyCast