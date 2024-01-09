import { dataApiProvider } from '..';
import { COMPETITION_STANDINGS } from '../constants/endpoints';
import { API_ERROR_MESSAGE } from '../constants/errorMessages';
import { LEAGUES_CODES } from '../constants/requestOptions';
import { LeagueCode, LeagueStandingsResponse } from '../types/types';

const getLeagueStandings = async (
	leagueCode: LeagueCode,
): Promise<LeagueStandingsResponse> => {
	const url = COMPETITION_STANDINGS(leagueCode);
	try {
		const response = await dataApiProvider.instance.get(url);
		return response as unknown as LeagueStandingsResponse;
	} catch (e) {
		throw Error(API_ERROR_MESSAGE);
	}
};

export const getLeaguesStandings = async () => {
	return await Promise.all(
		Object.values(LEAGUES_CODES).map((leagueCode) => getLeagueStandings(leagueCode)),
	);
};
