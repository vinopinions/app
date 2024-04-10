import axios, { CreateAxiosDefaults } from 'axios';
import { Alert } from 'react-native';

export const createDefaultAxiosInstance = (
  axiosConfig?: CreateAxiosDefaults<unknown>,
) => {
  const instance = axios.create(axiosConfig);

  // sometimes the Authorization header was not set, so this is our fix
  instance.interceptors.request.use((config) => {
    if (axios.defaults.headers.common.Authorization) {
      config.headers.Authorization =
        axios.defaults.headers.common.Authorization;
    }
    return config;
  });

  // request logging interceptor
  instance.interceptors.request.use(
    (config) => {
      const timestamp = new Date().toISOString();
      console.log(
        `Request: ${timestamp} ${config.method.toUpperCase()} ${
          config.baseURL
        }${config.url}`,
      );

      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    },
  );

  // response logging interceptor
  instance.interceptors.response.use(
    (response) => {
      const timestamp = new Date().toISOString();
      const { config } = response;
      console.log(
        `Response: ${timestamp} ${config.method.toUpperCase()} ${
          config.baseURL
        }${config.url} ${response.status}`,
      );
      return response;
    },
    (error) => {
      if (error?.response?.data?.message) {
        const message = error.response.data.message;
        Alert.alert(
          error.response.data.error,
          Array.isArray(message) ? message.join('. ') : message,
        );
      } else {
        console.error('Network error or other issue:', error.message);
      }
      return Promise.reject(error);
    },
  );

  // bad response status interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.data?.message) {
        const message = error.response.data.message;
        Alert.alert(
          error.response.data.error,
          Array.isArray(message) ? message.join('. ') : message,
        );
      } else {
        console.error('Network error or other issue:', error.message);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
