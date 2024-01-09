'use server';

import { cache } from 'react';
import { COMPETITION_TEAMS } from '../constants/endpoints';
import {
	DATA_API_HEADERS,
	DATA_BASE_URL,
	LEAGUES_CODES,
} from '../constants/requestOptions';
import { LeagueCode, LeagueTeamsResponse } from '../types/apiData';

export const getLeagueTeams = async (
	leagueCode: LeagueCode,
): Promise<LeagueTeamsResponse> => {
	const url = DATA_BASE_URL + COMPETITION_TEAMS(leagueCode);
	const response = await fetch(url, {
		headers: { ...DATA_API_HEADERS },
		next: { revalidate: 86400 },
	});

	return (await response.json()) as unknown as LeagueTeamsResponse;
};

export const getLeaguesTeams = cache(async (): Promise<Array<LeagueTeamsResponse>> => {
	return await Promise.all(
		Object.values(LEAGUES_CODES).map((leagueCode) => getLeagueTeams(leagueCode)),
	);
});
