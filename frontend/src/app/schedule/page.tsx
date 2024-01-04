import { getFullSchedule } from '@/api/requests/schedule';
import { getLeaguesTeams } from '@/api/requests/teamsInfo';
import { LeagueScheduleResponse, LeagueTeamsResponse } from '@/api/types/types';
import Schedule from '@/components/Schedule';
import { FootballMatch, FootballLeague } from '@/types/games';
import resolveLeagues from '@/utils/resolveLeagues';
import resolveSchedule from '@/utils/resolveSchedule';

export const dynamic = 'force-dynamic';
export const revalidate = 900;

export default async function SchedulePage() {
	const scheduleResponse: Array<LeagueScheduleResponse> = await getFullSchedule();
	const leaguesTeamsResponse: Array<LeagueTeamsResponse> = await getLeaguesTeams();

	const schedule: Array<FootballMatch> = resolveSchedule(scheduleResponse);
	const leagues: Array<FootballLeague> = resolveLeagues(leaguesTeamsResponse);

	return <Schedule schedule={schedule} leagues={leagues} />;
}
