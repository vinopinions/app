import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { HttpStatusCode } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { fetchCurrentUser } from '../../api/api';

const TOKEN_KEY = 'api-jwt';

export type AuthState =
  | {
      status: 'idle' | 'loading';
      authenticated: boolean;
    }
  | {
      status: 'succeeded';
      authenticated: boolean;
      accessToken: string;
    }
  | {
      status: 'failed';
      error: string;
    };

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  delete axios.defaults.headers.common.Authorization;

  return await SecureStore.deleteItemAsync(TOKEN_KEY);
});

export const loginGoogleAsync = createAsyncThunk(
  'auth/loginGoogle',
  async (idToken: string) => {
    console.log(idToken);
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // return await auth().signInWithCredential(googleCredential);
  },
);

export const loadAccessTokenAsync = createAsyncThunk(
  'auth/loadAccessToken',
  async (): Promise<string> => {
    // load token from secure store
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    // fail if no token was found
    if (!token) {
      return Promise.reject();
    }

    // check if the token is still valid by sending a request to a protected endpoint of the api
    const checkResponse = await fetchCurrentUser({
      headers: {
        Authorization: 'Bearer ' + token,
      },
      // allow all responses to prevent error interceptors to be called
      validateStatus: () => true,
    });

    if (checkResponse.status !== HttpStatusCode.Ok) {
      return Promise.reject();
    }

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return token;
  },
);

const initialState: AuthState = {
  status: 'idle',
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        if (state.status === 'succeeded') {
          state.accessToken = null;
          state.authenticated = false;
        }
      })
      .addCase(loginGoogleAsync.pending, () => {
        console.log('pending');
      })
      .addCase(loginGoogleAsync.fulfilled, (state, action) => {
        console.log('fulfilled');
        console.log(action.payload);
      })
      .addCase(loginGoogleAsync.rejected, () => {
        console.log('rejected');
      })
      .addCase(loadAccessTokenAsync.rejected, (state) => {
        state.status = 'failed';
        axios.defaults.headers.common.Authorization = '';
      })
      .addCase(loadAccessTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAccessTokenAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.status === 'succeeded') {
          state.accessToken = action.payload;
          state.authenticated = true;
        }
      });
  },
});

export default authSlice.reducer;
