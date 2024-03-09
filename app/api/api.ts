import { AxiosRequestConfig } from 'axios';
import { Credentials } from '../auth/AuthContext';
import {
  AUTH_ENDPOINT_URL,
  AUTH_LOGIN_ENDPOINT_URL,
  AUTH_SIGNUP_ENDPOINT_URL,
  FEED_URL,
  ID_URL_PARAMETER,
  RATINGS_ENDPOINT_URL,
  RATINGS_ID_ENDPOINT_URL,
  STORES_ENDPOINT_URL,
  STORES_ID_ENDPOINT_URL,
  STORES_ID_WINES_ENDPOINT_URL,
  USERNAME_URL_PARAMETER,
  USERS_ENDPOINT_URL,
  USERS_ME_ENDPOINT_URL,
  USERS_USERNAME_RATINGS_ENDPOINT_URL,
  WINEMAKERS_ENDPOINT_URL,
  WINES_ENDPOINT_URL,
  WINES_ID_ENDPOINT_URL,
  WINES_ID_RATINGS_ENDPOINT_URL,
  WINES_ID_STORES_ENDPOINT_URL,
} from '../constants/UrlConstants';
import Winemaker from '../models/Winemaker';
import RatingDto from '../models/dtos/Rating.dto';
import StoreDto from '../models/dtos/Store.dto';
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

export const apiWineRatings = createDefaultAxiosInstance({
  baseURL: WINES_ENDPOINT_URL,
});

export const apiUsers = createDefaultAxiosInstance({
  baseURL: USERS_ENDPOINT_URL,
});

export const apiRatings = createDefaultAxiosInstance({
  baseURL: RATINGS_ENDPOINT_URL,
});

export const apiFeed = createDefaultAxiosInstance({
  baseURL: FEED_URL,
});

export const login = (credentials: Credentials, options?: AxiosRequestConfig) =>
  apiAuth.post(AUTH_LOGIN_ENDPOINT_URL, credentials, options);

export const signup = (
  credentials: Credentials,
  options?: AxiosRequestConfig,
) => apiAuth.post(AUTH_SIGNUP_ENDPOINT_URL, credentials, options);

export const fetchCurrentUser = (options?: AxiosRequestConfig) =>
  apiUsers.get(USERS_ME_ENDPOINT_URL, options);

export const fetchRatingsForUser = (
  username: string,
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiUsers.get(
    USERS_USERNAME_RATINGS_ENDPOINT_URL.replace(
      USERNAME_URL_PARAMETER,
      username,
    ),
    {
      params: {
        page,
        take,
        order,
      },
      ...options,
    },
  );

export const fetchWineById = (wineId: string, options?: AxiosRequestConfig) =>
  apiWines.get(
    WINES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId),
    options,
  );

export const fetchWines = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiWines.get('', {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });

export const fetchStoresForWine = (
  wineId: string,
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiWines.get(WINES_ID_STORES_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId), {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });

export const fetchRatingsForWine = (
  wineId: string,
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiWines.get(
    WINES_ID_RATINGS_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId),
    {
      params: {
        page,
        take,
        order,
      },
      ...options,
    },
  );

export const createWine = (wine: WineDto, options?: AxiosRequestConfig) =>
  apiWines.post('', wine, options);

export const updateStoresForWine = (
  wineId: string,
  storeIds: string[],
  options?: AxiosRequestConfig,
) =>
  apiWines.put(
    WINES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId),
    { storeIds },
    options,
  );

export const fetchWinemakers = (options?: AxiosRequestConfig) =>
  apiWinemakers.get('', options);

export const createWinemaker = (
  winemaker: Winemaker,
  options?: AxiosRequestConfig,
) => apiWinemakers.post('', winemaker, options);

export const fetchStores = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiStores.get('', {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });

export const fetchStoreById = (storeId: string, options?: AxiosRequestConfig) =>
  apiStores.get(
    STORES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, storeId),
    options,
  );

export const fetchWinesForStore = (
  storeId: string,
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiStores.get(
    STORES_ID_WINES_ENDPOINT_URL.replace(ID_URL_PARAMETER, storeId),
    {
      params: {
        page,
        take,
        order,
      },
      ...options,
    },
  );

export const createStore = (store: StoreDto, options?: AxiosRequestConfig) =>
  apiStores.post('', store, options);

export const createWineRating = (
  wineId: string,
  rating: RatingDto,
  options?: AxiosRequestConfig,
) =>
  apiWineRatings.post(
    WINES_ID_RATINGS_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId),
    rating,
    options,
  );

export const deleteRating = (ratingId: string, options?: AxiosRequestConfig) =>
  apiRatings.delete(
    RATINGS_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, ratingId),
    options,
  );

export const fetchFeed = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiFeed.get('', {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });
