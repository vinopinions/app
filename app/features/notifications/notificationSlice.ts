import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  addNotificationToken,
  removeNotificationToken,
} from '../../api/apiUsers';
import ApiResponseState from '../../api/utils/ApiResponseState';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import { RootState } from '../../store/store';

type NotificationState = ApiResponseState<undefined>;

export const addNotificationTokenAsync = createAsyncThunk(
  'notifications/addToken',
  async (token: string): Promise<void> => {
    await addNotificationToken(token);
  },
);

export const removeNotificationTokenAsync = createAsyncThunk(
  'notifications/addToken',
  async (token: string): Promise<void> => {
    await removeNotificationToken(token);
  },
);
const initialState: NotificationState = {
  data: undefined,
  status: 'idle',
};

const userShelfSlice = createSlice({
  name: 'userShelf',
  initialState: initialState as NotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNotificationTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNotificationTokenAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addNotificationTokenAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(removeNotificationTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeNotificationTokenAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(removeNotificationTokenAsync.rejected, (state, action) => {
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
