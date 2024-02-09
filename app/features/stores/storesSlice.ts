import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { createStore, fetchStores } from '../../api/api';
import Store from '../../models/Store';

type StoresState = ApiResponseState<Store[]>;

export const fetchStoresAsync = createAsyncThunk<Store[]>(
  'stores/fetchStores',
  async () => {
    const response = await fetchStores();
    return response.data;
  },
);

export const createStoreAsync = createAsyncThunk(
  'stores/createStore',
  async (store: Store) => {
    console.log(store);
    const response = await createStore(store);
    return response.data;
  },
);

const initialState: StoresState = {
  data: [],
  status: 'idle',
};

const storesSlice = createSlice({
  name: 'stores',
  initialState: initialState as StoresState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoresAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStoresAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status == 'succeeded') state.data = action.payload;
      })
      .addCase(fetchStoresAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') state.error = action.error.message;
      })
      .addCase(createStoreAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStoreAsync.fulfilled, (state, action) => {
        if (state.status !== 'failed') state.data.push(action.payload);
      })
      .addCase(createStoreAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') state.error = action.error.message;
      });
  },
});

export default storesSlice.reducer;
