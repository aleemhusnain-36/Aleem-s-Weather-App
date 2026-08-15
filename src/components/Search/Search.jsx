import { useState } from 'react'
import { useDispatch } from 'react-redux';
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import { fetchWeather } from '../../store/WeatherSlice';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        const city = searchQuery?.trim();
        if (city === '') {
            alert('Please enter a city name.');
            return;
        }
        dispatch(fetchWeather(city));
    }
    return (
        <form className="search" onSubmit={handleSearch}>
            <input
                type="search"
                placeholder="Enter city name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} style={{ color: "rgb(10, 13, 21)", fontSize: "24px" }} />
            </button>
        </form>
    )
}

export default Search