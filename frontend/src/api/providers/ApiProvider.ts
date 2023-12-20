import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_ERROR_MESSAGE, API_TYPE_ERROR_MESSAGE } from '../constants/errorMessages';

abstract class ApiProvider {
	instance: AxiosInstance;

	errorMessages = {
		API_ERROR_MESSAGE,
		API_TYPE_ERROR_MESSAGE,
	};

	constructor(baseURL: string) {
		this.instance = axios.create({
			baseURL,
			responseType: 'json',
		});

		this.initRequestInterceptors();
		this.initResponseInterceptors();
	}

	defaultErrorHandler(error: AxiosError) {
		return Promise.reject(error);
	}

	abstract initRequestInterceptors(): void;

	abstract initResponseInterceptors(): void;
}

export default ApiProvider;
