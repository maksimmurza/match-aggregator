import { COMPETITION_TEAMS } from '../../../../constants/endpoints';
import { NextResponse } from 'next/server';
import api from '@/lib/api-providers';
import { LeagueCode, LeagueTeamsResponse } from '@/types/apiData';

const GET = async () => {
	const getLeagueTeams = async (leagueCode: LeagueCode): Promise<LeagueTeamsResponse> => {
		const url = COMPETITION_TEAMS(leagueCode);
		const response = await api.data.fetch(url, {
			next: { revalidate: 86400 },
		});
		return response as unknown as LeagueTeamsResponse;
	};

	const teams = await Promise.all(
		Object.values(api.data.leagueCodes).map((leagueCode) => getLeagueTeams(leagueCode)),
	);

	return NextResponse.json(teams);
};

export { GET };
