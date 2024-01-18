import { getCalendar } from '@/actions/google-calendar';
import { FootballMatch } from '@/types/appData';
import { useEffect, useState } from 'react';

const useGoogleCalendar = (userId?: string | null) => {
	const [googleIdpToken, setGoogleIdpToken] = useState();
	const [targetCalendarId, setTargetCalendarId] = useState<string>();

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

	const addGameToCalendar = async (game: FootballMatch, calendarId: string) => {
		console.log('sdfghjkl');
		const { homeTeam, awayTeam, utcDate } = game;
		const response = await fetch(
			`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${googleIdpToken}`,
				},
				body: JSON.stringify({
					'description': `${homeTeam.name} - ${awayTeam.name}`,
					'start': {
						'dateTime': utcDate,
					},
					'end': {
						'dateTime': utcDate,
					},
				}),
			},
		);

		const responseData = await response.json();

		console.log(responseData);
	};

	useEffect(() => {
		if (userId) {
			getGoogleIdpToken(userId).then(() => {
				if (googleIdpToken) {
					getCalendar(googleIdpToken).then((targetCalendarId) => {
						if (targetCalendarId) {
							setTargetCalendarId(targetCalendarId);
						}
					});
				}
			});
		}
	}, [userId, googleIdpToken]);

	return {
		googleIdpToken,
		targetCalendarId,
		getGoogleIdpToken,
		addGameToCalendar,
	};
};

export default useGoogleCalendar;
