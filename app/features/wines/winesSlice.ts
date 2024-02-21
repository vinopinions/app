import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import {
  createWine,
  fetchWineById,
  fetchWines,
  updateStoresForWine,
} from '../../api/api';
import Wine from '../../models/Wine';
import WineDto from '../../models/dtos/Wine.dto';

type WinesState = ApiResponseState<Wine[]>;

export const fetchWinesAsync = createAsyncThunk<Wine[]>(
  'wines/fetchWines',
  async () => {
    const response = await fetchWines();
    return response.data;
  },
);

export const fetchWineByIdAsync = createAsyncThunk<Wine, string>(
  'wines/fetchWineById',
  async (wineId: string) => {
    const response = await fetchWineById(wineId);
    return response.data;
  },
);

export const createWineAsync = createAsyncThunk(
  'wines/createWine',
  async (wine: WineDto) => {
    const response = await createWine(wine);
    return response.data;
  },
);

export const updateStoresForWineAsync = createAsyncThunk<
  Wine,
  { wineId: string; storeIds: string[] }
>('wines/updateStoresForWine', async ({ wineId, storeIds }) => {
  const response = await updateStoresForWine(wineId, storeIds);
  return response.data;
});

const initialState: WinesState = {
  data: [],
  status: 'idle',
};

const winesSlice = createSlice({
  name: 'wines',
  initialState: initialState as WinesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWinesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status == 'succeeded') {
          state.data = action.payload;
        }
      })
      .addCase(fetchWinesAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(fetchWineByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWineByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status == 'succeeded') {
          state.data = [action.payload];
        }
      })
      .addCase(fetchWineByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(updateStoresForWineAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStoresForWineAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status == 'succeeded') {
          const index = state.data.findIndex(
            (wine) => wine.id === action.payload.id,
          );
          if (index !== -1) {
            state.data[index].stores = action.payload.stores;
          }
        }
      })
      .addCase(updateStoresForWineAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(createWineAsync.fulfilled, (state, action) => {
        if (state.status == 'succeeded') {
          state.data.push(action.payload);
        }
      })
      .addCase(createWineAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default winesSlice.reducer;
