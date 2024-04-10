import { AxiosRequestConfig } from 'axios';
import { FEED_URL } from '../constants/UrlConstants';
import { createDefaultAxiosInstance } from './utils/utils';

const api = createDefaultAxiosInstance({
  baseURL: FEED_URL,
});

export const fetchFeed = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  api.get('', {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });
