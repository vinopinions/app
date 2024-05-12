import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addNotificationToken,
  removeNotificationToken,
} from '../../api/apiUsers';
import ApiResponseState from '../../api/utils/ApiResponseState';

type NotificationState = ApiResponseState<undefined>;

export const addNotificationTokenAsync = createAsyncThunk(
  'notifications/addToken',
  async (token: string): Promise<void> => {
    await addNotificationToken(token);
  },
);

export const removeNotificationTokenAsync = createAsyncThunk(
  'notifications/removeToken',
  async (token: string): Promise<void> => {
    await removeNotificationToken(token);
  },
);
const initialState: NotificationState = {
  data: undefined,
  status: 'idle',
};

const notificationSlice = createSlice({
  name: 'notifications',
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

export default notificationSlice.reducer;
