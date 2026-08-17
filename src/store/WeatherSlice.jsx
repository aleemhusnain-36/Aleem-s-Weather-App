import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',

  async (city, { rejectWithValue }) => {
    try {
      const apiKey = 'd9f0f3af1ed0feeb0e8973a4c525cedf';

      // Current Weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      // 5 Days Forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      console.log('Weather data:', weatherResponse.data);
      console.log('Forecast data:', forecastResponse.data);
      return {
        weather: weatherResponse.data,
        forecast: forecastResponse.data.list
      };

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',

  initialState: {
    weather: null,
    hourlyCast: [],
    foreCast: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    // Loading
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Success
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = false;

      state.weather = action.payload.weather;

      state.foreCast = action.payload.forecast;

      state.hourlyCast = action.payload.forecast.slice(0, 5);

      state.error = null;
    });

    // Error
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default weatherSlice.reducer;