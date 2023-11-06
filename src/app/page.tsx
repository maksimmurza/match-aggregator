import GameCard from '@/components/GameCard';
import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballLeague, FootballMatch } from '@/types/games';
import { getFullSchedule } from '@/api/requests/gamesSchedule';
import { FootballMatchApi, LeagueScheduleApi, LeagueTeamsApi } from '@/api/types/types';
import { getLeaguesTeams } from '@/api/requests/teamsInfo';

export default async function Home() {
  const scheduleApi: Array<LeagueScheduleApi> = await getFullSchedule();
  const leaguesTeamsApi: Array<LeagueTeamsApi> = await getLeaguesTeams();

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
          id: footballMatch.homeTeam.id,
          name: footballMatch.homeTeam.name,
          logo: footballMatch.homeTeam.crest,
        },
      };
    });

  const leagues: Array<FootballLeague> = leaguesTeamsApi.map((response, index) => {
    return {
      id: response.competition.id,
      name: response.competition.name,
      logo: response.competition.emblem,
      teams: response.teams.map(team => {
        return {
          id: team.id,
          name: team.name,
          logo: team.crest,
        };
      }),
    };
  });

  return (
    <main /* className="flex min-h-screen flex-col items-center justify-between p-24" */>
      {schedule && (
        <ScrollableCardList>
          {schedule.map((item: FootballMatch) => {
            return <GameCard key={item.id} {...item} />;
          })}
        </ScrollableCardList>
      )}
    </main>
  );
}
