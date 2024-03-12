import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import PaginationState from '../../api/pagination/PaginationState';
import User from '../../models/User';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import Page from '../../models/Page';
import { fetchUsers } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import { RootState } from '../../store/store';

type UsersState = ApiResponseState<PaginationState<User>>;

export const _fetchUsersAsync = createAsyncThunk<Page<User>, FetchPageParams>(
  'users/fetchUsers',
  async ({ page, take, order }: FetchPageParams) => {
    const response = await fetchUsers(page, take, order);
    return response.data;
  },
);

export const fetchUsersAsync = (params: FetchPageParams = {}) =>
  _fetchUsersAsync(params);

const initialState: UsersState = {
  data: EmptyPaginationState,
  status: 'idle',
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

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
      .addCase(_fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default usersSlice.reducer;

const _selectUserPage = (state: RootState) => state.users.data;
const selectUsers = (state: RootState) => state.users.data.data;

export const selectUserPage = createSelector(
  [_selectUserPage],
  (userPage: Page<User>) => userPage,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectAllUsers = createSelector(
  [selectUsers],
  (users: User[]) => users,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectUserByName = createSelector(
  [selectUsers, (state: RootState, username: string) => username],
  (users: User[], username: string): User =>
    users.find((user) => user.username === username),
);
