import axios, { AxiosRequestConfig } from 'axios';
import {
  axiosFootballDataApiRequestInterceptor,
  axiosRapidApiRequestInterceptor,
  axiosResponseInterceptor,
  axiosRequestErrorHandler,
  axiosResponseErrorHandler,
} from './axiosUtils';
import { BASE_URLS } from '../constants/requestOptions';

const axiosFootballDataApiConfig = {
  baseURL: BASE_URLS.footballDataApi,
};

const axiosRapidApiConfig = {
  baseURL: BASE_URLS.rapidAPI,
};

const axiosFootballDataApiInstance = axios.create(axiosFootballDataApiConfig);
const axiosRapidApiInstance = axios.create(axiosRapidApiConfig);

axiosFootballDataApiInstance.interceptors.request.use(
  axiosFootballDataApiRequestInterceptor,
  axiosRequestErrorHandler
);
axiosFootballDataApiInstance.interceptors.response.use(
  axiosResponseInterceptor,
  axiosResponseErrorHandler
);

axiosRapidApiInstance.interceptors.request.use(
  axiosRapidApiRequestInterceptor,
  axiosRequestErrorHandler
);
axiosRapidApiInstance.interceptors.response.use(
  axiosResponseInterceptor,
  axiosResponseErrorHandler
);

export const axiosClient = {
  footballDataApi: axiosFootballDataApiInstance,
  rapidApi: axiosRapidApiInstance,
};
