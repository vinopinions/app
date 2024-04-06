import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchRatingsForWine } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import RelationPageStore from '../../api/pagination/RelationPageStore';
import ApiResponseState from '../../api/utils/ApiResponseState';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import { RootState } from '../../store/store';

type WineRatingsState = ApiResponseState<RelationPageStore<Rating>>;

export const fetchRatingsForWineAsync = createAsyncThunk<
  { wineId: string; page: Page<Rating> },
  FetchPageParams & { wineId: string }
>(
  'wines/fetchRatingsForWine',
  async ({
    wineId,
    page,
    take,
    order,
  }: FetchPageParams & { wineId: string }): Promise<{
    wineId: string;
    page: Page<Rating>;
  }> => {
    const response = await fetchRatingsForWine(wineId, page, take, order);
    return { wineId, page: response.data };
  },
);

const initialState: WineRatingsState = {
  data: {},
  status: 'idle',
};

const wineRatingsSlice = createSlice({
  name: 'userRatings',
  initialState: initialState as WineRatingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingsForWineAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRatingsForWineAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.page.meta.page === 1) {
          state.data = {
            ...state.data,
            ...{ [action.payload.wineId]: action.payload.page },
          };
        } else {
          // check if ratings for wine are already tracked
          if (state.data.hasOwnProperty(action.payload.wineId)) {
            const existingData: Page<Rating> =
              state.data[action.payload.wineId];
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
      .addCase(fetchRatingsForWineAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default wineRatingsSlice.reducer;

const selectWineRatings = (state: RootState): RelationPageStore<Rating> =>
  state.wineRatings.data;

export const selectRatingsRelationsByWineId = createSelector(
  [selectWineRatings, (state: RootState, wineId: string) => wineId],
  (
    wineRatingsRelation: RelationPageStore<Rating>,
    wineId: string,
  ): Page<Rating> => wineRatingsRelation[wineId] ?? EmptyPaginationState,
);
