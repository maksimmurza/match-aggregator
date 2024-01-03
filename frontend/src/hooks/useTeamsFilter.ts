import { FootballLeague, FootballLeaguesValues, FootballTeam } from '@/types/games';
import { ReactSetState } from '@/types/utils';
import { useCallback } from 'react';

const useTeamsFilter = (
	selectedTeams: FootballLeaguesValues,
	setSelectedTeams: ReactSetState<FootballLeaguesValues>,
	updateSelectedTeams: (updatedPayload: FootballLeaguesValues) => void,
) => {
	const onChangeLeagueState = useCallback(
		(leagueId: FootballLeague['id'], newCheckboxState: boolean) => {
			setSelectedTeams((prevState: FootballLeaguesValues) => {
				let newState = { ...prevState };
				const teamsIds = Object.keys(newState[leagueId]);
				teamsIds.forEach((teamId) => {
					newState[leagueId][teamId] = newCheckboxState;
				});
				updateSelectedTeams(newState);
				return newState;
			});
		},
		[],
	);

	const onChangeTeamState = useCallback(
		(
			leagueId: FootballLeague['id'],
			teamId: FootballTeam['id'],
			newCheckboxState: boolean,
		) => {
			setSelectedTeams((prevState: FootballLeaguesValues) => {
				let newState = { ...prevState };
				newState[leagueId][teamId] = newCheckboxState;
				updateSelectedTeams(newState);
				return newState;
			});
		},
		[],
	);

	const getLeagueCheckboxState = (league: FootballLeague) => {
		const selectedTeamsNumber = Object.values(selectedTeams[league.id]).reduce(
			(acc, value) => acc + Number(value),
			0,
		);

		switch (selectedTeamsNumber) {
			case 0:
				return 'unchecked';
			case league.teams.length:
				return 'checked';
			default:
				return 'indeterminate';
		}
	};

	return {
		onChangeLeagueState,
		onChangeTeamState,
		getLeagueCheckboxState,
	};
};

export default useTeamsFilter;
