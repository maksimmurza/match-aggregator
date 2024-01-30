import { COMPETITION_SCHEDULE } from '../../../../constants/endpoints';
import { isLeagueScheduleResponse } from '../../../../types/typeGuards';
import { LeagueCode, LeagueScheduleResponse } from '../../../../types/apiData';
import { API_TYPE_ERROR_MESSAGE } from '@/constants/errorMessages';
import { NextResponse } from 'next/server';
import api from '@/utils/api-providers';

const GET = async () => {
	const getLeagueSchedule = async (
		leagueCode: LeagueCode,
	): Promise<LeagueScheduleResponse> => {
		const url = COMPETITION_SCHEDULE(leagueCode);
		const data = await api.data.fetch(url, {
			next: { revalidate: 900 },
		});

		if (isLeagueScheduleResponse(data)) {
			return data;
		} else {
			throw Error(API_TYPE_ERROR_MESSAGE);
		}
	};

	const schedule = await Promise.all(
		Object.values(api.data.leagueCodes).map((leagueCode) =>
			getLeagueSchedule(leagueCode),
		),
	);

	return NextResponse.json(schedule);
};

export { GET };
