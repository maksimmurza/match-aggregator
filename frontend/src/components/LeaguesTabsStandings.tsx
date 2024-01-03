import React, { FC, PropsWithChildren } from 'react';
import { FootballLeague } from '@/types/games';
import { LeagueStandingsResponse } from '@/api/types/types';
import TabsPanel from '@/layouts/TabsPanel';

interface LeagueTabsProps {
	// leagues: Array<Omit<FootballLeague, 'teams'>>;
	standings: Array<LeagueStandingsResponse>;
}

const LeagueStandingsTabs: FC<PropsWithChildren<LeagueTabsProps>> = ({ standings }) => {
	const tabsData = standings.map((leagueStandings) => {
		return {
			tabLabel: <div>{leagueStandings.competition.name}</div>,
			tabValue: leagueStandings.competition.id.toString(),
			tabContent: (
				<div>
					{leagueStandings.standings[0].table.map(({ team }: any) => {
						return <div>{team.name}</div>;
					})}
				</div>
			),
		};
	});

	return <TabsPanel data={tabsData} />;
};

export default LeagueStandingsTabs;
