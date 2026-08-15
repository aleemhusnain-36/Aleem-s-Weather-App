import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city, { rejectWithValue }) => {
        try {
            const apiKey = 'd9f0f3af1ed0feeb0e8973a4c525cedf';
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const data = await response.data;

            const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
            const data2 = await response2.data;
            return { data, data2 };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return rejectWithValue(
                error.response?.data?.message || 'An error occurred while fetching weather data.',
            );
        }
    }
);

const weatherSlice = createSlice({
    name: 'weatherSlice',
    initialState: {
        weather: null,
        hourlyCast: [],
        foreCast: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            const payload = action.payload ?? {};
            const weatherPayload = payload?.data || payload;
            const forecastList = payload?.data2?.list ?? [];

            state.loading = false;
            state.weather = weatherPayload && typeof weatherPayload === 'object' ? weatherPayload : null;
            state.hourlyCast = Array.isArray(forecastList) ? forecastList.slice(0, 8) : [];
            state.foreCast = Array.isArray(forecastList) ? forecastList : [];
            state.error = null;
        });
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default weatherSlice.reducer;
