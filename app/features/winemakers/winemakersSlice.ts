import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { createWinemaker, fetchWinemakers } from '../../api/api';
import Winemaker from '../../models/Winemaker';

type WinemakersState = ApiResponseState<Winemaker[]>;

export const fetchWinemakersAsync = createAsyncThunk<Winemaker[]>(
  'winemakers/fetchWinemakers',
  async () => {
    const response = await fetchWinemakers();
    return response.data;
  },
);

export const createWinemakerAsync = createAsyncThunk(
  'winemaker/createWinemaker',
  async (winemaker: Winemaker) => {
    const response = await createWinemaker(winemaker);
    return response.data;
  },
);

const initialState: WinemakersState = {
  data: [],
  status: 'idle',
};

const winemakersSlice = createSlice({
  name: 'winemakers',
  initialState: initialState as WinemakersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinemakersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWinemakersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status == 'succeeded') {
          state.data = action.payload;
        }
      })
      .addCase(fetchWinemakersAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(createWinemakerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWinemakerAsync.fulfilled, (state, action) => {
        if (state.status !== 'failed') {
          state.data.push(action.payload);
        }
      })
      .addCase(createWinemakerAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default winemakersSlice.reducer;
