import { AxiosRequestConfig } from 'axios';
import {
  USERNAME_URL_PARAMETER,
  USERS_ENDPOINT_URL,
  USERS_ME_ENDPOINT_URL,
  USERS_USERNAME_FRIENDS_ENDPOINT_URL,
  USERS_USERNAME_RATINGS_ENDPOINT_URL,
} from '../constants/UrlConstants';
import { createDefaultAxiosInstance } from './utils/utils';

const apiUsers = createDefaultAxiosInstance({
  baseURL: USERS_ENDPOINT_URL,
});

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

export const fetchUsers = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  filter?: string,
  options?: AxiosRequestConfig,
) =>
  apiUsers.get('', {
    params: {
      page,
      take,
      order,
      filter,
    },
    ...options,
  });

export const fetchFriendsForUser = (
  username: string,
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  apiUsers.get(
    USERS_USERNAME_FRIENDS_ENDPOINT_URL.replace(
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
