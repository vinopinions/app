import { Credentials } from '../auth/AuthContext';
import Rating from '../models/Rating';
import {
  AUTH_ENDPOINT_URL,
  AUTH_LOGIN_ENDPOINT_URL,
  AUTH_SIGNUP_ENDPOINT_URL,
  STORES_ENDPOINT_URL,
  WINEMAKERS_ENDPOINT_URL,
  WINES_ENDPOINT_URL,
} from '../constants/UrlConstants';
import Store from '../models/Store';
import Wine from '../models/Wine';
import Winemaker from '../models/Winemaker';
import { createDefaultAxiosInstance } from './utils';

export const apiAuth = createDefaultAxiosInstance({
  baseURL: AUTH_ENDPOINT_URL,
});

export const apiWines = createDefaultAxiosInstance({
  baseURL: WINES_ENDPOINT_URL,
});

export const apiWinemakers = createDefaultAxiosInstance({
  baseURL: WINEMAKERS_ENDPOINT_URL,
});

export const apiStores = createDefaultAxiosInstance({
  baseURL: STORES_ENDPOINT_URL,
});

export const login = (credentials: Credentials) =>
  apiAuth.post(AUTH_LOGIN_ENDPOINT_URL, credentials);
export const signup = (credentials: Credentials) =>
  apiAuth.post(AUTH_SIGNUP_ENDPOINT_URL, credentials);

<<<<<<< HEAD
export const apiWineRatings = createDefaultAxiosInstance({ baseURL: BASE_URL_WINES });

export const apiUsers = createDefaultAxiosInstance({ baseURL: BASE_URL_USERS });

export const apiRatings = createDefaultAxiosInstance({ baseURL: BASE_URL_RATINGS });

export const login = (credentials: Credentials) => apiAuth.post('/login', credentials);
export const signup = (credentials: Credentials) => apiAuth.post('/signup', credentials);

export const fetchCurrentUser = () => apiUsers.get('/me');

export const fetchWines = () => apiWines.get('/');
export const fetchWineById = (wineId: string) => apiWines.get(`/${wineId}`);
=======
export const fetchWines = () => apiWines.get('');
>>>>>>> developer
export const createWine = (wine: Wine) => apiWines.post('/', wine);
export const updateStoresForWine = (wineId: string, storeIds: string[]) => apiWines.put(`/${wineId}`, { storeIds });

export const fetchWinemakers = () => apiWinemakers.get('/');
export const createWinemaker = (winemaker: Winemaker) =>
  apiWinemakers.post('/', winemaker);

export const fetchStores = () => apiStores.get('/');
export const fetchStoreById = (storeId: string) => apiStores.get(`/${storeId}`);
export const createStore = (store: Store) => apiStores.post('/', store);

export const createWineRating = (wineId: string, rating: Rating) => apiWineRatings.post(`/${wineId}/ratings`, rating);

export const deleteRating = (ratingId: string) => apiRatings.delete(`/${ratingId}`);
