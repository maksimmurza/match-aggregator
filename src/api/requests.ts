import { LEAGUES_KEYS } from './constants';
import { COMPETITION_SCHEDULE } from './endpoints';
import apiProvider from '.';

export const getEnglishPremierLeagueSchedule = async () => {
  const url = COMPETITION_SCHEDULE(LEAGUES_KEYS.ENGLISH_PREMIER_LEAGUE);
  return await apiProvider.get(url);
};
