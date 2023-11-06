import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { BASE_URLS, AUTH_HEADERS } from '../constants/requestOptions';

const addHeaders = (config: InternalAxiosRequestConfig, headers: Record<string, string>) => {
  Object.keys(headers).forEach(headerKey => {
    config.headers.set(headerKey, headers[headerKey as keyof typeof headers]);
  });
};

const axiosFootballDataApiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authHeaders = AUTH_HEADERS.footballDataApi;
  addHeaders(config, authHeaders);

  return config;
};

const axiosRapidApiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authHeaders = AUTH_HEADERS.rapidAPI;
  addHeaders(config, authHeaders);

  return config;
};

const axiosRequestErrorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

const axiosResponseInterceptor = (response: AxiosResponse) => {
  return response;
};

const axiosResponseErrorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

export {
  axiosFootballDataApiRequestInterceptor,
  axiosRapidApiRequestInterceptor,
  axiosRequestErrorHandler,
  axiosResponseInterceptor,
  axiosResponseErrorHandler,
};
