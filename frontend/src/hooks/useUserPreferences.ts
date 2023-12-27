import { UserPreferences } from '@/api/types/types';
import {
	FootballLeague,
	FootballLeaguesValues,
	FootballMatch,
	FootballTeamsValues,
} from '@/types/games';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

const createSelectedTeamsObject = (leagues: Array<FootballLeague>) => {
	const initialSelectedTeams: FootballLeaguesValues = {};
	leagues.forEach((league) => {
		const teamsObject: FootballTeamsValues = {};
		league.teams.forEach((team) => {
			teamsObject[team.id] = true;
		});
		initialSelectedTeams[league.id] = teamsObject;
	});
	return initialSelectedTeams;
};

const useUserPreferences = (user: UserProfile | undefined, leagues: FootballLeague[]) => {
	const [pref, setPref] = useState<UserPreferences>();
	const [selectedTeams, setSelectedTeams] = useState(() =>
		createSelectedTeamsObject(leagues),
	);

	useEffect(() => {
		const getUserPreferences = async () => {
			const response = await fetch('http://localhost:3000/api/user-preferences', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const userPreferences = await response.json();

			if (userPreferences) {
				setPref(userPreferences);

				console.log(userPreferences);

				setSelectedTeams((prev) => {
					const newState = { ...prev };
					Object.keys(newState).forEach((league) => {
						Object.keys(newState[league]).forEach((team) => {
							newState[league][team] = !userPreferences.unselectedTeams.includes(team);
						});
					});

					return newState;
				});
			}
		};

		if (user) {
			getUserPreferences();
		}
	}, [user]);

	const isGameSelected = (game: FootballMatch): boolean => {
		const leagueId = game.leagueId;
		return (
			selectedTeams[leagueId][game.homeTeam.id] ||
			selectedTeams[leagueId][game.awayTeam.id]
		);
	};

	return {
		selectedTeams,
		setSelectedTeams,
		isGameSelected,
	};
};

export default useUserPreferences;
