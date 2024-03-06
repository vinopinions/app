import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import feedSlice from '../features/feed/feedSlice';
import ratingsSlice from '../features/ratings/ratingsSlice';
import storeWinesReducer from '../features/stores/storeWinesSlice';
import storesReducer from '../features/stores/storesSlice';
import currentUserReducer from '../features/users/currentUserSlice';
import winemakersReducer from '../features/winemakers/winemakersSlice';
import wineRatingsReducer from '../features/wines/wineRatingsSlice';
import wineStoresReducer from '../features/wines/wineStoresSlice';
import winesReducer from '../features/wines/winesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  wines: winesReducer,
  wineStores: wineStoresReducer,
  wineRatings: wineRatingsReducer,
  winemakers: winemakersReducer,
  stores: storesReducer,
  storeWines: storeWinesReducer,
  currentUser: currentUserReducer,
  ratings: ratingsSlice,
  feed: feedSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
