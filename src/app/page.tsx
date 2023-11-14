import GameCard from '@/components/GameCard';
import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballLeague, FootballMatch } from '@/types/games';
import { getFullSchedule } from '@/api/requests/gamesSchedule';
import { FootballMatchApi, LeagueScheduleResponse, LeagueTeamsResponse } from '@/api/types/types';
import { getLeaguesTeams } from '@/api/requests/teamsInfo';
import LeaguesTabs from '@/components/LeaguesTabs';
import resolveSchedule from '@/utils/resolveSchedule';
import resolveLeagues from '@/utils/resolveLeagues';

export default async function Home() {
  const scheduleResponse: Array<LeagueScheduleResponse> = await getFullSchedule();
  const leaguesTeamsResponse: Array<LeagueTeamsResponse> = await getLeaguesTeams();

  const schedule: Array<FootballMatch> = resolveSchedule(scheduleResponse);
  const leagues: Array<FootballLeague> = resolveLeagues(leaguesTeamsResponse);

  return (
    <main className="flex justify-around gap-10 w-screen h-screen bg-gray-100 overflow-hidden">
      {schedule && (
        <ScrollableCardList className="m-4 h-[calc(100vh-2rem)]">
          {schedule.map((item: FootballMatch) => {
            return <GameCard key={item.id} {...item} className="border-b border-gray-300" />;
          })}
        </ScrollableCardList>
      )}
      <LeaguesTabs leagues={leagues} />
    </main>
  );
}
