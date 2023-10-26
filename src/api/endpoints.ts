import { BASE_URLS } from './constants';
import { LeagueKey } from './types';

export const COMPETITION_SCHEDULE = (
  leagueKey: LeagueKey,
  query: string = 'matches?status=SCHEDULED'
) => {
  return `${BASE_URLS.footballDataApi}/competitions/${leagueKey}/${query}`;
};

export const CURRENT_SEASON_LEAGUES = `${BASE_URLS.rapidAPI}/leagues/current/`;

export const TEAMS_INFO_URL = `${BASE_URLS.rapidAPI}/teams/league/`;
