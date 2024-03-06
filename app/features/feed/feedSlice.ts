import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { fetchFeed } from '../../api/api';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import { RootState } from '../../store/store';

type FeedState = ApiResponseState<Page<Rating>>;

export const _fetchFeedAsync = createAsyncThunk<Page<Rating>, FetchPageParams>(
  'feed',
  async ({ page, take, order }: FetchPageParams) => {
    const response = await fetchFeed(page, take, order);
    return response.data;
  },
);
// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchFeedAsync = (params: FetchPageParams = {}) =>
  _fetchFeedAsync(params);

export const initialState: FeedState = {
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
  initialState: initialState as FeedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchFeedAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchFeedAsync.fulfilled, (state, action) => {
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
