import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  acceptFriendRequest,
  declineFriendRequest,
  fetchIncomingFriendRequests,
  fetchOutgoingFriendRequests,
  revokeFriendRequest,
  sendFriendRequest,
} from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FetchPageParams from '../../api/pagination/FetchPageParams';
import PaginationState from '../../api/pagination/PaginationState';
import ApiResponseState from '../../api/utils/ApiResponseState';
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
    await sendFriendRequest(username);
  },
);

export const acceptFriendRequestAsync = createAsyncThunk<string, string>(
  'friendRequests/accept',
  async (id: string) => {
    await acceptFriendRequest(id);
    return id;
  },
);

export const declineFriendRequestAsync = createAsyncThunk<string, string>(
  'friendRequests/decline',
  async (id: string) => {
    await declineFriendRequest(id);
    return id;
  },
);

export const revokeFriendRequestAsync = createAsyncThunk<string, string>(
  'friendRequests/revoke',
  async (id: string) => {
    await revokeFriendRequest(id);
    return id;
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
      .addCase(acceptFriendRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptFriendRequestAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.data.incoming.data = state.data.incoming.data.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(acceptFriendRequestAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(declineFriendRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(declineFriendRequestAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.data.incoming.data = state.data.incoming.data.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(declineFriendRequestAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(revokeFriendRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(revokeFriendRequestAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.data.outgoing.data = state.data.outgoing.data.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(revokeFriendRequestAsync.rejected, (state, action) => {
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
