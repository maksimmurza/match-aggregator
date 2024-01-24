import ApiProvider from './ApiProvider';

class Auth0ApiProvider extends ApiProvider {
	headers = {
		'Content-Type': 'application/json',
	};

	constructor() {
		super(process.env.AUTH0_ISSUER_BASE_URL || '');
	}

	async resolveManagementApiToken(): Promise<void> {
		const managementApiData = await this.fetch('/oauth/token', {
			method: 'POST',
			cache: 'no-store',
			body: JSON.stringify({
				client_id: process.env.AUTH0_CLIENT_ID,
				client_secret: process.env.AUTH0_CLIENT_SECRET,
				audience: this.baseUrl + '/api/v2/',
				grant_type: 'client_credentials',
			}),
		});

		if (managementApiData) {
			this.setAuthorization(managementApiData.access_token);
		}
	}
}

export default Auth0ApiProvider;
