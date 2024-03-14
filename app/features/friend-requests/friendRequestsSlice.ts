import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import {
  fetchIncomingFriendRequests,
  fetchOutgoingFriendRequests,
  sendFriendRequest,
} from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import PaginationState from '../../api/pagination/PaginationState';
import FriendRequest from '../../models/FriendRequest';
import Page from '../../models/Page';
import { RootState } from '../../store/store';

type FriendRequestsData = {
  incoming: PaginationState<FriendRequest>;
  outgoing: PaginationState<FriendRequest>;
};
type FriendRequestsState = ApiResponseState<FriendRequestsData>;

export const _fetchIncomingFriendRequestsAsync = createAsyncThunk<
  Page<FriendRequest>,
  FetchPageParams
>(
  'friendRequests/fetchIncoming',
  async ({ page, take, order }: FetchPageParams) => {
    const response = await fetchIncomingFriendRequests(page, take, order);
    return response.data;
  },
);

// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchIncomingFriendRequestsAsync = (
  params: FetchPageParams = {},
) => _fetchIncomingFriendRequestsAsync(params);

export const _fetchOutgoingFriendRequestsAsync = createAsyncThunk<
  Page<FriendRequest>,
  FetchPageParams
>(
  'friendRequests/fetchOutgoing',
  async ({ page, take, order }: FetchPageParams) => {
    const response = await fetchOutgoingFriendRequests(page, take, order);
    return response.data;
  },
);

// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchOutgoingFriendRequestsAsync = (
  params: FetchPageParams = {},
) => _fetchOutgoingFriendRequestsAsync(params);

export const sendFriendRequestAsync = createAsyncThunk(
  'friendRequests/send',
  async (username: string) => {
    const response = await sendFriendRequest(username);
    return response.data;
  },
);

const initialState: FriendRequestsState = {
  data: {
    incoming: EmptyPaginationState,
    outgoing: EmptyPaginationState,
  },
  status: 'idle',
};

const friendRequestsSlice = createSlice({
  name: 'friendRequests',
  initialState: initialState as FriendRequestsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchIncomingFriendRequestsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchIncomingFriendRequestsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.meta.page === 1) {
          state.data.incoming = action.payload;
        } else {
          state.data.incoming = {
            ...action.payload,
            data: [...state.data.incoming.data, ...action.payload.data],
          };
        }
      })
      .addCase(_fetchIncomingFriendRequestsAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(_fetchOutgoingFriendRequestsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchOutgoingFriendRequestsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.meta.page === 1) {
          state.data.outgoing = action.payload;
        } else {
          state.data.outgoing = {
            ...action.payload,
            data: [...state.data.outgoing.data, ...action.payload.data],
          };
        }
      })
      .addCase(_fetchOutgoingFriendRequestsAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(sendFriendRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendFriendRequestAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendFriendRequestAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default friendRequestsSlice.reducer;

const selectFriendRequestData = (state: RootState) => state.friendRequests.data;

export const selectIncomingFriendRequestsPage = createSelector(
  [selectFriendRequestData],
  (friendRequestsData: FriendRequestsData) => friendRequestsData.incoming,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectOutgoingFriendRequestsPage = createSelector(
  [selectFriendRequestData],
  (friendRequestsData: FriendRequestsData) => friendRequestsData.outgoing,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);
