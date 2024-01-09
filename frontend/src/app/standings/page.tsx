import { getLeaguesStandings } from '@/api/requests/standings';
import { LeagueStandingsResponse } from '@/api/types/types';
import LeaguesStandingsTabs from '@/components/LeaguesTabsStandings';
import React from 'react';

export default async function StandingsPage() {
	const leaguesStandingsResponse: Array<LeagueStandingsResponse> =
		await getLeaguesStandings();

	return (
		<div>
			<LeaguesStandingsTabs standings={leaguesStandingsResponse} />
		</div>
	);
}
