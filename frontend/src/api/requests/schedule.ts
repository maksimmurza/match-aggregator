import { LEAGUES_CODES } from '../constants/requestOptions';
import { COMPETITION_SCHEDULE } from '../constants/endpoints';
import { dataApiProvider } from '..';
import { isLeagueScheduleResponse } from '../types/typeGuards';
import { LeagueCode, LeagueScheduleResponse } from '../types/types';
import { API_TYPE_ERROR_MESSAGE } from '../constants/errorMessages';

const getLeagueSchedule = async (
	leagueCode: LeagueCode,
): Promise<LeagueScheduleResponse> => {
	const url = COMPETITION_SCHEDULE(leagueCode);
	const response = await dataApiProvider.instance.get(url);

	if (isLeagueScheduleResponse(response)) {
		return response;
	} else {
		throw Error(API_TYPE_ERROR_MESSAGE);
	}
};

export const getFullSchedule = async (): Promise<Array<LeagueScheduleResponse>> => {
	return await Promise.all(
		Object.values(LEAGUES_CODES).map((leagueCode) => getLeagueSchedule(leagueCode)),
	);
};
