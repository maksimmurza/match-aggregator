import { FootballLeague, FootballTeam } from '@/types/games';
import React, { FC, PropsWithChildren } from 'react';
import TabsPanel from '@/layouts/TabsPanel';
import LeagueCheckbox from './LeagueCheckbox';
import TeamCheckbox from './TeamCheckbox';

interface LeagueTabsProps {
  leagues: Array<FootballLeague>;
  selectedTeams: Record<number | string, Record<number | string, boolean>>;
  setSelectedTeams: any;
}

const LeaguesTabs: FC<PropsWithChildren<LeagueTabsProps>> = ({
  leagues,
  selectedTeams,
  setSelectedTeams,
}) => {
  const onChangeLeagueState = (leagueId: FootballLeague['id'], newCheckboxState: boolean) => {
    setSelectedTeams((prevState: Record<number | string, Record<number | string, boolean>>) => {
      let newState = { ...prevState };
      const teamsIds = Object.keys(newState[leagueId]);
      teamsIds.forEach(teamId => {
        newState[leagueId][teamId] = newCheckboxState;
      });
      return newState;
    });
  };

  const onChangeTeamState = (
    leagueId: FootballLeague['id'],
    teamId: FootballTeam['id'],
    newCheckboxState: boolean
  ) => {
    setSelectedTeams((prevState: Record<number | string, Record<number | string, boolean>>) => {
      let newState = { ...prevState };
      newState[leagueId][teamId] = newCheckboxState as any;
      return newState;
    });
  };

  const getLeagueCheckboxState = (league: FootballLeague) => {
    const selectedTeamsNumber = Object.values(selectedTeams[league.id]).reduce(
      (acc, value) => acc + Number(value),
      0
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

  const tabsData = leagues.map(league => {
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
        <div className="flex flex-col gam-1">
          {league.teams.map(team => {
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
