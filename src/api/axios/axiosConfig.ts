import axios, { AxiosRequestConfig } from 'axios';
import {
  axiosRequestInterceptor,
  axiosResponseInterceptor,
  axiosRequestErrorHandler,
  axiosResponseErrorHandler,
} from './axiosUtils';

const axiosConfig = {};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(axiosRequestInterceptor, axiosRequestErrorHandler);
axiosInstance.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

export const axiosClient = {
  get: (url: string, config?: AxiosRequestConfig) => axiosInstance.get(url, config),
};
