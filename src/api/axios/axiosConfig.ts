import axios, { AxiosRequestConfig } from 'axios';
import {
  axiosRequestInterceptor,
  axiosResponseInterceptor,
  axiosRequestErrorHandler,
  axiosResponseErrorHandler,
} from './axiosUtils';

const axiosConfig = {
  // we have two APIs, so we can't define baseURL
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(axiosRequestInterceptor, axiosRequestErrorHandler);
axiosInstance.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

export const axiosClient = {
  get: (url: string, config?: AxiosRequestConfig) => axiosInstance.get(url, config),
};
