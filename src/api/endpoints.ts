import { footballDataBaseURL, rapidAPIBaseURL } from './constants';
import { LeagueKey } from './types';

export const COMPETITION_SCHEDULE = (
  leagueKey: LeagueKey,
  query: string = 'matches?status=SCHEDULED'
) => {
  return `${footballDataBaseURL}/competitions/${leagueKey}/${query}`;
};

export const CURRENT_SEASON_LEAGUES = `${rapidAPIBaseURL}/v2/leagues/current/`;
