import { cache } from 'react';
import apiProvider from '..';
import { COMPETITION_TEAMS } from '../constants/endpoints';
import { LEAGUES_CODES } from '../constants/requestOptions';
import { LeagueCode, LeagueTeamsApi } from '../types/types';

export const getLeagueTeams = async (leagueCode: LeagueCode): Promise<LeagueTeamsApi> => {
  const url = COMPETITION_TEAMS(leagueCode);
  const response = await apiProvider.get(url, { cache: 'force-cache' });

  return response as unknown as LeagueTeamsApi;
};

export const getLeaguesTeams = async (): Promise<Array<LeagueTeamsApi>> => {
  return await Promise.all(
    Object.values(LEAGUES_CODES).map(leagueCode => getLeagueTeams(leagueCode))
  );
};
