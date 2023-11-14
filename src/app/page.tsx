import GameCard from '@/components/GameCard';
import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballLeague, FootballMatch } from '@/types/games';
import { getFullSchedule } from '@/api/requests/gamesSchedule';
import { FootballMatchApi, LeagueScheduleApi, LeagueTeamsApi } from '@/api/types/types';
import { getLeaguesTeams } from '@/api/requests/teamsInfo';

export default async function Home() {
  const scheduleApi: Array<LeagueScheduleApi> = await getFullSchedule();
  // const leaguesTeamsApi: Array<LeagueTeamsApi> = await getLeaguesTeams();

  const schedule: Array<FootballMatch> = scheduleApi
    .reduce(
      (allMatches: Array<FootballMatchApi>, response) => [...allMatches, ...response.matches],
      []
    )
    .map(footballMatch => {
      return {
        id: footballMatch.id,
        leagueId: footballMatch.competition.id,
        leagueLogo: footballMatch.competition.emblem,
        utcDate: footballMatch.utcDate,
        status: footballMatch.status,
        homeTeam: {
          id: footballMatch.homeTeam.id,
          name: footballMatch.homeTeam.name,
          logo: footballMatch.homeTeam.crest,
        },
        awayTeam: {
          id: footballMatch.awayTeam.id,
          name: footballMatch.awayTeam.name,
          logo: footballMatch.awayTeam.crest,
        },
      };
    });

  // const leagues: Array<FootballLeague> = leaguesTeamsApi.map((response, index) => {
  //   return {
  //     id: response.competition.id,
  //     name: response.competition.name,
  //     logo: response.competition.emblem,
  //     teams: response.teams.map(team => {
  //       return {
  //         id: team.id,
  //         name: team.name,
  //         logo: team.crest,
  //       };
  //     }),
  //   };
  // });

  // console.log(schedule);

  return (
    <main className="flex justify-around gap-10 w-screen h-screen bg-gray-100 overflow-hidden">
      {schedule && (
        <ScrollableCardList className="m-4 h-[calc(100vh-2rem)]">
          {schedule.map((item: FootballMatch) => {
            return <GameCard key={item.id} {...item} className="border-b border-gray-300" />;
          })}
        </ScrollableCardList>
      )}
      <div>Leagues</div>
    </main>
  );
}
