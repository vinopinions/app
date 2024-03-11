import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import RelationPageStore from '../../api/pagination/RelationPageStore';
import User from '../../models/User';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import Page from '../../models/Page';
import { fetchFriendsForUser } from '../../api/api';
import { RootState } from '../../store/store';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';

type UserFriendsState = ApiResponseState<RelationPageStore<User>>;

export const fetchFriendsForUserAsync = createAsyncThunk<
  { username: string; page: Page<User> },
  FetchPageParams & { username: string }
>(
  'users/fetchFriendsForUser',
  async ({
    username,
    page,
    take,
    order,
  }: FetchPageParams & { username: string }): Promise<{
    username: string;
    page: Page<User>;
  }> => {
    const response = await fetchFriendsForUser(username, page, take, order);
    return { username, page: response.data };
  },
);

const initialState: UserFriendsState = {
  data: {},
  status: 'idle',
};

const userFriendsSlice = createSlice({
  name: 'userFriends',
  initialState: initialState as UserFriendsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsForUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriendsForUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.page.meta.page === 1) {
          state.data = {
            ...state.data,
            ...{ [action.payload.username]: action.payload.page },
          };
        } else {
          // check if ratings for wine are already tracked
          if (state.data.hasOwnProperty(action.payload.username)) {
            const existingData: Page<User> =
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
      .addCase(fetchFriendsForUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default userFriendsSlice.reducer;

const selectUserFriends = (state: RootState): RelationPageStore<User> =>
  state.userFriends.data;

export const selectFriendsRelationsByUsername = createSelector(
  [selectUserFriends, (state: RootState, username: string) => username],
  (
    userFriendsRelation: RelationPageStore<User>,
    username: string,
  ): Page<User> => userFriendsRelation[username] ?? EmptyPaginationState,
);
