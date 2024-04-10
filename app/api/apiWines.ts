import { AxiosRequestConfig } from 'axios';
import {
  ID_URL_PARAMETER,
  WINES_ENDPOINT_URL,
  WINES_ID_ENDPOINT_URL,
  WINES_ID_RATINGS_ENDPOINT_URL,
  WINES_ID_STORES_ENDPOINT_URL,
} from '../constants/UrlConstants';
import RatingDto from '../models/dtos/Rating.dto';
import WineDto from '../models/dtos/Wine.dto';
import { createDefaultAxiosInstance } from './utils/utils';

const api = createDefaultAxiosInstance({
  baseURL: WINES_ENDPOINT_URL,
});

export const fetchWineById = (wineId: string, options?: AxiosRequestConfig) =>
  api.get(WINES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId), options);

export const fetchWines = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  filter?: string,
  options?: AxiosRequestConfig,
) =>
  api.get('', {
    params: {
      page,
      take,
      order,
      filter,
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
  api.get(WINES_ID_STORES_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId), {
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
  api.get(WINES_ID_RATINGS_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId), {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });

export const createWine = (wine: WineDto, options?: AxiosRequestConfig) =>
  api.post('', wine, options);

export const updateStoresForWine = (
  wineId: string,
  storeIds: string[],
  options?: AxiosRequestConfig,
) =>
  api.put(
    WINES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId),
    { storeIds },
    options,
  );

export const createWineRating = (
  wineId: string,
  rating: RatingDto,
  options?: AxiosRequestConfig,
) =>
  api.post(
    WINES_ID_RATINGS_ENDPOINT_URL.replace(ID_URL_PARAMETER, wineId),
    rating,
    options,
  );
