import { useSelector } from 'react-redux';
import './Forecast.css';

const Forecast = () => {
  const { foreCast, loading, error } = useSelector(
    (state) => state.weather
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const dayMap = {};

  foreCast?.forEach((item) => {
    const date = new Date(item.dt * 1000);

    const dateKey = date.toISOString().split('T')[0];

    if (!dayMap[dateKey]) {
      dayMap[dateKey] = [];
    }

    dayMap[dateKey].push(item);
  });

  return (
    <div className="forecast">
      <div className="forecast-card">
        <h2>Forecast</h2>

        <div className="forecast-list">

          {Object.entries(dayMap).map(([date, items]) => {

            const temperatures = items.map(
              (item) => item.main.temp
            );

            const minTemp = Math.min(...temperatures);
            const maxTemp = Math.max(...temperatures);

            const item = items[0];

            const dayName = new Date(date).toLocaleDateString(
              'en-US',
              {
                weekday: 'short'
              }
            );

            return (
              <div className="forecast-item" key={date}>

                <p>{dayName}</p>

                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="weather"
                />

                <h3>
                  {Math.round(maxTemp)}°C / {Math.round(minTemp)}°C
                </h3>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Forecast;