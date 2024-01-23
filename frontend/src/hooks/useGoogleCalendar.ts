import { resolveCalendar } from '@/actions/google-calendar';
import { FootballMatch } from '@/types/appData';
import { useEffect, useState } from 'react';

interface UserCalendarData {
	userId?: string | null;
	googleCalendarId?: string | null;
	updateGoogleCalendarId: (payload: { googleCalendarId: string }) => Promise<any>;
}

const useGoogleCalendar = ({
	userId,
	googleCalendarId,
	updateGoogleCalendarId,
}: UserCalendarData) => {
	// google identity provider token
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

		return token;
	};

	const addGameToCalendar = async (game: FootballMatch, calendarId: string) => {
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
					'summary': `${homeTeam.name} - ${awayTeam.name}`,
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
		const resolveCalendarId = async () => {
			if (!userId) return;

			const googleToken = await getGoogleIdpToken(userId);

			if (!googleToken) return;

			setGoogleIdpToken(googleToken);
			const targetCalendarId = await resolveCalendar(googleToken, googleCalendarId);

			if (!targetCalendarId) return;

			setTargetCalendarId(targetCalendarId);

			if (targetCalendarId !== googleCalendarId) {
				updateGoogleCalendarId({ googleCalendarId: targetCalendarId });
			}
		};

		resolveCalendarId();
	}, [userId]);

	return {
		googleIdpToken,
		targetCalendarId,
		getGoogleIdpToken,
		addGameToCalendar,
	};
};

export default useGoogleCalendar;
