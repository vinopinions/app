import axios, { CreateAxiosDefaults } from 'axios';

export const createDefaultAxiosInstance = (
  axiosConfig?: CreateAxiosDefaults<unknown>,
) => {
  const instance = axios.create(axiosConfig);

  instance.interceptors.request.use(
    (config) => {
      if (axios.defaults.headers.common.Authorization) {
        config.headers.Authorization =
          axios.defaults.headers.common.Authorization;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

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

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;

        /*eslint no-alert: "off"*/
        // TODO: enable eslint rule and implement own handling
        if (status === 401) {
          alert('Unauthorized');
        } else if (status === 404) {
          // Handle not found error
          alert(`Endpoint ${error.config.url} not found`);
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
