import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { sendCheckRequest, sendSignupRequest } from '../../api/apiAuth';

export type AuthState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  registered: boolean;
  firebaseToken: string;
  error: string;
};

interface SignupParams {
  firebaseToken: string;
  username: string;
}

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  delete axios.defaults.headers.common.Authorization;

  await auth().signOut();
});

export const checkAsync = createAsyncThunk(
  'auth/check',
  async (firebaseToken: string) => {
    const response = await sendCheckRequest(firebaseToken);
    return response.data;
  },
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (params: SignupParams) => {
    const response = await sendSignupRequest(
      params.username,
      params.firebaseToken,
    );
    return response.data;
  },
);

export const loginGoogleAsync = createAsyncThunk(
  'auth/loginGoogle',
  async (idToken: string) => {
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return await loginFirebase(googleCredential);
  },
);

export const loginFacebookAsync = createAsyncThunk(
  'auth/loginFacebook',
  async (idToken: string) => {
    const facebookCredential = auth.FacebookAuthProvider.credential(idToken);
    return await loginFirebase(facebookCredential);
  },
);

export const loginAppleAsync = createAsyncThunk(
  'auth/loginApple',
  async (idToken: string) => {
    const appleCredential = auth.AppleAuthProvider.credential(idToken);
    return await loginFirebase(appleCredential);
  },
);

export const loginFirebase = async (
  credential: FirebaseAuthTypes.AuthCredential,
) => {
  await auth().signInWithCredential(credential);
  return await auth().currentUser.getIdToken();
};

const initialState: AuthState = {
  status: 'idle',
  firebaseToken: undefined,
  error: undefined,
  registered: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.firebaseToken = null;
        state.registered = false;
      })
      .addCase(loginGoogleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginGoogleAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firebaseToken = action.payload;
      })
      .addCase(loginGoogleAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loginAppleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAppleAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firebaseToken = action.payload;
      })
      .addCase(loginAppleAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(checkAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.registered = action.payload.exists;
      })
      .addCase(checkAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;
