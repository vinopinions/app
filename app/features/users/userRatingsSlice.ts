import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { fetchRatingsForUser } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import RelationPageStore from '../../api/pagination/RelationPageStore';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import { RootState } from '../../store/store';

type UserRatingsState = ApiResponseState<RelationPageStore<Rating>>;

export const fetchRatingsForUserAsync = createAsyncThunk<
  { username: string; page: Page<Rating> },
  FetchPageParams & { username: string }
>(
  'users/fetchRatingsForUser',
  async ({
    username,
    page,
    take,
    order,
  }: FetchPageParams & { username: string }): Promise<{
    username: string;
    page: Page<Rating>;
  }> => {
    const response = await fetchRatingsForUser(username, page, take, order);
    return { username, page: response.data };
  },
);

const initialState: UserRatingsState = {
  data: {},
  status: 'idle',
};

const userRatingsSlice = createSlice({
  name: 'userRatings',
  initialState: initialState as UserRatingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingsForUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRatingsForUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.page.meta.page === 1) {
          state.data = {
            ...state.data,
            ...{ [action.payload.username]: action.payload.page },
          };
        } else {
          // check if ratings for user are already tracked
          if (state.data.hasOwnProperty(action.payload.username)) {
            const existingData: Page<Rating> =
              state.data[action.payload.username];
            state.data = {
              ...state.data,
              ...{
                // update new state to contain old data and append new, but update the rest of the page
                [action.payload.username]: {
                  ...action.payload.page,
                  data: [...existingData.data, ...action.payload.page.data],
                },
              },
            };
          } else {
            state.data = {
              ...state.data,
              ...{ [action.payload.username]: action.payload.page },
            };
          }
        }
      })
      .addCase(fetchRatingsForUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default userRatingsSlice.reducer;

const selectUserRatings = (state: RootState): RelationPageStore<Rating> =>
  state.userRatings.data;

export const selectRatingRelationsByUserUsername = createSelector(
  [selectUserRatings, (state: RootState, username: string) => username],
  (
    wineRatingsRelation: RelationPageStore<Rating>,
    username: string,
  ): Page<Rating> => wineRatingsRelation[username] ?? EmptyPaginationState,
);
