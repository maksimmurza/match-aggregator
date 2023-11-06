import apiProvider from '..';
import { TEAMS_INFO_URL } from '../constants/endpoints';
import { LeagueTeamsApi } from '../types/types';

export const getTeamsInfo = async (leagueId: number): Promise<LeagueTeamsApi> => {
  const url = TEAMS_INFO_URL(leagueId);
  const response = await apiProvider.rapidApi.get(url);

  return response.data.api;
};
