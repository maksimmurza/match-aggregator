import api from '.';
import ApiProvider from './ApiProvider';

class GoogleCalendarApiProvider extends ApiProvider {
	headers = {
		'Content-Type': 'application/json',
	};

	constructor() {
		super(process.env.REACT_APP_GOOGLE_CALENDAR_BASE_URL || '');
	}

	// change url var name
	async resolveGoogleIdentityProviderToken(userId: string) {
		await api.auth0.resolveManagementApiToken();

		const userData = (await api.auth0.fetch(`/api/v2/users/${userId}`)) as unknown as {
			identities: Array<{ provider: string; access_token: string }>;
		};

		const token = userData.identities.find(
			(identity) => identity.provider === 'google-oauth2',
		)?.access_token;

		if (token) {
			this.setAuthorization(token);
		} else {
			console.log('NO GOOGLE TOKEN');
		}

		return token;
	}
}

export default GoogleCalendarApiProvider;
