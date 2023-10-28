import { BASE_URLS } from './requestOptions';
import { LeagueCode } from '../types/types';

export const COMPETITION_SCHEDULE = (
  LeagueCode: LeagueCode,
  query: string = 'matches?status=SCHEDULED'
) => {
  return `${BASE_URLS.footballDataApi}/competitions/${LeagueCode}/${query}`;
};

export const CURRENT_SEASON_LEAGUES = `${BASE_URLS.rapidAPI}/leagues/current/`;

export const TEAMS_INFO_URL = `${BASE_URLS.rapidAPI}/teams/league/`;
