'use client';

import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballLeague, FootballMatch } from '@/types/games';
import React, { FC, PropsWithChildren, useState } from 'react';
import GameCard from './GameCard';
import LeaguesTabs from './LeaguesTabs';
import { onTTFB } from 'web-vitals';

interface MainScreenProps {
  schedule: Array<FootballMatch>;
  leagues: Array<FootballLeague>;
}

const MainScreen: FC<PropsWithChildren<MainScreenProps>> = ({ schedule, leagues }) => {
  onTTFB(console.log);
  const initialSelectedTeams = {} as any;
  leagues.forEach(league => {
    const teamsObject = {} as any;
    league.teams.forEach(team => {
      teamsObject[team.id] = true;
    });
    initialSelectedTeams[league.id] = teamsObject;
  });

  const [selectedTeams, setSelectedTeams] = useState(initialSelectedTeams);

  console.log(selectedTeams);

  const isGameSelected = (game: FootballMatch): boolean => {
    const leagueId = game.leagueId;
    return selectedTeams[leagueId][game.homeTeam.id] || selectedTeams[leagueId][game.awayTeam.id];
  };

  return (
    <div className="flex justify-around gap-10 w-screen h-screen bg-gray-100 overflow-hidden">
      {schedule && (
        <ScrollableCardList className="m-4 h-[calc(100vh-2rem)]">
          {schedule.filter(isGameSelected).map((item: FootballMatch) => {
            return <GameCard key={item.id} {...item} className="border-b border-gray-300" />;
          })}
        </ScrollableCardList>
      )}
      <LeaguesTabs
        leagues={leagues}
        selectedTeams={selectedTeams}
        setSelectedTeams={setSelectedTeams}
      />
    </div>
  );
};

export default MainScreen;
