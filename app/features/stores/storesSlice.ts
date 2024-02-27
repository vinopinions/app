import { RootState } from './../../store/store';
/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { createStore, fetchStoreById, fetchStores } from '../../api/api';
import Store from '../../models/Store';
import CreateStoreDto from '../../models/dtos/Store.dto';

type StoresState = ApiResponseState<Store[]>;

export const fetchStoresAsync = createAsyncThunk<Store[]>(
  'stores/fetchStores',
  async () => {
    const response = await fetchStores();
    return response.data;
  },
);

export const fetchStoreByIdAsync = createAsyncThunk<Store, string>(
  'stores/fetchStoreById',
  async (storeId: string) => {
    const response = await fetchStoreById(storeId);
    return response.data;
  },
);

export const createStoreAsync = createAsyncThunk(
  'stores/createStore',
  async (store: CreateStoreDto) => {
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
        if (state.status == 'succeeded') {
          state.data = action.payload;
        }
      })
      .addCase(fetchStoresAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(fetchStoreByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStoreByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status == 'succeeded') {
          state.data = [action.payload];
        }
      })
      .addCase(fetchStoreByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(createStoreAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStoreAsync.fulfilled, (state, action) => {
        if (state.status !== 'failed') {
          state.data.push(action.payload);
        }
      })
      .addCase(createStoreAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status == 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default storesSlice.reducer;

export const selectAllStores = createSelector(
  [
    (state: RootState) =>
      state.stores.status !== 'failed' ? state.stores.data : [],
  ],
  (stores) => stores,
  // https://github.com/reduxjs/reselect/discussions/662
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectStoreById = createSelector(
  [
    (state: RootState) =>
      state.stores.status !== 'failed' ? state.stores.data : [],
    (state: RootState, storeId: string) => storeId,
  ],
  (stores, storeId): Store => {
    return stores.find((store) => store.id === storeId);
  },
);
