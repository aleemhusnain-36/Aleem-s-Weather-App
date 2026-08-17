import Weather from './components/weather/Weather'
import Search from './components/Search/Search'
import Hourlycast from './components/Hourlycast/HourlyCast'
import Forecast from './components/forecast/Forecast'
import Cloudy from './assets/cloudy.svg'
import './App.css'

function App() {

  return (
    <div className="app">
      <div className="weather-overlay"></div>
      <div className="content">
        <div className='container'>
          <div className='row'>
            <div className="col-lg-6 col-md-12 col-sm-12 ">
              <h1 className='heading mb-5'> <img src={Cloudy} alt="Cloudy" className='cloudy-img mb-3' />Weather App</h1>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 ">
              <Search />
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-8 col-md-12 col-sm-12 ">
              <Weather />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 ">
              <Hourlycast />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Forecast />
            </div>
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>© 2026 Aleem.dev</p>
      </footer>
    </div>
  )
}

export default App
