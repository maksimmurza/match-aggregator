import { LEAGUES_CODES } from '../constants/requestOptions';
import { COMPETITION_SCHEDULE } from '../constants/endpoints';
import apiProvider from '..';
import { isLeagueScheduleResponse } from '../types/typeGuards';
import { LeagueCode, LeagueScheduleResponse } from '../types/types';
import { API_TYPE_ERROR_MESSAGE } from '../constants/errorMessages';
import { cache } from 'react';

const getLeagueSchedule = async (leagueCode: LeagueCode): Promise<LeagueScheduleResponse> => {
  const url = COMPETITION_SCHEDULE(leagueCode);
  const response = await apiProvider.get(url, { cache: 'force-cache' });

  if (isLeagueScheduleResponse(response)) {
    return response;
  } else {
    throw Error(API_TYPE_ERROR_MESSAGE);
  }
};

export const getFullSchedule = async (): Promise<Array<LeagueScheduleResponse>> => {
  return await Promise.all(
    Object.values(LEAGUES_CODES).map(leagueCode => getLeagueSchedule(leagueCode))
  );
};
