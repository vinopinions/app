import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { login, signup } from '../../api/api';
import { Credentials } from '../../auth/AuthContext';

const TOKEN_KEY = 'api-jwt';

export const loginAsync = createAsyncThunk('auth/login', async (credentials: Credentials) => {
    const response = await login(credentials);
    const token = response.data.access_token;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    SecureStore.setItemAsync(TOKEN_KEY, token);
    return response.data;
});

export const signupAsync = createAsyncThunk('auth/signup', async (credentials: Credentials) => {
    const response = await signup(credentials);
    return response.data;
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
    delete axios.defaults.headers.common.Authorization;

    return await SecureStore.deleteItemAsync(TOKEN_KEY);
});

export const loadAccessTokenAsync = createAsyncThunk('auth/loadAccessToken', async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!token) return Promise.reject();

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access_token: null,
        authenticated: false,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.authenticated = true;
                state.access_token = action.payload.access_token;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(signupAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(signupAsync.fulfilled, state => {
                state.status = 'succeeded';
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logoutAsync.fulfilled, state => {
                state.access_token = null;
                state.authenticated = false;
            })
            .addCase(loadAccessTokenAsync.fulfilled, (state, action) => {
                state.access_token = action.payload;
                state.authenticated = true;
            });
    }
});

export default authSlice.reducer;
