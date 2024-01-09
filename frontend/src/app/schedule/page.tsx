import { getFullSchedule } from '@/actions/schedule';
import { getLeaguesTeams } from '@/actions/teamsInfo';
import { LeagueScheduleResponse, LeagueTeamsResponse } from '@/types/apiData';
import Schedule from '@/components/Schedule';
import { FootballMatch, FootballLeague } from '@/types/appData';
import resolveLeagues from '@/utils/resolveLeagues';
import resolveSchedule from '@/utils/resolveSchedule';

export const dynamic = 'force-dynamic';

export default async function SchedulePage() {
	const scheduleResponse: Array<LeagueScheduleResponse> = await getFullSchedule();
	const leaguesTeamsResponse: Array<LeagueTeamsResponse> = await getLeaguesTeams();

	const schedule: Array<FootballMatch> = resolveSchedule(scheduleResponse);
	const leagues: Array<FootballLeague> = resolveLeagues(leaguesTeamsResponse);

	return <Schedule schedule={schedule} leagues={leagues} />;
}
