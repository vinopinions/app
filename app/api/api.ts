import { Credentials } from '../auth/AuthContext';
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

export const fetchWines = () => apiWines.get('');
export const createWine = (wine: Wine) => apiWines.post('/', wine);

export const fetchWinemakers = () => apiWinemakers.get('/');
export const createWinemaker = (winemaker: Winemaker) =>
  apiWinemakers.post('/', winemaker);

export const fetchStores = () => apiStores.get('/');
export const createStore = (store: Store) => apiStores.post('/', store);
