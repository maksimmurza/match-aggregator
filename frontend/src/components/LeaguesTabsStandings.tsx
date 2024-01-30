import React, { FC, PropsWithChildren } from 'react';
import { FootballLeague, FootballTeam } from '@/types/appData';
import {
	FootballTeamApi,
	FootballTeamStandingApi,
	LeagueStandingsResponse,
} from '@/types/apiData';
import TabsPanel from '@/components/TabsPanel';

interface LeagueTabsProps {
	// leagues: Array<Omit<FootballLeague, 'teams'>>;
	standings: Array<LeagueStandingsResponse>;
}

const LeagueTabLabel: FC<PropsWithChildren<{ name: string; logo: string }>> = ({
	name,
	logo,
}) => {
	return (
		<div className="flex gap-3">
			<img width={30} src={logo} />
			<div>{name}</div>
		</div>
	);
};

const LeagueStandingsTabs: FC<PropsWithChildren<LeagueTabsProps>> = ({ standings }) => {
	const tabsData = standings.map((leagueStandings) => {
		const tabLabelProps = {
			name: leagueStandings.competition.name,
			logo: leagueStandings.competition.emblem,
		};

		const TABLE_HEAD = ['№', 'Team', 'Games', 'Won', 'Draw', 'Lost', 'Points'];

		return {
			tabLabel: <LeagueTabLabel {...tabLabelProps} />,
			tabValue: leagueStandings.competition.id.toString(),
			tabContent: (
				<div className="grow">
					<table className="w-full min-w-max table-auto text-left">
						<thead>
							<tr>
								{TABLE_HEAD.map((column) => {
									return (
										<th
											key={column}
											className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
										>
											{column}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{leagueStandings.standings[0].table.map(
								({
									position,
									team,
									playedGames,
									won,
									draw,
									lost,
									points,
								}: FootballTeamStandingApi) => {
									return (
										<tr
											key={`column-${team.id}`}
											className="even:bg-blue-gray-50/50 [&>td]:p-4"
										>
											<td>{position}</td>
											<td className="flex gap-4">
												<img width={30} src={team.crest} alt={team.name} />
												<div>{team.name}</div>
											</td>
											<td>{playedGames}</td>
											<td>{won}</td>
											<td>{draw}</td>
											<td>{lost}</td>
											<td>{points}</td>
										</tr>
									);
								},
							)}
						</tbody>
					</table>
				</div>
			),
		};
	});

	return <TabsPanel data={tabsData} />;
};

export default LeagueStandingsTabs;
