import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '@/models/Place';

interface CurrentPlaceState {
  place: Place | undefined;
}

const initialState: CurrentPlaceState = {
  place: undefined,
};

const currentPlaceSlice = createSlice({
  name: 'currentPlace',
  initialState,
  reducers: {
    setCurrentPlace: (state, action: PayloadAction<Place>) => {
      state.place = action.payload;
    },
  },
});

export const { setCurrentPlace } = currentPlaceSlice.actions;

export default currentPlaceSlice.reducer;
