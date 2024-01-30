import { useCallback, useEffect, useState } from 'react';
import { FootballLeague, FootballLeaguesValues, FootballMatch } from '@/types/appData';
import { createSelectedTeamsObject } from '@/lib/utils/data';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { UserPreferences } from '@/types/apiData';

const useUserPreferences = (user: UserProfile | undefined, leagues: FootballLeague[]) => {
	const [userPreferences, setUserPreferences] = useState<{
		selectedTeams: FootballLeaguesValues;
		googleCalendarId: string | undefined;
	}>(() => ({
		selectedTeams: createSelectedTeamsObject(leagues),
		googleCalendarId: undefined,
	}));

	const setSelectedTeams = (payload: FootballLeaguesValues) => {
		setUserPreferences((prev) => ({ ...prev, selectedTeams: payload }));
	};

	const setGoogleCalendarId = (payload: { googleCalendarId: string }) => {
		setUserPreferences((prev) => ({
			...prev,
			googleCalendarId: payload.googleCalendarId,
		}));
	};

	const isGameVisible = (game: FootballMatch): boolean => {
		const league = userPreferences.selectedTeams[game.leagueId];
		return league[game.homeTeam.id] || league[game.awayTeam.id];
	};

	const updateSelectedTeams = async (payload: FootballLeaguesValues) => {
		const response = await fetch('/api/user-preferences/selected-teams', {
			method: 'PUT',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	const updateGoogleCalendarId = async (payload: { googleCalendarId: string }) => {
		const response = await fetch('/api/user-preferences/google-calendar-id', {
			method: 'PUT',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return data;
	};

	useEffect(() => {
		if (user) {
			const getUserPreferences = async () => {
				const response = await fetch('/api/user-preferences', {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const userPreferences = await response.json();

				if (userPreferences) {
					setUserPreferences((prev) => ({
						selectedTeams: userPreferences.selectedTeams ?? prev.selectedTeams,
						googleCalendarId: userPreferences.googleCalendarId ?? prev.googleCalendarId,
					}));
				}

				return userPreferences;
			};

			getUserPreferences().then((userPreferences) => {
				if (userPreferences.googleCalendarId !== undefined) {
					const resolveCalendarId = async () => {
						const response = await fetch(
							`/api/google-calendar?userId=${user?.sub}&googleCalendarId=${userPreferences.googleCalendarId}`,
						);

						const { targetCalendarId } = await response.json();

						if (!targetCalendarId) return;

						if (targetCalendarId !== userPreferences.googleCalendarId) {
							updateGoogleCalendarId({ googleCalendarId: targetCalendarId });
							setGoogleCalendarId({ googleCalendarId: targetCalendarId });
						}
					};

					resolveCalendarId();
				}
			});
		}
	}, [user]);

	return {
		userPreferences,
		setSelectedTeams,
		setGoogleCalendarId,
		updateSelectedTeams,
		isGameVisible,
	};
};

export default useUserPreferences;
