import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import ApiProvider from './ApiProvider';

class DataApiProvider extends ApiProvider {
	constructor() {
		const url = process.env.REACT_APP_DATA_BASE_URL;
		if (url) {
			super(url);
		} else {
			throw new Error('Provide env variable for Data API base URL!');
		}
	}

	initRequestInterceptors(): void {
		this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			config.headers.set('X-Auth-Token', process.env.REACT_APP_footballDataToken);
			return config;
		}, this.defaultErrorHandler);
	}

	initResponseInterceptors(): void {
		this.instance.interceptors.response.use((response: AxiosResponse) => {
			return response.data;
		}, this.defaultErrorHandler);
	}
}

export default DataApiProvider;
