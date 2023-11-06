import { AxiosInstance } from 'axios';
import { axiosClient } from './axios/axiosConfig';

interface ApiProvider<T> {
  footballDataApi: T;
  rapidApi: T;
}

const apiProvider: ApiProvider<AxiosInstance> = axiosClient;

export default apiProvider;
