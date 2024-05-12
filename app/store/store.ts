import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import feedSlice from '../features/feed/feedSlice';
import friendRequestsSlice from '../features/friend-requests/friendRequestsSlice';
import notificationSlice from '../features/notifications/notificationSlice';
import ratingsSlice from '../features/ratings/ratingsSlice';
import storeWinesReducer from '../features/stores/storeWinesSlice';
import storesReducer from '../features/stores/storesSlice';
import currentUserReducer from '../features/users/currentUserSlice';
import userFriendsSlice from '../features/users/userFriendsSlice';
import userRatingsReducer from '../features/users/userRatingsSlice';
import userShelfSlice from '../features/users/userShelfSlice';
import usersSlice from '../features/users/usersSlice';
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
  userRatings: userRatingsReducer,
  ratings: ratingsSlice,
  feed: feedSlice,
  users: usersSlice,
  userFriends: userFriendsSlice,
  userShelf: userShelfSlice,
  friendRequests: friendRequestsSlice,
  notifications: notificationSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
