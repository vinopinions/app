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
        }${config.url} ${config.params?.id || ''}`,
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
      const { config, status } = response;
      console.log(
        `Response: ${timestamp} ${config.method.toUpperCase()} ${
          config.url
        } ${status} ${config.params?.id || ''}`,
      );
      return response;
    },
    (error) => {
      console.error('Response error:', error);
      return Promise.reject(error);
    },
  );

  // bad response status interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          Alert.alert('Unauthorized');
        } else if (status === 404) {
          // Handle not found error
          Alert.alert(`Endpoint ${error.config.url} not found`);
        }

        return Promise.reject(error);
      } else {
        console.error('Network error or other issue:', error.message);
        return Promise.reject(error);
      }
    },
  );

  return instance;
};
