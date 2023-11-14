import { LEAGUES_CODES } from '../constants/requestOptions';
import { COMPETITION_SCHEDULE } from '../constants/endpoints';
import apiProvider from '..';
import { isLeagueScheduleApi } from '../types/typeGuards';
import { LeagueCode, LeagueScheduleApi } from '../types/types';
import { API_TYPE_ERROR_MESSAGE } from '../constants/errorMessages';
import { cache } from 'react';

const getLeagueSchedule = async (leagueCode: LeagueCode): Promise<LeagueScheduleApi> => {
  const url = COMPETITION_SCHEDULE(leagueCode);
  const response = await apiProvider.get(url, { cache: 'force-cache' });

  if (isLeagueScheduleApi(response)) {
    return response;
  } else {
    throw Error(API_TYPE_ERROR_MESSAGE);
  }
};

export const getFullSchedule = async (): Promise<Array<LeagueScheduleApi>> => {
  return await Promise.all(
    Object.values(LEAGUES_CODES).map(leagueCode => getLeagueSchedule(leagueCode))
  );
};