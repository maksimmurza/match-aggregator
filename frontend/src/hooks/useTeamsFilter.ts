import { FootballLeague, FootballLeaguesValues, FootballTeam } from '@/types/appData';
import { ReactSetState } from '@/types/utils';
import { useCallback } from 'react';

const useTeamsFilter = (
	selectedTeams: FootballLeaguesValues,
	setSelectedTeams: (payload: FootballLeaguesValues) => void,
	updateSelectedTeams: (updatedPayload: FootballLeaguesValues) => void,
) => {
	const onChangeLeagueState = useCallback(
		(leagueId: FootballLeague['id'], newCheckboxState: boolean) => {
			let newState = { ...selectedTeams };
			const teamsIds = Object.keys(newState[leagueId]);
			teamsIds.forEach((teamId) => {
				newState[leagueId][teamId] = newCheckboxState;
			});
			setSelectedTeams(newState);
			updateSelectedTeams(newState);
			return newState;
		},
		[],
	);

	const onChangeTeamState = useCallback(
		(
			leagueId: FootballLeague['id'],
			teamId: FootballTeam['id'],
			newCheckboxState: boolean,
		) => {
			let newState = { ...selectedTeams };
			newState[leagueId][teamId] = newCheckboxState;
			setSelectedTeams(newState);
			updateSelectedTeams(newState);
			return newState;
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
