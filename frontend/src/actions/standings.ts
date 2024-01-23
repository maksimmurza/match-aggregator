'use server';

import { API_ERROR_MESSAGE } from '@/constants/errorMessages';
import { COMPETITION_STANDINGS } from '../constants/endpoints';
import {
	DATA_API_HEADERS,
	DATA_BASE_URL,
	LEAGUES_CODES,
} from '../constants/requestOptions';
import { LeagueCode, LeagueStandingsResponse } from '../types/apiData';
import { cache } from 'react';

const getLeagueStandings = async (
	leagueCode: LeagueCode,
): Promise<LeagueStandingsResponse> => {
	const url = DATA_BASE_URL + COMPETITION_STANDINGS(leagueCode);
	try {
		const response = await fetch(url, {
			headers: { ...DATA_API_HEADERS },
			next: { revalidate: 900 },
		});
		return (await response.json()) as unknown as LeagueStandingsResponse;
	} catch (e) {
		throw Error(API_ERROR_MESSAGE);
	}
};

export const getLeaguesStandings = async () => {
	return await Promise.all(
		Object.values(LEAGUES_CODES).map((leagueCode) => getLeagueStandings(leagueCode)),
	);
};
