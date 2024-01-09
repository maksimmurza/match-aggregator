import { FootballLeague, FootballLeaguesValues } from '@/types/appData';
import React, { FC, PropsWithChildren } from 'react';
import TabsPanel from '@/layouts/TabsPanel';
import LeagueCheckbox from './LeagueCheckbox';
import TeamCheckbox from './TeamCheckbox';
import { ReactSetState } from '@/types/utils';
import useTeamsFilter from '@/hooks/useTeamsFilter';

interface LeagueTabsProps {
	leagues: Array<FootballLeague>;
	selectedTeams: FootballLeaguesValues;
	setSelectedTeams: ReactSetState<FootballLeaguesValues>;
	updateSelectedTeams: (updatedPayload: FootballLeaguesValues) => void;
}

const LeaguesTabsSchedule: FC<PropsWithChildren<LeagueTabsProps>> = ({
	leagues,
	selectedTeams,
	setSelectedTeams,
	updateSelectedTeams,
}) => {
	const { onChangeLeagueState, onChangeTeamState, getLeagueCheckboxState } =
		useTeamsFilter(selectedTeams, setSelectedTeams, updateSelectedTeams);

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

export default LeaguesTabsSchedule;
