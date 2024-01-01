import GameCard from '@/components/GameCard';
import ScrollableCardList from '@/layouts/ScrollableCardList';
import { FootballLeague, FootballMatch } from '@/types/games';
import { getFullSchedule } from '@/api/requests/gamesSchedule';
import {
	FootballMatchApi,
	LeagueScheduleResponse,
	LeagueTeamsResponse,
} from '@/api/types/types';
import { getLeaguesTeams } from '@/api/requests/teamsInfo';
import LeaguesTabs from '@/components/LeaguesTabs';
import resolveSchedule from '@/utils/resolveSchedule';
import resolveLeagues from '@/utils/resolveLeagues';
import MainScreen from '@/components/MainScreen';

export default async function Home() {
	const scheduleResponse: Array<LeagueScheduleResponse> = await getFullSchedule();
	const leaguesTeamsResponse: Array<LeagueTeamsResponse> = await getLeaguesTeams();

	const schedule: Array<FootballMatch> = resolveSchedule(scheduleResponse);
	const leagues: Array<FootballLeague> = resolveLeagues(leaguesTeamsResponse);

	return <MainScreen schedule={schedule} leagues={leagues} />;
}
