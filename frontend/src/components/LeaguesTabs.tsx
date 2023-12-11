import { FootballLeague, FootballLeaguesValues, FootballTeam } from '@/types/games';
import React, { FC, PropsWithChildren, SetStateAction, useCallback } from 'react';
import TabsPanel from '@/layouts/TabsPanel';
import LeagueCheckbox from './LeagueCheckbox';
import TeamCheckbox from './TeamCheckbox';
import { ReactSetState } from '@/types/utils';

interface LeagueTabsProps {
	leagues: Array<FootballLeague>;
	selectedTeams: FootballLeaguesValues;
	setSelectedTeams: ReactSetState<FootballLeaguesValues>;
}

const LeaguesTabs: FC<PropsWithChildren<LeagueTabsProps>> = ({
	leagues,
	selectedTeams,
	setSelectedTeams,
}) => {
	const onChangeLeagueState = useCallback(
		(leagueId: FootballLeague['id'], newCheckboxState: boolean) => {
			setSelectedTeams((prevState: FootballLeaguesValues) => {
				let newState = { ...prevState };
				const teamsIds = Object.keys(newState[leagueId]);
				teamsIds.forEach((teamId) => {
					newState[leagueId][teamId] = newCheckboxState;
				});
				return newState;
			});
		},
		[],
	);

	const onChangeTeamState = useCallback(
		(leagueId: FootballLeague['id'], teamId: FootballTeam['id'], newCheckboxState: boolean) => {
			setSelectedTeams((prevState: FootballLeaguesValues) => {
				let newState = { ...prevState };
				newState[leagueId][teamId] = newCheckboxState;
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

	const tabsData = leagues.map((league) => {
		return {
			tabLabel: (
				<LeagueCheckbox
					league={league}
					state={getLeagueCheckboxState(league)}
					onChange={onChangeLeagueState}
				/>
			),
			tabValue: league.name,
			tabContent: (
				<div className="flex flex-col">
					{league.teams.map((team) => {
						return (
							<TeamCheckbox
								key={team.id}
								team={team}
								checked={selectedTeams[league.id][team.id]}
								onChange={onChangeTeamState}
							/>
						);
					})}
				</div>
			),
		};
	});

	return <TabsPanel data={tabsData} />;
};

export default LeaguesTabs;
