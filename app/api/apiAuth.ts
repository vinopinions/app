import { AxiosRequestConfig } from 'axios';
import {
  AUTH_CHECK_ENDPOINT_URL,
  AUTH_ENDPOINT_URL,
  AUTH_SIGNUP_ENDPOINT_URL,
} from '../constants/UrlConstants';
import { createDefaultAxiosInstance } from './utils/utils';

const api = createDefaultAxiosInstance({
  baseURL: AUTH_ENDPOINT_URL,
});

export const sendCheckRequest = (
  firebaseToken: string,
  options?: AxiosRequestConfig,
) => api.post(AUTH_CHECK_ENDPOINT_URL, { firebaseToken }, options);

export const sendSignupRequest = (
  username: string,
  firebaseToken: string,
  options?: AxiosRequestConfig,
) => api.post(AUTH_SIGNUP_ENDPOINT_URL, { username, firebaseToken }, options);
