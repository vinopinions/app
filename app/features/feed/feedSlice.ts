import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { fetchFeed } from '../../api/api';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import { RootState } from '../../store/store';

type CurrentFeedState = ApiResponseState<Page<Rating>>;

type FetchFeedAsyncParams = {
  page?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
};

export const _fetchFeedAsync = createAsyncThunk<
  Page<Rating>,
  FetchFeedAsyncParams
>('feed', async ({ page, take, order }: FetchFeedAsyncParams) => {
  const response = await fetchFeed(page, take, order);
  return response.data;
});
// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchFeedAsync = (params: FetchFeedAsyncParams = {}) =>
  _fetchFeedAsync(params);

export const initialState: CurrentFeedState = {
  data: {
    data: [],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
  status: 'idle',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState as CurrentFeedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchFeedAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchFeedAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(_fetchFeedAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default feedSlice.reducer;

const _selectFeed = (state: RootState) => state.feed.data;

export const selectFeed = createSelector(
  [_selectFeed],
  (feed: Page<Rating>) => feed,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);
