import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchStoresForWine, updateStoresForWine } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import RelationPageStore from '../../api/pagination/RelationPageStore';
import Store from '../../api/pagination/Store';
import ApiResponseState from '../../api/utils/ApiResponseState';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import { RootState } from '../../store/store';

type WineStoresState = ApiResponseState<RelationPageStore<Store>>;

export const fetchStoresForWineAsync = createAsyncThunk<
  { wineId: string; page: Page<Store> },
  FetchPageParams & { wineId: string }
>(
  'wines/fetchStoresForWine',
  async ({
    wineId,
    page,
    take,
    order,
  }: FetchPageParams & { wineId: string }): Promise<{
    wineId: string;
    page: Page<Store>;
  }> => {
    const response = await fetchStoresForWine(wineId, page, take, order);
    return { wineId, page: response.data };
  },
);

export const updateStoresForWineAsync = createAsyncThunk<
  Wine,
  { wineId: string; storeIds: string[] }
>('wines/updateStoresForWine', async ({ wineId, storeIds }) => {
  const response = await updateStoresForWine(wineId, storeIds);
  return response.data;
});

const initialState: WineStoresState = {
  data: {},
  status: 'idle',
};

const wineStoreSlice = createSlice({
  name: 'wineStores',
  initialState: initialState as WineStoresState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoresForWineAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStoresForWineAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.page.meta.page === 1) {
          state.data = {
            ...state.data,
            ...{ [action.payload.wineId]: action.payload.page },
          };
        } else {
          // check if stores for wine are already tracked
          if (state.data.hasOwnProperty(action.payload.wineId)) {
            const existingData: Page<Store> = state.data[action.payload.wineId];
            state.data = {
              ...state.data,
              ...{
                // update new state to contain old data and append new, but update the rest of the page
                [action.payload.wineId]: {
                  ...action.payload.page,
                  data: [...existingData.data, ...action.payload.page.data],
                },
              },
            };
          } else {
            state.data = {
              ...state.data,
              ...{ [action.payload.wineId]: action.payload.page },
            };
          }
        }
      })
      .addCase(fetchStoresForWineAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(updateStoresForWineAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStoresForWineAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateStoresForWineAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default wineStoreSlice.reducer;

const selectWineStores = (state: RootState): RelationPageStore<Store> =>
  state.wineStores.data;

export const selectStoreRelationsByWineId = createSelector(
  [selectWineStores, (state: RootState, wineId: string) => wineId],
  (wineStoresRelation: RelationPageStore<Store>, wineId: string): Page<Store> =>
    wineStoresRelation[wineId] ?? EmptyPaginationState,
);
