import { BASE_URLS } from './requestOptions';
import { LeagueCode } from '../types/types';

// football-data api
export const COMPETITION_SCHEDULE = (
  leagueCode: LeagueCode,
  query: string = 'matches?status=SCHEDULED'
) => {
  return `/competitions/${leagueCode}/${query}`;
};

// rapid api
export const COMPETITION_TEAMS = (leagueCode: LeagueCode) => `/competitions/${leagueCode}/teams`;
