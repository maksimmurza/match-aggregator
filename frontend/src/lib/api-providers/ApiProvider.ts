import { API_ERROR_MESSAGE } from '@/constants/errorMessages';

abstract class ApiProvider {
	baseUrl: string;
	headers: Record<string, string> | undefined;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async fetch(
		url: string,
		options?: RequestInit | undefined,
	): Promise<Record<string, string> | void> {
		try {
			const fetchInit = { headers: this.headers, ...options };
			const response = await fetch(this.baseUrl + url, fetchInit);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	setHeader(header: string, value: string): void {
		this.headers = { ...this.headers, [header]: value };
	}

	setAuthorization(token: string): void {
		this.setHeader('Authorization', `Bearer ${token}`);
	}
}

export default ApiProvider;
