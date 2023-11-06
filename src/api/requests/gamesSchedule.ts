import { LEAGUES_CODES } from '../constants/requestOptions';
import { COMPETITION_SCHEDULE } from '../constants/endpoints';
import apiProvider from '..';
import { isLeagueScheduleApi } from '../types/typeGuards';
import { LeagueCode, LeagueScheduleApi } from '../types/types';
import { API_TYPE_ERROR_MESSAGE } from '../constants/errorMessages';

export const getLeagueSchedule = async (leagueCode: LeagueCode): Promise<LeagueScheduleApi> => {
  const url = COMPETITION_SCHEDULE(leagueCode);
  const response = await apiProvider.footballDataApi.get(url);

  if (isLeagueScheduleApi(response.data)) {
    return response.data;
  } else {
    throw Error(API_TYPE_ERROR_MESSAGE);
  }
};
