import { LeagueScheduleResponse, LeagueTeamsResponse } from '@/types/apiData';
import Schedule from '@/components/Schedule';
import { FootballMatch, FootballLeague } from '@/types/appData';
import resolveLeagues from '@/lib/utils/resolveLeagues';
import resolveSchedule from '@/lib/utils/resolveSchedule';

export const dynamic = 'force-dynamic';

export default async function SchedulePage() {
	// rename var
	const scheduleResponse: Array<LeagueScheduleResponse> = await fetch(
		process.env.AUTH0_BASE_URL + '/api/football-data/schedule',
	).then((response) => response.json());

	const leaguesTeamsResponse: Array<LeagueTeamsResponse> = await fetch(
		process.env.AUTH0_BASE_URL + '/api/football-data/teams',
	).then((response) => response.json());

	const schedule: Array<FootballMatch> = resolveSchedule(scheduleResponse);
	const leagues: Array<FootballLeague> = resolveLeagues(leaguesTeamsResponse);

	return <Schedule schedule={schedule} leagues={leagues} />;
}
