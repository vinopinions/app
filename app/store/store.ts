import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storesReducer from '../features/stores/storesSlice';
import winemakersReducer from '../features/winemakers/winemakersSlice';
import winesReducer from '../features/wines/winesSlice';
import storesReducer from '../features/stores/storesSlice';
import currentUserReducer from '../features/users/currentUserSlice';
import ratingsSlice from '../features/ratings/ratingsSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    wines: winesReducer,
    winemakers: winemakersReducer,
    stores: storesReducer,
    currentUser: currentUserReducer,
    ratings: ratingsSlice
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
