import { Credentials } from '../auth/AuthContext';
import Rating from '../models/Rating';
import Store from '../models/Store';
import Wine from '../models/Wine';
import Winemaker from '../models/Winemaker';
import { createDefaultAxiosInstance } from './utils';

const BASE_URL = 'https://api-t.vinopinions.spots.host/v0';
const BASE_URL_AUTH = `${BASE_URL}/auth`;
const BASE_URL_WINES = `${BASE_URL}/wines`;
const BASE_URL_WINEMAKERS = `${BASE_URL}/winemakers`;
const BASE_URL_STORES = `${BASE_URL}/stores`;
const BASE_URL_USERS = `${BASE_URL}/users`;

export const apiAuth = createDefaultAxiosInstance({ baseURL: BASE_URL_AUTH });

export const apiWines = createDefaultAxiosInstance({ baseURL: BASE_URL_WINES });

export const apiWinemakers = createDefaultAxiosInstance({ baseURL: BASE_URL_WINEMAKERS });

export const apiStores = createDefaultAxiosInstance({ baseURL: BASE_URL_STORES });

export const apiWineRatings = createDefaultAxiosInstance({ baseURL: BASE_URL_WINES });

export const apiUsers = createDefaultAxiosInstance({ baseURL: BASE_URL_USERS });

export const login = (credentials: Credentials) => apiAuth.post('/login', credentials);
export const signup = (credentials: Credentials) => apiAuth.post('/signup', credentials);

export const fetchCurrentUser = () => apiUsers.get('/me');

export const fetchWines = () => apiWines.get('/');
export const fetchWineById = (wineId: string) => apiWines.get(`/${wineId}`);
export const createWine = (wine: Wine) => apiWines.post('/', wine);

export const fetchWinemakers = () => apiWinemakers.get('/');
export const createWinemaker = (winemaker: Winemaker) => apiWinemakers.post('/', winemaker);

export const fetchStores = () => apiStores.get('/');
export const fetchStoreById = (storeId: string) => apiStores.get(`/${storeId}`);
export const createStore = (store: Store) => apiStores.post('/', store);

export const fetchWineRatings = (wineId: string) => apiWineRatings.get(`/${wineId}/ratings`);
export const createWineRating = async (wineId: string, rating: Rating) => apiWineRatings.post(`/${wineId}/ratings`, rating);
