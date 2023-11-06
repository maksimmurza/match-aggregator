import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AUTH_HEADERS } from '../constants/requestOptions';

const axiosRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  Object.keys(AUTH_HEADERS).forEach(headerKey => {
    config.headers.set(headerKey, AUTH_HEADERS[headerKey as keyof typeof AUTH_HEADERS]);
  });

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
  axiosRequestInterceptor,
  axiosRequestErrorHandler,
  axiosResponseInterceptor,
  axiosResponseErrorHandler,
};
