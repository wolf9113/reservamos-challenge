import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import weatherApi from '@/api/weather';
import { Weather } from '@/models/Weather';
import { Coordinates } from '@/models/Coordinates';
import i18n from '@/utils/i18n/i18n';

export const getWeatherByCoordinates = createAsyncThunk<Weather, Coordinates>(
  'weather/get_by_coordinates',
  async (coordinates: Coordinates, { rejectWithValue }) => {
    try {
      return await weatherApi.getWeatherByCoordinates(coordinates.latitude, coordinates.longitude);
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(i18n.t('errorWeather'));
    }
  },
);

interface WeatherState {
  weather: Weather | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: undefined,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCoordinates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherByCoordinates.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(getWeatherByCoordinates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
