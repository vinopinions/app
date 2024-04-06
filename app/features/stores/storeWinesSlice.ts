import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchWinesForStore } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import RelationPageStore from '../../api/pagination/RelationPageStore';
import ApiResponseState from '../../api/utils/ApiResponseState';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import { RootState } from '../../store/store';

type StoreWinesState = ApiResponseState<RelationPageStore<Wine>>;

export const fetchWinesForStoreAsync = createAsyncThunk<
  { storeId: string; page: Page<Wine> },
  FetchPageParams & { storeId: string }
>(
  'wines/fetchStoresForWine',
  async ({
    storeId,
    page,
    take,
    order,
  }: FetchPageParams & { storeId: string }): Promise<{
    storeId: string;
    page: Page<Wine>;
  }> => {
    const response = await fetchWinesForStore(storeId, page, take, order);
    return { storeId, page: response.data };
  },
);

const initialState: StoreWinesState = {
  data: {},
  status: 'idle',
};

const storeWinesSlice = createSlice({
  name: 'storeWines',
  initialState: initialState as StoreWinesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinesForStoreAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWinesForStoreAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.page.meta.page === 1) {
          state.data = {
            ...state.data,
            ...{ [action.payload.storeId]: action.payload.page },
          };
        } else {
          // check if stores for wine are already tracked
          if (state.data.hasOwnProperty(action.payload.storeId)) {
            const existingData: Page<Wine> = state.data[action.payload.storeId];
            state.data = {
              ...state.data,
              ...{
                // update new state to contain old data and append new, but update the rest of the page
                [action.payload.storeId]: {
                  ...action.payload.page,
                  data: [...existingData.data, ...action.payload.page.data],
                },
              },
            };
          } else {
            state.data = {
              ...state.data,
              ...{ [action.payload.storeId]: action.payload.page },
            };
          }
        }
      })
      .addCase(fetchWinesForStoreAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default storeWinesSlice.reducer;

const selectStoreWines = (state: RootState): RelationPageStore<Wine> =>
  state.storeWines.data;

export const selectWineRelationsByStoreId = createSelector(
  [selectStoreWines, (state: RootState, storeId: string) => storeId],
  (storeWinesRelation: RelationPageStore<Wine>, wineId: string): Page<Wine> =>
    storeWinesRelation[wineId] ?? EmptyPaginationState,
);
