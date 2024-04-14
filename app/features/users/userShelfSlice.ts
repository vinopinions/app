import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchShelfForCurrentUser, fetchShelfForUser } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import ApiResponseState from '../../api/utils/ApiResponseState';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import { RootState } from '../../store/store';

type UserShelfState = ApiResponseState<Page<Wine>>;

export const fetchShelfForUserAsync = createAsyncThunk<
  Page<Wine>,
  FetchPageParams & { username: string }
>(
  'users/fetchShelfForUser',
  async ({
    username,
    page,
    take,
    order,
  }: FetchPageParams & { username: string }): Promise<Page<Wine>> => {
    const response = await fetchShelfForUser(username, page, take, order);
    return response.data;
  },
);

const _fetchShelfForCurrentUserAsync = createAsyncThunk<
  Page<Wine>,
  FetchPageParams
>(
  'users/fetchShelfForCurrentUser',
  async ({ page, take, order }: FetchPageParams): Promise<Page<Wine>> => {
    const response = await fetchShelfForCurrentUser(page, take, order);
    return response.data;
  },
);

// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchShelfForCurrentUserAsync = (params: FetchPageParams = {}) =>
  _fetchShelfForCurrentUserAsync(params);

const initialState: UserShelfState = {
  data: EmptyPaginationState,
  status: 'idle',
};

const userShelfSlice = createSlice({
  name: 'userShelf',
  initialState: initialState as UserShelfState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShelfForUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShelfForUserAsync.fulfilled, (state, action) => {
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
      .addCase(fetchShelfForUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(_fetchShelfForCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchShelfForCurrentUserAsync.fulfilled, (state, action) => {
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
      .addCase(_fetchShelfForCurrentUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default userShelfSlice.reducer;

const _selectUserShelfPage = (state: RootState) => state.userShelf.data;

export const selectUserShelfPage = createSelector(
  [_selectUserShelfPage],
  (userShelfPage: Page<Wine>) => userShelfPage,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);
