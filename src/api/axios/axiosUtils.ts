import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { BASE_URLS, AUTH_HEADERS } from '../constants';

const getAuthHeaders = (url: string) => {
  if (!url) {
    return null;
  }

  return url.includes(BASE_URLS.rapidAPI) ? AUTH_HEADERS.rapidAPI : AUTH_HEADERS.footballDataApi;
};

const axiosRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authHeaders = getAuthHeaders(config.url || '');

  if (authHeaders === null) {
    return config;
  }

  Object.keys(authHeaders).forEach(headerKey => {
    config.headers.set(headerKey, authHeaders[headerKey as keyof typeof authHeaders]);
  });

  return config;
};

const axiosRequestErrorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

const axiosResponseInterceptor = (response: AxiosResponse) => {
  return response.data;
};

const axiosResponseErrorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

export {
  axiosRequestInterceptor,
  axiosRequestErrorHandler,
  axiosResponseInterceptor,
  axiosResponseErrorHandler,
};
