import { getCalendar } from '@/actions/google-calendar';
import { useEffect, useState } from 'react';

const useGoogleCalendar = (userId?: string | null) => {
	const [googleIdpToken, setGoogleIdpToken] = useState();

	const getGoogleIdpToken = async (userId: string) => {
		const response = await fetch(
			`http://localhost:3000/api/user-data/?userId=${userId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		const data = await response.json();
		const token = data.identities.find(
			(identity: { provider: string; access_token: string; user_id: string }) =>
				identity.provider === 'google-oauth2',
		).access_token;

		setGoogleIdpToken(token);
	};

	useEffect(() => {
		if (userId) {
			getGoogleIdpToken(userId).then(() => {
				if (googleIdpToken) {
					getCalendar(googleIdpToken);
				}
			});
		}
	}, [userId, googleIdpToken]);

	return {
		getGoogleIdpToken,
		googleIdpToken,
	};
};

export default useGoogleCalendar;
