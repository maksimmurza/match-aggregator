import { getLeaguesStandings } from '@/actions/standings';
import { LeagueStandingsResponse } from '@/types/apiData';
import LeaguesStandingsTabs from '@/components/LeaguesTabsStandings';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function StandingsPage() {
	const leaguesStandingsResponse: Array<LeagueStandingsResponse> =
		await getLeaguesStandings();

	return (
		<div>
			<LeaguesStandingsTabs standings={leaguesStandingsResponse} />
		</div>
	);
}
