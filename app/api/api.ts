import { Credentials } from '../auth/AuthContext';
import {
  AUTH_ENDPOINT_URL,
  AUTH_LOGIN_ENDPOINT_URL,
  AUTH_SIGNUP_ENDPOINT_URL,
  ID_URL_PARAMETER,
  RATINGS_ENDPOINT_URL,
  RATINGS_ID_ENDPOINT_URL,
  STORES_ENDPOINT_URL,
  STORES_ID_ENDPOINT_URL,
  USERS_ENDPOINT_URL,
  USERS_ME_ENDPOINT_URL,
  WINEMAKERS_ENDPOINT_URL,
  WINES_ENDPOINT_URL,
  WINES_ID_ENDPOINT_URL,
  WINES_ID_RATINGS_ENDPOINT_URL,
} from '../constants/UrlConstants';
import Store from '../models/Store';
import Winemaker from '../models/Winemaker';
import WineDto from '../models/dtos/Wine.dto';
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

export const apiWineRatings = createDefaultAxiosInstance({
  baseURL: WINES_ENDPOINT_URL,
});

export const apiUsers = createDefaultAxiosInstance({
  baseURL: USERS_ENDPOINT_URL,
});

export const apiRatings = createDefaultAxiosInstance({
  baseURL: RATINGS_ENDPOINT_URL,
});

export const fetchCurrentUser = () => apiUsers.get(USERS_ME_ENDPOINT_URL);

export const fetchWineById = (wineId: string) =>
  apiWines.get(WINES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId));

export const fetchWines = () => apiWines.get('');
export const createWine = (wine: WineDto) => apiWines.post('', wine);
export const updateStoresForWine = (wineId: string, storeIds: string[]) =>
  apiWines.put(WINES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId), {
    storeIds,
  });

export const fetchWinemakers = () => apiWinemakers.get('');
export const createWinemaker = (winemaker: Winemaker) =>
  apiWinemakers.post('', winemaker);

export const fetchStores = () => apiStores.get('/');
export const fetchStoreById = (storeId: string) =>
  apiStores.get(STORES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, storeId));
export const createStore = (store: Store) => apiStores.post('', store);

export const createWineRating = (wineId: string, rating: RatingDto) =>
  apiWineRatings.post(
    WINES_ID_RATINGS_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId),
    rating,
  );

export const deleteRating = (ratingId: string) =>
  apiRatings.delete(
    RATINGS_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, ratingId),
  );
