import { AxiosRequestConfig } from 'axios';
import { WINEMAKERS_ENDPOINT_URL } from '../constants/UrlConstants';
import Winemaker from '../models/Winemaker';
import { createDefaultAxiosInstance } from './utils/utils';

export const apiWinemakers = createDefaultAxiosInstance({
  baseURL: WINEMAKERS_ENDPOINT_URL,
});

export const fetchWinemakers = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  filter?: string,
  options?: AxiosRequestConfig,
) =>
  apiWinemakers.get('', {
    params: {
      page,
      take,
      order,
      filter,
    },
    ...options,
  });

export const createWinemaker = (
  winemaker: Winemaker,
  options?: AxiosRequestConfig,
) => apiWinemakers.post('', winemaker, options);
