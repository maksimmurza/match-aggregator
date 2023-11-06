import { CURRENT_SEASON_LEAGUES } from '../constants/endpoints';
import apiProvider from '..';
import { LeaguesApi } from '../types/types';

export const getCurrentLeagues = async (): Promise<LeaguesApi> => {
  const url = CURRENT_SEASON_LEAGUES;
  const response = await apiProvider.rapidApi.get(url);

  return response.data.api;
};
