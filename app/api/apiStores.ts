import { AxiosRequestConfig } from 'axios';
import {
  ID_URL_PARAMETER,
  STORES_ENDPOINT_URL,
  STORES_ID_ENDPOINT_URL,
  STORES_ID_WINES_ENDPOINT_URL,
} from '../constants/UrlConstants';
import CreateStoreDto from '../models/dtos/Store.dto';
import { createDefaultAxiosInstance } from './utils/utils';

const api = createDefaultAxiosInstance({
  baseURL: STORES_ENDPOINT_URL,
});

export const fetchStores = (
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

export const fetchStoreById = (storeId: string, options?: AxiosRequestConfig) =>
  api.get(STORES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, storeId), options);

export const fetchWinesForStore = (
  storeId: string,
  page?: number,
  take?: number,
  order?: 'ASC' | 'DESC',
  options?: AxiosRequestConfig,
) =>
  api.get(STORES_ID_WINES_ENDPOINT_URL.replace(ID_URL_PARAMETER, storeId), {
    params: {
      page,
      take,
      order,
    },
    ...options,
  });

export const createStore = (
  store: CreateStoreDto,
  options?: AxiosRequestConfig,
) =>
  api.post(
    '',
    { name: store.name, address: store.address, url: store.url },
    options,
  );

export const uploadStoreImage = async (storeId: string, uri: string) => {
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  const formData: FormData = new FormData();
  formData.append('file', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  } as any);
  return await api.put(
    `${STORES_ID_ENDPOINT_URL.replace(ID_URL_PARAMETER, storeId)}/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
