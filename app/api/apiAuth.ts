import { AxiosRequestConfig } from 'axios';
import {
  AUTH_ENDPOINT_URL,
  AUTH_GOOGLE_ENDPOINT_URL,
} from '../constants/UrlConstants';
import { createDefaultAxiosInstance } from './utils/utils';

const api = createDefaultAxiosInstance({
  baseURL: AUTH_ENDPOINT_URL,
});

export const sendGoogleLoginRequest = (
  idToken: string,
  options?: AxiosRequestConfig,
) => api.post(AUTH_GOOGLE_ENDPOINT_URL, { idToken }, options);
