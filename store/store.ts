import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import weatherSlice from '@/store/slices/weatherSlice';
import placeSlice from '@/store/slices/placeSlice';
import currentPlaceSlice from '@/store/slices/currentPlaceSlice';
import currentDailyWeatherSlice from '@/store/slices/currentDailyWeatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    places: placeSlice,
    currentPlace: currentPlaceSlice,
    currentDailyWeather: currentDailyWeatherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
