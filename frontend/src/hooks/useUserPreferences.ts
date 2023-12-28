import { FootballLeague, FootballLeaguesValues, FootballMatch } from '@/types/games';
import { createSelectedTeamsObject } from '@/utils/data';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

const useUserPreferences = (user: UserProfile | undefined, leagues: FootballLeague[]) => {
	const [selectedTeams, setSelectedTeams] = useState(() =>
		createSelectedTeamsObject(leagues),
	);

	const isGameShown = (game: FootballMatch): boolean => {
		const league = selectedTeams[game.leagueId];
		return league[game.homeTeam.id] || league[game.awayTeam.id];
	};

	const updateSelectedTeams = async (updatedPayload: FootballLeaguesValues) => {
		const response = await fetch('http://localhost:3000/api/user-preferences', {
			method: 'PUT',
			body: JSON.stringify(updatedPayload),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	useEffect(() => {
		const getUserPreferences = async () => {
			const response = await fetch('http://localhost:3000/api/user-preferences', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const userPreferences = await response.json();

			if (userPreferences?.selectedTeams) {
				setSelectedTeams(userPreferences?.selectedTeams);
			}
		};

		if (user) {
			getUserPreferences();
		}
	}, [user]);

	return {
		selectedTeams,
		setSelectedTeams,
		updateSelectedTeams,
		isGameShown,
	};
};

export default useUserPreferences;
