import axios, { AxiosRequestConfig } from 'axios';
import {
  axiosRequestInterceptor,
  axiosResponseInterceptor,
  axiosRequestErrorHandler,
  axiosResponseErrorHandler,
} from './axiosUtils';
import { BASE_URLS } from '../../constants/requestOptions';

const axiosConfig = {
  baseURL: BASE_URLS,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(axiosRequestInterceptor, axiosRequestErrorHandler);
axiosInstance.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

export default axiosInstance;
