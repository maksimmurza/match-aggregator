import { FootballLeague, FootballTeam } from '@/types/games';
import React, { FC, PropsWithChildren } from 'react';
import TabsPanel from '@/layouts/TabsPanel';
import LeagueCheckbox from './LeagueCheckbox';
import TeamCheckbox from './TeamCheckbox';

interface LeagueTabsProps {
  leagues: Array<FootballLeague>;
}

const LeaguesTabs: FC<PropsWithChildren<LeagueTabsProps>> = ({ leagues }) => {
  const onChangeLeagueState = (leagueId: FootballLeague['id'], newState: boolean) => {
    console.log('change ' + leagueId);
  };

  const onChangeTeamState = (teamId: FootballTeam['id'], newState: boolean) => {
    console.log('change ' + teamId);
  };

  const tabsData = leagues.map(league => {
    return {
      tabLabel: <LeagueCheckbox league={league} checked={false} onChange={onChangeLeagueState} />,
      tabValue: league.name,
      tabContent: (
        <div className="flex flex-col gam-1">
          {league.teams.map(team => {
            return (
              <TeamCheckbox
                key={team.id}
                team={team}
                checked={false}
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
