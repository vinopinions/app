import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { createStore, fetchStoreById, fetchStores } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FilterFetchPageParams from '../../api/pagination/FilterFetchPageParams';
import PaginationState from '../../api/pagination/PaginationState';
import Store from '../../api/pagination/Store';
import Page from '../../models/Page';
import CreateStoreDto from '../../models/dtos/Store.dto';
import { RootState } from './../../store/store';

type StoresState = ApiResponseState<PaginationState<Store>>;

export const _fetchStoresAsync = createAsyncThunk<
  Page<Store>,
  FilterFetchPageParams
>(
  'stores/fetchStores',
  async ({ page, take, order, filter }: FilterFetchPageParams) => {
    const response = await fetchStores(page, take, order, filter);
    return response.data;
  },
);

// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchStoresAsync = (params: FilterFetchPageParams = {}) =>
  _fetchStoresAsync(params);

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
  data: EmptyPaginationState,
  status: 'idle',
};

const storesSlice = createSlice({
  name: 'stores',
  initialState: initialState as StoresState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchStoresAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchStoresAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // initialize stores with empty relations
        action.payload.data = action.payload.data.map((store) => {
          return { ...store, wines: [] };
        });

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.meta.page === 1) {
          state.data = action.payload;
        } else {
          state.data = {
            ...action.payload,
            data: [...state.data.data, ...action.payload.data],
          };
        }
      })
      .addCase(_fetchStoresAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(fetchStoreByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStoreByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // initialize wine with empty relations
        action.payload = { ...action.payload };

        const index = state.data.data.findIndex(
          (store) => store.id === action.payload.id,
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        } else {
          state.data.data.push(action.payload);
        }
      })
      .addCase(fetchStoreByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(createStoreAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStoreAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.data.push(action.payload);
      })
      .addCase(createStoreAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default storesSlice.reducer;

const _selectStorePage = (state: RootState) => state.stores.data;
const selectStores = (state: RootState) => state.stores.data.data;

export const selectStorePage = createSelector(
  [_selectStorePage],
  (storePage: Page<Store>) => storePage,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectAllStores = createSelector(
  [selectStores],
  (stores: Store[]) => stores,
  // https://github.com/reduxjs/reselect/discussions/662
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectStoreById = createSelector(
  [selectStores, (state: RootState, storeId: string) => storeId],
  (stores: Store[], storeId: string): Store =>
    stores.find((store) => store.id === storeId),
);
