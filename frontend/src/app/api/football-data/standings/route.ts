import { COMPETITION_STANDINGS } from '../../../../constants/endpoints';
import { LeagueCode, LeagueStandingsResponse } from '../../../../types/apiData';
import { API_TYPE_ERROR_MESSAGE } from '@/constants/errorMessages';
import { NextResponse } from 'next/server';
import api from '@/utils/api-providers';

const GET = async () => {
	const getLeagueStandings = async (
		leagueCode: LeagueCode,
	): Promise<LeagueStandingsResponse> => {
		const url = COMPETITION_STANDINGS(leagueCode);
		const response = await api.data.fetch(url, {
			next: { revalidate: 900 },
		});
		return response as unknown as LeagueStandingsResponse;
	};

	const standings = await Promise.all(
		Object.values(api.data.leagueCodes).map((leagueCode) =>
			getLeagueStandings(leagueCode),
		),
	);

	return NextResponse.json(standings);
};

export { GET };
