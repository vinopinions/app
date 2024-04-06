import { AxiosRequestConfig } from 'axios';
import {
  ID_URL_PARAMETER,
  RATINGS_ENDPOINT_URL,
  RATINGS_ID_ENDPOINT_URL,
} from '../constants/UrlConstants';
import { createDefaultAxiosInstance } from './utils/utils';

const api = createDefaultAxiosInstance({
  baseURL: RATINGS_ENDPOINT_URL,
});
export const deleteRating = (ratingId: string, options?: AxiosRequestConfig) =>
  api.delete(
    RATINGS_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, ratingId),
    options,
  );
