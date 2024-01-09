'use server';

import {
	DATA_API_HEADERS,
	DATA_BASE_URL,
	LEAGUES_CODES,
} from '../constants/requestOptions';
import { COMPETITION_SCHEDULE } from '../constants/endpoints';
import { isLeagueScheduleResponse } from '../types/typeGuards';
import { LeagueCode, LeagueScheduleResponse } from '../types/apiData';
import { cache } from 'react';
import { API_TYPE_ERROR_MESSAGE } from '@/constants/errorMessages';

const getLeagueSchedule = async (
	leagueCode: LeagueCode,
): Promise<LeagueScheduleResponse> => {
	const url = DATA_BASE_URL + COMPETITION_SCHEDULE(leagueCode);
	const response = await fetch(url, {
		headers: { ...DATA_API_HEADERS },
		next: { revalidate: 900 },
	});
	const data = await response.json();

	if (isLeagueScheduleResponse(data)) {
		return data;
	} else {
		throw Error(API_TYPE_ERROR_MESSAGE);
	}
};

export const getFullSchedule = cache(async (): Promise<Array<LeagueScheduleResponse>> => {
	return await Promise.all(
		Object.values(LEAGUES_CODES).map((leagueCode) => getLeagueSchedule(leagueCode)),
	);
});
