import GameCard from '@/components/GameCard';
import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballLeague, FootballMatch } from '@/types/games';
import { getFullSchedule, getLeagueSchedule } from '@/api/requests/gamesSchedule';
import { FootballMatchApi, LeagueScheduleApi } from '@/api/types/types';
import { LEAGUES_CODES } from '@/api/constants/requestOptions';
import { useState } from 'react';
import { getCurrentLeagues } from '@/api/requests/leaguesInfo';
import { getTeamsInfo } from '@/api/requests/teamsInfo';

export default async function Home() {
  const scheduleArray: Array<LeagueScheduleApi> = await getFullSchedule();

  const leaguesNames = scheduleArray.map(({ competition: { name } }) =>
    name === 'Primera Division' ? 'La Liga' : name
  );

  const locationRegexp = new RegExp(`World|Europe|England|Spain`);

  const scheduleApi: Array<FootballMatchApi> = scheduleArray.reduce(
    (allMatches: Array<FootballMatchApi>, response) => [...allMatches, ...response.matches],
    []
  );

  const leaguesApi = (await getCurrentLeagues()).leagues.filter(league => {
    const currentYear = new Date().getFullYear();
    return (
      league.season === currentYear &&
      leaguesNames.includes(league.name) &&
      league.country.match(locationRegexp)
    );
  });

  const leaguesTeamsApi = await Promise.all(
    leaguesApi.map(response => response.league_id).map(leagueId => getTeamsInfo(leagueId))
  );

  const leagues: Array<FootballLeague> = leaguesApi.map((response, index) => {
    return {
      id: response.league_id,
      name: response.name,
      logo: response.logo,
      teams: leaguesTeamsApi[index].teams.map(team => {
        return {
          id: team.team_id,
          name: team.name,
          logo: team.logo,
        };
      }),
    };
  });

  // const matches: Array<FootballMatch> = scheduleApi.map(response => {
  //   return {
  //     id: response.id,
  //     leagueId: null,
  //     utcDate: response.utcDate,
  //     status: response.status,
  //     homeTeam: response.homeTeam,
  //     awayTeam: response.awayTeam,
  //   };
  // });

  console.log(scheduleApi);

  return (
    <main /* className="flex min-h-screen flex-col items-center justify-between p-24" */>
      {scheduleApi && (
        <ScrollableCardList>
          {scheduleApi.map((item: FootballMatchApi) => {
            return <GameCard key={item.id} {...item} />;
          })}
        </ScrollableCardList>
      )}
    </main>
  );
}
