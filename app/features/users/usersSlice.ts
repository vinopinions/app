import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchUsers } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FilterFetchPageParams from '../../api/pagination/FilterFetchPageParams';
import PaginationState from '../../api/pagination/PaginationState';
import ApiResponseState from '../../api/utils/ApiResponseState';
import Page from '../../models/Page';
import User from '../../models/User';
import { RootState } from '../../store/store';

type UsersState = ApiResponseState<PaginationState<User>>;

const _fetchUsersAsync = createAsyncThunk<Page<User>, FilterFetchPageParams>(
  'users/fetchUsers',
  async ({ page, take, order, filter }: FilterFetchPageParams) => {
    const response = await fetchUsers(page, take, order, filter);
    return response.data;
  },
);

export const fetchUsersAsync = (params: FilterFetchPageParams = {}) =>
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

export const selectUserPage = createSelector(
  [_selectUserPage],
  (userPage: Page<User>) => userPage,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);
