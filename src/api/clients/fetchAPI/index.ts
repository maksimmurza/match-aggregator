import { API_ERROR_MESSAGE } from '@/api/constants/errorMessages';
import { AUTH_HEADERS, BASE_URLS } from '../../constants/requestOptions';
import { error } from 'console';

const request = async (url: string, options: RequestInit) => {
  const apiResponse = await fetch(BASE_URLS + url, { ...options, headers: AUTH_HEADERS });
  const response = await apiResponse.json();

  if (response.errorCode) {
    throw new Error(`${API_ERROR_MESSAGE} ${(error as unknown as { message: string }).message}`);
  }

  return response;
};

export const fetchApiClient = {
  get: (url: string, options?: RequestInit) => request(url, { ...options, method: 'GET' }),
  post: (url: string, options?: RequestInit) => request(url, { ...options, method: 'POST' }),
  put: (url: string, options?: RequestInit) => request(url, { ...options, method: 'PUT' }),
};

export default fetchApiClient;
