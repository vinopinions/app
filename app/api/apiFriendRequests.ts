import { AxiosRequestConfig } from 'axios';
import {
  FRIEND_REQUESTS_ENDPOINT_URL,
  FRIEND_REQUESTS_ID_ACCEPT_ENDPOINT_URL,
  FRIEND_REQUESTS_ID_DECLINE_ENDPOINT_URL,
  FRIEND_REQUESTS_ID_REVOKE_ENDPOINT_URL,
  FRIEND_REQUESTS_INCOMING_ENDPOINT_URL,
  FRIEND_REQUESTS_OUTGOING_ENDPOINT_URL,
  FRIEND_REQUESTS_SEND_ENDPOINT_URL,
  ID_URL_PARAMETER,
} from '../constants/UrlConstants';
import { createDefaultAxiosInstance } from './utils/utils';

const api = createDefaultAxiosInstance({
  baseURL: FRIEND_REQUESTS_ENDPOINT_URL,
});

export const fetchIncomingFriendRequests = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  api.get(FRIEND_REQUESTS_INCOMING_ENDPOINT_URL, {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });

export const fetchOutgoingFriendRequests = (
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  api.get(FRIEND_REQUESTS_OUTGOING_ENDPOINT_URL, {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });

export const sendFriendRequest = (
  username: string,
  options?: AxiosRequestConfig,
) => api.post(FRIEND_REQUESTS_SEND_ENDPOINT_URL, { username }, options);

export const acceptFriendRequest = (id: string, options?: AxiosRequestConfig) =>
  api.post(
    FRIEND_REQUESTS_ID_ACCEPT_ENDPOINT_URL.replace(ID_URL_PARAMETER, id),
    options,
  );

export const declineFriendRequest = (
  id: string,
  options?: AxiosRequestConfig,
) =>
  api.post(
    FRIEND_REQUESTS_ID_DECLINE_ENDPOINT_URL.replace(ID_URL_PARAMETER, id),
    options,
  );

export const revokeFriendRequest = (id: string, options?: AxiosRequestConfig) =>
  api.post(
    FRIEND_REQUESTS_ID_REVOKE_ENDPOINT_URL.replace(ID_URL_PARAMETER, id),
    options,
  );
