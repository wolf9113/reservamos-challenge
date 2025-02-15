import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Place } from '@/models/Place';
import placeApi from '@/api/place';
import i18n from '@/utils/i18n/i18n';

export const getPlaceByQuery = createAsyncThunk<Place[], string>(
  'places/get_by_query',
  async (query: string, { rejectWithValue }) => {
    try {
      return await placeApi.getPlaces(query);
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(i18n.t('errorPlaces'));
    }
  },
);

interface PlacesState {
  places: Place[];
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  places: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaceByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaceByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(getPlaceByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default placesSlice.reducer;
