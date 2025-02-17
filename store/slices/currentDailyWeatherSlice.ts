import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyWeather } from '@/models/Weather';

interface CurrentDailyWeatherState {
  dailyWeather: DailyWeather | undefined;
}

const initialState: CurrentDailyWeatherState = {
  dailyWeather: undefined,
};

const currentDailyWeatherSlice = createSlice({
  name: 'currentDailyWeather',
  initialState,
  reducers: {
    setCurrentDailyWeather: (state, action: PayloadAction<DailyWeather>) => {
      state.dailyWeather = action.payload;
    },
  },
});

export const { setCurrentDailyWeather } = currentDailyWeatherSlice.actions;

export default currentDailyWeatherSlice.reducer;
