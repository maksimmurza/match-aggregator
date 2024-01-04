import { cache } from 'react';
import { dataApiProvider } from '..';
import { COMPETITION_TEAMS } from '../constants/endpoints';
import { LEAGUES_CODES } from '../constants/requestOptions';
import { LeagueCode, LeagueTeamsResponse } from '../types/types';

export const getLeagueTeams = async (
	leagueCode: LeagueCode,
): Promise<LeagueTeamsResponse> => {
	const url = COMPETITION_TEAMS(leagueCode);
	const response = await dataApiProvider.instance.get(url);

	return response as unknown as LeagueTeamsResponse;
};

export const getLeaguesTeams = cache(async (): Promise<Array<LeagueTeamsResponse>> => {
	return await Promise.all(
		Object.values(LEAGUES_CODES).map((leagueCode) => getLeagueTeams(leagueCode)),
	);
});
