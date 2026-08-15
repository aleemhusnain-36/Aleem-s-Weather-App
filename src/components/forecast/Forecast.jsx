import { useSelector } from 'react-redux';
import './Forecast.css'

const Forecast = () => {

  const { foreCast, loading, error } = useSelector((state) => state.weather);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const arryOfDays = [];
  foreCast?.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US');
    if (!arryOfDays[dayKey]) {
      arryOfDays[dayKey] = []
    }
    arryOfDays[dayKey].push(item);
  });
  const days = Object.entries(arryOfDays);

  return (
    <div className='forecast'>
      <div className="forecast-card">
        <h2>Forecast Day</h2>
        <div className="forecast-list">
          {days.map(([date, dayItems]) => {
            const temperature = dayItems.map((item) => item.main.temp);
            const minTemp = Math.min(...temperature);
            const maxTemp = Math.max(...temperature);

            const middayitem = dayItems.find((item) => {
              const hour = new Date(item.dt * 1000).getHours();
              return hour >= 12 && hour <= 15;
            }) || dayItems[0];

            const dayName = new Date(dayItems[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            return (
              <div className='forecast-item' key={date}>
                <p>{dayName}</p>
                <img src={`http://openweathermap.org/img/wn/${middayitem?.weather[0]?.icon}.png`} alt="weather" />
                <h3>
                  {Math.round(maxTemp)}°C  / 
                  <span>
                    {Math.round(minTemp)}°C
                  </span>
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Forecast