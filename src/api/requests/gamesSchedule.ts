import { LEAGUES_CODES } from '../constants/requestOptions';
import { COMPETITION_SCHEDULE } from '../constants/endpoints';
import apiProvider from '..';
import { isLeagueScheduleApi } from '../types/typeGuards';
import { LeagueScheduleApi } from '../types/types';
import { API_TYPE_ERROR_MESSAGE } from '../constants/errorMessages';

export const getEnglishPremierLeagueSchedule = async (): Promise<LeagueScheduleApi> => {
  const url = COMPETITION_SCHEDULE(LEAGUES_CODES.ENGLISH_PREMIER_LEAGUE);
  const response = await apiProvider.get(url);

  if (isLeagueScheduleApi(response)) {
    return response;
  } else {
    throw Error(API_TYPE_ERROR_MESSAGE);
  }
};
